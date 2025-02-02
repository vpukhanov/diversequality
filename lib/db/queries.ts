import "server-only";

import { eq } from "drizzle-orm";

import { db } from "./drizzle";
import { analysisTable } from "./schema";

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
