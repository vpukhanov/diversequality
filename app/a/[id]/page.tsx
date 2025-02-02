import Link from "next/link";

import Gauge from "@/components/gauge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockResult = {
  title: "Tech Company Announces $50M Investment in Diversity Initiatives",
  summary:
    "Major tech company announces $50M investment in diversity initiatives and STEM education programs for underserved communities.",
  impact: [
    "Increases access to tech education for marginalized communities",
    "Creates new job opportunities and career pathways",
    "Sets precedent for corporate investment in DEI",
    "Demonstrates tangible commitment to systemic change",
  ],
  score: 75,
};

export default async function AnalysisPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(id);

  return (
    <main className="space-y-5 text-lg leading-relaxed">
      <Link
        href="/"
        className="mb-8 block text-center text-4xl font-bold text-accent-foreground md:text-5xl"
      >
        Diversequality
      </Link>
      <h1 className="text-center text-3xl font-semibold">{mockResult.title}</h1>
      <Gauge score={mockResult.score} />
      <Card>
        <CardHeader>
          <CardTitle className="text-accent-foreground">Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{mockResult.summary}</p>
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
            {mockResult.impact.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}
