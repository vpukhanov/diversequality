"use client";

import Link from "next/link";

import DigestCard from "@/components/digest-card";
import ScoreFilteredList from "@/components/score-filtered-list";
import { SelectAnalysis } from "@/lib/db/schema";

export default function FilteredAnalyses({
  analyses,
}: {
  analyses: Pick<SelectAnalysis, "id" | "title" | "summary" | "score">[];
}) {
  return (
    <ScoreFilteredList
      items={analyses}
      renderItem={(analysis) => (
        <Link
          key={analysis.id}
          href={`/a/${analysis.id}`}
          className="group block"
        >
          <DigestCard
            title={analysis.title}
            score={analysis.score}
            content={analysis.summary}
          />
        </Link>
      )}
    />
  );
}
