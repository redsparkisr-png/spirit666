
## סקירה — מה ראיתי על העמודים

עברתי על כל העמודים הציבוריים: **About, Sell, Contact, Properties, HomesForSale, BuyingProperty, LivingInZichron, MovingToZichron, Blog/BlogPost, PropertyDetail, BlueprintDownload, BuyerGuide2026, NotFound** וגם משפטיות (Privacy/Terms/Cookies/Accessibility).

## בעיות חוצות־עמודים (קריטיות)

1. **טקסט קשיח בקוד בעברית ואנגלית** — `MovingToZichron`, `BuyingProperty`, `LivingInZichron`, `HomesForSale`, `Blog`, `Properties` כולן עם `isHe ? "..." : "..."` בעשרות מקומות. מפר ישירות את כלל ה־Core: "No hardcoded copy; fetch all text from Supabase site_content". האדמין לא יכול לעדכן את התוכן בלי מפתח.
2. **כפתורי CTA `rounded-lg` במקום `rounded-full`** ב־Sell, Moving, Buying, Living, HomesForSale — מפר כלל ה־Core. Contact בלבד עובד נכון.
3. **אין `<title>` ו־meta description ייחודיים לרוב הדפים** — רק Blog מגדיר ידנית. כל היתר יורשים את ה־meta הגלובלי → פגיעה רצינית ב־SEO.
4. **אין hreflang per page** לשפה אלטרנטיבית — חיוני לאתר דו־לשוני.
5. **אין JSON-LD לדפי משנה** — חסר `Article` ב־BlogPost, `Place` בדפי שכונות, `FAQPage` בדפי מדריך, `RealEstateListing` ב־PropertyDetail.
6. **כפילות לוגיקה של טפסים** — Sell, Contact, ExitIntent, Home form וגם BlueprintDownload משכפלים את אותו טופס + ולידציה. אין `<LeadForm>` משותף.
7. **שלושה מדריכי SEO (Moving / Buying / Living) זהים חזותית** — אותו תבנית של "4 אייקונים + טקסט + CTA + קישורים". משעמם, ולא ממנף את התוכן ל־conversion.
8. **אין FAQ באף עמוד משנה** — מפסיד גם UX וגם FAQ schema ל־Google.
9. **`HomesForSale` ו־`Properties` חופפים** — שניהם רשימת נכסים. אין הבחנה ברורה (SEO landing מול search results).

## בעיות פר־עמוד

### About
- אין תמונת hero, אין סיפור חברה ויזואלי (timeline / "from 2019 to today").
- אין רישיונות ותעודות (מספר רישיון תיווך, חברות באיגוד).
- כרטיסי הצוות שטוחים — חסר תפקיד מפורט, רקע, שפות, LinkedIn/WhatsApp ישיר.
- אין מצגת ערכים ויזואלית, אין "מאחורי הקלעים" (תמונות צוות, משרד, פעילות בקהילה).
- אין breadcrumb.

### Sell
- חלש מאוד למה שאמור להיות עמוד המרת מוכרים.
- חסר: **הערכת שווי חינם** כ־lead magnet ייעודי (לא רק "השאר פרטים").
- חסר **תהליך מכירה ב־5 שלבים** (timeline ויזואלי).
- חסר **נכסים שמכרנו לאחרונה** — הטבלה `properties_sold` כבר קיימת ולא מנוצלת!
- חסר אסטרטגיית שיווק (וידאו, צילום מקצועי, רשת קונים פרטית).
- חסר שקיפות עמלות / "מה כלול בליווי".
- חסר טסטמוניאל של מוכרים (שונה מקונים).
- כפתור CTA `rounded-lg` במקום `rounded-full`.

### Contact
- אין מפת Google Maps של המשרד.
- אין שעות פעילות / זמן תגובה מובטח.
- אין כפתור WhatsApp ראשי לצד הטופס (יש רק floating).
- אין `tel:` / `mailto:` על פרטי הקשר — לא ניתן ללחוץ במובייל.
- אין הזמנה לפגישה במשרד (Calendly או slot picker).
- אין breadcrumb.

### Properties + HomesForSale
- כפילות תוכן ותפקוד.
- מצב "אין תוצאות" שטוח — חסר CTA "Notify me when matching listings arrive" (Save Search lead magnet).
- אין שמירת חיפושים (saved searches) — הזדמנות לידים אדירה.
- אין השוואת נכסים (Compare).
- אין מפת מיקום על Properties.
- HomesForSale לא מציג טווח מחירים אמיתי לפי שכונה (יכול לבוא מ־DB).
- ה־PropertyCard המקומי משוכפל בין שני הקבצים — לחלץ ל־`<PropertyCardCompact>`.

