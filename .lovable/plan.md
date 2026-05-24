## המטרה
להחזיר את האופטימיזציה (WebP דינמי דרך Supabase Image Transformations) לגלריית הלייפסטייל — אבל בלי שום חיתוך של התמונה. התמונה המקורית תישמר במלואה, רק תוקטן לרוחב המתאים ותומר ל-WebP.

## השינוי
1. **`src/lib/image.ts`** — להוסיף אפשרות `resize` ל-`ImageOpts` (`'cover' | 'contain' | 'fill'`, ברירת מחדל `cover` כדי לא לשבור את כרטיסי הנכסים). כשהקורא מבקש `contain` נוסיף `&resize=contain` ל-URL, וכן נחליף `format=origin` ל-`format=webp` (כדי שגם JPG ישנים יומרו ל-WebP בלייב).
2. **`src/components/LifestyleSection.tsx`** — להחזיר את `optimizedImageUrl(item.image_url, { width: 1200, quality: 78, resize: 'contain' })` בשלוש נקודות (דסקטופ ראשי, דסקטופ עם hover, מובייל). רוחב 1200 כדי שגם רטינה תיראה חד.
3. **התאמת הקונטיינר ב-`LifestyleSection`** — `aspect-[4/3]`/`aspect-[3/4]` ימשיכו להגדיר את הקופסה, אבל ה-`<img>` יקבל `object-contain` במקום `object-cover`, עם רקע ניטרלי (`bg-sand-light` / `bg-card`) כדי שאם יחסי התמונה לא תואמים נראה מסגרת נקייה ולא חיתוך. ככה התמונה מוצגת *במלואה* תמיד.

## מה לא משתנה
- `AvailableHomes`, `SoldHomes`, `PropertyDetail` — ממשיכים עם `cover` (כי הכרטיסים תוכננו לפורמט 4:3 קבוע).
- העלאות חדשות — `compressToWebP` בממשק האדמין נשאר.
- אין שינויי DB/RLS.

## QA
1. דסקטופ `/he` ו-`/en` — 6 התמונות מוצגות במלואן, ללא חיתוך, עם רקע עדין מסביב במידת הצורך.
2. מובייל — הקרוסלה (aspect-[3/4]) מציגה את כל התמונה.
3. Network panel — ה-URL כולל `format=webp&resize=contain` והקובץ קטן משמעותית מהמקור.
4. אין שגיאות בקונסול.