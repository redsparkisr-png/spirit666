// Maps the raw properties_available.property_status value (set in the admin)
// to a display label per language. Unknown values fall through unchanged so
// custom statuses typed in the admin still render.
const STATUS_LABELS: Record<string, { en: string; he: string }> = {
  new: { en: "New", he: "חדש" },
  "under offer": { en: "Under Offer", he: "בהצעה" },
  "price reduced": { en: "Price Reduced", he: "ירידת מחיר" },
  sold: { en: "Sold", he: "נמכר" },
};

export function propertyStatusLabel(status: string, lang: "en" | "he"): string {
  const entry = STATUS_LABELS[status.trim().toLowerCase()];
  return entry ? entry[lang] : status;
}
