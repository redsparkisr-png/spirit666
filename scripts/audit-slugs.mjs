/**
 * DRY-RUN slug audit for properties_available.
 * Reads SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY from env.
 * Run: node scripts/audit-slugs.mjs
 */
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing env vars. Run with dotenv: node -r dotenv/config scripts/audit-slugs.mjs dotenv_config_path=.env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

function toSlug(title, location, propertyType) {
  const parts = [title, location, "zichron-yaakov"].filter(Boolean);
  return parts
    .join(" ")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

function isUUID(str) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);
}

function isCleanSlug(slug) {
  if (!slug) return false;
  if (isUUID(slug)) return false;
  return /^[a-z0-9-]+$/.test(slug) && slug.length >= 5;
}

const { data: properties, error } = await supabase
  .from("properties_available")
  .select("id, title, slug, location, property_type, bedrooms")
  .order("created_at", { ascending: true });

if (error) {
  console.error("Supabase error:", error.message);
  process.exit(1);
}

console.log(`\nTotal properties: ${properties.length}\n`);

const slugsSeen = new Set();
const rows = [];

for (const p of properties) {
  let status = [];
  let risk = [];

  if (!p.slug) {
    status.push("NULL_SLUG");
    risk.push("served at UUID URL");
  } else if (p.slug === "") {
    status.push("EMPTY_SLUG");
    risk.push("served at UUID URL");
  } else if (isUUID(p.slug)) {
    status.push("UUID_AS_SLUG");
    risk.push("slug column is UUID, no clean URL");
  } else if (!isCleanSlug(p.slug)) {
    status.push("DIRTY_SLUG");
    risk.push("contains non-alphanumeric characters");
  } else {
    status.push("CLEAN");
  }

  if (p.slug && slugsSeen.has(p.slug)) {
    status.push("DUPLICATE_SLUG");
    risk.push("duplicate slug — two properties share same URL");
  }
  if (p.slug) slugsSeen.add(p.slug);

  const proposed = status.includes("CLEAN") ? p.slug : toSlug(p.title, p.location, p.property_type);

  rows.push({
    id: p.id.slice(0, 8) + "…",
    full_id: p.id,
    title: (p.title || "").slice(0, 45),
    current_slug: p.slug || "(null)",
    proposed_slug: proposed,
    status: status.join(", "),
    risk: risk.join("; ") || "none",
  });
}

// Summary
const nullSlug = rows.filter(r => r.status.includes("NULL_SLUG") || r.status.includes("EMPTY_SLUG"));
const uuidSlug = rows.filter(r => r.status.includes("UUID_AS_SLUG"));
const dirtySlug = rows.filter(r => r.status.includes("DIRTY_SLUG"));
const dupSlug = rows.filter(r => r.status.includes("DUPLICATE_SLUG"));
const clean = rows.filter(r => r.status === "CLEAN");

console.log("=== SLUG AUDIT SUMMARY ===");
console.log(`✅ Clean slugs:          ${clean.length}`);
console.log(`❌ NULL/empty slug:      ${nullSlug.length}  (served at UUID URL)`);
console.log(`❌ UUID stored as slug:  ${uuidSlug.length}`);
console.log(`⚠️  Dirty slugs:         ${dirtySlug.length}`);
console.log(`⚠️  Duplicate slugs:     ${dupSlug.length}`);

console.log("\n=== FULL PROPERTY TABLE ===");
console.log(
  ["id", "title", "current_slug", "proposed_slug", "status", "risk_notes"]
    .join(" | ")
);
console.log("-".repeat(120));
for (const r of rows) {
  console.log([r.id, r.title.padEnd(45), r.current_slug.slice(0,40).padEnd(40), r.proposed_slug.slice(0,50).padEnd(50), r.status.padEnd(20), r.risk].join(" | "));
}

console.log("\n=== PROPERTIES NEEDING DB SLUG BACKFILL ===");
const needsBackfill = rows.filter(r => !r.status.includes("CLEAN"));
for (const r of needsBackfill) {
  console.log(`\n  ID:       ${r.full_id}`);
  console.log(`  Title:    ${r.title}`);
  console.log(`  Current:  ${r.current_slug}`);
  console.log(`  Proposed: ${r.proposed_slug}`);
  console.log(`  Status:   ${r.status}`);
  console.log(`  Risk:     ${r.risk}`);
}

console.log("\n[DRY RUN — no DB changes made]");
