// Insert 4 sold-property proof entries (user-directed 2026-07-19).
// properties_sold has no _he columns (unlike properties_available) and the
// one existing sample row is English — matching that convention. Facts are
// derived only from the owner's raw Hebrew text; no price included (the
// figure given was an asking/marketing price, not a confirmed sale price).
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

const BASE = "C:\\Users\\Redbo\\Desktop\\נמכרו";

const ROWS = [
  {
    tag: "givat-eden-hatzav-58",
    file: join(BASE, "גבעת עדן החצב 58", "גבעת עדן החצב 58.jpg"),
    title: "Renovated Semi-Detached Home in the Tuscana Project | Givat Eden",
    neighborhood_note: "Givat Eden, Zichron Yaakov",
    bedrooms: 4,
    built_sqm: 190,
    lot_sqm: 250,
    short_description:
      "Fully renovated and designed semi-detached home in the 'Tuscana' project, Givat Eden — the largest in the project at approximately 190 sqm built on a quarter-dunam plot, with a parent suite, three designed children's rooms, a separate mamad, a quality carpenter kitchen, two covered parking spaces and a large maintained garden.",
  },
  {
    tag: "givat-eden-schneiderman",
    file: join(BASE, "רמי שניידמן גבעת עדן", "גבעת עדן.jpg"),
    title: "Country-Style Villa with Mountain Views & Accessory Unit | Givat Eden",
    neighborhood_note: "Givat Eden (East), Zichron Yaakov",
    bedrooms: 6,
    built_sqm: 220,
    lot_sqm: 450,
    short_description:
      "Warm country-style villa in the eastern part of Givat Eden — approximately 220 sqm built on a 450 sqm plot, six rooms including a parent suite with a view balcony and four further bedrooms with a family corner, plus a separate roughly 70 sqm accessory unit with two rooms, its own entrance and garden. Mature garden with fruit trees and a BBQ area, and two covered parking spaces, with mountain views from every window.",
  },
  {
    tag: "sderot-nili",
    file: join(BASE, "שדרות נילי", "שדרות נילי.jpg"),
    title: "Single-Level Home with Large Garden Near the Midrachov | Sderot Nili",
    neighborhood_note: "Sderot Nili, Zichron Yaakov – Near the Historic Midrachov",
    bedrooms: 4,
    built_sqm: 130,
    lot_sqm: 300,
    short_description:
      "A rare single-level home on a quiet street within walking distance of the historic Midrachov — approximately 130 sqm built on a 300 sqm plot, three designed children's rooms plus a separate parent suite with an ensuite bathroom, modern country-style design, attached parking, and a large maintained garden with a gazebo, seating corners and a jacuzzi.",
  },
  {
    tag: "shir-givat-eden",
    file: join(BASE, "שיר גבעת עדן", "שיר.jpg"),
    title: "Designed Villa with Exposed Wood Ceilings & Pool Option | Givat Eden",
    neighborhood_note: "Givat Eden, Zichron Yaakov",
    bedrooms: 5,
    built_sqm: 240,
    lot_sqm: 500,
    short_description:
      "A meticulously designed villa in Givat Eden with exposed high wood ceilings and a modern country character — approximately 240 sqm built on a half-dunam plot, a bright entry level with an ensuite bedroom, an elaborate parent suite with a view balcony, three designed children's rooms, a gallery-level office, a separate mamad, a quality equipped kitchen, two parking spaces, a large landscaped garden, and the option to add a pool.",
  },
];

for (const r of ROWS) {
  console.log(`Uploading: ${r.tag}`);
  const imageUrl = await uploadOne(r.file, r.tag);
  const { error } = await sb.from("properties_sold").insert({
    title: r.title,
    neighborhood_note: r.neighborhood_note,
    bedrooms: r.bedrooms,
    built_sqm: r.built_sqm,
    lot_sqm: r.lot_sqm,
    short_description: r.short_description,
    images: [imageUrl],
  });
  if (error) { console.error(`INSERT FAILED (${r.tag}): ${error.message}`); process.exit(1); }
  console.log(`INSERTED: ${r.tag}`);
}
console.log("DONE");
