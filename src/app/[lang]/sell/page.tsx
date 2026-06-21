import type { Metadata } from "next";
import Sell from "@/views/Sell";
import { sellEnContent } from "@/content/sell-en";

const SITE = "https://spiritisraelhomes.com";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const title = l === "he" ? 'מכירת נכס | ספיריט נדל"ן' : sellEnContent.seoTitle;
  const description = l === "he"
    ? 'קבלו ליווי אסטרטגי למכירת הנכס שלכם במחיר הנכון בזכרון יעקב.'
    : sellEnContent.metaDescription;
  const url = `${SITE}/${l}/sell`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url, languages: { en: `${SITE}/en/sell`, he: `${SITE}/he/sell`, "x-default": `${SITE}/en/sell` } },
    openGraph: { title, description, url, locale: l === "he" ? "he_IL" : "en_US", images: [{ url: "/og-image.webp", width: 1200, height: 630 }] },
  };
}

// EN-only JSON-LD: WebPage + BreadcrumbList + Service + FAQPage.
// The Hebrew page keeps its existing FAQ schema (emitted by FAQSection) and is
// not given a graph here to avoid generating Hebrew schema that wasn't approved.
function buildSellEnJsonLd() {
  const url = `${SITE}/en/sell`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: sellEnContent.seoTitle,
        description: sellEnContent.metaDescription,
        inLanguage: "en",
        isPartOf: { "@id": `${SITE}/#website` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/en/` },
          { "@type": "ListItem", position: 2, name: sellEnContent.h1, item: url },
        ],
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: sellEnContent.seoTitle,
        description: sellEnContent.metaDescription,
        url,
        serviceType: "Real estate seller representation",
        provider: { "@type": "RealEstateAgent", name: "Spirit Real Estate", url: SITE },
        areaServed: { "@type": "City", name: "Zichron Yaakov" },
      },
      {
        "@type": "FAQPage",
        mainEntity: sellEnContent.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

export default async function SellPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  return (
    <>
      {l === "en" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSellEnJsonLd()) }}
        />
      )}
      <Sell />
    </>
  );
}
