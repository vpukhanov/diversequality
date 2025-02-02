import { FileText, ListChecks, Gauge } from "lucide-react";
import type { Metadata } from "next";

import FeatureCard from "@/components/feature-card";

export const metadata: Metadata = {
  title: "Diversequality",
  description:
    "Look at the global events through the lens of diversity and inclusion",
};

export default function Home() {
  return (
    <main className="space-y-5 text-lg leading-relaxed">
      <h1 className="mb-8 text-center text-4xl font-bold text-accent-foreground md:text-5xl">
        Diversequality
      </h1>
      <p>Hey everyone,</p>
      <p>
        I built Diversequality because I care about whether we&apos;re moving
        forward or backward in making our society more inclusive. Every big
        event, legal decision, executive move, or policy shift has a real impact
        on communities around the world. This tool helps make sense of the news
        through that lens.
      </p>
      <div className="my-12 grid gap-4 md:grid-cols-3">
        <FeatureCard
          title="Clear Summary"
          description="Get a concise overview of how the event affects diversity and inclusion in our society"
          icon={<FileText className="h-8 w-8 text-[#9A8C98]" />}
        />
        <FeatureCard
          title="Impact Points"
          description="Understand specific ways the event might influence DEI progress through detailed analysis"
          icon={<ListChecks className="h-8 w-8 text-[#9A8C98]" />}
        />
        <FeatureCard
          title="Effect Score"
          description="See at a glance whether an event represents progress or regression"
          icon={<Gauge className="h-8 w-8 text-[#9A8C98]" />}
        />
      </div>
      <p>
        I hope this tool helps us see beyond headlines and understand the
        real-world impact of events on minorities today, and on all of us
        tomorrow. This perspective is meaningful to me, and I hope you&apos;ll
        find it valuable too.
      </p>
      <p className="text-sm text-muted-foreground">
        P.S. While Diversequality aims to promote understanding of DEI issues,
        it isn&apos;t meant to tell you what to think. It&apos;s simply one lens
        that can offer a different perspective.
      </p>
    </main>
  );
}
