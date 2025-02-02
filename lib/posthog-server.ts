import "server-only";

import { PostHog } from "posthog-node";

export function PostHogServer() {
  const posthogServer = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    flushAt: 1,
    flushInterval: 0,
  });
  return posthogServer;
}
