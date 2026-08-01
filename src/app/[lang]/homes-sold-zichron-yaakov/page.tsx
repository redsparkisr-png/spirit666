import type { Metadata } from "next";
import { createServerSupabase } from "@/lib/supabase/server";
import SoldHomes from "@/views/SoldHomes";
import { propertyTitle, propertyShortDescription } from "@/lib/property-i18n";

export const revalidate = 3600;

const SITE = "https://spiritisraelhomes.com";
const SLUG = "homes-sold-zichron-yaakov";

const META = {
  en: {
    title: "Homes We've Sold in Zichron Yaakov | Spirit Real Estate",
    description: "See real homes Spirit Real Estate has sold in Zichron Yaakov — closed deals across Givat Eden, Neve Baron, HaShmura and Ramat Zvi, not just active listings.",
  },
  he: {
    title: 'נכסים שמכרנו בזכרון יעקב | ספיריט נדל"ן',
    description: "נכסים אמיתיים שספיריט נדל\"ן מכרה בזכרון יעקב — עסקאות שנסגרו בגבעת עדן, נווה הבארון, השמורה ורמת צבי, לא רק ליסטינגים פעילים.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const m = META[l];
  const url = `${SITE}/${l}/${SLUG}`;
  return {
    title: { absolute: m.title },
    description: m.description,
    alternates: {
      canonical: url,
      languages: { en: `${SITE}/en/${SLUG}`, he: `${SITE}/he/${SLUG}`, "x-default": `${SITE}/en/${SLUG}` },
    },
    openGraph: { title: m.title, description: m.description, url, locale: l === "he" ? "he_IL" : "en_US", images: [{ url: "/og-image.webp", width: 1200, height: 630 }] },
  };
}

export default async function SoldHomesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const url = `${SITE}/${l}/${SLUG}`;

  const supabase = createServerSupabase();
  const { data } = await supabase.from("properties_sold").select("*").order("created_at", { ascending: false });
  const sold = data ?? [];

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
        about: { "@id": `${SITE}/#organization` },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: sold.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Residence",
              name: propertyTitle(p, l),
              description: propertyShortDescription(p, l) || propertyTitle(p, l),
              image: p.images?.[0],
            },
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: l === "he" ? "דף הבית" : "Home", item: `${SITE}/${l}/` },
          { "@type": "ListItem", position: 2, name: l === "he" ? "נכסים שנמכרו" : "Sold Homes", item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SoldHomes sold={sold} />
    </>
  );
}
