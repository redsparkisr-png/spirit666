// Insert two new exclusive listings (2026-07-16): Sitvanit 35 villa (Givat Eden)
// and HaPnina renovated apartment (HaShmura). Uploads photos to storage then
// inserts rows. Copy is tone-matched to existing listings, derived only from
// the owner's approved Hebrew source text.
import { createClient } from "@supabase/supabase-js";
import { readFileSync, readdirSync } from "node:fs";
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

// ─── Property 1: Sitvanit 35 villa, Givat Eden ──────────────────────────────
const P1_DIR = "C:\\Users\\Redbo\\Desktop\\נכסים\\בטיפול\\סתוונית 35 וילה גבעת עדן\\fwd35\\fb";
const P1_ORDER = [
  "צילום נכסים ונדל״ן-17.jpg", // hero — stone facade + garden
  "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg",
  "צילום נכסים ונדל״ן-8.jpg", "צילום נכסים ונדל״ן-9.jpg", "צילום נכסים ונדל״ן-12.jpg",
  "צילום נכסים ונדל״ן-14.jpg", "צילום נכסים ונדל״ן-19.jpg",
  "צילום נכסים ונדל״ן-20.jpg", // portrait — last
];

const P1_FULL = `Some homes simply have character. This one was built with it.

For sale in exclusive representation in Givat Eden, Zichron Yaakov: a country-style villa on Sitvanit Street, finished in natural stone cladding with double insulation, set on a generous plot facing open mountain views. Every day here starts with clear air, quiet and an open view to the hills.

The home spans approximately 289 sqm of smartly planned living space on a plot of about 470 sqm. The entrance level is especially bright and spacious, with high ceilings and a warm, country-style living area that sets the tone for the whole house.

The large, practical kitchen was made for real cooking and hosting, with generous storage and a separate pantry. The living room opens directly onto the garden — a wide, green, quiet space with pleasant seating corners, fruit trees and a pastoral atmosphere that is hard to replicate.

The parents' suite is a chapter of its own: approximately 40 sqm of privacy, with its own bathroom.

The home offers 6 rooms plus a mamad (safe room). A large covered private parking structure includes an additional 25 sqm space beneath it — ideal for a home office, studio or extra storage.

Givat Eden is one of Zichron Yaakov's quality community neighborhoods — quiet, green and family-oriented, close to parks, schools and kindergartens, and a short drive from the historic Midrachov and everything people love about Zichron.`;

const P1 = {
  title: "Country-Style Stone Villa with Mountain Views in Givat Eden | 6 Rooms",
  slug: "stone-villa-mountain-views-givat-eden-zichron-yaakov",
  location: "Zichron Yaakov",
  neighborhood_note: "Givat Eden, Zichron Yaakov – Quiet Community Neighborhood",
  property_type: "Villa",
  tags: [],
  price_label: "6.000.000 ₪",
  price_number: 6,
  currency: "ILS",
  price_status: "For Sale",
  property_status: "Active",
  bedrooms: 6,
  bathrooms: null,
  built_sqm: 289,
  lot_sqm: 470,
  parking: "Large covered private parking + 25 sqm additional space beneath",
  mamad: true,
  storage: false,
  featured: false,
  priority_order: 2,
  short_description:
    "Country-style stone-clad villa in Givat Eden, Zichron Yaakov — approximately 289 sqm built on a 470 sqm plot, 6 rooms plus mamad, a 40 sqm parents' suite, a landscaped garden with fruit trees, and covered private parking, facing open mountain views.",
  full_description: P1_FULL,
};

// ─── Property 2: HaPnina, HaShmura apartment ────────────────────────────────
const P2_DIR = "C:\\Users\\Redbo\\Desktop\\נכסים\\בטיפול\\הפנינה 2\\jm_BUv2Bau280W9kpM\\fb\\New folder";
const P2_ORDER = [
  "ללא לוגו-2.jpg", // hero — living room opening to the sea-view terrace
  "ללא לוגו-3.jpg", "ללא לוגו-5.jpg", "ללא לוגו-6.jpg", "ללא לוגו-7.jpg",
  "ללא לוגו-11.jpg", "ללא לוגו-15.jpg", "ללא לוגו-16.jpg", "ללא לוגו-17.jpg",
  "ללא לוגו-18.jpg", "ללא לוגו-21.jpg",
];

const P2_FULL = `Zichron Yaakov has no shortage of apartments with a view. A 42 sqm terrace facing the open sea is a different story.

For sale in the quiet HaShmura neighborhood: a 3.5-room apartment renovated from the ground up — bright, warm and completely move-in ready, with an open sea view that stays with you from the moment you walk in.

The truth is, the heart of this home is the terrace. Roughly 42 sqm of open space facing the sea, with direct access from the living room and from the bedrooms. Morning coffee, evening sunsets, hosting friends — or simply a quiet moment in front of the water.

The apartment suits anyone looking for real quality of life in Zichron: the calm of HaShmura, an open view, walking distance to the supermarket, cafes, the synagogue and the commercial center — with private parking registered in the Tabu.

It can be a perfect home for a couple looking for something warm, accessible and comfortable. It can be a special vacation apartment in Zichron Yaakov. And it can be an interesting opportunity for investors who understand how rare it is to find a renovated apartment with a terrace like this, a sea view like this and a location like this.

Some properties you understand from the spec sheet. Others you only understand standing on the terrace. This is one of them.`;

const P2 = {
  title: "Renovated 3.5-Room Apartment with a 42 sqm Sea-View Terrace | HaShmura",
  slug: "renovated-apartment-sea-view-terrace-hashmura-zichron-yaakov",
  location: "Zichron Yaakov",
  neighborhood_note: "HaShmura, Zichron Yaakov – Walking Distance to the Commercial Center",
  property_type: "Apartment",
  tags: [],
  price_label: "3.300.000 ₪",
  price_number: 3.3,
  currency: "ILS",
  price_status: "For Sale",
  property_status: "Active",
  bedrooms: 3.5,
  bathrooms: null,
  built_sqm: null,
  lot_sqm: null,
  parking: "Private parking registered in the Tabu",
  mamad: null,
  storage: false,
  featured: false,
  priority_order: 3,
  short_description:
    "Fully renovated 3.5-room apartment in Zichron Yaakov's quiet HaShmura neighborhood — bright, move-in ready, with an open sea view, a rare 42 sqm terrace off the living room, and private parking registered in the Tabu.",
  full_description: P2_FULL,
};

// ─── Run ─────────────────────────────────────────────────────────────────────
console.log("Uploading Property 1 images (villa)...");
P1.images = await uploadImages(P1_DIR, P1_ORDER, "villa-givat-eden");
console.log("Uploading Property 2 images (apartment)...");
P2.images = await uploadImages(P2_DIR, P2_ORDER, "hashmura-apt");

for (const p of [P1, P2]) {
  const { error } = await sb.from("properties_available").insert(p);
  if (error) { console.error(`INSERT FAILED (${p.slug}): ${error.message}`); process.exit(1); }
  console.log(`INSERTED: ${p.slug} (${p.images.length} images)`);
}
console.log("DONE");
