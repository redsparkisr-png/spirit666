import type { Metadata } from "next";
import HomesForSale from "@/views/HomesForSale";

const SITE = "https://spiritisraelhomes.com";
const SLUG = "homes-for-sale-zichron-yaakov";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const title = l === "he"
    ? 'בתים למכירה בזכרון יעקב — ספיריט נדל"ן'
    : "Homes for Sale in Zichron Yaakov — Spirit Real Estate";
  const description = l === "he"
    ? "גלו בתים למכירה בזכרון יעקב. שכונות, סוגי נכסים ומגוון הצעות באחת הערים היפות בישראל."
    : "Browse homes for sale in Zichron Yaakov. Explore neighborhoods, property types, and available listings in one of Israel's most beautiful towns.";
  const url = `${SITE}/${l}/${SLUG}`;
  return {
    title,
    description,
    alternates: { canonical: url, languages: { en: `${SITE}/en/${SLUG}`, he: `${SITE}/he/${SLUG}`, "x-default": `${SITE}/en/${SLUG}` } },
    openGraph: { title, description, url, locale: l === "he" ? "he_IL" : "en_US" },
  };
}

export default function HomesForSalePage() {
  return <HomesForSale />;
}
