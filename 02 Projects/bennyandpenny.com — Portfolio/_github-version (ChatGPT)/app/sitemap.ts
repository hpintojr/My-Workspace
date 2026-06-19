import type { MetadataRoute } from "next";

const siteUrl = "https://bennyandpenny.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/our-work",
    "/families",
    "/about",
    "/work-with-us",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
