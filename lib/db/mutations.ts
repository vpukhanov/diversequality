import "server-only";

import { db } from "./drizzle";
import {
  analysisTable,
  digestTable,
  InsertAnalysis,
  InsertDigest,
} from "./schema";

export async function storeAnalysis(analysis: InsertAnalysis) {
  const [{ id }] = await db
    .insert(analysisTable)
    .values(analysis)
    .returning({ id: analysisTable.id });
  return id;
}

export async function storeDigest(digest: InsertDigest) {
  const [{ id }] = await db
    .insert(digestTable)
    .values(digest)
    .returning({ id: digestTable.id });
  return id;
}
