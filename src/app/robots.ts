import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "Twitterbot", allow: "/" },
      { userAgent: "facebookexternalhit", allow: "/" },
      { userAgent: "*", allow: "/", disallow: ["/admin", "/crm"] },
    ],
    sitemap: "https://spiritisraelhomes.com/sitemap.xml",
  };
}
