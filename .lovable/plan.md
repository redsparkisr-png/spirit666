

# Implementation Plan: Homepage Polish — Gallery, Off-Market, Guide Flow, Testimonials

## Part 1 — Lifestyle Gallery: Main Image + Thumbnails on Mobile

**File**: `src/components/LifestyleSection.tsx`

Replace the current mobile swipe carousel (lines 226-260) with a main-image + thumbnail-row pattern:

- Add `selectedIdx` state (default 0)
- **Main image**: Full-width `aspect-[4/3]` with `rounded-2xl`, shows `mobileItems[selectedIdx]` with title/desc overlay (reuse `renderCard` logic)
- **Thumbnail row**: Below main image, a horizontal scrollable row of small thumbnails (`w-16 h-16 rounded-lg object-cover`) with `overflow-x-auto snap-x`. Active thumbnail gets `ring-2 ring-gold`. Tapping sets `selectedIdx`.
- Remove dot indicators
- Keep desktop grid unchanged
- Keep framing line (already exists at line 131-133)

## Part 2 — Off-Market CTA Upgrade

**File**: `src/components/AvailableHomes.tsx` (lines 238-254)

Replace the current lightweight off-market text block with a full premium FOMO conversion block:

- Wrap in a visually distinct container: `bg-primary rounded-2xl p-8 md:p-12 mt-14 max-w-3xl mx-auto text-center`
- Title: bold, `text-primary-foreground`, use the new copy
- Two paragraphs of body text
- Gold CTA button linking to WhatsApp with `MessageCircle` icon
- Helper text below CTA in `text-primary-foreground/50`

Update CMS values via migration for `home.offmarket.title`, `home.offmarket.text_1`, `home.offmarket.text_2`. Add new keys: `home.offmarket.cta`, `home.offmarket.helper`.

**Hebrew copy**: 
- Title: "רוב הקונים בכלל לא רואים את ההזדמנויות הכי טובות"
- Text 1: "חלק מהבתים המבוקשים בזכרון יעקב נסגרים עוד לפני שהם מגיעים ללוחות."
- Text 2: "אלה הזדמנויות שעוברות דרך השוק המקומי, קשרים ישירים ופניות פרטיות — ולכן מי שלא מחובר בזמן, פשוט לא רואה אותן."
- CTA: "קבלו גישה להזדמנויות פרטיות"
- Helper: "שלחו הודעה ונעדכן אתכם כשנכסים רלוונטיים מגיעים לשוק — גם אם הם לא פורסמו פומבית."

**English copy**:
- Title: "Most buyers never even see the best opportunities"
- Text 1: "Some of the most desirable homes in Zichron Yaakov are sold before they ever reach public listing sites."
- Text 2: "These opportunities move through local relationships, private conversations and early market access — so buyers who are not connected early often miss them completely."
- CTA: "Get Access to Private Opportunities"
- Helper: "Message us and we'll let you know when relevant homes reach the market — even before they are publicly listed."

## Part 3 — Guide Duplication Cleanup

**File**: `src/pages/Index.tsx`

Currently the guide section has two consecutive components: `GoldenConversionPoint` (dark CTA block) + `BlueprintPromoSection` (detailed guide with bullets). They appear back-to-back which feels repetitive.

**Fix**: 
- Remove `GoldenConversionPoint` from position 5 (inside `#buyer-guide-section`)
- Keep only `BlueprintPromoSection` as the main guide section
- Move `GoldenConversionPoint` lower — place it after `Testimonials` and before `TeamTrustSection` as a lighter reminder CTA
- The hero secondary CTA already scrolls to `#buyer-guide-section`, which will now contain only `BlueprintPromoSection`

New order:
```
Hero → TrustBar → ShortTestimonial → AvailableHomes → BlueprintPromoSection (guide) → LifestyleSection → Testimonials → GoldenConversionPoint (reminder) → TeamTrustSection → ClosingCTA
```

## Part 4 — Hebrew Testimonials Full Local Adaptation

**Database migration** to update `site_content` values:

Update all Hebrew testimonial values to use Israeli names, locations and context:

| Key | New Hebrew Value |
|-----|-----------------|
| `home.testimonials.title` | "מה אומרים לקוחות שכבר עברו את התהליך" |
| `home.testimonials.subtitle` | "משפחות מרחבי הארץ שמצאו את הבית שלהן בזכרון יעקב" |
| `home.testimonials.author_1` | "דויד ושרה מזרחי" |
| `home.testimonials.context_1` | "רעננה · 2024" |
| `home.testimonials.quote_1` | "חיפשנו בית בזכרון יעקב במשך חודשים. ספיריט הכירו כל רחוב ושכונה, וזה עשה את כל ההבדל." |
| `home.testimonials.author_2` | "אורן כהן" |
| `home.testimonials.context_2` | "הרצליה · 2024" |
| `home.testimonials.quote_2` | "הרגשנו שמישהו באמת מייצג אותנו. התקשורת הייתה שקופה, ותמיד ידענו מה קורה." |
| `home.testimonials.author_3` | "נועם ושירי לוי" |
| `home.testimonials.context_3` | "הוד השרון · 2024" |
| `home.testimonials.quote_3` | "ההיכרות של ספיריט עם השוק המקומי עשתה את כל ההבדל. ידענו שאנחנו מקבלים החלטה נכונה." |
| `home.testimonials.author_4` | "איילת ועידו פרידמן" |
| `home.testimonials.context_4` | "תל אביב · 2023" |
| `home.testimonials.quote_4` | "ספיריט ליוו אותנו בכל צעד — מהסיור הראשון ועד החתימה. מעולם לא הרגשנו לבד בתהליך." |
| `home.testimonials.author_5` | "משפחת ברק" |
| `home.testimonials.context_5` | "כפר סבא · 2024" |
| `home.testimonials.quote_5` | "מקצועיים, דיסקרטיים ובאמת מושקעים במציאת הבית הנכון למשפחה שלנו. ממליצים בחום." |
| `home.testimonials.cta_text` | "הזדמנויות פרטיות ממעטות להתפרסם." |
| `home.testimonials.cta_button` | "בקשו גישה פרטית" |

English values remain unchanged (international audience).

Also update the `Testimonials.tsx` initials to match new Hebrew names (use first initials of Hebrew names for both: DM, AK, NL, AF, MB).

