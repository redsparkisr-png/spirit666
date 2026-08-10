"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { optimizedImageUrl } from "@/lib/image";
import { useLanguage } from "@/lib/i18n";
import { propertyTitle, propertyShortDescription, propertyNeighborhoodNote } from "@/lib/property-i18n";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

type SoldProp = Tables<"properties_sold">;

// Recently-sold proof. Shared by the homepage and the Sell page so the
// "we actually close deals here" signal renders identically in both places.
// Shows every sold property, newest first — this is the full track record,
// not a rotating teaser.
export const useRecentlySold = () => {
  const [sold, setSold] = useState<SoldProp[]>([]);
  useEffect(() => {
    supabase
      .from("properties_sold")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => setSold(data ?? []));
  }, []);
  return sold;
};

// Exported so the dedicated /homes-sold-zichron-yaakov page can reuse the
// exact same card rendering (image treatment, badge, i18n) as the homepage strip.
export const SoldCard = ({ p }: { p: SoldProp }) => {
  const { lang } = useLanguage();
  const isHe = lang === "he";
  // Adaptive frame: the container adopts the photo's measured natural aspect
  // ratio so every image renders in full, uncropped — same approach as the
  // available-homes and properties cards.
  const [ratio, setRatio] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const recordRatio = (el: HTMLImageElement | null) => {
    if (!el || !el.naturalWidth || !el.naturalHeight) return;
    setRatio((r) => r ?? Math.min(2.5, Math.max(0.4, el.naturalWidth / el.naturalHeight)));
  };
  const measureRef = (el: HTMLImageElement | null) => {
    if (el && el.complete) recordRatio(el);
  };

  const localTitle = propertyTitle(p, lang);
  const localNote = propertyNeighborhoodNote(p, lang);
  const localShort = propertyShortDescription(p, lang);

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(true); } }}
        className="bg-background rounded-2xl overflow-hidden border border-border shadow-sm cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 text-start"
      >
        <div
          className="relative overflow-hidden bg-muted transition-[aspect-ratio] duration-500 ease-out"
          style={{ aspectRatio: ratio ?? 4 / 3 }}
        >
          {p.images?.[0] && (
            <img
              ref={measureRef}
              src={optimizedImageUrl(p.images[0], { width: 600 })}
              onLoad={(e) => recordRatio(e.currentTarget)}
              alt={localTitle}
              className="w-full h-full object-contain"
              loading="lazy"
              decoding="async"
            />
          )}
          <span className="absolute top-3 start-3 bg-primary text-primary-foreground text-[10px] font-body font-semibold tracking-wider uppercase px-3 py-1 rounded-full">
            {isHe ? "נמכר" : "Sold"}
          </span>
        </div>
        <div className="p-5">
          <h3 className="font-display font-semibold text-foreground text-base mb-1 line-clamp-1">{localTitle}</h3>
          {localNote && (
            <p className="text-muted-foreground font-body text-xs mb-2 line-clamp-1">{localNote}</p>
          )}
          {localShort && (
            <p className="text-muted-foreground font-body text-sm leading-relaxed line-clamp-2">
              {localShort}
            </p>
          )}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto p-0 gap-0">
          <DialogTitle className="sr-only">{localTitle}</DialogTitle>
          <DialogDescription className="sr-only">
            {isHe ? "פרטי הנכס שנמכר" : "Sold property details"}
          </DialogDescription>
          <div className="relative overflow-hidden bg-muted" style={{ aspectRatio: ratio ?? 4 / 3 }}>
            {p.images?.[0] && (
              <img
                src={optimizedImageUrl(p.images[0], { width: 900 })}
                alt={localTitle}
                className="w-full h-full object-contain"
              />
            )}
            <span className="absolute top-3 start-3 bg-primary text-primary-foreground text-[10px] font-body font-semibold tracking-wider uppercase px-3 py-1 rounded-full">
              {isHe ? "נמכר" : "Sold"}
            </span>
          </div>
          <div className="p-6 space-y-2">
            <h3 className="font-display font-semibold text-foreground text-xl leading-snug">{localTitle}</h3>
            {localNote && <p className="text-muted-foreground font-body text-sm">{localNote}</p>}
            {localShort && (
              <p className="text-muted-foreground font-body text-sm leading-relaxed pt-2">{localShort}</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const RecentlySold = ({ sold, title, subtitle }: { sold: SoldProp[]; title: string; subtitle: string }) => {
  const { lang } = useLanguage();
  if (sold.length === 0) return null;
  return (
    <section className="py-14 md:py-20 bg-card">
      <div className="container px-6">
        <div className="text-center mb-10">
          <h2 className="font-display font-semibold text-foreground mb-2">{title}</h2>
          <p className="text-muted-foreground font-body text-sm">{subtitle}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
          {sold.map((p) => (
            <SoldCard key={p.id} p={p} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href={`/${lang}/homes-sold-zichron-yaakov`}
            className="inline-flex items-center justify-center border border-gold/40 hover:border-gold text-foreground hover:text-gold py-3 px-7 rounded-full font-body font-semibold text-sm transition-all duration-300"
          >
            {lang === "he" ? "לכל הנכסים שנמכרו" : "View All Sold Homes"}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentlySold;
