// Insert new listing (2026-08-17): HaChasida 18 duplex, Halomot Zichron.
// Source: Desktop\להוסיף לאתר\החסידה 18 (owner's Hebrew text + AI-studio-polished
// photos). Deduplicated: dropped raw pre-polish duplicates (5,6,7,9.png — same
// shots as 02/08/09/06 studio versions) and 04 (near-duplicate of 02, same
// terrace/furniture). Kept 8.png (unique small patio, no studio counterpart).
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
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
    const path = `properties/${Date.now()}-${tag}-${String(i + 1).padStart(2, "0")}.jpg`;
    const { error } = await sb.storage.from(BUCKET).upload(path, file, { contentType: "image/jpeg", upsert: false });
    if (error) throw new Error(`upload ${orderedNames[i]}: ${error.message}`);
    const { data } = sb.storage.from(BUCKET).getPublicUrl(path);
    urls.push(data.publicUrl);
    console.log(`  uploaded ${i + 1}/${orderedNames.length}: ${orderedNames[i]}`);
  }
  return urls;
}

const DIR = "C:\\Users\\Redbo\\Desktop\\להוסיף לאתר\\החסידה 18";
const ORDER = [
  "02_large_terrace_studio.png",       // hero — large terrace, panoramic view
  "03_open_eastern_view_studio.png",   // second terrace, distant sea glimpse
  "10_living_room_studio.png",         // living room facing patio door
  "05_open_plan_from_dining_studio.png", // dining + staircase (shows duplex levels)
  "08_living_room_wide_studio.png",    // living room facing open kitchen
  "09_kitchen_dining_studio.png",      // kitchen, breakfast-nook angle
  "07_kitchen_dining_wide_studio.png", // kitchen, dining-table angle
  "8.png",                             // small furnished patio (unique, no studio version)
  "01_urban_view_studio.png",          // street / commercial-center context
  "06_neighborhood_view_studio.png",   // aerial neighborhood view
];

const FULL_EN = `A duplex that gives you space, view — and options most homes simply don't.

For sale in Halomot Zichron, one of the newer and most sought-after residential pockets in Zichron Yaakov: a spacious duplex of approximately 160 sqm on HaChasida Street, spanning the top two floors of one of the neighborhood's newer buildings, with an elevator reaching both levels.

The layout works well for family life as it stands, with 5.5 rooms spread comfortably across two floors — and it also offers something rare: the practical option to divide the unit into two separate homes, a real advantage for buyers who want flexibility in how they plan and use the property, whether for extended family, rental income or future resale.

Two wide terraces are the property's standout feature, opening onto an unobstructed panoramic view to the east — hills, greenery and open sky from every angle, with a partial sea view from select spots. Two private parking spaces complete the package, along with the option for quick possession.

The location adds real convenience: the neighborhood's commercial center sits just across the road, with a Shufersal supermarket, a Maccabi health clinic, a pharmacy and additional services, and schools and kindergartens within walking distance.

This isn't just another large duplex. It's a property that offers space, view, two full floors and flexibility that's hard to find in a standard apartment — in one of Zichron Yaakov's most convenient and family-friendly neighborhoods.

All details and measurements are approximate and subject to verification.`;

const FULL_HE = `למכירה בשכונת חלומות זכרון | דופלקס 5.5 חדרים עם מרחב אמיתי ונוף פתוח

יש נכסים שהיתרון שלהם ברור ברגע שיוצאים למרפסת.

ברחוב חסידה, באחד הבניינים האחרונים שנבנו בשכונת חלומות זכרון, מחכה דופלקס מרווח במיוחד של כ־160 מ"ר בנוי, בשתי הקומות העליונות של הבניין, עם שתי מרפסות רחבות ונוף פנורמי פתוח למזרח.

הבית בנוי על שתי קומות, 5–6, כשהמעלית מגיעה בנוחות לכל אחת מהן. החלוקה מאפשרת מרחב מצוין למשפחה, ובמקביל קיימת גם אפשרות לחלוקה לשתי יחידות נפרדות — יתרון משמעותי למי שמחפש גמישות בתכנון ובשימוש בנכס.

מה מחכה כאן:
• 5.5 חדרים
• כ־160 מ"ר בנוי
• שתי מרפסות מרווחות
• נוף פתוח ופנורמי למזרח
• מעלית המגיעה לשתי הקומות
• 2 חניות פרטיות
• אפשרות לחלוקה ל־2 יחידות נפרדות
• פינוי מהיר

וגם המיקום עושה כאן הבדל: מעבר לכביש נמצא המרכז המסחרי השכונתי עם שופרסל, מכבי, בית מרקחת ושירותים נוספים, ובמרחק הליכה בתי ספר וגני ילדים.

זה לא עוד דופלקס גדול.
זה נכס שנותן מרחב, נוף, שתי קומות וגמישות שקשה למצוא בדירה רגילה — בלב אחת השכונות המבוקשות והנוחות למשפחות בזכרון יעקב.`;

const P = {
  title: "Spacious Duplex with Panoramic Views in Halomot Zichron | 5.5 Rooms",
  slug: "duplex-panoramic-views-halomot-zichron-yaakov",
  location: "Zichron Yaakov",
  neighborhood_note: "Halomot Zichron, Zichron Yaakov – Newer Residential Neighborhood",
  property_type: "Duplex",
  tags: [],
  price_label: "3.800.000 ₪",
  price_number: 3.8,
  currency: "ILS",
  price_status: "For Sale",
  property_status: "Active",
  bedrooms: null, // 5.5 rooms — not a whole number, room count lives in the title instead
  bathrooms: null,
  built_sqm: 160,
  lot_sqm: null,
  parking: "2 private parking spaces",
  mamad: null,
  storage: null,
  featured: false,
  priority_order: 20,
  short_description:
    "Spacious duplex of approximately 160 sqm across the top two floors of a newer building in Halomot Zichron, Zichron Yaakov — 5.5 rooms, two wide terraces with an open panoramic view east, an elevator serving both floors, 2 private parking spaces, and the option to divide into two separate units.",
  full_description: FULL_EN,
  title_he: "דופלקס מרווח עם נוף פנורמי בחלומות זכרון | 5.5 חדרים",
  short_description_he:
    "דופלקס מרווח של כ-160 מ\"ר בקומות העליונות של אחד הבניינים החדשים בשכונת חלומות זכרון בזכרון יעקב — 5.5 חדרים, שתי מרפסות רחבות עם נוף פתוח ופנורמי למזרח, מעלית המגיעה לשתי הקומות, 2 חניות פרטיות, ואפשרות לחלוקה לשתי יחידות נפרדות.",
  full_description_he: FULL_HE,
  parking_he: "2 חניות פרטיות",
  neighborhood_note_he: "חלומות זכרון, זכרון יעקב – שכונת מגורים חדשה",
};

console.log("Uploading HaChasida 18 images...");
P.images = await uploadImages(DIR, ORDER, "hachasida-18");

const { error } = await sb.from("properties_available").insert(P);
if (error) { console.error(`INSERT FAILED (${P.slug}): ${error.message}`); process.exit(1); }
console.log(`INSERTED: ${P.slug} (${P.images.length} images)`);
