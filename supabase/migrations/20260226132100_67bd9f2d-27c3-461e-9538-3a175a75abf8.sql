
-- Create site_content table for CMS-driven bilingual content
CREATE TABLE public.site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL,
  value_en text NOT NULL DEFAULT '',
  value_he text NOT NULL DEFAULT '',
  page text NOT NULL DEFAULT 'global',
  section text NOT NULL DEFAULT 'general',
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(key)
);

-- Enable RLS
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Anyone can read (public content)
CREATE POLICY "Anyone can view site content"
ON public.site_content FOR SELECT
USING (true);

-- Admins can insert
CREATE POLICY "Admins can insert site content"
ON public.site_content FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admins can update
CREATE POLICY "Admins can update site content"
ON public.site_content FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can delete
CREATE POLICY "Admins can delete site content"
ON public.site_content FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_site_content_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_site_content_updated_at
BEFORE UPDATE ON public.site_content
FOR EACH ROW
EXECUTE FUNCTION public.update_site_content_updated_at();

-- Seed data
INSERT INTO public.site_content (key, value_en, value_he, page, section) VALUES
-- Header
('header.tagline', 'Zichron Yaakov & Coastal Region', 'זכרון יעקב והאזור החופי', 'global', 'header'),
('header.nav.home', 'Home', 'בית', 'global', 'header'),
('header.nav.properties', 'Properties', 'נכסים', 'global', 'header'),
('header.nav.privacy', 'Privacy Policy', 'מדיניות פרטיות', 'global', 'header'),
('header.nav.terms', 'Terms of Use', 'תנאי שימוש', 'global', 'header'),
('header.nav.accessibility', 'Accessibility', 'נגישות', 'global', 'header'),

-- Hero
('home.hero.pre_title', 'Spirit Real Estate', 'ספיריט נדל"ן', 'home', 'hero'),
('home.hero.headline', 'Zichron Yaakov. Strategically Chosen. Personally Guided.', 'זכרון יעקב. בחירה אסטרטגית. ליווי אישי.', 'home', 'hero'),
('home.hero.subline', 'Local expertise, clear negotiation, and grounded representation for buyers who value both lifestyle and long-term positioning.', 'ייצוג מקומי מדויק, ניהול מו"מ שקול והכוונה אמיתית לרוכשים שמבינים שערך הוא לא רק מחיר — אלא החלטה נכונה.', 'home', 'hero'),
('home.hero.cta_primary', 'View Available Properties', 'צפה בנכסים זמינים', 'home', 'hero'),
('home.hero.cta_secondary', 'Download the 2026 Property Blueprint', 'הורד את מדריך הרכישה 2026', 'home', 'hero'),
('home.hero.anchor_text', 'Access Off-Market Opportunities →', 'גישה לנכסים שלא בשוק הפתוח →', 'home', 'hero'),
('home.hero.trust_1', 'Discreet transactions', 'עסקאות דיסקרטיות', 'home', 'hero'),
('home.hero.trust_2', 'Local expertise', 'מומחיות מקומית', 'home', 'hero'),
('home.hero.trust_3', 'International clients', 'לקוחות בינלאומיים', 'home', 'hero'),

-- Micro Trust Line
('home.trust_line.text', 'Licensed Real Estate Professionals · 70+ Families Represented · Strategic Negotiation · Local Market Specialists', 'מתווכים מורשים · למעלה מ-70 משפחות שיוצגו · ניהול מו״מ אסטרטגי · מומחיות מקומית בזכרון', 'home', 'trust_line'),

-- Testimonials
('home.testimonials.title', 'Trusted by International Clients', 'מהימנים בעיני לקוחות בינלאומיים', 'home', 'testimonials'),
('home.testimonials.subtitle', 'Recent buyers from New York, Toronto and London shared their experience moving to Zichron.', 'רוכשים אחרונים מניו יורק, טורונטו ולונדון שיתפו את החוויה שלהם.', 'home', 'testimonials'),
('home.testimonials.cta_text', 'Private opportunities are rarely advertised publicly.', 'הזדמנויות פרטיות ממעטות להתפרסם.', 'home', 'testimonials'),
('home.testimonials.cta_button', 'Request Private Access', 'בקש גישה פרטית', 'home', 'testimonials'),

