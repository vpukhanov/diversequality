import {
  integer,
  pgTableCreator,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

const pgTable = pgTableCreator((name) => `diversequality_${name}`);

export const analysisTable = pgTable("analysis", {
  id: uuid("id").primaryKey().defaultRandom(),
  text: text("text").notNull(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  impact: text("impact").array().notNull(),
  score: integer("score").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type InsertAnalysis = typeof analysisTable.$inferInsert;
export type SelectAnalysis = typeof analysisTable.$inferSelect;
