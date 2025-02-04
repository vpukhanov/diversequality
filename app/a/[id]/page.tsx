import { Metadata } from "next";
import { notFound } from "next/navigation";

import DigestCard from "@/components/digest-card";
import Gauge from "@/components/gauge";
import Header from "@/components/header";
import ShareButton from "@/components/share-button";

import { getAnalysis, Props } from "./analysis";

export default async function AnalysisPage({ params }: Props) {
  const analysis = await getAnalysis(params);
  if (!analysis) {
    return notFound();
  }

  return (
    <main className="space-y-5 text-lg leading-relaxed">
      <Header isLink />
      <h1 className="text-center text-3xl font-semibold">{analysis.title}</h1>
      <Gauge score={analysis.score} />
      <div className="text-center">
        <ShareButton />
      </div>
      <DigestCard title="Summary" content={analysis.summary} />
      <DigestCard title="Impact Points" content={analysis.impact} />
    </main>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const analysis = await getAnalysis(params);
  if (!analysis) {
    return notFound();
  }

  return {
    title: `${analysis.title} | Diversequality`,
    description: analysis.summary,
  };
}
