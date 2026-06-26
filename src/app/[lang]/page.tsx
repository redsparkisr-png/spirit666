import type { Metadata } from "next";
import { createServerSupabase } from "@/lib/supabase/server";
import Index from "@/views/Index";
import { homeFaqEn, homeFaqHe } from "@/content/home-faq";

// Revalidate homepage data every hour — enables ISR / CDN edge caching
export const revalidate = 3600;

const META = {
  en: {
    title: "Spirit Real Estate | Homes for Sale in Zichron Yaakov",
    description:
      "Boutique real estate agency in Zichron Yaakov. Expert guidance for English-speaking buyers, new immigrants (olim), and foreign investors purchasing property in Israel.",
  },
  he: {
    title: 'ספיריט נדל"ן | בתים למכירה בזכרון יעקב',
    description: 'משרד נדל"ן בוטיק בזכרון יעקב. ליווי אישי לקונים מחו"ל ולישראלים שחוזרים הביתה.',
  },
};

const SITE = "https://spiritisraelhomes.com";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const m = META[l];
  const url = `${SITE}/${l}/`;
  return {
    title: { absolute: m.title },
    description: m.description,
    alternates: {
      canonical: url,
      languages: { en: `${SITE}/en/`, he: `${SITE}/he/`, "x-default": `${SITE}/en/` },
    },
    openGraph: { title: m.title, description: m.description, url, locale: l === "he" ? "he_IL" : "en_US", images: [{ url: "/og-image.webp", width: 1200, height: 630 }] },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  // Single-sourced with the visible homepage FAQ (src/content/home-faq.ts) so the
  // FAQPage schema always matches the on-page FAQ.
  const faqItems = l === "he" ? homeFaqHe : homeFaqEn;

  const supabase = createServerSupabase();
  const { data: featuredProperties } = await supabase
    .from("properties_available")
    .select("*")
    .order("priority_order", { ascending: true })
    .limit(6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // ── LocalBusiness + RealEstateAgent ──────────────────────────────────
      {
        "@type": ["LocalBusiness", "RealEstateAgent"],
        "@id": `${SITE}/#business`,
        name: "Spirit Real Estate",
        alternateName: 'ספיריט נדל"ן',
        description:
          "Boutique real estate agency in Zichron Yaakov specializing in residential sales, purchases, and personalized guidance for English-speaking buyers, olim, and foreign investors.",
        url: SITE,
        telephone: "+972-52-282-0632",
        email: "spiritisraelhomes@gmail.com",
        logo: {
          "@type": "ImageObject",
          url: `${SITE}/spirit-logo.jpg`,
        },
        image: `${SITE}/og-image.webp`,
        address: {
          "@type": "PostalAddress",
          streetAddress: "HaChochit 15",
          addressLocality: "Zichron Yaakov",
          addressRegion: "Haifa District",
          postalCode: "3091668",
          addressCountry: "IL",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 32.5703,
          longitude: 34.9474,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
            opens: "09:00",
            closes: "19:00",
          },
        ],
        areaServed: [
          { "@type": "City", name: "Zichron Yaakov" },
          { "@type": "City", name: "Binyamina" },
          { "@type": "City", name: "Caesarea" },
        ],
        priceRange: "₪₪₪",
        sameAs: ["https://wa.me/972522820632"],
      },
      // ── Organization (for brand consistency) ────────────────────────────
      {
        "@type": "Organization",
        "@id": `${SITE}/#organization`,
        name: "Spirit Real Estate",
        url: SITE,
        logo: `${SITE}/spirit-logo.jpg`,
        telephone: "+972-52-282-0632",
        email: "spiritisraelhomes@gmail.com",
        sameAs: ["https://wa.me/972522820632"],
      },
      // ── WebSite ──────────────────────────────────────────────────────────
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        url: SITE,
        name: "Spirit Real Estate",
        publisher: { "@id": `${SITE}/#organization` },
        inLanguage: ["en", "he"],
        potentialAction: {
          "@type": "SearchAction",
          target: { "@type": "EntryPoint", urlTemplate: `${SITE}/en/properties?q={search_term_string}` },
          "query-input": "required name=search_term_string",
        },
      },
      // ── FAQPage — single-sourced from the visible homepage FAQ (8 EN / 8 HE) ─
      {
        "@type": "FAQPage",
        inLanguage: l,
        mainEntity: faqItems.map((it) => ({
          "@type": "Question",
          name: it.q,
          acceptedAnswer: { "@type": "Answer", text: it.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Index featuredProperties={featuredProperties ?? []} />
    </>
  );
}
