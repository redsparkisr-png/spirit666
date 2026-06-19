import type { Metadata } from "next";
import MarketGuide2026 from "@/views/MarketGuide2026";

const SITE = "https://spiritisraelhomes.com";
const SLUG = "zichron-yaakov-real-estate-market-2026";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const title =
    l === "he"
      ? 'שוק הנדלן בזכרון יעקב 2026 — דוח שוק | ספיריט נדל"ן'
      : "Zichron Yaakov Real Estate Market Report 2026 | Spirit Real Estate";
  const description =
    l === "he"
      ? "דוח שוק נדלן זכרון יעקב 2026: מחירים ממוצעים, מגמות, השוואת שכונות, נתוני עסקאות ותחזית. עם דיסקליימר מלא."
      : "Zichron Yaakov real estate market report 2026: average prices, transaction trends, neighborhood comparison, and market outlook — with full data disclaimer.";
  const url = `${SITE}/${l}/${SLUG}`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { en: `${SITE}/en/${SLUG}`, he: `${SITE}/he/${SLUG}`, "x-default": `${SITE}/en/${SLUG}` },
    },
    openGraph: {
      title,
      description,
      url,
      locale: l === "he" ? "he_IL" : "en_US",
      images: [{ url: "/og-image.webp", width: 1200, height: 630 }],
    },
  };
}

export default async function MarketGuide2026Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const url = `${SITE}/${l}/${SLUG}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        articleSection: "Real Estate Market Analysis",
        headline:
          l === "he"
            ? "שוק הנדלן בזכרון יעקב 2026 — דוח שוק"
            : "Zichron Yaakov Real Estate Market Report 2026",
        description:
          l === "he"
            ? "ניתוח שוק הנדלן בזכרון יעקב לשנת 2026: מחירים ממוצעים, מגמות, נתוני עסקאות, השוואת שכונות ותחזית שוק."
            : "Analysis of the Zichron Yaakov real estate market for 2026: average prices, trends, transaction data, neighborhood comparison and market outlook.",
        url,
        inLanguage: l,
        datePublished: "2026-01-01",
        dateModified: "2026-06-01",
        author: { "@type": "Organization", name: "Spirit Real Estate", url: SITE },
        publisher: {
          "@type": "Organization",
          name: "Spirit Real Estate",
          url: SITE,
          logo: { "@type": "ImageObject", url: `${SITE}/og-image.webp` },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        about: { "@type": "Place", name: "Zichron Yaakov", containedInPlace: { "@type": "Country", name: "Israel" } },
        citation: [
          {
            "@type": "Article",
            name: "Zichron Ya'akov Real Estate Market Report Q1 2025",
            publisher: { "@type": "Organization", name: "Easy Aliyah" },
          },
          {
            "@type": "WebPage",
            name: "Houses for Sale in Binyamina and Zichron Yaakov",
            publisher: { "@type": "Organization", name: "Yokra Estate" },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: l === "he" ? "דף הבית" : "Home", item: `${SITE}/${l}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: l === "he" ? "דוח שוק 2026" : "Market Report 2026",
            item: url,
          },
        ],
      },
      {
        "@type": "FAQPage",
        inLanguage: l,
        mainEntity:
          l === "he"
            ? [
                {
                  "@type": "Question",
                  name: "מה המחיר הממוצע לדירה בזכרון יעקב ב-2025?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "לפי נתוני ברבעון הראשון של 2025, המחיר הממוצע לנכס בזכרון יעקב עמד על כ-3.67 מיליון שקל, עם מחיר ממוצע למ\"ר של כ-27,400 שקל. מדובר בעלייה של כ-13.5% לעומת אותה תקופה ב-2024. יש לציין כי נתונים אלה מבוססים על מקורות מידע חיצוניים ועשויים שלא לשקף כל סגמנט בשוק. ראו דיסקליימר מלא בסוף הדף.",
                  },
                },
                {
                  "@type": "Question",
                  name: "האם מחירי הנדלן בזכרון יעקב ממשיכים לעלות ב-2026?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "שוק הנדלן בזכרון יעקב הציג עלייה מתמשכת בשנים האחרונות. עם זאת, קצב העלייה מושפע ממספר גורמים: ריביות המשכנתאות בישראל, קצב שחרור קרקעות, וביקוש מצד קונים בינלאומיים. אין ביכולתנו לחזות את עתיד השוק. מומלץ להתייעץ עם מומחה נדלן וגורמים פיננסיים לפני קבלת החלטות השקעה.",
                  },
                },
                {
                  "@type": "Question",
                  name: "כמה עסקאות נדלן בוצעו בזכרון יעקב ב-2025?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "לפי נתוני ברבעון הראשון של 2025 שפורסמו על ידי Easy Aliyah, בוצעו כ-192 עסקאות מגורים בזכרון יעקב — עלייה של כ-15.9% לעומת הרבעון הראשון של 2024. אנחנו מציינים שנתון זה מייצג תקופה אחת (Q1 2025) ועשוי שלא לשקף את כלל שנת 2025.",
                  },
                },
              ]
            : [
                {
                  "@type": "Question",
                  name: "What is the average property price in Zichron Yaakov in 2025?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "According to Q1 2025 data, the average property price in Zichron Yaakov was approximately ₪3,670,000, with an average price per square meter of ₪27,400. This represented approximately 13.5% year-on-year growth. Note: this data is sourced from third-party reports and may not reflect every market segment. See full disclaimer at the bottom of this page.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Are property prices in Zichron Yaakov still rising in 2026?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "The Zichron Yaakov market has shown consistent appreciation in recent years, driven by constrained supply, lifestyle demand, and international buyer interest. However, the pace of appreciation is affected by mortgage rates, land release, and broader Israeli market conditions. We cannot predict future market direction and recommend consulting a financial advisor before investment decisions.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How many real estate transactions occurred in Zichron Yaakov in 2025?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "According to Q1 2025 data published by Easy Aliyah, approximately 192 residential transactions were completed in Zichron Yaakov — a 15.9% increase over Q1 2024. Note this figure represents a single quarter and may not reflect the full-year 2025 volume.",
                  },
                },
              ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MarketGuide2026 />
    </>
  );
}
