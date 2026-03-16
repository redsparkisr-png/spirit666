-- Update Hebrew testimonial values for Israeli market adaptation
-- Also add off-market CTA/helper keys

UPDATE site_content SET value_he = 'מה אומרים לקוחות שכבר עברו את התהליך' WHERE key = 'home.testimonials.title';
UPDATE site_content SET value_he = 'משפחות מרחבי הארץ שמצאו את הבית שלהן בזכרון יעקב' WHERE key = 'home.testimonials.subtitle';
UPDATE site_content SET value_he = 'דויד ושרה מזרחי' WHERE key = 'home.testimonials.author_1';
UPDATE site_content SET value_he = 'רעננה · 2024' WHERE key = 'home.testimonials.context_1';
UPDATE site_content SET value_he = 'חיפשנו בית בזכרון יעקב במשך חודשים. ספיריט הכירו כל רחוב ושכונה, וזה עשה את כל ההבדל.' WHERE key = 'home.testimonials.quote_1';
UPDATE site_content SET value_he = 'אורן כהן' WHERE key = 'home.testimonials.author_2';
UPDATE site_content SET value_he = 'הרצליה · 2024' WHERE key = 'home.testimonials.context_2';
UPDATE site_content SET value_he = 'הרגשנו שמישהו באמת מייצג אותנו. התקשורת הייתה שקופה, ותמיד ידענו מה קורה.' WHERE key = 'home.testimonials.quote_2';
UPDATE site_content SET value_he = 'נועם ושירי לוי' WHERE key = 'home.testimonials.author_3';
UPDATE site_content SET value_he = 'הוד השרון · 2024' WHERE key = 'home.testimonials.context_3';
UPDATE site_content SET value_he = 'ההיכרות של ספיריט עם השוק המקומי עשתה את כל ההבדל. ידענו שאנחנו מקבלים החלטה נכונה.' WHERE key = 'home.testimonials.quote_3';
UPDATE site_content SET value_he = 'איילת ועידו פרידמן' WHERE key = 'home.testimonials.author_4';
UPDATE site_content SET value_he = 'תל אביב · 2023' WHERE key = 'home.testimonials.context_4';
UPDATE site_content SET value_he = 'ספיריט ליוו אותנו בכל צעד — מהסיור הראשון ועד החתימה. מעולם לא הרגשנו לבד בתהליך.' WHERE key = 'home.testimonials.quote_4';
UPDATE site_content SET value_he = 'משפחת ברק' WHERE key = 'home.testimonials.author_5';
UPDATE site_content SET value_he = 'כפר סבא · 2024' WHERE key = 'home.testimonials.context_5';
UPDATE site_content SET value_he = 'מקצועיים, דיסקרטיים ובאמת מושקעים במציאת הבית הנכון למשפחה שלנו. ממליצים בחום.' WHERE key = 'home.testimonials.quote_5';
UPDATE site_content SET value_he = 'הזדמנויות פרטיות ממעטות להתפרסם.' WHERE key = 'home.testimonials.cta_text';
UPDATE site_content SET value_he = 'בקשו גישה פרטית' WHERE key = 'home.testimonials.cta_button';

-- Update off-market section copy
UPDATE site_content SET 
  value_en = 'Most buyers never even see the best opportunities',
  value_he = 'רוב הקונים בכלל לא רואים את ההזדמנויות הכי טובות'
WHERE key = 'home.offmarket.title';

UPDATE site_content SET 
  value_en = 'Some of the most desirable homes in Zichron Yaakov are sold before they ever reach public listing sites.',
  value_he = 'חלק מהבתים המבוקשים בזכרון יעקב נסגרים עוד לפני שהם מגיעים ללוחות.'
WHERE key = 'home.offmarket.text_1';

UPDATE site_content SET 
  value_en = 'These opportunities move through local relationships, private conversations and early market access — so buyers who are not connected early often miss them completely.',
  value_he = 'אלה הזדמנויות שעוברות דרך השוק המקומי, קשרים ישירים ופניות פרטיות — ולכן מי שלא מחובר בזמן, פשוט לא רואה אותן.'
WHERE key = 'home.offmarket.text_2';

-- Add new off-market CTA and helper keys
INSERT INTO site_content (key, value_en, value_he, page, section) VALUES
  ('home.offmarket.cta', 'Get Access to Private Opportunities', 'קבלו גישה להזדמנויות פרטיות', 'home', 'offmarket'),
  ('home.offmarket.helper', 'Message us and we''ll let you know when relevant homes reach the market — even before they are publicly listed.', 'שלחו הודעה ונעדכן אתכם כשנכסים רלוונטיים מגיעים לשוק — גם אם הם לא פורסמו פומבית.', 'home', 'offmarket')
ON CONFLICT (key) DO UPDATE SET value_en = EXCLUDED.value_en, value_he = EXCLUDED.value_he;