// 5th sold-property entry — corrected text confirmed by user (2026-07-19),
// matches the photos this time (modern architect-designed villa, sea view).
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

async function uploadOne(filePath, tag) {
  const file = readFileSync(filePath);
  const path = `sold/${Date.now()}-${tag}.jpg`;
  const { error } = await sb.storage.from(BUCKET).upload(path, file, { contentType: "image/jpeg", upsert: false });
  if (error) throw new Error(`upload ${tag}: ${error.message}`);
  const { data } = sb.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

const DIR = "C:\\Users\\Redbo\\Desktop\\נמכרו\\שלומי וליטל יונה";

async function main() {
  // Explicit, correct order: facade hero, then living/kitchen/stair interiors.
  const files = [
    "IMG_2359.JPG", // facade with "Y" monogram — hero
    "3EFC0646-580E-4024-9C74-34E7275486CB.jpeg", // living room
    "B9922612-37EF-4EE1-9DFF-8A295B733BC1.jpeg", // living room, alt angle
    "IMG_2339.JPG", // open kitchen/dining + staircase
    "IMG_2356.JPG", // kitchen island, doors to yard
    "FD46DC41-453C-4F42-AD30-84F5987C5615.jpeg", // living room + staircase + TV
  ];

  console.log("Uploading 6 images for Yona villa...");
  const images = [];
  for (let i = 0; i < files.length; i++) {
    const url = await uploadOne(join(DIR, files[i]), `yona-${String(i + 1).padStart(2, "0")}`);
    images.push(url);
    console.log(`  ${i + 1}/6 uploaded`);
  }

  const row = {
    title: "Architect-Designed Villa with Rental Apartment & Sea View | Near Neve Baron",
    neighborhood_note: "HaArava Street, Zichron Yaakov – Near Neve Baron",
    bedrooms: 11,
    built_sqm: 300,
    lot_sqm: 452,
    short_description:
      "An architect-designed home (Mor Balalty) on the quiet HaArava Street near Neve Baron — approximately 300 sqm built across three thoughtfully planned levels on a 452 sqm plot, eleven rooms with a fully staged interior. A pampering parent suite with fishbone parquet flooring, a new Semel Kitchens kitchen, a separate rental apartment with its own entrance facing a sea view, a designed flex room (currently a children's daycare, easily adapted to other uses), spacious children's rooms, a separate mamad, a designed home office, and a large landscaped garden with a built outdoor kitchen and pool option.",
    images,
  };

  const { error } = await sb.from("properties_sold").insert(row);
  if (error) { console.error(`INSERT FAILED: ${error.message}`); process.exit(1); }
  console.log("INSERTED: yona-villa-haarava");
}
main();
