import type { Metadata } from "next";
import MovingToZichron from "@/views/MovingToZichron";

const SITE = "https://spiritisraelhomes.com";
const SLUG = "moving-to-zichron-yaakov";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const title = l === "he"
    ? 'מעבר לזכרון יעקב — ספיריט נדל"ן'
    : "Moving to Zichron Yaakov — Spirit Real Estate";
  const description = l === "he"
    ? "מתכננים לעבור לזכרון יעקב? כל מה שצריך לדעת על המעבר, שוק הדיור ואיך אנחנו עוזרים לקונים להתאקלם."
    : "Planning to move to Zichron Yaakov? Everything you need to know about relocating, the housing market, and how we help buyers settle in.";
  const url = `${SITE}/${l}/${SLUG}`;
  return {
    title,
    description,
    alternates: { canonical: url, languages: { en: `${SITE}/en/${SLUG}`, he: `${SITE}/he/${SLUG}`, "x-default": `${SITE}/en/${SLUG}` } },
    openGraph: { title, description, url, locale: l === "he" ? "he_IL" : "en_US" },
  };
}

export default function MovingToZichronPage() {
  return <MovingToZichron />;
}
