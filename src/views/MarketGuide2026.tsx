"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import Header from "@/components/Header";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import FAQSection from "@/components/FAQSection";
import { AlertCircle, TrendingUp, Home, Users, BarChart3, Info, ExternalLink } from "lucide-react";

// ── Legal disclaimer text ────────────────────────────────────────────────────
const DISCLAIMER_EN = `IMPORTANT DISCLAIMER: The market data, price figures, and statistics presented on this page are compiled from publicly available third-party sources, including the Easy Aliyah Q1 2025 Real Estate Market Report, Yokra Estate market summaries, and publicly listed properties on Israeli real estate platforms (Yad2, Madlan, Green-Acres). This content is provided for general informational and educational purposes only. It does not constitute professional real estate advice, a property valuation, a market appraisal, or investment advice of any kind. All price ranges are indicative estimates and refer to historical transaction periods (primarily 2024–2025). Actual current values may differ. Real estate markets fluctuate and past performance does not guarantee future results. Spirit Real Estate and its agents make no representations or warranties, express or implied, about the accuracy, completeness, or fitness for any particular purpose of the information on this page. You should independently verify all information with a licensed real estate agent, a certified appraiser, and relevant government databases (Israeli Land Registry / Tabo, Israel Tax Authority) before making any purchase or investment decision. Nothing on this page creates a client-agent relationship.`;

const DISCLAIMER_HE = `הצהרת אחריות חשובה: נתוני השוק, מחירים וסטטיסטיקות המוצגים בדף זה נאספו ממקורות חיצוניים ציבוריים, כולל דוח שוק הנדלן Q1 2025 של Easy Aliyah, סיכומי שוק של Yokra Estate, ונכסים המפורסמים בפלטפורמות נדלן ישראליות (יד2, מדלן). תוכן זה ניתן למטרות מידע כלליות וחינוכיות בלבד. הוא אינו מהווה ייעוץ נדלן מקצועי, שמאות נכס, הערכת שוק, או ייעוץ השקעות מכל סוג. כל טווחי המחירים הם הערכות אינדיקטיביות המתייחסות לתקופות עסקאות היסטוריות (בעיקר 2024–2025). הערכים הנוכחיים האמיתיים עשויים להיות שונים. שוקי הנדלן משתנים ותשואות עבר אינן מבטיחות תוצאות עתידיות. ספיריט נדלן וסוכניה אינם מצהירים ואינם מתחייבים, מפורשות או מכללא, לגבי הדיוק, השלמות, או ההתאמה לכל מטרה ספציפית של המידע בדף זה. יש לאמת באופן עצמאי את כל המידע עם סוכן נדלן מורשה, שמאי מוסמך, ומסדי נתונים ממשלתיים רלוונטיים (טאבו, רשות המסים) לפני כל החלטת רכישה או השקעה. אין בדף זה כדי ליצור קשר מתווך-לקוח.`;

// ── FAQ content ──────────────────────────────────────────────────────────────
const FAQ_EN = [
  {
    q: "What is the average property price in Zichron Yaakov in 2025?",
    a: "According to the Easy Aliyah Q1 2025 Real Estate Market Report, the average property price in Zichron Yaakov reached approximately ₪3,670,000, with an average price per square meter of ₪27,400. This represented a 13.5% year-on-year increase. Note: these figures reflect Q1 2025 data only and may not represent current values. See our full disclaimer above.",
  },
  {
    q: "How much do villas cost in Zichron Yaakov?",
    a: "Based on active listings observed in 2024–2025, villa prices in Zichron Yaakov range from approximately ₪4.5M (entry-level semi-detached with modest garden) to ₪9M+ for large standalone villas with sea views in premium neighborhoods like Neve Remez. Listings with Jacuzzi, pool, and elevated plots have reached ₪8.9M in recent cycles. These are indicative ranges; actual market values vary significantly by specific plot, view, and condition.",
  },
  {
    q: "Are real estate prices in Zichron Yaakov higher than in Binyamina?",
    a: "Yes. Zichron Yaakov properties typically command a 15–25% premium over comparable properties in Binyamina, reflecting the town's historic character, established Anglo community, greater variety of amenities, and constrained new construction. Binyamina offers newer developments and closer proximity to Binyamina train station (walkable vs. a short drive from Zichron).",
  },
  {
    q: "What percentage of Zichron Yaakov buyers are foreign nationals?",
    a: "According to Q1 2025 market data, approximately 22% of residential purchases in Zichron Yaakov were made by overseas buyers, predominantly from North America and France. This is significantly higher than the Israeli national average, reflecting Zichron's strong reputation as an Anglo and Francophone community.",
  },
  {
    q: "How long does it take to sell a property in Zichron Yaakov?",
    a: "According to Q1 2025 data, the average time on market for Zichron Yaakov properties was approximately 65 days. Premium properties in high-demand neighborhoods (Neve Remez, HaMoshava) with realistic pricing can sell faster — sometimes within weeks if presented off-market. Overpriced properties or those needing significant renovation may take significantly longer.",
  },
  {
    q: "Is Zichron Yaakov a good real estate investment?",
    a: "Zichron Yaakov has historically demonstrated strong price appreciation, supported by constrained supply (the town has limited new development due to planning conservation), consistent demand from lifestyle buyers, and a growing Anglo community. However, we cannot make predictions about future performance. Real estate investment carries risk, and you should consult a licensed financial advisor and perform full due diligence before investing.",
  },
];

