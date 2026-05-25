# ניקיון קוד + QA נגישות

## חלק א' — ניקיון קוד

1. **מחיקת components לא בשימוש**
   - סריקה עם `rg` על כל קובץ ב־`src/components/` ו־`src/pages/`
   - מחיקת קבצים ללא ייבוא חי (חשודים מסבבים קודמים: `BlueprintPromoSection` vs `BlueprintSection`, `BuyerBlueprintBlock`, `GuidePromoSection`, `TrustBar` vs `TrustSection`, `MicroTrustLine` — נאמת לפני מחיקה)

2. **איחוד duplications**
   - איחוד טפסי לידים שעדיין משתמשים ב־inline forms במקום `LeadForm` המשותף (`ContactForm.tsx`, `GoldenConversionPoint.tsx` אם רלוונטי)
   - חילוץ `PropertyCard` משותף אם יש כפילות בין `Properties.tsx`, `HomesForSale.tsx`, `AvailableHomes.tsx`

3. **TypeScript hardening**
   - הסרת `any` מ־hooks (`useSiteContent`, `useCrmAuth`)
   - הוספת types מדויקים ל־props של forms

## חלק ב' — QA נגישות (WCAG AA / IS 5568)

4. **בדיקת קונטרסט**
   - סריקה של שימושים ב־`text-muted-foreground/50`, `text-gray-*`, opacity נמוכה על רקעים בהירים
   - החלפה ב־semantic tokens (`text-foreground`, `text-muted-foreground`)

5. **Icon-only buttons**
   - הוספת `aria-label` לכל `<Button size="icon">` ללא טקסט (בעיקר ב־Header, גלריות, modals)

6. **תמונות**
   - וידוא `alt` על כל `<img>` דינמי ב־`Properties`, `LifestyleSection`, `BlogPost`
   - שימוש ב־`alt=""` לתמונות דקורטיביות

7. **Keyboard navigation**
   - בדיקת `PropertyModal`, גלריית lifestyle, ו־`AccessibilityWidget` — Escape, Tab trap, focus return
   - וידוא focus-visible על כל אינטראקטיב

8. **Landmarks & headings**
   - וידוא `<main>` יחיד לכל route (ב־`LanguageLayout`)
   - בדיקת סדר H1→H2→H3 ב־guides ובדפי נחיתה

9. **Skip-to-content**
   - וידוא שהוא כבר קיים ב־App.tsx; אם לא — הוספה

## תוצר
- רשימת קבצים שנמחקו
- רשימת תיקוני נגישות (severity: critical/warning/info)
- אישור Build + restart דב' סרבר
- מעבר חזותי על ה־preview לאחר שינויים