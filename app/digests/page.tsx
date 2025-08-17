import type { Metadata } from "next";

import Header from "@/components/header";
import { getLatestDigests } from "@/lib/db/queries";

import FilteredDigests from "./filtered-digests";

export const metadata: Metadata = {
  title: "Daily Digests | Diversequality",
  description: "This month's diversity and inclusion summaries and ratings",
};

export const revalidate = 86400; // invalidate every 24 hours (manual invalidation on new digest)

export default async function DigestPage() {
  const latestDigests = await getLatestDigests();

  return (
    <main className="space-y-5 text-lg leading-relaxed">
      <Header isLink />
      <h1 className="text-center text-3xl font-semibold">Daily Digests</h1>
      <FilteredDigests digests={latestDigests} />
    </main>
  );
}
