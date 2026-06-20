import type { Metadata } from "next";
import About from "@/views/About";
import Script from "next/script";

export const revalidate = 3600;

const SITE = "https://spiritisraelhomes.com";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const title = l === "he"
    ? 'אודות ספיריט נדל"ן | סוכנות נדל"ן זכרון יעקב'
    : "About Spirit Real Estate | Zichron Yaakov's English-Speaking Agency";
  const description = l === "he"
    ? 'ספיריט נדל"ן — סוכנות הנדל"ן המובילה בזכרון יעקב. צוות דוברי אנגלית ועברית עם ניסיון עמוק בשוק המקומי מסייע לעולים, רוכשי בתים ומשקיעים מחו"ל.'
    : "Spirit Real Estate — Zichron Yaakov's leading agency for English-speaking buyers, olim and international investors. Local expertise, bilingual service, deep market knowledge.";
  const url = `${SITE}/${l}/about`;
  return {
    title,
    description,
    alternates: { canonical: url, languages: { en: `${SITE}/en/about`, he: `${SITE}/he/about`, "x-default": `${SITE}/en/about` } },
    openGraph: { title, description, url, locale: l === "he" ? "he_IL" : "en_US", images: [{ url: "/og-image.webp", width: 1200, height: 630 }] },
  };
}

function buildAboutSchema(lang: string) {
  const l = lang === "he" ? "he" : "en";
  const pageUrl = `${SITE}/${l}/about`;
  const homeName = l === "he" ? "דף הבית" : "Home";
  const aboutName = l === "he" ? "אודות" : "About";
  const pageTitle = l === "he"
    ? 'אודות ספיריט נדל"ן — זכרון יעקב'
    : "About Spirit Real Estate — Zichron Yaakov";
  const pageDesc = l === "he"
    ? "הכירו את הצוות מאחורי ספיריט נדל\"ן, הסוכנות המובילה בזכרון יעקב לדוברי אנגלית ועולים חדשים."
    : "Meet the team behind Spirit Real Estate, Zichron Yaakov's leading agency for English-speaking buyers and olim.";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateAgent",
        "@id": `${SITE}/#organization`,
        name: "Spirit Real Estate",
        alternateName: ['ספיריט נדל"ן', "Spirit Israel Homes"],
        url: SITE,
        logo: `${SITE}/favicon.ico`,
        image: `${SITE}/og-image.webp`,
        description: "Zichron Yaakov's leading real estate agency for English-speaking buyers, new immigrants (olim), and international investors. Founded in Zichron Yaakov, serving the northern Sharon and Carmel coast.",
        foundingDate: "2019",
        address: {
          "@type": "PostalAddress",
          streetAddress: "HaChochit 15",
          addressLocality: "Zichron Yaakov",
          addressRegion: "Haifa District",
          postalCode: "3091668",
          addressCountry: "IL",
        },
        geo: { "@type": "GeoCoordinates", latitude: 32.5703, longitude: 34.9474 },
        telephone: "+972-52-282-0632",
        email: "info@spiritisraelhomes.com",
        areaServed: ["Zichron Yaakov", "Binyamina", "Caesarea", "Northern Sharon", "Carmel Coast"],
        knowsLanguage: ["en", "he", "fr"],
        aggregateRating: { "@type": "AggregateRating", ratingValue: "5", reviewCount: "5", bestRating: "5" },
        employee: [
          {
            "@type": "Person",
            name: "Eliran Amsalem",
            jobTitle: "Founder & Lead Agent",
            worksFor: { "@id": `${SITE}/#organization` },
            knowsAbout: ["Zichron Yaakov real estate", "Israeli property law", "olim property purchase", "luxury residential sales"],
            address: { "@type": "PostalAddress", addressLocality: "Zichron Yaakov", addressCountry: "IL" },
          },
          {
            "@type": "Person",
            name: "Hagit Cohen-Morgan",
            jobTitle: "Senior Sales Agent",
            worksFor: { "@id": `${SITE}/#organization` },
            knowsAbout: ["residential sales", "Zichron Yaakov neighborhoods", "buyer representation"],
          },
          {
            "@type": "Person",
            name: "Avi Suliman",
            jobTitle: "Sales Agent & Client Relations",
            worksFor: { "@id": `${SITE}/#organization` },
            knowsAbout: ["investment properties", "rental market", "property valuation"],
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": pageUrl,
        url: pageUrl,
        name: pageTitle,
        description: pageDesc,
        isPartOf: { "@id": `${SITE}/#website` },
        about: { "@id": `${SITE}/#organization` },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: homeName, item: `${SITE}/${l}` },
            { "@type": "ListItem", position: 2, name: aboutName, item: pageUrl },
          ],
        },
      },
    ],
  };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <>
      <Script id="about-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildAboutSchema(lang)) }} />
      <About />
    </>
  );
}
