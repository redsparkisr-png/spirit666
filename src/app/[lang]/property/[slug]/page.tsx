import type { Metadata } from "next";
import { createServerSupabase } from "@/lib/supabase/server";
import PropertyDetail from "@/views/PropertyDetail";

export const revalidate = 3600;

const SITE = "https://spiritisraelhomes.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const l = lang === "he" ? "he" : "en";
  const supabase = createServerSupabase();

  let { data: property } = await supabase
    .from("properties_available")
    .select("title, short_description, meta_title, meta_description, og_image, images, slug, id")
    .eq("slug", slug)
    .maybeSingle();

  if (!property) {
    const res = await supabase
      .from("properties_available")
      .select("title, short_description, meta_title, meta_description, og_image, images, slug, id")
      .eq("id", slug)
      .maybeSingle();
    property = res.data;
  }

  if (!property) {
    return { title: "Property Not Found | Spirit Real Estate" };
  }

  const title = property.meta_title || `${property.title} | Spirit Real Estate`;
  const description = property.meta_description || property.short_description || property.title;
  const url = `${SITE}/${l}/property/${property.slug || property.id}`;
  const image = property.og_image || (property.images as string[])?.[0];

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE}/en/property/${property.slug || property.id}`,
        he: `${SITE}/he/property/${property.slug || property.id}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      locale: l === "he" ? "he_IL" : "en_US",
      images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const supabase = createServerSupabase();
  const { data } = await supabase.from("properties_available").select("slug, id");
  const langs = ["en", "he"];
  return (data ?? []).flatMap((p) =>
    langs.map((lang) => ({ lang, slug: p.slug || p.id }))
  );
}

export default function PropertyDetailPage() {
  return <PropertyDetail />;
}
