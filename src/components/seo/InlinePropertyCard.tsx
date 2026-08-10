"use client";

import Link from "next/link";
import type { Tables } from "@/integrations/supabase/types";
import { propertyTitle, propertyShortDescription } from "@/lib/property-i18n";
import PropertyImageCarousel from "@/components/property/PropertyImageCarousel";

type PropertyRow = Pick<
  Tables<"properties_available">,
  | "id"
  | "slug"
  | "title"
  | "title_he"
  | "short_description"
  | "short_description_he"
  | "price_label"
  | "bedrooms"
  | "built_sqm"
  | "lot_sqm"
  | "images"
>;

const InlinePropertyCard = ({ property, lang }: { property: PropertyRow; lang: string }) => {
  const slug = property.slug ?? property.id;
  const href = `/${lang}/property/${slug}`;
  const images = property.images || [];
  const isHe = lang === "he";
  const title = propertyTitle(property, lang);
  const description = propertyShortDescription(property, lang);
  const sqmUnit = isHe ? 'מ"ר' : "sqm";

  return (
    <Link
      href={href}
      className="block bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
    >
      <PropertyImageCarousel
        images={images}
        altBase={isHe ? `${title}, זכרון יעקב` : `${title}, Zichron Yaakov`}
        noImageText={isHe ? "אין תמונה" : "No image"}
      />

      <div className="p-5">
        {property.price_label && (
          <p className="text-sm font-body font-semibold mb-1.5 bg-gradient-to-r from-gold to-gold-hover bg-clip-text text-transparent">
            {property.price_label}
          </p>
        )}
        <h3 className="text-lg font-display font-semibold text-foreground mb-1 leading-snug">
          {title}
        </h3>
        {description && (
          <p className="text-muted-foreground text-sm font-body mb-3 line-clamp-2">
            {description}
          </p>
        )}
        <div className="flex items-center gap-3 text-xs text-muted-foreground font-body flex-wrap">
          {property.bedrooms != null && (
            <span>
              {property.bedrooms} {isHe ? "חד׳" : "rooms"}
            </span>
          )}
          {property.built_sqm != null && <span>{property.built_sqm} {sqmUnit}</span>}
          {property.lot_sqm != null && (
            <span>
              {isHe ? "מגרש" : "lot"} {property.lot_sqm} {sqmUnit}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default InlinePropertyCard;
