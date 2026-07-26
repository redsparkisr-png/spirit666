// Hebrew translations for all 6 properties_sold rows (2026-07-23,
// user-approved: "אוקיי אז תשלים את המשימה"). Natural marketing Hebrew,
// matching the tone already used for properties_available.
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(resolve(__dirname, "../.env.local"), "utf8");
for (const line of text.split("\n")) {
  const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
}
const sb = createClient(process.env.NEW_SUPABASE_URL, process.env.NEW_SUPABASE_SERVICE_ROLE_KEY);

const T = {
  "d98bd3a6-1189-4236-afbf-61875b50c5c4": {
    title_he: 'וילה בתכנון אדריכל עם דירה מניבה ונוף ים | סמוך לנווה הבארון',
    neighborhood_note_he: "רחוב הערבה, זכרון יעקב – סמוך לנווה הבארון",
    short_description_he:
      'בית בתכנון אדריכל (מור בללטי) ברחוב הערבה השקט, סמוך לנווה הבארון — כ-300 מ"ר בנוי על פני שלושה מפלסים מתוכננים בקפידה, במגרש של 452 מ"ר, אחד עשר חדרים עם עיצוב פנים וסטיילינג מלא. סוויטת הורים מפנקת עם פרקט פישבון, מטבח חדש של Semel Kitchens, דירה מניבה נפרדת עם כניסה עצמאית מול נוף ים, חלל מעוצב וגמיש (משמש כיום כצהרון ילדים, ניתן להתאמה בקלות לשימושים אחרים), חדרי ילדים מרווחים, ממ"ד נפרד, חדר עבודה מעוצב, וגינה גדולה ומטופחת עם מטבח חוץ בנוי ואפשרות לבריכה.',
  },
  "38d1aee8-afdd-4bfe-a692-7c87beabbece": {
    title_he: "וילה מעוצבת עם תקרות עץ חשופות ואופציית בריכה | גבעת עדן",
    neighborhood_note_he: "גבעת עדן, זכרון יעקב",
    short_description_he:
      'וילה מעוצבת בקפידה בגבעת עדן, עם תקרות עץ גבוהות וחשופות ואופי כפרי-מודרני — כ-240 מ"ר בנוי על מגרש של חצי דונם. קומת כניסה מוארת עם חדר שינה אן-סוויט, סוויטת הורים מפוארת עם מרפסת נוף, שלושה חדרי ילדים מעוצבים, חדר עבודה בקומת גלריה, ממ"ד נפרד, מטבח מאובזר ואיכותי, שתי חניות, גינה גדולה ומטופחת, ואפשרות להוספת בריכה.',
  },
  "a0759ee4-307d-4580-af74-8b03abcd55ae": {
    title_he: "בית חד-מפלסי נדיר עם גינה גדולה ליד המדרחוב | שדרות נילי",
    neighborhood_note_he: "שדרות נילי, זכרון יעקב – סמוך למדרחוב ההיסטורי",
    short_description_he:
      'בית חד-מפלסי נדיר ברחוב שקט, במרחק הליכה מהמדרחוב ההיסטורי — כ-130 מ"ר בנוי על מגרש של 300 מ"ר. שלושה חדרי ילדים מעוצבים וסוויטת הורים נפרדת עם חדר רחצה צמוד, עיצוב בקו כפרי-מודרני, חניה צמודה, וגינה גדולה ומטופחת עם פרגולה, פינות ישיבה וג\'קוזי.',
  },
  "b03c5bb4-b00a-4442-bea4-8d42a7522d95": {
    title_he: "וילה כפרית עם נוף הרים ויחידת הורים נפרדת | גבעת עדן",
    neighborhood_note_he: "גבעת עדן (מזרח), זכרון יעקב",
    short_description_he:
      'וילה כפרית וחמימה בחלק המזרחי של גבעת עדן — כ-220 מ"ר בנוי על מגרש של 450 מ"ר, שישה חדרים הכוללים סוויטת הורים עם מרפסת נוף וארבעה חדרי שינה נוספים עם פינת משפחה, בנוסף ליחידה נפרדת של כ-70 מ"ר עם שני חדרים, כניסה וגינה עצמאיות. גינה בשלה עם עצי פרי ופינת BBQ, שתי חניות מקורות, ונוף הרים מכל חלון.',
  },
  "a64bb94e-97f6-44aa-a79c-6148909cec82": {
    title_he: "דו-משפחתי משופץ בפרויקט 'טוסקנה' | גבעת עדן",
    neighborhood_note_he: "גבעת עדן, זכרון יעקב",
    short_description_he:
      'דו-משפחתי משופץ ומעוצב במלואו בפרויקט \'טוסקנה\', גבעת עדן — הגדול בפרויקט, כ-190 מ"ר בנוי על מגרש של רבע דונם. סוויטת הורים, שלושה חדרי ילדים מעוצבים, ממ"ד נפרד, מטבח נגרות איכותי, שתי חניות מקורות וגינה גדולה ומטופחת.',
  },
  "d266d671-b0c0-450a-b385-ff33ee9bb365": {
    title_he: "וילה כפרית-מודרנית צמודת קרקע ברמז | 6 חדרים",
    neighborhood_note_he: "",
    short_description_he:
      'וילה כפרית-מודרנית צמודת קרקע ברמז, כ-210 מ"ר בנוי על מגרש נדיב של 627 מ"ר, 6 חדרים, גינה פרטית בשלה, זכויות בנייה נוספות, אופציית בריכה, ממ"ד, מחסן גדול ושתי חניות פרטיות.',
  },
};

let updated = 0;
for (const [id, fields] of Object.entries(T)) {
  const { error } = await sb.from("properties_sold").update(fields).eq("id", id);
  if (error) { console.error(`✗ ${id}: ${error.message}`); process.exit(1); }
  updated++;
}
console.log(`DONE — ${updated} sold properties translated`);
