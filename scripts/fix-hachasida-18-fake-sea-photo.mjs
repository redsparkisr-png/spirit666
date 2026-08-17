// Fix: 03_open_eastern_view_studio.png (2nd image in the HaChasida 18 gallery)
// showed a false sea-line horizon — an AI "studio" polish artifact; the owner
// confirmed there is no real sea view from this property. Cropped out the
// sky/horizon band (kept the honest rooftop+hills+balcony content below it),
// re-uploaded, and swapped it into the images array in place. Also removes
// the "partial sea view" claim I had added to the EN description, which was
// based on the now-confirmed-false image.
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

const SLUG = "duplex-panoramic-views-halomot-zichron-yaakov";
const OLD_MARKER = "hachasida-18-02.jpg"; // the flawed image's position in the array

// 1. Upload the corrected (cropped) image
const file = readFileSync("C:\\Users\\Redbo\\Desktop\\להוסיף לאתר\\החסידה 18\\03_open_eastern_view_cropped.png");
const path = `properties/${Date.now()}-hachasida-18-02-fixed.jpg`;
const { error: upErr } = await sb.storage.from("images").upload(path, file, { contentType: "image/jpeg", upsert: false });
if (upErr) { console.error("upload:", upErr.message); process.exit(1); }
const { data: pub } = sb.storage.from("images").getPublicUrl(path);
console.log("New image URL:", pub.publicUrl);

// 2. Swap it into the images array + fix the EN description's sea claim
const { data: row, error: readErr } = await sb
  .from("properties_available")
  .select("images,full_description")
  .eq("slug", SLUG)
  .single();
if (readErr) { console.error("read:", readErr.message); process.exit(1); }

const newImages = row.images.map((u) => (u.includes(OLD_MARKER) ? pub.publicUrl : u));
const newFullDescription = row.full_description.replace(
  "Two wide terraces are the property's standout feature, opening onto an unobstructed panoramic view to the east — hills, greenery and open sky from every angle, with a partial sea view from select spots. Two private parking spaces complete the package, along with the option for quick possession.",
  "Two wide terraces are the property's standout feature, opening onto an unobstructed panoramic view to the east — hills, greenery and open sky from every angle. Two private parking spaces complete the package, along with the option for quick possession."
);

if (newFullDescription === row.full_description) {
  console.error("WARNING: full_description text replacement did not match — description left unchanged, check manually.");
}

const { error: updErr } = await sb
  .from("properties_available")
  .update({ images: newImages, full_description: newFullDescription })
  .eq("slug", SLUG);
if (updErr) { console.error("update:", updErr.message); process.exit(1); }

console.log("DONE — images array + full_description updated.");
