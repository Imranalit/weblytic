import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

const baseUrl = "https://weblytic.cc";
const mtime = (rel: string) =>
  new Date(fs.statSync(path.join(process.cwd(), rel)).mtime);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, lastModified: mtime("app/page.tsx"), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: mtime("app/about/page.tsx"), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/careers`, lastModified: mtime("app/careers/page.tsx"), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/faq`, lastModified: mtime("app/faq/page.tsx"), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/terms`, lastModified: mtime("app/terms/page.tsx"), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: mtime("app/privacy/page.tsx"), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/refund-policy`, lastModified: mtime("app/refund-policy/page.tsx"), changeFrequency: "monthly", priority: 0.5 },
  ];
}
