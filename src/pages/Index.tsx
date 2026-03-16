import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import ShortTestimonial from "@/components/ShortTestimonial";
import AvailableHomes from "@/components/AvailableHomes";
import LifestyleSection from "@/components/LifestyleSection";
import GoldenConversionPoint from "@/components/GoldenConversionPoint";
import BlueprintPromoSection from "@/components/BlueprintPromoSection";
import Testimonials from "@/components/Testimonials";
import TeamTrustSection from "@/components/TeamTrustSection";
import TrustSection from "@/components/TrustSection";
import FloatingElements from "@/components/FloatingElements";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import SchemaOrg from "@/components/SchemaOrg";
import ClosingCTA from "@/components/ClosingCTA";

const Index = () => {
  const { lang } = useLanguage();
  const isHe = lang === "he";
  const prefix = `/${lang}`;

  return (
    <main>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[999] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-lg font-body text-sm">
        {isHe ? "דלג לתוכן" : "Skip to content"}
      </a>
      <SchemaOrg />
      <Header />

      {/* 1. Hero */}
      <HeroSection />
      <div id="main-content" />

      {/* 2. Trust Bar */}
      <TrustBar />

      {/* 3. Short Testimonial */}
      <ShortTestimonial />

      {/* 4. Featured Homes */}
      <AvailableHomes limit={6} />

      {/* 5. Buyer Guide section (moved up) */}
      <div id="buyer-guide-section">
        <GoldenConversionPoint />
        <BlueprintPromoSection />
      </div>

      {/* 6. Lifestyle */}
      <LifestyleSection />

      {/* 7. Testimonials */}
      <Testimonials />

      {/* 8. Team Trust Section */}
      <TeamTrustSection />

      {/* 9. Closing CTA */}
      <ClosingCTA />

      {/* SEO internal links */}
      <section className="py-12 bg-card">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display font-semibold text-foreground text-center mb-6 text-xl">
              {isHe ? "מדריכי נדל\"ן לזכרון יעקב" : "Zichron Yaakov Real Estate Guides"}
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to={`${prefix}/buying-property-zichron-yaakov`} className="text-sm font-body text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
                {isHe ? "מדריך רכישת נכס" : "Buying Property Guide"}
              </Link>
              <Link to={`${prefix}/homes-for-sale-zichron-yaakov`} className="text-sm font-body text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
                {isHe ? "בתים למכירה" : "Homes for Sale"}
              </Link>
              <Link to={`${prefix}/living-in-zichron-yaakov`} className="text-sm font-body text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
                {isHe ? "חיים בזכרון יעקב" : "Living in Zichron Yaakov"}
              </Link>
              <Link to={`${prefix}/moving-to-zichron-yaakov`} className="text-sm font-body text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
                {isHe ? "מעבר לזכרון יעקב" : "Moving to Zichron Yaakov"}
              </Link>
              <Link to={`${prefix}/guides`} className="text-sm font-body text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
                {isHe ? "מדריכים ותובנות" : "Guides & Insights"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TrustSection />
      <FloatingElements />
      <ExitIntentPopup />
    </main>
  );
};

export default Index;
