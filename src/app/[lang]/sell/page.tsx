import type { Metadata } from "next";
import Sell from "@/views/Sell";

const SITE = "https://spiritisraelhomes.com";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const title = l === "he" ? 'מכירת נכס | ספיריט נדל"ן' : "Sell Your Property | Spirit Real Estate";
  const description = l === "he"
    ? 'קבלו ליווי אסטרטגי למכירת הנכס שלכם במחיר הנכון בזכרון יעקב.'
    : "Get strategic guidance to sell your property at the right price in Zichron Yaakov.";
  const url = `${SITE}/${l}/sell`;
  return {
    title,
    description,
    alternates: { canonical: url, languages: { en: `${SITE}/en/sell`, he: `${SITE}/he/sell`, "x-default": `${SITE}/en/sell` } },
    openGraph: { title, description, url, locale: l === "he" ? "he_IL" : "en_US", images: [{ url: "/og-image.webp", width: 1200, height: 630 }] },
  };
}

export default function SellPage() {
  return <Sell />;
}
