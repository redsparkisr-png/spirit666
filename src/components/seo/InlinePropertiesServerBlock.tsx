import Link from "next/link";
import { createServerSupabase } from "@/lib/supabase/server";
import InlinePropertyCard from "@/components/seo/InlinePropertyCard";

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
      "id, slug, title, title_he, short_description, short_description_he, price_label, bedrooms, built_sqm, lot_sqm, images"
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
            <InlinePropertyCard key={p.id} property={p} lang={lang} />
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
