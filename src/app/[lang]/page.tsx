import type { Metadata } from "next";
import { createServerSupabase } from "@/lib/supabase/server";
import Index from "@/views/Index";

// Revalidate homepage data every hour — enables ISR / CDN edge caching
export const revalidate = 3600;

const META = {
  en: {
    title: "Spirit Real Estate | Homes for Sale in Zichron Yaakov",
    description:
      "Boutique real estate agency in Zichron Yaakov. Expert guidance for English-speaking buyers, new immigrants (olim), and foreign investors purchasing property in Israel.",
  },
  he: {
    title: 'ספיריט נדל"ן | בתים למכירה בזכרון יעקב',
    description: 'משרד נדל"ן בוטיק בזכרון יעקב. ליווי אישי לקונים מחו"ל ולישראלים שחוזרים הביתה.',
  },
};

const SITE = "https://spiritisraelhomes.com";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const m = META[l];
  const url = `${SITE}/${l}/`;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: url,
      languages: { en: `${SITE}/en/`, he: `${SITE}/he/`, "x-default": `${SITE}/en/` },
    },
    openGraph: { title: m.title, description: m.description, url, locale: l === "he" ? "he_IL" : "en_US", images: [{ url: "/og-image.webp", width: 1200, height: 630 }] },
  };
}

const FAQ_EN = [
  {
    q: "What is the average property price in Zichron Yaakov in 2026?",
    a: "As of early 2026, the average property price in Zichron Yaakov is approximately ₪3,800,000–₪4,200,000 for a 4-bedroom villa and ₪2,200,000–₪2,800,000 for a 3-bedroom apartment, with average prices around ₪27,000–₪30,000 per square meter. Neve Remez and the historic Moshava command the highest premiums; Ramat Zvi offers the most accessible entry point.",
  },
  {
    q: "Can foreigners buy property in Zichron Yaakov, Israel?",
    a: "Yes. Foreign nationals can freely purchase real estate in Israel — there are no restrictions on property ownership by non-residents. However, purchase tax (mas rechisha) for non-residents buying a first Israeli property is 8% on the full purchase price (vs. 3.5–5% for Israeli residents). Foreign buyers may obtain mortgages from Israeli banks at up to 50% LTV.",
  },
  {
    q: "Which neighborhoods are best in Zichron Yaakov?",
    a: "Zichron Yaakov has six distinct neighborhoods: Neve Remez — quiet, one access road, sea views, high demand from families; HaMoshava — the historic center, walkable, close to Hameyasdim street; Ramat Zvi — most affordable, undergoing TAMA 38 upgrades; Halomot Zichron — newer construction, popular with young families; Neve HaBaron — premium semi-detached homes; Givat Eden — hillside views, mixed housing types. Best neighborhood depends on priorities: quiet vs. walkability vs. budget.",
  },
  {
    q: "How far is Zichron Yaakov from Tel Aviv and Ben Gurion Airport?",
    a: "Zichron Yaakov is approximately 60 km north of Tel Aviv (45–60 minutes by car via Highway 2) and about 65 km from Ben Gurion International Airport (55–70 minutes). Binyamina train station — 5 minutes south of Zichron Yaakov — provides direct trains to Tel Aviv in under one hour.",
  },
  {
    q: "Is Zichron Yaakov a good place for English-speaking olim?",
    a: "Yes — approximately 15–18% of Zichron Yaakov's population are English-speaking immigrants (primarily from North America, the UK, and South Africa), making it one of Israel's most established communities for new immigrants. The town has active Anglo social groups, access to English-language services, proximity to international school options, and a long-standing immigrant absorption tradition.",
  },
  {
    q: "What purchase tax (mas rechisha) do buyers pay in Israel?",
    a: "Israeli residents buying their first property pay 0% on the first ₪1,978,745, then 3.5% up to ₪2,347,040, then rising brackets up to 10% above ₪17,794,305. Foreign residents and buyers who already own property in Israel pay a flat 8% on the full purchase price up to ₪5,872,725, then 10% above that. There is no VAT on residential resale transactions — only on new developer sales.",
  },
  {
    q: "Can foreign buyers get a mortgage in Israel?",
    a: "Yes. Major Israeli banks (Bank Hapoalim, Bank Leumi, Mizrahi Tefahot) offer mortgages to foreign nationals at up to 50% of the property value (LTV). Israeli residents buying a first home can access up to 75% LTV. The process requires proof of income, credit history, and typically takes 4–8 weeks. It is strongly recommended to get pre-approval before making an offer.",
  },
  {
    q: "How long does a property purchase take in Israel?",
    a: "A typical Israeli residential property transaction takes 6–12 weeks from signed letter of intent to Tabo (title registry) transfer. The process includes due diligence (2–3 weeks), contract drafting by lawyers (1–2 weeks), payment schedule fulfillment, mortgage approval, and final registration. Off-market deals or cases with complex ownership may take longer.",
  },
  {
    q: "What is a real estate agent commission in Israel?",
    a: "Real estate agency commissions in Israel are typically 2% + VAT (2.36% total) from each side — both buyer and seller. Total transaction commission is therefore approximately 4–5% of the purchase price split across both parties. Unlike the US, Israeli agents often represent both sides. At Spirit Real Estate, we represent only the buyer or the seller, never both.",
  },
  {
    q: "What types of properties are available in Zichron Yaakov?",
    a: "Zichron Yaakov offers a range of property types: garden apartments (קוטג׳ קרקעי), penthouses with sea views, villa-style semi-detached homes (דו-משפחתי), standalone villas with private gardens, and standard apartments in low- and mid-rise buildings. New construction is limited due to the town's conservation planning — which supports long-term price appreciation.",
  },
  {
    q: "Are there off-market properties in Zichron Yaakov?",
    a: "Yes. A significant portion of Zichron Yaakov's best properties change hands before ever appearing on Yad2 or Madlan. These off-market transactions typically occur through direct relationships between local agents and property owners — particularly in high-demand neighborhoods like Neve Remez and HaMoshava. Spirit Real Estate maintains direct access to off-market inventory through community relationships built over years of local presence.",
  },
  {
    q: "What is a 'Tabo' in Israeli real estate?",
    a: "Tabo (טאבו) is the Israeli Land Registry — the official government database recording property ownership in Israel. A Tabo extract (נסח טאבו) is a legal document showing who owns a property, any mortgages or liens registered on it, and the exact plot/unit details. Every property purchase in Israel must be registered in the Tabo to be legally complete. Before purchasing any property, you should always obtain a current Tabo extract through your lawyer.",
  },
];

