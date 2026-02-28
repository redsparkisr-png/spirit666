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
