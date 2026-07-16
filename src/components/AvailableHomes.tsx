"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, LandPlot, Ruler, BedDouble, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useLanguage } from "@/lib/i18n";
import { optimizedImageUrl } from "@/lib/image";
import { propertyStatusLabel } from "@/lib/property-status";
import { propertyTitle, propertyShortDescription } from "@/lib/property-i18n";

type Property = Tables<"properties_available">;

const useCarousel = (count: number) => {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const next = (e: React.MouseEvent) => { e.stopPropagation(); e.preventDefault(); setCurrent((c) => (c + 1) % count); };
  const prev = (e: React.MouseEvent) => { e.stopPropagation(); e.preventDefault(); setCurrent((c) => (c - 1 + count) % count); };
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) setCurrent((c) => (c + 1) % count);
      else setCurrent((c) => (c - 1 + count) % count);
    }
    touchStartX.current = null;
  };
  return { current, next, prev, onTouchStart, onTouchEnd };
};

const CarouselControls = ({ count, current, prev, next }: { count: number; current: number; prev: (e: React.MouseEvent) => void; next: (e: React.MouseEvent) => void }) => (
  <>
    <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-primary/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Previous image">
      <ChevronLeft className="w-4 h-4 text-primary-foreground" />
    </button>
    <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-primary/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Next image">
      <ChevronRight className="w-4 h-4 text-primary-foreground" />
    </button>
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-1.5 h-1.5 rounded-full transition-colors" style={{ backgroundColor: i === current ? "hsl(var(--primary-foreground))" : "hsl(var(--primary-foreground) / 0.4)" }} />
      ))}
    </div>
  </>
);

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

const isNewListing = (createdAt: string) => {
  const created = new Date(createdAt);
  const now = new Date();
  const diffDays = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays <= 14;
};

