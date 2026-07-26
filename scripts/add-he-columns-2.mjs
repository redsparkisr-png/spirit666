// User-approved (2026-07-16, "מאושר תבצע"): add Hebrew columns for the two
// remaining free-text property fields — parking and neighborhood_note.
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
        ADD COLUMN IF NOT EXISTS parking_he text,
        ADD COLUMN IF NOT EXISTS neighborhood_note_he text;
      SELECT column_name FROM information_schema.columns
        WHERE table_name = 'properties_available' AND column_name IN ('parking_he','neighborhood_note_he');
    `,
  }),
});
console.log(res.status, (await res.text()).slice(0, 300));
