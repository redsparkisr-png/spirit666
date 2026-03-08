import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, LandPlot, Ruler, BedDouble, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useLanguage } from "@/lib/i18n";

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

const PropertyCard = ({ property, index, detailsLabel }: { property: Property; index: number; detailsLabel: string }) => {
  const images = property.images || [];
  const carousel = useCarousel(Math.max(images.length, 1));
  const { lang } = useLanguage();
  const tags = property.tags || [];

  return (
    <Link to={`/${lang}/property/${property.slug || property.id}`} className="block cursor-pointer">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="bg-card rounded-2xl overflow-hidden shadow-md md:hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-muted" onTouchStart={carousel.onTouchStart} onTouchEnd={carousel.onTouchEnd}>
          {images.length === 0 && (
            <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-sm font-body">No image</div>
          )}
          {images.map((url, idx) => (
            <img key={idx} src={url} alt={`${property.title} – photo ${idx + 1}`} className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-400" style={{ opacity: carousel.current === idx ? 1 : 0, filter: "brightness(1.02) contrast(1.02)" }} loading="lazy" />
          ))}
          {images.length > 1 && <CarouselControls count={images.length} current={carousel.current} prev={carousel.prev} next={carousel.next} />}
          {property.property_status && property.property_status !== "Active" && (
            <span className="absolute top-3 left-3 rtl:left-auto rtl:right-3 bg-charcoal text-white text-[11px] font-body font-semibold tracking-wider uppercase px-2.5 py-1 rounded">{property.property_status}</span>
          )}
        </div>
        <div className="p-5 md:p-6">
          {property.price_label && (
            <p className="text-sm font-body font-semibold mb-2 bg-gradient-to-r from-gold to-gold-hover bg-clip-text text-transparent">{property.price_label}</p>
          )}
          <h3 className="text-lg font-display font-semibold text-foreground mb-1 leading-snug">{property.title}</h3>
          
          {/* Neighborhood / Location */}
          {property.location && (
            <p className="flex items-center gap-1 text-muted-foreground text-xs font-body mb-2">
              <MapPin className="w-3 h-3 text-gold flex-shrink-0" />
              {property.location}
            </p>
          )}

          {property.short_description && (
            <p className="text-muted-foreground text-sm font-body mb-3 line-clamp-2">{property.short_description}</p>
          )}

          {/* Stats row */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground font-body mb-3 flex-wrap">
            {property.bedrooms && (<span className="flex items-center gap-1.5"><BedDouble className="w-3.5 h-3.5 text-primary" />{property.bedrooms} {lang === "he" ? "חד׳" : "Bed"}</span>)}
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

          <span className="block w-full bg-charcoal text-white py-3 rounded-lg font-body font-medium text-sm btn-text text-center transition-all duration-300 group-hover:bg-charcoal-hover group-hover:shadow-md">
            {detailsLabel}
          </span>
        </div>
      </motion.div>
    </Link>
  );
};

const AvailableHomes = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loaded, setLoaded] = useState(false);
  const { t } = useSiteContent();

  useEffect(() => {
    supabase.from("properties_available").select("*").order("priority_order", { ascending: true }).then(({ data }) => {
      if (data) setProperties(data);
      setLoaded(true);
    });
  }, []);

  const isEmpty = loaded && properties.length === 0;

  return (
    <section id="available-homes" className="py-20 md:py-28 lg:py-32 bg-sand-light">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-primary font-body text-sm tracking-wide uppercase mb-3">{t("home.available.pre_title")}</p>
          <h2 className="font-display font-semibold text-foreground mb-4">{t("home.available.title")}</h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">{t("home.available.subtitle")}</p>
        </motion.div>

        {isEmpty ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-md">
                  <div className="aspect-[4/3] bg-muted/60 animate-pulse" />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((p, idx) => (
              <PropertyCard key={p.id} property={p} index={idx} detailsLabel={t("home.available.details_button")} />
            ))}
          </div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center text-sm text-muted-foreground/80 italic font-body mt-10 max-w-lg mx-auto"
        >
          {t("home.available.bottom_text")}
        </motion.p>
      </div>
    </section>
  );
};

export default AvailableHomes;
