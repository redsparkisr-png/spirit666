import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save, Loader2, Upload } from "lucide-react";

const HERO_KEYS = [
  { key: "home.hero.pre_title", label: "Pre-Title (Brand Label)" },
  { key: "home.hero.headline", label: "Headline" },
  { key: "home.hero.subline", label: "Subtitle" },
  { key: "home.hero.anchor_text", label: "Supporting Line" },
  { key: "home.hero.cta_primary", label: "Primary CTA Label" },
  { key: "home.hero.cta_secondary", label: "Secondary CTA Label" },
  { key: "home.hero.helper_text", label: "Helper Text (below CTAs)" },
  { key: "home.hero.trust_1", label: "Trust Badge 1" },
  { key: "home.hero.trust_2", label: "Trust Badge 2" },
  { key: "home.hero.trust_3", label: "Trust Badge 3" },
];

interface ContentRow {
  id: string;
  key: string;
  value_en: string;
  value_he: string;
  page: string;
  section: string;
}

const HeroManager = () => {
  const [rows, setRows] = useState<ContentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [edits, setEdits] = useState<Record<string, { value_en: string; value_he: string }>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("site_content")
      .select("*")
      .in("key", HERO_KEYS.map((k) => k.key));
    if (data) setRows(data as ContentRow[]);
    setLoading(false);
  };

  const getRow = (key: string) => rows.find((r) => r.key === key);
  const getVal = (key: string, lang: "en" | "he") => {
    const edit = edits[key];
    if (edit) return lang === "en" ? edit.value_en : edit.value_he;
    const row = getRow(key);
    if (row) return lang === "en" ? row.value_en : row.value_he;
    return "";
  };

  const handleEdit = (key: string, lang: "en" | "he", value: string) => {
    const row = getRow(key);
    setEdits((prev) => ({
      ...prev,
      [key]: {
        value_en: lang === "en" ? value : (prev[key]?.value_en ?? row?.value_en ?? ""),
        value_he: lang === "he" ? value : (prev[key]?.value_he ?? row?.value_he ?? ""),
      },
    }));
  };

  const saveAll = async () => {
    setSaving(true);
    for (const [key, vals] of Object.entries(edits)) {
      const row = getRow(key);
      if (row) {
        await supabase.from("site_content").update({ value_en: vals.value_en, value_he: vals.value_he }).eq("id", row.id);
      } else {
        await supabase.from("site_content").insert({
          key,
          value_en: vals.value_en,
          value_he: vals.value_he,
          page: "home",
          section: "hero",
        } as any);
      }
    }
    toast.success("Hero settings saved");
    setEdits({});
    await loadContent();
    setSaving(false);
  };

  const isDirty = Object.keys(edits).length > 0;
  const inputCls = "w-full px-3 py-2 border border-border rounded-md bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-foreground text-lg">🏠 Hero Section</h3>
        {isDirty && (
          <button
            onClick={saveAll}
            disabled={saving}
            className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-md font-body text-sm hover:bg-primary/90 disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save All
          </button>
        )}
      </div>
      <p className="text-xs text-muted-foreground font-body">
        Edit hero section content below. Changes apply to the homepage hero in both languages.
      </p>

      {/* Text fields */}
      {HERO_KEYS.map(({ key, label }) => {
        const isTextarea = key === "home.hero.headline" || key === "home.hero.subline" || key === "home.hero.anchor_text";
        return (
          <div key={key} className="bg-card border border-border rounded-lg p-4 space-y-3">
            <label className="text-xs font-body text-muted-foreground uppercase tracking-wide block">{label}</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-body text-muted-foreground mb-1 block">English</label>
                {isTextarea ? (
                  <textarea
                    value={getVal(key, "en")}
                    onChange={(e) => handleEdit(key, "en", e.target.value)}
                    placeholder={`${label} (EN)...`}
                    rows={2}
                    className={`${inputCls} resize-y`}
                  />
                ) : (
                  <input
                    value={getVal(key, "en")}
                    onChange={(e) => handleEdit(key, "en", e.target.value)}
                    placeholder={`${label} (EN)...`}
                    className={inputCls}
                  />
                )}
              </div>
              <div dir="rtl">
                <label className="text-[10px] font-body text-muted-foreground mb-1 block">עברית</label>
                {isTextarea ? (
                  <textarea
                    value={getVal(key, "he")}
                    onChange={(e) => handleEdit(key, "he", e.target.value)}
                    placeholder={`${label} (HE)...`}
                    rows={2}
                    className={`${inputCls} resize-y`}
                  />
                ) : (
                  <input
                    value={getVal(key, "he")}
                    onChange={(e) => handleEdit(key, "he", e.target.value)}
                    placeholder={`${label} (HE)...`}
                    className={inputCls}
                  />
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HeroManager;
