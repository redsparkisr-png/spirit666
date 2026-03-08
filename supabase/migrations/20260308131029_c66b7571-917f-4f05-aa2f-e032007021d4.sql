
ALTER TABLE public.lifestyle_gallery
  ADD COLUMN IF NOT EXISTS title_en text DEFAULT '',
  ADD COLUMN IF NOT EXISTS title_he text DEFAULT '',
  ADD COLUMN IF NOT EXISTS description_en text DEFAULT '',
  ADD COLUMN IF NOT EXISTS description_he text DEFAULT '',
  ADD COLUMN IF NOT EXISTS alt_en text DEFAULT '',
  ADD COLUMN IF NOT EXISTS alt_he text DEFAULT '';

-- Seed default content for existing fallback images
UPDATE public.lifestyle_gallery SET
  title_en = COALESCE(NULLIF(caption, ''), 'Zichron Yaakov'),
  title_he = 'זכרון יעקב'
WHERE title_en = '' OR title_en IS NULL;