-- Testimonial quotes
('home.testimonials.quote_1', 'Buying from the US felt overwhelming at first. Spirit Real Estate made the entire process clear, calm, and well managed from start to finish.', 'רכישה מארה"ב הרגישה מורכבת בהתחלה. ספיריט הפכו את כל התהליך לברור, רגוע ומנוהל היטב מתחילתו ועד סופו.', 'home', 'testimonials'),
('home.testimonials.author_1', 'David & Sarah M.', 'דויד ושרה מ.', 'home', 'testimonials'),
('home.testimonials.context_1', 'Family from New York · 2024', 'משפחה מניו יורק · 2024', 'home', 'testimonials'),
('home.testimonials.quote_2', 'We felt someone was truly representing us locally. Communication was transparent, and we always knew what was happening.', 'הרגשנו שמישהו באמת מייצג אותנו מקומית. התקשורת הייתה שקופה, ותמיד ידענו מה קורה.', 'home', 'testimonials'),
('home.testimonials.author_2', 'Michael R.', 'מייקל ר.', 'home', 'testimonials'),
('home.testimonials.context_2', 'Investor from Toronto · 2024', 'משקיע מטורונטו · 2024', 'home', 'testimonials'),
('home.testimonials.quote_3', 'The local presence made all the difference. Even from abroad, we felt confident making the right decision.', 'הנוכחות המקומית עשתה את כל ההבדל. גם מחו"ל, הרגשנו בטוחים שאנחנו מקבלים את ההחלטה הנכונה.', 'home', 'testimonials'),
('home.testimonials.author_3', 'Jonathan & Lisa B.', 'יונתן וליסה ב.', 'home', 'testimonials'),
('home.testimonials.context_3', 'Retirees from London · 2024', 'גמלאים מלונדון · 2024', 'home', 'testimonials'),
('home.testimonials.quote_4', 'Spirit guided us through every legal and logistical step. We never felt alone in the process.', 'ספיריט ליוו אותנו בכל צעד משפטי ולוגיסטי. מעולם לא הרגשנו לבד בתהליך.', 'home', 'testimonials'),
('home.testimonials.author_4', 'Rachel & Daniel K.', 'רחל ודניאל ק.', 'home', 'testimonials'),
('home.testimonials.context_4', 'Family from Los Angeles · 2023', 'משפחה מלוס אנג׳לס · 2023', 'home', 'testimonials'),
('home.testimonials.quote_5', 'Professional, discreet, and genuinely invested in finding the right home for our family. Highly recommend.', 'מקצועיים, דיסקרטיים ובאמת מושקעים במציאת הבית הנכון למשפחה שלנו. ממליצים בחום.', 'home', 'testimonials'),
('home.testimonials.author_5', 'Yael & Marc S.', 'יעל ומארק ס.', 'home', 'testimonials'),
('home.testimonials.context_5', 'Family from Paris · 2024', 'משפחה מפריז · 2024', 'home', 'testimonials'),

-- Available Homes
('home.available.pre_title', 'Hand-Selected Homes for International Buyers', 'נכסים נבחרים עבור רוכשים בינלאומיים', 'home', 'available'),
('home.available.title', 'Available Homes in Zichron Yaakov', 'נכסים זמינים בזכרון יעקב', 'home', 'available'),
('home.available.subtitle', 'This is a small curated selection of homes currently available. Some of our most attractive opportunities are shared privately with qualified buyers.', 'זוהי מבחר קטן ומאוצר של נכסים זמינים כרגע. חלק מההזדמנויות האטרקטיביות ביותר משותפות באופן פרטי עם רוכשים מתאימים.', 'home', 'available'),
('home.available.empty_text', 'New listings are being prepared — check back soon.', 'רישומים חדשים בהכנה — חזרו בקרוב.', 'home', 'available'),
('home.available.bottom_text', 'Some of our best opportunities are sold quietly and never reach public listing sites.', 'חלק מההזדמנויות הטובות ביותר שלנו נמכרות בשקט ולעולם לא מגיעות לאתרי רישום ציבוריים.', 'home', 'available'),
('home.available.details_button', 'Request Full Details', 'בקש פרטים מלאים', 'home', 'available'),

