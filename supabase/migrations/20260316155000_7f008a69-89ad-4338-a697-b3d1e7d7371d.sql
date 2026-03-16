INSERT INTO site_content (key, value_en, value_he, page, section) VALUES
  ('whatsapp.phone_number', '972522820632', '972522820632', 'global', 'whatsapp'),
  ('whatsapp.default_message', 'Hi, I''m interested in properties in Zichron Yaakov.', 'שלום, אני מתעניין/ת בנכסים בזכרון יעקב.', 'global', 'whatsapp')
ON CONFLICT (key) DO UPDATE SET value_en = EXCLUDED.value_en, value_he = EXCLUDED.value_he;