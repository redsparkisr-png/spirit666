import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { BedDouble, Ruler, LandPlot, ChevronLeft, ChevronRight, MessageCircle, CheckCircle, Bath, Car, Shield, Trees, MapPin, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { useLanguage } from "@/lib/i18n";
import { useSiteContent } from "@/hooks/useSiteContent";
import Header from "@/components/Header";
import { toast } from "sonner";
import { motion } from "framer-motion";
import PrivacyConsentCheckbox from "@/components/PrivacyConsentCheckbox";
import { injectPropertySchema } from "@/components/SchemaOrg";
import BreadcrumbNav from "@/components/BreadcrumbNav";

type Property = Tables<"properties_available">;

const TAG_STYLES: Record<string, string> = {
  "Sea View": "bg-sky-100 text-sky-700 border-sky-200",
  "Garden": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Renovated": "bg-amber-100 text-amber-700 border-amber-200",
  "New Listing": "bg-rose-100 text-rose-700 border-rose-200",
  "Exclusive Listing": "bg-violet-100 text-violet-700 border-violet-200",
  "Balcony": "bg-blue-100 text-blue-700 border-blue-200",
  "Pool": "bg-cyan-100 text-cyan-700 border-cyan-200",
  "Parking": "bg-slate-100 text-slate-700 border-slate-200",
};
const getTagStyle = (tag: string) => TAG_STYLES[tag] || "bg-muted text-muted-foreground border-border";

const PropertyDetail = () => {
  const { slug } = useParams();
  const { lang } = useLanguage();
  const { t } = useSiteContent();
  const isHe = lang === "he";
  const [property, setProperty] = useState<Property | null>(null);
  const [similar, setSimilar] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImg, setCurrentImg] = useState(0);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setCurrentImg(0);
      setSubmitted(false);
      let { data } = await supabase.from("properties_available").select("*").eq("slug", slug || "").maybeSingle();
      if (!data) {
        const res = await supabase.from("properties_available").select("*").eq("id", slug || "").maybeSingle();
        data = res.data;
      }
      setProperty(data);
      setLoading(false);
      if (data) {
        injectPropertySchema({
          title: data.title,
          description: data.short_description || data.title,
          price: data.price_number || undefined,
          currency: data.currency || "ILS",
          images: data.images || [],
          location: data.location || undefined,
          bedrooms: data.bedrooms || undefined,
          builtSqm: data.built_sqm || undefined,
          lotSqm: data.lot_sqm || undefined,
          slug: data.slug || data.id,
        });

        document.title = data.meta_title || `${data.title} | Spirit Real Estate`;
        const descContent = data.meta_description || data.short_description || data.title;
        let descTag = document.querySelector('meta[name="description"]');
        if (!descTag) {
          descTag = document.createElement("meta");
          descTag.setAttribute("name", "description");
          document.head.appendChild(descTag);
        }
        descTag.setAttribute("content", descContent);

        let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
        if (!canonicalTag) {
          canonicalTag = document.createElement("link");
          canonicalTag.rel = "canonical";
          document.head.appendChild(canonicalTag);
        }
        canonicalTag.href = `https://spirit-homes-guide.lovable.app/${lang}/property/${data.slug || data.id}`;

        if (data.og_image || data.images?.[0]) {
          const ogImg = data.og_image || data.images![0];
          let ogImgTag = document.querySelector('meta[property="og:image"]');
          if (!ogImgTag) {
            ogImgTag = document.createElement("meta");
            ogImgTag.setAttribute("property", "og:image");
            document.head.appendChild(ogImgTag);
          }
          ogImgTag.setAttribute("content", ogImg);
        }

        const { data: sim } = await supabase.from("properties_available").select("*").neq("id", data.id).limit(3);
        if (sim) setSimilar(sim);
      }
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };
    load();
  }, [slug, lang]);

  const handleInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      toast.error(t("property.detail.validation_error"));
      return;
    }
    if (!privacyConsent) {
      toast.error(t("form.privacy_consent_required"));
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
    setPrivacyConsent(false);
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const openWhatsApp = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = isHe
      ? `היי, אני מתעניין/ת ב: ${property?.title || "נכס"}\n${url}`
      : `Hi, I'm interested in: ${property?.title || "a property"}\n${url}`;
    window.open("https://wa.me/972522820632?text=" + encodeURIComponent(text), "_blank");
  };

  const scheduleViewing = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = isHe
      ? `היי חגית, אשמח לתאם סיור בנכס: ${property?.title || "נכס"}\n${url}`
      : `Hi Hagit, I'd like to schedule a viewing for: ${property?.title || "a property"}\n${url}`;
    window.open("https://wa.me/972522820632?text=" + encodeURIComponent(text), "_blank");
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
          <h1 className="text-2xl font-display font-semibold text-foreground mb-4">{t("property.detail.not_found")}</h1>
          <Link to={`/${lang}/properties`} className="text-charcoal underline font-body text-sm">{t("property.detail.back_to_listings")}</Link>
        </div>
      </main>
    );
  }

  const images = property.images || [];
  const tags = property.tags || [];
  const inputClasses = "w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground font-body text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-charcoal/30";

  const inquiryForm = (idSuffix: string) => (
    submitted ? (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-6 gap-3">
        <CheckCircle className="w-10 h-10 text-green-600" />
        <p className="font-body text-foreground font-medium text-sm">{t("property.detail.inquiry_success")}</p>
      </motion.div>
    ) : (
      <form onSubmit={handleInquiry} className="space-y-3">
        <input type="text" placeholder={t("property.detail.name_placeholder")} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={inputClasses} aria-label={t("property.detail.name_placeholder")} />
        <input type="tel" placeholder={t("property.detail.phone_placeholder")} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputClasses} aria-label={t("property.detail.phone_placeholder")} />
        <input type="email" placeholder={t("property.detail.email_placeholder")} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClasses} aria-label={t("property.detail.email_placeholder")} />
        <textarea placeholder={t("property.detail.message_placeholder")} value={formData.message || `${isHe ? "מעוניין ב:" : "Interested in:"} ${property.title}`} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={2} className={`${inputClasses} resize-none`} aria-label={t("property.detail.message_placeholder")} />
        <PrivacyConsentCheckbox
          checked={privacyConsent}
          onCheckedChange={setPrivacyConsent}
          id={`property-privacy-consent-${idSuffix}`}
        />
        {idSuffix === "sidebar" ? (
          <div className="space-y-2">
            <div className="flex gap-3">
              <button type="submit" disabled={submitting} className="flex-1 bg-charcoal hover:bg-charcoal-hover text-white py-3 rounded-lg font-body font-medium text-sm btn-text transition-colors disabled:opacity-60">
                {submitting ? "..." : t("property.detail.send_inquiry")}
              </button>
              <button type="button" onClick={openWhatsApp} className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-body font-medium text-sm transition-colors">
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </button>
            </div>
            <button type="button" onClick={scheduleViewing} className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-hover text-white py-3 rounded-lg font-body font-medium text-sm transition-all duration-300 hover:shadow-md">
              <Calendar className="w-4 h-4" />
              {isHe ? "תאמו סיור בנכס" : "Schedule a Viewing"}
            </button>
          </div>
        ) : (
          <button type="submit" disabled={submitting} className="w-full bg-charcoal hover:bg-charcoal-hover text-white py-3 rounded-lg font-body font-medium text-sm btn-text transition-colors disabled:opacity-60">
            {submitting ? "..." : t("property.detail.send_inquiry")}
          </button>
        )}
      </form>
    )
  );

  // Build detail stats
  const detailStats = [
    property.bedrooms ? { icon: BedDouble, value: property.bedrooms, label: isHe ? "חדרי שינה" : "Bedrooms" } : null,
    property.bathrooms ? { icon: Bath, value: property.bathrooms, label: isHe ? "חדרי רחצה" : "Bathrooms" } : null,
    property.built_sqm ? { icon: Ruler, value: `${property.built_sqm} m²`, label: isHe ? 'מ"ר בנוי' : "Built" } : null,
    property.lot_sqm ? { icon: LandPlot, value: `${property.lot_sqm} m²`, label: isHe ? 'מ"ר מגרש' : "Lot" } : null,
    property.parking ? { icon: Car, value: property.parking, label: isHe ? "חניה" : "Parking" } : null,
    property.mamad ? { icon: Shield, value: isHe ? "כן" : "Yes", label: isHe ? "ממ\"ד" : "Mamad" } : null,
  ].filter(Boolean) as { icon: any; value: any; label: string }[];

  return (
    <main className="min-h-screen bg-background pb-24 lg:pb-0">
      <Header />

      {/* Gallery */}
      <div className="relative w-full aspect-[16/9] md:aspect-[2.1/1] bg-muted overflow-hidden">
        {images.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground font-body">No images</div>
        ) : (
          <>
            {images.map((url, idx) => (
              <img key={idx} src={url} alt={`${property.title} – ${idx + 1}`} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500" style={{ opacity: currentImg === idx ? 1 : 0 }} loading={idx === 0 ? "eager" : "lazy"} />
            ))}
            {images.length > 1 && (
              <>
                <button onClick={() => setCurrentImg((c) => (c - 1 + images.length) % images.length)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors" aria-label="Previous image">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={() => setCurrentImg((c) => (c + 1) % images.length)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors" aria-label="Next image">
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
        <div className="container px-6 py-3 flex gap-2.5 overflow-x-auto scrollbar-hide">
          {images.map((url, idx) => (
            <button key={idx} onClick={() => setCurrentImg(idx)} className={`flex-shrink-0 w-[88px] h-[60px] rounded-lg overflow-hidden border-2 transition-colors ${currentImg === idx ? "border-charcoal" : "border-transparent opacity-60 hover:opacity-100"}`} aria-label={`View image ${idx + 1}`}>
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
              <BreadcrumbNav items={[
                { label: t("header.nav.properties"), to: `/${lang}/properties` },
                { label: property.title },
              ]} />
              <h1 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-2">{property.title}</h1>
              {property.location && (
                <p className="flex items-center gap-1.5 text-muted-foreground font-body text-sm">
                  <MapPin className="w-4 h-4 text-gold" />
                  {property.location}
                  {property.neighborhood_note ? ` — ${property.neighborhood_note}` : ""}
                </p>
              )}
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className={`text-xs font-body font-semibold px-3 py-1 rounded-full border ${getTagStyle(tag)}`}>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Price */}
            <div>
              {property.price_label ? (
                <p className="text-2xl font-display font-semibold bg-gradient-to-r from-gold to-gold-hover bg-clip-text text-transparent">{property.price_label}</p>
              ) : (
                <p className="text-lg font-body text-muted-foreground italic">{t("property.detail.price_upon_request")}</p>
              )}
            </div>

            {/* Stats grid — expanded */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {detailStats.map((stat, idx) => (
                <div key={idx} className="bg-card rounded-xl p-3 md:p-4 text-center border border-border">
                  <stat.icon className="w-5 h-5 mx-auto mb-1.5 text-charcoal" />
                  <p className="font-display font-semibold text-foreground text-sm">{stat.value}</p>
                  <p className="text-[10px] text-muted-foreground font-body">{stat.label}</p>
                </div>
              ))}
            </div>

            {property.short_description && (
              <div>
                <h2 className="text-xl font-display font-semibold text-foreground mb-3">{t("property.detail.overview")}</h2>
                <p className="text-muted-foreground font-body leading-relaxed">{property.short_description}</p>
              </div>
            )}

            {property.full_description && (
              <div>
                <h2 className="text-xl font-display font-semibold text-foreground mb-3">
                  {isHe ? "תיאור מלא" : "Full Description"}
                </h2>
                <div className="text-muted-foreground font-body leading-relaxed whitespace-pre-line">{property.full_description}</div>
              </div>
            )}

            {/* About the Neighborhood */}
            {(property.location || property.neighborhood_note) && (
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-xl font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gold" />
                  {isHe ? "על השכונה" : "About the Neighborhood"}
                </h2>
                <p className="text-muted-foreground font-body leading-relaxed">
                  {property.neighborhood_note || (isHe
                    ? `${property.location} הוא אזור מבוקש בזכרון יעקב עם קהילה חמה ונגישות מצוינת.`
                    : `${property.location} is a sought-after area in Zichron Yaakov with a warm community and excellent accessibility.`
                  )}
                </p>
                {property.google_maps_url && (
                  <a href={property.google_maps_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-gold hover:text-gold-hover font-body text-sm mt-3 transition-colors">
                    <MapPin className="w-3.5 h-3.5" />
                    {isHe ? "הצג במפה" : "View on Map"}
                  </a>
                )}
              </div>
            )}

            {/* FOMO line */}
            <div className="bg-bronze/10 border border-bronze/20 rounded-lg px-5 py-3">
              <p className="text-sm text-bronze font-body italic">{t("property.detail.fomo_line")}</p>
            </div>

            {/* CTA + Inline inquiry form for mobile */}
            <div id="inquiry-form-mobile" className="bg-card rounded-2xl border border-border p-6 space-y-5 shadow-sm">
              <h3 className="font-display font-semibold text-foreground text-lg">{t("property.detail.interested_title")}</h3>
              <div className="flex gap-3">
                <button onClick={scheduleViewing} className="flex-1 flex items-center justify-center gap-2 bg-gold hover:bg-gold-hover text-white py-3 px-5 rounded-lg font-body font-medium text-sm transition-all duration-300">
                  <Calendar className="w-4 h-4" />
                  {isHe ? "תאמו סיור" : "Schedule a Viewing"}
                </button>
                <button onClick={openWhatsApp} className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 px-5 rounded-lg font-body font-medium text-sm transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </button>
              </div>
              <div>{inquiryForm("mobile")}</div>
            </div>

            {/* Similar Properties */}
            {similar.length > 0 && (
              <div className="pt-4">
                <h2 className="text-xl font-display font-semibold text-foreground mb-6">{t("property.detail.similar_title")}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {similar.map((sp) => (
                    <Link key={sp.id} to={`/${lang}/property/${sp.slug || sp.id}`} className="group cursor-pointer rounded-2xl overflow-hidden bg-card border border-border hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                      <div className="aspect-[4/3] bg-muted overflow-hidden">
                        {sp.images?.[0] ? (
                          <img src={sp.images[0]} alt={sp.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                        ) : (
                          <div className="w-full h-full bg-muted" />
                        )}
                      </div>
                      <div className="p-3">
                        <p className="font-display font-semibold text-foreground text-sm truncate">{sp.title}</p>
                        {sp.price_label && (<p className="text-xs text-gold font-body mt-1">{sp.price_label}</p>)}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky sidebar inquiry form */}
          <div className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-20 space-y-4">
              <div id="inquiry-form" className="bg-card rounded-2xl border border-border p-5 md:p-6 space-y-4 shadow-sm">
                <h3 className="font-display font-semibold text-foreground text-lg">{t("property.detail.inquiry_title")}</h3>
                {inquiryForm("sidebar")}
              </div>
              <p className="text-[11px] text-muted-foreground/60 font-body text-center">{t("property.detail.privacy_note")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky CTA */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-card border-t border-border px-4 py-3 flex gap-3"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <button onClick={scheduleViewing} className="flex-1 flex items-center justify-center gap-2 bg-gold hover:bg-gold-hover text-white py-3 rounded-lg font-body font-medium text-sm transition-all duration-300">
          <Calendar className="w-4 h-4" />
          {isHe ? "סיור" : "Schedule Viewing"}
        </button>
        <button onClick={openWhatsApp} className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-body font-medium text-sm transition-colors">
          <MessageCircle className="w-4 h-4" />
          {t("property.detail.whatsapp_cta")}
        </button>
      </div>
    </main>
  );
};

export default PropertyDetail;
