# Diversequality

Diversequality is a web application that analyzes news articles and events through the lens of diversity, equity, and inclusion. It provides insights into how current events and decisions impact societal progress.

[Try out the live version at dvrst.io](https://dvrst.io)

## Tech Stack

- [Next.js](https://nextjs.org/) with App Router
- [Neon](https://neon.tech/) database (Serverless Postgres)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenRouter](https://openrouter.ai/) AI Provider
- [Upstash](https://upstash.com/) Rate Limiting
- [PostHog](https://posthog.com/) Analytics
- [Shadcn](https://ui.shadcn.com/) UI Components

## Setup

Copy the environment variables file and fill in your values:

```bash
cp .env.example .env
```

Required environment variables:

- \`DATABASE_URL\`: Neon database connection string
- \`OPENROUTER_API_KEY\`: OpenRouter API key
- \`NEXT_PUBLIC_POSTHOG_KEY\`: PostHog project API key
- \`NEXT_PUBLIC_POSTHOG_HOST\`: PostHog host URL
- \`UPSTASH_REDIS_REST_URL\`: Upstash Redis REST URL
- \`UPSTASH_REDIS_REST_TOKEN\`: Upstash Redis REST token

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
