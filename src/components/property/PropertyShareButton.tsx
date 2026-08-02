"use client";

import { Share2 } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";
import { propertyTitle } from "@/lib/property-i18n";

type Property = Tables<"properties_available">;

type Props = {
  property: Property;
  lang: string;
};

const PropertyShareButton = ({ property, lang }: Props) => {
  const isHe = lang === "he";

  const priceText = property.price_label
    ? property.price_label
    : property.price_number
      ? (isHe ? `₪${Number(property.price_number).toLocaleString()}` : `ILS ${Number(property.price_number).toLocaleString()}`)
      : (isHe ? "מחיר לפי בקשה" : "Price Upon Request");

  const shareOnWhatsApp = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const roomsText = property.bedrooms ? (isHe ? `${property.bedrooms} חדרים` : `${property.bedrooms} rooms`) : "";
    const facts = [priceText, roomsText, property.location].filter(Boolean).join(" · ");
    const text = `${propertyTitle(property, lang)}\n${facts}\n${url}`;
    window.open("https://wa.me/?text=" + encodeURIComponent(text), "_blank");
  };

  return (
    <button
      onClick={shareOnWhatsApp}
      className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground font-body text-sm transition-colors"
    >
      <Share2 className="w-4 h-4" aria-hidden="true" />
      {isHe ? "שיתוף" : "Share"}
    </button>
  );
};

export default PropertyShareButton;
