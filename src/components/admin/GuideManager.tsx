import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Copy, ChevronDown, ChevronUp, Save, Upload, Trash2, Link as LinkIcon, Image } from "lucide-react";

const SECTION_LABELS = [
  { n: 1, label: "Why Zichron Yaakov" },
  { n: 2, label: "The Anglo Olim Experience" },
  { n: 3, label: "The Lifestyle" },
  { n: 4, label: "Ramat HaNadiv" },
  { n: 5, label: "Education" },
  { n: 6, label: "Neighborhood Deep Dive" },
  { n: 7, label: "Market Data" },
  { n: 8, label: "The Investment Angle" },
  { n: 9, label: "Olim Tax Benefits" },
  { n: 10, label: "Conservation & Future Growth" },
  { n: 11, label: "Critical Mistakes to Avoid" },
  { n: 12, label: "Your Buying Roadmap" },
  { n: 13, label: "Why Spirit Real Estate" },
];

type GuideSection = {
  id?: string;
  section_number: number;
  title: string;
  subtitle: string;
  body: string;
  images: string[];
  image_captions: string[];
  quote_text: string;
  quote_source: string;
};

const emptySection = (n: number): GuideSection => ({
  section_number: n,
  title: "",
  subtitle: "",
  body: "",
  images: [],
  image_captions: [],
  quote_text: "",
  quote_source: "",
});

