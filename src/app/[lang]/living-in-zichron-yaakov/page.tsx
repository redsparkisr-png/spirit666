import type { Metadata } from "next";
import LivingInZichron from "@/views/LivingInZichron";

const SITE = "https://spiritisraelhomes.com";
const SLUG = "living-in-zichron-yaakov";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const title = l === "he"
    ? 'חיים בזכרון יעקב — ספיריט נדל"ן'
    : "Living in Zichron Yaakov — Spirit Real Estate";
  const description = l === "he"
    ? "גלו איך זה לחיות בזכרון יעקב — אורח חיים, קהילה, משפחות ונגישות לתל אביב ולחיפה."
    : "Discover what it's like to live in Zichron Yaakov — lifestyle, community, families, and accessibility to Tel Aviv and Haifa.";
  const url = `${SITE}/${l}/${SLUG}`;
  return {
    title,
    description,
    alternates: { canonical: url, languages: { en: `${SITE}/en/${SLUG}`, he: `${SITE}/he/${SLUG}`, "x-default": `${SITE}/en/${SLUG}` } },
    openGraph: { title, description, url, locale: l === "he" ? "he_IL" : "en_US" },
  };
}

export default function LivingInZichronPage() {
  return <LivingInZichron />;
}