const FAQ_HE = [
  {
    q: "מה המחיר הממוצע לנכס בזכרון יעקב ב-2025?",
    a: "לפי דוח שוק הנדלן Q1 2025 של Easy Aliyah, המחיר הממוצע לנכס בזכרון יעקב הגיע לכ-3.67 מיליון שקל, עם מחיר ממוצע למ\"ר של כ-27,400 שקל — עלייה של כ-13.5% לעומת אותה תקופה ב-2024. שים לב: נתונים אלה משקפים את Q1 2025 בלבד ועשויים שלא לייצג את הערכים הנוכחיים. ראה את הדיסקליימר המלא שלנו לעיל.",
  },
  {
    q: "כמה עולות וילות בזכרון יעקב?",
    a: "בהתבסס על מודעות פעילות שנצפו ב-2024–2025, מחירי וילות בזכרון יעקב נעים בין כ-4.5 מיליון שקל (וילה דו-משפחתית בסיסית עם גן קטן) ל-9 מיליון שקל ומעלה עבור וילות עצמאיות גדולות עם נוף לים בשכונות פרמיום כמו נווה רמז. מדובר בטווחים אינדיקטיביים; הערכים האמיתיים משתנים משמעותית לפי מגרש, נוף ומצב.",
  },
  {
    q: "האם מחירי הנדלן בזכרון גבוהים מאלה שבבנימינה?",
    a: "כן. נכסים בזכרון יעקב פיקדו על פרמיה של 15–25% לעומת נכסים דומים בבנימינה, המשקפת את האופי ההיסטורי, הקהילה האנגלופונית המבוססת, מגוון השירותים הגדול יותר, והבנייה החדשה המוגבלת. בנימינה מציעה פיתוחים חדשים יותר וקרבה גדולה יותר לתחנת הרכבת.",
  },
  {
    q: "כמה אחוז מרוכשי הנכסים בזכרון הם תושבי חוץ?",
    a: "לפי נתוני שוק Q1 2025, כ-22% מהרכישות המגורים בזכרון יעקב בוצעו על ידי קונים מחו\"ל, בעיקר מצפון אמריקה וצרפת. זהו שיעור גבוה משמעותית מהממוצע הלאומי הישראלי, המשקף את המוניטין החזק של זכרון כקהילה אנגלופונית ופרנקופונית.",
  },
  {
    q: "כמה זמן לוקח למכור נכס בזכרון יעקב?",
    a: "לפי נתוני Q1 2025, הזמן הממוצע בשוק לנכסים בזכרון יעקב עמד על כ-65 יום. נכסי פרמיום בשכונות בעלות ביקוש גבוה (נווה רמז, המושבה) עם תמחור ריאלי עשויים להימכר מהר יותר — לפעמים תוך שבועות, אם מוצגים ישירות. נכסים שמחירם גבוה מהשוק או הדורשים שיפוץ משמעותי עשויים לקחת זמן ארוך הרבה יותר.",
  },
  {
    q: "האם זכרון יעקב היא השקעת נדלן טובה?",
    a: "זכרון יעקב הציגה היסטורית עלייה חזקה במחירים, נתמכת בהיצע מוגבל (לעיר יש פיתוח חדש מוגבל בשל שימור תכנוני), ביקוש עקבי מרוכשי אורח חיים, וקהילה אנגלופונית גדלה. עם זאת, אנחנו לא יכולים לחזות ביצועים עתידיים. השקעה בנדלן טומנת בחובה סיכון, ויש להתייעץ עם יועץ פיננסי מורשה ולבצע בדיקת נאותות מלאה לפני השקעה.",
  },
];

