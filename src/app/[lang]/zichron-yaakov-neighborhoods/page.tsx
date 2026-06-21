import type { Metadata } from "next";
import ZichronNeighborhoods from "@/views/ZichronNeighborhoods";
import { neighborhoodsEnContent } from "@/content/neighborhoods-en";
import { neighborhoodsHeFaq } from "@/content/neighborhoods-he";

const SITE = "https://spiritisraelhomes.com";
const SLUG = "zichron-yaakov-neighborhoods";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const title =
    l === "he"
      ? 'שכונות זכרון יעקב — המדריך המלא | ספיריט נדל"ן'
      : neighborhoodsEnContent.seoTitle;
  const description =
    l === "he"
      ? "מדריך שכונות זכרון יעקב: נווה רמז, המושבה, גבעת עדן, רמת צבי, חלומות זכרון ועוד — אופי, מחירים, יתרונות וחסרונות לכל שכונה."
      : neighborhoodsEnContent.metaDescription;
  const url = `${SITE}/${l}/${SLUG}`;
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      languages: { en: `${SITE}/en/${SLUG}`, he: `${SITE}/he/${SLUG}`, "x-default": `${SITE}/en/${SLUG}` },
    },
    openGraph: {
      title,
      description,
      url,
      locale: l === "he" ? "he_IL" : "en_US",
      images: [{ url: "/og-image.webp", width: 1200, height: 630 }],
    },
  };
}

// Builds the per-language JSON-LD graph: Article + BreadcrumbList + FAQPage.
// FAQPage is sourced from the same content the view renders, so the schema
// exactly matches the visible FAQ (EN: 8 items, HE: 4 items). The view's
// FAQSection uses emitSchema={false}, so this is the only FAQPage emitted.
function buildJsonLd(l: "en" | "he") {
  const url = `${SITE}/${l}/${SLUG}`;
  const faq = l === "he" ? neighborhoodsHeFaq : neighborhoodsEnContent.faq;
  const headline = l === "he" ? "שכונות זכרון יעקב — המדריך המלא" : neighborhoodsEnContent.h1;
  const articleDescription =
    l === "he"
      ? "סקירה מקיפה של שכונות זכרון יעקב, כולל אופי, מחירים, יתרונות וחסרונות לכל שכונה."
      : neighborhoodsEnContent.metaDescription;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline,
        description: articleDescription,
        url,
        inLanguage: l,
        datePublished: "2026-01-01",
        dateModified: "2026-06-21",
        author: { "@type": "Organization", name: "Spirit Real Estate", url: SITE },
        publisher: {
          "@type": "Organization",
          name: "Spirit Real Estate",
          url: SITE,
          logo: { "@type": "ImageObject", url: `${SITE}/og-image.webp` },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        about: [
          { "@type": "Place", name: "Zichron Yaakov", containedInPlace: { "@type": "Country", name: "Israel" } },
          { "@type": "Place", name: "Neve Remez" },
          { "@type": "Place", name: "HaMoshava" },
          { "@type": "Place", name: "Givat Eden" },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: l === "he" ? "דף הבית" : "Home", item: `${SITE}/${l}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: l === "he" ? "שכונות זכרון יעקב" : "Zichron Yaakov Neighborhoods",
            item: url,
          },
        ],
      },
      {
        "@type": "FAQPage",
        inLanguage: l,
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
}

export default async function NeighborhoodsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const jsonLd = buildJsonLd(l);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ZichronNeighborhoods />
    </>
  );
}
