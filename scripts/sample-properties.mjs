// Read-only: sample existing properties to match tone/structure for a new insert.
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

const { data, error } = await sb
  .from("properties_available")
  .select("title, slug, location, neighborhood_note, property_type, tags, price_label, price_number, currency, price_status, property_status, bedrooms, bathrooms, built_sqm, lot_sqm, parking, mamad, storage, featured, priority_order, short_description, full_description, meta_title, meta_description, google_maps_url")
  .order("priority_order", { ascending: true })
  .limit(3);

if (error) { console.error(error.message); process.exit(1); }
for (const p of data) {
  console.log("=".repeat(70));
  for (const [k, v] of Object.entries(p)) {
    if (k === "full_description") console.log(`${k}: ${String(v).slice(0, 900)}...[truncated]`);
    else console.log(`${k}:`, v);
  }
}
