
-- =============================================
-- ADDITIVE SCHEMA CHANGES — backward-compatible
-- =============================================

-- 1) Leads: add status tracking and notes for CRM
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'new';
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS notes text;

-- 2) Lifestyle gallery: add category, caption, hero toggle
ALTER TABLE public.lifestyle_gallery ADD COLUMN IF NOT EXISTS category text;
ALTER TABLE public.lifestyle_gallery ADD COLUMN IF NOT EXISTS caption text;
ALTER TABLE public.lifestyle_gallery ADD COLUMN IF NOT EXISTS is_hero boolean NOT NULL DEFAULT false;

-- 3) Properties available: add CMS fields
ALTER TABLE public.properties_available ADD COLUMN IF NOT EXISTS price_number numeric;
ALTER TABLE public.properties_available ADD COLUMN IF NOT EXISTS currency text NOT NULL DEFAULT 'ILS';
ALTER TABLE public.properties_available ADD COLUMN IF NOT EXISTS price_status text NOT NULL DEFAULT 'For Sale';
ALTER TABLE public.properties_available ADD COLUMN IF NOT EXISTS property_status text NOT NULL DEFAULT 'Active';
ALTER TABLE public.properties_available ADD COLUMN IF NOT EXISTS featured boolean NOT NULL DEFAULT false;
ALTER TABLE public.properties_available ADD COLUMN IF NOT EXISTS slug text;
ALTER TABLE public.properties_available ADD COLUMN IF NOT EXISTS meta_title text;
ALTER TABLE public.properties_available ADD COLUMN IF NOT EXISTS meta_description text;
ALTER TABLE public.properties_available ADD COLUMN IF NOT EXISTS og_image text;

-- 4) Properties sold: add matching fields for records moved from available
ALTER TABLE public.properties_sold ADD COLUMN IF NOT EXISTS price_number numeric;
ALTER TABLE public.properties_sold ADD COLUMN IF NOT EXISTS currency text NOT NULL DEFAULT 'ILS';
ALTER TABLE public.properties_sold ADD COLUMN IF NOT EXISTS bedrooms integer;
ALTER TABLE public.properties_sold ADD COLUMN IF NOT EXISTS built_sqm integer;
ALTER TABLE public.properties_sold ADD COLUMN IF NOT EXISTS lot_sqm integer;
ALTER TABLE public.properties_sold ADD COLUMN IF NOT EXISTS neighborhood_note text;
ALTER TABLE public.properties_sold ADD COLUMN IF NOT EXISTS price_label text;

-- 5) RLS: allow admins to update leads (for status/notes management)
CREATE POLICY "Admins can update leads"
ON public.leads
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 6) RLS: allow admins to delete leads
CREATE POLICY "Admins can delete leads"
ON public.leads
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role));
