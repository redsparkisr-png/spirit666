import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { useSiteContent } from "@/hooks/useSiteContent";

type GalleryItem = Tables<"lifestyle_gallery">;

const LifestyleSection = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const { t } = useSiteContent();

  useEffect(() => {
    supabase
      .from("lifestyle_gallery")
      .select("*")
      .order("display_order")
      .then(({ data }) => {
        if (data) setItems(data);
        setLoaded(true);
      });
  }, []);

  const isEmpty = loaded && items.length === 0;

  return (
    <section className="py-20 md:py-28 lg:py-32 bg-sand-light">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
            {t("home.lifestyle.title")}
          </h2>
          <div className="text-muted-foreground font-body max-w-lg mx-auto text-base md:text-lg space-y-2">
            <p>{t("home.lifestyle.bullet_1")}</p>
            <p>{t("home.lifestyle.bullet_2")}</p>
            <p>{t("home.lifestyle.bullet_3")}</p>
          </div>
        </motion.div>

        {isEmpty ? (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-xl aspect-[4/3] bg-muted/60 animate-pulse" />
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground/60 font-body italic">
              {t("home.lifestyle.empty_text")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto">
            {items.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="relative overflow-hidden rounded-xl aspect-[4/3] group cursor-pointer"
              >
                <img
                  src={item.image_url}
                  alt={(item as any).caption || `Lifestyle in Zichron Yaakov ${idx + 1}`}
                  className="w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Hover overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/0 to-foreground/0 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                {/* Caption overlay */}
                {(item as any).caption && (
                  <div className="absolute bottom-0 inset-x-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-primary-foreground font-body text-sm font-medium drop-shadow-lg">{(item as any).caption}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center text-muted-foreground font-body text-sm italic mt-10"
        >
          {t("home.lifestyle.bottom_line")}
        </motion.p>
      </div>
    </section>
  );
};

export default LifestyleSection;
