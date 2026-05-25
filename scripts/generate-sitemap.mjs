// Generates public/sitemap.xml at predev/prebuild time.
// Pulls active properties + published blog posts from Supabase.

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const BASE_URL = "https://spirit666.lovable.app";
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || "https://zbrkbianodvzpwxgaonb.supabase.co";
const SUPABASE_KEY =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpicmtiaWFub2R2enB3eGdhb25iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MjE4NjIsImV4cCI6MjA4NjM5Nzg2Mn0.sdPSvM1Vif5rpZQ9m0sFC3DcBaCwILNFvD1Qp_c_rqA";

const STATIC_ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/properties", changefreq: "daily", priority: "0.9" },
  { path: "/sell", changefreq: "monthly", priority: "0.7" },
  { path: "/about", changefreq: "monthly", priority: "0.6" },
  { path: "/contact", changefreq: "monthly", priority: "0.6" },
  { path: "/buying-property-zichron-yaakov", changefreq: "monthly", priority: "0.8" },
  { path: "/homes-for-sale-zichron-yaakov", changefreq: "weekly", priority: "0.8" },
  { path: "/living-in-zichron-yaakov", changefreq: "monthly", priority: "0.8" },
  { path: "/moving-to-zichron-yaakov", changefreq: "monthly", priority: "0.8" },
  { path: "/buyer-guide-2026", changefreq: "monthly", priority: "0.7" },
  { path: "/guides", changefreq: "weekly", priority: "0.7" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
  { path: "/cookies", changefreq: "yearly", priority: "0.3" },
  { path: "/accessibility", changefreq: "yearly", priority: "0.3" },
];

async function fetchTable(table, params) {
  const url = `${SUPABASE_URL}/rest/v1/${table}?${params}`;
  try {
    const res = await fetch(url, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
    });
    if (!res.ok) {
      console.warn(`[sitemap] ${table} fetch returned ${res.status}`);
      return [];
    }
    return await res.json();
  } catch (err) {
    console.warn(`[sitemap] ${table} fetch failed:`, err.message);
    return [];
  }
}

function urlEntry(loc, opts = {}) {
  const enHref = loc.replace("{lang}", "en");
  const heHref = loc.replace("{lang}", "he");
  return [enHref, heHref]
    .map((href) =>
      [
        `  <url>`,
        `    <loc>${href}</loc>`,
        `    <xhtml:link rel="alternate" hreflang="en" href="${enHref}" />`,
        `    <xhtml:link rel="alternate" hreflang="he" href="${heHref}" />`,
        opts.lastmod ? `    <lastmod>${opts.lastmod}</lastmod>` : null,
        opts.changefreq ? `    <changefreq>${opts.changefreq}</changefreq>` : null,
        opts.priority ? `    <priority>${opts.priority}</priority>` : null,
        `  </url>`,
      ]
        .filter(Boolean)
        .join("\n")
    )
    .join("\n");
}

async function main() {
  const [properties, posts] = await Promise.all([
    fetchTable("properties_available", "select=*"),
    fetchTable("blog_posts", "select=*"),
  ]);

  const entries = [];

  for (const r of STATIC_ROUTES) {
    entries.push(urlEntry(`${BASE_URL}/{lang}${r.path === "/" ? "/" : r.path}`, r));
  }

  for (const p of properties) {
    const slug = p.slug || p.id;
    entries.push(
      urlEntry(`${BASE_URL}/{lang}/property/${slug}`, {
        lastmod: p.updated_at ? p.updated_at.split("T")[0] : undefined,
        changefreq: "weekly",
        priority: "0.8",
      })
    );
  }

  for (const post of posts) {
    if (!post.slug) continue;
    entries.push(
      urlEntry(`${BASE_URL}/{lang}/guides/${post.slug}`, {
        lastmod: post.updated_at ? post.updated_at.split("T")[0] : undefined,
        changefreq: "monthly",
        priority: "0.6",
      })
    );
  }

  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
    ...entries,
    `</urlset>`,
  ].join("\n");

  writeFileSync(resolve("public/sitemap.xml"), xml);
  console.log(`[sitemap] wrote ${entries.length} entries (${properties.length} properties, ${posts.length} posts)`);
}

main().catch((e) => {
  console.error("[sitemap] generation failed:", e);
  // Don't fail the build — keep existing sitemap.xml
  process.exit(0);
});