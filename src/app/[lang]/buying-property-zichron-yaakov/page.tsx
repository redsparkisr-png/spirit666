import type { Metadata } from "next";
import BuyingProperty from "@/views/BuyingProperty";

const SITE = "https://spiritisraelhomes.com";
const SLUG = "buying-property-zichron-yaakov";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const title = l === "he"
    ? 'רכישת נכס בזכרון יעקב — ספיריט נדל"ן'
    : "Buying Property in Zichron Yaakov — Spirit Real Estate";
  const description = l === "he"
    ? "מדריך מקיף לרכישת נכס בזכרון יעקב. סקירת שוק, סוגי נכסים, טיפים למשא ומתן וטעויות שכדאי להימנע מהן."
    : "Expert guide to buying property in Zichron Yaakov. Local market overview, property types, negotiation tips, and common mistakes to avoid.";
  const url = `${SITE}/${l}/${SLUG}`;
  return {
    title,
    description,
    alternates: { canonical: url, languages: { en: `${SITE}/en/${SLUG}`, he: `${SITE}/he/${SLUG}`, "x-default": `${SITE}/en/${SLUG}` } },
    openGraph: { title, description, url, locale: l === "he" ? "he_IL" : "en_US", images: [{ url: "/og-image.webp", width: 1200, height: 630 }] },
  };
}

export default async function BuyingPropertyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const url = `${SITE}/${l}/${SLUG}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: l === "he" ? 'רכישת נכס בזכרון יעקב — המדריך המקיף' : "Buying Property in Zichron Yaakov — The Complete Guide",
        description: l === "he"
          ? "מדריך מקיף לרכישת נכס בזכרון יעקב. סקירת שוק, שכונות, מיסים וטיפים למשא ומתן מסוכן נדל\"ן מקומי."
          : "Expert guide to buying property in Zichron Yaakov. Local market overview, neighborhoods, taxes and negotiation tips from a local specialist.",
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
          { "@type": "ListItem", position: 2, name: l === "he" ? "רכישת נכס בזכרון יעקב" : "Buying Property in Zichron Yaakov", item: url },
        ],
      },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BuyingProperty />
    </>
  );
}
