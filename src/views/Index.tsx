"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import type { Tables } from "@/integrations/supabase/types";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import AvailableHomes from "@/components/AvailableHomes";
import RecentlySold, { useRecentlySold } from "@/components/RecentlySold";
import LifestyleSection from "@/components/LifestyleSection";
import BlueprintPromoSection from "@/components/BlueprintPromoSection";
import Testimonials from "@/components/Testimonials";
import TeamTrustSection from "@/components/TeamTrustSection";
import TrustSection from "@/components/TrustSection";
import FloatingElements from "@/components/FloatingElements";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import ClosingCTA from "@/components/ClosingCTA";
import GoldDivider from "@/components/ui/gold-divider";
import FAQSection from "@/components/FAQSection";
import { homeFaqEn, homeFaqHe } from "@/content/home-faq";

type Property = Tables<"properties_available">;

const Index = ({ featuredProperties }: { featuredProperties?: Property[] }) => {
  const { lang } = useLanguage();
  const isHe = lang === "he";
  // Single-sourced with the FAQPage schema (page.tsx) via src/content/home-faq.ts.
  const faqItems = isHe ? homeFaqHe : homeFaqEn;
  const recentlySold = useRecentlySold();

  return (
    <main>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[999] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-lg font-body text-sm">
        {isHe ? "דלג לתוכן" : "Skip to content"}
      </a>
      <Header />
      <HeroSection />
      <div id="main-content" />
      <TrustBar />
      <GoldDivider />
      <AvailableHomes limit={6} initialProperties={featuredProperties} />
      <RecentlySold
        sold={recentlySold}
        title={isHe ? "נמכרו לאחרונה בזכרון יעקב" : "Recently Sold in Zichron Yaakov"}
        subtitle={isHe ? "כמה מהבתים שחיברנו לבעלים החדשים שלהם." : "A few of the homes we've matched with their new owners."}
      />
      <GoldDivider />
      <div id="buyer-guide-section">
        <BlueprintPromoSection />
      </div>
      <LifestyleSection />
      <GoldDivider />
      <Testimonials />
      <TeamTrustSection />
      <ClosingCTA />
      {/* Internal content hub — boosts topical authority + GEO signals */}
      <section className="py-10 bg-card border-y border-border">
        <div className="container px-6">
          <p className="text-center text-xs font-body font-semibold uppercase tracking-widest text-muted-foreground mb-5">
            {isHe ? "מדריכים ומשאבים" : "Guides & Resources"}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { href: `/${lang}/homes-for-sale-zichron-yaakov`, labelHe: "בתים למכירה", labelEn: "Homes for Sale" },
              { href: `/${lang}/buying-property-zichron-yaakov`, labelHe: "מדריך רכישת נכס", labelEn: "Buying Property Guide" },
              { href: `/${lang}/buying-property-israel-from-abroad`, labelHe: "קנייה מחו״ל", labelEn: "Buying from Abroad" },
              { href: `/${lang}/zichron-yaakov-neighborhoods`, labelHe: "מדריך שכונות", labelEn: "Neighborhood Guide" },
              { href: `/${lang}/zichron-yaakov-real-estate-market-2026`, labelHe: "דוח שוק 2026", labelEn: "Market Report 2026" },
              { href: `/${lang}/property-valuation-zichron-yaakov`, labelHe: "הערכת שווי נכס", labelEn: "Property Valuation" },
              { href: `/${lang}/living-in-zichron-yaakov`, labelHe: "חיים בזכרון יעקב", labelEn: "Living in Zichron Yaakov" },
              { href: `/${lang}/guides`, labelHe: "כל המדריכים", labelEn: "All Guides" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="text-sm font-body text-muted-foreground hover:text-foreground border border-border hover:border-gold/50 rounded-full px-4 py-2 transition-colors">
                {isHe ? l.labelHe : l.labelEn}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <FAQSection
        title={isHe ? "שאלות נפוצות על נדל\"ן בזכרון יעקב" : "Frequently Asked Questions about Zichron Yaakov Real Estate"}
        subtitle={isHe ? "תשובות ישירות לשאלות הכי נפוצות של קונים מישראל ומחו\"ל" : "Straightforward answers to the questions buyers ask us most"}
        items={faqItems}
        emitSchema={false}
      />
      <TrustSection />
      <FloatingElements />
      <ExitIntentPopup />
    </main>
  );
};

export default Index;
