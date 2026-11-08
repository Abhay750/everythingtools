import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site.config";
import { categoriesConfig } from "@/config/categories.config";
import { toolsConfig } from "@/config/tools.config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // Base static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date("2026-11-01"),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date("2026-11-01"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date("2026-11-01"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date("2026-11-01"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date("2026-11-01"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/guides`,
      lastModified: new Date("2026-11-01"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Category routes
  const categoryRoutes: MetadataRoute.Sitemap = categoriesConfig.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: new Date("2026-11-01"),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Tool routes
  const toolRoutes: MetadataRoute.Sitemap = toolsConfig.map((tool) => ({
    url: `${baseUrl}/tool/${tool.slug}`,
    lastModified: new Date("2026-11-01"),
    changeFrequency: "weekly",
    priority: tool.isPopular ? 0.95 : 0.85,
  }));

  return [...staticRoutes, ...categoryRoutes, ...toolRoutes];
}

