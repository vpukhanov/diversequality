"use client";

import { useState } from "react";

import DigestCard from "@/components/digest-card";
import ScoreFilter, { ScoreFilterValue } from "@/components/score-filter";
import { SelectDigest } from "@/lib/db/schema";

export default function FilteredDigests({
  digests,
}: {
  digests: Pick<SelectDigest, "date" | "impact" | "score">[];
}) {
  const [filter, setFilter] = useState<ScoreFilterValue>("all");

  const filteredDigests = digests.filter((digest) => {
    if (filter === "all") return true;
    if (filter === "positive") return digest.score > 0;
    if (filter === "negative") return digest.score < 0;
  });

  return (
    <>
      <div className="flex justify-center">
        <ScoreFilter value={filter} onChange={setFilter} />
      </div>
      {filteredDigests.map((digest) => (
        <div key={digest.date}>
          <DigestCard
            title={digest.date}
            content={digest.impact}
            score={digest.score}
          />
        </div>
      ))}
    </>
  );
}
