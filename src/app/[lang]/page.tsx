import type { Metadata } from "next";
import Index from "@/views/Index";

const META = {
  en: {
    title: "Spirit Real Estate | Homes for Sale in Zichron Yaakov",
    description:
      "Boutique real estate firm in Zichron Yaakov. Personal guidance for foreign buyers and Israelis returning home.",
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
    title: m.title,
    description: m.description,
    alternates: {
      canonical: url,
      languages: { en: `${SITE}/en/`, he: `${SITE}/he/`, "x-default": `${SITE}/en/` },
    },
    openGraph: { title: m.title, description: m.description, url, locale: l === "he" ? "he_IL" : "en_US" },
  };
}

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE}/#organization`,
        name: "Spirit Real Estate",
        url: SITE,
        logo: `${SITE}/spirit-logo.jpg`,
        telephone: "+972-52-282-0632",
        email: "spiritisraelhomes@gmail.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "HaChochit 15",
          addressLocality: "Zichron Yaakov",
          postalCode: "3091668",
          addressCountry: "IL",
        },
        sameAs: ["https://wa.me/972522820632"],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        url: SITE,
        name: "Spirit Real Estate",
        publisher: { "@id": `${SITE}/#organization` },
        inLanguage: ["en", "he"],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Index />
    </>
  );
}
