# מה נשאר לסיים את האתר ברמה מקצועית

עברתי על העבודה שכבר בוצעה (Wave 1 + Sell + סבב משני) ועל מה שעוד פתוח. הנה הרשימה המרוכזת של מה שלדעתי שווה להשלים:

## 1. Performance & Core Web Vitals
- בדיקת LCP בדף הבית (Hero image) — `fetchpriority="high"` + preload
- Lazy-load כל הראוטים המשניים ב־`App.tsx` (Sell, About, Contact, Guides, Blog) דרך `React.lazy` + `Suspense`
- ביטול re-renders מיותרים ב־`useSiteContent` (memo + single fetch per session)
- בדיקת bundle size — manualChunks ל־framer-motion, recharts, supabase

## 2. SEO סופי
- יצירת `public/sitemap.xml` דינמי (סקריפט build) הכולל את כל הנכסים והפוסטים
- עדכון `robots.txt` עם הפניה לסייטמאפ
- הוספת `BreadcrumbList` JSON-LD בכל דף פנימי
- בדיקת hreflang בכל הראוטים (`/he/...` ↔ `/en/...`)
- הרצת SEO scan וסגירת ממצאים פתוחים

## 3. אמון והמרה (Conversion)
- **Sticky WhatsApp button** במובייל בכל האתר (לא רק בדף נכס)
- **Exit-intent popup** בדסקטופ עם הצעת הבלופרינט (Lead magnet קיים)
- חיזוק Social proof: מספר עסקאות / שנים בשוק / לוגואים של מדיה — strip מעל ה־footer
- הוספת "Last updated" + reading progress bar בפוסטים בבלוג

## 4. CRM & אוטומציה
- Email notification (Edge Function) על כל ליד חדש למייל של העסק
- WhatsApp notification אופציונלי (Twilio / official API) — דורש החלטה
- דוח שבועי אוטומטי ב־CRM (KPIs)

## 5. נגישות & QA
- בדיקת קונטרסט WCAG AA על כל הטקסטים על רקעים בהירים/כהים
- Skip-to-content link
- בדיקת keyboard navigation בגלריות ובמודלים
- alt חסר בכמה תמונות דינמיות (lifestyle + properties)

## 6. ניקיון קוד
- מחיקת קבצים/components שלא בשימוש (יש כמה שנשארו מסבבים קודמים)
- איחוד duplications ב־PropertyCard / forms
- TypeScript strict על כל ה־hooks

---

## איך מציע להתקדם

הייתי מחלק לשני סבבים:

**סבב A — Quick wins (1 ריצה):** Performance + SEO sitemap + Sticky WhatsApp + Social proof strip + נגישות בסיס. אימפקט מיידי על מהירות, גוגל והמרות.

**סבב B — אוטומציה ועומק:** Email notifications, Exit-intent, ניקיון קוד, CRM reports.

רוצה שאתחיל מ־**סבב A**, מ־**שניהם ביחד**, או נתמקד בפיצ'ר ספציפי מהרשימה?
