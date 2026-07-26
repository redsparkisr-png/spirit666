// One-time DDL (user-directed 2026-07-16): add Hebrew translation columns to
// properties_available via the Supabase Management API. Nullable — pages fall
// back to the English fields when a translation is absent.
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(resolve(__dirname, "../.env.local"), "utf8");
for (const line of text.split("\n")) {
  const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
}

const ref = new URL(process.env.NEW_SUPABASE_URL).hostname.split(".")[0];
const res = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${process.env.SUPABASE_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    query: `
      ALTER TABLE public.properties_available
        ADD COLUMN IF NOT EXISTS title_he text,
        ADD COLUMN IF NOT EXISTS short_description_he text,
        ADD COLUMN IF NOT EXISTS full_description_he text;
      SELECT column_name FROM information_schema.columns
        WHERE table_name = 'properties_available' AND column_name LIKE '%_he';
    `,
  }),
});
const body = await res.text();
console.log(res.status, body.slice(0, 400));
