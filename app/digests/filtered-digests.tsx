"use client";

import Link from "next/link";

import DigestCard from "@/components/digest-card";
import ScoreFilteredList from "@/components/score-filtered-list";
import { SelectDigest } from "@/lib/db/schema";

export default function FilteredDigests({
  digests,
}: {
  digests: Pick<SelectDigest, "id" | "date" | "impact" | "score">[];
}) {
  return (
    <ScoreFilteredList
      items={digests}
      renderItem={(digest) => (
        <Link key={digest.id} href={`/d/${digest.id}`} className="group block">
          <DigestCard
            title={digest.date}
            content={digest.impact}
            score={digest.score}
          />
        </Link>
      )}
    />
  );
}
