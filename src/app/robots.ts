import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "Googlebot", allow: "/", disallow: ["/admin", "/crm"] },
      { userAgent: "Bingbot", allow: "/", disallow: ["/admin", "/crm"] },
      { userAgent: "Twitterbot", allow: "/", disallow: ["/admin", "/crm"] },
      { userAgent: "facebookexternalhit", allow: "/", disallow: ["/admin", "/crm"] },
      { userAgent: "*", allow: "/", disallow: ["/admin", "/crm"] },
    ],
    sitemap: "https://spiritisraelhomes.com/sitemap.xml",
  };
}
