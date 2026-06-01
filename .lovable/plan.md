# הצגת כל תמונות הנכסים במלואן — ללא חיתוך

המטרה: בכל מקום שמוצגת תמונת נכס (תצוגה מקדימה/כרטיס וגם תצוגה פתוחה), התמונה תוצג בשלמותה ללא חיתוך ובלי שינוי יחס/קומפוזיציה.

## עיקרון הפתרון
היום הכרטיסים משתמשים ב־`object-cover` בתוך מסגרת ביחס קבוע (4:3), מה שחותך את התמונה. אחליף ל־`object-contain` ואוסיף רקע אחיד למסגרת כדי שכשיש יחס שונה יופיעו שוליים נקיים במקום חיתוך. מסגרת ה־4:3 נשמרת כדי לא לשבור את הרשת — רק התוכן בתוכה יוצג מלא.

## קבצים שיעודכנו

1. `src/pages/Properties.tsx` (כרטיסי נכסים, ~שורה 51)
   - `object-cover` → `object-contain` + רקע אחיד למסגרת

2. `src/pages/HomesForSale.tsx` (כרטיסי נכסים, ~שורה 51)
   - `object-cover` → `object-contain` + רקע

3. `src/components/AvailableHomes.tsx` (קרוסלת דף הבית, ~שורה 88)
   - `object-cover object-center` → `object-contain` + רקע, הסרת זום ב־hover שמשנה קומפוזיציה

4. `src/components/PropertyModal.tsx` (~שורה 70)
   - `object-cover object-center` → `object-contain` + רקע

5. `src/pages/PropertyDetail.tsx` — בלוק "נכסים דומים" (~שורה 462)
   - `object-cover` → `object-contain` + רקע, הסרת זום ב־hover

6. `src/pages/Sell.tsx` (~שורה 175)
   - `object-cover` → `object-contain` + רקע

עמוד הנכס עצמו (תמונה ראשית, ממוזערות, לייטבוקס) כבר מציג מלא —