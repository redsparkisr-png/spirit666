import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { useSiteContent } from "@/hooks/useSiteContent";

import fallbackImg1 from "@/assets/guide-img-12.jpg";
import fallbackImg2 from "@/assets/guide-img-8.jpg"; 
import fallbackImg3 from "@/assets/guide-img-11.jpg";
import fallbackImg4 from "@/assets/guide-img-13.jpg";
import fallbackImg5 from "@/assets/guide-img-5.jpg";
import fallbackImg6 from "@/assets/guide-img-19.jpg";

type GalleryItem = Tables<"lifestyle_gallery">;

const FALLBACK_IMAGES = [
  { id: "f1", image_url: fallbackImg1, caption: "Coastal Life", display_order: 1, category: null, is_hero: false },
  { id: "f2", image_url: fallbackImg2, caption: "Historic Roots", display_order: 2, category: null, is_hero: false },
  { id: "f3", image_url: fallbackImg3, caption: "Mediterranean Lifestyle", display_order: 3, category: null, is_hero: false },
  { id: "f4", image_url: fallbackImg4, caption: "Nature & Parks", display_order: 4, category: null, is_hero: false },
  { id: "f5", image_url: fallbackImg5, caption: "Authentic Charm", display_order: 5, category: null, is_hero: false },
  { id: "f6", image_url: fallbackImg6, caption: "Family Friendly", display_order: 6, category: null, is_hero: false },
];

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

  const displayItems = items.length > 0 ? items : FALLBACK_IMAGES;

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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {displayItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative overflow-hidden rounded-2xl aspect-[4/3] group cursor-pointer shadow-md hover:shadow-xl transition-all duration-500"
            >
              {/* Image with elegant scale on hover */}
              <img
                src={item.image_url}
                alt={(item as any).caption || `Lifestyle in Zichron Yaakov ${idx + 1}`}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Base overlay for text readability + hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
              
              {/* Content overlay */}
              <div className="absolute bottom-0 inset-x-0 p-5 md:p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <p className="text-primary-foreground font-display text-lg md:text-xl font-medium drop-shadow-md">
                  {(item as any).caption || "Zichron Yaakov"}
                </p>
                <div className="h-[2px] w-8 bg-gold mt-3 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 delay-100" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center text-muted-foreground font-body text-sm italic mt-12"
        >
          {t("home.lifestyle.bottom_line")}
        </motion.p>
      </div>
    </section>
  );
};

export default LifestyleSection;
