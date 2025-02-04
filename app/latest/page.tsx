import type { Metadata } from "next";
import Link from "next/link";

import DigestCard from "@/components/digest-card";
import Header from "@/components/header";
import { getLatestAnalyses } from "@/lib/db/queries";

export const metadata: Metadata = {
  title: "Latest Analyses | Diversequality",
  description: "Recent diversity and inclusion impact analyses",
};

export const revalidate = 300; // invalidate every 5 minutes

export default async function LatestPage() {
  const latestAnalyses = await getLatestAnalyses();

  return (
    <main className="space-y-5 text-lg leading-relaxed">
      <Header isLink />
      <h1 className="text-center text-3xl font-semibold">
        Latest Submitted Analyses
      </h1>

      {latestAnalyses.map((analysis) => (
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
    </main>
  );
}
