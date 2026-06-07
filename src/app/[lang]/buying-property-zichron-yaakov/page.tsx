import type { Metadata } from "next";
import BuyingProperty from "@/views/BuyingProperty";

const SITE = "https://spiritisraelhomes.com";
const SLUG = "buying-property-zichron-yaakov";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const title = l === "he"
    ? 'רכישת נכס בזכרון יעקב — ספיריט נדל"ן'
    : "Buying Property in Zichron Yaakov — Spirit Real Estate";
  const description = l === "he"
    ? "מדריך מקיף לרכישת נכס בזכרון יעקב. סקירת שוק, סוגי נכסים, טיפים למשא ומתן וטעויות שכדאי להימנע מהן."
    : "Expert guide to buying property in Zichron Yaakov. Local market overview, property types, negotiation tips, and common mistakes to avoid.";
  const url = `${SITE}/${l}/${SLUG}`;
  return {
    title,
    description,
    alternates: { canonical: url, languages: { en: `${SITE}/en/${SLUG}`, he: `${SITE}/he/${SLUG}`, "x-default": `${SITE}/en/${SLUG}` } },
    openGraph: { title, description, url, locale: l === "he" ? "he_IL" : "en_US" },
  };
}

export default function BuyingPropertyPage() {
  return <BuyingProperty />;
}
