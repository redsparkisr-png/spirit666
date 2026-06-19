import type { Metadata } from "next";
import { createServerSupabase } from "@/lib/supabase/server";
import Properties from "@/views/Properties";

export const revalidate = 3600;

const META = {
  en: {
    title: "Properties for Sale in Zichron Yaakov | Spirit Real Estate",
    description: "Browse available homes and properties for sale in Zichron Yaakov, Israel. Updated listings with photos, prices and full details.",
  },
  he: {
    title: 'נכסים למכירה בזכרון יעקב | ספיריט נדל"ן',
    description: 'עיינו בנכסים זמינים בזכרון יעקב ובקהילות הסובבות. רשימות מעודכנות עם תמונות, מחירים ופרטים מלאים.',
  },
};

const SITE = "https://spiritisraelhomes.com";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const m = META[l];
  const url = `${SITE}/${l}/properties`;
  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: url,
      languages: { en: `${SITE}/en/properties`, he: `${SITE}/he/properties`, "x-default": `${SITE}/en/properties` },
    },
    openGraph: { title: m.title, description: m.description, url, locale: l === "he" ? "he_IL" : "en_US", images: [{ url: "/og-image.webp", width: 1200, height: 630 }] },
  };
}

const PROP_FAQ: Record<"en" | "he", Array<{ q: string; a: string }>> = {
  en: [
    { q: "What properties are currently for sale in Zichron Yaakov?", a: "Spirit Real Estate lists curated residential properties in Zichron Yaakov including villas, semi-detached homes, penthouses and garden apartments — ranging from ₪2.2M to ₪6M+. A portion of available inventory is off-market and shared directly with registered buyers." },
    { q: "What is the price range for homes in Zichron Yaakov?", a: "In 2026, entry-level apartments in Ramat Zvi start around ₪2.2–2.5M. Standard 4-bedroom homes in established neighborhoods range from ₪3.5M to ₪5M. Premium villas and penthouses with sea views in Neve Remez or HaMoshava can exceed ₪6M." },
    { q: "Can I buy a standalone villa in Zichron Yaakov?", a: "Yes. Zichron Yaakov has a supply of standalone villas and semi-detached homes (דו-משפחתי) with private gardens, mainly in Neve Remez, Neve HaBaron, and parts of Givat Eden. These are in higher demand and often trade off-market — contact Spirit Real Estate for current availability." },
    { q: "Are there new construction properties in Zichron Yaakov?", a: "New construction is limited in Zichron Yaakov due to conservation planning regulations that protect the town's historic character. Most properties are resale (יד שנייה), with some TAMA 38 reinforcement projects in Ramat Zvi. This supply constraint is one reason prices in Zichron have appreciated steadily." },
    { q: "What should I look for when buying property in Zichron Yaakov?", a: "Key factors: Tabo status (clean title), parking, elevator (if apartment building), proximity to schools and services, solar exposure, and neighborhood trajectory. For foreign buyers, also consider proximity to the English-speaking community and ease of management if renting. Spirit Real Estate provides a full property assessment as part of buyer representation." },
    { q: "How do I arrange a viewing of a property in Zichron Yaakov from abroad?", a: "Spirit Real Estate offers video tour viewings for international buyers who cannot travel immediately. We conduct a live video walkthrough of the property, answer questions in real time, and can arrange an in-person visit for serious buyers who wish to proceed." },
  ],
  he: [
    { q: "אילו נכסים כרגע למכירה בזכרון יעקב?", a: "ספיריט נדל\"ן מציגה נכסי מגורים נבחרים בזכרון יעקב: וילות, בתים דו-משפחתיים, פנטהאוזים ודירות גן — במחירים שבין 2.2 מיליון שקל לסביב 6 מיליון שקל ומעלה. חלק מהנכסים הזמינים הם נכסים שלא הגיעו לשוק הפתוח." },
    { q: "מהו טווח המחירים של בתים בזכרון יעקב?", a: "ב-2026, דירות כניסה ברמת צבי מתחילות מ-2.2–2.5 מיליון שקל. בתים עם 4 חדרים בשכונות מבוססות נעים בין 3.5 ל-5 מיליון שקל. וילות ופנטהאוזים פרמיום עם נוף לים בנווה רמז ובמושבה עשויים לחצות את רף 6 מיליון שקל." },
    { q: "האם ניתן לרכוש וילה עצמאית בזכרון יעקב?", a: "כן. בזכרון יש היצע של וילות עצמאיות ובתים דו-משפחתיים עם גינות פרטיות, בעיקר בנווה רמז, נווה הברון וחלקים מגבעת עדן. אלה מבוקשים מאוד ולעיתים קרובות עוברים ידיים במסגרת פרטית — פנו אלינו לבדיקת הזמינות הנוכחית." },
    { q: "האם יש בנייה חדשה בזכרון יעקב?", a: "הבנייה החדשה מוגבלת בזכרון יעקב בשל תכניות שימור של אופי המושבה. רוב הנכסים הם יד שנייה, עם מספר פרויקטי חיזוק תמ\"א 38 ברמת צבי. מחסור ההיצע הזה הוא אחד הגורמים לעלייה העקבית במחירים בזכרון." },
    { q: "מה חשוב לבדוק כשקונים נכס בזכרון יעקב?", a: "נסח טאבו נקי, חניה, מעלית (בבניין דירות), קרבה לבתי ספר ושירותים, כיווני אוויר, ומסלול השכונה. לקונים מחו\"ל חשוב גם הקרבה לקהילה האנגלופונית ונוחות הניהול אם בכוונתם להשכיר. ספיריט נדל\"ן מספקת הערכת נכס מלאה כחלק מייצוג הקונה." },
    { q: "איך ניתן לקבל סיור בנכס בזכרון יעקב מרחוק?", a: "ספיריט נדל\"ן מציעה סיורי וידאו חיים לקונים בינלאומיים שאינם יכולים להגיע מיד. אנחנו מבצעים סיור חי בנכס, עונים על שאלות בזמן אמת, ומתאמים ביקור פיזי לקונים רציניים שמעוניינים להתקדם." },
  ],
};

export default async function PropertiesPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ lang }, sp] = await Promise.all([params, searchParams]);
  const l = lang === "he" ? "he" : "en";
  const get = (key: string) => {
    const v = sp[key];
    return (Array.isArray(v) ? v[0] : v) || "";
  };
  const locFilter = get("location");
  const typeFilter = get("type");
  const bedsFilter = get("beds");
  const priceMinFilter = get("priceMin");
  const priceMaxFilter = get("priceMax");

  const supabase = createServerSupabase();
  let query = supabase.from("properties_available").select("*");
  if (locFilter) {
    const locs = locFilter.split(",").filter(Boolean);
    if (locs.length === 1) query = query.eq("location", locs[0]);
    else if (locs.length > 1) query = query.in("location", locs);
  }
  if (typeFilter) query = query.eq("property_type", typeFilter);
  if (bedsFilter) {
    const minBeds = parseInt(bedsFilter);
    if (!isNaN(minBeds)) query = query.gte("bedrooms", minBeds);
  }
  if (priceMinFilter) query = query.or(`price_number.gte.${Number(priceMinFilter)},price_number.is.null`);
  if (priceMaxFilter) query = query.or(`price_number.lte.${Number(priceMaxFilter)},price_number.is.null`);
  query = query.order("created_at", { ascending: false });

  const { data } = await query;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: l,
    mainEntity: PROP_FAQ[l].map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Properties initialProperties={data ?? []} />
    </>
  );
}
