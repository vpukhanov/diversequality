import "server-only";

import { db } from "./drizzle";
import { analysisTable, InsertAnalysis } from "./schema";

export async function storeAnalysis(analysis: InsertAnalysis) {
  const [{ id }] = await db
    .insert(analysisTable)
    .values(analysis)
    .returning({ id: analysisTable.id });
  return id;
}
