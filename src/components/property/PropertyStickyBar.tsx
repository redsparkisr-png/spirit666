"use client";

import { Calendar, MessageCircle } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import type { Tables } from "@/integrations/supabase/types";
import { trackWhatsAppClick, trackStickyCtaClick } from "@/components/GoogleAnalyticsConsent";

type Property = Tables<"properties_available">;

type Props = {
  property: Property;
  lang: string;
};

const PropertyStickyBar = ({ property, lang }: Props) => {
  const isHe = lang === "he";
  const { t } = useSiteContent();
  const slug = property.slug || property.id;

  const openWhatsApp = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = isHe
      ? `היי, אני מתעניין/ת ב: ${property.title}\n${url}`
      : `Hi, I'm interested in: ${property.title}\n${url}`;
    trackWhatsAppClick("sticky_bar", { property_slug: slug, lang });
    window.open("https://wa.me/972522820632?text=" + encodeURIComponent(text), "_blank");
  };

  const scheduleViewing = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = isHe
      ? `היי חגית, אשמח לתאם סיור בנכס: ${property.title}\n${url}`
      : `Hi Hagit, I'd like to schedule a viewing for: ${property.title}\n${url}`;
    trackStickyCtaClick("sticky_bar", "schedule_viewing");
    window.open("https://wa.me/972522820632?text=" + encodeURIComponent(text), "_blank");
  };

  return (
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-card border-t border-border px-4 py-3 flex gap-3"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <button
        onClick={scheduleViewing}
        className="flex-1 flex items-center justify-center gap-2 bg-gold hover:bg-gold-hover text-white py-3 rounded-lg font-body font-medium text-sm transition-all duration-300"
      >
        <Calendar className="w-4 h-4" />
        {isHe ? "סיור" : "Schedule Viewing"}
      </button>
      <button
        onClick={openWhatsApp}
        className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-body font-medium text-sm transition-colors"
      >
        <MessageCircle className="w-4 h-4" />
        {t("property.detail.whatsapp_cta")}
      </button>
    </div>
  );
};

export default PropertyStickyBar;
