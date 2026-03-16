import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save, Loader2, MessageCircle } from "lucide-react";

const WA_KEYS = [
  { key: "whatsapp.phone_number", label: "Phone Number (e.g. 972522820632)" },
  { key: "whatsapp.default_message", label: "Default WhatsApp Message" },
  { key: "whatsapp.contact_name", label: "Contact Name" },
  { key: "whatsapp.cta_label", label: "CTA Button Label" },
  { key: "whatsapp.hero_message", label: "Hero Section Message" },
  { key: "whatsapp.guide_message", label: "Guide Section Message" },
  { key: "whatsapp.closing_message", label: "Closing CTA Message" },
  { key: "whatsapp.closing_guide_message", label: "Closing Guide CTA Message" },
  { key: "whatsapp.team_message", label: "Team Section Message" },
  { key: "whatsapp.offmarket_message", label: "Off-Market CTA Message" },
];

interface ContentRow {
  id: string;
  key: string;
  value_en: string;
  value_he: string;
}

const WhatsAppManager = () => {
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
      .in("key", WA_KEYS.map((k) => k.key));
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
          page: "global",
          section: "whatsapp",
        } as any);
      }
    }
    toast.success("WhatsApp settings saved");
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
        <h3 className="font-display font-semibold text-foreground text-lg flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-[hsl(142,70%,40%)]" /> WhatsApp Settings
        </h3>
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
        Control WhatsApp messaging defaults. Leave fields empty to use current hardcoded values.
      </p>

      {WA_KEYS.map(({ key, label }) => {
        const isTextarea = key.includes("message");
        const isPhone = key === "whatsapp.phone_number";

        return (
          <div key={key} className="bg-card border border-border rounded-lg p-4 space-y-3">
            <label className="text-xs font-body text-muted-foreground uppercase tracking-wide block">{label}</label>
            {isPhone ? (
              <input
                value={getVal(key, "en")}
                onChange={(e) => { handleEdit(key, "en", e.target.value); handleEdit(key, "he", e.target.value); }}
                placeholder="972522820632"
                className={inputCls}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-body text-muted-foreground mb-1 block">English</label>
                  {isTextarea ? (
                    <textarea
                      value={getVal(key, "en")}
                      onChange={(e) => handleEdit(key, "en", e.target.value)}
                      rows={3}
                      placeholder="Default message..."
                      className={`${inputCls} resize-y`}
                    />
                  ) : (
                    <input value={getVal(key, "en")} onChange={(e) => handleEdit(key, "en", e.target.value)} placeholder={`${label} (EN)`} className={inputCls} />
                  )}
                </div>
                <div dir="rtl">
                  <label className="text-[10px] font-body text-muted-foreground mb-1 block">עברית</label>
                  {isTextarea ? (
                    <textarea
                      value={getVal(key, "he")}
                      onChange={(e) => handleEdit(key, "he", e.target.value)}
                      rows={3}
                      placeholder="הודעת ברירת מחדל..."
                      className={`${inputCls} resize-y`}
                    />
                  ) : (
                    <input value={getVal(key, "he")} onChange={(e) => handleEdit(key, "he", e.target.value)} placeholder={`${label} (HE)`} className={inputCls} />
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default WhatsAppManager;
