// Language-aware accessors for property content. Hebrew columns are optional
// (nullable) — every accessor falls back to the English source field, so
// untranslated properties keep working everywhere.

type PropertyText = {
  title: string;
  short_description?: string | null;
  full_description?: string | null;
  title_he?: string | null;
  short_description_he?: string | null;
  full_description_he?: string | null;
};

export const propertyTitle = (p: PropertyText, lang: string): string =>
  (lang === "he" && p.title_he) || p.title;

export const propertyShortDescription = (p: PropertyText, lang: string): string | null =>
  (lang === "he" && p.short_description_he) || p.short_description || null;

export const propertyFullDescription = (p: PropertyText, lang: string): string | null =>
  (lang === "he" && p.full_description_he) || p.full_description || null;

// DB convention stores price_number in millions of ILS (e.g. 7.8). Schema.org
// offers.price must be the full amount. Values ≥ 100k are treated as already-full.
export const schemaPrice = (priceNumber: number): number =>
  priceNumber < 100000 ? Math.round(priceNumber * 1_000_000) : priceNumber;
