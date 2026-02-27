
-- Search Locations table
CREATE TABLE public.search_locations (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name_en text NOT NULL,
  name_he text NOT NULL,
  display_order integer NOT NULL DEFAULT 0
);
ALTER TABLE public.search_locations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view search locations" ON public.search_locations FOR SELECT USING (true);
CREATE POLICY "Admins can insert search locations" ON public.search_locations FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update search locations" ON public.search_locations FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete search locations" ON public.search_locations FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Search Property Types table
CREATE TABLE public.search_property_types (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name_en text NOT NULL,
  name_he text NOT NULL,
  display_order integer NOT NULL DEFAULT 0
);
ALTER TABLE public.search_property_types ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view search property types" ON public.search_property_types FOR SELECT USING (true);
CREATE POLICY "Admins can insert search property types" ON public.search_property_types FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update search property types" ON public.search_property_types FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete search property types" ON public.search_property_types FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Seed locations
INSERT INTO public.search_locations (name_en, name_he, display_order) VALUES
  ('Zichron Yaakov', 'זכרון יעקב', 1),
  ('Caesarea', 'קיסריה', 2),
  ('Pardes Hanna-Karkur', 'פרדס חנה-כרכור', 3),
  ('Binyamina', 'בנימינה', 4),
  ('Atlit', 'עתלית', 5);

-- Seed property types
INSERT INTO public.search_property_types (name_en, name_he, display_order) VALUES
  ('Villa', 'וילה', 1),
  ('Apartment', 'דירה', 2),
  ('Cottage', 'קוטג׳', 3),
  ('Penthouse', 'פנטהאוז', 4),
  ('Land', 'מגרש', 5);

-- Add location and property_type columns to properties_available (non-breaking)
ALTER TABLE public.properties_available ADD COLUMN location text;
ALTER TABLE public.properties_available ADD COLUMN property_type text;
