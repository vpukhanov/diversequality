import { XMLParser } from "fast-xml-parser";

import { digestAndSave } from "@/lib/analysis";

export async function GET(request: Request) {
  if (!process.env.DIGEST_RSS_URL) {
    return new Response("DIGEST_RSS_URL is not set", {
      status: 500,
    });
  }

  // Check if the request is called by Vercel Cron
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  // Get the RSS feed
  const rssFeed = await fetch(process.env.DIGEST_RSS_URL);
  const rssFeedText = await rssFeed.text();
  const formattedText = formatRssFeed(rssFeedText);

  // Save the digest
  const id = await digestAndSave(formattedText);

  return Response.json({ success: true, id });
}

interface RssItem {
  title?: string;
  pubDate?: string;
  description?: string;
}

interface RssFeed {
  rss?: {
    channel?: {
      item?: RssItem[];
    };
  };
}

function formatRssFeed(rssFeedText: string): string {
  try {
    const parser = new XMLParser();
    const result = parser.parse(rssFeedText) as RssFeed;

    // Get all items
    const items = result.rss?.channel?.item || [];

    // gpt-4o-mini token window is limited, so we have to clean up extra tags
    // and html markup that's not needed for LLM, and cut it down to content
    const formattedItems = items.map(({ title, pubDate, description }) =>
      `${pubDate}\n${title}\n${description}---`
        .replaceAll("</li>", "\n")
        .replace(/<\/?[^>]*>/g, "")
        .replaceAll("&nbsp;", " "),
    );

    return formattedItems.join("\n");
  } catch (error) {
    console.error("Error parsing RSS feed:", error);
    return rssFeedText; // Return original text if parsing fails
  }
}
