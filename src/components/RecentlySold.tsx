"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { optimizedImageUrl } from "@/lib/image";

type SoldProp = Tables<"properties_sold">;

// Recently-sold proof. Shared by the homepage and the Sell page so the
// "we actually close deals here" signal renders identically in both places.
export const useRecentlySold = () => {
  const [sold, setSold] = useState<SoldProp[]>([]);
  useEffect(() => {
    supabase
      .from("properties_sold")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(3)
      .then(({ data }) => setSold(data ?? []));
  }, []);
  return sold;
};

const RecentlySold = ({ sold, title, subtitle }: { sold: SoldProp[]; title: string; subtitle: string }) => {
  if (sold.length === 0) return null;
  return (
    <section className="py-14 md:py-20 bg-card">
      <div className="container px-6">
        <div className="text-center mb-10">
          <h2 className="font-display font-semibold text-foreground mb-2">{title}</h2>
          <p className="text-muted-foreground font-body text-sm">{subtitle}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {sold.map((p) => (
            <div key={p.id} className="bg-background rounded-2xl overflow-hidden border border-border shadow-sm">
              <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                {p.images?.[0] && (
                  <img
                    src={optimizedImageUrl(p.images[0], { width: 600 })}
                    alt={p.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                )}
                <span className="absolute top-3 start-3 bg-primary text-primary-foreground text-[10px] font-body font-semibold tracking-wider uppercase px-3 py-1 rounded-full">
                  Sold
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display font-semibold text-foreground text-base mb-1 line-clamp-1">{p.title}</h3>
                {p.neighborhood_note && (
                  <p className="text-muted-foreground font-body text-xs mb-2 line-clamp-1">{p.neighborhood_note}</p>
                )}
                {p.short_description && (
                  <p className="text-muted-foreground font-body text-sm leading-relaxed line-clamp-2">
                    {p.short_description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlySold;
