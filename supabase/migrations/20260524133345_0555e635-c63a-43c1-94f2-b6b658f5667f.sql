INSERT INTO public.site_content (key, page, section, value_he, value_en) VALUES
('home.testimonials.metric_1_value', 'home', 'testimonials', '288+', '288+'),
('home.testimonials.metric_1_label', 'home', 'testimonials', 'משפחות שליווינו', 'families guided')
ON CONFLICT (key) DO UPDATE
  SET value_he = EXCLUDED.value_he,
      value_en = EXCLUDED.value_en,
      updated_at = now();