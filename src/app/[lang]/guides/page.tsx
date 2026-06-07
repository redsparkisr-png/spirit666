import type { Metadata } from "next";
import Blog from "@/views/Blog";

const META = {
  en: {
    title: "Guides & Insights — Zichron Yaakov Real Estate | Spirit",
    description: "Expert guides on buying property in Zichron Yaakov, the local market, neighborhoods, taxes and the Olim experience.",
  },
  he: {
    title: 'מדריכים ותובנות — נדל"ן בזכרון יעקב | ספיריט',
    description: 'מדריכים מקצועיים לרכישת נכס בזכרון יעקב, שוק הנדל"ן המקומי, שכונות, מיסוי וחוויית העלייה.',
  },
};

const SITE = "https://spiritisraelhomes.com";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const m = META[l];
  const url = `${SITE}/${l}/guides`;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: url,
      languages: { en: `${SITE}/en/guides`, he: `${SITE}/he/guides`, "x-default": `${SITE}/en/guides` },
    },
    openGraph: { title: m.title, description: m.description, url, locale: l === "he" ? "he_IL" : "en_US" },
  };
}

export default function GuidesPage() {
  return <Blog />;
}
