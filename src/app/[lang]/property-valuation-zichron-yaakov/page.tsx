import type { Metadata } from "next";
import PropertyValuation from "@/views/PropertyValuation";

const SITE = "https://spiritisraelhomes.com";
const SLUG = "property-valuation-zichron-yaakov";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const title =
    l === "he"
      ? 'הערכת שווי נכס בזכרון יעקב | ספיריט נדל"ן'
      : "Property Valuation in Zichron Yaakov | Spirit Real Estate";
  const description =
    l === "he"
      ? "קבלו הערכת שווי מדויקת לנכס שלכם בזכרון יעקב — על ידי מומחים מקומיים שמכירים כל שכונה, כל רחוב וכל עסקה שבוצעה. ללא עלות, ללא התחייבות."
      : "Get an accurate property valuation in Zichron Yaakov from local experts who know every neighborhood, street and transaction. Free, no obligation.";
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

export default async function PropertyValuationPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const url = `${SITE}/${l}/${SLUG}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: l === "he" ? "הערכת שווי נכס בזכרון יעקב" : "Property Valuation in Zichron Yaakov",
        description:
          l === "he"
            ? "שירות הערכת שווי נכסי מגורים בזכרון יעקב וסביבתה, על ידי סוכן נדלן מקומי עם היכרות מעמיקה עם השוק."
            : "Residential property valuation service in Zichron Yaakov and surroundings, by a local real estate agent with deep market knowledge.",
        provider: {
          "@type": "RealEstateAgent",
          name: "Spirit Real Estate",
          url: SITE,
          telephone: "+972-52-282-0632",
          address: { "@type": "PostalAddress", addressLocality: "Zichron Yaakov", addressCountry: "IL" },
        },
        areaServed: { "@type": "City", name: "Zichron Yaakov" },
        offers: { "@type": "Offer", price: "0", priceCurrency: "ILS", description: l === "he" ? "ללא עלות וללא התחייבות" : "Free of charge, no obligation" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: l === "he" ? "דף הבית" : "Home", item: `${SITE}/${l}/` },
          { "@type": "ListItem", position: 2, name: l === "he" ? "הערכת שווי נכס" : "Property Valuation", item: url },
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
                  name: "כמה עולה הערכת שווי נכס בזכרון יעקב?",
                  acceptedAnswer: { "@type": "Answer", text: "הערכת השווי הראשונית שלנו היא ללא עלות וללא התחייבות. אנחנו מאמינים שהמחיר הנכון מתחיל בשיחה — לא בחתימה על חוזה." },
                },
                {
                  "@type": "Question",
                  name: "כמה זמן לוקח תהליך הערכת השווי?",
                  acceptedAnswer: { "@type": "Answer", text: "לאחר קבלת הפניה אנחנו חוזרים תוך 24 שעות לתיאום ביקור בנכס. ההערכה עצמה ניתנת לרוב תוך 48 שעות מהביקור." },
                },
                {
                  "@type": "Question",
                  name: "מה ההבדל בין הערכת סוכן לבין שמאי?",
                  acceptedAnswer: { "@type": "Answer", text: "הערכת סוכן נדלן מבוססת על עסקאות אמיתיות שבוצעו לאחרונה בשוק — ומשקפת את הסכום שקונה אמיתי ישלם היום. שמאי מוסמך נדרש למטרות בנקאיות ומשפטיות. לרוב, הכרת השוק המקומי של הסוכן מדויקת יותר למחיר השוק הפעיל." },
                },
                {
                  "@type": "Question",
                  name: "מה משפיע על שווי הנכס בזכרון יעקב?",
                  acceptedAnswer: { "@type": "Answer", text: "בזכרון יעקב, מעבר לגודל ומצב הנכס, גורמים קריטיים הם: נוף לים (מעלה ערך של 10–20%), שכונה ספציפית (פרש מחירים גדול בין נווה רמז לרמת צבי), נגישות רגלית למייסדים, גודל המגרש, ומצב רישוי הבנייה." },
                },
              ]
            : [
                {
                  "@type": "Question",
                  name: "How much does a property valuation cost in Zichron Yaakov?",
                  acceptedAnswer: { "@type": "Answer", text: "Our initial valuation is completely free of charge and without any obligation. We believe the right price starts with a conversation — not a signed contract." },
                },
                {
                  "@type": "Question",
                  name: "How long does the valuation process take?",
                  acceptedAnswer: { "@type": "Answer", text: "After receiving your inquiry we respond within 24 hours to arrange a property visit. The valuation itself is typically provided within 48 hours of the visit." },
                },
                {
                  "@type": "Question",
                  name: "What is the difference between an agent valuation and a certified appraiser?",
                  acceptedAnswer: { "@type": "Answer", text: "An agent's valuation is based on real recent transactions in the market — reflecting what a real buyer will pay today. A certified appraiser is required for bank and legal purposes. In practice, a local agent's market knowledge is often more accurate for the active selling price." },
                },
                {
                  "@type": "Question",
                  name: "What affects property value in Zichron Yaakov?",
                  acceptedAnswer: { "@type": "Answer", text: "In Zichron Yaakov, beyond size and condition, critical factors include: sea view (adds 10–20% to value), specific neighborhood (large price spread between Neve Remez and Ramat Zvi), walkability to HaMeyasdim, plot size, and building permit status." },
                },
              ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PropertyValuation />
    </>
  );
}
