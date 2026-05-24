
# תוכנית שיפורים — אתר Spirit Zichron

מטרה: לבצע את כל השיפורים שהצעתי בלי לשבור פיצ'רים קיימים, ולסיים ב-QA מקיף.

## שלב 1 — ריתמוס ופרופורציות באתר הציבורי

**1.1 Section rhythm אחיד**
- ליצור utility class בשם `section` ב-`src/index.css` שמגדיר `py-20 md:py-28` + `container px-6 mx-auto max-w-7xl`.
- לעדכן את כל סקשני העמוד הראשי (`HeroSection`, `AvailableHomes`, `SoldHomes`, `LifestyleSection`, `Testimonials`, `BlueprintPromoSection`, `TeamTrustSection`, `WhyDifferent`, `MarketSnapshot`, `TrustSection`, `ClosingCTA`, `GuidePromoSection`) להשתמש בו.

**1.2 טיפוגרפיה**
- H2 ל-`clamp(28px, 4vw, 44px)` ב-`index.css`.
- `line-height` של גוף בעברית ל-1.7.

**1.3 Audit כפתורים**
- לעבור על כל ה-CTAs ולוודא `rounded-full` עקבי (לפי memory).
- לתקן מקומות עם `rounded-lg` בכפתורים ראשיים.

**1.4 Gold dividers**
- לוודא שמופיע בין כל הסקשנים הראשיים בעמוד הבית.

## שלב 2 — ארגון מחדש של ממשק Admin

**2.1 Sidebar במקום טאבים**
- להחליף את ה-12 טאבים האופקיים ב-`src/pages/Admin.tsx` ב-sidebar עם קיבוץ:
  - **תוכן**: Hero, Content, Blog, Guide
  - **נכסים**: Available, Sold, Property Types, Locations
  - **Social Proof**: Testimonials, Lifestyle
  - **תקשורת**: Leads, WhatsApp
- שמירה על כל הקומפוננטות הקיימות (`AvailableManager`, וכו') ללא שינוי לוגי.

**2.2 Dashboard ראשי**
- מסך ברירת מחדל חדש (`/admin` ללא טאב) עם KPIs:
  - מספר לידים השבוע (מ-`crm_leads`)
  - מספר נכסים פעילים (`available_homes`)
  - מספר נכסים שנמכרו לאחרונה (`sold_homes`)
  - מספר פוסטים מפורסמים
- 4 כרטיסים נקיים בעיצוב המותג.

**2.3 שיפורי UX קטנים**
- חיפוש בסיסי ב-Leads ו-Available (filter על שם/כותרת).
- ב-Admin כפתור חזרה לאתר ולוגו המותג בכותרת.
- מעבר הממשק לעברית (עקביות עם CRM).

## שלב 3 — SEO דינמי

**3.1 Sitemap דינמי**
- ליצור `scripts/generate-sitemap.ts` שמושך נכסים פעילים + פוסטים מ-Supabase.
- להוסיף `predev` ו-`prebuild` ב-`package.json`.
- Base URL: `https://spirit666.lovable.app`.

**3.2 OG meta דינמי לעמוד נכס**
- ב-`PropertyDetail.tsx`: להוסיף `react-helmet-async` עם title, description, og:image (תמונה ראשית של הנכס), canonical.
- להוסיף `HelmetProvider` ב-`src/main.tsx` אם לא קיים.

## שלב 4 — Polish

**4.1 404 ממותג**
- לעצב מחדש את `src/pages/NotFound.tsx` בעיצוב המותג (Primary green, Gold, פונט Frank Ruhl, כפתור חזרה לבית, אופציה ל-WhatsApp).

**4.2 Loading states**
- להחליף spinners ב-`Admin.tsx` ו-`CrmLayout` ב-skeleton/spinner בצבעי המותג (gold/primary במקום blue).

## שלב 5 — QA מקיף

לאחר הביצוע, להריץ דרך browser tool:

1. **עמוד בית `/he`** — לבדוק ריתמוס סקשנים, dividers, CTAs, אין שבירת layout.
2. **עמוד בית `/en`** — אותו דבר ב-LTR.
3. **נכסים `/he/properties`** ו-`/en/properties` — לבדוק SearchBar, slider, רשת נכסים.
4. **נכס בודד** — לפתוח נכס לדוגמה, לוודא מטא-תגיות, גלריה, CTA WhatsApp.
5. **`/admin`** — לוודא login, sidebar, מעבר בין סקשנים, dashboard עם KPIs.
6. **`/crm`** — לוודא שלא נשבר (לא שינינו אותו).
7. **Floating elements** — WhatsApp + Accessibility + Cookie consent לא חופפים, נראים אלגנטיים.
8. **Mobile (375px)** — בדיקה ידנית של 1-2 עמודים מרכזיים.
9. **Console** — אפס errors.
10. **Sitemap** — לאמת ש-`/sitemap.xml` נטען עם רשומות דינמיות.

## הערות טכניות

- **ללא שינויי DB**: כל השיפורים frontend בלבד.
- **תלות חדשה**: `react-helmet-async` (קטנה, סטנדרטית).
- **קבצים שייגעו**: `src/index.css`, `src/pages/Admin.tsx`, `src/pages/NotFound.tsx`, `src/main.tsx`, `src/pages/PropertyDetail.tsx`, ~10 קומפוננטות סקשנים בעמוד הבית, `package.json`, חדש: `scripts/generate-sitemap.ts` + קומפוננטות חדשות ל-AdminSidebar ו-AdminDashboard.
- **לא ייגעו**: CRM, Supabase client/types, auth flow, RLS policies, FloatingElements, AccessibilityWidget, לוגיקת לידים.

## הערכת היקף

שינוי גדול אבל לא מסוכן — רוב העבודה היא טיפוגרפיה/spacing/ארגון UI. הסיכון העיקרי הוא ב-Admin reorganization, ולכן אשמור את כל ה-Manager components כמו שהם ורק אעטוף אותם ב-shell חדש.
