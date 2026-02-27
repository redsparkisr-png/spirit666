import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BedDouble, Ruler, LandPlot, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { useLanguage } from "@/lib/i18n";
import { useSiteContent } from "@/hooks/useSiteContent";
import Header from "@/components/Header";
import { toast } from "sonner";

type Property = Tables<"properties_available">;

const PropertyDetail = () => {
  const { slug } = useParams();
  const { lang } = useLanguage();
  const { t } = useSiteContent();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImg, setCurrentImg] = useState(0);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      // Try slug first, then id
      let { data } = await supabase
        .from("properties_available")
        .select("*")
        .eq("slug", slug || "")
        .maybeSingle();
      if (!data) {
        const res = await supabase.from("properties_available").select("*").eq("id", slug || "").maybeSingle();
        data = res.data;
      }
      setProperty(data);
      setLoading(false);
    };
    load();
  }, [slug]);

  const handleInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast.error(t("property.detail.validation_error"));
      return;
    }
    setSubmitting(true);
    await supabase.from("leads").insert({
      full_name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || null,
      message: formData.message.trim() || null,
      source: `property_${property?.slug || property?.id || "detail"}`,
    });
    toast.success(t("property.detail.inquiry_success"));
    setFormData({ name: "", phone: "", email: "", message: "" });
    setSubmitting(false);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="container px-6 py-20 flex justify-center">
          <div className="w-8 h-8 border-2 border-charcoal border-t-transparent rounded-full animate-spin" />
        </div>
      </main>
    );
  }

  if (!property) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="container px-6 py-20 text-center">
          <h1 className="text-2xl font-display font-semibold text-foreground mb-4">
            {t("property.detail.not_found")}
          </h1>
          <Link to={`/${lang}/properties`} className="text-charcoal underline font-body text-sm">
            {t("property.detail.back_to_listings")}
          </Link>
        </div>
      </main>
    );
  }

  const images = property.images || [];

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Gallery */}
      <div className="relative w-full aspect-[16/9] md:aspect-[2.4/1] bg-muted overflow-hidden">
        {images.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground font-body">
            No images
          </div>
        ) : (
          <>
            {images.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`${property.title} – ${idx + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                style={{ opacity: currentImg === idx ? 1 : 0 }}
                loading={idx === 0 ? "eager" : "lazy"}
              />
            ))}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImg((c) => (c - 1 + images.length) % images.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentImg((c) => (c + 1) % images.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm text-white text-xs font-body px-3 py-1 rounded-full">
                  {currentImg + 1} / {images.length}
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="container px-6 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {images.map((url, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImg(idx)}
              className={`flex-shrink-0 w-16 h-12 rounded-md overflow-hidden border-2 transition-colors ${
                currentImg === idx ? "border-charcoal" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img src={url} alt="" className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}

      <div className="container px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <Link
                to={`/${lang}/properties`}
                className="text-sm text-muted-foreground font-body hover:text-foreground transition-colors mb-4 inline-block"
              >
                ← {t("property.detail.back_to_listings")}
              </Link>
              <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-2">
                {property.title}
              </h1>
              {property.neighborhood_note && (
                <p className="text-muted-foreground font-body">{property.neighborhood_note}</p>
              )}
            </div>

            {/* Price */}
            <div>
              {property.price_label ? (
                <p className="text-2xl font-display font-semibold text-gold">{property.price_label}</p>
              ) : (
                <p className="text-lg font-body text-muted-foreground italic">
                  {t("property.detail.price_upon_request")}
                </p>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {property.bedrooms && (
                <div className="bg-card rounded-xl p-4 text-center border border-border">
                  <BedDouble className="w-5 h-5 mx-auto mb-2 text-charcoal" />
                  <p className="font-display font-semibold text-foreground">{property.bedrooms}</p>
                  <p className="text-xs text-muted-foreground font-body">{t("property.detail.bedrooms")}</p>
                </div>
              )}
              {property.built_sqm && (
                <div className="bg-card rounded-xl p-4 text-center border border-border">
                  <Ruler className="w-5 h-5 mx-auto mb-2 text-charcoal" />
                  <p className="font-display font-semibold text-foreground">{property.built_sqm}</p>
                  <p className="text-xs text-muted-foreground font-body">{t("property.detail.built_sqm")}</p>
                </div>
              )}
              {property.lot_sqm && (
                <div className="bg-card rounded-xl p-4 text-center border border-border">
                  <LandPlot className="w-5 h-5 mx-auto mb-2 text-charcoal" />
                  <p className="font-display font-semibold text-foreground">{property.lot_sqm}</p>
                  <p className="text-xs text-muted-foreground font-body">{t("property.detail.lot_sqm")}</p>
                </div>
              )}
            </div>

            {/* Description */}
            {property.short_description && (
              <div>
                <h2 className="text-xl font-display font-semibold text-foreground mb-3">
                  {t("property.detail.overview")}
                </h2>
                <p className="text-muted-foreground font-body leading-relaxed">{property.short_description}</p>
              </div>
            )}

            {/* FOMO line */}
            <p className="text-sm text-bronze font-body italic">
              {t("property.detail.fomo_line")}
            </p>
          </div>

          {/* Sidebar inquiry form */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-card rounded-xl border border-border p-6 space-y-4">
              <h3 className="font-display font-semibold text-foreground text-lg">
                {t("property.detail.inquiry_title")}
              </h3>
              <form onSubmit={handleInquiry} className="space-y-3">
                <input
                  type="text"
                  placeholder={t("property.detail.name_placeholder")}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-charcoal/30"
                />
                <input
                  type="tel"
                  placeholder={t("property.detail.phone_placeholder")}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-charcoal/30"
                />
                <input
                  type="email"
                  placeholder={t("property.detail.email_placeholder")}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-charcoal/30"
                />
                <textarea
                  placeholder={t("property.detail.message_placeholder")}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-charcoal/30 resize-none"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-charcoal hover:bg-charcoal-hover text-white py-3 rounded-lg font-body font-medium text-sm transition-colors disabled:opacity-60"
                >
                  {submitting ? "..." : t("property.detail.send_inquiry")}
                </button>
              </form>
              <p className="text-[11px] text-muted-foreground/60 font-body text-center">
                {t("property.detail.privacy_note")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border px-4 py-3 flex gap-3">
        <a
          href={`tel:+972500000000`}
          className="flex-1 bg-gold hover:bg-gold-hover text-white py-3 rounded-lg font-body font-medium text-sm text-center transition-colors"
        >
          {t("property.detail.call_now")}
        </a>
        <button
          onClick={() => document.getElementById("inquiry-form")?.scrollIntoView({ behavior: "smooth" })}
          className="flex-1 bg-charcoal hover:bg-charcoal-hover text-white py-3 rounded-lg font-body font-medium text-sm transition-colors"
        >
          {t("property.detail.send_inquiry")}
        </button>
      </div>
    </main>
  );
};

export default PropertyDetail;