-- Sold Homes
('home.sold.pre_title', 'Proven track record. Real results.', 'רקורד מוכח. תוצאות אמיתיות.', 'home', 'sold'),
('home.sold.title', 'Recently Sold Homes', 'נמכרו לאחרונה', 'home', 'sold'),
('home.sold.empty_text', 'Recent sales will appear here soon.', 'מכירות אחרונות יופיעו כאן בקרוב.', 'home', 'sold'),
('home.sold.bottom_text', 'More successful transactions available upon request.', 'עסקאות מוצלחות נוספות זמינות לפי בקשה.', 'home', 'sold'),
('home.sold.cta_button', 'Schedule a Private Consultation', 'תאם ייעוץ פרטי', 'home', 'sold'),
('home.sold.badge', 'Sold', 'נמכר', 'home', 'sold'),

-- Why Different / Team
('home.why.title', 'Real People. Local Presence.', 'אנשים אמיתיים. נוכחות מקומית.', 'home', 'why'),
('home.why.subtitle', 'We personally visit and evaluate every property we recommend. When you buy through us, you''re not navigating Israel alone.', 'אנחנו מבקרים ובודקים באופן אישי כל נכס שאנחנו ממליצים עליו. כשאתם קונים דרכנו, אתם לא מנווטים בישראל לבד.', 'home', 'why'),
('home.why.tagline', 'A boutique team combining experience, strategy, and personal care.', 'צוות בוטיק המשלב ניסיון, אסטרטגיה וטיפול אישי.', 'home', 'why'),
('home.why.avi_name', 'Avi Suliman', 'אבי סולימאן', 'home', 'why'),
('home.why.avi_role', 'Senior Real Estate Advisor & Co-Founder', 'יועץ נדל"ן בכיר ומייסד שותף', 'home', 'why'),
('home.why.hagit_name', 'Hagit Cohen Morgan', 'חגית כהן מורגן', 'home', 'why'),
('home.why.hagit_role', 'Senior Real Estate Advisor & Co-Founder', 'יועצת נדל"ן בכירה ומייסדת שותפה', 'home', 'why'),
('home.why.eliran_name', 'Eliran Amsalem', 'אלירן אמסלם', 'home', 'why'),
('home.why.eliran_role', 'Marketing & Digital Strategy', 'שיווק ואסטרטגיה דיגיטלית', 'home', 'why'),

-- Lifestyle
('home.lifestyle.title', 'Why Overseas Families Fall in Love with Zichron Yaakov', 'למה משפחות מחו"ל מתאהבות בזכרון יעקב', 'home', 'lifestyle'),
('home.lifestyle.bullet_1', 'Coastal Mediterranean lifestyle without Tel Aviv chaos', 'אורח חיים ים-תיכוני חופי ללא הכאוס של תל אביב', 'home', 'lifestyle'),
('home.lifestyle.bullet_2', 'Strong long-term value and limited land supply', 'ערך חזק לטווח ארוך והיצע קרקע מוגבל', 'home', 'lifestyle'),
('home.lifestyle.bullet_3', 'Welcoming English-speaking community', 'קהילה מסבירת פנים דוברת אנגלית', 'home', 'lifestyle'),
('home.lifestyle.bottom_line', 'This is more than a property. It''s a way of life.', 'זה יותר מנכס. זה אורח חיים.', 'home', 'lifestyle'),
('home.lifestyle.empty_text', 'Gallery coming soon — beautiful scenes from life in Zichron Yaakov.', 'גלריה בקרוב — תמונות יפות מהחיים בזכרון יעקב.', 'home', 'lifestyle'),

