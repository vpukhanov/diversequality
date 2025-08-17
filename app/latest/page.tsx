import type { Metadata } from "next";

import Header from "@/components/header";
import { getLatestAnalyses } from "@/lib/db/queries";

import FilteredAnalyses from "./filtered-analyses";

export const metadata: Metadata = {
  title: "Latest Analyses | Diversequality",
  description: "Recent diversity and inclusion impact analyses",
};

export const revalidate = 86400; // invalidate every 24 hours (manual invalidation on new analysis)

export default async function LatestPage() {
  const latestAnalyses = await getLatestAnalyses();

  return (
    <main className="space-y-5 text-lg leading-relaxed">
      <Header isLink />
      <h1 className="text-center text-3xl font-semibold">
        Latest Submitted Analyses
      </h1>
      <FilteredAnalyses analyses={latestAnalyses} />
    </main>
  );
}
