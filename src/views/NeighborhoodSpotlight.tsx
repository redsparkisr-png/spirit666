"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import type { Tables } from "@/integrations/supabase/types";
import Header from "@/components/Header";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import FAQSection, { type FAQItem } from "@/components/FAQSection";
import FloatingElements from "@/components/FloatingElements";
import { SoldCard } from "@/components/RecentlySold";
import { propertyTitle, propertyShortDescription } from "@/lib/property-i18n";
import { propertyStatusLabel } from "@/lib/property-status";
import { optimizedImageUrl } from "@/lib/image";
import { MapPin, CheckCircle2, XCircle } from "lucide-react";

type AvailableProp = Tables<"properties_available">;
type SoldProp = Tables<"properties_sold">;

export type NeighborhoodCopy = {
  h1: { en: string; he: string };
  intro: { en: string; he: string };
  bestFor: { en: string[]; he: string[] };
  lessIdealFor: { en: string[]; he: string[] };
};

const AvailableCard = ({ p, lang }: { p: AvailableProp; lang: "en" | "he" }) => (
  <Link
    href={`/${lang}/property/${p.slug || p.id}`}
    className="block bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 border border-border"
  >
    <div className="relative aspect-[3/2] overflow-hidden bg-muted">
      {p.images?.[0] && (
        <img
          src={optimizedImageUrl(p.images[0], { width: 600, quality: 75 })}
          alt={propertyTitle(p, lang)}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      )}
      {p.property_status && p.property_status !== "Active" && (
        <span className="absolute top-3 start-3 bg-charcoal text-white text-[11px] font-body font-semibold tracking-wider uppercase px-2.5 py-1 rounded">
          {propertyStatusLabel(p.property_status, lang)}
        </span>
      )}
    </div>
    <div className="p-5">
      <span className="inline-block bg-gold/10 border border-gold/20 rounded-lg px-3 py-1.5 text-sm font-body font-semibold text-gold mb-2">
        {p.price_label
          ? p.price_label
          : p.price_number
            ? (lang === "he" ? `₪${Number(p.price_number).toLocaleString()}` : `ILS ${Number(p.price_number).toLocaleString()}`)
            : (lang === "he" ? "מחיר לפי בקשה" : "Price Upon Request")}
      </span>
      <h3 className="font-display font-semibold text-foreground text-base mb-1 line-clamp-1">{propertyTitle(p, lang)}</h3>
      {propertyShortDescription(p, lang) && (
        <p className="text-muted-foreground font-body text-sm leading-relaxed line-clamp-2">{propertyShortDescription(p, lang)}</p>
      )}
    </div>
  </Link>
);

