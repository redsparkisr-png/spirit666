import type { Metadata } from "next";
import Properties from "@/views/Properties";

const META = {
  en: {
    title: "Properties for Sale in Zichron Yaakov | Spirit Real Estate",
    description: "Browse available homes and properties for sale in Zichron Yaakov, Israel. Updated listings with photos, prices and full details.",
  },
  he: {
    title: 'נכסים למכירה בזכרון יעקב | ספיריט נדל"ן',
    description: 'עיינו בנכסים זמינים בזכרון יעקב ובקהילות הסובבות. רשימות מעודכנות עם תמונות, מחירים ופרטים מלאים.',
  },
};

const SITE = "https://spiritisraelhomes.com";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const m = META[l];
  const url = `${SITE}/${l}/properties`;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: url,
      languages: { en: `${SITE}/en/properties`, he: `${SITE}/he/properties`, "x-default": `${SITE}/en/properties` },
    },
    openGraph: { title: m.title, description: m.description, url, locale: l === "he" ? "he_IL" : "en_US" },
  };
}

export default function PropertiesPage() {
  return <Properties />;
}
