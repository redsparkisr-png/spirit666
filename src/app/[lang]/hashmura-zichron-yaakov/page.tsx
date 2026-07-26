import type { Metadata } from "next";
import { createServerSupabase } from "@/lib/supabase/server";
import NeighborhoodSpotlight, { type NeighborhoodCopy } from "@/views/NeighborhoodSpotlight";
import { propertyTitle, propertyShortDescription } from "@/lib/property-i18n";
import type { FAQItem } from "@/components/FAQSection";

export const revalidate = 3600;

const SITE = "https://spiritisraelhomes.com";
const SLUG = "hashmura-zichron-yaakov";

const META = {
  en: {
    title: "HaShmura, Zichron Yaakov — Homes for Sale & Sold | Spirit Real Estate",
    description: "Homes for sale and recently sold in HaShmura, an established Zichron Yaakov neighborhood within walking distance of the local commercial center, with some sea-view properties.",
  },
  he: {
    title: 'השמורה, זכרון יעקב — נכסים למכירה ונמכרו | ספיריט נדל"ן',
    description: "נכסים למכירה ונכסים שנמכרו לאחרונה בשכונת השמורה — שכונה מבוססת בזכרון יעקב, במרחק הליכה מהמרכז המסחרי המקומי, עם נכסים בעלי נוף ים בחלק מהרחובות.",
  },
};

const COPY: NeighborhoodCopy = {
  h1: { en: "HaShmura, Zichron Yaakov", he: "השמורה, זכרון יעקב" },
  intro: {
    en: "HaShmura is an established residential neighborhood in Zichron Yaakov, generally within walking distance of a local commercial center with everyday services. Some streets and upper-floor units offer sea views, though this varies by exact position and should always be verified property by property.",
    he: "השמורה היא שכונת מגורים מבוססת בזכרון יעקב, במרחק הליכה כללי ממרכז מסחרי מקומי עם שירותי יום-יום. חלק מהרחובות והיחידות בקומות גבוהות מציעים נוף ים, אך הדבר משתנה לפי מיקום מדויק ויש לאמת זאת תמיד נכס אחר נכס.",
  },
  bestFor: {
    en: ["Buyers who want walking-distance access to everyday services.", "People comparing apartments, penthouses and semi-detached homes in one area.", "Buyers interested in a sea-view property, subject to individual verification.", "Those who want an established, central-adjacent neighborhood."],
    he: ["קונים שרוצים גישה במרחק הליכה לשירותי יום-יום.", "אנשים שמשווים דירות, פנטהאוזים ובתים דו-משפחתיים באזור אחד.", "קונים שמתעניינים בנכס עם נוף ים, בכפוף לאימות פרטני.", "מי שרוצה שכונה מבוססת וקרובה יחסית למרכז."],
  },
  lessIdealFor: {
    en: ["Buyers who require a guaranteed view — this must be checked per property.", "People looking specifically for large private-home plots.", "Buyers who want brand-new construction over an established neighborhood."],
    he: ["קונים שזקוקים לנוף מובטח — יש לבדוק זאת בכל נכס בנפרד.", "מי שמחפש ספציפית מגרשים גדולים לבתים פרטיים.", "קונים שמעדיפים בנייה חדשה לגמרי על פני שכונה מבוססת."],
  },
};

const FAQ: Record<"en" | "he", FAQItem[]> = {
  en: [
    { q: "Is HaShmura walkable in Zichron Yaakov?", a: "HaShmura is generally within walking distance of a local commercial center with everyday services such as a supermarket, cafes and a synagogue, though exact walkability depends on the specific street." },
    { q: "Do properties in HaShmura have sea views?", a: "Some properties in HaShmura, particularly upper floors and penthouses, offer sea views. This varies by building and unit and should always be confirmed in person or by video before making a decision." },
    { q: "What types of homes are available in HaShmura?", a: "HaShmura includes a mix of apartments, penthouses and semi-detached homes, several of which have been renovated. Property condition and layout vary, so each home should be reviewed individually." },
  ],
  he: [
    { q: "האם השמורה הליכתית בזכרון יעקב?", a: "השמורה נמצאת בדרך כלל במרחק הליכה ממרכז מסחרי מקומי עם שירותי יום-יום כמו סופרמרקט, בתי קפה ובית כנסת, אך ההליכתיות המדויקת תלויה ברחוב הספציפי." },
    { q: "האם יש נוף ים בנכסים בהשמורה?", a: "בחלק מהנכסים בהשמורה, בעיקר בקומות גבוהות ובפנטהאוזים, יש נוף ים. הדבר משתנה לפי בניין ויחידה ויש לאמת זאת תמיד אישית או בווידאו לפני קבלת החלטה." },
    { q: "אילו סוגי נכסים זמינים בהשמורה?", a: "השמורה כוללת תמהיל של דירות, פנטהאוזים ובתים דו-משפחתיים, שחלקם שופצו. מצב הנכס והפריסה משתנים, ולכן יש לבחון כל בית לגופו." },
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

export default async function HashmuraPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const url = `${SITE}/${l}/${SLUG}`;

  const supabase = createServerSupabase();
  const [{ data: available }, { data: sold }] = await Promise.all([
    supabase.from("properties_available").select("*").ilike("neighborhood_note", "%hashmura%").order("created_at", { ascending: false }),
    supabase.from("properties_sold").select("*").ilike("neighborhood_note", "%hashmura%").order("created_at", { ascending: false }),
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
        about: { "@type": "Place", name: "HaShmura", containedInPlace: { "@type": "City", name: "Zichron Yaakov" } },
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
          { "@type": "ListItem", position: 3, name: l === "he" ? "השמורה" : "HaShmura", item: url },
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
