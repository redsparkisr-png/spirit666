
UPDATE public.site_content SET value_en = '+972-52-282-0632', value_he = '+972-52-282-0632' WHERE key = 'contact.info.phone_value';
UPDATE public.site_content SET value_en = 'spiritisraelhomes@gmail.com', value_he = 'spiritisraelhomes@gmail.com' WHERE key = 'contact.info.email_value';
UPDATE public.site_content SET value_en = 'HaChochit 15, Zichron Yaakov 3091668, Israel', value_he = 'החוחית 15, זכרון יעקב 3091668' WHERE key = 'contact.info.address_value';
INSERT INTO public.site_content (key, value_en, value_he) VALUES
  ('contact.info.phone_hagit_label', 'Hagit Cohen Morgan', 'חגית כהן מורגן'),
  ('contact.info.phone_hagit_value', '+972-52-282-0632', '052-282-0632'),
  ('contact.info.phone_avi_label', 'Avi Suliman', 'אבי סולימן'),
  ('contact.info.phone_avi_value', '+972-54-757-0840', '054-757-0840')
ON CONFLICT (key) DO UPDATE SET value_en = EXCLUDED.value_en, value_he = EXCLUDED.value_he;
