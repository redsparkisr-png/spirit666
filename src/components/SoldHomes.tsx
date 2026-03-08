import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useLanguage } from "@/lib/i18n";
import { BedDouble, Ruler } from "lucide-react";

type SoldProp = Tables<"properties_sold">;

const SoldHomes = () => {
  const [items, setItems] = useState<SoldProp[]>([]);
  const [loaded, setLoaded] = useState(false);
  const { t } = useSiteContent();
  const { lang } = useLanguage();

  useEffect(() => {
    supabase
      .from("properties_sold")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setItems(data);
        setLoaded(true);
      });
  }, []);

  const openWhatsApp = () => {
    window.open(
      "https://wa.me/972522820632?text=" + encodeURIComponent("Hi, I'd like to schedule a private consultation about homes in Zichron Yaakov"),
      "_blank"
    );
  };

  const isEmpty = loaded && items.length === 0;

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <p className="text-bronze font-body text-sm tracking-widest uppercase mb-3">
            {t("home.sold.pre_title")}
          </p>
          <h2 className="text-2xl md:text-[30px] font-display font-semibold text-foreground mb-3">
            {t("home.sold.title")}
          </h2>
        </motion.div>

        {isEmpty ? (
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-xl overflow-hidden bg-card border border-border">
                  <div className="aspect-[4/3] bg-muted/60 animate-pulse" />
                  <div className="p-5">
                    <div className="h-4 bg-muted/60 rounded w-3/4 animate-pulse mb-2" />
                    <div className="h-3 bg-muted/40 rounded w-1/2 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground/60 font-body italic">
              {t("home.sold.empty_text")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {items.map((p, idx) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative rounded-xl overflow-hidden bg-card border border-border group"
              >
                <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                  {p.images && p.images[0] ? (
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 bg-charcoal text-white text-[11px] font-body font-semibold tracking-wider uppercase px-3 py-1.5 rounded">
                    {t("home.sold.badge")}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <p className="text-base font-display font-semibold text-foreground leading-snug">
                    {p.title}
                  </p>
                  {p.short_description && (
                    <p className="text-sm text-muted-foreground font-body line-clamp-2">
                      {p.short_description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground font-body pt-1">
                    {p.bedrooms && (
                      <span className="flex items-center gap-1">
                        <BedDouble className="w-3.5 h-3.5" />
                        {p.bedrooms} {lang === "he" ? "חד׳" : "Bed"}
                      </span>
                    )}
                    {p.built_sqm && (
                      <span className="flex items-center gap-1">
                        <Ruler className="w-3.5 h-3.5" />
                        {p.built_sqm} {lang === "he" ? 'מ"ר' : "sqm"}
                      </span>
                    )}
                    {p.sold_date && (
                      <span className="text-bronze">{p.sold_date}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-12 space-y-4"
        >
          <p className="text-muted-foreground font-body text-sm italic">
            {t("home.sold.bottom_text")}
          </p>
          <button
            onClick={openWhatsApp}
            className="inline-flex items-center gap-2 bg-charcoal hover:bg-charcoal-hover text-white px-8 py-3.5 rounded-full font-body font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-charcoal/20 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            {t("home.sold.cta_button")}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default SoldHomes;
