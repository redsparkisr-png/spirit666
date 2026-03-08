INSERT INTO public.site_content (key, value_en, value_he, page, section)
VALUES
  ('home.trust_line.item_1', 'Licensed Professionals', 'מתווכים מורשים', 'home', 'trust_line'),
  ('home.trust_line.item_2', '70+ Families', '70+ משפחות', 'home', 'trust_line'),
  ('home.trust_line.item_3', 'Strategic Negotiation', 'משא ומתן אסטרטגי', 'home', 'trust_line'),
  ('home.trust_line.item_4', 'Local Specialists', 'מומחים מקומיים', 'home', 'trust_line')
ON CONFLICT (key) DO NOTHING;