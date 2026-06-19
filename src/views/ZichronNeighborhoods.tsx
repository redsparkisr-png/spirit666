"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import Header from "@/components/Header";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import FAQSection from "@/components/FAQSection";
import { MapPin, Home, TrendingUp, AlertCircle, Users, TreePine, Building2, Crown } from "lucide-react";

const DISCLAIMER_EN =
  "Price ranges shown are indicative estimates based on publicly reported transactions and listings observed in 2024–2025. Actual market values depend on specific property condition, size, floor, view, and timing. This content is for informational purposes only and does not constitute a valuation, appraisal, or investment advice. Always verify current prices with a licensed real estate agent and a qualified appraiser before making any purchase decision.";

const DISCLAIMER_HE =
  "טווחי המחירים המוצגים הם הערכות אינדיקטיביות המבוססות על עסקאות ומודעות שדווחו בשנים 2024–2025. הערך הממשי של נכס ספציפי תלוי במצבו, גודלו, הקומה, הנוף ועיתוי העסקה. תוכן זה מיועד למטרות מידע בלבד ואינו מהווה שמאות, הערכת שווי או ייעוץ השקעות. מומלץ לאמת מחירים עדכניים עם מתווך נדלן מורשה ושמאי מוסמך לפני כל החלטת רכישה.";

interface Neighborhood {
  slug: string;
  nameEn: string;
  nameHe: string;
  icon: React.ElementType;
  tagEn: string;
  tagHe: string;
  descEn: string;
  descHe: string;
  priceEn: string;
  priceHe: string;
  prosEn: string[];
  prosHe: string[];
  consEn: string[];
  consHe: string[];
  bestForEn: string;
  bestForHe: string;
}

