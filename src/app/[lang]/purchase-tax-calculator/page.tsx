import type { Metadata } from "next";
import PurchaseTaxCalculator from "@/views/PurchaseTaxCalculator";

const SITE = "https://spiritisraelhomes.com";
const SLUG = "purchase-tax-calculator";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const title =
    l === "he"
      ? 'מחשבון מס רכישה 2026 — זכרון יעקב וישראל | ספיריט נדל"ן'
      : "Israel Purchase Tax Calculator 2026 — Zichron Yaakov | Spirit Real Estate";
  const description =
    l === "he"
      ? "מחשבון מס רכישה מעודכן לרכישת דירה בזכרון יעקב ובישראל — דירה יחידה, משקיע, תושב חוץ ועולה חדש. אומדן מהיר לפי מדרגות רשות המסים."
      : "Estimate Israel purchase tax (mas rechisha) for a home in Zichron Yaakov — single home, investor, foreign resident or new immigrant. Fast estimate by Tax Authority brackets.";
  const url = `${SITE}/${l}/${SLUG}`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { en: `${SITE}/en/${SLUG}`, he: `${SITE}/he/${SLUG}`, "x-default": `${SITE}/en/${SLUG}` },
    },
    openGraph: { title, description, url, locale: l === "he" ? "he_IL" : "en_US", images: [{ url: "/og-image.webp", width: 1200, height: 630 }] },
  };
}

export default async function PurchaseTaxCalculatorPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const url = `${SITE}/${l}/${SLUG}`;

  const faq =
    l === "he"
      ? [
          {
            q: "כמה מס רכישה משלמים על דירה יחידה בישראל?",
            a: "לרוכש שזו תהיה דירת המגורים היחידה שלו: 0% עד ₪1,978,745, לאחר מכן 3.5% עד ₪2,347,040, 5% עד ₪6,055,070, 8% עד ₪20,183,565, ו-10% מעל לכך.",
          },
          {
            q: "כמה משלמים תושבי חוץ ומשקיעים?",
            a: "רוכש דירה נוספת — ובכלל זה, כברירת מחדל, תושב חוץ — משלם 8% על השווי עד ₪6,055,070 ו-10% מעל לכך, מהשקל הראשון. מדרגות המשקיע חלות מכוח הוראת שעה עד 31 בדצמבר 2026.",
          },
          {
            q: "האם עולים חדשים משלמים פחות מס רכישה?",
            a: "כן. עולים חדשים זכאים לשיעור מופחת משמעותית, פעם אחת בחלון סביב מועד העלייה. המדרגות והזכאות המדויקות תלויות בתאריך העלייה ובמעמד האישי, ולכן אנחנו מחשבים איתכם את הסכום המדויק.",
          },
          {
            q: "האם המדרגות עדכניות?",
            a: "מדרגות הדירה היחידה מוקפאות מ-16 בינואר 2025 עד 15 בינואר 2028 ללא הצמדה שנתית, כך שהן אינן משתנות באמצע השנה. תמיד יש לאמת את החבות המדויקת מולנו או מול עורך הדין שלכם לפני חתימה.",
          },
        ]
      : [
          {
            q: "How much purchase tax do I pay on my only home in Israel?",
            a: "For a buyer whose only residential home this will be, there is 0% purchase tax up to ₪1,978,745, then 3.5% up to ₪2,347,040, 5% up to ₪6,055,070, 8% up to ₪20,183,565, and 10% above that.",
          },
          {
            q: "What do foreign residents and investors pay?",
            a: "A buyer of an additional home — including, by default, a foreign resident — pays 8% on the value up to ₪6,055,070 and 10% above it, from the first shekel. This investor schedule applies under a temporary order through 31 December 2026.",
          },
          {
            q: "Do new immigrants (olim) pay less purchase tax?",
            a: "Yes. New immigrants are entitled to a significantly reduced rate, usable once within a window around their aliyah. The exact brackets and eligibility depend on your aliyah date and personal status, so we calculate your precise figure with you.",
          },
          {
            q: "Are these rates current?",
            a: "The single-home brackets are frozen from 16 January 2025 to 15 January 2028 with no annual indexation, so they do not change mid-year. Always confirm your exact liability with us or your lawyer before signing.",
          },
        ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${url}#app`,
        name: l === "he" ? "מחשבון מס רכישה" : "Israel Purchase Tax Calculator",
        url,
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        inLanguage: l,
        offers: { "@type": "Offer", price: "0", priceCurrency: "ILS" },
        provider: {
          "@type": "RealEstateAgent",
          name: "Spirit Real Estate",
          url: SITE,
          telephone: "+972-52-282-0632",
          address: { "@type": "PostalAddress", addressLocality: "Zichron Yaakov", addressCountry: "IL" },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: l === "he" ? "דף הבית" : "Home", item: `${SITE}/${l}/` },
          { "@type": "ListItem", position: 2, name: l === "he" ? "מחשבון מס רכישה" : "Purchase Tax Calculator", item: url },
        ],
      },
      {
        "@type": "FAQPage",
        inLanguage: l,
        mainEntity: faq.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PurchaseTaxCalculator />
    </>
  );
}
