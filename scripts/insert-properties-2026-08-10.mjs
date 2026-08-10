// Insert two new exclusive listings (2026-08-10): HaChatzav 74 (Northern Moshava, swim-spa villa)
// and HaCharuv (Yaakov neighborhood, detached home with garden). Uploads photos to storage then
// inserts rows. Copy is tone-matched to existing listings, derived only from the owner's approved
// Hebrew source text (price/mamad/sqm confirmed by owner in the source .txt files).
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { resolve, dirname, join, extname } from "node:path";
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

const BUCKET = "images";

async function uploadImages(dir, orderedNames, tag) {
  const urls = [];
  for (let i = 0; i < orderedNames.length; i++) {
    const file = readFileSync(join(dir, orderedNames[i]));
    const ext = extname(orderedNames[i]).toLowerCase() === ".png" ? "png" : "jpg";
    const contentType = ext === "png" ? "image/png" : "image/jpeg";
    const path = `properties/${Date.now()}-${tag}-${String(i + 1).padStart(2, "0")}.${ext}`;
    const { error } = await sb.storage.from(BUCKET).upload(path, file, { contentType, upsert: false });
    if (error) throw new Error(`upload ${orderedNames[i]}: ${error.message}`);
    const { data } = sb.storage.from(BUCKET).getPublicUrl(path);
    urls.push(data.publicUrl);
    console.log(`  uploaded ${i + 1}/${orderedNames.length}: ${orderedNames[i]}`);
  }
  return urls;
}

// ─── Property A: HaChatzav 74, Northern Moshava ─────────────────────────────
const PA_DIR = "C:\\Users\\Redbo\\Desktop\\להוסיף לאתר\\החצב 74";
const PA_ORDER = ["new3.jpg", "new1.jpg", "new2.jpg", "new4.jpg"];

const PA_FULL = `Some homes give you a sense of calm the moment you step through the door. This is one of them.

For sale in exclusive representation in the quiet northern part of Zichron Yaakov's moshava: a fully renovated home finished from the foundation up, tastefully designed and ready for immediate move-in — just bring your suitcases.

The standout feature is comfort without compromise: a spacious, pampering parents' suite on the entrance level. No stairs, no effort — full privacy, complete accessibility and total calm from the moment you walk in.

The home offers approximately 220 sqm of smart, well-planned living space on a half-dunam plot of privacy and greenery. In total there are 7 spacious rooms, including two indulgent master suites. A mamad (safe room) is included.

Outside, a luxury swim-spa pool sets the tone for mornings and evenings alike — the perfect spot to start the day or unwind at the end of it, surrounded by the clean, well-known air of Zichron Yaakov.

The location offers a rare combination of privacy and everyday convenience: a short walk to quality schools and kindergartens, close to synagogues and green parks, in a warm, safe community setting.

All details and measurements are approximate and subject to verification.`;

