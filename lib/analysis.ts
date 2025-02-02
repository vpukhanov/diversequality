import "server-only";

import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { withTracing } from "@posthog/ai";
import { generateObject } from "ai";
import { z } from "zod";

import { storeAnalysis } from "./db/mutations";
import { PostHogServer } from "./posthog-server";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
  headers: {
    "HTTP-Referer": "https://dvrst.io",
    "X-Title": "Diversequality",
  },
});

const model = withTracing(
  openrouter("openai/gpt-4o-mini"),
  PostHogServer(),
  {},
);

const schema = z.object({
  title: z.string(),
  summary: z.string(),
  impact: z.array(z.string()),
  score: z.number().int().min(-100).max(100),
});

export async function analyseAndSave(text: string) {
  const { object } = await generateObject({
    model,
    schema,
    system: `
You are an expert news analysis assistant specializing in evaluating how a described event, update, or situation will affect the progress of Diversity, Equity, and Inclusion (DEI). Your task is to assess the impact on DEI progressiveness—not merely to summarize reality, but to evaluate whether the event drives DEI forward or hinders it.

When given a news article excerpt, provide a structured response with three parts:

1. **Title:** Either extract the title of the article or come up with a very short title summarizing the article.
2. **Summary:** In 1–2 concise sentences, describe the key event or issue covered in the article.
3. **DEI Impact Points:** List 3–5 bullet points explaining how the event/situation might affect DEI. Focus on its potential to advance or regress DEI progressiveness (e.g., policy changes, social initiatives, shifts in public awareness). Note that merely describing existing challenges without triggering change should be rated as neutral or slightly positive if awareness is raised.
4. **Numeric Score:** Assign a single numeric score from -100 to 100. A positive score indicates a beneficial or progressive impact on DEI; a negative score indicates a harmful or regressive impact. Ensure the score reflects the event’s effect on DEI progress rather than just the presence of issues.

**Scoring Examples (Use these as guidance; do not restrict your choice to these specific numbers):**
- **-100:** Complete rollback of DEI initiatives; laws enforcing segregation or discrimination; policies that deliberately target marginalized groups.
- **-50:** Major cuts to DEI funding; removal of key DEI policies; institutional decisions that allow overt discrimination.
- **0:** Neutral reporting or awareness-raising with no direct policy or societal change; factual descriptions of challenges without a clear progressive or regressive impact.
- **50:** Approval of new DEI policies; significant funding boosts for marginalized communities; initiatives that measurably improve inclusion and equity.
- **100:** Landmark reforms dramatically advancing DEI (e.g., legalization of same-sex marriage, election of a first openly gay or minority leader); groundbreaking initiatives that significantly reshape DEI progress.

Feel free to choose any number between -100 and 100 based on your analysis, using these examples as a scale and guidance.

Output the answer in this JSON-like structure:
{
  "title": "<title text>",
  "summary": "<summary text>",
  "impact": ["<impact point 1>", "<impact point 2>", ...],
  "score": <numeric score>
}
`,
    prompt: text,
  });

  return storeAnalysis({
    ...object,
    text,
  });
}