const FAQ_HE = [
  {
    q: "מה המחיר הממוצע של דירה בזכרון יעקב ב-2026?",
    a: "נכון לתחילת 2026, מחיר ממוצע של וילה עם 4 חדרים בזכרון יעקב עומד על כ-3.8–4.2 מיליון שקל, ודירת 3 חדרים על כ-2.2–2.8 מיליון שקל. מחיר למ\"ר נע בין 27,000 ל-30,000 שקל. נווה רמז והמושבה ההיסטורית הן השכונות היקרות ביותר, בעוד שרמת צבי מציעה את נקודת הכניסה הנגישה ביותר.",
  },
  {
    q: "האם תושב חוץ יכול לקנות נכס בישראל?",
    a: "כן. זרים רשאים לרכוש נכסים בישראל ללא הגבלה. עם זאת, מס הרכישה לתושב חוץ הרוכש את נכסו הראשון בישראל עומד על 8% ממחיר הרכישה המלא. תושבי חוץ יכולים לקבל משכנתא ישראלית בשיעור מימון של עד 50% משווי הנכס.",
  },
  {
    q: "אילו שכונות מומלצות בזכרון יעקב?",
    a: "לזכרון יעקב שש שכונות עיקריות: נווה רמז — שקטה, כניסה אחת, נוף לים, ביקוש גבוה; המושבה — מרכז היסטורי, נגישות רגלית, קרוב לרחוב המייסדים; רמת צבי — הנגישה ביותר מבחינת מחיר; חלומות זכרון — בנייה חדשה, פופולרית בקרב משפחות צעירות; נווה הברון — בתים דו-משפחתיים פרמיום; גבעת עדן — נוף, מגוון סוגי נכסים. הבחירה תלויה בסדר העדיפויות — שקט, נגישות רגלית, או תקציב.",
  },
  {
    q: "כמה זמן לוקח תהליך רכישת נכס בישראל?",
    a: "עסקת רכישת נכס מגורים בישראל לוקחת בדרך כלל 6–12 שבועות מכתב הכוונות ועד לרישום בטאבו. התהליך כולל בדיקת נאותות (2–3 שבועות), גיבוש חוזה עם עורכי דין (1–2 שבועות), קבלת משכנתא, ורישום סופי בטאבו.",
  },
  {
    q: "מהו מס הרכישה שמשלמים בישראל?",
    a: "תושב ישראל הרוכש דירה ראשונה משלם 0% על החלק עד כ-1.98 מיליון שקל, לאחר מכן 3.5% עד כ-2.35 מיליון, ושיעורים עולים עד 10% מעל 17.8 מיליון שקל. תושב חוץ או מי שיש בבעלותו כבר נכס בישראל משלם 8% על כל שקל — מהראשון ועד האחרון.",
  },
  {
    q: "האם ניתן לקבל משכנתא בישראל כתושב חוץ?",
    a: "כן. הבנקים הגדולים (בנק הפועלים, לאומי, מזרחי טפחות) מציעים משכנתאות לתושבי חוץ בשיעור מימון של עד 50% משווי הנכס. תושבי ישראל שרוכשים דירה ראשונה יכולים לקבל עד 75%. מומלץ לקבל אישור עקרוני לפני חתימה על חוזה.",
  },
  {
    q: "מהי עמלת התיווך הנהוגה בישראל?",
    a: "עמלת תיווך נהוגה בישראל היא 2% + מע\"מ (2.36% סה\"כ) מכל צד — הן מהקונה והן מהמוכר. כלומר, העסקה כוללת בסך הכל עמלת תיווך של כ-4–5% מחולקת בין הצדדים. ספיריט נדל\"ן מייצגת תמיד צד אחד בלבד — הקונה או המוכר — לעולם לא את שניהם יחד.",
  },
  {
    q: "מה ההבדל בין זכרון יעקב לבנימינה מבחינת נדל\"ן?",
    a: "זכרון יעקב יקרה יותר מבנימינה ב-15–25% בממוצע. זכרון מציעה אופי מושבה היסטורי, חיי קהילה מפותחים, ומגוון שכונות ייחודיות — עם נוף לים ברקע. בנימינה קרובה יותר לתחנת הרכבת (5 דקות הליכה לעומת 10–15 דקות נסיעה), ומציעה בנייה חדשה יותר. רוב הקונים הבינלאומיים בוחרים בזכרון בשל הקהילה האנגלופונית הגדולה ואופי המושבה.",
  },
  {
    q: "מה זה טאבו בנדל\"ן ישראלי?",
    a: "טאבו הוא מרשם המקרקעין הממשלתי של ישראל — המסד שבו רשומים כל הנכסים, הבעלויות, המשכנתאות והעיקולים. לפני רכישת נכס חייבים לבצע בדיקת נסח טאבו דרך עורך דין, לוודא שהמוכר הוא הבעלים הרשום, ושאין שעבודים או הגבלות על הנכס.",
  },
  {
    q: "האם יש נכסים שלא מפורסמים בזכרון יעקב?",
    a: "כן. חלק מהנכסים המבוקשים ביותר בזכרון יעקב נמכרים ישירות, עוד לפני שמגיעים ליד2 או מדלן. הם עוברים דרך קשרים ישירים בין מתווכים מקומיים לבעלי הנכסים — בעיקר בנווה רמז ובמושבה. ספיריט נדל\"ן מקבלת גישה לנכסים כאלה הודות לנוכחות מקומית של שנים.",
  },
];

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const faqItems = l === "he" ? FAQ_HE : FAQ_EN;

  const supabase = createServerSupabase();
  const { data: featuredProperties } = await supabase
    .from("properties_available")
    .select("*")
    .order("priority_order", { ascending: true })
    .limit(6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // ── LocalBusiness + RealEstateAgent ──────────────────────────────────
      {
        "@type": ["LocalBusiness", "RealEstateAgent"],
        "@id": `${SITE}/#business`,
        name: "Spirit Real Estate",
        alternateName: 'ספיריט נדל"ן',
        description:
          "Boutique real estate agency in Zichron Yaakov specializing in residential sales, purchases, and personalized guidance for English-speaking buyers, olim, and foreign investors.",
        url: SITE,
        telephone: "+972-52-282-0632",
        email: "spiritisraelhomes@gmail.com",
        logo: {
          "@type": "ImageObject",
          url: `${SITE}/spirit-logo.jpg`,
        },
        image: `${SITE}/og-image.webp`,
        address: {
          "@type": "PostalAddress",
          streetAddress: "HaChochit 15",
          addressLocality: "Zichron Yaakov",
          addressRegion: "Haifa District",
          postalCode: "3091668",
          addressCountry: "IL",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 32.5703,
          longitude: 34.9474,
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
            opens: "09:00",
            closes: "19:00",
          },
        ],
        areaServed: [
          { "@type": "City", name: "Zichron Yaakov" },
          { "@type": "City", name: "Binyamina" },
          { "@type": "City", name: "Caesarea" },
        ],
        priceRange: "₪₪₪",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5",
          bestRating: "5",
          worstRating: "1",
          ratingCount: "5",
          reviewCount: "5",
        },
        sameAs: ["https://wa.me/972522820632"],
      },
      // ── Organization (for brand consistency) ────────────────────────────
      {
        "@type": "Organization",
        "@id": `${SITE}/#organization`,
        name: "Spirit Real Estate",
        url: SITE,
        logo: `${SITE}/spirit-logo.jpg`,
        telephone: "+972-52-282-0632",
        email: "spiritisraelhomes@gmail.com",
        sameAs: ["https://wa.me/972522820632"],
      },
      // ── WebSite ──────────────────────────────────────────────────────────
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        url: SITE,
        name: "Spirit Real Estate",
        publisher: { "@id": `${SITE}/#organization` },
        inLanguage: ["en", "he"],
        potentialAction: {
          "@type": "SearchAction",
          target: { "@type": "EntryPoint", urlTemplate: `${SITE}/en/properties?q={search_term_string}` },
          "query-input": "required name=search_term_string",
        },
      },
      // ── FAQPage — language-aware, 12 EN / 10 HE ──────────────────────────
      {
        "@type": "FAQPage",
        inLanguage: l,
        mainEntity: faqItems.map((it) => ({
          "@type": "Question",
          name: it.q,
          acceptedAnswer: { "@type": "Answer", text: it.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Index featuredProperties={featuredProperties ?? []} />
    </>
  );
}
