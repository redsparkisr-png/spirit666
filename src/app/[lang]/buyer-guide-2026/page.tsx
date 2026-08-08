import type { Metadata } from "next";
import BuyerGuide2026 from "@/views/BuyerGuide2026";

const SITE = "https://spiritisraelhomes.com";
const SLUG = "buyer-guide-2026";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const title = l === "he"
    ? 'מדריך לרוכשי דירות 2026 | ספיריט נדל"ן'
    : "Zichron Yaakov Buyer Guide 2026 | Spirit Real Estate";
  const description = l === "he"
    ? "המדריך המקיף לרכישת נכס בזכרון יעקב ב-2026 — מחירים, שכונות ותובנות שלא תמצאו באינטרנט."
    : "The complete guide to buying property in Zichron Yaakov in 2026 — pricing, neighborhoods and insider insights.";
  const url = `${SITE}/${l}/${SLUG}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url, languages: { en: `${SITE}/en/${SLUG}`, he: `${SITE}/he/${SLUG}`, "x-default": `${SITE}/en/${SLUG}` } },
    openGraph: { title, description, url, locale: l === "he" ? "he_IL" : "en_US", images: [{ url: "/og-image.webp", width: 1200, height: 630 }] },
  };
}

export default async function BuyerGuide2026Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const url = `${SITE}/${l}/${SLUG}`;
  const title = l === "he"
    ? 'מדריך לרוכשי דירות 2026 | ספיריט נדל"ן'
    : "Zichron Yaakov Buyer Guide 2026 | Spirit Real Estate";
  const description = l === "he"
    ? "המדריך המקיף לרכישת נכס בזכרון יעקב ב-2026 — מחירים, שכונות ותובנות שלא תמצאו באינטרנט."
    : "The complete guide to buying property in Zichron Yaakov in 2026 — pricing, neighborhoods and insider insights.";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: title,
        description,
        url,
        inLanguage: l,
        datePublished: "2026-06-07",
        dateModified: "2026-08-02",
        author: { "@type": "Person", "@id": `${SITE}/#person-hagit`, name: "Hagit Cohen-Morgan", jobTitle: "Senior Sales Agent", url: `${SITE}/${l}/about`, worksFor: { "@id": `${SITE}/#organization` }, hasCredential: { "@type": "EducationalOccupationalCredential", credentialCategory: "Real estate broker license", recognizedBy: { "@type": "GovernmentOrganization", name: "Israel Ministry of Justice" }, identifier: "30515545" } },
        publisher: { "@type": "Organization", name: "Spirit Real Estate", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/og-image.webp` } },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        about: { "@type": "Place", name: "Zichron Yaakov", containedInPlace: { "@type": "Country", name: "Israel" } },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: l === "he" ? "דף הבית" : "Home", item: `${SITE}/${l}/` },
          { "@type": "ListItem", position: 2, name: l === "he" ? "מדריך לרוכשים 2026" : "Buyer Guide 2026", item: url },
        ],
      },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BuyerGuide2026 />
    </>
  );
}
