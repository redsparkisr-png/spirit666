"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import type { Tables } from "@/integrations/supabase/types";
import Header from "@/components/Header";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { SoldCard } from "@/components/RecentlySold";
import FloatingElements from "@/components/FloatingElements";

type SoldProp = Tables<"properties_sold">;

const SoldHomes = ({ sold }: { sold: SoldProp[] }) => {
  const { lang } = useLanguage();
  const isHe = lang === "he";

  return (
    <main>
      <Header />
      <section className="py-14 md:py-20 bg-background">
        <div className="container px-6">
          <BreadcrumbNav items={[{ label: isHe ? "נכסים שנמכרו" : "Sold Homes" }]} />
          <div className="text-center max-w-2xl mx-auto mt-6 mb-12">
            <span className="inline-block text-xs font-body uppercase tracking-[0.2em] text-gold mb-4">
              {isHe ? "תיק עסקאות" : "Track Record"}
            </span>
            <h1 className="font-display font-semibold text-foreground mb-4">
              {isHe ? "נכסים שמכרנו בזכרון יעקב" : "Homes We've Sold in Zichron Yaakov"}
            </h1>
            <p className="font-body text-muted-foreground leading-relaxed">
              {isHe
                ? `${sold.length} מהבתים שחיברנו לבעלים החדשים שלהם — עדות למכירות אמיתיות, לא רק לליסטינגים.`
                : `${sold.length} of the homes we've matched with their new owners — real closed deals, not just listings.`}
            </p>
          </div>

          {sold.length === 0 ? (
            <p className="text-center text-muted-foreground font-body py-10">
              {isHe ? "בקרוב נעדכן כאן נכסים שנמכרו." : "Sold homes will appear here soon."}
            </p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
              {sold.map((p) => (
                <SoldCard key={p.id} p={p} />
              ))}
            </div>
          )}

          <div className="text-center mt-14">
            <p className="font-body text-muted-foreground mb-4">
              {isHe ? "חושבים למכור? נשמח לספר לכם איך זה נראה מהצד שלכם." : "Thinking of selling? We'd love to show you what this looks like from your side."}
            </p>
            <Link
              href={`/${lang}/sell`}
              className="inline-flex items-center justify-center bg-gold hover:bg-gold-hover text-white py-3.5 px-8 rounded-full font-body font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              {isHe ? "מכירת הנכס שלי" : "Sell My Home"}
            </Link>
          </div>
        </div>
      </section>
      <FloatingElements />
    </main>
  );
};

export default SoldHomes;
