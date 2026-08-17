// Upload the HaChasida 18 marketing flyer (from the user's ChatGPT "Skill
// Spirit" workflow) to storage marketing/ — distribution only, not a
// property-gallery image, per the property-flyer skill's Job 2 role.
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

const file = readFileSync("C:\\Users\\Redbo\\Desktop\\להוסיף לאתר\\החסידה 18\\ChatGPT Image Aug 17, 2026, 12_39_17 PM.png");
const path = `marketing/hachasida-18-flyer-${Date.now()}.png`;
const { error } = await sb.storage.from("images").upload(path, file, { contentType: "image/png", upsert: false });
if (error) { console.error(error.message); process.exit(1); }
const { data } = sb.storage.from("images").getPublicUrl(path);
console.log("Flyer public URL:", data.publicUrl);
