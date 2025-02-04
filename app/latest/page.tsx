import { Gauge } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import Header from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLatestAnalyses } from "@/lib/db/queries";
import { cn } from "@/lib/utils";

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
      <h1 className="text-center text-3xl font-semibold">Latest Analyses</h1>

      {latestAnalyses.map((analysis) => (
        <Link key={analysis.id} href={`/a/${analysis.id}`} className="block">
          <Card className="group transition-colors hover:bg-accent/5">
            <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
              <CardTitle className="text-xl text-accent-foreground group-hover:underline">
                {analysis.title}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Gauge className="h-5 w-5 text-muted-foreground" />
                <span
                  className={cn(
                    "font-sans text-xl font-medium",
                    analysis.score < 0 ? "text-[#B23A48]" : "text-[#4F772D]",
                  )}
                >
                  {analysis.score}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">{analysis.summary}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </main>
  );
}
