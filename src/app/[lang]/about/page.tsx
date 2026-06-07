import type { Metadata } from "next";
import About from "@/views/About";

const SITE = "https://spiritisraelhomes.com";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const title = l === "he" ? 'אודות | ספיריט נדל"ן' : "About | Spirit Real Estate";
  const description = l === "he"
    ? 'הכירו את הצוות מאחורי ספיריט נדל"ן בזכרון יעקב.'
    : "Meet the team behind Spirit Real Estate in Zichron Yaakov.";
  const url = `${SITE}/${l}/about`;
  return {
    title,
    description,
    alternates: { canonical: url, languages: { en: `${SITE}/en/about`, he: `${SITE}/he/about`, "x-default": `${SITE}/en/about` } },
    openGraph: { title, description, url, locale: l === "he" ? "he_IL" : "en_US" },
  };
}

export default function AboutPage() {
  return <About />;
}