const NEIGHBORHOODS: Neighborhood[] = [
  {
    slug: "neve-remez",
    nameEn: "Neve Remez",
    nameHe: "נווה רמז",
    icon: Crown,
    tagEn: "Most Exclusive · Sea Views",
    tagHe: "הכי מבוקשת · נוף לים",
    descEn:
      "Neve Remez is Zichron Yaakov's most coveted neighborhood — a forested enclave with a single access road, mature pine trees, and sweeping Mediterranean views. Large private plots, quiet streets, and a tight-knit community make it the top choice for families who value privacy and nature. Supply is extremely limited, which sustains premium pricing.",
    descHe:
      "נווה רמז היא השכונה המבוקשת ביותר בזכרון יעקב — מובלעת מיוערת עם כניסה אחת בלבד, עצי אורן בשלים ונוף רחב לים התיכון. מגרשים פרטיים גדולים, רחובות שקטים וקהילה מגובשת הופכים אותה לבחירה הראשונה של משפחות שמעריכות פרטיות וטבע. ההיצע שם מוגבל מאוד, מה שמקיים מחירי פרמיום.",
    priceEn: "₪4.5M–₪9M+ (villas) · ₪2.5M–₪3.8M (garden apartments)",
    priceHe: "4.5–9 מיליון+ (וילות) · 2.5–3.8 מיליון (דירות גן)",
    prosEn: ["Unobstructed sea views from many plots", "Single access road — minimal through traffic", "Lush pine forest setting", "Top resale demand in Zichron"],
    prosHe: ["נוף בלתי מוסתר לים ממגרשים רבים", "כניסה אחת — כמעט ללא תנועת מעבר", "סביבת יער אורנים שופעת", "ביקוש מוביל במכירה חוזרת"],
    consEn: ["Very limited supply — properties rarely come to market", "Premium pricing", "Car-dependent for daily errands"],
    consHe: ["היצע נמוך מאוד — נכסים נדירים בשוק", "מחירי פרמיום", "תלות ברכב לסידורים יומיומיים"],
    bestForEn: "Families and empty-nesters seeking privacy, nature, and long-term value.",
    bestForHe: "משפחות ורוכשים שמחפשים פרטיות, טבע וערך לטווח ארוך.",
  },
  {
    slug: "hamoshava",
    nameEn: "HaMoshava (Historic Center)",
    nameHe: "המושבה (מרכז היסטורי)",
    icon: Building2,
    tagEn: "Walkable · Historic Character",
    tagHe: "נגישות רגלית · אופי היסטורי",
    descEn:
      "HaMoshava is the beating heart of Zichron Yaakov — the original 1882 colony, centered on pedestrian Hameyasdim Street with its restored stone buildings, boutique galleries, restaurants, and the historic Carmel Winery. Properties here are characterful Ottoman-era homes, renovated stone houses, and apartments above historic shopfronts. Walking distance to everything makes this uniquely desirable.",
    descHe:
      "המושבה היא לב ליבה של זכרון יעקב — המושבה המקורית מ-1882, שמרכזה ברחוב המייסדים ההולכי רגל עם בתי האבן המשוחזרים, גלריות בוטיק, מסעדות ויקב כרמל ההיסטורי. הנכסים כאן הם בתים מסגנון עות'מאני, בתי אבן משוחזרים ודירות מעל חזיתות חנויות היסטוריות. הנגישות הרגלית לכל דבר הופכת אותה לייחודית ומבוקשת.",
    priceEn: "₪2.4M–₪3.5M (apartments) · ₪3.8M–₪7M (renovated stone houses)",
    priceHe: "2.4–3.5 מיליון (דירות) · 3.8–7 מיליון (בתי אבן משוחזרים)",
    prosEn: ["Truly walkable to cafes, shops, and restaurants", "Unique historic architecture — stone buildings", "Strong holiday/short-rental demand", "Cultural and social life at the doorstep"],
    prosHe: ["הליכה ממשית לבתי קפה, חנויות ומסעדות", "ארכיטקטורה היסטורית ייחודית — בתי אבן", "ביקוש גבוה להשכרות קצרות מועד", "חיי תרבות ופעילות חברתית מיידית"],
    consEn: ["Parking can be challenging", "Tourist foot traffic on weekends", "Limited private outdoor space for most units"],
    consHe: ["חניה עשויה להיות מאתגרת", "תנועת תיירים בסופי שבוע", "שטח פרטי מוגבל לרוב הדירות"],
    bestForEn: "Buyers who prioritize lifestyle, walkability, and historic charm over space.",
    bestForHe: "קונים שמעדיפים אורח חיים, נגישות רגלית ואופי היסטורי על פני שטח.",
  },
  {
    slug: "givat-eden",
    nameEn: "Givat Eden",
    nameHe: "גבעת עדן",
    icon: TreePine,
    tagEn: "Panoramic Views · Mixed Housing",
    tagHe: "נוף פנורמי · מגוון דיור",
    descEn:
      "Perched on Zichron's hillside, Givat Eden offers some of the most dramatic panoramic views in the region — looking west toward the Mediterranean and north toward the Carmel range. The neighborhood features a mix of garden apartments, semi-detached homes, and standalone villas on generous plots. It's popular with both Israeli families and international buyers seeking the combination of views and space.",
    descHe:
      "ממוקמת על מדרון זכרון, גבעת עדן מציעה כמה מהנופים הפנורמיים המרשימים באזור — מבט מערבה לכיוון הים התיכון וצפונה לכיוון הכרמל. השכונה כוללת שילוב של דירות גן, בתים דו-משפחתיים ווילות עצמאיות על מגרשים נדיבים. היא פופולרית בקרב משפחות ישראליות וקונים בינלאומיים שמחפשים שילוב של נוף ומרחב.",
    priceEn: "₪2.4M–₪3.5M (apartments/garden units) · ₪4.5M–₪9M (villas with sea view)",
    priceHe: "2.4–3.5 מיליון (דירות/דירות גן) · 4.5–9 מיליון (וילות עם נוף לים)",
    prosEn: ["Spectacular sea and Carmel views from elevated plots", "Mixed housing types — apartments to large villas", "Good access to the town center", "Green, spacious feel"],
    prosHe: ["נוף מרהיב לים ולכרמל ממגרשים מוגבהים", "מגוון סוגי דיור — דירות עד וילות גדולות", "גישה טובה למרכז העיר", "תחושת מרחב ירוק"],
    consEn: ["Steep terrain makes walking to town less convenient", "Views can vary significantly plot-to-plot"],
    consHe: ["שטח תלול הופך את ההליכה למרכז לפחות נוחה", "הנוף יכול להשתנות משמעותית בין מגרש למגרש"],
    bestForEn: "Buyers who prioritize views, outdoor space, and mixed housing options.",
    bestForHe: "קונים שמעדיפים נוף, שטח חיצוני ומגוון אפשרויות דיור.",
  },
  {
    slug: "ramat-zvi",
    nameEn: "Ramat Zvi",
    nameHe: "רמת צבי",
    icon: Home,
    tagEn: "Most Accessible · Value Play",
    tagHe: "הנגישה ביותר · ערך השקעה",
    descEn:
      "Ramat Zvi is Zichron Yaakov's most affordable neighborhood — a practical choice for first-time buyers or investors looking for value in a rapidly appreciating town. The area features older apartment buildings, many of which are eligible for TAMA 38 urban renewal, meaning renovation and structural reinforcement incentives that can significantly increase future value. Flat terrain makes it easy to navigate on foot.",
    descHe:
      "רמת צבי היא השכונה הנגישה ביותר מבחינת מחיר בזכרון יעקב — בחירה מעשית לרוכשי דירה ראשונה או משקיעים המחפשים ערך בעיר שמחיריה עולים. האזור כולל בניינים ישנים, רבים מהם זכאים לתמא 38 לחיזוק ושיפוץ, מה שיכול להגדיל את הערך העתידי משמעותית. הטופוגרפיה השטוחה הופכת את ההתניידות לנוחה.",
    priceEn: "₪1.8M–₪2.6M (apartments) · Prices vary by floor, condition, and TAMA status",
    priceHe: "1.8–2.6 מיליון (דירות) · מחירים משתנים לפי קומה, מצב ומעמד תמ\"א",
    prosEn: ["Most accessible price point in Zichron", "TAMA 38 potential — urban renewal upside", "Flat, easy navigation on foot", "Close to municipal services"],
    prosHe: ["נקודת מחיר הנגישה ביותר בזכרון", "פוטנציאל תמ\"א 38 — פוטנציאל שיפוץ עירוני", "שטח שטוח, נוח להתניידות רגלית", "קרוב לשירותים עירוניים"],
    consEn: ["Older building stock — may require renovation investment", "Less scenic compared to hillside areas", "Limited private outdoor space"],
    consHe: ["מלאי בניינים ישן — עשוי לדרוש השקעה בשיפוץ", "פחות ציורי לעומת אזורי המדרון", "שטח פרטי חיצוני מוגבל"],
    bestForEn: "First-time buyers, investors, and those seeking value with renewal upside.",
    bestForHe: "רוכשי דירה ראשונה, משקיעים, ומי שמחפש ערך עם פוטנציאל התחדשות.",
  },
  {
    slug: "halomot-zichron",
    nameEn: "Halomot Zichron",
    nameHe: "חלומות זכרון",
    icon: Users,
    tagEn: "Family-Friendly · Newer Construction",
    tagHe: "משפחתית · בנייה חדשה",
    descEn:
      "Halomot Zichron is Zichron's go-to neighborhood for young families. With newer apartment buildings, proximity to schools, and a suburban feel, it attracts buyers who want modern amenities without the premium of Neve Remez or Givat Eden. The neighborhood is more homogeneous than the historic center, with a community atmosphere that's particularly welcoming to families with children.",
    descHe:
      "חלומות זכרון היא השכונה המועדפת של משפחות צעירות בזכרון. עם בניינים חדשים יחסית, קרבה לבתי ספר ואופי פרברי, היא מושכת קונים שרוצים מתקנים מודרניים ללא הפרמיום של נווה רמז או גבעת עדן. השכונה הומוגנית יותר מהמרכז ההיסטורי, עם אווירה קהילתית שמיטיבה במיוחד עם משפחות עם ילדים.",
    priceEn: "₪2.0M–₪3.2M (3–4 bedroom apartments) · ₪3.2M–₪5M (garden units and duplexes)",
    priceHe: "2.0–3.2 מיליון (דירות 3–4 חדרים) · 3.2–5 מיליון (דירות גן ודופלקסים)",
    prosEn: ["Family-oriented community feel", "Newer construction — modern amenities", "Walking distance to local schools", "Lower maintenance than older buildings"],
    prosHe: ["אווירה קהילתית משפחתית", "בנייה חדשה יחסית — מתקנים מודרניים", "הליכה לבתי ספר מקומיים", "תחזוקה נמוכה יותר מבניינים ישנים"],
    consEn: ["Less architectural character than HaMoshava", "Some distance from the historic town center"],
    consHe: ["פחות אופי ארכיטקטוני מהמושבה", "מרחק מסוים ממרכז המושבה ההיסטורי"],
    bestForEn: "Young families and olim seeking newer construction in a community atmosphere.",
    bestForHe: "משפחות צעירות ועולים שמחפשים בנייה חדשה יחסית באווירה קהילתית.",
  },
  {
    slug: "neve-habaron",
    nameEn: "Neve HaBaron",
    nameHe: "נווה הברון",
    icon: Crown,
    tagEn: "Premium Semi-Detached · Planned",
    tagHe: "דו-משפחתי פרמיום · תכנוני",
    descEn:
      "Neve HaBaron is one of Zichron's planned upscale developments — a neighborhood of semi-detached and cottage-style homes built to a higher specification than the town average. Beautifully landscaped streets, architectural consistency, and private garden plots make it a favorite for buyers who want the feel of a standalone home without the full villa price. Its planned nature ensures minimal surprises in terms of density.",
    descHe:
      "נווה הברון הוא אחד מפיתוחי הפרמיום המתוכננים של זכרון — שכונה של בתים דו-משפחתיים וקוטג'ים שנבנו בסטנדרט גבוה מממוצע העיר. רחובות מטופחים, עקביות אדריכלית ומגרשי גן פרטיים הופכים אותה למועדפת של קונים שרוצים תחושת בית עצמאי ללא מחיר הוילה המלא.",
    priceEn: "₪3.5M–₪6.5M (semi-detached homes with private garden)",
    priceHe: "3.5–6.5 מיליון (בתים דו-משפחתיים עם גן פרטי)",
    prosEn: ["Private garden plots with each home", "Consistent architectural quality", "Lower density than apartment neighborhoods", "Community feeling without isolation"],
    prosHe: ["מגרש גן פרטי לכל בית", "איכות אדריכלית עקבית", "צפיפות נמוכה מרובעי דירות", "תחושת קהילה ללא בידוד"],
    consEn: ["More expensive than comparable-sized apartments", "Limited rental yield vs. investment potential"],
    consHe: ["יקר יותר מדירות בגודל דומה", "תשואת שכירות מוגבלת לעומת פוטנציאל השקעה"],
    bestForEn: "Buyers who want private outdoor space and semi-detached living at a mid-to-upper price point.",
    bestForHe: "קונים שרוצים שטח חיצוני פרטי ומגורים דו-משפחתיים במחיר בינוני-גבוה.",
  },
];

