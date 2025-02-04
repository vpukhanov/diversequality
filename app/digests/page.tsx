import type { Metadata } from "next";

import DigestCard from "@/components/digest-card";
import Header from "@/components/header";
import { getLatestDigests } from "@/lib/db/queries";

export const metadata: Metadata = {
  title: "Daily Digests | Diversequality",
  description: "This month's diversity and inclusion summaries and ratings",
};

export const revalidate = 3600; // invalidate every hour

export default async function DigestPage() {
  const latestDigests = await getLatestDigests();

  return (
    <main className="space-y-5 text-lg leading-relaxed">
      <Header isLink />
      <h1 className="text-center text-3xl font-semibold">Daily Digests</h1>

      {latestDigests.map((digest) => (
        <div key={digest.date}>
          <DigestCard
            title={digest.date}
            score={digest.score}
            content={digest.impact}
          />
        </div>
      ))}
    </main>
  );
}
