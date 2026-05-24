## הבעיה
`object-contain` בקופסה עם יחס קבוע (`aspect-[4/3]` בדסקטופ, `aspect-[3/4]` במובייל) יוצר שוליים לבנים בצדדים כשהתמונה לא באותו יחס בדיוק.

## הפתרון
לבטל את היחס הקבוע של הקופסה — להציג כל תמונה ביחס הטבעי שלה. כך אין חיתוך וגם אין שוליים.

### דסקטופ (`grid grid-cols-2 lg:grid-cols-3`)
- מסירים `aspect-[4/3]`, מסירים את הרקע (`bg-sand-light`).
- ה-`<img>` יקבל `w-full h-auto` במקום `h-full object-contain`.
- כדי שהשורות לא ייראו "קופצות" יותר מדי, נעטוף את הגריד ב-CSS `columns` (masonry פשוטה): `columns-2 lg:columns-3 gap-7` במקום `grid`, וכל פריט יקבל `mb-7 break-inside-avoid`. ככה התמונות מסתדרות לפי גובהן הטבעי בלי שוליים ובלי חיתוך.
- ה-overlay של ה-hover נשאר ממוקם `absolute inset-0` מעל ה-`<img>`.

### מובייל (קרוסלה)
- מסירים `aspect-[3/4]` והרקע.
- ה-`<img>` יקבל `w-full h-auto max-h-[80vh] object-contain` (אבל כיוון שאין יותר קופסה עם יחס שונה, ה-contain פשוט יציג את התמונה במלואה ללא שוליים).
- הקופסה של הטקסט (gradient bottom) נשארת `absolute bottom-0 inset-x-0` — תיצמד לתחתית התמונה בפועל.
- לוגיקת ה-`handleScroll` נשארת — `el.clientWidth` עדיין עובד.

### transform על hover
- האנימציה הקיימת `group-hover:scale-105` נשמרת — היא תעבוד על `<img>` ישירות.

## קבצים
- `src/components/LifestyleSection.tsx` בלבד.

## מה לא משתנה
- `optimizedImageUrl(..., resize: "contain", format: "webp")` נשאר — WebP מהיר.
- `AvailableHomes`, `SoldHomes` — לא נוגעים.
- אין שינויי DB/RLS.

## QA
1. דסקטופ `/he` ו-`/en` — כל 6 התמונות מוצגות במלואן, ללא שוליים לבנים, ביחס הטבעי שלהן, פרוסות יפה ב-masonry.
2. מובייל — קרוסלה מציגה כל תמונה במלואה ללא שוליים, הטקסט נצמד לתחתית התמונה.
3. אין שגיאות בקונסול.