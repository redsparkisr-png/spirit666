## הבעיה
בכניסה ל-`/admin` מופיעה השגיאה "Failed to verify admin role. Please retry." למרות שהמשתמש `redboll@gmail.com` מחובר בהצלחה ויש לו תפקיד `admin` בבסיס הנתונים.

## הסיבה
ב-`src/hooks/useAuth.ts`:
1. ה-`useEffect` כולל את `loading` ברשימת התלויות — זה גורם ל-effect לרוץ מחדש בכל פעם ש-`loading` משתנה, יוצר תזמון מירוצים בין הטיימר, ה-subscription וה-`getSession`.
2. בודק את ההרשאה עם **שתי קריאות RPC במקביל** (`has_role` ל-admin ול-super_admin) דרך `Promise.all`. אם אחת משתי הקריאות נכשלת רגעית — כל הבדיקה נופלת ל-`catch` ומציגה שגיאה.
3. אין retry אוטומטי וה-timeout של 8 שניות מתחיל לפני שה-session נטען.

## התיקון
לשכתב את `useAuth.ts` כך שיעבוד כמו `useCrmAuth.ts`:

1. **קריאה אחת** לטבלת `user_roles` עם `select("role").eq("user_id", u.id)` במקום שתי קריאות RPC. ה-policy "Users can view own roles" כבר מאפשרת זאת.
2. בדיקה האם המערך המוחזר מכיל `admin` או `super_admin` → `setIsAdmin(true)`.
3. הסרת `loading` מתלויות ה-`useEffect` כדי למנוע ריצות חוזרות.
4. הוספת לוג ברור ל-console במקרה של כשל אמיתי, כדי להקל על דיבוג עתידי.

## קבצים שישתנו
- `src/hooks/useAuth.ts` — שכתוב לוגיקת `checkRole` ותיקון ה-`useEffect`.

לא נדרשים שינויים במסד הנתונים, ב-RLS, או בקומפוננטות אחרות.
