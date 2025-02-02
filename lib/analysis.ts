"use server";

export async function requestAnalysis(_: unknown, form: FormData) {
  const text = form.get("text");
  console.log(text);
}
