"use server";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { analyseAndSave } from "../analysis";
import serverPosthog from "../server-posthog";

const ratelimit = new Ratelimit({
  redis: new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  }),
  limiter: Ratelimit.slidingWindow(10, "24 h"),
});

const schema = z.object({
  text: z
    .string({ required_error: "Text is required" })
    .min(100, { message: "Text must be at least 100 characters" })
    // Zod counts length of the string different from client side textarea, so we add 2000 to the max length
    // to account for the small difference and not ruin the user experience
    .max(22000, { message: "Text must be less than 20,000 characters" }),
  distinctId: z.string().optional().default("none"),
});

export async function requestAnalysis(_: unknown, form: FormData) {
  // Check if the submitted form data is valid
  const validatedFields = schema.safeParse({
    text: form.get("text"),
    distinctId: form.get("distinctId"),
  });
  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  // Check if the user has exceeded the daily limit
  const ip = (await headers()).get("x-forwarded-for") ?? "unknown";
  const { success, limit } = await ratelimit.limit(ip);
  if (!success) {
    serverPosthog.capture({
      event: "rate limit error",
      distinctId: validatedFields.data.distinctId,
    });
    return {
      errors: { text: [`You can only perform ${limit} analyses per day`] },
    };
  }

  // Analyse the text and save the analysis
  let id: string;
  try {
    id = await analyseAndSave(
      validatedFields.data.text,
      validatedFields.data.distinctId,
    );
  } catch (error) {
    // TODO: Add error tracking when PostHog releases it [https://github.com/PostHog/posthog-js-lite/pull/366]
    serverPosthog.capture({
      event: "analysis error",
      distinctId: validatedFields.data.distinctId,
      properties: {
        error: error instanceof Error ? error.message : String(error),
      },
    });
    return {
      errors: {
        text: [
          "Could not analyze this text, please try a different one or try again later",
        ],
      },
    };
  }

  serverPosthog.capture({
    event: "analysis success",
    distinctId: validatedFields.data.distinctId,
    properties: {
      id,
    },
  });

  redirect(`/a/${id}`);
}
