/**
 * Homepage FAQ — single source of truth shared by the visible FAQ (Index.tsx)
 * and the FAQPage JSON-LD (page.tsx), so the schema always matches the on-page
 * FAQ. Approved safe copy: no prices, tax, mortgage, commission, appreciation,
 * forecasts, price-gap or investment claims. Not auto-translated.
 */

export type HomeFaqItem = { q: string; a: string };

export const homeFaqEn: HomeFaqItem[] = [
  {
    q: "What does Spirit Real Estate help buyers do in Zichron Yaakov?",
    a: "Spirit Real Estate helps buyers understand the local market, compare neighborhoods, review suitable homes and move forward with more confidence. Our focus is on practical local guidance in Zichron Yaakov and the Carmel Coast, not just sending listings.",
  },
  {
    q: "Where should I start if I want to buy a home in Zichron Yaakov?",
    a: "Start by clarifying how you want to live: near the historic center, in a quieter family neighborhood, closer to nature, or in a newer and more practical setting. From there, review suitable homes and speak with a local agent before falling in love with a property online.",
  },
  {
    q: "Do you work with overseas buyers?",
    a: "Yes. We regularly help overseas buyers who are exploring a purchase in Zichron Yaakov, the Carmel Coast and nearby communities. We help explain local areas, property types, viewing logistics and the questions to ask before moving forward.",
  },
  {
    q: "Do you also help local Israeli buyers?",
    a: "Yes. The website is useful for overseas buyers, but Spirit also works with Israeli families, move-up buyers and local clients who want clear guidance, access to suitable homes and a local team that knows the area well.",
  },
  {
    q: "Which areas do you cover?",
    a: "Our main focus is Zichron Yaakov and the surrounding Carmel Coast area, including nearby communities such as Binyamina and Pardes Hanna-Karkur when relevant. The exact fit depends on the buyer, the property type and the lifestyle they are looking for.",
  },
  {
    q: "How do I choose between Zichron Yaakov neighborhoods?",
    a: "Each area offers a different lifestyle. Some buyers prefer the historic center and pedestrian streets, while others prefer quieter family neighborhoods, views, gardens or newer buildings. The best first step is to compare neighborhoods by daily life, not only by the property itself.",
  },
  {
    q: "Can Spirit Real Estate help me sell a home in Zichron Yaakov?",
    a: "Yes. Spirit helps sellers position their property clearly, prepare the marketing story, reach relevant buyers and manage inquiries professionally. Sellers can start by contacting the team or visiting the selling page.",
  },
  {
    q: "How can I contact Spirit Real Estate?",
    a: "You can contact Spirit through WhatsApp, the contact form or the property pages. Share what you are looking for, your preferred area and your timeline, and the team will guide you to the next step.",
  },
];

export const homeFaqHe: HomeFaqItem[] = [
  {
    q: "במה ספיריט נדל״ן עוזרת לקונים בזכרון יעקב?",
    a: "ספיריט נדל״ן עוזרת לקונים להבין את השוק המקומי, להשוות בין שכונות, לבדוק נכסים מתאימים ולהתקדם בצורה בטוחה יותר. המטרה היא לא רק לשלוח מודעות, אלא לתת ליווי מקומי ומעשי בזכרון יעקב ובאזור חוף הכרמל.",
  },
  {
    q: "מאיפה מתחילים אם רוצים לקנות בית בזכרון יעקב?",
    a: "כדאי להתחיל מהשאלה איך אתם רוצים לחיות: קרוב למרכז ההיסטורי, בשכונה משפחתית ושקטה, ליד טבע ונוף, או בסביבה חדשה ופונקציונלית יותר. אחרי שמבינים את אורח החיים הרצוי, קל יותר לבדוק נכסים בצורה נכונה ולא להתאהב רק בתמונה יפה.",
  },
  {
    q: "האם אתם מלווים גם קונים מחו״ל?",
    a: "כן. ספיריט מלווה קונים מחו״ל שבוחנים רכישה בזכרון יעקב, בחוף הכרמל וביישובים סמוכים. הליווי כולל הסבר על אזורים, סוגי נכסים, תיאום סיורים, שאלות חשובות לבדיקה וחיבור לאנשי מקצוע רלוונטיים לפי הצורך.",
  },
  {
    q: "האם השירות מתאים גם לקונים ישראלים?",
    a: "כן. האתר פונה גם לקונים מחו״ל, אבל ספיריט עובדת גם עם משפחות ישראליות, משפרי דיור וקונים מקומיים שמחפשים ליווי ברור, נכסים מתאימים והיכרות אמיתית עם זכרון יעקב והסביבה.",
  },
  {
    q: "באילו אזורים ספיריט מתמקדת?",
    a: "ההתמקדות המרכזית היא בזכרון יעקב ובאזור חוף הכרמל, כולל יישובים סמוכים כמו בנימינה ופרדס חנה־כרכור כאשר זה רלוונטי. ההתאמה תלויה בסוג הנכס, באורח החיים הרצוי ובצרכים של הקונה או המוכר.",
  },
  {
    q: "איך בוחרים שכונה בזכרון יעקב?",
    a: "לכל אזור בזכרון יעקב יש אופי אחר. יש קונים שמעדיפים את המושבה והמרכז ההיסטורי, אחרים מחפשים שכונה משפחתית ושקטה, ויש מי שחשוב לו נוף, גינה, קרבה לטבע או נכס חדש יותר. הבחירה הנכונה מתחילה בשגרת החיים ולא רק בנכס עצמו.",
  },
  {
    q: "האם ספיריט נדל״ן מלווה גם מוכרי נכסים?",
    a: "כן. ספיריט עוזרת לבעלי נכסים להציג את הבית בצורה נכונה, לבנות סיפור שיווקי ברור, להגיע לקונים מתאימים ולנהל פניות בצורה מקצועית. מוכרים יכולים להתחיל דרך עמוד המכירה או בפנייה ישירה לצוות.",
  },
  {
    q: "איך יוצרים קשר עם ספיריט נדל״ן?",
    a: "אפשר ליצור קשר דרך וואטסאפ, דרך טופס יצירת הקשר או מתוך עמודי הנכסים באתר. ספרו לנו מה אתם מחפשים, באיזה אזור אתם מתעניינים ומה לוח הזמנים שלכם, ונעזור לכם להבין את הצעד הבא.",
  },
];
