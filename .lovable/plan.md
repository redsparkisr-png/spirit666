## סגירת כל פתיחי ה-SEO

**מה ייעשה:**

1. **Canonical דינמי לכל ראוט** — התקנת `react-helmet-async`, עטיפת האפליקציה ב-`HelmetProvider`, והסרת ה-`<link rel="canonical">` הסטטי מ-`index.html`.

2. **Per-route meta + Open Graph** — רכיב `<SEO>` משותף שמוסיף `title`, `description`, `canonical`, `og:title/description/url/type` לכל עמוד:
   - דפים סטטיים: Home, Properties, HomesForSale, Selling, Blog, Privacy, Terms, Accessibility, Cookies
   - דפים דינמיים: BlogPost (לפי הפוסט), PropertyDetail (לפי הנכס)

3. **Article JSON-LD** — בכל פוסט בלוג, JSON-LD מסוג `Article` עם headline, datePublished, author, image.

4. **Sitemap מלא** — עדכון `scripts/generate-sitemap.ts`:
   - הוספת `/privacy`, `/terms`, `/accessibility`, `/cookies`, `/sell`
   - גרסאות `/he/*` ו-`/en/*` לכל ראוט
   - שליפת כל הפוסטים והנכסים מ-Supabase לכתובות דינמיות

5. **`public/llms.txt`** — קובץ סיכום קצר באנגלית לכלי AI עם תיאור המותג, קישורים מרכזיים והפניה ל-sitemap.

6. **robots.txt** — וידוא ש-`Sitemap:` מצביע ל-`https://spirit666.lovable.app/sitemap.xml`.

7. **סימון Findings כ-fixed** — לאחר השינויים, עדכון כל ה-findings הרלוונטיים ב-SEO panel והפעלת סריקה חוזרת.

**קבצים מושפעים:**
- `src/main.tsx` (HelmetProvider)
- `index.html` (הסרת canonical סטטי)
- `src/components/SEO.tsx` (חדש)
- ~10 דפים (הוספת `<SEO>`)
- `scripts/generate-sitemap.ts`
- `public/llms.txt` (חדש)
- `public/robots.txt` (אימות)
