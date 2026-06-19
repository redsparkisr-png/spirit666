"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import type { Tables } from "@/integrations/supabase/types";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import AvailableHomes from "@/components/AvailableHomes";
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
import type { FAQItem } from "@/components/FAQSection";

type Property = Tables<"properties_available">;

const FAQ_EN: FAQItem[] = [
  { q: "What is the average property price in Zichron Yaakov in 2026?", a: "As of early 2026, average prices range from ₪2.2–2.8M for a 3-bedroom apartment to ₪3.8–4.2M for a 4-bedroom villa — roughly ₪27,000–₪30,000 per sqm. Neve Remez and the historic Moshava command the highest premiums; Ramat Zvi is the most accessible entry point." },
  { q: "Can foreigners buy property in Zichron Yaakov?", a: "Yes — Israel places no restrictions on foreign ownership. Non-residents pay 8% purchase tax on the full price and may finance up to 50% LTV through Israeli banks. Spirit Real Estate guides international buyers through every step of the process in English." },
  { q: "Which neighborhoods are best in Zichron Yaakov?", a: "Neve Remez for quiet family living and sea views; HaMoshava for walkability and historic charm; Halomot Zichron for new construction; Ramat Zvi for the best entry-level prices; Neve HaBaron for premium semi-detached homes. The right neighborhood depends on your priorities." },
  { q: "How far is Zichron Yaakov from Tel Aviv?", a: "About 60 km north via Highway 2 — roughly 45–60 minutes by car. Binyamina train station (5 minutes from town) connects to Tel Aviv in under an hour. Ben Gurion Airport is approximately 65 km away." },
  { q: "Are there off-market properties in Zichron Yaakov?", a: "Yes. Some of the most sought-after homes in Zichron Yaakov are sold privately before ever appearing on Yad2 or Madlan. Spirit Real Estate maintains direct relationships with owners in high-demand neighborhoods and shares these opportunities with registered buyers first." },
  { q: "Can foreign buyers get a mortgage in Israel?", a: "Yes. Israeli banks offer mortgages to non-residents at up to 50% of the property value. It's strongly recommended to get pre-approval before making an offer. Spirit Real Estate can introduce you to mortgage advisors familiar with foreign-buyer transactions." },
  { q: "What purchase tax do buyers pay in Israel?", a: "Israeli residents buying a first home pay 0% on the first ~₪1.98M, then 3.5–10% on higher brackets. Foreign buyers pay a flat 8% on the full purchase price. There is no VAT on resale residential transactions." },
  { q: "What is a 'Tabo' in Israeli real estate?", a: "Tabo (טאבו) is Israel's official Land Registry. A Tabo extract confirms who legally owns a property and lists any mortgages or liens. Your lawyer must verify a clean Tabo extract before any purchase — it's the Israeli equivalent of a title search." },
];

const FAQ_HE: FAQItem[] = [
  { q: "מה המחיר הממוצע של דירה בזכרון יעקב ב-2026?", a: "נכון לתחילת 2026, דירת 3 חדרים עולה כ-2.2–2.8 מיליון שקל, וילה עם 4 חדרים כ-3.8–4.2 מיליון שקל — בממוצע 27,000–30,000 שקל למ\"ר. נווה רמז והמושבה ההיסטורית הן השכונות היקרות; רמת צבי היא נקודת הכניסה הנגישה ביותר." },
  { q: "האם תושב חוץ יכול לקנות נכס בישראל?", a: "כן — אין בישראל מגבלות על בעלות זרים בנדל\"ן. תושב חוץ משלם מס רכישה של 8% על מחיר הרכישה המלא ויכול לקבל משכנתא ישראלית בשיעור מימון של עד 50%. ספיריט נדל\"ן מלווה קונים בינלאומיים מהצעד הראשון ועד הסגירה." },
  { q: "אילו שכונות מומלצות בזכרון יעקב?", a: "נווה רמז — שקטה ועם נוף לים; המושבה — ניתנת להליכה ועשירה בהיסטוריה; חלומות זכרון — בנייה חדשה; רמת צבי — מחירי כניסה נגישים; נווה הברון — בתים דו-משפחתיים פרמיום. הבחירה תלויה בסדר העדיפויות שלכם." },
  { q: "מה ההבדל בין זכרון יעקב לבנימינה?", a: "זכרון יעקב יקרה יותר מבנימינה ב-15–25% בממוצע, אך מציעה אופי מושבה היסטורי, קהילה אנגלופונית גדולה ומגוון שכונות ייחודיות. בנימינה קרובה יותר לרכבת ומציעה בנייה חדשה יותר. רוב הקונים הבינלאומיים בוחרים בזכרון בשל הקהילה והאופי." },
  { q: "האם יש נכסים שלא מפורסמים בזכרון יעקב?", a: "כן. חלק מהנכסים הטובים ביותר בזכרון נמכרים בשקט לפני שמגיעים ליד2. ספיריט נדל\"ן מקיימת קשרים ישירים עם בעלי נכסים בשכונות המבוקשות ומעדכנת רוכשים מתאימים ראשונים." },
  { q: "מהו מס הרכישה שמשלמים בישראל?", a: "תושב ישראל הרוכש דירה ראשונה משלם 0% עד כ-1.98 מיליון שקל, ואז 3.5–10% לפי מדרגות. תושב חוץ משלם 8% מהשקל הראשון. אין מע\"מ על עסקאות יד שנייה." },
  { q: "האם ניתן לקבל משכנתא ישראלית כתושב חוץ?", a: "כן. הבנקים הגדולים (הפועלים, לאומי, מזרחי) מציעים משכנתאות לתושבי חוץ עד 50% משווי הנכס. מומלץ לקבל אישור עקרוני לפני חתימה על חוזה. ספיריט מחברת קונים עם יועצי משכנתאות המתמחים בעסקאות מחו\"ל." },
  { q: "מה זה טאבו בנדל\"ן ישראלי?", a: "טאבו הוא מרשם המקרקעין הממשלתי. נסח טאבו מאשר מי הבעלים הרשום של הנכס ומה השעבודים הקיימים עליו. חובה לבדוק נסח טאבו עדכני דרך עורך דין לפני כל רכישה." },
];

const Index = ({ featuredProperties }: { featuredProperties?: Property[] }) => {
  const { lang } = useLanguage();
  const isHe = lang === "he";
  const faqItems = isHe ? FAQ_HE : FAQ_EN;

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
              { href: `/${lang}/buying-property-zichron-yaakov`, labelHe: "מדריך רכישת נכס", labelEn: "Buying Property Guide" },
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
