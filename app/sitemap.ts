import type { MetadataRoute } from "next";

import { getAnalysesForSitemap, getDigestsForSitemap } from "@/lib/db/queries";

// Revalidate the sitemap every hour
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [analyses, digests] = await Promise.all([
    getAnalysesForSitemap(),
    getDigestsForSitemap(),
  ]);

  const baseUrls: MetadataRoute.Sitemap = [
    {
      url: "https://dvrst.io",
      priority: 1,
    },
    {
      url: "https://dvrst.io/digests",
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: "https://dvrst.io/latest",
      priority: 0.8,
    },
  ];

  const analysisUrls: MetadataRoute.Sitemap = analyses.map((analysis) => ({
    url: `https://dvrst.io/a/${analysis.id}`,
    lastModified: analysis.createdAt,
    changeFrequency: "never",
  }));

  const digestUrls: MetadataRoute.Sitemap = digests.map((digest) => ({
    url: `https://dvrst.io/d/${digest.id}`,
    lastModified: digest.createdAt,
    changeFrequency: "never",
  }));

  return [...baseUrls, ...analysisUrls, ...digestUrls];
}
