import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save, Loader2, Upload } from "lucide-react";

const HERO_KEYS = [
  { key: "home.hero.headline", label: "Headline" },
  { key: "home.hero.subheadline", label: "Subheadline" },
  { key: "home.hero.location_strip", label: "Location Strip Text" },
  { key: "home.hero.cta_primary_label", label: "Primary CTA Label" },
  { key: "home.hero.cta_primary_link", label: "Primary CTA Link" },
  { key: "home.hero.cta_secondary_label", label: "Secondary CTA Label" },
  { key: "home.hero.cta_secondary_link", label: "Secondary CTA Link" },
  { key: "home.hero.image_url", label: "Hero Image URL" },
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
  const [uploading, setUploading] = useState(false);

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

  const uploadHeroImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `hero/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("images").upload(path, file);
    if (error) { toast.error(error.message); setUploading(false); return; }
    const { data } = supabase.storage.from("images").getPublicUrl(path);
    handleEdit("home.hero.image_url", "en", data.publicUrl);
    handleEdit("home.hero.image_url", "he", data.publicUrl);
    setUploading(false);
    e.target.value = "";
    toast.success("Hero image uploaded — click Save All to apply");
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
        Edit hero section content below. Changes apply to the homepage hero.
        Leave fields empty to use default hardcoded values.
      </p>

      {/* Hero Image Upload */}
      <div className="bg-card border border-border rounded-lg p-4 space-y-3">
        <label className="text-xs font-body text-muted-foreground uppercase tracking-wide block">Hero Image</label>
        {getVal("home.hero.image_url", "en") && (
          <div className="aspect-[16/9] max-w-md rounded-lg overflow-hidden border border-border">
            <img src={getVal("home.hero.image_url", "en")} alt="Hero preview" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex gap-3 items-center">
          <label className="cursor-pointer inline-flex items-center gap-1.5 text-sm bg-primary/10 text-primary px-3 py-1.5 rounded-md hover:bg-primary/20">
            <Upload className="w-3.5 h-3.5" />
            {uploading ? "Uploading..." : "Upload New Image"}
            <input type="file" accept="image/*" onChange={uploadHeroImage} className="hidden" disabled={uploading} />
          </label>
          <span className="text-xs text-muted-foreground font-body">or paste URL below</span>
        </div>
        <input
          value={getVal("home.hero.image_url", "en")}
          onChange={(e) => { handleEdit("home.hero.image_url", "en", e.target.value); handleEdit("home.hero.image_url", "he", e.target.value); }}
          placeholder="Image URL..."
          className={inputCls}
        />
      </div>

      {/* Text fields */}
      {HERO_KEYS.filter((k) => k.key !== "home.hero.image_url").map(({ key, label }) => (
        <div key={key} className="bg-card border border-border rounded-lg p-4 space-y-3">
          <label className="text-xs font-body text-muted-foreground uppercase tracking-wide block">{label}</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-body text-muted-foreground mb-1 block">English</label>
              <input
                value={getVal(key, "en")}
                onChange={(e) => handleEdit(key, "en", e.target.value)}
                placeholder={`${label} (EN)...`}
                className={inputCls}
              />
            </div>
            <div dir="rtl">
              <label className="text-[10px] font-body text-muted-foreground mb-1 block">עברית</label>
              <input
                value={getVal(key, "he")}
                onChange={(e) => handleEdit(key, "he", e.target.value)}
                placeholder={`${label} (HE)...`}
                className={inputCls}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroManager;