const GuideManager = () => {
  const [token, setToken] = useState("");
  const [tokenLoading, setTokenLoading] = useState(true);
  const [sections, setSections] = useState<GuideSection[]>([]);
  const [openSection, setOpenSection] = useState<number | null>(null);
  const [saving, setSaving] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadTarget, setUploadTarget] = useState<number | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      const { data } = await supabase
        .from("site_content")
        .select("value_en")
        .eq("key", "access_token")
        .eq("page", "buyer_guide")
        .single();
      if (data) setToken(data.value_en);
      setTokenLoading(false);
    };
    const loadSections = async () => {
      const { data } = await (supabase as any)
        .from("buyer_guide_sections")
        .select("*")
        .order("section_number");
      if (data) setSections(data);
    };
    loadToken();
    loadSections();
  }, []);

  const saveToken = async () => {
    const { error } = await supabase
      .from("site_content")
      .update({ value_en: token, value_he: token })
      .eq("key", "access_token")
      .eq("page", "buyer_guide");
    if (error) toast.error("Failed to save token");
    else toast.success("Access token updated");
  };

  const copyLink = (lang: string) => {
    const url = `${window.location.origin}/${lang}/buyer-guide-2026?token=${token}`;
    navigator.clipboard.writeText(url);
    toast.success(`${lang.toUpperCase()} link copied`);
  };

  const getSectionData = (n: number): GuideSection => {
    return sections.find((s) => s.section_number === n) || emptySection(n);
  };

  const updateField = (n: number, field: keyof GuideSection, value: any) => {
    setSections((prev) => {
      const existing = prev.find((s) => s.section_number === n);
      if (existing) {
        return prev.map((s) => (s.section_number === n ? { ...s, [field]: value } : s));
      }
      return [...prev, { ...emptySection(n), [field]: value }];
    });
  };

  const saveSection = async (n: number) => {
    setSaving(n);
    const section = getSectionData(n);
    const payload = {
      section_number: n,
      title: section.title,
      subtitle: section.subtitle,
      body: section.body,
      images: section.images,
      image_captions: section.image_captions,
      quote_text: section.quote_text,
      quote_source: section.quote_source,
    };

    if (section.id) {
      const { error } = await (supabase as any)
        .from("buyer_guide_sections")
        .update(payload)
        .eq("id", section.id);
      if (error) toast.error("Failed to save");
      else toast.success(`Section ${n} saved`);
    } else {
      const { data, error } = await (supabase as any)
        .from("buyer_guide_sections")
        .insert(payload)
        .select()
        .single();
      if (error) toast.error("Failed to save: " + error.message);
      else {
        toast.success(`Section ${n} saved`);
        setSections((prev) => [
          ...prev.filter((s) => s.section_number !== n),
          data,
        ]);
      }
    }
    setSaving(null);
  };

  const handleImageUpload = async (sectionNumber: number, file: File) => {
    const ext = file.name.split(".").pop();
    const path = `guide/section-${sectionNumber}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("images").upload(path, file);
    if (error) {
      toast.error("Upload failed");
      return;
    }
    const { data: urlData } = supabase.storage.from("images").getPublicUrl(path);
    const section = getSectionData(sectionNumber);
    updateField(sectionNumber, "images", [...section.images, urlData.publicUrl]);
    updateField(sectionNumber, "image_captions", [...section.image_captions, ""]);
    toast.success("Image uploaded");
  };

  const removeImage = (sectionNumber: number, index: number) => {
    const section = getSectionData(sectionNumber);
    updateField(
      sectionNumber,
      "images",
      section.images.filter((_, i) => i !== index)
    );
    updateField(
      sectionNumber,
      "image_captions",
      section.image_captions.filter((_, i) => i !== index)
    );
  };

  const inputCls = "w-full px-3 py-2 rounded-md border border-border bg-background text-foreground font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";

  return (
    <div className="space-y-6">
      {/* Access Token Management */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="font-display font-semibold text-foreground text-lg mb-4">
          🔐 Access Control
        </h3>
        <p className="text-sm font-body text-muted-foreground mb-4">
          The guide is protected by an access token. Share the link below with clients who should see it.
        </p>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Access token..."
            className={inputCls}
          />
          <button
            onClick={saveToken}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-body font-medium hover:bg-primary/90 shrink-0"
          >
            Save
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => copyLink("en")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-body bg-muted rounded-md hover:bg-muted/80 text-foreground"
          >
            <Copy className="w-3.5 h-3.5" /> Copy EN Link
          </button>
          <button
            onClick={() => copyLink("he")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-body bg-muted rounded-md hover:bg-muted/80 text-foreground"
          >
            <Copy className="w-3.5 h-3.5" /> Copy HE Link
          </button>
        </div>

        {token && (
          <p className="mt-3 text-xs font-body text-muted-foreground break-all">
            <LinkIcon className="w-3 h-3 inline mr-1" />
            {window.location.origin}/en/buyer-guide-2026?token={token}
          </p>
        )}
      </div>

      {/* Section Editors */}
      <div className="space-y-3">
        <h3 className="font-display font-semibold text-foreground text-lg">
          📝 Guide Sections
        </h3>
        <p className="text-sm font-body text-muted-foreground">
          Edit section content below. Leave fields empty to use the default hardcoded content.
        </p>

        {SECTION_LABELS.map(({ n, label }) => {
          const section = getSectionData(n);
          const isOpen = openSection === n;
          const hasData = !!section.id;

          return (
            <div key={n} className="bg-card rounded-lg border border-border overflow-hidden">
              <button
                onClick={() => setOpenSection(isOpen ? null : n)}
                className="w-full flex items-center justify-between px-5 py-3 text-left hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display text-xs font-semibold">
                    {String(n).padStart(2, "0")}
                  </span>
                  <span className="font-body font-medium text-foreground text-sm">
                    {label}
                  </span>
                  {hasData && (
                    <span className="text-[10px] font-body bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      Customized
                    </span>
                  )}
                </div>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 space-y-4 border-t border-border pt-4">
                  {/* Title */}
                  <div>
                    <label className="text-xs font-body text-muted-foreground mb-1 block">
                      Title
                    </label>
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => updateField(n, "title", e.target.value)}
                      placeholder={label}
                      className={inputCls}
                    />
                  </div>

                  {/* Subtitle */}
                  <div>
                    <label className="text-xs font-body text-muted-foreground mb-1 block">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={section.subtitle}
                      onChange={(e) => updateField(n, "subtitle", e.target.value)}
                      placeholder="Section subtitle..."
                      className={inputCls}
                    />
                  </div>

                  {/* Body */}
                  <div>
                    <label className="text-xs font-body text-muted-foreground mb-1 block">
                      Body Text (paragraphs separated by blank lines)
                    </label>
                    <textarea
                      value={section.body}
                      onChange={(e) => updateField(n, "body", e.target.value)}
                      placeholder="Main section text..."
                      rows={6}
                      className={inputCls + " resize-y"}
                    />
                  </div>

                  {/* Quote */}
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-body text-muted-foreground mb-1 block">
                        Quote Text
                      </label>
                      <input
                        type="text"
                        value={section.quote_text}
                        onChange={(e) => updateField(n, "quote_text", e.target.value)}
                        placeholder="Quote..."
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-body text-muted-foreground mb-1 block">
                        Quote Source
                      </label>
                      <input
                        type="text"
                        value={section.quote_source}
                        onChange={(e) => updateField(n, "quote_source", e.target.value)}
                        placeholder="— Source"
                        className={inputCls}
                      />
                    </div>
                  </div>

                  {/* Images */}
                  <div>
                    <label className="text-xs font-body text-muted-foreground mb-2 block">
                      Images
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                      {section.images.map((url, idx) => (
                        <div key={idx} className="relative group">
                          <div className="aspect-[4/3] rounded-md overflow-hidden border border-border">
                            <img
                              src={url}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <input
                            type="text"
                            value={section.image_captions[idx] || ""}
                            onChange={(e) => {
                              const captions = [...section.image_captions];
                              captions[idx] = e.target.value;
                              updateField(n, "image_captions", captions);
                            }}
                            placeholder="Caption..."
                            className="w-full mt-1 px-2 py-1 text-xs border border-border rounded bg-background text-foreground"
                          />
                          <button
                            onClick={() => removeImage(n, idx)}
                            className="absolute top-1 right-1 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <input
                      ref={uploadTarget === n ? fileInputRef : undefined}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(n, file);
                        e.target.value = "";
                      }}
                    />
                    <button
                      onClick={() => {
                        setUploadTarget(n);
                        setTimeout(() => fileInputRef.current?.click(), 50);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-body bg-muted rounded-md hover:bg-muted/80 text-foreground"
                    >
                      <Upload className="w-3.5 h-3.5" /> Upload Image
                    </button>
                  </div>

                  {/* Save */}
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => saveSection(n)}
                      disabled={saving === n}
                      className="inline-flex items-center gap-1.5 px-5 py-2 bg-primary text-primary-foreground rounded-md text-sm font-body font-medium hover:bg-primary/90 disabled:opacity-60"
                    >
                      <Save className="w-4 h-4" />
                      {saving === n ? "Saving..." : "Save Section"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Hidden file input for uploads */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file && uploadTarget !== null) handleImageUpload(uploadTarget, file);
          e.target.value = "";
        }}
      />
    </div>
  );
};

export default GuideManager;