const PropertyCard = ({ property, index, detailsLabel }: { property: Property; index: number; detailsLabel: string }) => {
  const images = property.images || [];
  const carousel = useCarousel(Math.max(images.length, 1));
  const { lang } = useLanguage();
  const tags = property.tags || [];
  const isNew = isNewListing(property.created_at);
  // Natural aspect ratio per slide, measured on load, so every photo renders
  // full-width in its original composition — no crop, no letterbox, no blur.
  // Clamped to avoid extreme frames; falls back to 3:2 until measured.
  const [ratios, setRatios] = useState<Record<number, number>>({});
  const recordRatio = (idx: number, el: HTMLImageElement | null) => {
    if (!el || !el.naturalWidth || !el.naturalHeight) return;
    const ratio = Math.min(2.5, Math.max(0.4, el.naturalWidth / el.naturalHeight));
    setRatios((r) => (r[idx] ? r : { ...r, [idx]: ratio }));
  };
  // Ref callback covers images already complete before hydration (cache hit —
  // onLoad never fires for those); onLoad covers everything loaded after mount.
  const measureRef = (idx: number) => (el: HTMLImageElement | null) => {
    if (el && el.complete) recordRatio(idx, el);
  };
  const noteRatio = (idx: number) => (e: React.SyntheticEvent<HTMLImageElement>) =>
    recordRatio(idx, e.currentTarget);
  const frameRatio = ratios[carousel.current] ?? 1.5;

  return (
    <Link href={`/${lang}/property/${property.slug || property.id}`} className="block cursor-pointer h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="bg-card rounded-2xl overflow-hidden shadow-md transition-all duration-[600ms] ease-out group hover:-translate-y-1 md:hover:[box-shadow:0_18px_44px_-18px_hsl(var(--gold)/0.35)] h-full flex flex-col"
      >
        <div className="relative overflow-hidden bg-muted transition-[aspect-ratio] duration-500 ease-out" style={{ aspectRatio: frameRatio }} onTouchStart={carousel.onTouchStart} onTouchEnd={carousel.onTouchEnd}>
          {images.length === 0 && (
            <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-sm font-body">No image</div>
          )}
          {images.map((url, idx) => (
            <img key={idx} ref={measureRef(idx)} src={optimizedImageUrl(url, { width: 800, quality: 75 })} onLoad={noteRatio(idx)} alt={lang === "he"
              ? `${property.title}${property.location ? ` ב${property.location}` : ""}, זכרון יעקב – תמונה ${idx + 1}`
              : `${property.title}${property.location ? ` in ${property.location}` : ""}, Zichron Yaakov – photo ${idx + 1}`} className="absolute inset-0 w-full h-full object-contain transition-opacity duration-[600ms] ease-out" style={{ opacity: carousel.current === idx ? 1 : 0, filter: "brightness(1.02) contrast(1.02)" }} loading="lazy" decoding="async" />
          ))}
          {images.length > 1 && <CarouselControls count={images.length} current={carousel.current} prev={carousel.prev} next={carousel.next} />}
          {isNew && (
            <span className="absolute top-3 right-3 rtl:right-auto rtl:left-3 bg-gold text-primary-foreground text-[11px] font-body font-semibold tracking-wider uppercase px-3 py-1 rounded-full shadow-md">
              {lang === "he" ? "חדש" : "New"}
            </span>
          )}
          {property.property_status && property.property_status !== "Active" && (
            <span className="absolute top-3 left-3 rtl:left-auto rtl:right-3 bg-charcoal text-white text-[11px] font-body font-semibold tracking-wider uppercase px-2.5 py-1 rounded">{propertyStatusLabel(property.property_status, lang)}</span>
          )}
        </div>
        <div className="p-5 md:p-6 text-start flex-1 flex flex-col">
          {/* Price display — premium badge (reserved height to keep cards aligned) */}
          <div className="mb-3 min-h-[34px] flex items-center">
            {(property.price_label || property.price_number) && (
              <span className="inline-block bg-gold/10 border border-gold/20 rounded-lg px-3 py-1.5 text-sm font-body font-semibold text-gold">
                {property.price_label
                  ? property.price_label
                  : lang === "he"
                    ? `₪${Number(property.price_number).toLocaleString()}`
                    : `ILS ${Number(property.price_number).toLocaleString()}`}
              </span>
            )}
          </div>
          <h3 className="text-lg font-display font-semibold text-foreground mb-1 leading-snug transition-colors duration-300 group-hover:text-primary">{propertyTitle(property, lang)}</h3>
          
          {/* Neighborhood / Location */}
          {property.location && (
            <p className="flex items-center gap-1 text-muted-foreground text-xs font-body mb-2">
              <MapPin className="w-3 h-3 text-gold flex-shrink-0" />
              {property.location}
            </p>
          )}

          {propertyShortDescription(property, lang) && (
            <p className="text-muted-foreground text-sm font-body mb-3 line-clamp-2">{propertyShortDescription(property, lang)}</p>
          )}

          {/* Stats row */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground font-body mb-3 flex-wrap">
            {property.bedrooms && (<span className="flex items-center gap-1.5"><BedDouble className="w-3.5 h-3.5 text-primary" />{property.bedrooms} {lang === "he" ? "חד׳" : "Rooms"}</span>)}
            {property.built_sqm && (<span className="flex items-center gap-1.5"><Ruler className="w-3.5 h-3.5 text-primary" />{property.built_sqm} {lang === "he" ? 'מ"ר' : "sqm"}</span>)}
            {property.lot_sqm && (<span className="flex items-center gap-1.5"><LandPlot className="w-3.5 h-3.5 text-primary" />{property.lot_sqm} {lang === "he" ? 'מ"ר' : "sqm"}</span>)}
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className={`text-[10px] font-body font-semibold px-2 py-0.5 rounded-full border ${getTagStyle(tag)}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <span className="block w-full bg-charcoal text-white py-3 rounded-full font-body font-medium text-sm btn-text text-center transition-all duration-300 group-hover:bg-charcoal-hover group-hover:shadow-md mt-auto">
            {lang === "he" ? "לפרטי הנכס" : "View Property Details"}
          </span>
        </div>
      </motion.div>
    </Link>
  );
};

const AvailableHomes = ({ limit, initialProperties }: { limit?: number; initialProperties?: Property[] }) => {
  const [properties, setProperties] = useState<Property[]>(initialProperties ?? []);
  const [loaded, setLoaded] = useState(!!initialProperties);
  const { t } = useSiteContent();
  const { lang } = useLanguage();
  const isHe = lang === "he";

  useEffect(() => {
    if (initialProperties) return;
    supabase.from("properties_available").select("*").order("priority_order", { ascending: true }).then(({ data }) => {
      if (data) setProperties(data);
      setLoaded(true);
    });
  }, [initialProperties]);

  const isEmpty = loaded && properties.length === 0;
  const displayProperties = limit ? properties.slice(0, limit) : properties;
  const hasMore = limit && properties.length > limit;

  const sectionTitle = limit
    ? (isHe ? "נכסים שמוצעים עכשיו בזכרון יעקב" : "Featured Homes in Zichron Yaakov")
    : t("home.available.title");
  const sectionSubtitle = limit
    ? (isHe ? "דירות, בתים ופנטהאוזים שנמצאים כרגע בשוק המקומי." : "Explore some of the most desirable homes currently available in the Moshava.")
    : t("home.available.subtitle");

  return (
    <section id="available-homes" className="py-14 md:py-20 bg-sand-light">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <p className="text-primary font-body text-sm tracking-wide uppercase mb-3">{t("home.available.pre_title")}</p>
          <h2 className="font-display font-semibold text-foreground mb-3">{sectionTitle}</h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto text-sm md:text-base">{sectionSubtitle}</p>
        </motion.div>

        {isEmpty ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-md">
                  <div className="aspect-[3/2] bg-muted/60 animate-pulse" />
                  <div className="p-6 space-y-3">
                    <div className="h-5 bg-muted/60 rounded w-3/4 animate-pulse" />
                    <div className="h-4 bg-muted/60 rounded w-full animate-pulse" />
                    <div className="h-10 bg-muted/60 rounded w-full animate-pulse mt-4" />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground/60 font-body italic">{t("home.available.empty_text")}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
              {displayProperties.map((p, idx) => (
                <PropertyCard key={p.id} property={p} index={idx} detailsLabel={t("home.available.details_button")} />
              ))}
            </div>
            {limit && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-center mt-10"
              >
                <Link
                  href={`/${lang}/properties`}
                  className="inline-flex items-center justify-center gap-2 bg-charcoal hover:bg-charcoal-hover text-white py-3.5 px-10 rounded-full font-body font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  {isHe ? "לכל הנכסים בזכרון יעקב" : "View All Homes"}
                </Link>
              </motion.div>
            )}
          </>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-primary rounded-2xl p-6 md:p-12 mt-10 max-w-3xl mx-auto text-center"
        >
          <h3 className="font-display font-semibold text-primary-foreground text-xl md:text-2xl mb-4">
            {t("home.offmarket.title")}
          </h3>
          <p className="text-sm md:text-base text-primary-foreground/85 font-body mb-2 max-w-xl mx-auto">
            {t("home.offmarket.text_1")}
          </p>
          <p className="text-sm md:text-base text-primary-foreground/75 font-body mb-8 max-w-xl mx-auto">
            {t("home.offmarket.text_2")}
          </p>
          <a
            href={`https://wa.me/${t("whatsapp.phone_number") || "972522820632"}?text=${encodeURIComponent(t("whatsapp.default_message") || "Hi, I'm interested in private opportunities in Zichron Yaakov.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 sm:gap-2.5 bg-gold hover:bg-gold-hover text-white py-3.5 sm:py-4 px-5 sm:px-10 rounded-full font-body font-semibold text-sm sm:text-base max-w-full text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            <span>{t("home.offmarket.cta") || (isHe ? "קבלו גישה להזדמנויות פרטיות" : "Get Access to Private Opportunities")}</span>
          </a>
          <p className="mt-3 text-xs text-primary-foreground/50 font-body max-w-md mx-auto">
            {t("home.offmarket.helper") || (isHe ? "שלחו הודעה ונעדכן אתכם כשנכסים רלוונטיים מגיעים לשוק — גם אם הם לא פורסמו פומבית." : "Message us and we'll let you know when relevant homes reach the market — even before they are publicly listed.")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AvailableHomes;
