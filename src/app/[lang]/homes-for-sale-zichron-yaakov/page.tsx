import type { Metadata } from "next";
import HomesForSale from "@/views/HomesForSale";

const SITE = "https://spiritisraelhomes.com";
const SLUG = "homes-for-sale-zichron-yaakov";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const title = l === "he"
    ? 'בתים למכירה בזכרון יעקב — ספיריט נדל"ן'
    : "Homes for Sale in Zichron Yaakov — Spirit Real Estate";
  const description = l === "he"
    ? "גלו בתים למכירה בזכרון יעקב. שכונות, סוגי נכסים ומגוון הצעות באחת הערים היפות בישראל."
    : "Browse homes for sale in Zichron Yaakov. Explore neighborhoods, property types, and available listings in one of Israel's most beautiful towns.";
  const url = `${SITE}/${l}/${SLUG}`;
  return {
    title,
    description,
    alternates: { canonical: url, languages: { en: `${SITE}/en/${SLUG}`, he: `${SITE}/he/${SLUG}`, "x-default": `${SITE}/en/${SLUG}` } },
    openGraph: { title, description, url, locale: l === "he" ? "he_IL" : "en_US", images: [{ url: "/og-image.webp", width: 1200, height: 630 }] },
  };
}

export default async function HomesForSalePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const url = `${SITE}/${l}/${SLUG}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: l === "he" ? "בתים למכירה בזכרון יעקב — נכסים זמינים 2026" : "Homes for Sale in Zichron Yaakov — Available Properties 2026",
        description: l === "he"
          ? "גלו בתים ודירות למכירה בזכרון יעקב. שכונות, סוגי נכסים ומחירים עדכניים."
          : "Browse homes and apartments for sale in Zichron Yaakov. Neighborhoods, property types and current pricing.",
        url,
        inLanguage: l,
        datePublished: "2025-01-01",
        dateModified: "2026-01-01",
        author: { "@type": "Organization", name: "Spirit Real Estate", url: SITE },
        publisher: { "@type": "Organization", name: "Spirit Real Estate", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/og-image.webp` } },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        about: { "@type": "Place", name: "Zichron Yaakov", containedInPlace: { "@type": "Country", name: "Israel" } },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: l === "he" ? "דף הבית" : "Home", item: `${SITE}/${l}/` },
          { "@type": "ListItem", position: 2, name: l === "he" ? "בתים למכירה בזכרון יעקב" : "Homes for Sale in Zichron Yaakov", item: url },
        ],
      },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomesForSale />
    </>
  );
}
