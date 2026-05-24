# תוכנית — סבב סיום: SEO דינמי + ביצועי תמונות

## מצב נוכחי (מה שכן קיים)

- Code splitting (React.lazy לכל הדפים), manualChunks ב-Vite, lazy loading על תגי `<img>`, פונטים non-blocking. זה כבר טוב.
- **חסר**: התמונות שמנהל המשרד מעלה דרך ה-Admin נשמרות **כפי שהן** (JPG/PNG מהמצלמה, לפעמים 3-8MB), ללא המרה ל-WebP וללא resize. זו הסיבה הגדולה ביותר לטעינה איטית.
- חסר: sitemap דינמי, og:image דינמי לכל נכס.

## מה אבצע

### 1. אופטימיזציית תמונות אוטומטית בממשק הניהול (ההשפעה הגדולה ביותר)

`src/components/admin/ImageManager.tsx`:
- לפני העלאה ל-Supabase Storage, להמיר כל תמונה אוטומטית ל-**WebP** ולשנות גודל ל-max 2000px (רוחב) באמצעות `<canvas>` בדפדפן — ללא תלות חדשה, ללא עבודה למשתמש.
- איכות 0.82 (איזון איכות/גודל). תוצאה צפויה: ירידה של 70-85% במשקל קובץ.
- שמירת שם קובץ עם סיומת `.webp`.
- הצגת הודעת toast עם החיסכון ("נדחס מ-4.2MB ל-380KB").

### 2. Rendering מהיר של תמונות קיימות

יצירת helper `src/lib/image.ts` עם פונקציה `optimizedImageUrl(url, { width, quality })` שמשתמש ב-Supabase Image Transformations (קיים בחינם ב-Storage):
```
?width=800&quality=75&format=webp
```
- עדכון `AvailableHomes`, `SoldHomes`, `LifestyleSection`, `PropertyDetail` כך שתמונות הכרטיסים יבקשו רוחב 800px, וגלריית הנכס תבקש 1600px.
- זה אופטימלי גם לתמונות שכבר הועלו בעבר (לא צריך להעלות שוב).

### 3. LCP — Preload לתמונת ה-Hero

ב-`HeroSection`: להוסיף `<link rel="preload" as="image" fetchpriority="high">` לתמונה הראשית, ו-`loading="eager"` במקום `lazy` (היום ה-Hero כנראה lazy בטעות).

### 4. OG meta דינמי לעמוד נכס

`src/pages/PropertyDetail.tsx` כבר מזריק `<meta name="description">` ידנית — להרחיב לאותה גישה (DOM injection, ללא תלות חדשה ב-react-helmet) עבור:
- `og:title`, `og:description`, `og:image` (תמונה ראשית של הנכס דרך optimizedImageUrl), `og:url`, `twitter:card`.

### 5. Sitemap דינמי

`supabase/functions/sitemap/index.ts` — Edge Function ציבורית שמחזירה `application/xml` עם כל הנכסים הפעילים + פוסטים מה-DB.
- הוספת rewrite ב-`public/_redirects` כך ש-`/sitemap.xml` יפנה ל-Edge Function. (אם לא ניתן, להחליף את ה-`sitemap.xml` הסטטי ב-redirect ידני בקובץ).
- חלופה פשוטה יותר: script שרץ ב-`prebuild` ומייצר את `public/sitemap.xml`. **אבחר את האפשרות הזו** — פשוטה ויציבה.

### 6. QA לאחר ביצוע

- בדיקת ביצועים: Network panel — לוודא שתמונות `<img>` חוזרות כ-WebP עם הגדלים הנכונים.
- העלאת תמונה דרך ה-Admin — לוודא המרה ל-WebP והודעת חיסכון.
- בדיקת `view-source` של עמוד נכס — לוודא תגי og מלאים.
- `/sitemap.xml` — לוודא רשומות דינמיות.
- לוודא שלא נשבר: עמוד בית HE/EN, רשת נכסים, עמוד נכס, גלריה, Admin upload, CRM.

## קבצים שייגעו

- ערוך: `src/components/admin/ImageManager.tsx`, `src/components/AvailableHomes.tsx`, `src/components/SoldHomes.tsx`, `src/components/LifestyleSection.tsx`, `src/pages/PropertyDetail.tsx`, `src/components/HeroSection.tsx`, `package.json` (prebuild), `public/sitemap.xml` (יוחלף בייצור).
- חדש: `src/lib/image.ts`, `scripts/generate-sitemap.mjs`.
- **לא** ייגעו: CRM, DB schema, RLS, auth, FloatingElements.

## הערכת סיכון

נמוך. ההמרה ל-WebP בדפדפן היא טכניקה סטנדרטית (Canvas API). תמונות ישנות ימשיכו לעבוד דרך Supabase transforms שמופעלות אוטומטית. אין שינויי DB.
