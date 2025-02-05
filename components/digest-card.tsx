import { Gauge } from "lucide-react";

import { cn } from "@/lib/utils";

import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

export default function DigestCard({
  title,
  score,
  content,
}: {
  title: string;
  score?: number;
  content: string | string[];
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 pb-2">
        <CardTitle className="text-xl text-accent-foreground group-hover:underline">
          {title}
        </CardTitle>
        {typeof score === "number" && (
          <div className="flex items-center gap-2">
            <Gauge
              className={cn(
                "h-5 w-5 text-muted-foreground",
                score && score < 0 ? "-scale-x-100" : "",
              )}
            />
            <span
              className={cn(
                "font-sans text-xl font-medium",
                score < 0 ? "text-[#B23A48]" : "text-[#4F772D]",
              )}
            >
              {score}
            </span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {typeof content === "string" ? (
          <p className="text-lg leading-relaxed">{content}</p>
        ) : (
          <ul className="list-disc space-y-2 pl-4">
            {content.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
