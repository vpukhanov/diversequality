import Link from "next/link";
import { notFound } from "next/navigation";
import { z } from "zod";

import Gauge from "@/components/gauge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAnalysisForUi } from "@/lib/db/queries";

const schema = z.object({
  id: z.string().uuid(),
});

export default async function AnalysisPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Make sure the id is a valid uuid
  const validatedParams = schema.safeParse(await params);
  if (!validatedParams.success) {
    return notFound();
  }

  // Make sure the analysis exists
  const analysis = await getAnalysisForUi(validatedParams.data.id);
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