// ── Data table rows ──────────────────────────────────────────────────────────
const PRICE_TABLE_EN = [
  { type: "3-BR Apartment", range: "₪2.2M – ₪3.0M", sqm: "₪24,000–₪28,000/m²", notes: "Varies by floor, building age, view" },
  { type: "4-BR Apartment / Garden Unit", range: "₪2.8M – ₪4.0M", sqm: "₪25,000–₪30,000/m²", notes: "Garden units command premium" },
  { type: "Semi-Detached (Cottage)", range: "₪3.5M – ₪6.5M", sqm: "₪28,000–₪35,000/m²", notes: "Private garden included" },
  { type: "Standalone Villa (Zichron avg.)", range: "₪4.5M – ₪9M+", sqm: "₪30,000–₪45,000/m²", notes: "Sea view adds significant premium" },
  { type: "Historic Stone House (HaMoshava)", range: "₪3.8M – ₪7M", sqm: "₪32,000–₪42,000/m²", notes: "Rare; depends heavily on renovation state" },
  { type: "Land Plot (per dunam)", range: "₪1.5M – ₪4M/dunam", sqm: "N/A", notes: "Zoning and location-dependent" },
];

const PRICE_TABLE_HE = [
  { type: 'דירת 3 חד\'', range: "2.2 – 3.0 מיליון ₪", sqm: "24,000–28,000 ₪/מ\"ר", notes: "תלוי בקומה, גיל הבניין, נוף" },
  { type: "דירת 4 חד' / דירת גן", range: "2.8 – 4.0 מיליון ₪", sqm: "25,000–30,000 ₪/מ\"ר", notes: "דירות גן פיקדות על פרמיה" },
  { type: "קוטג' דו-משפחתי", range: "3.5 – 6.5 מיליון ₪", sqm: "28,000–35,000 ₪/מ\"ר", notes: "כולל גן פרטי" },
  { type: "וילה עצמאית (ממוצע זכרון)", range: "4.5 – 9+ מיליון ₪", sqm: "30,000–45,000 ₪/מ\"ר", notes: "נוף לים מוסיף פרמיה משמעותית" },
  { type: "בית אבן היסטורי (המושבה)", range: "3.8 – 7 מיליון ₪", sqm: "32,000–42,000 ₪/מ\"ר", notes: "נדיר; תלוי מאוד במצב השיפוץ" },
  { type: "מגרש (לדונם)", range: "1.5 – 4 מיליון ₪/דונם", sqm: "–", notes: "תלוי בייעוד ובמיקום" },
];

