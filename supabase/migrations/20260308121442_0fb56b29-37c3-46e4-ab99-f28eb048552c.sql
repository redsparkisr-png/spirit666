
CREATE TABLE public.buyer_guide_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_number integer NOT NULL UNIQUE,
  title text NOT NULL DEFAULT '',
  subtitle text NOT NULL DEFAULT '',
  body text NOT NULL DEFAULT '',
  images text[] DEFAULT ARRAY[]::text[],
  image_captions text[] DEFAULT ARRAY[]::text[],
  quote_text text DEFAULT '',
  quote_source text DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.buyer_guide_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view guide sections" ON public.buyer_guide_sections FOR SELECT USING (true);
CREATE POLICY "Admins can insert guide sections" ON public.buyer_guide_sections FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can update guide sections" ON public.buyer_guide_sections FOR UPDATE USING (public.has_role(auth.uid(), 'admin'::public.app_role));
CREATE POLICY "Admins can delete guide sections" ON public.buyer_guide_sections FOR DELETE USING (public.has_role(auth.uid(), 'admin'::public.app_role));

INSERT INTO public.site_content (key, page, section, value_en, value_he)
VALUES ('access_token', 'buyer_guide', 'access', 'spirit2026', 'spirit2026');
