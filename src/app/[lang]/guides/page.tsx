import type { Metadata } from "next";
import { createServerSupabase } from "@/lib/supabase/server";
import Blog from "@/views/Blog";

export const revalidate = 3600;

const META = {
  en: {
    title: "Guides & Insights — Zichron Yaakov Real Estate | Spirit",
    description: "Expert guides on buying property in Zichron Yaakov, the local market, neighborhoods, taxes and the Olim experience.",
  },
  he: {
    title: 'מדריכים ותובנות — נדל"ן בזכרון יעקב | ספיריט',
    description: 'מדריכים מקצועיים לרכישת נכס בזכרון יעקב, שוק הנדל"ן המקומי, שכונות, מיסוי וחוויית העלייה.',
  },
};

const SITE = "https://spiritisraelhomes.com";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const m = META[l];
  const url = `${SITE}/${l}/guides`;
  return {
    // absolute: title already contains the brand — the root layout's "%s | Spirit
    // Real Estate" template would otherwise append it a second time.
    title: { absolute: m.title },
    description: m.description,
    alternates: {
      canonical: url,
      languages: { en: `${SITE}/en/guides`, he: `${SITE}/he/guides`, "x-default": `${SITE}/en/guides` },
    },
    openGraph: { title: m.title, description: m.description, url, locale: l === "he" ? "he_IL" : "en_US", images: [{ url: "/og-image.webp", width: 1200, height: 630 }] },
  };
}

export default async function GuidesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const l = lang === "he" ? "he" : "en";
  const url = `${SITE}/${l}/guides`;
  const supabase = createServerSupabase();
  const [{ data: posts }, { data: categories }] = await Promise.all([
    supabase.from("blog_posts").select("*").eq("status", "published").order("publish_date", { ascending: false }),
    supabase.from("blog_categories").select("*").order("display_order"),
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
        mainEntity: {
          "@type": "ItemList",
          itemListElement: (posts ?? []).map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Article",
              headline: l === "he" ? p.title_he : p.title_en,
              url: `${SITE}/${l}/guides/${p.slug}`,
            },
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: l === "he" ? "דף הבית" : "Home", item: `${SITE}/${l}/` },
          { "@type": "ListItem", position: 2, name: l === "he" ? "מדריכים" : "Guides", item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Blog initialPosts={posts ?? []} initialCategories={categories ?? []} />
    </>
  );
}
