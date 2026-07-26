// Fallback path: Supabase Management API token expired, so run the
// user-approved ALTER TABLE via a direct Postgres connection instead.
import pg from "pg";
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
const password = encodeURIComponent(process.env.NEW_SUPABASE_DB_PASSWORD);
const connectionString = `postgresql://postgres:${password}@db.${ref}.supabase.co:5432/postgres`;

const client = new pg.Client({ connectionString, ssl: { rejectUnauthorized: false } });
try {
  await client.connect();
  await client.query(`
    ALTER TABLE public.properties_sold
      ADD COLUMN IF NOT EXISTS title_he text,
      ADD COLUMN IF NOT EXISTS neighborhood_note_he text,
      ADD COLUMN IF NOT EXISTS short_description_he text;
  `);
  const { rows } = await client.query(`
    SELECT column_name FROM information_schema.columns
      WHERE table_name = 'properties_sold' AND column_name LIKE '%_he';
  `);
  console.log("OK, columns:", rows.map((r) => r.column_name).join(", "));
} catch (e) {
  console.error("FAILED:", e.message);
  process.exitCode = 1;
} finally {
  await client.end().catch(() => {});
}
