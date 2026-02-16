import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type GalleryItem = Tables<"lifestyle_gallery">;

const LifestyleSection = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loaded, setLoaded] = useState(false);

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
    <section className="py-16 md:py-24 lg:py-28 bg-sand-light">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
            Life in Zichron Yaakov
          </h2>
          <p className="text-muted-foreground font-body max-w-lg mx-auto text-base md:text-lg">
            Morning sea breeze. Vineyard sunsets. Quiet streets. A Mediterranean rhythm that feels like home.
          </p>
        </motion.div>

        {isEmpty ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-xl aspect-[4/3] bg-muted animate-pulse" />
            ))}
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
                className="relative overflow-hidden rounded-xl aspect-[4/3] group cursor-default"
              >
                <img
                  src={item.image_url}
                  alt={`Lifestyle in Zichron Yaakov ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
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
          This is more than a property. It's a way of life.
        </motion.p>
      </div>
    </section>
  );
};

export default LifestyleSection;
