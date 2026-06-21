import Link from "next/link";
import { createServerSupabase } from "@/lib/supabase/server";
import type { Tables } from "@/integrations/supabase/types";

type PropertyRow = Pick<
  Tables<"properties_available">,
  "id" | "slug" | "title" | "short_description" | "price_label" | "bedrooms" | "built_sqm" | "lot_sqm" | "images"
>;

interface Props {
  lang: string;
  limit?: number;
}

// Async server component — fetches and renders property cards in initial HTML.
// No client-side fetch, no skeleton, no hydration. SEO-safe.
export default async function InlinePropertiesServerBlock({ lang, limit = 12 }: Props) {
  const supabase = createServerSupabase();
  const { data: properties } = await supabase
    .from("properties_available")
    .select(
      "id, slug, title, short_description, price_label, bedrooms, built_sqm, lot_sqm, images"
    )
    .order("priority_order", { ascending: true })
    .limit(limit);

  if (!properties || properties.length === 0) return null;

  const isHe = lang === "he";

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container px-6">
        <h2 className="font-display font-semibold text-foreground text-center mb-10">
          {isHe ? "נכסים זמינים" : "Available Properties"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {properties.map((p) => (
            <PropertyCard key={p.id} property={p} lang={lang} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href={`/${lang}/properties`}
            className="text-sm font-body text-gold hover:text-gold-hover underline underline-offset-4 transition-colors"
          >
            {isHe ? "צפו בכל הנכסים" : "View all properties"}
          </Link>
        </div>
      </div>
    </section>
  );
}

function PropertyCard({ property, lang }: { property: PropertyRow; lang: string }) {
  const slug = property.slug ?? property.id;
  const href = `/${lang}/property/${slug}`;
  const img = property.images?.[0];
  const isHe = lang === "he";

  return (
    <Link
      href={href}
      className="block bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {img ? (
          <img
            src={img}
            alt={property.title}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-sm font-body">
            {isHe ? "אין תמונה" : "No image"}
          </div>
        )}
      </div>

      <div className="p-5">
        {property.price_label && (
          <p className="text-sm font-body font-semibold mb-1.5 bg-gradient-to-r from-gold to-gold-hover bg-clip-text text-transparent">
            {property.price_label}
          </p>
        )}
        <h3 className="text-lg font-display font-semibold text-foreground mb-1 leading-snug">
          {property.title}
        </h3>
        {property.short_description && (
          <p className="text-muted-foreground text-sm font-body mb-3 line-clamp-2">
            {property.short_description}
          </p>
        )}
        <div className="flex items-center gap-3 text-xs text-muted-foreground font-body flex-wrap">
          {property.bedrooms != null && (
            <span>
              {property.bedrooms} {isHe ? "חד׳" : "rooms"}
            </span>
          )}
          {property.built_sqm != null && <span>{property.built_sqm} sqm</span>}
          {property.lot_sqm != null && (
            <span>
              {isHe ? "מגרש" : "lot"} {property.lot_sqm} sqm
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
