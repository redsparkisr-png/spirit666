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

const { data, error } = await sb.storage.from("images").list("properties", { limit: 500 });
if (error) { console.error(error.message); process.exit(1); }
console.log("total files:", data.length);
const recent = data.filter((f) => f.name.includes("villa") || f.name.includes("hashmura"));
console.log("new uploads found:", recent.length);
for (const f of recent.slice(0, 3)) console.log("  sample:", f.name);
