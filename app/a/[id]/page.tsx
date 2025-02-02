import Link from "next/link";
import { notFound } from "next/navigation";

import Gauge from "@/components/gauge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAnalysisForUi } from "@/lib/db/queries";

export default async function AnalysisPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const analysis = await getAnalysisForUi(id);

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
          <ul className="list-inside list-disc space-y-2">
            {analysis.impact.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}
