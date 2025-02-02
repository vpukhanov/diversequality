import { ReactNode } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

export default function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="pb-1">
        {icon}
        <CardTitle className="text-lg text-accent-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{description}</p>
      </CardContent>
    </Card>
  );
}
