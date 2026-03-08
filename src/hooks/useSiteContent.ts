import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/lib/i18n";
import { useCallback } from "react";

interface SiteContentRow {
  id: string;
  key: string;
  value_en: string;
  value_he: string;
  page: string;
  section: string;
  updated_at: string;
}

export function useSiteContent() {
  const { lang } = useLanguage();

  const { data: rows = [], isLoading } = useQuery<SiteContentRow[]>({
    queryKey: ["site_content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .order("key");
      if (error) throw error;
      return (data ?? []) as SiteContentRow[];
    },
    staleTime: 5 * 60 * 1000,
  });

  // Local fallbacks for keys not yet in CMS
  const localFallbacks: Record<string, Record<string, string>> = {
    "search.more_filters": { en: "More Filters", he: "סינון נוסף" },
    "search.beds_label": { en: "Beds", he: "חדרים" },
    "property.detail.interested_title": { en: "Interested in this home?", he: "מתעניינים בנכס הזה?" },
    "property.detail.inquiry_title": { en: "Request Private Details", he: "בקשת פרטים" },
    "property.detail.name_placeholder": { en: "Full Name", he: "שם מלא" },
    "property.detail.phone_placeholder": { en: "Phone", he: "טלפון" },
    "property.detail.email_placeholder": { en: "Email (optional)", he: "אימייל (אופציונלי)" },
    "property.detail.message_placeholder": { en: "Message", he: "הודעה" },
    "property.detail.send_inquiry": { en: "Send Inquiry", he: "שליחת פנייה" },
    "property.detail.inquiry_success": { en: "Thanks — we'll get back to you shortly!", he: "תודה — נחזור אליכם בהקדם!" },
    "property.detail.validation_error": { en: "Please enter your name and phone.", he: "נא להזין שם וטלפון." },
    "property.detail.whatsapp_cta": { en: "WhatsApp Us", he: "וואטסאפ" },
    "property.detail.not_found": { en: "Property not found", he: "הנכס לא נמצא" },
    "property.detail.back_to_listings": { en: "Back to listings", he: "חזרה לנכסים" },
    "property.detail.price_upon_request": { en: "Price upon request", he: "מחיר לפי בקשה" },
    "property.detail.bedrooms": { en: "Bedrooms", he: "חדרי שינה" },
    "property.detail.built_sqm": { en: "Built m²", he: 'מ"ר בנוי' },
    "property.detail.lot_sqm": { en: "Lot m²", he: 'מ"ר מגרש' },
    "property.detail.overview": { en: "Overview", he: "סקירה" },
    "property.detail.location_title": { en: "Location", he: "מיקום" },
    "property.detail.fomo_line": { en: "Premium properties in this area don't stay available long.", he: "נכסי פרימיום באזור הזה לא נשארים זמינים לאורך זמן." },
    "property.detail.similar_title": { en: "Similar Properties", he: "נכסים דומים" },
    "property.detail.privacy_note": { en: "Your details are kept confidential.", he: "פרטיכם נשמרים בסודיות." },
    "home.trust_line.item_1": { en: "Licensed Professionals", he: "מתווכים מורשים" },
    "home.trust_line.item_2": { en: "70+ Families", he: "70+ משפחות" },
    "home.trust_line.item_3": { en: "Strategic Negotiation", he: "משא ומתן אסטרטגי" },
    "home.trust_line.item_4": { en: "Local Specialists", he: "מומחים מקומיים" },
  };

  const t = useCallback(
    (key: string): string => {
      const row = rows.find((r) => r.key === key);
      if (!row) {
        const fb = localFallbacks[key];
        if (fb) return lang === "he" ? fb.he : fb.en;
        if (import.meta.env.DEV) {
          console.warn(`[i18n] Missing key: "${key}"`);
        }
        return key;
      }
      const val = lang === "he" ? row.value_he : row.value_en;
      if (!val && lang === "he") return row.value_en || key;
      return val || key;
    },
    [rows, lang]
  );

  return { t, rows, isLoading };
}
