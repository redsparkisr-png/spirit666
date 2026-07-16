import type { Metadata } from "next";
import { permanentRedirect, notFound } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";
import type { Tables } from "@/integrations/supabase/types";
import PropertyDetail from "@/views/PropertyDetail";
import { propertyTitle, propertyShortDescription, schemaPrice } from "@/lib/property-i18n";

export const revalidate = 3600;

const SITE = "https://spiritisraelhomes.com";

type Property = Tables<"properties_available">;

async function loadProperty(slug: string): Promise<{ property: Property | null; foundByUUID: boolean }> {
  const supabase = createServerSupabase();
  const { data: bySlug } = await supabase.from("properties_available").select("*").eq("slug", slug).maybeSingle();
  if (bySlug) return { property: bySlug as Property, foundByUUID: false };
  const { data: byId } = await supabase.from("properties_available").select("*").eq("id", slug).maybeSingle();
  return { property: byId as Property | null, foundByUUID: true };
}

const SPIRIT = {
  "@type": "RealEstateAgent",
  name: "Spirit Real Estate",
  url: SITE,
  telephone: "+972-52-282-0632",
  email: "info@spiritisraelhomes.com",
  logo: `${SITE}/og-image.webp`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Zichron Yaakov",
    addressLocality: "Zichron Yaakov",
    addressRegion: "Haifa District",
    postalCode: "3090500",
    addressCountry: "IL",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 32.5711,
    longitude: 34.9498,
  },
  areaServed: {
    "@type": "City",
    name: "Zichron Yaakov",
    containedInPlace: { "@type": "Country", name: "Israel" },
  },
};

function buildPropertySchema(p: Property, lang: string) {
  const slug = p.slug || p.id;
  const l = lang === "he" ? "he" : "en";
  const url = `${SITE}/${l}/property/${slug}`;
  const datePosted = (p.created_at || new Date().toISOString()).split("T")[0];

  const listing: Record<string, any> = {
    "@type": "RealEstateListing",
    "@id": `${url}#listing`,
    name: propertyTitle(p, l),
    description: propertyShortDescription(p, l) || propertyTitle(p, l),
    url,
    datePosted,
    inLanguage: l,
    broker: SPIRIT,
  };

  if (p.images?.length) listing.image = p.images.slice(0, 6);

  if (p.price_number) {
    listing.offers = {
      "@type": "Offer",
      price: schemaPrice(p.price_number),
      priceCurrency: p.currency || "ILS",
      availability: "https://schema.org/InStock",
      url,
    };
  } else if (p.price_label) {
    listing.offers = {
      "@type": "Offer",
      name: p.price_label,
      priceCurrency: "ILS",
      availability: "https://schema.org/InStock",
    };
  }

  listing.contentLocation = {
    "@type": "Place",
    name: p.location || "Zichron Yaakov",
    address: {
      "@type": "PostalAddress",
      addressLocality: p.location || "Zichron Yaakov",
      addressRegion: "Haifa District",
      postalCode: "3090500",
      addressCountry: "IL",
    },
    geo: { "@type": "GeoCoordinates", latitude: 32.5711, longitude: 34.9498 },
  };

  const amenities: Record<string, any>[] = [];
  if (p.bedrooms) amenities.push({ "@type": "LocationFeatureSpecification", name: "Rooms", value: p.bedrooms });
  if (p.built_sqm) amenities.push({ "@type": "LocationFeatureSpecification", name: "Built area (m²)", value: p.built_sqm });
  if (p.lot_sqm) amenities.push({ "@type": "LocationFeatureSpecification", name: "Lot area (m²)", value: p.lot_sqm });
  if ((p.tags as string[])?.length) {
    (p.tags as string[]).forEach((t) => amenities.push({ "@type": "LocationFeatureSpecification", name: t, value: true }));
  }
  if (amenities.length) listing.amenityFeature = amenities;
  if (p.bedrooms) listing.numberOfRooms = p.bedrooms;
  if (p.built_sqm) listing.floorSize = { "@type": "QuantitativeValue", value: p.built_sqm, unitCode: "MTK" };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: l === "he" ? "דף הבית" : "Home", item: `${SITE}/${l}/` },
      { "@type": "ListItem", position: 2, name: l === "he" ? "נכסים" : "Properties", item: `${SITE}/${l}/properties` },
      { "@type": "ListItem", position: 3, name: propertyTitle(p, l), item: url },
    ],
  };

  return { "@context": "https://schema.org", "@graph": [listing, breadcrumb] };
}

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
    .select("title, title_he, short_description, short_description_he, meta_title, meta_description, og_image, images, slug, id")
    .eq("slug", slug)
    .maybeSingle();

  if (!property) {
    const res = await supabase
      .from("properties_available")
      .select("title, title_he, short_description, short_description_he, meta_title, meta_description, og_image, images, slug, id")
      .eq("id", slug)
      .maybeSingle();
    property = res.data;
  }

  if (!property) {
    return { title: "Property Not Found | Spirit Real Estate" };
  }

  const localizedTitle = propertyTitle(property, l);
  const localizedShort = propertyShortDescription(property, l);
  const brand = l === "he" ? 'ספיריט נדל"ן' : "Spirit Real Estate";
  const title = l === "he" && property.title_he
    ? `${localizedTitle} | ${brand}`
    : property.meta_title || `${localizedTitle} | ${brand}`;
  const description = (l === "he" && localizedShort) || property.meta_description || localizedShort || localizedTitle;
  // Always use clean slug as canonical; fall back to id only when slug is absent
  const canonicalId = property.slug || property.id;
  const url = `${SITE}/${l}/property/${canonicalId}`;
  const image = property.og_image || (property.images as string[])?.[0];

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${SITE}/en/property/${canonicalId}`,
        he: `${SITE}/he/property/${canonicalId}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      locale: l === "he" ? "he_IL" : "en_US",
      images: [{ url: image || "/og-image.webp", width: 1200, height: 630 }],
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

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const l = lang === "he" ? "he" : "en";
  const { property, foundByUUID } = await loadProperty(slug);

  if (!property) notFound();

  // Permanent redirect: UUID URL → clean slug URL when a slug exists
  if (foundByUUID && property.slug) {
    permanentRedirect(`/${l}/property/${property.slug}`);
  }

  const supabase = createServerSupabase();
  const { data: sim } = await supabase.from("properties_available").select("*").neq("id", property.id).limit(3);
  const similar: Property[] = sim ?? [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildPropertySchema(property, lang)) }}
      />
      <PropertyDetail property={property} similar={similar} lang={l} />
    </>
  );
}
