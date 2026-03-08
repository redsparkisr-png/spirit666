
-- Add new columns to properties_available
ALTER TABLE public.properties_available
  ADD COLUMN IF NOT EXISTS bathrooms integer,
  ADD COLUMN IF NOT EXISTS parking text,
  ADD COLUMN IF NOT EXISTS storage boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS mamad boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS full_description text DEFAULT '',
  ADD COLUMN IF NOT EXISTS google_maps_url text DEFAULT '',
  ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';

-- Create testimonials table
CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  country text DEFAULT '',
  quote_en text NOT NULL DEFAULT '',
  quote_he text DEFAULT '',
  photo_url text DEFAULT '',
  initials text DEFAULT '',
  display_order integer NOT NULL DEFAULT 0,
  is_featured boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Admins can insert testimonials" ON public.testimonials FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update testimonials" ON public.testimonials FOR UPDATE USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete testimonials" ON public.testimonials FOR DELETE USING (has_role(auth.uid(), 'admin'));
