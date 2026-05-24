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
    // Contact extended
    "contact.map.title": { en: "Find our office", he: "המשרד שלנו" },
    "contact.map.address": { en: "HaMeyasdim St, Zichron Yaakov, Israel", he: "רחוב המייסדים, זכרון יעקב" },
    "contact.cta.call": { en: "Call us now", he: "התקשרו עכשיו" },
    "contact.cta.email": { en: "Email us", he: "שלחו אימייל" },
    // About extended
    "about.timeline.title": { en: "Our journey", he: "המסע שלנו" },
    "about.timeline.item_1_year": { en: "2019", he: "2019" },
    "about.timeline.item_1_title": { en: "Spirit founded", he: "Spirit נוסדה" },
    "about.timeline.item_1_desc": { en: "Boutique brokerage launched in Zichron Yaakov with a single principle — fewer clients, deeper care.", he: "סוכנות בוטיק נפתחה בזכרון יעקב מתוך עיקרון אחד — פחות לקוחות, יותר תשומת לב." },
    "about.timeline.item_2_year": { en: "2021", he: "2021" },
    "about.timeline.item_2_title": { en: "100 families relocated", he: "100 משפחות עברו" },
    "about.timeline.item_2_desc": { en: "Crossed the 100-relocation mark, mostly olim from France, the US and South Africa.", he: "חצינו את רף 100 המעברים, ברובם עולים מצרפת, ארה״ב ודרום אפריקה." },
    "about.timeline.item_3_year": { en: "2023", he: "2023" },
    "about.timeline.item_3_title": { en: "Private buyer network", he: "רשת קונים פרטית" },
    "about.timeline.item_3_desc": { en: "Launched our curated off-market network — quiet deals between qualified buyers and discreet sellers.", he: "השקנו רשת אוף-מרקט אישית — עסקאות שקטות בין קונים איכותיים למוכרים דיסקרטיים." },
    "about.timeline.item_4_year": { en: "2026", he: "2026" },
    "about.timeline.item_4_title": { en: "288+ homes placed", he: "288+ בתים נמסרו" },
    "about.timeline.item_4_desc": { en: "Still boutique. Still local. Still answering the phone ourselves.", he: "עדיין בוטיק. עדיין מקומיים. עדיין עונים לטלפון בעצמנו." },
    // Moving page CMS
    "moving.section_1_title": { en: "Who Zichron Yaakov is ideal for", he: "למי זכרון יעקב מתאימה" },
    "moving.section_1_body": { en: "Zichron Yaakov attracts young families, couples seeking quality of life, olim from France, the US and South Africa, and buyers looking for a second home in Israel. If you want nature, culture and a real community — this is the place.", he: "זכרון יעקב מושכת משפחות צעירות, זוגות שמחפשים איכות חיים, עולים מצרפת, ארה״ב ודרום אפריקה, וקונים של בית שני בישראל. אם אתם רוצים טבע, תרבות וקהילה אמיתית — זה המקום." },
    "moving.section_2_title": { en: "What to know before you move", he: "מה לדעת לפני המעבר" },
    "moving.section_2_body": { en: "Plan ahead: research schools, walk the neighborhoods, understand municipal taxes (arnona) and public transport. A short call with a local specialist saves weeks of trial and error.", he: "תכננו מראש: בדקו בתי ספר, הכירו שכונות, הבינו ארנונה ותחבורה ציבורית. שיחה קצרה עם מומחה מקומי חוסכת שבועות של ניסוי וטעייה." },
    "moving.section_3_title": { en: "The local market in plain numbers", he: "השוק המקומי במספרים פשוטים" },
    "moving.section_3_body": { en: "Prices have risen consistently — high demand, limited supply, a great location. Understanding price trends, growth zones and appreciation potential is essential to a good decision.", he: "המחירים עולים בעקביות — ביקוש גבוה, היצע מוגבל, מיקום מצוין. הבנת מגמות מחיר, אזורי פיתוח ופוטנציאל השבחה חיונית להחלטה טובה." },
    "moving.section_4_title": { en: "How Spirit walks you through relocation", he: "איך Spirit מלווה את המעבר" },
    "moving.section_4_body": { en: "We don't only sell homes — we hand-hold the whole move: search, negotiation, legal coordination, and post-move acclimation. Local knowledge is the difference.", he: "אנחנו לא רק מוכרים בתים — מלווים את כל המעבר: חיפוש, משא ומתן, תיאום משפטי ואקלימציה אחרי המעבר. הידע המקומי עושה את ההבדל." },
    "moving.stats.title": { en: "Zichron Yaakov at a glance", he: "זכרון יעקב במבט אחד" },
    "moving.stats.item_1_value": { en: "~30 min", he: "~30 דק׳" },
    "moving.stats.item_1_label": { en: "To Haifa", he: "לחיפה" },
    "moving.stats.item_2_value": { en: "~60 min", he: "~60 דק׳" },
    "moving.stats.item_2_label": { en: "To Tel Aviv", he: "לתל אביב" },
    "moving.stats.item_3_value": { en: "26k", he: "26k" },
    "moving.stats.item_3_label": { en: "Residents", he: "תושבים" },
    "moving.stats.item_4_value": { en: "180m", he: "180 מ׳" },
    "moving.stats.item_4_label": { en: "Above sea level", he: "מעל פני הים" },
    "moving.faq.q_1": { en: "Is Zichron Yaakov a good place for English-speaking families?", he: "האם זכרון יעקב מתאימה למשפחות דוברות אנגלית?" },
    "moving.faq.a_1": { en: "Yes — there is a large Anglo, French and South-African community, English-friendly schools and shuls, and active social groups for new immigrants.", he: "כן — קיימת קהילה אנגלית, צרפתית ודרום-אפריקאית גדולה, בתי ספר ובתי כנסת ידידותיים לאנגלית וקבוצות חברתיות פעילות לעולים חדשים." },
    "moving.faq.q_2": { en: "How long does the move from abroad usually take?", he: "כמה זמן לוקח מעבר מחו״ל בדרך כלל?" },
    "moving.faq.a_2": { en: "Most families plan 4–8 months end-to-end: property search, closing, container shipping, and school registration.", he: "רוב המשפחות מתכננות 4–8 חודשים מקצה לקצה: חיפוש נכס, סגירה, משלוח קונטיינר ורישום לבית ספר." },
    "moving.faq.q_3": { en: "Do I need to be in Israel to start the search?", he: "צריך להיות בישראל כדי להתחיל בחיפוש?" },
    "moving.faq.a_3": { en: "No. We run remote video tours, virtual neighborhood walks and shortlist properties before you land — physical viewings come at the end of the funnel.", he: "לא. אנחנו עורכים סיורי וידאו מרחוק, סיורים וירטואליים בשכונות ומכינים מבעוד מועד רשימה מסוננת — סיורים פיזיים בסוף המשפך." },
    "moving.faq.q_4": { en: "What hidden costs should I budget for?", he: "אילו עלויות נסתרות להכניס לתקציב?" },
    "moving.faq.a_4": { en: "Purchase tax, legal fees, brokerage, mortgage origination, betterment levies on certain properties, and roughly 2–4% renovation buffer.", he: "מס רכישה, שכר טרחת עו״ד, תיווך, פתיחת משכנתא, היטלי השבחה בחלק מהנכסים, וכ-2–4% חיץ לשיפוצים." },
    // Buying page CMS
    "buying.section_1_title": { en: "The local property market in 60 seconds", he: "שוק הנדל״ן המקומי ב-60 שניות" },
    "buying.section_1_body": { en: "Historic neighborhoods sit beside new developments, with sea-and-Carmel views and a tight-knit community. Prices vary sharply by location, lot size and proximity to the historic center.", he: "שכונות היסטוריות לצד פיתוח חדש, נופים לים ולכרמל וקהילה לכודה ביחד. המחירים משתנים בחדות לפי מיקום, גודל מגרש וקרבה למרכז ההיסטורי." },
    "buying.section_2_title": { en: "Property types you'll meet", he: "סוגי הנכסים שתפגשו" },
    "buying.section_2_body": { en: "Villas with gardens, family townhouses, garden apartments and centrally located flats. Neighborhoods like Alon, Mordot HaCarmel, Givat Eden and the historic center each serve a different lifestyle.", he: "וילות עם גינות, קוטג'ים משפחתיים, דירות גן ודירות במרכז. שכונות כמו אלון, מורדות הכרמל, גבעת עדן והמרכז ההיסטורי משרתות אורחות חיים שונים." },
    "buying.section_3_title": { en: "The 4 most expensive mistakes", he: "ארבע הטעויות היקרות ביותר" },
    "buying.section_3_body": { en: "Skipping the zoning check (TABA), trusting outdated comps, ignoring betterment levies, and going without local guidance. Any one of them can cost more than the brokerage fee.", he: "לדלג על בדיקת תב״ע, להסתמך על נתוני שוק ישנים, להתעלם מהיטלי השבחה ולוותר על ליווי מקומי. כל אחת מהן יקרה יותר מדמי התיווך." },
    "buying.section_4_title": { en: "How real negotiation works here", he: "איך משא ומתן אמיתי עובד כאן" },
    "buying.section_4_body": { en: "Negotiation in Zichron is human, not aggressive. Knowing seller motivation, average days-on-market by street, and recent comparable closes — that's the difference between a good deal and a great one.", he: "משא ומתן בזכרון הוא אנושי, לא אגרסיבי. להכיר את מוטיבציית המוכר, ימי שיווק ממוצעים לפי רחוב, וסגירות עדכניות — זה ההבדל בין עסקה טובה למצוינת." },
    "buying.checklist.title": { en: "Pre-purchase checklist", he: "צ׳קליסט לפני רכישה" },
    "buying.checklist.item_1": { en: "Tabu (Land Registry) extract — verify ownership and liens", he: "נסח טאבו — לאמת בעלות ושעבודים" },
    "buying.checklist.item_2": { en: "Zoning plan (TABA) — confirm building rights and limits", he: "תב״ע — לאמת זכויות בנייה ומגבלות" },
    "buying.checklist.item_3": { en: "Engineering inspection — structure, damp, roof", he: "בדיקת מהנדס — מבנה, רטיבות, גג" },
    "buying.checklist.item_4": { en: "Mortgage pre-approval before bidding", he: "אישור עקרוני למשכנתא לפני הצעה" },
    "buying.checklist.item_5": { en: "Betterment levy check at the municipality", he: "בירור היטל השבחה בעירייה" },
    "buying.checklist.item_6": { en: "Final lawyer review of the purchase contract", he: "סקירה אחרונה של חוזה הרכישה ע״י עו״ד" },
    "buying.faq.q_1": { en: "What's the typical down payment in Israel?", he: "מהי מקדמה טיפוסית בישראל?" },
    "buying.faq.a_1": { en: "Israeli residents: 25% for a first home. Non-residents / second-home: 50%. Mortgage limits set by the Bank of Israel.", he: "תושבי ישראל: 25% לדירה ראשונה. תושבי חוץ / דירה שנייה: 50%. מגבלות בנק ישראל." },
    "buying.faq.q_2": { en: "How long from offer to keys?", he: "כמה זמן מהצעה ועד מפתח?" },
    "buying.faq.a_2": { en: "Usually 60–120 days. Cash deals can close in 30–45 days; mortgage deals need additional bank-approval time.", he: "בדרך כלל 60–120 ימים. עסקאות מזומן נסגרות ב-30–45 ימים; עסקאות משכנתא דורשות זמן אישור בנק נוסף." },
    "buying.faq.q_3": { en: "Who pays brokerage fees?", he: "מי משלם דמי תיווך?" },
    "buying.faq.a_3": { en: "In Israel both buyer and seller pay brokerage — standard 2% + VAT per side, agreed in writing before any tour.", he: "בישראל גם הקונה וגם המוכר משלמים תיווך — סטנדרט של 2% + מע״מ לכל צד, בכתב לפני כל סיור." },
    "buying.faq.q_4": { en: "Can foreigners buy property in Israel?", he: "האם זרים יכולים לקנות נכס בישראל?" },
    "buying.faq.a_4": { en: "Yes. Foreign nationals can purchase freely, with a higher purchase-tax rate. We handle the entire process remotely.", he: "כן. אזרחים זרים יכולים לרכוש בחופשיות, עם שיעור מס רכישה גבוה יותר. אנחנו מובילים את כל התהליך מרחוק." },
    // Living page CMS
    "living.section_1_title": { en: "Lifestyle you can actually live in", he: "אורח חיים שאפשר באמת לחיות בו" },
    "living.section_1_body": { en: "A historic colony with charming streets, wineries, galleries and restaurants. Clean air, sea-and-Carmel views and a calm rhythm — vibrant without the noise of a big city.", he: "מושבה היסטורית עם רחובות מקסימים, יקבים, גלריות ומסעדות. אוויר נקי, נופים לים ולכרמל וקצב רגוע — תוססת בלי הרעש של העיר הגדולה." },
    "living.section_2_title": { en: "Community that adopts you fast", he: "קהילה שמאמצת אתכם מהר" },
    "living.section_2_body": { en: "Veterans, young families and olim mix together. Cultural events, weekly markets, festivals and neighborhood gatherings make it easy to belong from week one.", he: "ותיקים, משפחות צעירות ועולים — כולם יחד. אירועי תרבות, שווקים שבועיים, פסטיבלים ומפגשי שכונה הופכים את ההשתלבות לטבעית מהשבוע הראשון." },
    "living.section_3_title": { en: "Families and education", he: "משפחות וחינוך" },
    "living.section_3_body": { en: "Strong school system from gan through high school, plenty of after-school programs, and green, safe spaces. Kids grow up with freedom — the reason most families come.", he: "מערכת חינוך חזקה מגן ועד תיכון, חוגים בשפע ומרחבים ירוקים ובטוחים. הילדים גדלים בחופש — הסיבה שרוב המשפחות באות." },
    "living.section_4_title": { en: "Connected to the rest of Israel", he: "מחוברים לשאר הארץ" },
    "living.section_4_body": { en: "Roughly 30 minutes to Haifa, an hour to Tel Aviv. Binyamina rail station connects nationwide, and Highways 2 and 6 give fast north–center access.", he: "כ-30 דקות לחיפה, כשעה לתל אביב. תחנת בנימינה מחברת לכל הארץ, וכבישים 2 ו-6 מספקים גישה מהירה צפון–מרכז." },
    "living.highlights.title": { en: "Local highlights residents love", he: "פינות חמד שתושבים אוהבים" },
    "living.highlights.item_1": { en: "First Aliyah Museum & founders' street", he: "מוזיאון העלייה הראשונה ורחוב המייסדים" },
    "living.highlights.item_2": { en: "Carmel Mey Zait & Tishbi wineries", he: "יקבי כרמל מי זית וטשבי" },
    "living.highlights.item_3": { en: "Ramat HaNadiv gardens & hikes", he: "גני וטיולי רמת הנדיב" },
    "living.highlights.item_4": { en: "Weekly artisan markets in summer", he: "שווקי יוצרים שבועיים בקיץ" },
    "living.faq.q_1": { en: "How safe is Zichron Yaakov?", he: "כמה בטוחה זכרון יעקב?" },
    "living.faq.a_1": { en: "Considered one of the safest towns in the country. Low crime, quiet streets, and a strong neighborhood-watch culture.", he: "נחשבת אחת הערים הבטוחות בארץ. פשיעה נמוכה, רחובות שקטים ותרבות שכנים חזקה." },
    "living.faq.q_2": { en: "Are there English-speaking schools nearby?", he: "האם יש בתי ספר דוברי אנגלית בסביבה?" },
    "living.faq.a_2": { en: "Several bilingual programs in town plus access to international schools in Haifa and the Sharon (35–45 min commute).", he: "מספר תוכניות דו-לשוניות בעיר ונגישות לבתי ספר בינלאומיים בחיפה ובשרון (35–45 דק׳ נסיעה)." },
    "living.faq.q_3": { en: "What about healthcare?", he: "ומה לגבי בריאות?" },
    "living.faq.a_3": { en: "Local clinics from all four kupot, a 24/7 urgent-care center, and 25 minutes to Hillel Yaffe and Rambam hospitals.", he: "מרפאות של כל ארבע הקופות בעיר, מרכז דחוף 24/7 ו-25 דקות לבתי החולים הלל יפה ורמב״ם." },
    "living.faq.q_4": { en: "Is the town religious or secular?", he: "האם העיר דתית או חילונית?" },
    "living.faq.a_4": { en: "Mixed — predominantly traditional and secular, with active religious communities and synagogues across most neighborhoods.", he: "מעורבת — בעיקר מסורתית וחילונית, עם קהילות דתיות פעילות ובתי כנסת ברוב השכונות." },
    // HomesForSale extended
    "homes_for_sale.neighborhoods.title": { en: "Popular neighborhoods", he: "שכונות פופולריות" },
    "homes_for_sale.neighborhoods.item_1_name": { en: "Historic Center", he: "מרכז היסטורי" },
    "homes_for_sale.neighborhoods.item_1_desc": { en: "Charming streets, traditional homes and old-world atmosphere.", he: "רחובות מקסימים, בתים אופייניים ואווירה של פעם." },
    "homes_for_sale.neighborhoods.item_2_name": { en: "Alon", he: "אלון" },
    "homes_for_sale.neighborhoods.item_2_desc": { en: "Green neighborhood with private homes and panoramic views.", he: "שכונה ירוקה עם בתים פרטיים ונופים פנורמיים." },
    "homes_for_sale.neighborhoods.item_3_name": { en: "Mordot HaCarmel", he: "מורדות הכרמל" },
    "homes_for_sale.neighborhoods.item_3_desc": { en: "Close to nature, quiet — ideal for families.", he: "קרבה לטבע ושקט — אידיאלי למשפחות." },
    "homes_for_sale.neighborhoods.item_4_name": { en: "Givat Eden", he: "גבעת עדן" },
    "homes_for_sale.neighborhoods.item_4_desc": { en: "Family-friendly with convenient access to all amenities.", he: "שכונה משפחתית עם גישה נוחה לכל השירותים." },
    // 404
    "notfound.title": { en: "Page not found", he: "הדף שחיפשת לא נמצא" },
    "notfound.subtitle": { en: "The link may have expired, or the property has been sold. We're here to help.", he: "ייתכן שהקישור פג תוקף, או שהנכס כבר נמכר. אנחנו כאן בשבילך." },
    "notfound.home_cta": { en: "Back to homepage", he: "חזרה לעמוד הבית" },
    "notfound.whatsapp_cta": { en: "Chat with us on WhatsApp", he: "דברו איתנו בוואטסאפ" },
    "notfound.popular_title": { en: "Popular pages", he: "דפים פופולריים" },
    // Blog share
    "blog.share.title": { en: "Share this guide", he: "שתפו את המדריך" },
    "blog.toc.title": { en: "In this guide", he: "במדריך הזה" },
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
