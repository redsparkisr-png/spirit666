// Retry the HaShmura apartment insert reusing the already-uploaded images.
// bedrooms must be an integer — 3.5 rooms stays in the title (same convention
// as the French-country listing which keeps rooms out of the bedrooms field).
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

const { data: files, error: listErr } = await sb.storage.from("images").list("properties", { limit: 500, sortBy: { column: "name", order: "asc" } });
if (listErr) { console.error(listErr.message); process.exit(1); }
const apt = files.filter((f) => f.name.includes("hashmura-apt")).map((f) => f.name).sort();
if (apt.length !== 11) { console.error(`expected 11 hashmura-apt images, found ${apt.length}`); process.exit(1); }
const images = apt.map((n) => sb.storage.from("images").getPublicUrl(`properties/${n}`).data.publicUrl);
console.log(`reusing ${images.length} uploaded images`);

const P2_FULL = `Zichron Yaakov has no shortage of apartments with a view. A 42 sqm terrace facing the open sea is a different story.

For sale in the quiet HaShmura neighborhood: a 3.5-room apartment renovated from the ground up — bright, warm and completely move-in ready, with an open sea view that stays with you from the moment you walk in.

The truth is, the heart of this home is the terrace. Roughly 42 sqm of open space facing the sea, with direct access from the living room and from the bedrooms. Morning coffee, evening sunsets, hosting friends — or simply a quiet moment in front of the water.

The apartment suits anyone looking for real quality of life in Zichron: the calm of HaShmura, an open view, walking distance to the supermarket, cafes, the synagogue and the commercial center — with private parking registered in the Tabu.

It can be a perfect home for a couple looking for something warm, accessible and comfortable. It can be a special vacation apartment in Zichron Yaakov. And it can be an interesting opportunity for investors who understand how rare it is to find a renovated apartment with a terrace like this, a sea view like this and a location like this.

Some properties you understand from the spec sheet. Others you only understand standing on the terrace. This is one of them.`;

const { error } = await sb.from("properties_available").insert({
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
  bedrooms: null,
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
  images,
});
if (error) { console.error(`INSERT FAILED: ${error.message}`); process.exit(1); }
console.log("INSERTED: renovated-apartment-sea-view-terrace-hashmura-zichron-yaakov");
