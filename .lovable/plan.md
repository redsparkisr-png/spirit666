
# סבב שדרוגים לאתר Spirit Real Estate

מאז הביקור האחרון שלך, השתפרו לי הכלים בתחומי ה-SEO, נגישות, ניתוח ביצועים, ו-UI polish. הנה תוכנית עבודה מסודרת לפי תחומים. אפשר לבחור הכל או רק חלק.

## 1. SEO וגילוי בגוגל
- **תיקון Canonical שגוי** ב-`index.html` – כרגע מצביע ל-`spirit-homes-guide.lovable.app` במקום `spirit666.lovable.app`. זה פוגע באינדוקס.
- **og:url** באותו מקום – לעדכן לדומיין הנכון.
- **JSON-LD מורחב**: להוסיף `RealEstateAgent` עם `address`, `geo`, `areaServed`, `openingHours`, ו-`sameAs` (רשתות חברתיות) – חיזוק Local SEO לזכרון.
- **הרצת סריקת SEO מלאה** (seo--trigger_scan) ותיקון ממצאים חיים.
- **Hreflang audit** – לוודא שכל עמוד EN/HE מצביע נכון אחד על השני.
- **sitemap.xml** – לוודא שכל עמודי האוטוריטי (buying-property, living-in וכו') כלולים עם עדכוני lastmod.

## 2. ביצועים (Core Web Vitals)
- **LCP**: הוספת `fetchpriority="high"` ו-`preload` לתמונת ה-Hero.
- **Fonts**: מעבר ל-`font-display: swap` כבר מובנה, אבל אפשר להסיר משקלים לא בשימוש (Heebo 600/700, Playfair 1,500) – חוסך ~30KB.
- **Lazy loading**: וידוא שכל התמונות מתחת ל-fold משתמשות ב-`loading="lazy"` ו-`decoding="async"`.
- **Image dimensions**: הוספת `width`/`height` מפורשים למניעת CLS בגלריית הלייפסטייל וב-AvailableHomes.

## 3. נגישות (a11y) – חיזוק מעבר ל-Widget הקיים
- סריקת רכיבים ל-icon-only buttons שחסר להם `aria-label`.
- בדיקת ניגודיות של טקסטים זהובים על רקע ירוק (Gold #C8A96A על Primary #0F2E26) – יתכן ש-AA חסר.
- וידוא `<main>` יחיד לכל route.
- Focus-visible states עקביים על כל ה-CTAs.
- `lang="he"` דינמי על `<html>` במעבר שפה (אם לא קיים).

## 4. UX וקונברז'ן
- **Sticky CTA במובייל** באזורי תוכן ארוכים (Buying Guides) – "דברו איתנו" שצף בתחתית.
- **Trust signals** מעל הקפל: הוספת badge עם "20+ עסקאות השנה" או דומה ליד ה-Hero (אם רלוונטי – צריך אישור).
- **Exit intent**: שיקול softer – הצעה עדינה להוריד את ה-Buyer Blueprint לפני יציאה (רק דסקטופ, פעם אחת לסשן).
- **Property cards**: הוספת "WhatsApp ישיר על הנכס הזה" עם prefill של כתובת הנכס.
- **Loading states**: skeletons עדינים יותר בעמוד התוצאות במקום spinner.

## 5. UI Polish (Quiet Luxury)
- **Hero**: הוספת ken-burns עדין (scale 1.0 → 1.05 ב-20s) על תמונת הרקע.
- **Section dividers**: קו זהב דק (1px, opacity 30%) בין סקשנים מרכזיים – ריטמוס ויזואלי.
- **Typography refinement**: tracking שלילי קל (-0.02em) לכותרות Playfair בדסקטופ.
- **Hover על Property Cards**: הצללה רכה יותר + תזוזה של 2px במקום 4px – מרגיש בוטיק יותר.
- **Footer**: ארגון מחדש לעמודות מאוזנות יותר במובייל.

## 6. ניטור ואנליטיקה
- וידוא שאירועי המרה (WhatsApp click, Blueprint download, Contact submit) נשלחים נכון.
- הוספת dataLayer events לאנליטיקס אם יש GTM.

---

## איך נמשיך
אני ממליץ להתחיל בשלושת הראשונים (SEO + ביצועים + נגישות) כי זה ה-impact הגבוה ביותר עם סיכון הכי נמוך לעיצוב הקיים. את ה-UX וה-UI polish נעשה אחרי, עם אישור פרטני לכל שינוי שנוגע ל-look & feel.

**מה תרצה?**
1. הכל לפי הסדר (סבב מלא)
2. רק SEO + ביצועים + נגישות (טכני, ללא שינוי ויזואלי)
3. UX + UI polish (חוויה ויזואלית)
4. תבחר בעצמך – אגיד לך בנפרד אילו פריטים
