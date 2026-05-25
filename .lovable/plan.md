## עדכון פרטי קשר במסמכים משפטיים

### 1. מיגרציית CMS (`site_content`)
עדכון שני שדות שמכילים מייל ישן `info@spirit-nadlan.co.il`:
- `privacy.contact_body` (HE + EN) — החלפת פרטי הקשר למייל `spiritisraelhomes@gmail.com`, טלפון `+972-52-282-0632`, כתובת `HaChochit 15, Zichron Yaakov 3091668`.
- `accessibility.feedback_body` (HE + EN) — אותו עדכון פרטי קשר.

### 2. `src/pages/Accessibility.tsx`
החלפת כל ה־placeholders הריקים בפרטים האמיתיים:
- `[מספר טלפון]` → `+972-52-282-0632`
- `[כתובת אימייל]` → `spiritisraelhomes@gmail.com`
- `[כתובת העסק]` → `החוחית 15, זכרון יעקב 3091668`
- אותו דבר בגרסה האנגלית (Phone / Email Address / Business Address).

### 3. אימות
חיפוש סופי לוודא שאין יותר התייחסויות ל־`spirit-nadlan` או `spiritrealestate.co.il` בקוד או ב־CMS.
