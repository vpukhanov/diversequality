"use client";

import DigestCard from "@/components/digest-card";
import ScoreFilteredList from "@/components/score-filtered-list";
import { SelectDigest } from "@/lib/db/schema";

export default function FilteredDigests({
  digests,
}: {
  digests: Pick<SelectDigest, "date" | "impact" | "score">[];
}) {
  return (
    <ScoreFilteredList
      items={digests}
      renderItem={(digest) => (
        <div key={digest.date}>
          <DigestCard
            title={digest.date}
            content={digest.impact}
            score={digest.score}
          />
        </div>
      )}
    />
  );
}