### Moving / Buying / Living in Zichron
- שלושתם זהים מבחינת layout. צריך בידול חזותי וערך אמיתי:
  - **LivingInZichron**: להוסיף גלריית שכונות (קישור ל־Properties עם פילטר), מפת אינטראקטיב, רשימת בתי ספר וגנים, סקירת מסעדות/יקבים, אקלים ועלות מחיה.
  - **MovingToZichron**: צ'קליסט להורדה (PDF/email gate), השוואה לערים סמוכות (פרדס חנה, בנימינה), טבלת מיסים וארנונה.
  - **BuyingProperty**: FAQ של 8-12 שאלות אמיתיות, "common pitfalls" כקוביות אזהרה אדומות, **חישוב משכנתא** מובנה, רשימת עורכי דין/שמאים מומלצים.
- בכולם להוסיף תמונת hero, breadcrumb צבעוני יותר, ו"מאמרים קשורים" מ־blog_posts לפי category.

### Blog / BlogPost
- אין profile של מחבר עם תמונה.
- אין Table of Contents במאמרים ארוכים.
- אין כפתורי שיתוף (WhatsApp / Facebook / Email / Copy).
- אין מאמרים קשורים בסוף פוסט.
- אין newsletter capture / "follow updates".
- אין `Article` JSON-LD.
- חיפוש רק client-side — בסדר לעכשיו, אבל להוסיף מיון לפי קטגוריה ויזואלית יותר ברורה.

### PropertyDetail
- (לעיין לעומק בנפרד) — צריך mortgage calculator, similar properties, share buttons, schedule a viewing modal עם Calendar pick.

### BlueprintDownload / BuyerGuide2026
- ה־guide הוא 1179 שורות — סביר שיש בו תוכן קשיח. לוודא שיש email gate אמיתי, thank-you page, ושליחה לוואטסאפ אוטומטית.

### NotFound (404)
- בדרך כלל בסיסי. להוסיף: חיפוש, נכסים חמים, מאמרים אחרונים, קישור לבית.

## תוכנית — תעדוף מומלץ

עבודה גדולה. אני מציע לחלק ל־**שלושה גלים** ולעבוד גל־גל:

### 🌊 גל 1 — היגיינה חוצה־אתר (חובה)
1. **חילוץ כל הטקסט הקשיח ל־CMS** ב־Moving, Buying, Living, HomesForSale, Blog hero, Properties hero, Sell, About, Contact. מיגרציה אחת גדולה ל־`site_content`.
2. **רכיב `<LeadForm>` משותף** עם variants (sell / contact / valuation / blueprint), לאחד 5 טפסים שונים.
3. **תיקון כל ה־CTA הראשיים ל־`rounded-full`** בכל הדפים.
4. **`<PageMeta>` רכיב** שמזריק title + description + canonical + hreflang פר־דף; להוסיף לכל דף.
5. **`<RelatedGuides>` רכיב** שמופיע בסוף כל דף תוכן וטוען 3 מאמרים אחרונים מאותה קטגוריה.

### 🌊 גל 2 — שדרוג עמודי המרה
1. **Sell**: hero חזק + הערכת שווי חינם (טופס נפרד עם שדות נכס) + 5-step timeline + grid של נכסים שנמכרו לאחרונה (מ־`properties_sold`) + testimonials של מוכרים + שקיפות עמלות + FAQ.
2. **Contact**: Google Maps embed + שעות פעילות + WhatsApp prominent CTA + tel/mailto clickable + Calendly או slot picker + FAQ.
3. **About**: hero עם תמונה, timeline של החברה, רישיונות/תעודות, כרטיסי צוות מורחבים, גלריית "מאחורי הקלעים".

### 🌊 גל 3 — תוכן ו־SEO מתקדם
1. **בידול 3 עמודי המדריכים** (Moving / Buying / Living) — תוכן ייחודי, אינפוגרפיקות, FAQ.
2. **JSON-LD ייעודי** לכל סוג עמוד: Article, FAQPage, Place, RealEstateListing.
3. **שיפור Properties**: empty-state עם Save Search lead, מיון מתקדם, Compare, מפה.
4. **BlogPost**: TOC, author profile, share buttons, related posts, newsletter capture.
5. **404 מותג** עם נכסים חמים ומאמרים.

---

איזה גל לבצע ראשון? ההמלצה שלי: **גל 1**, כי הוא משפיע על הכל ופותח את הדלת לעריכה אדמינית. אחריו לקפוץ ל**Sell** ב־גל 2 (העמוד הכי חלש שעלול להניב לידים גדולים), ואז להמשיך.

אם תרצי, אעשה את **גל 1** במלואו כצעד אחד גדול (זה ~3-4 קומפוננטים חדשים + מיגרציה אחת + עדכון 8 עמודים), או נצמצם רק ל־CMS + LeadForm + rounded-full ונשאיר את ה־PageMeta ו־RelatedGuides לגל הבא.
