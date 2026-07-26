// Hebrew values for parking + neighborhood_note (user-approved 2026-07-16).
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
  "mediterranean-hillside-estate-sea-views-zichron-yaakov": {
    neighborhood_note_he: "המצוק המערבי של זכרון יעקב",
  },
  "french-country-home-near-midrachov-zichron-yaakov": {
    parking_he: 'חניה מקורה של 55 מ"ר עם תשתית מוכנה',
    neighborhood_note_he: "מרכז זכרון יעקב – מבוי שקט ליד המדרחוב",
  },
  "yair-hailanot-new-homes-neve-remez-zichron-yaakov": {
    parking_he: "2 חניות פרטיות",
    neighborhood_note_he: "נווה רמז, זכרון יעקב – ליד גני רמת הנדיב",
  },
  "stone-villa-mountain-views-givat-eden-zichron-yaakov": {
    parking_he: 'חניה פרטית גדולה מקורה + חלל נוסף של 25 מ"ר מתחתיה',
    neighborhood_note_he: "גבעת עדן, זכרון יעקב – שכונה קהילתית ושקטה",
  },
  "renovated-apartment-sea-view-terrace-hashmura-zichron-yaakov": {
    parking_he: "חניה פרטית רשומה בטאבו",
    neighborhood_note_he: "השמורה, זכרון יעקב – מרחק הליכה מהמרכז המסחרי",
  },
  "nili-project-boutique-homes-historic-zichron-yaakov": {
    neighborhood_note_he: "המרכז ההיסטורי של זכרון יעקב – ליד בית אהרנסון",
  },
  "spacious-semi-detached-home-yaakov-neighborhood-zichron-yaakov": {
    neighborhood_note_he: "שכונת יעקב, זכרון יעקב",
  },
  "modern-semi-detached-home-neve-baron-zichron-yaakov": {
    neighborhood_note_he: "נווה הבארון, זכרון יעקב – החלק העליון של השכונה",
  },
  "luxury-estate-panoramic-sea-views-zichron-yaakov": {
    neighborhood_note_he: "גבעת עדן – הרכס הצפון-מערבי – על קו הירוק, מקסימום פרטיות ונוף ים פתוח",
  },
  "renovated-semi-detached-home-hashmura-zichron-yaakov": {
    neighborhood_note_he: "השמורה, זכרון יעקב",
  },
  "beit-bamoshava-new-homes-central-zichron-yaakov": {
    parking_he: "2 חניות פרטיות בטאבו, אחת מקורה",
    neighborhood_note_he: "מרכז זכרון יעקב – רחוב הרצל, ליד המדרחוב ההיסטורי",
  },
  "new-ground-level-homes-neve-baron-pool-zichron-yaakov": {
    neighborhood_note_he: "נווה הבארון העליונה, זכרון יעקב",
  },
  "corner-semi-detached-home-near-midrachov-zichron-yaakov": {
    neighborhood_note_he: "מיקום מרכזי מעולה – מרחק הליכה מהמדרחוב ההיסטורי",
  },
  "new-private-home-near-midrachov-zichron-yaakov": {
    neighborhood_note_he: "מיקום מרכזי מעולה – מרחק הליכה מהמדרחוב, בתי קפה, סופרמרקטים, בנקים ובתי כנסת. שקט ועדיין נגיש לחלוטין.",
  },
  "ramat-zvi-home-open-views-partial-sea-view-zichron-yaakov": {
    neighborhood_note_he: "רמת צבי",
  },
  "hashmura-penthouse-private-roof-sea-view-zichron-yaakov": {
    neighborhood_note_he: "שכונת השמורה",
  },
};

let updated = 0;
for (const [slug, fields] of Object.entries(T)) {
  const { error } = await sb.from("properties_available").update(fields).eq("slug", slug);
  if (error) { console.error(`✗ ${slug}: ${error.message}`); process.exit(1); }
  updated++;
}
console.log(`DONE — ${updated} properties updated (parking/neighborhood note HE)`);
