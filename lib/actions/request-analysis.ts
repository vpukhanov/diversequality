"use server";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { track } from "@vercel/analytics/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

import { analyseAndSave } from "../analysis";

const ratelimit = new Ratelimit({
  redis: new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  }),
  limiter: Ratelimit.slidingWindow(10, "24 h"),
});

const schema = z.object({
  text: z
    .string({ error: "Text is required" })
    // Zod counts length of the string different from client side textarea, so we add 2000 to the max length
    // to account for the small difference and not ruin the user experience
    .max(22000, { error: "Text must be less than 20,000 characters" }),
});

export async function requestAnalysis(_: unknown, form: FormData) {
  // Check if the submitted form data is valid
  const validatedFields = schema.safeParse({
    text: form.get("text"),
  });
  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  // Check if the user has exceeded the daily limit
  const ip = (await headers()).get("x-forwarded-for") ?? "unknown";
  const { success, limit, remaining } = await ratelimit.limit(ip);
  if (!success) {
    return {
      errors: { text: [`You can only perform ${limit} analyses per day`] },
    };
  }

  if (remaining === 0) {
    track("Rate Limit Hit");
  }

  // Analyse the text and save the analysis
  let id: string;
  try {
    id = await analyseAndSave(validatedFields.data.text);
  } catch (error) {
    console.error("Error analysing text:", error);
    return {
      errors: {
        text: [
          "Could not analyze this text, please try a different one or try again later",
        ],
      },
    };
  }

  redirect(`/a/${id}`);
}
