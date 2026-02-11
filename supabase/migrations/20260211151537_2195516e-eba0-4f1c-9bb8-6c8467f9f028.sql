
-- Properties Available
CREATE TABLE public.properties_available (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  short_description TEXT,
  lot_sqm INTEGER,
  built_sqm INTEGER,
  bedrooms INTEGER,
  neighborhood_note TEXT,
  price_label TEXT,
  images TEXT[] DEFAULT '{}',
  priority_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.properties_available ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Anyone can view available properties"
  ON public.properties_available FOR SELECT
  USING (true);

-- Authenticated write
CREATE POLICY "Authenticated users can insert available properties"
  ON public.properties_available FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update available properties"
  ON public.properties_available FOR UPDATE
  TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete available properties"
  ON public.properties_available FOR DELETE
  TO authenticated USING (true);

-- Properties Sold
CREATE TABLE public.properties_sold (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  short_description TEXT,
  images TEXT[] DEFAULT '{}',
  sold_date TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.properties_sold ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view sold properties"
  ON public.properties_sold FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert sold properties"
  ON public.properties_sold FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update sold properties"
  ON public.properties_sold FOR UPDATE
  TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete sold properties"
  ON public.properties_sold FOR DELETE
  TO authenticated USING (true);

-- Lifestyle Gallery
CREATE TABLE public.lifestyle_gallery (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0
);

ALTER TABLE public.lifestyle_gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view lifestyle gallery"
  ON public.lifestyle_gallery FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert lifestyle gallery"
  ON public.lifestyle_gallery FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update lifestyle gallery"
  ON public.lifestyle_gallery FOR UPDATE
  TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete lifestyle gallery"
  ON public.lifestyle_gallery FOR DELETE
  TO authenticated USING (true);

-- Leads
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  message TEXT,
  source TEXT NOT NULL DEFAULT 'landing_page',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view leads"
  ON public.leads FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "Anyone can insert leads"
  ON public.leads FOR INSERT
  WITH CHECK (true);

-- Storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

CREATE POLICY "Anyone can view images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'images');

CREATE POLICY "Authenticated users can upload images"
  ON storage.objects FOR INSERT
  TO authenticated WITH CHECK (bucket_id = 'images');

CREATE POLICY "Authenticated users can update images"
  ON storage.objects FOR UPDATE
  TO authenticated USING (bucket_id = 'images');

CREATE POLICY "Authenticated users can delete images"
  ON storage.objects FOR DELETE
  TO authenticated USING (bucket_id = 'images');
