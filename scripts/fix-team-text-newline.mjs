// Fix literal "\n" (backslash+n, not an actual newline) in site_content
// key "team.text" — found live on homepage 2026-08-08, rendered as visible
// "\n" text because whitespace-pre-line only converts real newline chars.
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

const { data: rows, error: readErr } = await sb.from("site_content").select("*").eq("key", "team.text");
if (readErr) { console.error(readErr.message); process.exit(1); }
if (!rows || rows.length === 0) { console.error("No row found for key=team.text"); process.exit(1); }

console.log("BEFORE:", JSON.stringify(rows[0], null, 2));

const row = rows[0];
const fixed_en = row.value_en?.replace(/\\n/g, "\n");
const fixed_he = row.value_he?.replace(/\\n/g, "\n");

const { error: updErr } = await sb
  .from("site_content")
  .update({ value_en: fixed_en, value_he: fixed_he })
  .eq("key", "team.text");
if (updErr) { console.error(updErr.message); process.exit(1); }

console.log("AFTER value_en:", JSON.stringify(fixed_en));
console.log("AFTER value_he:", JSON.stringify(fixed_he));
console.log("DONE");
