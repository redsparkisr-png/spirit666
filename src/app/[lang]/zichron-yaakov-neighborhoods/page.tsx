import type { Metadata } from "next";
import ZichronNeighborhoods from "@/views/ZichronNeighborhoods";

const SITE = "https://spiritisraelhomes.com";
const SLUG = "zichron-yaakov-neighborhoods";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const title =
    l === "he"
      ? 'שכונות זכרון יעקב — המדריך המלא | ספיריט נדל"ן'
      : "Zichron Yaakov Neighborhoods Guide 2026 | Spirit Real Estate";
  const description =
    l === "he"
      ? "מדריך שכונות זכרון יעקב: נווה רמז, המושבה, גבעת עדן, רמת צבי, חלומות זכרון ועוד — אופי, מחירים, יתרונות וחסרונות לכל שכונה."
      : "Complete neighborhood guide to Zichron Yaakov: Neve Remez, HaMoshava, Givat Eden, Ramat Zvi, Halomot Zichron — character, prices, pros and cons for each area.";
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

export default async function NeighborhoodsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const url = `${SITE}/${l}/${SLUG}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline:
          l === "he"
            ? "שכונות זכרון יעקב — המדריך המלא"
            : "Zichron Yaakov Neighborhoods — The Complete Guide",
        description:
          l === "he"
            ? "סקירה מקיפה של שכונות זכרון יעקב, כולל אופי, מחירים, יתרונות וחסרונות לכל שכונה."
            : "Comprehensive overview of Zichron Yaakov neighborhoods including character, prices, pros and cons for each district.",
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
        about: [
          { "@type": "Place", name: "Zichron Yaakov", containedInPlace: { "@type": "Country", name: "Israel" } },
          { "@type": "Place", name: "Neve Remez" },
          { "@type": "Place", name: "HaMoshava" },
          { "@type": "Place", name: "Givat Eden" },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: l === "he" ? "דף הבית" : "Home", item: `${SITE}/${l}/` },
          {
            "@type": "ListItem",
            position: 2,
            name: l === "he" ? "שכונות זכרון יעקב" : "Zichron Yaakov Neighborhoods",
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
                  name: "מהי השכונה הטובה ביותר בזכרון יעקב?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "התשובה תלויה בסדר העדיפויות שלכם. נווה רמז — הכי שקטה ומבוקשת עם נוף לים. המושבה — הכי נגישה רגלית עם אופי היסטורי. גבעת עדן — נוף פנורמי ופרמיום. רמת צבי — הנגישה ביותר מבחינת מחיר. אנחנו ממליצים לבוא לבקר בכל שכונה לפני קבלת החלטה.",
                  },
                },
                {
                  "@type": "Question",
                  name: "כמה עולה נכס בנווה רמז זכרון יעקב?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "נווה רמז היא השכונה היקרה ביותר בזכרון יעקב. מחירי וילות נעים בין 4.5 ל-9 מיליון שקל ומעלה, ודירות גן בין 2.5 ל-3.8 מיליון שקל. הערה: מחירים אלה מבוססים על עסקאות שבוצעו ב-2024–2025 ועשויים להשתנות. מומלץ לאמת נתונים עדכניים מול מתווך מקומי.",
                  },
                },
                {
                  "@type": "Question",
                  name: "מהי השכונה הזולה ביותר בזכרון יעקב?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "רמת צבי מציעה את נקודת הכניסה הנגישה ביותר בזכרון יעקב, עם דירות שמחירן מתחיל בסביב 1.8–2.2 מיליון שקל. חלומות זכרון גם מציעה מחירים סבירים יחסית, בייחוד בבנייה מושלמת ישנה יותר.",
                  },
                },
              ]
            : [
                {
                  "@type": "Question",
                  name: "What is the best neighborhood in Zichron Yaakov?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "The answer depends on your priorities. Neve Remez is the quietest and most sought-after with sea views. HaMoshava is the most walkable with historic character. Givat Eden offers panoramic views at a premium. Ramat Zvi is the most accessible price-wise. We recommend visiting each neighborhood before deciding.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How much do properties cost in Neve Remez, Zichron Yaakov?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Neve Remez is Zichron Yaakov's most exclusive neighborhood. Villa prices range from approximately ₪4.5M to ₪9M+, and garden apartments from ₪2.5M to ₪3.8M. Note: these figures are based on 2024–2025 transaction data and may change. Always verify current pricing with a local agent.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Which Zichron Yaakov neighborhood is most affordable?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Ramat Zvi offers Zichron Yaakov's most accessible entry point, with apartments starting around ₪1.8M–₪2.2M. Halomot Zichron also offers relatively moderate pricing, particularly in older completed buildings.",
                  },
                },
              ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ZichronNeighborhoods />
    </>
  );
}
