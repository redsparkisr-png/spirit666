import type { Metadata } from "next";
import MovingToZichron from "@/views/MovingToZichron";

const SITE = "https://spiritisraelhomes.com";
const SLUG = "moving-to-zichron-yaakov";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const title = l === "he"
    ? 'מעבר לזכרון יעקב — ספיריט נדל"ן'
    : "Moving to Zichron Yaakov — Spirit Real Estate";
  const description = l === "he"
    ? "מתכננים לעבור לזכרון יעקב? כל מה שצריך לדעת על המעבר, שוק הדיור ואיך אנחנו עוזרים לקונים להתאקלם."
    : "Planning to move to Zichron Yaakov? Everything you need to know about relocating, the housing market, and how we help buyers settle in.";
  const url = `${SITE}/${l}/${SLUG}`;
  return {
    title,
    description,
    alternates: { canonical: url, languages: { en: `${SITE}/en/${SLUG}`, he: `${SITE}/he/${SLUG}`, "x-default": `${SITE}/en/${SLUG}` } },
    openGraph: { title, description, url, locale: l === "he" ? "he_IL" : "en_US", images: [{ url: "/og-image.webp", width: 1200, height: 630 }] },
  };
}

export default async function MovingToZichronPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const url = `${SITE}/${l}/${SLUG}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: l === "he" ? "מעבר לזכרון יעקב — כל מה שצריך לדעת" : "Moving to Zichron Yaakov — Everything You Need to Know",
        description: l === "he"
          ? "מתכננים לעבור לזכרון יעקב? מדריך שלב אחר שלב על שוק הדיור, הקהילה והתאקלמות בעיר."
          : "Planning to move to Zichron Yaakov? Step-by-step guide covering the housing market, community and settling in.",
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
          { "@type": "ListItem", position: 2, name: l === "he" ? "מעבר לזכרון יעקב" : "Moving to Zichron Yaakov", item: url },
        ],
      },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MovingToZichron />
    </>
  );
}
