import type { MetadataRoute } from "next";
import { createServerSupabase } from "@/lib/supabase/server";

const BASE = "https://spiritisraelhomes.com";
const LANGS = ["en", "he"] as const;

const STATIC_ROUTES: { path: string; changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"]; priority: number }[] = [
  { path: "", changeFrequency: "weekly", priority: 1.0 },
  { path: "/properties", changeFrequency: "daily", priority: 0.9 },
  { path: "/buying-property-zichron-yaakov", changeFrequency: "monthly", priority: 0.8 },
  { path: "/homes-for-sale-zichron-yaakov", changeFrequency: "weekly", priority: 0.8 },
  { path: "/living-in-zichron-yaakov", changeFrequency: "monthly", priority: 0.8 },
  { path: "/moving-to-zichron-yaakov", changeFrequency: "monthly", priority: 0.8 },
  { path: "/guides", changeFrequency: "weekly", priority: 0.7 },
  { path: "/buyer-guide-2026", changeFrequency: "monthly", priority: 0.7 },
  { path: "/sell", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cookies", changeFrequency: "yearly", priority: 0.3 },
  { path: "/accessibility", changeFrequency: "yearly", priority: 0.3 },
];

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createServerSupabase();

  const [{ data: properties }, { data: posts }] = await Promise.all([
    supabase.from("properties_available").select("slug, id"),
    supabase.from("blog_posts").select("slug, updated_at").eq("status", "published"),
  ]);

  const entries: MetadataRoute.Sitemap = [];

  // Static routes — one entry per lang pair
  for (const route of STATIC_ROUTES) {
    for (const lang of LANGS) {
      entries.push({
        url: `${BASE}/${lang}${route.path || "/"}`,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: Object.fromEntries(LANGS.map((l) => [l, `${BASE}/${l}${route.path || "/"}`])),
        },
      });
    }
  }

  // Properties
  for (const p of properties ?? []) {
    const slug = p.slug || p.id;
    for (const lang of LANGS) {
      entries.push({
        url: `${BASE}/${lang}/property/${slug}`,
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(LANGS.map((l) => [l, `${BASE}/${l}/property/${slug}`])),
        },
      });
    }
  }

  // Blog posts
  for (const post of posts ?? []) {
    if (!post.slug) continue;
    for (const lang of LANGS) {
      entries.push({
        url: `${BASE}/${lang}/guides/${post.slug}`,
        lastModified: post.updated_at ? new Date(post.updated_at) : undefined,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(LANGS.map((l) => [l, `${BASE}/${l}/guides/${post.slug}`])),
        },
      });
    }
  }

  return entries;
}
