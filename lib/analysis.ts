import "server-only";

import { Readability } from "@mozilla/readability";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { track } from "@vercel/analytics/server";
import { generateObject } from "ai";
import { randomBytes } from "crypto";
import { JSDOM } from "jsdom";
import { z } from "zod";

import { storeAnalysis, storeDigest } from "./db/mutations";
import analysisPrompt from "./prompts/analysis.md";
import digestPrompt from "./prompts/digest.md";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
  headers: {
    "HTTP-Referer": "https://dvrst.io",
    "X-Title": "Diversequality",
  },
});

const analysisSchema = z.object({
  type: z.union([z.literal("analysis"), z.literal("irrelevant")]),
  title: z.string(),
  summary: z.string(),
  impact: z.array(z.string()),
  score: z.number().int().min(-100).max(100),
});

export async function analyseAndSave(input: string) {
  input = input.trim();
  const text = isValidUrl(input) ? await fetchUrlContent(input) : input;

  // Generate random boundary name for each request to prevent prompt injection
  const boundary = generateRandomBoundary();

  const { object, usage } = await generateObject({
    model: openrouter("google/gemini-2.5-flash-lite"),
    schema: analysisSchema,
    system: analysisPrompt.replaceAll("{boundary}", boundary),
    prompt: `<${boundary}>${text}</${boundary}>`,
  });

  track("LLM Analysis Generation", {
    promptTokens: usage.inputTokens ?? "unknown",
    completionTokens: usage.outputTokens ?? "unknown",
  });

  if (object.type === "irrelevant") {
    throw new Error(`Cannot analyze: ${object.summary}`);
  }

  return storeAnalysis({
    ...object,
    text,
  });
}

const digestSchema = z.object({
  impact: z.array(z.string()),
  score: z.number().int().min(-100).max(100),
});

export async function digestAndSave(text: string, date: string) {
  const { object, usage } = await generateObject({
    model: openrouter("google/gemini-2.5-flash-lite"),
    schema: digestSchema,
    system: digestPrompt.replaceAll("{date}", date),
    prompt: text,
  });

  track("LLM Digest Generation", {
    promptTokens: usage.inputTokens ?? "unknown",
    completionTokens: usage.outputTokens ?? "unknown",
  });

  return storeDigest({ ...object, date });
}

function generateRandomBoundary() {
  return `X${randomBytes(6).toString("hex").toUpperCase()}`;
}

function isValidUrl(url: string) {
  try {
    return Boolean(new URL(url));
  } catch {
    return false;
  }
}

// Fetch the content of a URL and return the main text content
async function fetchUrlContent(url: string) {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Diversequality/1.0 (https://dvrst.io)",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch URL: ${response.status} ${response.statusText}`,
      );
    }

    const contentType = response.headers.get("content-type") || "";

    // Only handle text content
    if (!contentType.includes("html") && !contentType.includes("text")) {
      throw new Error("Only HTML or text content is supported");
    }

    const html = await response.text();
    const dom = new JSDOM(html, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    if (!article) {
      throw new Error("Failed to extract article content");
    }

    return `${article.title}\n\n${article.textContent}`;
  } catch (error) {
    throw new Error(`Failed to fetch URL content: ${error}`);
  }
}