const NeighborhoodSpotlight = ({
  copy,
  available,
  sold,
  faq,
}: {
  copy: NeighborhoodCopy;
  available: AvailableProp[];
  sold: SoldProp[];
  faq: FAQItem[];
}) => {
  const { lang } = useLanguage();
  const isHe = lang === "he";
  const l = isHe ? "he" : "en";

  return (
    <main>
      <Header />
      <section className="py-14 md:py-20 bg-background">
        <div className="container px-6">
          <BreadcrumbNav items={[{ label: isHe ? "שכונות" : "Neighborhoods", to: `/${lang}/zichron-yaakov-neighborhoods` }, { label: copy.h1[l] }]} />
          <div className="max-w-2xl mx-auto text-center mt-6 mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-body uppercase tracking-[0.2em] text-gold mb-4">
              <MapPin className="w-3.5 h-3.5" />
              {isHe ? "זכרון יעקב" : "Zichron Yaakov"}
            </span>
            <h1 className="font-display font-semibold text-foreground mb-4">{copy.h1[l]}</h1>
            <p className="font-body text-muted-foreground leading-relaxed">{copy.intro[l]}</p>
          </div>

          {/* Fit lists */}
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="font-display font-semibold text-foreground text-base mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-gold" />
                {isHe ? "למי זה עשוי להתאים" : "Who it may suit"}
              </h2>
              <ul className="space-y-2">
                {copy.bestFor[l].map((item) => (
                  <li key={item} className="text-sm font-body text-muted-foreground leading-relaxed flex gap-2">
                    <span className="text-gold mt-0.5">•</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6">
              <h2 className="font-display font-semibold text-foreground text-base mb-3 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-muted-foreground" />
                {isHe ? "פחות מתאים ל" : "Less ideal for"}
              </h2>
              <ul className="space-y-2">
                {copy.lessIdealFor[l].map((item) => (
                  <li key={item} className="text-sm font-body text-muted-foreground leading-relaxed flex gap-2">
                    <span className="text-muted-foreground mt-0.5">•</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Available inventory */}
          {available.length > 0 && (
            <div className="mb-16">
              <h2 className="font-display font-semibold text-foreground text-xl md:text-2xl text-center mb-8">
                {isHe ? "נכסים זמינים באזור" : "Available Homes in the Area"}
              </h2>
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
                {available.map((p) => (
                  <AvailableCard key={p.id} p={p} lang={l} />
                ))}
              </div>
            </div>
          )}

          {/* Sold track record */}
          {sold.length > 0 && (
            <div className="mb-16">
              <h2 className="font-display font-semibold text-foreground text-xl md:text-2xl text-center mb-2">
                {isHe ? "נמכרו לאחרונה באזור" : "Recently Sold in the Area"}
              </h2>
              <p className="text-center text-muted-foreground font-body text-sm mb-8">
                {isHe ? "עדות למכירות אמיתיות שסגרנו באזור." : "Real closed deals we've handled in this area."}
              </p>
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
                {sold.map((p) => (
                  <SoldCard key={p.id} p={p} />
                ))}
              </div>
            </div>
          )}

          {available.length === 0 && sold.length === 0 && (
            <p className="text-center text-muted-foreground font-body mb-16">
              {isHe ? "אין כרגע נכסים זמינים באזור זה — צרו קשר ונעדכן אתכם כשיתפנה נכס." : "No active listings in this area right now — contact us and we'll let you know when one becomes available."}
            </p>
          )}

          <div className="text-center">
            <a
              href={`https://wa.me/972522820632?text=${encodeURIComponent(isHe ? `היי, אני מתעניין/ת בנכסים ב${copy.h1.he}.` : `Hi, I'm interested in properties in ${copy.h1.en}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-gold hover:bg-gold-hover text-white py-3.5 px-8 rounded-full font-body font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              {isHe ? "שאלו על נכסים באזור" : "Ask About Properties Here"}
            </a>
          </div>
        </div>
      </section>

      <FAQSection
        title={isHe ? "שאלות נפוצות" : "Frequently Asked Questions"}
        items={faq}
        emitSchema={false}
      />

      <section className="py-10 border-t border-border">
        <div className="container px-6">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-body text-muted-foreground mb-4">{isHe ? "מידע נוסף" : "More information"}</p>
            <div className="flex flex-wrap justify-center gap-3 text-sm font-body">
              <Link href={`/${lang}/zichron-yaakov-neighborhoods`} className="text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
                {isHe ? "מדריך שכונות זכרון יעקב" : "Zichron Yaakov Neighborhood Guide"}
              </Link>
              <span className="text-border">·</span>
              <Link href={`/${lang}/properties`} className="text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
                {isHe ? "כל הנכסים למכירה" : "All Properties for Sale"}
              </Link>
              <span className="text-border">·</span>
              <Link href={`/${lang}/homes-sold-zichron-yaakov`} className="text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
                {isHe ? "נכסים שנמכרו" : "Homes We've Sold"}
              </Link>
            </div>
          </div>
        </div>
      </section>
      <FloatingElements />
    </main>
  );
};

export default NeighborhoodSpotlight;
