import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, LandPlot, Ruler, BedDouble } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import PropertyModal from "./PropertyModal";

type Property = Tables<"properties_available">;

const useCarousel = (count: number) => {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((c) => (c + 1) % count);
  };
  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((c) => (c - 1 + count) % count);
  };
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
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

const PropertyCard = ({ property, index, onSelect }: { property: Property; index: number; onSelect: (p: Property) => void }) => {
  const images = property.images || [];
  const carousel = useCarousel(Math.max(images.length, 1));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 group cursor-pointer"
      onClick={() => onSelect(property)}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted" onTouchStart={carousel.onTouchStart} onTouchEnd={carousel.onTouchEnd}>
        {images.length === 0 && (
          <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-sm font-body">No image</div>
        )}
        {images.map((url, idx) => (
          <img
            key={idx}
            src={url}
            alt={`${property.title} – photo ${idx + 1}`}
            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-400"
            style={{ opacity: carousel.current === idx ? 1 : 0 }}
            loading="lazy"
          />
        ))}
        {images.length > 1 && (
          <CarouselControls count={images.length} current={carousel.current} prev={carousel.prev} next={carousel.next} />
        )}
      </div>
      <div className="p-6">
        <h3 className="text-lg font-display font-semibold text-foreground mb-2">{property.title}</h3>
        {property.short_description && (
          <p className="text-muted-foreground text-sm font-body mb-4 line-clamp-2">{property.short_description}</p>
        )}
        <div className="flex items-center gap-4 text-xs text-muted-foreground font-body mb-4 flex-wrap">
          <span className="flex items-center gap-1.5">
            <LandPlot className="w-3.5 h-3.5 text-primary" />
            {property.lot_sqm ? `${property.lot_sqm} sqm` : "–"}
          </span>
          <span className="flex items-center gap-1.5">
            <Ruler className="w-3.5 h-3.5 text-primary" />
            {property.built_sqm ? `${property.built_sqm} sqm` : "–"}
          </span>
          <span className="flex items-center gap-1.5">
            <BedDouble className="w-3.5 h-3.5 text-primary" />
            {property.bedrooms ? `${property.bedrooms} Bed` : "–"}
          </span>
        </div>
        {property.price_label && (
          <p className="text-sm font-body font-semibold text-primary mb-3">{property.price_label}</p>
        )}
        <p className="text-xs text-muted-foreground/70 font-body italic mb-4">
          Private viewing available via secure video call.
        </p>
        <button
          onClick={(e) => { e.stopPropagation(); onSelect(property); }}
          className="w-full bg-gold hover:bg-gold-hover text-primary-foreground py-3 rounded-lg font-body font-medium text-sm transition-colors duration-300"
        >
          Request Full Details
        </button>
      </div>
    </motion.div>
  );
};

const AvailableHomes = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  useEffect(() => {
    supabase
      .from("properties_available")
      .select("*")
      .order("priority_order", { ascending: true })
      .then(({ data }) => {
        if (data) setProperties(data);
        setLoaded(true);
      });
  }, []);

  const isEmpty = loaded && properties.length === 0;

  return (
    <section id="available-homes" className="py-16 md:py-24 lg:py-28 bg-sand-light">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-primary font-body text-sm tracking-wide uppercase mb-3">
            Hand-Selected Homes for International Buyers
          </p>
          <h2 className="font-display font-semibold text-foreground mb-4">
            Available Homes in Zichron Yaakov
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            This is a small curated selection of homes currently available. Some of our most attractive opportunities are shared privately with qualified buyers.
          </p>
        </motion.div>

        {isEmpty ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card rounded-xl overflow-hidden shadow-sm">
                  <div className="aspect-[4/3] bg-muted/60 animate-pulse" />
                  <div className="p-6 space-y-3">
                    <div className="h-5 bg-muted/60 rounded w-3/4 animate-pulse" />
                    <div className="h-4 bg-muted/60 rounded w-full animate-pulse" />
                    <div className="h-10 bg-muted/60 rounded w-full animate-pulse mt-4" />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground/60 font-body italic">
              New listings are being prepared — check back soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((p, idx) => (
              <PropertyCard key={p.id} property={p} index={idx} onSelect={setSelectedProperty} />
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
          Some of our best opportunities are sold quietly and never reach public listing sites.
        </motion.p>
      </div>

      <PropertyModal
        property={selectedProperty}
        open={!!selectedProperty}
        onOpenChange={(open) => { if (!open) setSelectedProperty(null); }}
      />
    </section>
  );
};

export default AvailableHomes;
