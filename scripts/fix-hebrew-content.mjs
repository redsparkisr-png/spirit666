/**
 * Fix unnatural Hebrew translations in site_content table
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
function loadEnv() {
  const text = readFileSync(resolve(__dirname, "../.env.local"), "utf8");
  for (const line of text.split("\n")) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
  }
}
loadEnv();
const sb = createClient(process.env.NEW_SUPABASE_URL, process.env.NEW_SUPABASE_SERVICE_ROLE_KEY);

const FIXES = [
  // ── Grammar errors ──────────────────────────────────────────────────────────
  {
    key: "home.available.subtitle",
    value_he: "זהו מבחר קטן ומאוצר של נכסים זמינים כרגע. חלק מההזדמנויות האטרקטיביות ביותר משותפות באופן פרטי עם רוכשים מתאימים.",
    reason: "זוהי → זהו (מבחר — זכר)"
  },
  {
    key: "home.trust_line.text",
    value_he: "מתווכים מורשים · למעלה מ-288 משפחות ייצגנו · ניהול מו״מ אסטרטגי · מומחיות מקומית בזכרון",
    reason: "שיוצגו → ייצגנו"
  },

  // ── Unnatural calques from English ──────────────────────────────────────────
  {
    key: "home.available.pre_title",
    value_he: "נכסים נבחרים לרוכשים מישראל ומחו\"ל",
    reason: "נכסים נבחרים עבור רוכשים בינלאומיים → טבעי יותר"
  },
  {
    key: "home.contact.subtitle",
    value_he: "קבלו נכסים בלעדיים לפני שהם מגיעים ללוחות.",
    reason: "מאוצרים → בלעדיים (curated calque)"
  },
  {
    key: "home.exit.subline",
    value_he: "קבלו רשימה פרטית של הזדמנויות שלא מגיעות ללוחות בזכרון יעקב.",
    reason: "מתחת לרדאר → לא מגיעות ללוחות"
  },
  {
    key: "home.blueprint.subtitle",
    value_he: "מדריך מעשי לרוכשים שרוצים להגיע מוכנים — לפני שסוגרים כלום.",
    reason: "מסגרת ברורה → מדריך מעשי (framework calque)"
  },

  // ── Unnatural team bios ──────────────────────────────────────────────────────
  {
    key: "about.team.eliran_bio",
    value_he: "מתמקד בתמחור אסטרטגי, מבנה עסקה ושמירה על האינטרסים של הלקוח בכל שלב.",
    reason: "לוגיקת תמחור / הגנה על המינוף → עברית טבעית"
  },
  {
    key: "about.team.hagit_bio",
    value_he: "מכירה עמוקה של הקהילה המקומית וליווי צמוד — כדי שהתהליך יהיה חלק ככל האפשר.",
    reason: "הבנה עמוקה → מכירה עמוקה, טבעי יותר"
  },
  {
    key: "about.team.avi_bio",
    value_he: "הערכת שווי מדויקת וניהול עסקה ברור מהתחלה ועד הסוף — ללא הפתעות.",
    reason: "הערכת שווי ממושמעת → לא קיים בעברית"
  },

  // ── Home team section ────────────────────────────────────────────────────────
  {
    key: "home.team.eliran_bio",
    value_he: "אחראי על האסטרטגיה הדיגיטלית ועל כך שכל נכס מגיע לקונים הנכונים — בישראל ובעולם.",
    reason: "גישה דיגיטלית מובילה → טבעי יותר"
  },
  {
    key: "home.team.hagit_bio",
    value_he: "מתמחה בהתאמת קונים מחו״ל לבית הישראלי שמחכה להם בזכרון.",
    reason: "קונים בינלאומיים → קונים מחו״ל, טבעי יותר"
  },
  {
    key: "home.team.avi_bio",
    value_he: "מעל 15 שנות ניסיון בהכוונת משפחות לשכונות המבוקשות ביותר בזכרון יעקב.",
    reason: "הדרכה → הכוונה, טבעי יותר"
  },

  // ── Property modal ────────────────────────────────────────────────────────────
  {
    key: "property.modal.bullet_1",
    value_he: "ניתן לסייר בנכס בשיחת וידאו פרטית",
    reason: "צפייה פרטית דרך שיחת וידאו מאובטחת → טבעי יותר"
  },
  {
    key: "property.modal.bullet_2",
    value_he: "עזרה עם עורך דין, מיסים וקליטה",
    reason: "סיוע משפטי, מיסויי והתמקמות → יותר ישיר"
  },

  // ── Off-market section ────────────────────────────────────────────────────────
  {
    key: "home.offmarket.title",
    value_he: "רוב הקונים לא רואים את ההזדמנויות הכי טובות",
    reason: "בכלל לא → לא (פשוט יותר)"
  },

  // ── Sell page ────────────────────────────────────────────────────────────────
  {
    key: "sell.cta.subtitle",
    value_he: "בקשו הערכת שווי לנכס שלכם — ללא התחייבות וללא לחץ.",
    reason: "חסויה → יותר ישיר ופחות פורמלי"
  },
  {
    key: "sell.hero.subtitle",
    value_he: "תמחור נכון, שיווק חכם וייצוג מקצועי — מהרישום ועד לסגירת עסקה.",
    reason: "מיצוב אסטרטגי → תמחור נכון, שיווק חכם"
  },

  // ── About page ────────────────────────────────────────────────────────────────
  {
    key: "about.story.text",
    value_he: "ספיריט נדל״ן נוסדה עם מטרה אחת ברורה: לתת ייצוג אחר לשוק הנדל״ן של זכרון יעקב. אנחנו מאמינים שקנייה או מכירה של בית חייבת להיות מונחית על ידי שקיפות, ידע מקומי אמיתי ואסטרטגיה — לא הבטחות ריקות.",
    reason: "הוקמה → נוסדה, נוסח טבעי יותר"
  },
  {
    key: "about.values.item_1_desc",
    value_he: "אנחנו אומרים את מה שאנחנו יודעים — כולל כשעסקה לא מתאימה לכם.",
    reason: "משתפים את מה שאנחנו יודעים → אומרים"
  },
  {
    key: "about.values.item_3_desc",
    value_he: "בלי לחץ ובלי אג׳נדות נסתרות. אנחנו עובדים בקצב שלכם, לטובתכם בלבד.",
    reason: "החלטות חפוזות → לחץ, טבעי יותר"
  },

  // ── Guide bullets ─────────────────────────────────────────────────────────────
  {
    key: "guide.home.hook",
    value_he: "רוב האנשים שמגיעים לחפש בית בזכרון יעקב לא מכירים את ההבדלים האמיתיים בין השכונות — וזה יכול לעלות הרבה כסף.",
    reason: "מאות אלפי שקלים → לא מתאים לכולם"
  },
  {
    key: "guide.home.intro",
    value_he: "לכן יצרנו את המדריך המקיף לרוכשי בתים בזכרון יעקב.",
    reason: "הוספת מקיף"
  },
  {
    key: "guide.home.bullet_6",
    value_he: "איך לזהות הזדמנות לפני שהיא מגיעה ליד2",
    reason: "ללוחות → ליד2 (ספציפי ומוכר יותר)"
  },
  {
    key: "guide.home.bullet_8",
    value_he: "ניתוח שוק מקומי שלא תמצאו בשום לוח מכירות",
    reason: "ביד2 → בשום לוח מכירות, גנרי יותר"
  },

  // ── Contact page ──────────────────────────────────────────────────────────────
  {
    key: "contact.hours.response",
    value_he: "בד״כ מגיבים תוך שעה-שעתיים.",
    reason: "הוספה — שדה response_time לעמוד Contact"
  },

  // ── Testimonials ──────────────────────────────────────────────────────────────
  {
    key: "home.testimonials.cta_text",
    value_he: "רוצים להיות הסיפור הבא?",
    reason: "מוכנים → רוצים, טבעי יותר"
  },
];

async function main() {
  let fixed = 0;
  let errors = 0;
  for (const fix of FIXES) {
    const { error } = await sb
      .from("site_content")
      .update({ value_he: fix.value_he })
      .eq("key", fix.key);
    if (error) {
      console.error(`✗ ${fix.key}: ${error.message}`);
      errors++;
    } else {
      console.log(`✓ ${fix.key} — ${fix.reason}`);
      fixed++;
    }
  }
  console.log(`\nDone: ${fixed} fixed, ${errors} errors.`);
}
main();
