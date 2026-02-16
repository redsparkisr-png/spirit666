import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type SoldProp = Tables<"properties_sold">;

const SoldHomes = () => {
  const [items, setItems] = useState<SoldProp[]>([]);
  const [loaded, setLoaded] = useState(false);

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
    <section className="py-16 md:py-24 lg:py-28 bg-secondary">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-primary font-body text-sm tracking-wide uppercase mb-3">
            Proven track record. Real results.
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-foreground mb-4">
            Recently Sold Homes
          </h2>
        </motion.div>

        {isEmpty ? (
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded-xl overflow-hidden">
                  <div className="aspect-[4/3] bg-muted/60 animate-pulse" />
                  <div className="p-4 bg-card"><div className="h-4 bg-muted/60 rounded w-3/4 animate-pulse" /></div>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground/60 font-body italic">
              Recent sales will appear here soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {items.map((p, idx) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative rounded-xl overflow-hidden group"
              >
                <div className="relative aspect-[4/3] bg-muted">
                  {p.images && p.images[0] ? (
                    <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover object-center" loading="lazy" />
                  ) : (
                    <div className="w-full h-full bg-muted" />
                  )}
                  <div className="absolute inset-0 bg-primary/15" />
                  <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-body font-semibold tracking-wider uppercase px-3 py-1.5 rounded">
                    Sold
                  </div>
                </div>
                <div className="p-4 bg-card">
                  <p className="text-sm font-body text-foreground">{p.short_description || p.title}</p>
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
          className="text-center mt-10 space-y-4"
        >
          <p className="text-muted-foreground font-body text-sm italic">
            More successful transactions available upon request.
          </p>
          <button
            onClick={openWhatsApp}
            className="bg-gold hover:bg-gold-hover text-primary-foreground px-8 py-3.5 rounded-lg font-body font-medium text-sm transition-colors duration-300"
          >
            Schedule a Private Consultation
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default SoldHomes;
