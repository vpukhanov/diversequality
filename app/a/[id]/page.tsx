import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Gauge from "@/components/gauge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { getAnalysis, Props } from "./analysis";

export default async function AnalysisPage({ params }: Props) {
  const analysis = await getAnalysis(params);
  if (!analysis) {
    return notFound();
  }

  return (
    <main className="space-y-5 text-lg leading-relaxed">
      <Link
        href="/"
        className="mb-8 block text-center text-4xl font-bold text-accent-foreground md:text-5xl"
      >
        Diversequality
      </Link>
      <h1 className="text-center text-3xl font-semibold">{analysis.title}</h1>
      <Gauge score={analysis.score} />
      <Card>
        <CardHeader>
          <CardTitle className="text-accent-foreground">Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{analysis.summary}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-accent-foreground">
            Impact Points
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-2 pl-4">
            {analysis.impact.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
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
    robots: {
      index: false,
      follow: false,
    },
  };
}