// ── Component ────────────────────────────────────────────────────────────────
const MarketGuide2026 = () => {
  const { lang } = useLanguage();
  const isHe = lang === "he";
  const priceTable = isHe ? PRICE_TABLE_HE : PRICE_TABLE_EN;

  return (
    <main className="min-h-screen bg-background" dir={isHe ? "rtl" : "ltr"}>
      <Header />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-6">
          <BreadcrumbNav
            items={[{ label: isHe ? "דוח שוק זכרון יעקב 2026" : "Zichron Yaakov Market Report 2026" }]}
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mt-6"
          >
            <div className="inline-flex items-center gap-2 text-xs font-body font-semibold uppercase tracking-widest text-gold bg-gold/10 border border-gold/20 px-4 py-1.5 rounded-full mb-6">
              <BarChart3 className="w-3.5 h-3.5" />
              {isHe ? "דוח שוק 2026" : "Market Report 2026"}
            </div>
            <h1 className="font-display font-semibold text-foreground mb-4 text-3xl md:text-4xl lg:text-5xl">
              {isHe
                ? "שוק הנדלן בזכרון יעקב 2026"
                : "Zichron Yaakov Real Estate Market 2026"}
            </h1>
            <p className="text-muted-foreground font-body text-lg max-w-2xl mx-auto leading-relaxed">
              {isHe
                ? "ניתוח מחירים, מגמות, נתוני עסקאות והשוואת שכונות — עם דיסקליימר מלא וציוני מקורות."
                : "Price analysis, trends, transaction data, and neighborhood comparison — with full disclaimer and source attribution."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Full Disclaimer Banner */}
      <section className="bg-amber-500/5 border-y border-amber-500/20">
        <div className="container px-6 py-6">
          <div className="max-w-4xl mx-auto flex items-start gap-4">
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-1" />
            <div>
              <p className="text-sm font-body font-semibold text-foreground mb-1">
                {isHe ? "הצהרת אחריות — חובה לקרוא" : "Data Disclaimer — Please Read"}
              </p>
              <p className="text-xs text-muted-foreground font-body leading-relaxed">
                {isHe ? DISCLAIMER_HE : DISCLAIMER_EN}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-14 md:py-20">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-5 h-5 text-gold" />
              <h2 className="font-display font-semibold text-2xl text-foreground">
                {isHe ? "נתוני מפתח — Q1 2025" : "Key Market Data — Q1 2025"}
              </h2>
            </div>
            <p className="text-sm text-muted-foreground font-body mb-8">
              {isHe
                ? "מקור: Easy Aliyah Real Estate Market Report Q1 2025 + Yokra Estate market summaries. ראה דיסקליימר מלא לעיל."
                : "Sources: Easy Aliyah Real Estate Market Report Q1 2025 + Yokra Estate market summaries. See full disclaimer above."}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                {
                  value: "₪3,670,000",
                  label: isHe ? "מחיר ממוצע לנכס" : "Avg. property price",
                  note: isHe ? "Q1 2025" : "Q1 2025",
                },
                {
                  value: isHe ? "27,400 ₪/מ\"ר" : "₪27,400/m²",
                  label: isHe ? "מחיר ממוצע למ\"ר" : "Avg. price per m²",
                  note: isHe ? "Q1 2025" : "Q1 2025",
                },
                {
                  value: "~192",
                  label: isHe ? "עסקאות מגורים" : "Residential transactions",
                  note: isHe ? "Q1 2025" : "Q1 2025",
                },
                {
                  value: "+13.5%",
                  label: isHe ? "עלייה שנתית במחיר" : "YoY price increase",
                  note: isHe ? "Q1 2024 → Q1 2025" : "Q1 2024 → Q1 2025",
                },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded-xl p-5 text-center"
                >
                  <p className="font-display font-semibold text-2xl text-gold mb-1">{s.value}</p>
                  <p className="text-xs font-body text-foreground font-medium mb-1">{s.label}</p>
                  <p className="text-xs font-body text-muted-foreground">{s.note}</p>
                </motion.div>
              ))}
            </div>

            {/* Additional context stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: Users,
                  titleEn: "22% Foreign Buyers",
                  titleHe: "22% קונים מחו\"ל",
                  bodyEn: "Predominantly North American and French buyers — far above the Israeli national average.",
                  bodyHe: "בעיקר קונים מצפון אמריקה וצרפת — הרבה מעל הממוצע הלאומי הישראלי.",
                },
                {
                  icon: Home,
                  titleEn: "65 Days on Market",
                  titleHe: "65 יום בשוק",
                  bodyEn: "Average time to sell — well-priced properties in Neve Remez and HaMoshava move faster.",
                  bodyHe: "זמן מכירה ממוצע — נכסים מתומחרים נכון בנווה רמז ובמושבה נמכרים מהר יותר.",
                },
                {
                  icon: TrendingUp,
                  titleEn: "+15.9% Transaction Volume",
                  titleHe: "+15.9% נפח עסקאות",
                  bodyEn: "Transaction activity in Q1 2025 grew 15.9% YoY — indicating strong buyer demand.",
                  bodyHe: "נפח העסקאות ב-Q1 2025 גדל ב-15.9% לעומת Q1 2024 — מעיד על ביקוש קונים חזק.",
                },
              ].map((c, i) => {
                const Icon = c.icon;
                return (
                  <div key={i} className="bg-card border border-border rounded-xl p-5">
                    <Icon className="w-5 h-5 text-primary mb-3" />
                    <p className="font-display font-semibold text-foreground mb-1">
                      {isHe ? c.titleHe : c.titleEn}
                    </p>
                    <p className="text-sm text-muted-foreground font-body">
                      {isHe ? c.bodyHe : c.bodyEn}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground font-body">
              <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-muted-foreground/60" />
              {isHe
                ? "כל הנתונים לעיל מוגשים כאינדיקציה בלבד. ספיריט נדלן אינה אחראית לדיוק נתוני צד שלישי."
                : "All figures above are indicative only. Spirit Real Estate assumes no liability for third-party data accuracy."}
            </div>
          </div>
        </div>
      </section>

      {/* Price by Property Type */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display font-semibold text-2xl text-foreground mb-2">
              {isHe ? "מחירים לפי סוג נכס" : "Prices by Property Type"}
            </h2>
            <p className="text-sm text-muted-foreground font-body mb-6">
              {isHe
                ? "מבוסס על מודעות פעילות ועסקאות שדווחו בפלטפורמות נדלן ישראליות, 2024–2025. ראה דיסקליימר מלא."
                : "Based on active listings and reported transactions on Israeli real estate platforms, 2024–2025. See full disclaimer."}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-body">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-start py-3 pe-4 text-muted-foreground font-semibold">
                      {isHe ? "סוג נכס" : "Property Type"}
                    </th>
                    <th className="text-start py-3 pe-4 text-muted-foreground font-semibold">
                      {isHe ? "טווח מחיר (אינדיקטיבי)" : "Price Range (Indicative)"}
                    </th>
                    <th className="text-start py-3 pe-4 text-muted-foreground font-semibold hidden md:table-cell">
                      {isHe ? "מחיר למ\"ר" : "Price per m²"}
                    </th>
                    <th className="text-start py-3 text-muted-foreground font-semibold hidden md:table-cell">
                      {isHe ? "הערות" : "Notes"}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {priceTable.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "" : "bg-muted/30"}>
                      <td className="py-3 pe-4 font-medium text-foreground">{row.type}</td>
                      <td className="py-3 pe-4 text-gold font-semibold">{row.range}</td>
                      <td className="py-3 pe-4 text-muted-foreground hidden md:table-cell">{row.sqm}</td>
                      <td className="py-3 text-muted-foreground text-xs hidden md:table-cell">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground font-body">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-500" />
              {isHe
                ? "טווחים אלה הם הערכות בלבד. מחיר נכס ספציפי תלוי בגורמים רבים. אין להסתמך על נתונים אלה ללא אימות עם מומחה מקצועי."
                : "These ranges are estimates only. A specific property's price depends on many factors. Do not rely on this data without verification from a professional."}
            </div>
          </div>
        </div>
      </section>

      {/* Market Context */}
      <section className="py-14 md:py-20">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display font-semibold text-2xl text-foreground mb-6">
              {isHe ? "הקשר ורקע שוק" : "Market Context & Background"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4 text-sm font-body text-muted-foreground leading-relaxed">
                <p>
                  {isHe
                    ? "זכרון יעקב היא עיר ייחודית בשוק הנדלן הישראלי. עם אוכלוסייה של כ-24,000 תושבים ודירוג חברתי-כלכלי 8 מתוך 10 (לפי הלמ\"ס), היא נחשבת לאחת מהקהילות האיכותיות ביותר בצפון מרכז ישראל."
                    : "Zichron Yaakov occupies a unique position in the Israeli real estate market. With a population of approximately 24,000 and a socio-economic ranking of 8 out of 10 (Central Bureau of Statistics), it is considered one of the highest-quality communities in northern-central Israel."}
                </p>
                <p>
                  {isHe
                    ? "ההיצע מוגבל מבנייה חדשה: מרבית הבנייה החדשה בזכרון כפופה לשמירה על אופי המושבה ההיסטורי. מגבלה זו משפיעה מאוד על האיזון בין ביקוש להיצע — ומהווה גורם מרכזי בשמירת ערכי הנדלן."
                    : "Supply is constrained by new construction limits: most new development in Zichron is subject to conservation requirements protecting the town's historic character. This supply constraint significantly affects the demand-supply balance — and is a key factor in sustaining property values."}
                </p>
                <p>
                  {isHe
                    ? "ישנה תחנת רכבת בבנימינה (5–10 דק' נסיעה מזכרון יעקב), שמספקת גישה ישירה לתל אביב תוך פחות משעה. נגישות זו הפכה את זכרון לאופציה ריאלית עבור מי שעובד בגוש דן."
                    : "Binyamina train station (5–10 minutes by car from Zichron Yaakov) provides direct rail access to Tel Aviv in under one hour. This connectivity has made Zichron a realistic option for professionals working in the Tel Aviv metro area."}
                </p>
              </div>
              <div className="space-y-4 text-sm font-body text-muted-foreground leading-relaxed">
                <p>
                  {isHe
                    ? "כ-22% מהרוכשים הם תושבי חוץ — בעיקר מקהילות אנגלופוניות ופרנקופוניות. עובדה זו יוצרת ביקוש מחוץ לגבולות ישראל שאינו מושפע ישירות מתנאי השוק המקומי."
                    : "Approximately 22% of buyers are foreign nationals — primarily from Anglophone and Francophone communities. This creates demand that originates outside Israel and is not directly affected by local Israeli market conditions."}
                </p>
                <p>
                  {isHe
                    ? "השוק הארצי: מדד מחירי הדירות הארצי הציג עלייה של כ-0.3% בחודשים פברואר–מרץ 2026 (נתון שפורסם במאי 2026 על ידי הלמ\"ס). זכרון יעקב מציגה היסטורית ביצועים טובים מהממוצע הארצי בשל מאפייניה הייחודיים."
                    : "National context: Israel's Housing Price Index showed approximately 0.3% growth in February–March 2026 (CBS data published May 2026). Zichron Yaakov has historically outperformed the national average due to its unique characteristics."}
                </p>
                <p>
                  {isHe
                    ? "אין ביכולתנו לחזות את עתיד השוק. נתונים היסטוריים מצביעים על מגמה חיובית, אך גורמים חיצוניים — ריביות, מדיניות ממשלתית, מצב גיאופוליטי — יכולים להשפיע על כל שוק נדלן."
                    : "We cannot predict future market performance. Historical data points to positive trends, but external factors — interest rates, government policy, geopolitical conditions — can affect any real estate market."}
                </p>
              </div>
            </div>

            {/* Sources */}
            <div className="mt-8 p-5 bg-muted/30 rounded-xl border border-border">
              <div className="flex items-center gap-2 mb-3">
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
                <p className="text-sm font-body font-semibold text-foreground">
                  {isHe ? "מקורות" : "Sources Used"}
                </p>
              </div>
              <ul className="space-y-1 text-xs font-body text-muted-foreground">
                <li>• Easy Aliyah &mdash; Zichron Ya&apos;akov Real Estate Market Report Q1 2025</li>
                <li>• Yokra Estate &mdash; Houses for Sale in Binyamina and Zichron Yaakov (2024)</li>
                <li>• Israel Central Bureau of Statistics (CBS / למ"ס) — Housing Price Index, May 2026</li>
                <li>• Israeli real estate platforms: Yad2, Madlan, Green-Acres (observed listings 2024–2025)</li>
                <li>
                  {isHe
                    ? "• ספיריט נדלן — ניתוח פנימי של עסקאות זמינות בשוק זכרון יעקב"
                    : "• Spirit Real Estate — internal analysis of available Zichron Yaakov market transactions"}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection
        title={isHe ? "שאלות נפוצות על שוק הנדלן בזכרון יעקב" : "Frequently Asked Questions — Zichron Yaakov Market"}
        items={isHe ? FAQ_HE : FAQ_EN}
        emitSchema={false}
      />

      {/* CTA */}
      <section className="py-16 bg-charcoal text-white">
        <div className="container px-6 text-center">
          <h2 className="font-display font-semibold text-2xl md:text-3xl mb-3">
            {isHe ? "רוצים לדבר על השוק?" : "Want to talk about the market?"}
          </h2>
          <p className="text-white/70 font-body mb-8 max-w-lg mx-auto">
            {isHe
              ? "אנחנו ברמה מקומית — מכירים את השכונות, יודעים אילו נכסים עומדים לצאת לשוק ואילו אפשר להשיג לפני שזה קורה."
              : "We're on the ground — we know the neighborhoods, which properties are about to list, and which can be acquired before that happens."}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={`https://wa.me/972522820632?text=${encodeURIComponent(isHe ? "היי, אני מעוניין לשמוע על שוק הנדלן בזכרון יעקב" : "Hi, I'd like to learn more about the Zichron Yaakov property market")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1fb558] text-white px-6 py-3 rounded-full font-body font-semibold text-sm transition-colors"
            >
              {isHe ? "שלחו לנו וואטסאפ" : "WhatsApp Us"}
            </a>
            <Link
              href={`/${lang}/properties`}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-full font-body font-semibold text-sm transition-colors"
            >
              {isHe ? "נכסים למכירה" : "Browse Properties"}
            </Link>
          </div>
          {/* Bottom disclaimer */}
          <p className="text-white/30 text-xs font-body mt-10 max-w-3xl mx-auto leading-relaxed">
            {isHe ? DISCLAIMER_HE : DISCLAIMER_EN}
          </p>
        </div>
      </section>
    </main>
  );
};

export default MarketGuide2026;
