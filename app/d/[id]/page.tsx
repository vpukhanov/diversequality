import { Metadata } from "next";
import { notFound } from "next/navigation";

import DigestCard from "@/components/digest-card";
import Gauge from "@/components/gauge";
import Header from "@/components/header";
import ShareButton from "@/components/share-button";

import { getDigest, Props } from "./digest";

export default async function DigestPage({ params }: Props) {
  const digest = await getDigest(params);
  if (!digest) {
    return notFound();
  }

  return (
    <main className="space-y-5 text-lg leading-relaxed">
      <Header isLink />
      <h1 className="text-center text-3xl font-semibold">{digest.date}</h1>
      <Gauge score={digest.score} />
      <div className="text-center">
        <ShareButton />
      </div>
      <DigestCard title="Impact Points" content={digest.impact} />
    </main>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const digest = await getDigest(params);
  if (!digest) {
    return notFound();
  }

  return {
    title: `${digest.date} Digest | Diversequality`,
    description: digest.impact.join(" · "),
  };
}
