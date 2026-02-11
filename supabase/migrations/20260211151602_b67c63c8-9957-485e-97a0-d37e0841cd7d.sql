
-- Create admin role system
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Tighten write policies to admin only
-- properties_available
DROP POLICY "Authenticated users can insert available properties" ON public.properties_available;
DROP POLICY "Authenticated users can update available properties" ON public.properties_available;
DROP POLICY "Authenticated users can delete available properties" ON public.properties_available;

CREATE POLICY "Admins can insert available properties"
  ON public.properties_available FOR INSERT
  TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update available properties"
  ON public.properties_available FOR UPDATE
  TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete available properties"
  ON public.properties_available FOR DELETE
  TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- properties_sold
DROP POLICY "Authenticated users can insert sold properties" ON public.properties_sold;
DROP POLICY "Authenticated users can update sold properties" ON public.properties_sold;
DROP POLICY "Authenticated users can delete sold properties" ON public.properties_sold;

CREATE POLICY "Admins can insert sold properties"
  ON public.properties_sold FOR INSERT
  TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update sold properties"
  ON public.properties_sold FOR UPDATE
  TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete sold properties"
  ON public.properties_sold FOR DELETE
  TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- lifestyle_gallery
DROP POLICY "Authenticated users can insert lifestyle gallery" ON public.lifestyle_gallery;
DROP POLICY "Authenticated users can update lifestyle gallery" ON public.lifestyle_gallery;
DROP POLICY "Authenticated users can delete lifestyle gallery" ON public.lifestyle_gallery;

CREATE POLICY "Admins can insert lifestyle gallery"
  ON public.lifestyle_gallery FOR INSERT
  TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update lifestyle gallery"
  ON public.lifestyle_gallery FOR UPDATE
  TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete lifestyle gallery"
  ON public.lifestyle_gallery FOR DELETE
  TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Tighten storage policies to admin only
DROP POLICY "Authenticated users can upload images" ON storage.objects;
DROP POLICY "Authenticated users can update images" ON storage.objects;
DROP POLICY "Authenticated users can delete images" ON storage.objects;

CREATE POLICY "Admins can upload images"
  ON storage.objects FOR INSERT
  TO authenticated WITH CHECK (bucket_id = 'images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update images"
  ON storage.objects FOR UPDATE
  TO authenticated USING (bucket_id = 'images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete images"
  ON storage.objects FOR DELETE
  TO authenticated USING (bucket_id = 'images' AND public.has_role(auth.uid(), 'admin'));
