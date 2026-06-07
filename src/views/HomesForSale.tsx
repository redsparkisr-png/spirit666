"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LandPlot, Ruler, BedDouble, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { useLanguage } from "@/lib/i18n";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useRef } from "react";
import Header from "@/components/Header";
import TrustSection from "@/components/TrustSection";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import PageMeta from "@/components/PageMeta";

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

const PropertyCard = ({ property }: { property: Property }) => {
  const { lang } = useLanguage();
  const { t } = useSiteContent();
  const images = property.images || [];
  const carousel = useCarousel(Math.max(images.length, 1));

  return (
    <Link
      href={`/${lang}/property/${property.slug || property.id}`}
      className="block bg-card rounded-2xl overflow-hidden shadow-md md:hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted" onTouchStart={carousel.onTouchStart} onTouchEnd={carousel.onTouchEnd}>
        {images.length === 0 && (
          <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-sm font-body">No image</div>
        )}
        {images.map((url, idx) => (
          <img key={idx} src={url} alt={`${property.title} – photo ${idx + 1}`} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-400" style={{ opacity: carousel.current === idx ? 1 : 0 }} loading="lazy" />
        ))}
        {images.length > 1 && (
          <>
            <button onClick={carousel.prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Previous">
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button onClick={carousel.next} className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Next">
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </>
        )}
      </div>
      <div className="p-5">
        {property.price_label && (
          <p className="text-sm font-body font-semibold mb-1.5 bg-gradient-to-r from-gold to-gold-hover bg-clip-text text-transparent">{property.price_label}</p>
        )}
        <h3 className="text-lg font-display font-semibold text-foreground mb-1 leading-snug">{property.title}</h3>
        {property.short_description && (
          <p className="text-muted-foreground text-sm font-body mb-3 line-clamp-2">{property.short_description}</p>
        )}
        <div className="flex items-center gap-3 text-xs text-muted-foreground font-body flex-wrap">
          {property.bedrooms && (<span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5" /> {property.bedrooms} {t("search.beds_label")}</span>)}
          {property.built_sqm && (<span className="flex items-center gap-1"><Ruler className="w-3.5 h-3.5" /> {property.built_sqm} sqm</span>)}
          {property.lot_sqm && (<span className="flex items-center gap-1"><LandPlot className="w-3.5 h-3.5" /> {property.lot_sqm} sqm</span>)}
        </div>
      </div>
    </Link>
  );
};

const HomesForSale = () => {
  const { lang } = useLanguage();
  const isHe = lang === "he";
  const prefix = `/${lang}`;
  const { t } = useSiteContent();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("properties_available")
        .select("*")
        .order("priority_order", { ascending: true });
      setProperties(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  const neighborhoods = [1, 2, 3, 4].map((i) => ({
    name: t(`homes_for_sale.neighborhoods.item_${i}_name`),
    desc: t(`homes_for_sale.neighborhoods.item_${i}_desc`),
  }));

  return (
    <main className="min-h-screen bg-background">
      <PageMeta title={t("seo.homes_for_sale.title")} description={t("seo.homes_for_sale.description")} />
      <Header />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-6">
          <BreadcrumbNav items={[{ label: isHe ? "בתים למכירה בזכרון יעקב" : "Homes for Sale" }]} />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center mt-6"
          >
            <h1 className="font-display font-semibold text-foreground mb-4">
              {isHe ? "בתים למכירה בזכרון יעקב" : "Homes for Sale in Zichron Yaakov"}
            </h1>
            <p className="text-muted-foreground font-body text-lg max-w-xl mx-auto">
              {isHe
                ? "גלו את הנכסים הזמינים בזכרון יעקב — בתים, דירות וקוטג'ים בשכונות המובילות."
                : "Discover available properties in Zichron Yaakov — homes, apartments, and townhouses in the finest neighborhoods."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="py-12 md:py-16 bg-card">
        <div className="container px-6">
          <h2 className="font-display font-semibold text-foreground text-center mb-10">
            {t("homes_for_sale.neighborhoods.title")}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {neighborhoods.map((n, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-background rounded-xl p-6 border border-border"
              >
                <h3 className="font-display font-semibold text-foreground mb-2">{n.name}</h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">{n.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Listings */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container px-6">
          <h2 className="font-display font-semibold text-foreground text-center mb-10">
            {isHe ? "נכסים זמינים" : "Available Properties"}
          </h2>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-md">
                  <div className="aspect-[4/3] bg-muted animate-pulse" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-muted rounded w-3/4 animate-pulse" />
                    <div className="h-4 bg-muted rounded w-full animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : properties.length === 0 ? (
            <p className="text-center text-muted-foreground font-body py-12">{t("properties.no_results")}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {properties.map((p) => (<PropertyCard key={p.id} property={p} />))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-card">
        <div className="container px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="font-display font-semibold text-foreground mb-4">
              {isHe ? "רוצים ליווי אישי?" : "Want Personal Guidance?"}
            </h2>
            <p className="text-muted-foreground font-body mb-8 max-w-md mx-auto">
              {isHe
                ? "קבעו שיחת ייעוץ ונעזור לכם למצוא את הנכס המתאים."
                : "Schedule a consultation and let us help you find the right property."}
            </p>
            <Link
              href={`${prefix}/contact`}
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-hover text-primary-foreground py-4 px-8 rounded-full font-body font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              style={{ fontSize: "17px" }}
            >
              {isHe ? "קבעו ייעוץ" : "Schedule a Consultation"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Internal links */}
      <section className="py-12 bg-background">
        <div className="container px-6">
          <div className="max-w-2xl mx-auto flex flex-wrap justify-center gap-4">
            <Link href={`${prefix}/buying-property-zichron-yaakov`} className="text-sm font-body text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
              {isHe ? "מדריך רכישה" : "Buying Guide"}
            </Link>
            <Link href={`${prefix}/living-in-zichron-yaakov`} className="text-sm font-body text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
              {isHe ? "חיים בזכרון יעקב" : "Living in Zichron Yaakov"}
            </Link>
            <Link href={`${prefix}/properties`} className="text-sm font-body text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
              {isHe ? "כל הנכסים" : "All Properties"}
            </Link>
          </div>
        </div>
      </section>

      <TrustSection />
    </main>
  );
};

export default HomesForSale;
