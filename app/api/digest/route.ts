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

  return Response.json({ success: true, text: rssFeedText });
}
