## המטרה
התמונות ימלאו את כל המסגרת ללא שוליים לבנים — חזרה לחיתוך `object-cover` בכל גלריות הנכסים, כפי שהיה לפני השינוי האחרון.

## מה ישתנה
בכל מקום שבו שונה ל-`object-contain` נחזיר ל-`object-cover` (מילוי מלא של המסגרת, עם חיתוך עדין בקצוות), ונחזיר את אפקט הזום ב-hover שהוסר.

## קבצים
1. `src/components/AvailableHomes.tsx` — קרוסלת דף הבית: `object-contain object-center` → `object-cover object-center`
2. `src/pages/Properties.tsx` — כרטיסי נכסים: `object-contain` → `object-cover`
3. `src/pages/HomesForSale.tsx` — כרטיסי נכסים: `object-contain` → `object-cover`
4. `src/components/PropertyModal.tsx` — מודאל: `object-contain object-center` → `object-cover object-center`
5. `src/pages/PropertyDetail.tsx` — תמונה ראשית, רצועת ממוזערות, לייטבוקס, ובלוק "נכסים דומים": `object-contain` → `object-cover`, והחזרת זום ב-hover בכרטיסים
6. `src/pages/Sell.tsx` — `object-contain` → `object-cover`

## תוצאה
כל תמונות הנכסים ימלאו את המסגרת לרוחב ולגובה ללא שוליים לבנים, בתצוגה אחידה ונקייה.
