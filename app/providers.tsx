"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { createContext, useEffect, useState } from "react";

import PostHogPageView from "@/components/posthog-page-view";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const [distinctId, setDistinctId] = useState<string | null>(null);

  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: "/ingest",
      ui_host: "https://eu.posthog.com",
      capture_pageview: false, // Disable automatic pageview capture, as we capture manually
      capture_pageleave: true,
      loaded: (posthog) => {
        setDistinctId(posthog.get_distinct_id());
      },
    });
  }, []);

  return (
    <PHProvider client={posthog}>
      <DistinctIdContext value={distinctId}>
        <PostHogPageView />
        {children}
      </DistinctIdContext>
    </PHProvider>
  );
}

export const DistinctIdContext = createContext<string | null>(null);
