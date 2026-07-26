// Export all properties' EN content to translate into Hebrew.
import { createClient } from "@supabase/supabase-js";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(resolve(__dirname, "../.env.local"), "utf8");
for (const line of text.split("\n")) {
  const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
}
const sb = createClient(process.env.NEW_SUPABASE_URL, process.env.NEW_SUPABASE_SERVICE_ROLE_KEY);

const { data, error } = await sb
  .from("properties_available")
  .select("id, slug, title, short_description, full_description")
  .order("priority_order", { ascending: true });
if (error) { console.error(error.message); process.exit(1); }
console.log(`${data.length} properties`);
writeFileSync(resolve(__dirname, "properties-en-export.json"), JSON.stringify(data, null, 2));
for (const p of data) console.log(`- ${p.slug} (full: ${(p.full_description || "").length} chars)`);
