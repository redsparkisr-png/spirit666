/**
 * Creates the guide_tokens table using Supabase service role key.
 * Run once: node scripts/create-guide-tokens.mjs
 */
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const envPath = resolve(__dirname, "../.env.local");
const env = {};
for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const idx = trimmed.indexOf("=");
  if (idx === -1) continue;
  const key = trimmed.slice(0, idx).trim();
  let val = trimmed.slice(idx + 1).trim();
  if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
    val = val.slice(1, -1);
  }
  env[key] = val;
}

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = env.NEW_SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error("Missing env vars. Found keys:", Object.keys(env).filter(k => k.includes("SUPA")).join(", "));
  process.exit(1);
}

const { createClient } = await import("@supabase/supabase-js");
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// Check if table exists
console.log("Checking guide_tokens table...");
const { error } = await supabase.from("guide_tokens").select("token").limit(1);

if (!error) {
  console.log("✅ guide_tokens table already exists and is accessible!");
  const { count } = await supabase.from("guide_tokens").select("*", { count: "exact", head: true });
  console.log(`   ${count ?? 0} tokens in the DB`);
  process.exit(0);
}

console.log("\n⚠️  guide_tokens table does not exist yet (error:", error.message, ")\n");
console.log("Run this SQL in your Supabase SQL Editor:");
console.log("Dashboard → SQL Editor → New Query → paste → Run\n");
console.log("═".repeat(65));
console.log(`
create table if not exists guide_tokens (
  token                 uuid primary key default gen_random_uuid(),
  created_at            timestamptz not null default now(),
  sent_to               text,
  first_accessed_at     timestamptz,
  is_revoked            boolean not null default false
);

alter table guide_tokens enable row level security;

create policy "Anyone can verify a token"
  on guide_tokens for select using (true);

create policy "Admin can manage tokens"
  on guide_tokens for all
  using (
    exists (
      select 1 from user_roles
      where user_id = auth.uid() and role = 'admin'
    )
  );
`);
console.log("═".repeat(65));
console.log("\nAfter running the SQL above, re-run: node scripts/create-guide-tokens.mjs");
