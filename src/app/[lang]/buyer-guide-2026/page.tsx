import type { Metadata } from "next";
import BuyerGuide2026 from "@/views/BuyerGuide2026";

const SITE = "https://spiritisraelhomes.com";
const SLUG = "buyer-guide-2026";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const title = l === "he"
    ? 'מדריך לרוכשי דירות 2026 | ספיריט נדל"ן'
    : "Zichron Yaakov Buyer Guide 2026 | Spirit Real Estate";
  const description = l === "he"
    ? "המדריך המקיף לרכישת נכס בזכרון יעקב ב-2026 — מחירים, שכונות ותובנות שלא תמצאו באינטרנט."
    : "The complete guide to buying property in Zichron Yaakov in 2026 — pricing, neighborhoods and insider insights.";
  const url = `${SITE}/${l}/${SLUG}`;
  return {
    title,
    description,
    alternates: { canonical: url, languages: { en: `${SITE}/en/${SLUG}`, he: `${SITE}/he/${SLUG}`, "x-default": `${SITE}/en/${SLUG}` } },
    openGraph: { title, description, url, locale: l === "he" ? "he_IL" : "en_US", images: [{ url: "/og-image.webp", width: 1200, height: 630 }] },
  };
}

export default function BuyerGuide2026Page() {
  return <BuyerGuide2026 />;
}
