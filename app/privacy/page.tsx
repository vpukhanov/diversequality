import type { Metadata } from "next";

import PageTitle from "@/components/page-title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Privacy Policy | Diversequality",
  description: "How Diversequality handles your data",
};

export default function PrivacyPage() {
  return (
    <main className="space-y-5 text-lg leading-relaxed">
      <PageTitle isLink />

      <h1 className="text-center text-3xl font-semibold">Privacy Policy</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-accent-foreground">
            What I Collect and Why
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="mb-2 font-semibold">Text Submissions</h3>
            <ul className="list-disc space-y-2 pl-4">
              <li>
                Text submitted for analysis is stored permanently in the
                database. This is necessary to show you and others the analysis
                results when visiting the unique URL created for each analysis.
              </li>
              <li>
                Text is analysed using GPT-4o-mini by OpenAI through OpenRouter.
                Their{" "}
                <a
                  href="https://platform.openai.com/docs/models/how-we-use-your-data#how-we-use-your-data"
                  className="font-normal underline"
                >
                  privacy policy
                </a>{" "}
                applies to this processing.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">IP Addresses</h3>
            <ul className="list-disc space-y-2 pl-4">
              <li>
                I temporarily store your IP address for rate limiting purposes
                to prevent abuse of the service. You can perform up to 10
                analyses per day.
              </li>
              <li>
                IP addresses are also used to track and diagnose errors you may
                encounter while using the service, such as AI analysis failures.
                This helps me improve the service reliability.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-2 font-semibold">Analytics</h3>
            <ul className="list-disc space-y-2 pl-4">
              <li>
                I use PostHog to understand how people use the service so I can
                improve it. Their{" "}
                <a
                  href="https://posthog.com/privacy"
                  className="font-normal underline"
                >
                  privacy policy
                </a>{" "}
                applies to this data collection.
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-accent-foreground">
            Data Retention
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-2 pl-4">
            <li>
              Text submissions and their analyses are stored indefinitely to
              maintain the accessibility of analysis URLs.
            </li>
            <li>
              IP addresses used for rate limiting are not permanently stored.
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-accent-foreground">Your Rights</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            If you&apos;d like your submitted text and its analysis to be
            removed from the database, please email me at{" "}
            <a href="mailto:vyacheslav@pukhanov.ru" className="underline">
              vyacheslav@pukhanov.ru
            </a>
            . I&apos;ll handle your request as quickly as possible.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-accent-foreground">
            Changes to This Policy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            I may update this privacy policy from time to time. Any changes will
            be reflected on this page.
          </p>
        </CardContent>
      </Card>

      <p className="text-center text-sm text-muted-foreground">
        Last updated: February 2nd, 2025
      </p>
    </main>
  );
}