const PriceDisclaimer = ({ isHe }: { isHe: boolean }) => (
  <div className="flex items-start gap-3 bg-amber-500/8 border border-amber-500/25 rounded-xl px-4 py-3 mt-4">
    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
    <p className="text-xs text-muted-foreground font-body leading-relaxed">
      {isHe ? DISCLAIMER_HE : DISCLAIMER_EN}
    </p>
  </div>
);

const NeighborhoodCard = ({ n, isHe }: { n: Neighborhood; isHe: boolean }) => {
  const Icon = n.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      id={n.slug}
      className="bg-card border border-border rounded-2xl overflow-hidden"
    >
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Icon className="w-5 h-5 text-gold" />
              <h2 className="font-display font-semibold text-xl text-foreground">
                {isHe ? n.nameHe : n.nameEn}
              </h2>
            </div>
            <span className="text-xs font-body text-gold bg-gold/10 border border-gold/20 px-2.5 py-1 rounded-full">
              {isHe ? n.tagHe : n.tagEn}
            </span>
          </div>
        </div>

        <p className="text-muted-foreground font-body leading-relaxed mb-5 text-sm md:text-base">
          {isHe ? n.descHe : n.descEn}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          <div>
            <p className="text-xs font-body font-semibold text-foreground/60 uppercase tracking-wide mb-2">
              {isHe ? "יתרונות" : "Pros"}
            </p>
            <ul className="space-y-1">
              {(isHe ? n.prosHe : n.prosEn).map((p, i) => (
                <li key={i} className="flex items-start gap-2 text-sm font-body text-foreground/80">
                  <span className="text-emerald-500 shrink-0 mt-0.5">✓</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-body font-semibold text-foreground/60 uppercase tracking-wide mb-2">
              {isHe ? "חסרונות" : "Cons"}
            </p>
            <ul className="space-y-1">
              {(isHe ? n.consHe : n.consEn).map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-sm font-body text-muted-foreground">
                  <span className="text-muted-foreground shrink-0 mt-0.5">–</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-4 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <div>
            <p className="text-xs font-body text-muted-foreground mb-0.5">
              {isHe ? "טווח מחירים (אינדיקטיבי)" : "Price range (indicative)"}
            </p>
            <p className="font-display font-semibold text-foreground text-sm">
              {isHe ? n.priceHe : n.priceEn}
            </p>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-lg px-3 py-2">
            <p className="text-xs font-body text-muted-foreground mb-0.5">
              {isHe ? "מתאים ביותר ל:" : "Best for:"}
            </p>
            <p className="text-xs font-body text-foreground font-medium">
              {isHe ? n.bestForHe : n.bestForEn}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FAQ_EN = [
  {
    q: "What is the best neighborhood in Zichron Yaakov?",
    a: "It depends on your priorities. Neve Remez for privacy and sea views; HaMoshava for walkability and history; Givat Eden for panoramic views; Ramat Zvi for the best price; Halomot Zichron for families with young children. We strongly recommend visiting each neighborhood before deciding — the feel of a street matters as much as the stats.",
  },
  {
    q: "Which Zichron Yaakov neighborhood is best for English-speaking olim?",
    a: "All neighborhoods have English speakers, but HaMoshava and Neve Remez have the highest concentration. The historic center's social life (cafes, Friday markets, Hameyasdim events) is especially welcoming for new immigrants. Many Anglo families also choose Halomot Zichron for the school proximity and family atmosphere.",
  },
  {
    q: "Is it better to buy near HaMeyasdim Street or in the quieter hillside areas?",
    a: "HaMeyasdim is ideal for buyers who want lifestyle and walkability — restaurants, culture, and community at your doorstep. The hillside areas (Neve Remez, Givat Eden) offer peace, nature, and views, but require a car for daily errands. Many buyers we work with try both before deciding which tradeoff they prefer.",
  },
  {
    q: "How do I choose between Neve Remez and Givat Eden?",
    a: "Both offer excellent views, but Neve Remez has greater privacy (single access road, forested), while Givat Eden has more diverse housing types and slightly more accessible pricing. Neve Remez properties come to market far less frequently. If budget allows and patience is available, Neve Remez tends to have higher long-term demand.",
  },
];

const FAQ_HE = [
  {
    q: "מהי השכונה הטובה ביותר בזכרון יעקב?",
    a: "תלוי בסדר העדיפויות שלכם. נווה רמז — לפרטיות ונוף לים; המושבה — לנגישות רגלית והיסטוריה; גבעת עדן — לנוף פנורמי; רמת צבי — למחיר הטוב ביותר; חלומות זכרון — למשפחות עם ילדים קטנים. אנחנו ממליצים בחום לבקר בכל שכונה לפני ההחלטה — התחושה ברחוב חשובה לא פחות מהנתונים.",
  },
  {
    q: "איזו שכונה מתאימה לעולים דוברי אנגלית?",
    a: "בכל השכונות יש דוברי אנגלית, אבל ריכוז הגבוה ביותר נמצא במושבה ובנווה רמז. החיים החברתיים של המרכז ההיסטורי (בתי קפה, שוק שישי, אירועי המייסדים) מקבלים פנים במיוחד לעולים חדשים. משפחות אנגלופוניות רבות בוחרות גם בחלומות זכרון בזכות קרבת בתי הספר והאווירה המשפחתית.",
  },
  {
    q: "מה עדיף — לקנות ליד רחוב המייסדים או באזורי המדרון השקטים?",
    a: "המייסדים מתאים לקונים שרוצים אורח חיים ונגישות רגלית — מסעדות, תרבות וקהילה בדלת הבית. אזורי המדרון (נווה רמז, גבעת עדן) מציעים שקט, טבע ונוף, אבל דורשים רכב לסידורים יומיומיים. רוב הקונים שאנחנו עובדים איתם מנסים את שניהם לפני שהם מחליטים איזה פשרה הם מעדיפים.",
  },
  {
    q: "מה ההבדל בין נווה רמז לגבעת עדן?",
    a: "לשתיהן נוף מעולה, אבל נווה רמז מציעה פרטיות גדולה יותר (כניסה אחת, מיוערת), בעוד שגבעת עדן מציעה מגוון סוגי דיור ומחירים נגישים מעט יותר. נכסים בנווה רמז עולים לשוק בתדירות נמוכה הרבה יותר. אם התקציב מאפשר ויש סבלנות להמתין — הביקוש לטווח ארוך בנווה רמז גבוה יותר.",
  },
];

const ZichronNeighborhoods = () => {
  const { lang } = useLanguage();
  const isHe = lang === "he";

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-6">
          <BreadcrumbNav
            items={[
              {
                label: isHe ? "שכונות זכרון יעקב" : "Zichron Yaakov Neighborhoods",
              },
            ]}
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center mt-6"
          >
            <div className="inline-flex items-center gap-2 text-xs font-body font-semibold uppercase tracking-widest text-gold bg-gold/10 border border-gold/20 px-4 py-1.5 rounded-full mb-6">
              <MapPin className="w-3.5 h-3.5" />
              {isHe ? "מדריך שכונות" : "Neighborhood Guide"}
            </div>
            <h1 className="font-display font-semibold text-foreground mb-4 text-3xl md:text-4xl lg:text-5xl">
              {isHe ? "שכונות זכרון יעקב — המדריך המלא" : "Zichron Yaakov Neighborhoods — The Complete Guide"}
            </h1>
            <p className="text-muted-foreground font-body text-lg max-w-xl mx-auto leading-relaxed">
              {isHe
                ? "כל שכונה בזכרון יעקב שונה. כאן תמצאו אופי, מחירים, יתרונות וחסרונות לכל אחת מהן — כדי שתגיעו לפגישה כשאתם מוכנים."
                : "Every neighborhood in Zichron Yaakov is different. Here's what you need to know about character, prices, pros, and cons — so you arrive prepared."}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Jump Links */}
      <section className="bg-card border-y border-border py-4">
        <div className="container px-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {NEIGHBORHOODS.map((n) => (
              <a
                key={n.slug}
                href={`#${n.slug}`}
                className="text-sm font-body text-muted-foreground hover:text-foreground border border-border hover:border-gold/50 rounded-full px-4 py-1.5 transition-colors"
              >
                {isHe ? n.nameHe : n.nameEn}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="py-12 md:py-16">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {NEIGHBORHOODS.map((n) => (
              <NeighborhoodCard key={n.slug} n={n} isHe={isHe} />
            ))}
          </div>

          {/* Global price disclaimer */}
          <div className="max-w-4xl mx-auto mt-8">
            <PriceDisclaimer isHe={isHe} />
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display font-semibold text-2xl text-foreground mb-6 text-center">
              {isHe ? "השוואה מהירה" : "Quick Comparison"}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-body">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-start py-3 pe-4 text-muted-foreground font-semibold">
                      {isHe ? "שכונה" : "Neighborhood"}
                    </th>
                    <th className="text-start py-3 pe-4 text-muted-foreground font-semibold">
                      {isHe ? "מחיר יחסי" : "Price Level"}
                    </th>
                    <th className="text-start py-3 pe-4 text-muted-foreground font-semibold">
                      {isHe ? "נוף לים" : "Sea View"}
                    </th>
                    <th className="text-start py-3 pe-4 text-muted-foreground font-semibold">
                      {isHe ? "הליכה למרכז" : "Walkable"}
                    </th>
                    <th className="text-start py-3 text-muted-foreground font-semibold">
                      {isHe ? "מתאים ל" : "Best for"}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {[
                    {
                      name: isHe ? "נווה רמז" : "Neve Remez",
                      price: "₪₪₪₪₪",
                      view: "✓✓",
                      walk: "–",
                      for: isHe ? "פרטיות ומשפחות" : "Privacy & families",
                    },
                    {
                      name: isHe ? "המושבה" : "HaMoshava",
                      price: "₪₪₪₪",
                      view: "–",
                      walk: "✓✓",
                      for: isHe ? "אורח חיים" : "Lifestyle buyers",
                    },
                    {
                      name: isHe ? "גבעת עדן" : "Givat Eden",
                      price: "₪₪₪₪",
                      view: "✓✓",
                      walk: "✓",
                      for: isHe ? "נוף ומרחב" : "Views & space",
                    },
                    {
                      name: isHe ? "נווה הברון" : "Neve HaBaron",
                      price: "₪₪₪₪",
                      view: "–",
                      walk: "✓",
                      for: isHe ? "בית עם גן" : "Home with garden",
                    },
                    {
                      name: isHe ? "חלומות זכרון" : "Halomot Zichron",
                      price: "₪₪₪",
                      view: "–",
                      walk: "✓",
                      for: isHe ? "משפחות צעירות" : "Young families",
                    },
                    {
                      name: isHe ? "רמת צבי" : "Ramat Zvi",
                      price: "₪₪",
                      view: "–",
                      walk: "✓✓",
                      for: isHe ? "נגישות מחיר" : "First-timers & investors",
                    },
                  ].map((row) => (
                    <tr key={row.name}>
                      <td className="py-3 pe-4 font-medium text-foreground">{row.name}</td>
                      <td className="py-3 pe-4 text-gold">{row.price}</td>
                      <td className="py-3 pe-4 text-muted-foreground">{row.view}</td>
                      <td className="py-3 pe-4 text-muted-foreground">{row.walk}</td>
                      <td className="py-3 text-muted-foreground">{row.for}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground font-body mt-4 text-center">
              {isHe
                ? "✓✓ = מצוין · ✓ = טוב · – = מוגבל | ₪ = הנגיש ביותר · ₪₪₪₪₪ = הגבוה ביותר"
                : "✓✓ = Excellent · ✓ = Good · – = Limited | ₪ = Most accessible · ₪₪₪₪₪ = Highest"}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection
        title={isHe ? "שאלות נפוצות על שכונות זכרון יעקב" : "Frequently Asked Questions"}
        items={isHe ? FAQ_HE : FAQ_EN}
        emitSchema={false}
      />

      {/* CTA */}
      <section className="py-16 bg-charcoal text-white">
        <div className="container px-6 text-center">
          <h2 className="font-display font-semibold text-2xl md:text-3xl mb-3">
            {isHe ? "רוצים לבקר בשכונות ביחד?" : "Want to tour the neighborhoods together?"}
          </h2>
          <p className="text-white/70 font-body mb-8 max-w-lg mx-auto">
            {isHe
              ? "אנחנו מציעים סיורי היכרות בשכונות זכרון יעקב, מותאמים אישית לסדר העדיפויות שלכם."
              : "We offer personalized neighborhood tours in Zichron Yaakov, tailored to your priorities and budget."}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={`https://wa.me/972522820632?text=${encodeURIComponent(isHe ? "היי, אני מעוניין בסיור שכונות בזכרון יעקב" : "Hi, I'd like to arrange a neighborhood tour in Zichron Yaakov")}`}
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
          <p className="text-white/40 text-xs font-body mt-8 max-w-2xl mx-auto">
            {isHe ? DISCLAIMER_HE : DISCLAIMER_EN}
          </p>
        </div>
      </section>
    </main>
  );
};

export default ZichronNeighborhoods;
