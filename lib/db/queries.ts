import "server-only";

import { eq, desc } from "drizzle-orm";

import { db } from "./drizzle";
import { analysisTable, digestTable } from "./schema";

export async function getAnalysisForUi(id: string) {
  const [analysis] = await db
    .select({
      title: analysisTable.title,
      summary: analysisTable.summary,
      impact: analysisTable.impact,
      score: analysisTable.score,
    })
    .from(analysisTable)
    .where(eq(analysisTable.id, id));

  return analysis;
}

export async function getLatestAnalyses() {
  return await db
    .select({
      id: analysisTable.id,
      title: analysisTable.title,
      summary: analysisTable.summary,
      score: analysisTable.score,
    })
    .from(analysisTable)
    .orderBy(desc(analysisTable.createdAt))
    .limit(20);
}

export async function getLatestDigests() {
  return await db
    .select({
      date: digestTable.date,
      impact: digestTable.impact,
      score: digestTable.score,
    })
    .from(digestTable)
    .orderBy(desc(digestTable.createdAt))
    .limit(31);
}
