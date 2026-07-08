"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import Header from "@/components/Header";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import FAQSection, { type FAQItem } from "@/components/FAQSection";
import FloatingElements from "@/components/FloatingElements";
import PurchaseTaxWidget from "@/components/PurchaseTaxWidget";

const FAQ_EN: FAQItem[] = [
  {
    q: "How much purchase tax do I pay on my only home in Israel?",
    a: "For a buyer whose only residential home this will be, there is 0% purchase tax up to ₪1,978,745, then 3.5% up to ₪2,347,040, 5% up to ₪6,055,070, 8% up to ₪20,183,565, and 10% above that.",
  },
  {
    q: "What do foreign residents and investors pay?",
    a: "A buyer of an additional home — including, by default, a foreign resident — pays 8% on the value up to ₪6,055,070 and 10% above it, from the first shekel. This investor schedule applies under a temporary order through 31 December 2026.",
  },
  {
    q: "Do new immigrants (olim) pay less purchase tax?",
    a: "Yes. New immigrants are entitled to a significantly reduced rate, usable once within a window around their aliyah. The exact brackets and eligibility depend on your aliyah date and personal status — the rules were reformed in August 2024 — so we calculate your precise figure with you rather than publish a single number.",
  },
  {
    q: "Are these rates current?",
    a: "The single-home brackets are frozen from 16 January 2025 to 15 January 2028 with no annual indexation, so they do not change mid-year. Always confirm your exact liability with us or your lawyer before signing.",
  },
];

const FAQ_HE: FAQItem[] = [
  {
    q: "כמה מס רכישה משלמים על דירה יחידה בישראל?",
    a: "לרוכש שזו תהיה דירת המגורים היחידה שלו: 0% עד ₪1,978,745, לאחר מכן 3.5% עד ₪2,347,040, 5% עד ₪6,055,070, 8% עד ₪20,183,565, ו-10% מעל לכך.",
  },
  {
    q: "כמה משלמים תושבי חוץ ומשקיעים?",
    a: "רוכש דירה נוספת — ובכלל זה, כברירת מחדל, תושב חוץ — משלם 8% על השווי עד ₪6,055,070 ו-10% מעל לכך, מהשקל הראשון. מדרגות המשקיע חלות מכוח הוראת שעה עד 31 בדצמבר 2026.",
  },
  {
    q: "האם עולים חדשים משלמים פחות מס רכישה?",
    a: "כן. עולים חדשים זכאים לשיעור מופחת משמעותית, פעם אחת בחלון סביב מועד העלייה. המדרגות והזכאות המדויקות תלויות בתאריך העלייה ובמעמד האישי — הכללים תוקנו באוגוסט 2024 — ולכן אנחנו מחשבים איתכם את הסכום המדויק במקום לפרסם מספר יחיד.",
  },
  {
    q: "האם המדרגות עדכניות?",
    a: "מדרגות הדירה היחידה מוקפאות מ-16 בינואר 2025 עד 15 בינואר 2028 ללא הצמדה שנתית, כך שהן אינן משתנות באמצע השנה. תמיד יש לאמת את החבות המדויקת מולנו או מול עורך הדין שלכם לפני חתימה.",
  },
];

const PurchaseTaxCalculator = () => {
  const { lang } = useLanguage();
  const isHe = lang === "he";
  const l = isHe ? "he" : "en";

  return (
    <main>
      <Header />

      {/* Hero */}
      <section className="py-14 md:py-20 bg-background">
        <div className="container px-6">
          <BreadcrumbNav
            items={[{ label: isHe ? "מחשבון מס רכישה" : "Purchase Tax Calculator" }]}
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center mt-6 mb-10"
          >
            <span className="inline-block text-xs font-body uppercase tracking-[0.2em] text-gold mb-4">
              {isHe ? "כלי לרוכשים בזכרון יעקב" : "A tool for buyers in Zichron Yaakov"}
            </span>
            <h1 className="font-display font-semibold text-foreground mb-4">
              {isHe ? "מחשבון מס רכישה" : "Israel Purchase Tax Calculator"}
            </h1>
            <p className="font-body text-muted-foreground leading-relaxed">
              {isHe
                ? "העריכו את מס הרכישה על דירה בזכרון יעקב או בכל מקום בישראל — לפי סוג הרוכש ומחיר הנכס. במיוחד עבור רוכשים מחו״ל ועולים חדשים."
                : "Estimate the purchase tax on a home in Zichron Yaakov — or anywhere in Israel — by buyer type and property price. Built especially for overseas buyers and new immigrants."}
            </p>
          </motion.div>

          <PurchaseTaxWidget lang={l} />
        </div>
      </section>

      {/* FAQ */}
      <FAQSection
        title={isHe ? "שאלות נפוצות על מס רכישה" : "Purchase Tax — Frequently Asked Questions"}
        items={isHe ? FAQ_HE : FAQ_EN}
        emitSchema={false}
      />

      {/* Related links */}
      <section className="py-10 border-t border-border">
        <div className="container px-6">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-body text-muted-foreground mb-4">
              {isHe ? "מידע נוסף שיעזור לכם" : "More information"}
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm font-body">
              <Link href={`/${lang}/buying-property-israel-from-abroad`} className="text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
                {isHe ? "קנייה מחו״ל" : "Buying from Abroad"}
              </Link>
              <span className="text-border">·</span>
              <Link href={`/${lang}/property-valuation-zichron-yaakov`} className="text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
                {isHe ? "הערכת שווי נכס" : "Property Valuation"}
              </Link>
              <span className="text-border">·</span>
              <Link href={`/${lang}/properties`} className="text-gold hover:text-gold-hover underline underline-offset-4 transition-colors">
                {isHe ? "נכסים למכירה" : "Properties for Sale"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FloatingElements />
    </main>
  );
};

export default PurchaseTaxCalculator;
