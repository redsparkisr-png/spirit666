"use client";

import { MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import spiritLogo from "@/assets/spirit-logo.jpg";
import hagitImg from "@/assets/hagit-cohen-morgan.png";
import aviImg from "@/assets/avi-suliman.png";
import eliranImg from "@/assets/eliran-amsalem.jpg";
import heroBg from "@/assets/hero-bg.jpg";
import lifestyle1 from "@/assets/guide-img-8.jpg";
import lifestyle2 from "@/assets/guide-img-1.jpg";
import lifestyle3 from "@/assets/guide-img-5.jpg";
import lifestyle4 from "@/assets/guide-img-6.jpg";
import lifestyle5 from "@/assets/guide-img-7.jpg";
import lifestyle6 from "@/assets/guide-img-3.jpg";
import property1 from "@/assets/guide-img-13.jpg";
import property2 from "@/assets/guide-img-2.jpg";
import property3 from "@/assets/guide-img-4.jpg";
import sold1 from "@/assets/guide-img-10.jpg";
import sold4 from "@/assets/guide-img-19.jpg";

/* ─── tiny helpers (mirrors BuyerGuide2026.tsx) ─── */
const Divider = () => (
  <div className="w-full flex items-center gap-4 my-16 md:my-20">
    <span className="flex-1 h-px bg-border" />
    <span className="w-2 h-2 rotate-45 border border-gold bg-transparent" />
    <span className="flex-1 h-px bg-border" />
  </div>
);

const SectionBadge = ({ n, label }: { n: string; label: string }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display text-sm font-semibold">
      {n}
    </span>
    <span className="text-xs tracking-[0.25em] uppercase font-body text-muted-foreground">{label}</span>
  </div>
);

const GuideImage = ({ src, caption, aspect = "16/9" }: { src: any; caption: string; aspect?: string }) => (
  <figure className="my-8">
    <div className="w-full rounded-lg overflow-hidden border border-border" style={{ aspectRatio: aspect }}>
      <img src={(src as any)?.src ?? (src as string)} alt={caption} className="w-full h-full object-cover" loading="lazy" />
    </div>
    <figcaption className="text-xs text-muted-foreground/70 font-body italic mt-2 text-center">{caption}</figcaption>
  </figure>
);

const StatCard = ({ value, label, light = false }: { value: string; label: string; light?: boolean }) => (
  <div className="text-center p-4">
    <p className={`font-display text-2xl md:text-3xl font-semibold ${light ? "text-primary-foreground" : "text-foreground"}`} dir="ltr">{value}</p>
    <p className={`text-xs font-body mt-1 leading-snug ${light ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{label}</p>
  </div>
);

const ProConList = ({ pros, cons }: { pros: string[]; cons: string[] }) => (
  <div className="grid md:grid-cols-2 gap-4 my-6">
    <div className="space-y-2">
      {pros.map((p, i) => (
        <p key={i} className="font-body text-sm flex gap-2"><span className="text-primary font-semibold shrink-0">✓</span>{p}</p>
      ))}
    </div>
    <div className="space-y-2">
      {cons.map((c, i) => (
        <p key={i} className="font-body text-sm flex gap-2"><span className="text-destructive font-semibold shrink-0">✗</span>{c}</p>
      ))}
    </div>
  </div>
);

const QuoteBlock = ({ quote, source }: { quote: string; source: string }) => (
  <blockquote className="border-r-4 border-gold pr-6 py-4 my-10">
    <p className="font-display italic text-lg md:text-xl text-foreground leading-relaxed">&ldquo;{quote}&rdquo;</p>
    <cite className="block mt-3 text-xs font-body text-muted-foreground not-italic">— {source}</cite>
  </blockquote>
);

const Num = ({ children }: { children: string }) => <span dir="ltr">{children}</span>;

/* ─── neighborhood card data ─── */
const NEIGHBORHOODS = [
  {
    name: "המרכז ההיסטורי (המושבה)", trend: "+15%", type: "בתי אבן היסטוריים, וילות, דירות נמוכות",
    ppm: "₪32,000–₪45,000", total: "₪5.3M–₪14M",
    desc: "הלב הבלתי ניתן להחלפה של זכרון. בתי אבן מהמאה ה-19, חצרות אותנטיות, והליכה מלאה למדרחוב. חוקי שימור הופכים את השחזור לבלתי אפשרי הלכה למעשה. נכסים נמכרים בממוצע תוך 65 יום — ירידה מ-90 יום לפני שנתיים.",
    pros: ["עלייה הונית מקסימלית ופרמיית מחסור חזקה ביותר", "הליכה מלאה לכל השירותים, בתי קפה, גלריות ומסעדות", "אדריכלות מורשת עם ערך השקעתי אמיתי", "ביצועי השכרה לטווח קצר (Airbnb) הטובים ביותר"],
    cons: ["מגבלות שימור מחמירות על שיפוצים", "חנייה מוגבלת", "מחיר הכניסה הגבוה ביותר בזכרון"],
    ideal: "פנסיונרים, \"קן ריק\", משקיעי Airbnb, חובבי נכסי מורשת", img: property3,
  },
  {
    name: "נווה הברון", trend: "+12%", type: "וילות על מגרשים גדולים, גובלת ברמת הנדיב",
    ppm: "₪28,000–₪38,000", total: "₪5M–₪11M",
    desc: "שכונה ותיקה, שקטה ויוקרתית שגבולה המערבי גובל ישירות בשמורת הטבע רמת הנדיב. מגרשים גדולים, פרטיות יוצאת דופן וסביבה ירוקה הופכים אותה למועדפת על רוכשים מחו״ל. רוב העסקאות מתבצעות מחוץ לשוק הפתוח.",
    pros: ["תחושת אחוזה פרטית עם גישה ישירה לשמורת הטבע", "מגרשים גדולים זמינים — נדיר בישראל", "עסקאות מחוץ לשוק; נדרש קשר מקומי חזק"],
    cons: ["תלות ברכב לצרכים יומיומיים", "מרחק מהמדרחוב", "היצע מוגבל — נדרשת סבלנות"],
    ideal: "רוכשים מחו״ל, מחפשי פרטיות, חובבי טבע",
  },
  {
    name: "השמורה", trend: "+11%", type: "וילות ובתים דו-משפחתיים, מיקום על קו הצוק",
    ppm: "₪26,000–₪35,000", total: "₪4.5M–₪9M",
    desc: "יושבת על המצוק הטבעי המשקיף על מישור החוף, השמורה מציעה חלק מנופי הים המרהיבים ביותר בזכרון. תשתיות תת-קרקעיות, רחובות מטופחים, מרכז מסחרי שכונתי עם בית קפה וחדר כושר, וקהילה אמידה ופעילה חברתית.",
    pros: ["נוף ים-תיכוני יוצא דופן של 180°", "תשתית תת-קרקעית — ללא חוטי חשמל עיליים", "קהילה פעילה עם מתקנים מסחריים במקום"],
    cons: ["נדרש רכב לרוב הסידורים", "פרמיית הנוף משמעה מחיר כניסה גבוה יותר"],
    ideal: "מחפשי נוף, אנשי מקצוע, משפחות פעילות חברתית",
  },
  {
    name: "גבעת עדן", trend: "+10%", type: "וילות יוקרה על מגרשים גדולים, הרכס הצפוני ביותר",
    ppm: "₪24,000–₪34,000", total: "₪6.5M–₪9.6M",
    desc: "מובלעת עילית בקצה הצפוני של זכרון המציעה פנורמות מרהיבות של מפרץ חיפה ורכס הכרמל. רחובות רחבים, פארקים גדולים ואווירה פרברית מושכים אקדמאים ואנשי מקצוע. בית הספר החורש נמצא בכניסה.",
    pros: ["נוף מדהים של 270° למפרץ חיפה ולכרמל", "מגרשים גדולים וחצרות פרטיות — נדיר בישראל", "בית הספר החורש ממש בפתח"],
    cons: ["מבודד — רכב הכרחי לכל דבר", "מקטע הווילות היקר ביותר בזכרון"],
    ideal: "משפחות עם ילדים בגיל בית ספר, מחפשי נוף, רוכשי וילות",
  },
  {
    name: "חלומות זכרון", trend: "+9%", type: "דירות מודרניות, דופלקסים, יחידות גן",
    ppm: "₪18,000–₪26,000", total: "₪2.8M–₪5.5M",
    desc: "השכונה המודרנית הגדולה ביותר בזכרון — כ-800 יחידות שנבנו בסגנון כפרי ומדורג במורדות המזרחיים. פארק מרכזי של 25 דונם, סקייטפארק מתקדם, מרפאת מכבי, וגישה מהירה לתחנת הרכבת בנימינה הופכים אותה לנקודת הכניסה הנגישה ביותר לרוכשים בפעם הראשונה.",
    pros: ["נקודת המחיר הנגישה ביותר בזכרון", "בנייה מודרנית ללא מגבלות מורשת", "פארק של 25 דונם וסקייטפארק באתר"],
    cons: ["רחוקה יותר מהמרכז ההיסטורי והמדרחוב", "פחות אופי בוטיק"],
    ideal: "משפחות צעירות, רוכשים בפעם הראשונה, עולים מודעי תקציב",
  },
  {
    name: "זמארין (הרובע ההיסטורי)", trend: "+11%", type: "בתי אבן מקוריים, נכסי אופי על הגבעה",
    ppm: "₪22,000–₪32,000", total: "₪3.5M–₪7M",
    desc: "השם הארמי העתיק של זכרון — שפירושו \"מגדלי כרמים\" — ממשיך לחיות ברובע הבוהמייני הזה שעל הגבעה, מעל יקב כרמל המקורי. אדריכלות אבן מקורית, סמטאות מתפתלות וקהילה אמנותית יוצרים אופי שלא ניתן לשחזור.",
    pros: ["אופי בוהמייני-אמנותי ייחודי", "אדריכלות מורשת מהמאה ה-19", "פוטנציאל הכנסה חזק מהשכרה לטווח קצר"],
    cons: ["נכסים בדרך כלל דורשים השקעת שיפוץ", "מגבלות שימור על שינויים"],
    ideal: "יוצרים, משקיעי Airbnb, חובבי נכסי מורשת",
  },
  {
    name: "נווה רמז ונווה שרת", trend: "+8%", type: "בתים צמודים ותיקים, הזדמנות התחדשות עירונית",
    ppm: "₪14,000–₪20,000", total: "₪1.8M–₪3.5M",
    desc: "שכונות דרומיות העוברות התחדשות עירונית אמיתית, מונעת קרבה לפרויקט \"פארק היין\" המתוכנן. הכניסה הזולה ביותר לשוק זכרון, עם פוטנציאל עלייה משמעותי ככל שהתשתית משתפרת.",
    pros: ["מחיר הכניסה הנמוך ביותר בזכרון", "פוטנציאל עלייה מפרויקט פארק היין (2026–2028)", "שכונה מבוססת עם שורשים קהילתיים"],
    cons: ["מלאי דיור ותיק יותר הדורש תקציב שיפוץ", "כתובת פחות יוקרתית"],
    ideal: "משקיעי ערך, רוכשים בפעם הראשונה עם חשק לשיפוץ",
  },
  {
    name: "וילות בחורש", trend: "+10%", type: "וילות בצפיפות נמוכה על מגרשים גדולים, סביבה מיוערת",
    ppm: "₪22,000–₪30,000", total: "₪4M–₪8M",
    desc: "שכונה צפונית פסטורלית הגובלת בבית הספר החורש ובשטח ירוק פתוח. בנייה בצפיפות נמוכה על מגרשים נדיבים, אופי מגורים שקט, וקרבה לטבע הופכים אותה לאידיאלית עבור משפחות עם ילדים צעירים.",
    pros: ["מגרשים גדולים בסביבה מיוערת", "סביבה שקטה, בטוחה וידידותית לילדים", "בית הספר החורש בסמוך"],
    cons: ["נדרש רכב", "פחות הליכתי מהמרכז ההיסטורי"],
    ideal: "משפחות עם ילדים צעירים, מחפשי מרחב ושקט",
  },
];

const MARKET_TABLE = [
  ["המרכז ההיסטורי", "וילות ודירות", "₪32,000–₪45,000", "חזקה"],
  ["נווה הברון", "וילות אחוזה", "₪28,000–₪38,000", "חזקה"],
  ["השמורה", "וילות, דו-משפחתי", "₪26,000–₪35,000", "יציבה"],
  ["גבעת עדן", "וילות יוקרה", "₪24,000–₪34,000", "יציבה"],
  ["זמארין", "בתי אבן מורשת", "₪22,000–₪32,000", "יציבה"],
  ["וילות בחורש", "וילות בצפיפות נמוכה", "₪22,000–₪30,000", "יציבה"],
  ["חלומות זכרון", "דירות ודופלקסים", "₪18,000–₪26,000", "מתונה"],
  ["נווה רמז / נווה שרת", "בתים צמודים ותיקים", "₪14,000–₪20,000", "מתפתחת"],
];

const TRANSACTIONS = [
  ["5 חדרים, 180 מ״ר, שיפוץ מלא", "רחוב מעלה הכרמל", "₪6,000,000"],
  ["5 חדרים, 177 מ״ר, דירת גן, נוף ים", "אזור המייסדים", "₪5,320,000"],
  ["6 חדרים, 131 מ״ר, קוטג' דו-משפחתי", "שדרות ניל\"י", "₪3,290,000"],
  ["5 חדרים, 150 מ״ר, בנייה חדשה", "וילות בחורש", "₪5,200,000"],
  ["וילה, 235 מ״ר על מגרש 600 מ״ר, בריכה, נוף ים", "גבעת עדן", "₪7,900,000"],
  ["וילה, 250 מ״ר על מגרש 500 מ״ר, בריכה", "מרכז המושבה", "₪7,800,000"],
  ["3 חדרים, 70 מ״ר, שיפוץ יסודי", "המרכז ההיסטורי", "₪2,100,000"],
];

const COMPARE_CITIES = [
  ["תל אביב (מרכז)", "₪62,000–₪80,000", "עירוני, צפוף", "בינוני"],
  ["ירושלים", "₪38,000–₪55,000", "היסטורי, מגוון", "חזק"],
  ["רעננה", "₪28,000–₪40,000", "פרברי, מוקד אנגלופוני", "חזק מאוד"],
  ["זכרון יעקב", "₪27,400 ממוצע", "בוטיק, ים-תיכוני", "20%–15 מהאוכלוסייה"],
  ["חיפה (הכרמל)", "₪22,000–₪32,000", "עירוני, מגוון", "בינוני"],
  ["נתניה", "₪20,000–₪28,000", "חופי, קהילה פרנקופונית", "חזק"],
];

const MISTAKES = [
  ["01", "חתימה על זיכרון דברים ללא עורך דין", "בישראל, \"זיכרון דברים\" הוא חוזה מחייב מבחינה משפטית. לעולם אל תחתמו על אחד לפני שעורך דין מקרקעין בדק אותו. פיקדונות עלולים לרדת לטמיון."],
  ["02", "דילוג על בדיקת השימור", "לפני רכישת כל נכס ליד המרכז ההיסטורי, קבלו את דירוג השימור הספציפי והבינו בדיוק אילו שיפוצים מותרים."],
  ["03", "התעלמות מנכסים שלא פורסמו", "חלק משמעותי מהנכסים הטובים ביותר בזכרון אף פעם לא מופיע בפורטלים ציבוריים. בלי סוכן מקומי מהימן, אתם רואים רק חלק ממה שקיים."],
  ["04", "אי בדיקת תוכנית האב העתידית", "נכס הצמוד למגרש לא מפותח עשוי להיראות אטרקטיבי היום. אותו מגרש עשוי להפוך לאזור מסחרי לפי תוכנית 2040. תמיד בדקו את התב\"ע של המגרשים הסובבים."],
  ["05", "העברת כספים אחרי החתימה", "סדרו העברות בינלאומיות לפני החתימה. לחוזי רכישה ישראליים יש לוחות זמנים קפדניים לתשלום — פספוס שלהם מפעיל קנסות משמעותיים."],
  ["06", "דילוג על תכנון מס", "ההבדל בין רכישה מתוכננת לרכישה לא מתוכננת כעולה יכול להיות ₪300,000–₪500,000 במיסים. רואה חשבון ישראלי מוסמך הוא חיוני."],
];

const STEPS = [
  ["1", "גיוס סוכן קונים מקומי", "(2–4 שבועות לפני החיפוש)", "מומחה זכרון עם גישה לנכסים שלא פורסמו הוא ההחלטה החשובה ביותר שלכם."],
  ["2", "מינוי עורך דין מקרקעין דובר אנגלית", "", "מבצע חיפושי בעלות, בודק תיק שימור, מוודא היתרים, מנסח חוזה. אל תשתפו עורך דין עם המוכר."],
  ["3", "אישור עקרוני למשכנתא", "", "בנקים ישראליים מציעים לעולים עד 75% מימון. אישור עקרוני קובע את התקציב שלכם ומחזק את עמדת המשא ומתן."],
  ["4", "הגשת הצעה ובדיקת נאותות", "", "הסוכן מנהל משא ומתן על המחיר. עורך הדין בו-זמנית בודק את הטאבו, מוודא מעמד משפטי, היתרי בנייה ודירוג שימור."],
  ["5", "חתימת חוזה רכישה ותשלום מקדמה", "", "החוזה מפרט מחיר, לוח תשלומים, תאריך השלמה. מקדמה ראשונית (בדרך כלל 10%) תוך 7 ימים. העבירו כספים לפני החתימה."],
  ["6", "רישום הערת אזהרה", "", "עורך הדין שלכם רושם מיד בטאבו, מונע מהמוכר למכור מחדש או למשכן את הנכס."],
  ["7", "הגשת טפסי מס ותשלום מס רכישה", "", "טופס 1345 תוך 40 יום. מס רכישה תוך 60 יום. שיעורי העולה המופחתים שלכם מוחלים בשלב הזה."],
  ["8", "תשלום סופי ורישום בטאבו", "", "עם התשלום הסופי, המפתחות מועברות והנכס נרשם על שמכם. מזל טוב."],
];

const TOC_HE = [
  "למה זכרון יעקב — הסיפור ההשקעתי",
  "חוויית העולים דוברי האנגלית",
  "אורח החיים: מדרחוב, יין ותרבות",
  "רמת הנדיב והטבע",
  "חינוך — בתי ספר ונוער",
  "סקירת שכונות עם נתוני מחירים",
  "נתוני שוק: מחירים, מגמות ועסקאות",
  "זווית ההשקעה ואיירבינב",
  "הטבות מס לעולים ותהליך הרכישה 2026",
  "שימור, תכנון וצמיחה עתידית",
  "טעויות קריטיות שכדאי להימנע מהן",
  "מפת הדרכים שלכם לרכישה",
  "למה ספיריט נדל״ן",
];

const BuyerGuide2026HeContent = () => {
  return (
    <div dir="rtl" className="min-h-screen bg-background">
      <Header />
      {/* Private Guide Header */}
      <div className="bg-primary py-6">
        <div className="container px-6 text-center">
          <p className="text-xs tracking-[0.25em] uppercase font-body text-gold mb-2">מדריך רוכשים פרטי</p>
          <p className="font-body text-primary-foreground/70 text-sm max-w-lg mx-auto">
            מדריך זה משותף באופן פרטי עם קונים הבוחנים רכישת נכס בזכרון יעקב.
          </p>
        </div>
      </div>

      {/* COVER */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={(heroBg as any).src ?? (heroBg as unknown as string)} alt="" className="w-full h-full object-cover" loading="eager" fetchPriority="high" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-charcoal/95" />
        </div>
        <div className="relative z-10 container px-6 py-24 md:py-36 flex flex-col items-center text-center">
          <p className="text-xs tracking-[0.35em] uppercase font-body text-gold mb-6">
            ספיריט נדל״ן · בוטיק נדל״ן · זכרון יעקב
          </p>
          <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl leading-[1.2] text-primary-foreground mb-4">
            מדריך הרוכש<br />
            <span className="text-gold">לזכרון יעקב</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-primary-foreground/80 max-w-xl mt-4 mb-12">
            המדריך המקיף לרוכשים דוברי אנגלית ועברית<br />
            הבוחנים רכישת נכס במושבה המבוקשת בישראל
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 border border-primary-foreground/20 rounded-xl p-6 md:p-8 bg-primary-foreground/5 backdrop-blur-sm max-w-3xl w-full">
            <StatCard value="₪27,400" label="ממוצע ₪/מ״ר — רבעון 1 2025" light />
            <StatCard value="+13.5%" label="עלייה שנתית" light />
            <StatCard value="22%" label="רוכשים מחו״ל" light />
            <StatCard value="15–20%" label="דוברי אנגלית" light />
          </div>
          <div className="mt-12 flex flex-col items-center gap-3">
            <span className="text-xs tracking-[0.3em] uppercase font-body text-gold/80">מהדורת 2026</span>
            <p className="text-xs font-body text-primary-foreground/50">בוטיק נדל״ן · ליווי אישי · גישה לנכסים שלא פורסמו</p>
          </div>
        </div>
      </section>

      <div className="container px-6 max-w-3xl mx-auto py-16 md:py-24">
        {/* TOC */}
        <section>
          <p className="text-xs tracking-[0.3em] uppercase font-body text-muted-foreground mb-3">תוכן העניינים</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-10">בתוך המדריך</h2>
          <ol className="space-y-3 font-body text-foreground">
            {TOC_HE.map((t, i) => (
              <li key={i} className="flex items-baseline gap-4 group">
                <span className="font-display font-semibold text-gold w-8 text-right shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 border-b border-dotted border-border group-hover:border-gold transition-colors pb-1">{t}</span>
              </li>
            ))}
          </ol>
        </section>

        <Divider />

        {/* 01 */}
        <section>
          <SectionBadge n="01" label="הסיפור ההשקעתי" />
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">למה זכרון יעקב</h2>
          <p className="font-display italic text-lg text-muted-foreground mb-8">הסיפור ההשקעתי של המושבה המבוקשת בישראל</p>
          <GuideImage src={lifestyle1} caption="שלט הקבלת הפנים האייקוני בכניסה לזכרון יעקב" />
          <div className="font-body text-foreground space-y-5 leading-relaxed">
            <p>כשחושבים על רכישת נכס בישראל, תל אביב וירושלים תופסות את רוב תשומת הלב. אבל למי שחולם על חיים שקטים יותר — שבהם נוף ים-תיכוני מחליף גורדי שחקים, כרמים משתרעים על הגבעות וההיסטוריה נושמת מכל אבן מרוצפת — יש אופציה נוספת. והיא הופכת במהירות ליעד המועדף על רוכשים איכותיים מצפון אמריקה, קנדה ובריטניה.</p>
            <p>זכרון יעקב יושבת על הרכס הדרומי של הכרמל, 35 ק״מ דרומית לחיפה ו-70 ק״מ צפונית לתל אביב. נוסדה ב-1882 בידי חלוצים יהודים מרומניה, ועוצבה מחדש בידי הברון אדמונד דה רוטשילד — שהביא גדלני יין צרפתים ונטע את הכרמים הרציניים הראשונים בישראל.</p>
            <p>היום, המחסור הזה הוא הנכס הגדול ביותר שלה. חוקי שימור מחמירים מגבילים בנייה חדשה. ההיצע מוגבל באופן כרוני. והביקוש — מישראלים אמידים, עולים חוזרים ועולים דוברי אנגלית — מעולם לא היה חזק יותר.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-card rounded-xl border border-border p-6 my-10">
            <StatCard value="₪27,400" label="מחיר ממוצע למ״ר — רבעון 1 2025" />
            <StatCard value="+13.5%" label="עלייה שנתית במחירים" />
            <StatCard value="192" label="עסקאות ברבעון הראשון של 2025 בלבד" />
            <StatCard value="22%" label="רוכשים מחו״ל — אמריקאים מובילים" />
          </div>
          <h3 className="font-display text-xl font-semibold text-foreground mt-10 mb-5">חמש סיבות שהשוק הזה מצטיין</h3>
          <ul className="space-y-4 font-body text-foreground">
            {[
              ["היצע מוגבל.", "חוקי שימור מונעים בנייה ספקולטיבית. כל נכס שנמכר הוא באמת בלתי ניתן להחלפה."],
              ["קהילה אנגלופונית גדלה.", "בין 15–20% מהתושבים דוברי אנגלית כשפת אם — אחד היחסים הגבוהים בישראל."],
              ["תיירות וכלכלת יין.", "דרך היין, רמת הנדיב ואירוח בוטיק יוצרים ביקוש להשכרה לאורך כל השנה."],
              ["רוח גבית של עבודה מרחוק.", "אנשי מקצוע כבר לא זקוקים לתל אביב. זכרון, 45 דקות ברכבת, קולטת את השינוי הדמוגרפי הזה."],
              ["השקעה בתשתיות.", "תחנת רכבת משודרגת, גישה לכביש 6 ואזורי תעסוקה מתוכננים מניעים עלייה ארוכת טווח."],
            ].map(([bold, rest], i) => (
              <li key={i} className="flex gap-3">
                <span className="text-gold mt-1 shrink-0">◂</span>
                <span><strong>{bold}</strong> {rest}</span>
              </li>
            ))}
          </ul>
          <QuoteBlock quote="זכרון מציעה אפשרות לחיים בסגנון בית פרטי — משהו כמעט בלתי מושג בתל אביב אלא אם כן מוכנים לשלם פי כמה על המחיר." source="Ynet News, אוקטובר 2025" />
        </section>

        <Divider />

        {/* 02 */}
        <section>
          <SectionBadge n="02" label="הנחיתה הרכה שלכם" />
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">חוויית העולים דוברי האנגלית</h2>
          <p className="font-display italic text-lg text-muted-foreground mb-8">הנחיתה הרכה שלכם על הכרמל</p>
          <div className="grid md:grid-cols-2 gap-4 my-8">
            <GuideImage src={lifestyle2} caption="שלט הכוונה לרמת הנדיב ולטיילת" aspect="4/3" />
            <GuideImage src={lifestyle3} caption="שער שער ישי ההיסטורי — הכניסה למושבה" aspect="4/3" />
          </div>
          <div className="font-body text-foreground space-y-5 leading-relaxed">
            <p>למשפחות דוברות אנגלית שעולות לישראל, השאלה הראשונה לרוב לא נוגעת למחירי נכסים. היא נוגעת לשייכות. האם הילדים שלי ימצאו חברים? האם אמצא בית כנסת? האם אוכל לנווט את החיים היומיומיים לפני שהעברית שלי שוטפת? בזכרון יעקב, התשובה לשלוש השאלות היא כן נחרץ.</p>
            <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">&quot;חמש הערים הישראליות&quot;</h3>
            <p>עולים אמריקאים העניקו למסדרון זכרון–קיסריה–בנימינה–חדרה–פרדס חנה כינוי חיבה: &quot;חמש הערים&quot; (Five Towns). על שם השכונה האורתודוקסית המפורסמת בלונג איילנד, וההשוואה הולמת.</p>
            <p>זכרון עצמה מארחת את סניף ESRA Five Towns, חב&quot;ד פעיל, אירועי קהילה של נפש בנפש, ורשימת דוא&quot;ל של &quot;חמש הערים&quot; המחברת אלפי אנגלופונים באזור.</p>
            <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">התשתית האנגלופונית</h3>
            <ul className="space-y-2">
              {[
                "ESRA Five Towns: אירועים חברתיים באנגלית, חנות ספרים יד שנייה, תמיכה קהילתית",
                "נפש בנפש: \"אלפי עולי NBN\" רשומים באזור זכרון",
                "רכז קליטה עירוני: משרד קליטה ייעודי לעולים חדשים",
                "שירותי בריאות באנגלית: מכבי, כללית ומאוחדת — כולן מיוצגות מקומית",
                "בית החולים הלל יפה בחדרה — 15 דקות עם צוות דובר אנגלית",
                "רשתות קהילתיות: קבוצת פייסבוק \"Secret Five T's\", רשתות וואטסאפ, NBN Go North",
                "פלורליזם דתי: חילוני, דתי לאומי, חב\"ד, רפורמי, קונסרבטיבי — הכל קיים",
              ].map((item, i) => (
                <li key={i} className="flex gap-3"><span className="text-gold shrink-0">◂</span><span>{item}</span></li>
              ))}
            </ul>
          </div>
          <QuoteBlock quote="עולים מרגישים תחושת שייכות בקהילה כמעט מיד עם ההגעה." source="מדריך הקהילה של נפש בנפש, 2025" />
        </section>

        <Divider />

        {/* 03 */}
        <section>
          <SectionBadge n="03" label="מדרחוב, יין ותרבות" />
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">אורח החיים</h2>
          <p className="font-display italic text-lg text-muted-foreground mb-8">מדרחוב, יין ותרבות בוטיק</p>
          <GuideImage src={lifestyle4} caption="רחוב המייסדים (טיילת המייסדים) — לב המושבה" />
          <div className="font-body text-foreground space-y-5 leading-relaxed">
            <p>רוב האנשים מגלים את זכרון כתיירים, ולעולם לא ממש מתאוששים מזה. המדרחוב המרוצף עובר דרך המרכז ההיסטורי כמו תפאורה מכפר פרובנסלי — חלונות גלריה קולטים את אור אחר הצהריים, ריח האספרסו הטרי, צלילי כינור שבוקעים מחצר פנימית.</p>
            <div className="grid md:grid-cols-2 gap-4 my-8">
              <GuideImage src={lifestyle5} caption="יקב כרמל, שנוסד ב-1882 — אחד היקבים הוותיקים בישראל" aspect="4/3" />
              <GuideImage src={lifestyle6} caption="מלון סייר — אירוח בוטיק על המדרחוב" aspect="4/3" />
            </div>
            <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">דרך היין והיקבים</h3>
            <p>בזכרון שלושה יקבים גדולים — יקב תשבי (היקב המשפחתי הגדול ביותר בישראל), יקב כרמל (נוסד 1882), ויקב בנימינה הסמוך — לצד קבוצת יצרנים בוטיקיים בגבעות שמסביב.</p>
            <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">החצרות הנסתרות</h3>
            <p>הסוד הגדול ביותר של זכרון הוא החצרות שלה — הטמונות מאחורי הרחוב הראשי. חוות עבר אלו הפכו לגלריות, סדנאות אריגה, סטודיו לקרמיקה וחנויות בוטיק.</p>
          </div>
          <div className="overflow-x-auto my-10">
            <table className="w-full text-sm font-body border border-border rounded-lg overflow-hidden">
              <thead><tr className="bg-primary text-primary-foreground"><th className="text-right p-3 font-semibold">אתר</th><th className="text-right p-3 font-semibold">פרטים</th><th className="text-right p-3 font-semibold">מרחק</th></tr></thead>
              <tbody>
                {[
                  ["טיילת המייסדים", "חנויות בוטיק, גלריות, ברי יין, בתי קפה", "בעיר"],
                  ["יקב תשבי", "סיורי כרם, ספא ויינותרפיה, מסעדה איכותית", "5 דקות"],
                  ["יקב כרמל", "יקב היסטורי מ-1882, סיורים וחנות", "בעיר"],
                  ["רמת הנדיב", "גני רוטשילד ופארק טבע על 450 דונם", "10 דקות"],
                  ["חוף דור-הבונים", "מפרצים מוגנים, מי ים תיכוני צלולים", "10 דקות"],
                  ["מוזיאון העלייה הראשונה", "מוזיאון מורשת ברמה עולמית, סיורים באנגלית", "בעיר"],
                  ["קיסריה", "אמפיתיאטרון רומי, מרינה, מסעדות איכות", "20 דקות"],
                  ["חיפה", "גני הבהאים, בתי חולים, קניות, חיי לילה", "30 דקות"],
                  ["תל אביב", "מרכז העיר, נתב״ג", "45 דקות ברכבת"],
                ].map(([a, d, dist], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-sand-light"}><td className="p-3 font-semibold">{a}</td><td className="p-3 text-muted-foreground">{d}</td><td className="p-3">{dist}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Divider />

        {/* 04 */}
        <section>
          <SectionBadge n="04" label="הלב הירוק" />
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">רמת הנדיב</h2>
          <p className="font-display italic text-lg text-muted-foreground mb-8">שמורת טבע ברמה עולמית</p>
          <GuideImage src={property1} caption="נוף לזכרון יעקב מגבעות הכרמל הסובבות — עיר עטופה בירוק" />
          <div className="font-body text-foreground space-y-5 leading-relaxed">
            <p>בגבול הדרומי של זכרון שוכנת רמת הנדיב — פארק הנצחה ושמורת טבע על 450 דונם שהוקמה על ידי משפחת רוטשילד. זהו מקום מנוחתם של הברון אדמונד ורעייתו אדלייד, ועבור תושבי זכרון, זו החצר האחורית שלהם.</p>
            <ul className="space-y-2">
              {[
                "גן הריחות: מתוכנן עבור בעלי מוגבלות ראייה, עם צמחי בושם מתויגים בעברית, ערבית וברייל",
                "גן המפלים: מדרגות מפל מדורגות ובריכות השתקפות",
                "גן הוורדים: אלפי זנים; פריחה שיא באביב",
                "אנדרטת רוטשילד: מקום מנוחתם של הברון והברונית",
                "שמורת טבע: קילומטרים של שבילי הליכה ורכיבה מסומנים",
                "חוות הנדיב: חווה עובדת עם קטיף עצמי וחוות מגע",
                "אירועי תרבות: קונצרטים בחוץ, הקרנות סרטים, תוכניות התנדבות",
                "דוכן אוכל דרוזי: מטבח דרוזי אותנטי — מוסד אהוב לסופי שבוע",
              ].map((item, i) => (
                <li key={i} className="flex gap-3"><span className="text-gold shrink-0">◂</span><span>{item}</span></li>
              ))}
            </ul>
          </div>
          <QuoteBlock quote="על שטח של 450 דונם דרומית לזכרון, רמת הנדיב היא הגשמת חזונו של הברון למקום שליו ורגוע לאנשים, צמחים ובעלי חיים." source="My Israel Property" />
        </section>

        <Divider />

        {/* 05 */}
        <section>
          <SectionBadge n="05" label="בתי ספר ונוער" />
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">חינוך</h2>
          <p className="font-display italic text-lg text-muted-foreground mb-8">בתי ספר, תוכניות נוער ואפשרויות למידה</p>
          <div className="grid md:grid-cols-2 gap-4 my-8">
            <GuideImage src={property2} caption="מוזיאון העלייה הראשונה — מורשת ברמה עולמית" aspect="4/3" />
            <GuideImage src={property3} caption="ציור קיר היסטורי במרכז העיר המתאר את הברון דה רוטשילד" aspect="4/3" />
          </div>
          <p className="font-body text-foreground leading-relaxed mb-8">זכרון יעקב מדורגת 8 מתוך 10 במדד הסוציו-אקונומי הארצי, ובתי הספר שלה משקפים את המעמד הזה. העיר מציעה מגוון אמיתי של גישות חינוכיות.</p>
          <div className="overflow-x-auto my-8">
            <table className="w-full text-sm font-body border border-border rounded-lg overflow-hidden">
              <thead><tr className="bg-primary text-primary-foreground"><th className="text-right p-3 font-semibold">בית ספר</th><th className="text-right p-3 font-semibold">אופי</th><th className="text-right p-3 font-semibold">הערות</th></tr></thead>
              <tbody>
                {[
                  ["ניל\"י יסודי", "ממלכתי חילוני", "הגדול ביותר; מוניטין אקדמי חזק"],
                  ["החורש יסודי", "ממלכתי חילוני", "תוכנית מדעים חזקה; פופולרי בקרב משפחות אנגלופוניות"],
                  ["החיטה יסודי", "ממלכתי חילוני", "מיקום מרכזי; במרחק הליכה מהמרכז ההיסטורי"],
                  ["קשת", "דמוקרטי ופלורליסטי", "פדגוגיה פתוחה; פופולרי בקרב משפחות פרוגרסיביות"],
                  ["יעב\"ץ", "דתי (דתי לאומי)", "קהילה דתית פעילה; אתוס ציוני חזק"],
                ].map(([s, c, n], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-sand-light"}><td className="p-3 font-semibold">{s}</td><td className="p-3 text-muted-foreground">{c}</td><td className="p-3">{n}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="space-y-2 font-body text-foreground">
            {[
              "7 בתי ספר תיכוניים כולל מודלים דמוקרטיים ופלורליסטיים",
              "צופים ובני עקיבא — שתי התנועות פעילות מאוד",
              "סקייטפארק מתקדם בשכונת חלומות זכרון",
              "תוכנית אמנויות עשירה: מוזיקה, דרמה ואקדמיות לאמנות חזותית",
              "מועדוני ספורט רבים: כדורסל, כדורגל, אומנויות לחימה, שחייה",
            ].map((item, i) => (
              <li key={i} className="flex gap-3"><span className="text-gold shrink-0">◂</span><span>{item}</span></li>
            ))}
          </ul>
        </section>

        <Divider />

        {/* 06 */}
        <section>
          <SectionBadge n="06" label="שכונות ומחירים" />
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">סקירת שכונות מעמיקה</h2>
          <p className="font-display italic text-lg text-muted-foreground mb-8">פרופילים, אופי ונתוני מחירים</p>
          <p className="font-body text-foreground leading-relaxed mb-10">זכרון יעקב אינה שוק אחיד. שמונה השכונות המובחנות שלה כל אחת מושכת קונה שונה, מציעה אורח חיים שונה, ונושאת נקודת מחיר שונה.</p>

          {NEIGHBORHOODS.map((n) => (
            <div key={n.name} className="bg-card rounded-xl border border-border p-6 md:p-8 mb-8">
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="font-display text-2xl font-semibold text-foreground">{n.name}</h3>
                <span className="text-sm font-body font-semibold text-primary">↑ <Num>{n.trend}</Num> שנתי</span>
              </div>
              <p className="text-sm font-body text-muted-foreground mb-4">{n.type}</p>
              <div className="grid grid-cols-2 gap-4 bg-sand-light rounded-lg p-4 mb-6">
                <div><p className="text-xs text-muted-foreground font-body">מחיר למ״ר</p><p className="font-display font-semibold text-foreground"><Num>{n.ppm}</Num></p></div>
                <div><p className="text-xs text-muted-foreground font-body">טווח כולל</p><p className="font-display font-semibold text-foreground"><Num>{n.total}</Num></p></div>
              </div>
              {n.img && <GuideImage src={n.img} caption={n.name} aspect="16/9" />}
              <p className="font-body text-foreground leading-relaxed mb-4">{n.desc}</p>
              <ProConList pros={n.pros} cons={n.cons} />
              <p className="text-sm font-body text-muted-foreground italic">מתאים ל: {n.ideal}</p>
            </div>
          ))}
        </section>

        <Divider />

        {/* 07 */}
        <section>
          <SectionBadge n="07" label="מחירים ומגמות" />
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">נתוני שוק</h2>
          <p className="font-display italic text-lg text-muted-foreground mb-8">מחירים, מגמות ועסקאות אמיתיות 2025–2026</p>
          <GuideImage src={sold1} caption="פנורמת מגורים על המדרון — וילות ובתים יורדים במורדות הכרמל" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-card rounded-xl border border-border p-6 my-10">
            <StatCard value="₪3.67M" label="מחיר נכס ממוצע" />
            <StatCard value="+15.9%" label="נפח עסקאות שנתי" />
            <StatCard value="65 ימים" label="ממוצע ימים בשוק" />
            <StatCard value="192" label="סה״כ עסקאות רבעון 1 2025" />
          </div>
          <h3 className="font-display text-xl font-semibold text-foreground mt-10 mb-5">מחיר למ״ר לפי אזור (2025–2026)</h3>
          <div className="overflow-x-auto my-8">
            <table className="w-full text-sm font-body border border-border rounded-lg overflow-hidden">
              <thead><tr className="bg-primary text-primary-foreground"><th className="text-right p-3 font-semibold">שכונה</th><th className="text-right p-3 font-semibold">סוג נכס</th><th className="text-right p-3 font-semibold">טווח ₪/מ״ר</th><th className="text-right p-3 font-semibold">מגמה</th></tr></thead>
              <tbody>
                {MARKET_TABLE.map(([n, t, p, tr], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-sand-light"}><td className="p-3 font-semibold">{n}</td><td className="p-3 text-muted-foreground">{t}</td><td className="p-3"><Num>{p}</Num></td><td className="p-3 text-primary font-semibold">↑ {tr}</td></tr>
                ))}
                <tr className="bg-primary/5 font-semibold"><td className="p-3">ממוצע העיר</td><td className="p-3">כל הקטגוריות</td><td className="p-3">₪27,400</td><td className="p-3 text-primary">↑ +13.5% שנתי</td></tr>
              </tbody>
            </table>
          </div>
          <h3 className="font-display text-xl font-semibold text-foreground mt-10 mb-5">עסקאות אמיתיות מאומתות (מחירי סגירה בפועל)</h3>
          <div className="overflow-x-auto my-8">
            <table className="w-full text-sm font-body border border-border rounded-lg overflow-hidden">
              <thead><tr className="bg-primary text-primary-foreground"><th className="text-right p-3 font-semibold">נכס</th><th className="text-right p-3 font-semibold">מיקום</th><th className="text-right p-3 font-semibold">מחיר סגירה</th></tr></thead>
              <tbody>
                {TRANSACTIONS.map(([p, l, c], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-sand-light"}><td className="p-3">{p}</td><td className="p-3 text-muted-foreground">{l}</td><td className="p-3 font-semibold"><Num>{c}</Num></td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="font-display text-xl font-semibold text-foreground mt-10 mb-5">איך זכרון משתווה לשווקים המרכזיים בישראל</h3>
          <div className="overflow-x-auto my-8">
            <table className="w-full text-sm font-body border border-border rounded-lg overflow-hidden">
              <thead><tr className="bg-primary text-primary-foreground"><th className="text-right p-3 font-semibold">עיר</th><th className="text-right p-3 font-semibold">ממוצע ₪/מ״ר (2025)</th><th className="text-right p-3 font-semibold">אורח חיים</th><th className="text-right p-3 font-semibold">קהילה אנגלופונית</th></tr></thead>
              <tbody>
                {COMPARE_CITIES.map(([city, price, life, anglo], i) => (
                  <tr key={i} className={city === "זכרון יעקב" ? "bg-gold/10 font-semibold" : i % 2 === 0 ? "bg-card" : "bg-sand-light"}><td className="p-3">{city}</td><td className="p-3"><Num>{price}</Num></td><td className="p-3 text-muted-foreground">{life}</td><td className="p-3 text-muted-foreground">{anglo}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-body text-foreground leading-relaxed italic">זכרון מציעה מחירים ברמת רעננה עם אורח חיים שרעננה פשוט לא יכולה להתחרות בו — וחלק קטן ממחיר תל אביב.</p>
        </section>

        <Divider />

        {/* 08 */}
        <section>
          <SectionBadge n="08" label="איירבינב ועלייה הונית" />
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">זווית ההשקעה</h2>
          <p className="font-display italic text-lg text-muted-foreground mb-8">איירבינב, תשואות שכירות ועלייה הונית</p>
          <p className="font-body text-foreground leading-relaxed mb-8">זכרון יעקב היא לא רק רכישה לצורכי אורח חיים. עבור משקיעים, היא מציעה שילוב משכנע של עלייה הונית מונעת מחסור, שוק השכרה לטווח קצר גדל, וגורמי ביקוש מבניים שלא צפויים להתהפך.</p>
          <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-5">ביצועי השכרה לטווח קצר (Airbnb)</h3>
          <div className="overflow-x-auto my-8">
            <table className="w-full text-sm font-body border border-border rounded-lg overflow-hidden">
              <thead><tr className="bg-primary text-primary-foreground"><th className="text-right p-3 font-semibold">מדד</th><th className="text-right p-3 font-semibold">נתון</th></tr></thead>
              <tbody>
                {[
                  ["דירוג אורח ממוצע", "4.9/5.0 כוכבים בכלל הליסטינגים בזכרון"],
                  ["תקופות שיא תפוסה", "פסח, סוכות, פסטיבל היין, סופי שבוע בקיץ"],
                  ["תעריף לילה — מרכז היסטורי", "₪600–₪1,800 תלוי בגודל הנכס"],
                  ["שכירות חודשית — דירות ארוכות טווח", "₪7,000–₪12,000 לחודש"],
                  ["תשואת שכירות ברוטו ארצית ממוצעת", "3.16% (Global Property Guide, רבעון 3 2025)"],
                  ["פרמיית השכרה לטווח קצר מול טווח ארוך", "60–120% הכנסה גבוהה יותר ליחידות ממוקמות היטב"],
                ].map(([m, d], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-sand-light"}><td className="p-3 font-semibold">{m}</td><td className="p-3 text-muted-foreground">{d}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-body text-foreground leading-relaxed mb-6">השקעות זרות היוו 22% מרכישות המגורים ברבעון הראשון של 2025, כאשר רוכשים מצפון אמריקה וצרפת מובילים.</p>
          <QuoteBlock quote="שווקי השכרה לטווח קצר, בייחוד עבור נכסים ליד כרמים ובמרכז ההיסטורי, הפגינו ביצועים מצוינים, עם שיעורי תפוסה שהגיעו לשיא בעונות החגים והפסטיבלים." source="דוח שוק זכרון, רבעון 1 2025" />
          <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">תחזית עלייה הונית</h3>
          <p className="font-body text-foreground leading-relaxed">דוח הרבעון הראשון של 2025 צופה עלייה שנתית של 12–14% בהמשך 2025. הגורמים המבניים המרכזיים הם מאפיינים קבועים של השוק הזה, לא תופעות מחזור קצר.</p>
        </section>

        <Divider />

        {/* 09 */}
        <section>
          <SectionBadge n="09" label="מס ותהליך רכישה" />
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">הטבות מס לעולים</h2>
          <p className="font-display italic text-lg text-muted-foreground mb-8">היתרון הכלכלי שלכם כעולים חדשים — עדכון 2026</p>
          <p className="font-body text-foreground leading-relaxed mb-8">מערכת ההטבות של ישראל לעולים חדשים היא מהנדיבות בעולם, במיוחד עבור רוכשי נכסים.</p>
          <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-5">מס רכישה לעולים חדשים</h3>
          <div className="overflow-x-auto my-8">
            <table className="w-full text-sm font-body border border-border rounded-lg overflow-hidden">
              <thead><tr className="bg-primary text-primary-foreground"><th className="text-right p-3 font-semibold">שווי הנכס</th><th className="text-right p-3 font-semibold">שיעור מס עולה</th><th className="text-right p-3 font-semibold">שיעור תושב חוץ</th></tr></thead>
              <tbody>
                <tr className="bg-card"><td className="p-3">עד ₪1,978,745</td><td className="p-3 text-primary font-semibold">0%</td><td className="p-3 text-destructive font-semibold">8%</td></tr>
                <tr className="bg-sand-light"><td className="p-3"><Num>₪1,978,745 – ₪6,000,000</Num></td><td className="p-3 text-primary font-semibold">0.5%</td><td className="p-3 text-destructive font-semibold">8%</td></tr>
                <tr className="bg-card"><td className="p-3">מעל ₪6,000,000</td><td className="p-3">מדרגות רגילות חלות</td><td className="p-3 text-destructive font-semibold">10%</td></tr>
              </tbody>
            </table>
          </div>
          <div className="bg-gold/10 border border-gold/30 rounded-lg p-5 my-8">
            <p className="font-body text-foreground text-sm"><strong>⚠ דוגמה:</strong> על נכס בשווי ₪5 מיליון, עולה משלם כ-₪15,100 מס רכישה. תושב חוץ משלם ₪400,000. החיסכון עולה על ₪385,000.</p>
          </div>
          <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-5">הטבות נוספות לעולים בנכסים</h3>
          <ul className="space-y-3 font-body text-foreground">
            {[
              "משכנתא מסובסדת (זכאות): הלוואה מסובסדת עד כ-₪200,000 בריבית קבועה של 4–4.5%, זמינה ל-15 שנה לאחר העלייה",
              "סיוע בשכר דירה: ₪1,000–₪3,000 לחודש ל-24–30 החודשים הראשונים",
              "הנחת ארנונה: הנחה של 50–90% על ארנונה עד 100 מ״ר, לתקופה אחת של 12 חודשים בשנתיים הראשונות",
              "פטור על הכנסות חוץ ל-10 שנים: הכנסות ונכסים המוחזקים בחו\"ל פטורים ממס ישראלי ל-10 שנים (למי שעלה לפני 31 בדצמבר 2025)",
              "גישה למשכנתא זרה: תושבי חוץ יכולים בדרך כלל להשיג 50–70% מימון; עולים זכאים עד 75% מימון",
              "פטור ממכס: ייבוא כל מוצרי משק הבית והמכשירים ללא מכס למשך 3 שנים לאחר העלייה",
            ].map((item, i) => (
              <li key={i} className="flex gap-3"><span className="text-gold shrink-0">◂</span><span>{item}</span></li>
            ))}
          </ul>
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-5 my-8">
            <p className="font-body text-foreground text-sm"><strong>⚠ הערה קריטית ל-2026:</strong> הפטור מדיווח על נכסים בחו&quot;ל ל-10 שנים בוטל עבור תושבים חדשים שמגיעים מ-1 בינואר 2026. מי שעלה לפני 31 בדצמבר 2025 שומר על הכללים הישנים. יש להתייעץ עם עורך דין מס ישראלי מוסמך לפני כל רכישה.</p>
          </div>
        </section>

        <Divider />

        {/* 10 */}
        <section>
          <SectionBadge n="10" label="תכנון וחזון 2040" />
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">שימור וצמיחה עתידית</h2>
          <p className="font-display italic text-lg text-muted-foreground mb-8">כללי תכנון, מגבלות וחזון 2040</p>
          <GuideImage src={sold4} caption="וילה בוטיק חדשה בסגנון אבן זכרוני מסורתי" />
          <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-5">שימור: למה זה מגן על ההשקעה שלכם</h3>
          <p className="font-body text-foreground leading-relaxed mb-8">משטר השימור של זכרון מוצג לעיתים כמגבלה. במציאות, זו הסיבה המרכזית לכך שהשוק מצטיין.</p>
          <div className="overflow-x-auto my-8">
            <table className="w-full text-sm font-body border border-border rounded-lg overflow-hidden">
              <thead><tr className="bg-primary text-primary-foreground"><th className="text-right p-3 font-semibold">דרגה</th><th className="text-right p-3 font-semibold">שם</th><th className="text-right p-3 font-semibold">המשמעות</th></tr></thead>
              <tbody>
                {[
                  ["דרגה 1", "שימור מלא", "ללא שינויים חיצוניים או פנימיים משמעותיים."],
                  ["דרגה 2", "שימור מחמיר", "שינויים פנימיים אפשריים באישור. שינויים חיצוניים מוגבלים מאוד."],
                  ["דרגה 3", "שימור מתון", "גמישות פנימית רבה יותר; שינויים חיצוניים דורשים אישור."],
                  ["דרגה 4", "שימור מינימלי", "כללי בנייה סטנדרטיים עם רגישות למורשת."],
                ].map(([g, n, w], i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-sand-light"}><td className="p-3 font-semibold">{g}</td><td className="p-3">{n}</td><td className="p-3 text-muted-foreground">{w}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="font-display text-xl font-semibold text-foreground mt-10 mb-5">תוכנית האב 2040: מה בדרך</h3>
          <ul className="space-y-3 font-body text-foreground">
            {[
              "פארק היין (2026–2028): מתחם תיירותי-מסחרי גדול בדרום זכרון",
              "שדרוג תחנת רכבת בנימינה (2028–2032): תחנה משודרגת עם חניה מורחבת ופיתוח מסחרי",
              "אזור תעסוקה חדש (2030–2035): פארק הייטק צמוד לתחנת הרכבת, עם צפי ל-5,000 משרות חדשות",
              "יעד גידול אוכלוסייה: תחזיות רשמיות מכוונות ל-37,000 תושבים (עלייה מ-25,000 כיום)",
              "הרחבה מזרחית (2035–2040): שכונות מגורים חדשות מתוכננות",
            ].map((item, i) => (
              <li key={i} className="flex gap-3"><span className="text-gold shrink-0">◂</span><span>{item}</span></li>
            ))}
          </ul>
        </section>

        <Divider />

        {/* 11 */}
        <section>
          <SectionBadge n="11" label="מה להימנע ממנו" />
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">טעויות קריטיות שכדאי להימנע מהן</h2>
          <p className="font-display italic text-lg text-muted-foreground mb-8">מה כל רוכש עולה חייב לדעת</p>
          <div className="space-y-6">
            {MISTAKES.map(([num, title, desc]) => (
              <div key={num} className="flex gap-5 bg-card rounded-xl border border-border p-5 md:p-6">
                <span className="w-10 h-10 rounded-full bg-destructive/10 text-destructive flex items-center justify-center font-display text-sm font-bold shrink-0">{num}</span>
                <div><h4 className="font-display font-semibold text-foreground mb-2">{title}</h4><p className="font-body text-muted-foreground text-sm leading-relaxed">{desc}</p></div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* 12 */}
        <section>
          <SectionBadge n="12" label="שלב אחר שלב" />
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">מפת הדרכים שלכם לרכישה</h2>
          <p className="font-display italic text-lg text-muted-foreground mb-8">התהליך שלב אחר שלב בישראל</p>
          <div className="space-y-0">
            {STEPS.map(([n, title, timing, desc], i, arr) => (
              <div key={n} className="flex gap-5 relative">
                {i < arr.length - 1 && <div className="absolute right-[19px] top-10 bottom-0 w-px bg-border" />}
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display text-sm font-bold shrink-0 z-10">{n}</div>
                <div className="pb-8">
                  <h4 className="font-display font-semibold text-foreground">{title}{timing && <span className="text-sm font-body text-muted-foreground font-normal mr-2">({timing})</span>}</h4>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* 13 */}
        <section>
          <SectionBadge n="13" label="השותף שלכם" />
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">למה ספיריט נדל״ן</h2>
          <p className="font-display italic text-lg text-muted-foreground mb-8">השותף הבוטיק שלכם בזכרון יעקב</p>
          <GuideImage src={heroBg} caption="המישור החופי הים-תיכוני כפי שנראה מזכרון יעקב" />
          <p className="font-body text-foreground leading-relaxed mb-8">ספיריט נדל&quot;ן היא חברת הנדל&quot;ן הבוטיק של זכרון יעקב, המוקדשת בלעדית לשוק הזה. אנחנו לא פועלים בכל הארץ. אנחנו מכירים כל רחוב, כל חצר וכל שכונה במושבה בעומק שסוכנויות כלליות פשוט לא יכולות להשיג.</p>
          <h3 className="font-display text-xl font-semibold text-foreground mt-8 mb-5">מה מייחד אותנו</h3>
          <ul className="space-y-3 font-body text-foreground">
            {[
              "גישה לנכסים שלא פורסמו: רבים מהנכסים הטובים ביותר בזכרון אף פעם לא מגיעים לפורטלים ציבוריים. הרשת שלנו נותנת לכם גישה ראשונים.",
              "אנגלית קודם כל: אנחנו עובדים באנגלית. כל מסמך, כל שיחה, כל הסבר — בשפה שלכם.",
              "מומחי עולים: ליווינו עשרות משפחות אנגלופוניות בתהליך הרכישה כעולים.",
              "מומחיות שימור: נגיד לכם בדיוק מה מותר ומה אסור בכל נכס לפני שתגישו הצעה.",
              "שירות אישי: אתם עובדים עם סוכן ייעודי, לא מוקד שירות.",
              "ללא לחץ: אנחנו מקבלים תשלום כשאתם מוצאים את הנכס הנכון — לא כשאתם מתפשרים על הלא-נכון.",
            ].map((item, i) => (
              <li key={i} className="flex gap-3"><span className="text-gold shrink-0">◂</span><span>{item}</span></li>
            ))}
          </ul>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { img: hagitImg, name: "חגית כהן מורגן", role: "מייסדת שותפה" },
              { img: aviImg, name: "אבי סולימן", role: "מייסד שותף" },
              { img: eliranImg, name: "אלירן אמסלם", role: "שיווק בינלאומי ורוכשים מחו\"ל" },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-3 border-2 border-gold/30">
                  <img src={(member.img as any).src ?? (member.img as unknown as string)} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <p className="font-display font-semibold text-foreground">{member.name}</p>
                <p className="text-xs font-body text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-16 bg-primary rounded-2xl p-10 md:p-14">
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-primary-foreground mb-4">מחפשים נכס בזכרון יעקב?</h3>
            <p className="font-body text-primary-foreground/70 mb-8 max-w-lg mx-auto">נשמח לשלוח לכם נכסים זמינים שמתאימים למה שאתם מחפשים.</p>
            <a
              href={`https://wa.me/972522820632?text=${encodeURIComponent("היי חגית,\nקראתי עכשיו את מדריך הרוכשים ואשמח לשמוע על נכסים זמינים בזכרון יעקב.")}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 px-10 rounded-full font-body font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5" />
              דברו איתנו ב-WhatsApp
            </a>
          </div>
        </section>

        {/* FOOTER */}
        <div className="mt-20 pt-10 border-t border-border text-center">
          <img src={(spiritLogo as any).src ?? (spiritLogo as unknown as string)} alt="Spirit Real Estate" className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" />
          <p className="font-display text-sm font-semibold text-foreground">ספיריט נדל״ן</p>
          <p className="text-xs font-body text-muted-foreground">בוטיק נדל״ן · זכרון יעקב, ישראל</p>
          <p className="text-[10px] font-body text-muted-foreground/60 mt-6 max-w-xl mx-auto leading-relaxed">
            מדריך זה מסופק למטרות מידע בלבד נכון למרץ 2026 ואינו מהווה ייעוץ משפטי, פיננסי או מס. נתוני השוק מבוססים על רישומי רשות מקרקעי ישראל, דוחות שוק לרבעון 1 2025, ונתוני עסקאות פומביים. כל המחירים אינדיקטיביים. יש להתייעץ עם אנשי מקצוע ישראלים מוסמכים בתחומי המשפט והמס לפני השלמת כל עסקת נדל&quot;ן.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BuyerGuide2026HeContent;
