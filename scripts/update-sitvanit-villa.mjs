// Owner corrections (2026-07-16): price 6.0M → 6.2M; construction is Jerusalem
// stone + concrete with double insulation (NOT stone cladding). EN + HE.
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

const SLUG = "stone-villa-mountain-views-givat-eden-zichron-yaakov";

// Fetch current, patch the exact phrases, write back.
const { data: p, error: e1 } = await sb
  .from("properties_available")
  .select("short_description, full_description, full_description_he")
  .eq("slug", SLUG)
  .single();
if (e1) { console.error(e1.message); process.exit(1); }

const patch = {
  price_label: "6.200.000 ₪",
  price_number: 6.2,
  title_he: "וילה כפרית מאבן ירושלמית מול נוף הרים בגבעת עדן | 6 חדרים",
  short_description: p.short_description.replace(
    "Country-style stone-clad villa in Givat Eden",
    "Country-style villa built of Jerusalem stone and concrete in Givat Eden"
  ),
  full_description: p.full_description.replace(
    "finished in natural stone cladding with double insulation",
    "built of Jerusalem stone and concrete with double insulation"
  ),
  full_description_he: p.full_description_he.replace(
    "עם חיפוי אבן טבעית ובידוד כפול",
    "בנויה אבן ובטון ירושלמית עם בידודים כפולים"
  ),
};

// Guard: verify every replacement actually took (no silent no-ops).
if (patch.short_description === p.short_description) { console.error("short_description phrase not found"); process.exit(1); }
if (patch.full_description === p.full_description) { console.error("full_description phrase not found"); process.exit(1); }
if (patch.full_description_he === p.full_description_he) { console.error("full_description_he phrase not found"); process.exit(1); }

const { error: e2 } = await sb.from("properties_available").update(patch).eq("slug", SLUG);
if (e2) { console.error(e2.message); process.exit(1); }
console.log("UPDATED: price 6.2M + Jerusalem stone construction (EN+HE)");
