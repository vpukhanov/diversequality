"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { analyseAndSave } from "../analysis";
import { PostHogServer } from "../posthog-server";

const posthog = PostHogServer();

const schema = z.object({
  text: z
    .string({ required_error: "Text is required" })
    .min(100, { message: "Text must be at least 100 characters" })
    // Zod counts length of the string different from client side textarea, so we add 2000 to the max length
    // to account for the small difference and not ruin the user experience
    .max(22000, { message: "Text must be less than 20,000 characters" }),
});

export async function requestAnalysis(_: unknown, form: FormData) {
  const validatedFields = schema.safeParse({
    text: form.get("text"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  let id: string;
  try {
    id = await analyseAndSave(validatedFields.data.text);
  } catch (error) {
    // TODO: Add error tracking when PostHog releases it [https://github.com/PostHog/posthog-js-lite/pull/366]
    posthog.capture({
      event: "analysis error",
      distinctId: "unknown",
      properties: {
        error: error instanceof Error ? error.message : String(error),
      },
    });
    return {
      errors: { text: ["Could not analyze this text, please try again later"] },
    };
  }

  redirect(`/a/${id}`);
}