const PA_FULL_HE = `יש בתים שמרגישים בהם את השלווה מהרגע הראשון שחוצים את מפתן הדלת. הבית הזה הוא בדיוק כזה — שילוב מושלם בין מרחב, אור טבעי, ואיכות חיים בלתי מתפשרת, במיקום הכי שקט ואיכותי במושבה הצפונית.

נכס שעבר שיפוץ יסודי מהמסד ועד הטפחות, מעוצב בטוב טעם ומוכן לכניסה מיידית — ללא צורך בשום כאב ראש של שיפוצים. רק להביא את המזוודות.

גולת הכותרת: נוחות מקסימלית ללא מדרגות. אחד היתרונות הגדולים והמבוקשים ביותר בבית הוא סוויטת הורים (מאסטר) מפנקת ומרווחת במפלס הכניסה — בלי מדרגות, בלי מאמץ, פרטיות מלאה, נגישות מושלמת ורוגע מוחלט כבר בקומת הקרקע.

הנתונים: שטח מגרש של כחצי דונם של פרטיות וירוק, ושטח בנוי של 220 מ"ר בתכנון אדריכלי חכם ונכון. בבית 7 חדרים מרווחים, מתוכם 2 סוויטות מאסטר מפנקות, וממ"ד. בחצר בריכת זרמים יוקרתית — המקום המושלם לפתוח בו את הבוקר או להירגע בסוף היום, בסביבה שטופת אור טבעי ואוויר צלול.

המיקום: שקט מוחלט במרחק הליכה מהכל. הבית ממוקם בסביבה מעולה ושקטה בחלק הצפוני של המושבה, המציעה שילוב נדיר של פרטיות לצד נגישות מלאה לחיי היום-יום של המשפחה — מרחק הליכה קצר מבתי ספר וגני ילדים איכותיים, קרבה לבתי כנסת ולפארקים ירוקים, וסביבה קהילתית עוטפת ובטוחה.

הזדמנות כזו לא חוזרת לעיתים קרובות — בית שמציע גם חצי דונם, גם סוויטת הורים למטה, גם בריכה וגם שיפוץ מאפס, הוא מוצר נדיר בשוק של היום.

כל הפרטים והמדידות הינם משוערים וכפופים לאימות.`;

const PA = {
  title: "Renovated Home with Private Swim Spa in the Northern Moshava | 7 Rooms",
  title_he: "בית משופץ עם בריכת ספא בחלק הצפוני של המושבה | 7 חדרים",
  slug: "renovated-home-swim-spa-northern-moshava-zichron-yaakov",
  location: "Zichron Yaakov",
  neighborhood_note: "Northern Moshava, Zichron Yaakov – Quiet, Prestigious Setting",
  neighborhood_note_he: "החלק הצפוני של המושבה, זכרון יעקב – שקט ויוקרתי",
  property_type: "Villa",
  tags: [],
  price_label: "6.900.000 ₪",
  price_number: 6.9,
  currency: "ILS",
  price_status: "For Sale",
  property_status: "Active",
  bedrooms: 7,
  bathrooms: null,
  built_sqm: 220,
  lot_sqm: 500,
  parking: null,
  mamad: true,
  storage: null,
  featured: false,
  priority_order: 17,
  short_description:
    "Fully renovated home in the quiet northern moshava of Zichron Yaakov — approximately 220 sqm built on a half-dunam plot, 7 rooms including two master suites (one on the entrance level), a private swim-spa pool, and a mamad.",
  short_description_he:
    "בית משופץ מהיסוד בחלק הצפוני והשקט של המושבה בזכרון יעקב — כ-220 מ\"ר בנוי על מגרש של כחצי דונם, 7 חדרים כולל 2 סוויטות מאסטר (אחת בקומת הכניסה), בריכת ספא פרטית וממ\"ד.",
  full_description: PA_FULL,
  full_description_he: PA_FULL_HE,
};

// ─── Property B: HaCharuv, Yaakov neighborhood ──────────────────────────────
const PB_DIR = "C:\\Users\\Redbo\\Desktop\\להוסיף לאתר\\החרוב";
const PB_ORDER = [
  "ChatGPT Image Aug 10, 2026, 10_29_50 AM (1).png", // hero — facade + garden + deck
  "ChatGPT Image Aug 10, 2026, 10_29_51 AM (2).png", // covered deck lounge + dining
  "ChatGPT Image Aug 10, 2026, 10_29_51 AM (4).png", // bedroom
];

const PB_FULL = `This is a house with character, soul and charm — the kind that's hard to find.

For sale in exclusive representation in Zichron Yaakov's sought-after Yaakov neighborhood: a unique, light-filled detached home, renovated from the ground up to a high standard with attention to every detail.

The home offers approximately 130 sqm of living space and 5 rooms on a generous 400 sqm plot, with a large garden and plenty of natural light throughout. There is also room to grow — additional building rights allow for future expansion.

High ceilings give the home a real sense of space and air, while a pampering parents' suite on the entrance level adds comfort and privacy. The living spaces are bright and inviting, wrapped in complete privacy and a quiet, rustic atmosphere.

The location is hard to beat: close to the historic moshava and to the Ramat Hanadiv nature reserve, offering the best of both worlds — village-like calm minutes from the center of Zichron Yaakov.

All details and measurements are approximate and subject to verification.`;

