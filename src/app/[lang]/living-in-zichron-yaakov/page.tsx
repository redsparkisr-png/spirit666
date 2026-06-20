import type { Metadata } from "next";
import LivingInZichron from "@/views/LivingInZichron";

const SITE = "https://spiritisraelhomes.com";
const SLUG = "living-in-zichron-yaakov";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const title = l === "he"
    ? 'חיים בזכרון יעקב — ספיריט נדל"ן'
    : "Living in Zichron Yaakov — Spirit Real Estate";
  const description = l === "he"
    ? "גלו איך זה לחיות בזכרון יעקב — אורח חיים, קהילה, משפחות ונגישות לתל אביב ולחיפה."
    : "Discover what it's like to live in Zichron Yaakov — lifestyle, community, families, and accessibility to Tel Aviv and Haifa.";
  const url = `${SITE}/${l}/${SLUG}`;
  return {
    title,
    description,
    alternates: { canonical: url, languages: { en: `${SITE}/en/${SLUG}`, he: `${SITE}/he/${SLUG}`, "x-default": `${SITE}/en/${SLUG}` } },
    openGraph: { title, description, url, locale: l === "he" ? "he_IL" : "en_US", images: [{ url: "/og-image.webp", width: 1200, height: 630 }] },
  };
}

export default async function LivingInZichronPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const url = `${SITE}/${l}/${SLUG}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: l === "he" ? "חיים בזכרון יעקב — מדריך לתושבים ומשפחות" : "Living in Zichron Yaakov — Guide for Residents & Families",
        description: l === "he"
          ? "גלו איך זה לחיות בזכרון יעקב — קהילה, בתי ספר, אורח חיים ונגישות לתל אביב."
          : "Discover what it's really like to live in Zichron Yaakov — community, schools, lifestyle and accessibility to Tel Aviv.",
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
          { "@type": "ListItem", position: 2, name: l === "he" ? "חיים בזכרון יעקב" : "Living in Zichron Yaakov", item: url },
        ],
      },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <LivingInZichron />
    </>
  );
}
