"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { analyseAndSave } from "../analysis";

const schema = z.object({
  text: z
    .string({ required_error: "Text is required" })
    .min(100, { message: "Text must be at least 100 characters" })
    // Zod counts length of the string different from client side textarea, so we add 1000 to the max length
    // to account for the small difference and not ruin the user experience
    .max(11000, { message: "Text must be less than 10,000 characters" }),
});

export async function requestAnalysis(_: unknown, form: FormData) {
  const validatedFields = schema.safeParse({
    text: form.get("text"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  try {
    const id = await analyseAndSave(validatedFields.data.text);
    redirect(`/a/${id}`);
  } catch {
    // TODO: Capture the exception in Sentry or something
    return {
      errors: { text: ["Could not analyze this text, please try again later"] },
    };
  }
}