const PB_FULL_HE = `זהו בית עם אופי, נשמה וקסם שקשה למצוא.

למכירה בייצוג בלעדי בשכונת יעקב המבוקשת בזכרון יעקב: בית בודד ייחודי ומלא אור טבעי, ששופץ מן היסוד ברמה גבוהה תוך הקפדה על כל פרט.

הבית מציע כ-130 מ"ר בנוי ו-5 חדרים על מגרש נדיב של 400 מ"ר, עם גינה גדולה ואור טבעי בשפע. יש גם לאן לגדול — קיימת אפשרות להרחבה והגדלת הבית עם זכויות בנייה נוספות.

תקרות גבוהות מעניקות לבית תחושת מרחב ואוויר, וסוויטת הורים מפנקת בקומת הכניסה מוסיפה נוחות ופרטיות. החללים מוארים ומזמינים, עוטפים בפרטיות מושלמת ואווירה כפרית ושקטה.

המיקום קשה להתחרות בו: קרבה למושבה ההיסטורית ולשמורת הטבע רמת הנדיב, המציעים שילוב של שלווה כפרית במרחק דקות ממרכז זכרון יעקב.

כל הפרטים והמדידות הינם משוערים וכפופים לאימות.`;

const PB = {
  title: "Bright Detached Home with Garden in Yaakov Neighborhood | 5 Rooms",
  title_he: "בית בודד מלא אור עם גינה גדולה בשכונת יעקב | 5 חדרים",
  slug: "detached-home-large-garden-yaakov-neighborhood-zichron-yaakov",
  location: "Zichron Yaakov",
  neighborhood_note: "Yaakov Neighborhood, Zichron Yaakov – Quiet, Sought-After",
  neighborhood_note_he: "שכונת יעקב, זכרון יעקב – שקטה ומבוקשת",
  property_type: "Villa",
  tags: [],
  price_label: "5.800.000 ₪",
  price_number: 5.8,
  currency: "ILS",
  price_status: "For Sale",
  property_status: "Active",
  bedrooms: 5,
  bathrooms: null,
  built_sqm: 130,
  lot_sqm: 400,
  parking: null,
  mamad: null,
  storage: null,
  featured: false,
  priority_order: 18,
  short_description:
    "Fully renovated detached home in Zichron Yaakov's sought-after Yaakov neighborhood — approximately 130 sqm built on a 400 sqm plot with a large garden, 5 bright rooms, a ground-floor master suite, high ceilings, and room to expand.",
  short_description_he:
    "בית בודד ומשופץ ברמה גבוהה בשכונת יעקב המבוקשת בזכרון יעקב — כ-130 מ\"ר בנוי על מגרש 400 מ\"ר עם גינה גדולה, 5 חדרים מוארים, סוויטת הורים בקומת הכניסה ואפשרות הרחבה.",
  full_description: PB_FULL,
  full_description_he: PB_FULL_HE,
};

// ─── Run ─────────────────────────────────────────────────────────────────────
console.log("Uploading Property A images (HaChatzav 74)...");
PA.images = await uploadImages(PA_DIR, PA_ORDER, "hachatzav-74");
console.log("Uploading Property B images (HaCharuv)...");
PB.images = await uploadImages(PB_DIR, PB_ORDER, "hacharuv");

for (const p of [PA, PB]) {
  const { error } = await sb.from("properties_available").insert(p);
  if (error) { console.error(`INSERT FAILED (${p.slug}): ${error.message}`); process.exit(1); }
  console.log(`INSERTED: ${p.slug} (${p.images.length} images)`);
}
console.log("DONE");
