"use client";

import Link from "next/link";
import { useState } from "react";

import DigestCard from "@/components/digest-card";
import ScoreFilter, { ScoreFilterValue } from "@/components/score-filter";
import { SelectAnalysis } from "@/lib/db/schema";

export default function FilteredAnalyses({
  analyses,
}: {
  analyses: Pick<SelectAnalysis, "id" | "title" | "summary" | "score">[];
}) {
  const [filter, setFilter] = useState<ScoreFilterValue>("all");

  const filteredAnalyses = analyses.filter((analysis) => {
    if (filter === "all") return true;
    if (filter === "positive") return analysis.score > 0;
    if (filter === "negative") return analysis.score < 0;
  });

  return (
    <>
      <div className="flex justify-center">
        <ScoreFilter value={filter} onChange={setFilter} />
      </div>
      {filteredAnalyses.map((analysis) => (
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
      ))}
    </>
  );
}
