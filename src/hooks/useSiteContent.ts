import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/lib/i18n";
import { useCallback } from "react";

interface SiteContentRow {
  id: string;
  key: string;
  value_en: string;
  value_he: string;
  page: string;
  section: string;
  updated_at: string;
}

export function useSiteContent() {
  const { lang } = useLanguage();

  const { data: rows = [], isLoading } = useQuery<SiteContentRow[]>({
    queryKey: ["site_content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .order("key");
      if (error) throw error;
      return (data ?? []) as SiteContentRow[];
    },
    staleTime: 5 * 60 * 1000,
  });

  // Local fallbacks for keys not yet in CMS
  const localFallbacks: Record<string, Record<string, string>> = {
    "search.more_filters": { en: "More Filters", he: "סינון נוסף" },
    "search.beds_label": { en: "Beds", he: "חדרים" },
    "property.detail.interested_title": { en: "Interested in this home?", he: "מתעניינים בנכס הזה?" },
    "property.detail.inquiry_title": { en: "Request Private Details", he: "בקשת פרטים" },
    "property.detail.name_placeholder": { en: "Full Name", he: "שם מלא" },
    "property.detail.phone_placeholder": { en: "Phone", he: "טלפון" },
    "property.detail.email_placeholder": { en: "Email (optional)", he: "אימייל (אופציונלי)" },
    "property.detail.message_placeholder": { en: "Message", he: "הודעה" },
    "property.detail.send_inquiry": { en: "Send Inquiry", he: "שליחת פנייה" },
    "property.detail.inquiry_success": { en: "Thanks — we'll get back to you shortly!", he: "תודה — נחזור אליכם בהקדם!" },
    "property.detail.validation_error": { en: "Please enter your name and phone.", he: "נא להזין שם וטלפון." },
    "property.detail.whatsapp_cta": { en: "WhatsApp Us", he: "וואטסאפ" },
    "property.detail.not_found": { en: "Property not found", he: "הנכס לא נמצא" },
    "property.detail.back_to_listings": { en: "Back to listings", he: "חזרה לנכסים" },
    "property.detail.price_upon_request": { en: "Price upon request", he: "מחיר לפי בקשה" },
    "property.detail.bedrooms": { en: "Bedrooms", he: "חדרי שינה" },
    "property.detail.built_sqm": { en: "Built m²", he: 'מ"ר בנוי' },
    "property.detail.lot_sqm": { en: "Lot m²", he: 'מ"ר מגרש' },
    "property.detail.overview": { en: "Overview", he: "סקירה" },
    "property.detail.location_title": { en: "Location", he: "מיקום" },
    "property.detail.fomo_line": { en: "Premium properties in this area don't stay available long.", he: "נכסי פרימיום באזור הזה לא נשארים זמינים לאורך זמן." },
    "property.detail.similar_title": { en: "Similar Properties", he: "נכסים דומים" },
    "property.detail.privacy_note": { en: "Your details are kept confidential.", he: "פרטיכם נשמרים בסודיות." },
    "home.trust_line.item_1": { en: "Licensed Professionals", he: "מתווכים מורשים" },
    "home.trust_line.item_2": { en: "70+ Families", he: "70+ משפחות" },
    "home.trust_line.item_3": { en: "Strategic Negotiation", he: "משא ומתן אסטרטגי" },
    "home.trust_line.item_4": { en: "Local Specialists", he: "מומחים מקומיים" },
    "whatsapp.phone_number": { en: "972522820632", he: "972522820632" },
    "whatsapp.default_message": { en: "Hi, I'm interested in properties in Zichron Yaakov.", he: "שלום, אני מתעניין/ת בנכסים בזכרון יעקב." },
    "whatsapp.hero_message": { en: "Hi, I'd like to receive the Zichron Yaakov Buyer Blueprint.", he: "שלום, אשמח לקבל את מדריך הקונה לזכרון יעקב." },
    "whatsapp.guide_message": { en: "Hi, I'd like to receive the Zichron Yaakov Buyer Blueprint.", he: "שלום, אשמח לקבל את מדריך הקונה לזכרון יעקב." },
    "whatsapp.closing_message": { en: "Hi Hagit, I'm looking at homes in Zichron Yaakov and would love to learn more.", he: "שלום חגית, אני מתעניין/ת בבתים בזכרון יעקב ואשמח לשמוע עוד." },
    "whatsapp.closing_guide_message": { en: "Hi Hagit, I would love to receive the guide about buying property in Zichron Yaakov.", he: "שלום חגית, אשמח לקבל את המדריך על רכישת נכס בזכרון יעקב." },
    "whatsapp.team_message": { en: "Hi, I'd like to learn more about homes in Zichron Yaakov.", he: "שלום, אשמח לשמוע עוד על בתים בזכרון יעקב." },
    "whatsapp.offmarket_message": { en: "Hi, I'm interested in off-market homes in Zichron Yaakov.", he: "שלום, אני מתעניין/ת בנכסים שלא פורסמו בזכרון יעקב." },
    // Common cross-page
    "common.related_guides_title": { en: "Continue reading", he: "המשיכו לקרוא" },
    "common.related_guides_subtitle": { en: "More expert insights about Zichron Yaakov real estate.", he: "עוד תובנות מקצועיות על נדל״ן בזכרון יעקב." },
    "common.faq_title": { en: "Frequently Asked Questions", he: "שאלות נפוצות" },
    "common.faq_subtitle": { en: "Straight answers from local specialists.", he: "תשובות ישירות ממומחים מקומיים." },
    "common.last_updated": { en: "Last updated", he: "עודכן לאחרונה" },
    "common.back_home": { en: "Back to homepage", he: "חזרה לעמוד הבית" },
    "sell.valuation.address_placeholder": { en: "Property address (street, city)", he: "כתובת הנכס (רחוב, יישוב)" },
    // SEO meta — page-by-page
    "seo.home.title": { en: "Spirit Real Estate — Boutique Homes in Zichron Yaakov", he: "Spirit Real Estate — נדל״ן בוטיק בזכרון יעקב" },
    "seo.home.description": { en: "Boutique real estate in Zichron Yaakov. Strategic advisory, off-market listings, and personal representation by licensed local specialists.", he: "נדל״ן בוטיק בזכרון יעקב. ייעוץ אסטרטגי, נכסים שלא פורסמו וליווי אישי על־ידי מתווכים מורשים." },
    "seo.about.title": { en: "About Spirit Real Estate | Zichron Yaakov Specialists", he: "אודות Spirit Real Estate | המומחים של זכרון יעקב" },
    "seo.about.description": { en: "Meet the boutique team behind 288+ relocations in Zichron Yaakov — licensed advisors, multilingual, deeply local.", he: "הכירו את הצוות הבוטיק שמאחורי 288+ מעברים לזכרון יעקב — מתווכים מורשים, רב־לשוניים, מקומיים לעומק." },
    "seo.sell.title": { en: "Sell Your Home in Zichron Yaakov | Spirit Real Estate", he: "מכירת בית בזכרון יעקב | Spirit Real Estate" },
    "seo.sell.description": { en: "Get a free home valuation in Zichron Yaakov. Private buyer network, strategic marketing, transparent process. Licensed local specialists.", he: "הערכת שווי חינם לבית שלכם בזכרון יעקב. רשת קונים פרטית, שיווק אסטרטגי, תהליך שקוף. מתווכים מקומיים מורשים." },
    "seo.contact.title": { en: "Contact Spirit Real Estate | Zichron Yaakov", he: "צרו קשר | Spirit Real Estate זכרון יעקב" },
    "seo.contact.description": { en: "Talk to a licensed Zichron Yaakov specialist. WhatsApp, phone, or visit our office. Replies within one business day.", he: "דברו עם מומחה מורשה בזכרון יעקב. וואטסאפ, טלפון או ביקור במשרד. מענה תוך יום עסקים." },
    "seo.properties.title": { en: "Homes for Sale in Zichron Yaakov | Listings", he: "בתים למכירה בזכרון יעקב | רשימת נכסים" },
    "seo.properties.description": { en: "Browse curated villas, townhouses, and apartments for sale in Zichron Yaakov. Updated weekly by Spirit Real Estate.", he: "וילות, קוטג'ים ודירות למכירה בזכרון יעקב. רשימה מעודכנת מדי שבוע על־ידי Spirit Real Estate." },
    "seo.homes_for_sale.title": { en: "Homes for Sale in Zichron Yaakov by Neighborhood", he: "בתים למכירה בזכרון יעקב לפי שכונה" },
    "seo.homes_for_sale.description": { en: "Explore homes for sale in Zichron Yaakov by neighborhood — Historic Center, Alon, Mordot HaCarmel, Givat Eden and more.", he: "בתים למכירה בזכרון יעקב לפי שכונה — מרכז היסטורי, אלון, מורדות הכרמל, גבעת עדן ועוד." },
    "seo.buying.title": { en: "Buying Property in Zichron Yaakov — Complete Guide", he: "מדריך רכישת נכס בזכרון יעקב" },
    "seo.buying.description": { en: "Local market overview, property types, common buyer mistakes, and negotiation tips for Zichron Yaakov.", he: "סקירת שוק מקומי, סוגי נכסים, טעויות נפוצות וטיפי משא ומתן לזכרון יעקב." },
    "seo.living.title": { en: "Living in Zichron Yaakov — Lifestyle & Community", he: "חיים בזכרון יעקב — אורח חיים וקהילה" },
    "seo.living.description": { en: "Lifestyle, community, families and accessibility — everything that makes Zichron Yaakov one of Israel's most sought-after towns.", he: "אורח חיים, קהילה, משפחות ונגישות — כל מה שהופך את זכרון יעקב לאחת הערים המבוקשות בישראל." },
    "seo.moving.title": { en: "Moving to Zichron Yaakov — Relocation Guide", he: "מעבר לזכרון יעקב — מדריך מעבר" },
    "seo.moving.description": { en: "Who Zichron Yaakov fits, what to know before moving, market dynamics, and how Spirit helps relocators settle in.", he: "למי זכרון יעקב מתאימה, מה לדעת לפני המעבר, דינמיקת השוק וכיצד Spirit מסייעים להתאקלמות." },
    "seo.guides.title": { en: "Zichron Yaakov Real Estate Guides & Insights", he: "מדריכים ותובנות נדל״ן בזכרון יעקב" },
    "seo.guides.description": { en: "Expert local guides for buying and living in Zichron Yaakov — neighborhoods, prices, market trends, and tips.", he: "מדריכים מקומיים לרכישה ולחיים בזכרון יעקב — שכונות, מחירים, מגמות שוק וטיפים." },
    "seo.notfound.title": { en: "Page not found | Spirit Real Estate", he: "העמוד לא נמצא | Spirit Real Estate" },
    "seo.notfound.description": { en: "The page you are looking for doesn't exist. Browse our latest listings and guides.", he: "הדף שחיפשתם לא נמצא. עיינו בנכסים ובמדריכים העדכניים שלנו." },
    // About page extended
    "about.breadcrumb": { en: "About", he: "אודות" },
    "about.story.eyebrow": { en: "Our story", he: "הסיפור שלנו" },
    "about.story.year_founded": { en: "Founded 2019", he: "נוסד 2019" },
    "about.credentials.title": { en: "Licensed & accountable", he: "מורשים ואחראים" },
    "about.credentials.item_1_label": { en: "Brokerage License", he: "רישיון תיווך" },
    "about.credentials.item_1_value": { en: "Israel Ministry of Justice", he: "משרד המשפטים, ישראל" },
    "about.credentials.item_2_label": { en: "Members", he: "חברים" },
    "about.credentials.item_2_value": { en: "Israel Realtors Association", he: "לשכת המתווכים בישראל" },
    "about.credentials.item_3_label": { en: "Languages", he: "שפות" },
    "about.credentials.item_3_value": { en: "Hebrew · English · French · Russian", he: "עברית · אנגלית · צרפתית · רוסית" },
    "about.credentials.item_4_label": { en: "Coverage", he: "כיסוי" },
    "about.credentials.item_4_value": { en: "Zichron Yaakov & Carmel Coast", he: "זכרון יעקב וחוף הכרמל" },
    // Contact page extended
    "contact.breadcrumb": { en: "Contact", he: "צור קשר" },
    "contact.hours.title": { en: "Office hours", he: "שעות פעילות" },
    "contact.hours.weekdays": { en: "Sun – Thu · 09:00 – 18:00", he: "א׳ – ה׳ · 09:00 – 18:00" },
    "contact.hours.friday": { en: "Fri · 09:00 – 13:00", he: "ו׳ · 09:00 – 13:00" },
    "contact.hours.saturday": { en: "Sat · Closed", he: "שבת · סגור" },
    "contact.hours.response": { en: "We reply to every message within 1 business day.", he: "אנחנו עונים לכל פנייה תוך יום עסקים אחד." },
    "contact.whatsapp.title": { en: "Prefer WhatsApp?", he: "מעדיפים וואטסאפ?" },
    "contact.whatsapp.subtitle": { en: "Chat directly with a local specialist.", he: "שיחה ישירה עם מומחה מקומי." },
    "contact.whatsapp.cta": { en: "Open WhatsApp", he: "פתחו וואטסאפ" },
    // Sell page extended
    "sell.breadcrumb": { en: "Sell", he: "מכירה" },
    "sell.hero.badge": { en: "For sellers", he: "למוכרים" },
    "sell.valuation.title": { en: "Free home valuation", he: "הערכת שווי חינם" },
    "sell.valuation.subtitle": { en: "Get a confidential, no-obligation market value within 48 hours.", he: "קבלו הערכת שווי שוק חסויה, ללא התחייבות, תוך 48 שעות." },
    "sell.valuation.button": { en: "Request my valuation", he: "בקשו הערכה" },
    "sell.process.title": { en: "Our selling process", he: "תהליך המכירה שלנו" },
    "sell.process.subtitle": { en: "Five clear steps. No surprises.", he: "חמישה שלבים ברורים. בלי הפתעות." },
    "sell.process.step_1_title": { en: "Strategic pricing", he: "תמחור אסטרטגי" },
    "sell.process.step_1_desc": { en: "Comparable analysis, market trends, and a realistic target backed by data.", he: "ניתוח נכסים דומים, מגמות שוק ויעד ריאלי מבוסס נתונים." },
    "sell.process.step_2_title": { en: "Professional preparation", he: "הכנה מקצועית" },
    "sell.process.step_2_desc": { en: "Pro photography, drone footage, staging advice and a polished listing page.", he: "צילום מקצועי, צילומי רחפן, ייעוץ סטיילינג ועמוד נכס מלוטש." },
    "sell.process.step_3_title": { en: "Private network first", he: "קודם הרשת הפרטית" },
    "sell.process.step_3_desc": { en: "Quiet launch to our buyer list and partner agencies before any public exposure.", he: "השקה שקטה לרשימת הקונים ולסוכנויות שותפות לפני כל חשיפה ציבורית." },
    "sell.process.step_4_title": { en: "Curated viewings", he: "סיורים מובחרים" },
    "sell.process.step_4_desc": { en: "Only qualified buyers — your time and privacy are protected.", he: "רק קונים שעברו סינון — הזמן והפרטיות שלכם מוגנים." },
    "sell.process.step_5_title": { en: "Negotiation & closing", he: "משא ומתן וסגירה" },
    "sell.process.step_5_desc": { en: "Hand-held negotiation, legal coordination, all the way to handing over the keys.", he: "ליווי צמוד במשא ומתן, תיאום משפטי ועד למסירת המפתחות." },
    "sell.sold.title": { en: "Recently sold by Spirit", he: "נמכר לאחרונה ע״י Spirit" },
    "sell.sold.subtitle": { en: "A glimpse of homes we placed in trusted hands.", he: "הצצה לבתים שמסרנו לידיים נכונות." },
    "sell.transparency.title": { en: "Transparent partnership", he: "שותפות שקופה" },
    "sell.transparency.item_1_title": { en: "Clear commission", he: "עמלה ברורה" },
    "sell.transparency.item_1_desc": { en: "One agreement, one number, written upfront — no hidden fees.", he: "הסכם אחד, מספר אחד, בכתב מראש — בלי עמלות נסתרות." },
    "sell.transparency.item_2_title": { en: "Weekly updates", he: "עדכונים שבועיים" },
    "sell.transparency.item_2_desc": { en: "You always know where we stand: leads, viewings, market signals.", he: "אתם תמיד יודעים איפה הדברים עומדים: לידים, סיורים ואותות שוק." },
    "sell.transparency.item_3_title": { en: "Exit anytime", he: "יציאה בכל רגע" },
    "sell.transparency.item_3_desc": { en: "Not happy in the first 30 days? Walk away, no penalty.", he: "לא מרוצים ב־30 הימים הראשונים? יוצאים בלי קנס." },
    "sell.faq.title": { en: "Sellers ask us", he: "שאלות שמוכרים שואלים" },
    "sell.faq.q_1": { en: "How long does it take to sell in Zichron Yaakov?", he: "כמה זמן לוקח למכור בזכרון יעקב?" },
    "sell.faq.a_1": { en: "Well-priced homes typically close within 60–90 days. Premium villas can take longer because the qualified buyer pool is smaller.", he: "בתים שמתומחרים נכון נסגרים בדרך כלל תוך 60–90 ימים. וילות פרימיום עלולות לקחת יותר משום שמאגר הקונים מצומצם." },
    "sell.faq.q_2": { en: "Do you list publicly right away?", he: "האם מפרסמים בפומבי מיד?" },
    "sell.faq.a_2": { en: "No. We start with our private buyer network and partner agencies. Public listing only after we agree on timing.", he: "לא. מתחילים מרשת הקונים הפרטית ומסוכנויות שותפות. פרסום פומבי רק לאחר תיאום מולכם." },
    "sell.faq.q_3": { en: "What does the commission cover?", he: "מה כוללת העמלה?" },
    "sell.faq.a_3": { en: "Strategy, professional photography, staging guidance, marketing, qualified-buyer viewings, negotiation, and legal coordination through closing.", he: "אסטרטגיה, צילום מקצועי, ייעוץ סטיילינג, שיווק, סיורים עם קונים שעברו סינון, משא ומתן ותיאום משפטי עד סגירה." },
    "sell.faq.q_4": { en: "Can I work with you while I still live in the property?", he: "אפשר לעבוד אתכם בזמן שאני עדיין גר בבית?" },
    "sell.faq.a_4": { en: "Of course. We schedule viewings around your routine and respect your privacy.", he: "ברור. אנחנו מתאמים סיורים סביב השגרה שלכם ושומרים על הפרטיות." },
    // Properties extended
    "properties.empty.title": { en: "No homes match yet", he: "אין נכסים תואמים כרגע" },
    "properties.empty.subtitle": { en: "Be the first to know when a matching listing arrives.", he: "היו הראשונים לדעת כשיופיע נכס מתאים." },
    "properties.empty.cta": { en: "Notify me on new listings", he: "עדכנו אותי על נכסים חדשים" },
    // Guides cross-content shared
    "guides.related.section_title": { en: "Related guides", he: "מדריכים קשורים" },
    // Moving / Buying / Living FAQ shared title
    "buying.faq.title": { en: "Buyer FAQ", he: "שאלות נפוצות — קונים" },
    "moving.faq.title": { en: "Relocation FAQ", he: "שאלות נפוצות — מעבר" },
    "living.faq.title": { en: "Living in Zichron — FAQ", he: "חיים בזכרון — שאלות נפוצות" },
  };

  const t = useCallback(
    (key: string): string => {
      const row = rows.find((r) => r.key === key);
      if (!row) {
        const fb = localFallbacks[key];
        if (fb) return lang === "he" ? fb.he : fb.en;
        if (import.meta.env.DEV) {
          console.warn(`[i18n] Missing key: "${key}"`);
        }
        return key;
      }
      const val = lang === "he" ? row.value_he : row.value_en;
      if (!val && lang === "he") return row.value_en || key;
      return val || key;
    },
    [rows, lang]
  );

  return { t, rows, isLoading };
}
