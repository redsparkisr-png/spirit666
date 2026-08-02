"use client";

import { useEffect, useState } from "react";
import { Calendar, MessageCircle, Phone } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import type { Tables } from "@/integrations/supabase/types";
import { trackWhatsAppClick, trackStickyCtaClick } from "@/components/GoogleAnalyticsConsent";
import { propertyTitle } from "@/lib/property-i18n";

type Property = Tables<"properties_available">;

type Props = {
  property: Property;
  lang: string;
};

const PropertyStickyBar = ({ property, lang }: Props) => {
  const isHe = lang === "he";
  const { t } = useSiteContent();
  const slug = property.slug || property.id;
  const localizedTitle = propertyTitle(property, lang);

  // Both this bar and the cookie-consent banner are fixed to the very
  // bottom of the screen — without this, the full-width cookie banner
  // (higher z-index) completely hides the Call/Schedule/WhatsApp CTAs for
  // first-time mobile visitors until they dismiss it.
  const [cookieBannerVisible, setCookieBannerVisible] = useState(false);
  useEffect(() => {
    const handleCookie = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setCookieBannerVisible(detail === "visible");
    };
    window.addEventListener("cookie-banner", handleCookie);
    return () => window.removeEventListener("cookie-banner", handleCookie);
  }, []);

  const openWhatsApp = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = isHe
      ? `היי, אני מתעניין/ת ב: ${localizedTitle}\n${url}`
      : `Hi, I'm interested in: ${localizedTitle}\n${url}`;
    trackWhatsAppClick("sticky_bar", { property_slug: slug, lang });
    window.open("https://wa.me/972522820632?text=" + encodeURIComponent(text), "_blank");
  };

  const scheduleViewing = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = isHe
      ? `היי חגית, אשמח לתאם סיור בנכס: ${localizedTitle}\n${url}`
      : `Hi Hagit, I'd like to schedule a viewing for: ${localizedTitle}\n${url}`;
    trackStickyCtaClick("sticky_bar", "schedule_viewing");
    window.open("https://wa.me/972522820632?text=" + encodeURIComponent(text), "_blank");
  };

  return (
    <div
      className={`lg:hidden fixed ${cookieBannerVisible ? "bottom-28" : "bottom-0"} left-0 right-0 z-30 bg-card border-t border-border px-4 py-3 flex gap-3 transition-all duration-300`}
      style={{ paddingBottom: cookieBannerVisible ? undefined : "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <a
        href="tel:+972522820632"
        onClick={() => trackStickyCtaClick("sticky_bar", "call_now")}
        aria-label={isHe ? "התקשרו עכשיו" : "Call now"}
        className="shrink-0 flex items-center justify-center w-12 bg-charcoal hover:bg-charcoal-hover text-white rounded-lg transition-colors"
      >
        <Phone className="w-4 h-4" />
      </a>
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
