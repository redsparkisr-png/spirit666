

# Final Polish Pass — Implementation Plan

## Part 1: Rename Guides → Blog
**Files**: `Header.tsx` (line 30), `TrustSection.tsx` (line 15, 91), `ClosingCTA.tsx` (line 82-84), `Index.tsx` (line 83-84)
- Change `"מדריכים ותובנות"` → `"בלוג"` and `"Guides"` → `"Blog"` in navigation labels only
- Keep footer guide section title "מדריכי זכרון יעקב" as-is (that's a page title, not nav)
- Update `ClosingCTA.tsx` footer link text similarly

## Part 2: Lifestyle Gallery — Mobile Carousel
**File**: `LifestyleSection.tsx`
- Add framing line above gallery: `"הבתים של זכרון הם רק חלק מהסיפור."` / `"The homes are only part of the story."`
- Keep the current `grid` layout on desktop (unchanged)
- On mobile (`md:hidden`), replace the grid with a horizontal swipe carousel:
  - Use `overflow-x-auto snap-x snap-mandatory` with `snap-center` cards
  - Show one large image at a time (`min-w-[85vw]`)
  - Add dot indicators below (small gold dots, active = solid, inactive = gold/30)
  - Use `useRef` + `IntersectionObserver` to track active slide
  - Limit to 4-5 strongest images on mobile (first 5 from `display`)
  - Hide the current 6-image grid on mobile

## Part 3: RTL/LTR Sweep
Most RTL is already well-handled via `i18n.tsx` setting `dir` on `<html>`. Key fixes:
- **ShortTestimonial.tsx**: Hebrew quote still mentions "מחו״ל" (buying from abroad) — must be adapted for Part 5
- **Header.tsx active link styling**: Uses physical `borderLeftWidth`/`borderRightWidth` — convert to logical `borderInlineStartWidth`/`paddingInlineStart`
- **BlueprintPromoSection.tsx line 76**: `items-center` on bullet `li` should be `items-start` for multi-line text in RTL
- **FloatingElements.tsx**: WhatsApp message is English-only even in Hebrew mode — should use CMS

## Part 4: Hero Alignment — Center Both Languages
**File**: `HeroSection.tsx`
- Replace the side-aligned text block (line 86: `items-end text-right mr-auto md:ml-auto md:pr-[6%]` for HE, `items-start text-left ml-auto md:pl-[6%]` for EN) with a centered layout:
  - `max-w-[640px] mx-auto flex flex-col items-center text-center`
- Center CTA buttons: remove `items-end`/`items-start`, use `items-center`
- Remove the directional gradient overlays (lines 62-75) that favor one side — use a uniform center-friendly overlay
- Keep search bar centered (already is)

## Part 5: Hebrew Testimonials — Israeli Market Adaptation
- **ShortTestimonial.tsx**: Replace the Hebrew quote. Current: `"רכישת נכס בזכרון יעקב מחו״ל הרגישה פשוטה..."` → adapt to Israeli buyer context, e.g. `"חיפשנו בית בזכרון יעקב וספיריט ליוותה אותנו מהרגע הראשון. ההיכרות שלהם עם השוק המקומי עשתה את כל ההבדל."` / Attribution: `"דניאל ונעמה לוי, תל אביב"`
- **TrustBar.tsx**: English item "English-Speaking Guidance" is fine for EN. Hebrew items already adapted ✓
- **TeamTrustSection.tsx line 12**: Eliran's HE role `"שיווק בינלאומי וקונים מחו״ל"` → change to `"שיווק דיגיטלי ופיתוח עסקי"` for Hebrew context
- **Testimonials.tsx**: Review CMS-driven testimonials. The `context` keys may contain international references — these are CMS-driven so we note them but can't fix in code unless we update the CMS keys
- **BlueprintPromoSection.tsx line 69**: Hebrew subtitle mentions `"דוברי אנגלית"` — replace with `"כל מה שצריך לדעת לפני שקונים בית בזכרון יעקב"` for HE

## Part 6: Heebo Font for Hebrew
**File**: `src/index.css`
- Add CSS rules that apply Heebo specifically when `[dir="rtl"]` is active:
```css
[dir="rtl"] body,
[dir="rtl"] .font-body {
  font-family: 'Heebo', system-ui, sans-serif;
}
[dir="rtl"] .font-display,
[dir="rtl"] h1, [dir="rtl"] h2, [dir="rtl"] h3 {
  font-family: 'Frank Ruhl Libre', 'Heebo', Georgia, serif;
}
```
- This ensures Hebrew gets Heebo for body and Frank Ruhl Libre for headings without affecting English

## Part 7: Final Polish

**A. Reduce duplication**: The `ShortTestimonial` (after TrustBar) and `Testimonials` section both show testimonials. Keep both but ensure they have distinct content.

**B. Floating actions cleanup**: 
- Remove the "View Homes" floating button on mobile (`FloatingElements.tsx` lines 74-89) — it competes with the WhatsApp button and hero CTA. Keep only the WhatsApp FAB.

**C. Tighten mobile sections**:
- Reduce `LifestyleSection` padding from `py-16` to `py-12` on mobile
- The lifestyle bullet list (7 items) is long on mobile — collapse behind "show more" or keep as-is since it's content-rich

**D. CTA clarity**: Already clean. No changes needed.

**E. Footer/blog cleanup**:
- The SEO links section in `Index.tsx` (lines 63-89) partially duplicates footer guide links. Remove the standalone SEO links section — the footer already has these links.
- In `TrustSection.tsx` footer, update "מדריכים ותובנות" → "בלוג" to match Part 1

**F. General**: No other major issues found.

## Implementation Order
1. Database: No migrations needed
2. `src/index.css` — Add Heebo RTL font rules
3. `Header.tsx` — Rename nav label, fix active link to logical properties
4. `TrustSection.tsx` — Rename footer nav label
5. `ClosingCTA.tsx` — Rename link label  
6. `Index.tsx` — Remove standalone SEO links section (footer has them)
7. `HeroSection.tsx` — Center text block for both languages
8. `LifestyleSection.tsx` — Add framing line, mobile carousel with dots
9. `ShortTestimonial.tsx` — Adapt Hebrew quote for Israeli market
10. `TeamTrustSection.tsx` — Adapt Eliran's Hebrew role
11. `BlueprintPromoSection.tsx` — Fix Hebrew subtitle, fix bullet alignment
12. `FloatingElements.tsx` — Remove "View Homes" floating button on mobile

