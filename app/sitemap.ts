import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
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
}
