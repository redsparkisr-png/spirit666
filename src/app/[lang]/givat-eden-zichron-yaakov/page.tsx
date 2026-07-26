import type { Metadata } from "next";
import { createServerSupabase } from "@/lib/supabase/server";
import NeighborhoodSpotlight, { type NeighborhoodCopy } from "@/views/NeighborhoodSpotlight";
import { propertyTitle, propertyShortDescription } from "@/lib/property-i18n";
import type { FAQItem } from "@/components/FAQSection";

export const revalidate = 3600;

const SITE = "https://spiritisraelhomes.com";
const SLUG = "givat-eden-zichron-yaakov";

const META = {
  en: {
    title: "Givat Eden, Zichron Yaakov — Homes for Sale & Sold | Spirit Real Estate",
    description: "Homes for sale and recently sold in Givat Eden, a quieter, greener residential area on the northern side of Zichron Yaakov. Views, space and a suburban feel.",
  },
  he: {
    title: 'גבעת עדן, זכרון יעקב — נכסים למכירה ונמכרו | ספיריט נדל"ן',
    description: "נכסים למכירה ונכסים שנמכרו לאחרונה בגבעת עדן — אזור מגורים שקט וירוק יותר בצפון זכרון יעקב, עם נוף, מרחב ותחושה פרברית.",
  },
};

const COPY: NeighborhoodCopy = {
  h1: { en: "Givat Eden, Zichron Yaakov", he: "גבעת עדן, זכרון יעקב" },
  intro: {
    en: "Givat Eden sits toward the northern side of Zichron Yaakov and is often considered by buyers who want a quieter residential feel, views and a more suburban environment. It can suit people who care less about being in the center and more about outlook, calm and relative space.",
    he: "גבעת עדן מדברת לקונים שמחפשים את זכרון יעקב הפתוחה והירוקה יותר: תחושת מרחב, שקט יחסי, נוף בחלק מהרחובות ואווירה משפחתית. זו יכולה להיות בחירה נהדרת למי שמעדיף אוויר ונוף על פני הליכה למדרחוב.",
  },
  bestFor: {
    en: ["Buyers looking for views and a quieter setting.", "Families who want space and a green, suburban feel.", "Buyers who are comfortable relying on a car day to day.", "People who prefer calm over maximum walkability."],
    he: ["משפחות שמחפשות שקט, ירוק ותחושת מרחב.", "קונים שמעדיפים נוף ואוויר על פני קרבה למדרחוב.", "מי שנוח לו להתנהל עם רכב ביום־יום.", "קונים שמחפשים סביבה משפחתית ורגועה יותר."],
  },
  lessIdealFor: {
    en: ["Buyers who want to walk daily to the historic center.", "People who don't want to depend on a car.", "Buyers looking for a very small, low-maintenance property.", "Those who need full accessibility with minimal slopes or stairs."],
    he: ["מי שרוצה הליכה יומיומית למרכז ההיסטורי.", "קונים שלא רוצים תלות ברכב.", "מי שמחפש נכס קטן ופשוט מאוד לניהול.", "קונים שזקוקים לנגישות מלאה ולמינימום שיפועים או מדרגות."],
  },
};

const FAQ: Record<"en" | "he", FAQItem[]> = {
  en: [
    { q: "Is Givat Eden a good area for families?", a: "Givat Eden is often considered by families who want a quieter, greener residential setting than the historic center, with more space and, in parts, open views. A car is usually needed for daily errands." },
    { q: "Are there sea or mountain views in Givat Eden?", a: "Some homes and streets in Givat Eden offer views, depending on position and elevation. A view mentioned in a listing should always be verified in person or by video before making a decision." },
    { q: "How far is Givat Eden from the historic center of Zichron Yaakov?", a: "Givat Eden is on the northern side of town, a drive rather than a walk from HaMoshava and the Midrachov for most streets. Buyers who want daily walkability to the center may prefer a more central neighborhood." },
  ],
  he: [
    { q: "האם גבעת עדן מתאימה למשפחות?", a: "גבעת עדן נשקלת לעיתים קרובות על ידי משפחות שרוצות סביבת מגורים שקטה וירוקה יותר מהמרכז ההיסטורי, עם יותר מרחב ובחלקים — נוף פתוח. בדרך כלל נדרש רכב לצרכי היום-יום." },
    { q: "האם יש נוף ים או הרים בגבעת עדן?", a: "חלק מהבתים והרחובות בגבעת עדן מציעים נוף, תלוי במיקום ובגובה. יש לאמת תמיד נוף שמוזכר בליסטינג אישית או בווידאו לפני קבלת החלטה." },
    { q: "כמה רחוקה גבעת עדן מהמרכז ההיסטורי של זכרון יעקב?", a: "גבעת עדן ממוקמת בצד הצפוני של העיירה — נסיעה ולא הליכה מהמושבה והמדרחוב ברוב הרחובות. קונים שרוצים הליכתיות יומיומית למרכז עשויים להעדיף שכונה מרכזית יותר." },
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const m = META[l];
  const url = `${SITE}/${l}/${SLUG}`;
  return {
    title: m.title,
    description: m.description,
    alternates: { canonical: url, languages: { en: `${SITE}/en/${SLUG}`, he: `${SITE}/he/${SLUG}`, "x-default": `${SITE}/en/${SLUG}` } },
    openGraph: { title: m.title, description: m.description, url, locale: l === "he" ? "he_IL" : "en_US", images: [{ url: "/og-image.webp", width: 1200, height: 630 }] },
  };
}

export default async function GivatEdenPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const url = `${SITE}/${l}/${SLUG}`;

  const supabase = createServerSupabase();
  const [{ data: available }, { data: sold }] = await Promise.all([
    supabase.from("properties_available").select("*").ilike("neighborhood_note", "%Givat Eden%").order("created_at", { ascending: false }),
    supabase.from("properties_sold").select("*").ilike("neighborhood_note", "%Givat Eden%").order("created_at", { ascending: false }),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#collection`,
        url,
        name: META[l].title,
        description: META[l].description,
        inLanguage: l,
        about: { "@type": "Place", name: "Givat Eden", containedInPlace: { "@type": "City", name: "Zichron Yaakov" } },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: (available ?? []).map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: { "@type": "Residence", name: propertyTitle(p, l), description: propertyShortDescription(p, l) || propertyTitle(p, l), url: `${SITE}/${l}/property/${p.slug || p.id}`, image: p.images?.[0] },
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: l === "he" ? "דף הבית" : "Home", item: `${SITE}/${l}/` },
          { "@type": "ListItem", position: 2, name: l === "he" ? "שכונות" : "Neighborhoods", item: `${SITE}/${l}/zichron-yaakov-neighborhoods` },
          { "@type": "ListItem", position: 3, name: l === "he" ? "גבעת עדן" : "Givat Eden", item: url },
        ],
      },
      { "@type": "FAQPage", inLanguage: l, mainEntity: FAQ[l].map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <NeighborhoodSpotlight copy={COPY} available={available ?? []} sold={sold ?? []} faq={FAQ[l]} />
    </>
  );
}