-- Contact Form
('home.contact.title', 'Homes for Sale in Zichron Yaakov – Including Off-Market Opportunities', 'נכסים למכירה בזכרון יעקב – כולל הזדמנויות מחוץ לשוק', 'home', 'contact'),
('home.contact.subtitle', 'Receive curated off-market homes before they hit the public market.', 'קבלו נכסים מאוצרים מחוץ לשוק לפני שהם מגיעים לציבור.', 'home', 'contact'),
('home.contact.button', 'Get Private Access', 'קבל גישה פרטית', 'home', 'contact'),
('home.contact.response_time', 'We respond within 1–2 business hours.', 'אנחנו מגיבים תוך 1-2 שעות עסקיות.', 'home', 'contact'),
('home.contact.trust_text', 'Discreet • No spam • Personal guidance', 'דיסקרטי • ללא ספאם • הכוונה אישית', 'home', 'contact'),
('home.contact.privacy_text', 'By submitting this form, you agree to our', 'בשליחת טופס זה, אתם מסכימים ל', 'home', 'contact'),
('home.contact.placeholder_name', 'Full Name', 'שם מלא', 'home', 'contact'),
('home.contact.placeholder_phone', 'Phone', 'טלפון', 'home', 'contact'),
('home.contact.placeholder_email', 'Email', 'דוא"ל', 'home', 'contact'),
('home.contact.sending', 'Sending...', 'שולח...', 'home', 'contact'),
('home.contact.success', 'Thank you! We''ll be in touch with matching homes soon.', 'תודה! ניצור קשר עם נכסים מתאימים בקרוב.', 'home', 'contact'),
('home.contact.error', 'Something went wrong. Please try again.', 'משהו השתבש. נסו שוב.', 'home', 'contact'),
('home.contact.validation_error', 'Please fill in all fields.', 'אנא מלאו את כל השדות.', 'home', 'contact'),

-- Exit Intent
('home.exit.headline', 'Before You Go — Want Access to Properties Most Buyers Never See?', 'רגע לפני שאתה יוצא — גישה לנכסים שלא מגיעים לשוק הפתוח.', 'home', 'exit'),
('home.exit.subline', 'Receive a private list of off-market and under-the-radar opportunities in Zichron Yaakov.', 'קבלו רשימה פרטית של הזדמנויות מחוץ לשוק ומתחת לרדאר בזכרון יעקב.', 'home', 'exit'),
('home.exit.button', 'Send Me Private Listings', 'שלחו לי נכסים פרטיים', 'home', 'exit'),

-- Cookie Notice
('home.cookie.text', 'This website uses cookies to improve your experience, analyze traffic, and enhance marketing performance.', 'אתר זה משתמש בעוגיות לשיפור החוויה שלכם, ניתוח תנועה ושיפור ביצועי שיווק.', 'home', 'cookie'),
('home.cookie.accept', 'Accept', 'אישור', 'home', 'cookie'),
('home.cookie.decline', 'Decline', 'דחייה', 'home', 'cookie'),

-- Footer / Trust Section
('home.footer.disclaimer', 'Spirit Real Estate is a licensed real estate brokerage in Israel. All property information is subject to change and availability.', 'ספיריט נדל"ן הוא משרד תיווך מורשה בישראל. כל מידע על נכסים כפוף לשינויים וזמינות.', 'home', 'footer'),
('home.footer.copyright', '© {year} Spirit Real Estate · Zichron Yaakov, Israel', '© {year} ספיריט נדל"ן · זכרון יעקב, ישראל', 'home', 'footer'),

-- Floating Elements
('home.floating.tooltip', 'Speak directly with a local expert', 'דברו ישירות עם מומחה מקומי', 'home', 'floating'),
('home.floating.homes_button', 'Homes for Sale in Zichron Yaakov', 'נכסים למכירה בזכרון יעקב', 'home', 'floating'),
('home.floating.homes_button_mobile', 'View Homes', 'צפה בנכסים', 'home', 'floating');
