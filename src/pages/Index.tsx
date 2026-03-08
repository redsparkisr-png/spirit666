import { Link } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MicroTrustLine from "@/components/MicroTrustLine";
import { FeaturedTestimonial, BottomTestimonial } from "@/components/Testimonials";
import AvailableHomes from "@/components/AvailableHomes";
import ContactForm from "@/components/ContactForm";
import SoldHomes from "@/components/SoldHomes";
import WhyDifferent from "@/components/WhyDifferent";
import LifestyleSection from "@/components/LifestyleSection";
import Testimonials from "@/components/Testimonials";
import TrustSection from "@/components/TrustSection";
import FloatingElements from "@/components/FloatingElements";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import BlueprintSection from "@/components/BlueprintSection";
import MarketSnapshot from "@/components/MarketSnapshot";
import SchemaOrg from "@/components/SchemaOrg";

const Index = () => {
  const { lang } = useLanguage();
  const isHe = lang === "he";
  const prefix = `/${lang}`;

  return (
    <main>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[999] focus:bg-charcoal focus:text-white focus:px-4 focus:py-2 focus:rounded-lg font-body text-sm">
        Skip to content
      </a>
      <SchemaOrg />
      <Header />
      <HeroSection />
      <div id="main-content" />
      <MicroTrustLine />
      <FeaturedTestimonial />
      <AvailableHomes />
      <MarketSnapshot />
      <ContactForm />
      <SoldHomes />
      <WhyDifferent />
      <BlueprintSection />
      <LifestyleSection />
      <Testimonials />
      <BottomTestimonial />

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
            </div>
          </div>
        </div>
      </section>

      <TrustSection />
      <FloatingElements />
      <ExitIntentPopup />
      {/* CookieNotice moved to LanguageLayout */}
    </main>
  );
};

export default Index;
