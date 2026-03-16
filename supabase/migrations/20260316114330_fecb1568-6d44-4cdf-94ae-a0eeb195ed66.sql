
-- Blog categories table
CREATE TABLE public.blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en text NOT NULL,
  name_he text NOT NULL,
  slug text UNIQUE NOT NULL,
  display_order integer NOT NULL DEFAULT 0
);

ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view blog categories" ON public.blog_categories FOR SELECT TO public USING (true);
CREATE POLICY "Admins can insert blog categories" ON public.blog_categories FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update blog categories" ON public.blog_categories FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete blog categories" ON public.blog_categories FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- Blog posts table
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL DEFAULT '',
  title_he text NOT NULL DEFAULT '',
  slug text UNIQUE NOT NULL,
  excerpt_en text NOT NULL DEFAULT '',
  excerpt_he text NOT NULL DEFAULT '',
  body_en text NOT NULL DEFAULT '',
  body_he text NOT NULL DEFAULT '',
  featured_image text,
  category text,
  tags text[] DEFAULT '{}'::text[],
  author text NOT NULL DEFAULT 'Spirit Real Estate',
  publish_date timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL DEFAULT 'draft',
  reading_time_minutes integer NOT NULL DEFAULT 5,
  seo_title_en text,
  seo_title_he text,
  meta_description_en text,
  meta_description_he text,
  og_image text,
  canonical_url text,
  noindex boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published posts" ON public.blog_posts FOR SELECT TO public USING (status = 'published');
CREATE POLICY "Admins can view all posts" ON public.blog_posts FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can insert posts" ON public.blog_posts FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update posts" ON public.blog_posts FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete posts" ON public.blog_posts FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_blog_posts_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path TO 'public' AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_blog_posts_updated_at();

-- Insert default categories
INSERT INTO public.blog_categories (name_en, name_he, slug, display_order) VALUES
  ('Buying in Zichron Yaakov', 'רכישה בזכרון יעקב', 'buying', 1),
  ('Selling Property', 'מכירת נכס', 'selling', 2),
  ('Zichron Yaakov Neighborhoods', 'שכונות בזכרון יעקב', 'neighborhoods', 3),
  ('Market Insights', 'תובנות שוק', 'market-insights', 4),
  ('Living in Zichron Yaakov', 'חיים בזכרון יעקב', 'living', 5);
