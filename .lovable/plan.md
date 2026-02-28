

# Spirit Real Estate — Boutique Polish + Bug Fixes

## Overview
Targeted fixes and refinements across 6 files. No redesign, no font changes, no CMS/admin changes. Focus on: logo sizing, hero search panel styling, dropdown clipping bug, property card clickability, property detail page CTA cleanup, and minor polish.

---

## 1. Header Logo Sizing

**File: `src/components/Header.tsx`**

Current logo is `w-[42px] h-[42px] md:w-[58px] md:h-[58px]`. User wants mobile 38-40px, desktop 52-56px. Adjust to:
- Mobile: `w-10 h-10` (40px)
- Desktop: `md:w-14 md:h-14` (56px)
- Increase header py slightly for breathing room
- Ensure "Spirit Real Estate" wordmark remains `text-base` and visible on desktop

---

## 2. Hero + Search Panel Refinement

**File: `src/components/HeroSection.tsx`**

- Reduce hero from `100svh` to `85svh` to show less empty sky and hint at content below
- Add a subtle dark glass card wrapper around the SearchBar at the bottom (semi-transparent `bg-black/40 backdrop-blur-sm` with rounded corners, subtle border, and soft shadow) to give the search inputs definition against the hero image
- Keep current gradient overlay (already subtle)

**File: `src/components/SearchBar.tsx`** (hero context only)

- Desktop: Wrap the 5-column grid in a padded container with `bg-black/40 backdrop-blur-sm rounded-2xl p-5 border border-white/10 shadow-lg` for the glass card effect
- Mobile: Same treatment for the mobile stacked layout
- This replaces the current fully-transparent underline-only approach which makes inputs hard to read

---

## 3. Search Dropdown Bug Fix (CRITICAL)

**File: `src/components/SearchBar.tsx`**

The console logs confirm 5 locations and 5 types load correctly. The visual bug where "only 2 items show" is likely caused by the dropdown's `max-h-[320px]` being fine but the parent Dropdown component's relative positioning being clipped.

Fixes:
- Add ESC key handler to close dropdown (missing currently)
- Add `useEffect` with keydown listener for Escape when dropdown is open
- Ensure the desktop dropdown `z-[100]` is correct (already set)
- Verify no parent `overflow-hidden` clips it (HeroSection already fixed in previous iteration -- `overflow-hidden` is only on the background div)

The Dropdown component currently uses a function component without `forwardRef`, causing the React warning in console. Fix by wrapping Dropdown as a proper named component (not critical for UX but cleans up console errors).

---

## 4. Property Card Full Clickability

**File: `src/components/AvailableHomes.tsx`**

Current: Only the "View Curated Home" button links to the property page. The image area has swipe handlers but no click-to-navigate.

Fix:
- Wrap the entire card in a `Link` component to `/${lang}/property/${property.slug || property.id}`
- Keep carousel prev/next buttons with `e.stopPropagation()` and `e.preventDefault()` so they don't trigger navigation
- Keep swipe handlers on the image area (they already call `e.stopPropagation`)
- Add `cursor-pointer` to the card (already implied by Link)
- The existing "View Curated Home" button can remain as a visual CTA but the whole card is clickable

---

## 5. Property Detail Page — Replace Heavy Form with CTA Block

**File: `src/pages/PropertyDetail.tsx`**

Current: A full InquiryForm (name, phone, email, message, two buttons) is shown inline before Similar Properties on ALL screen sizes. User says "Do NOT insert heavy form before Similar Properties."

Fix:
- Replace the inline `<InquiryForm id="inquiry-form-mobile" />` (line 232) with a compact CTA block:
  - Heading: "Interested in this home?" (from CMS key)
  - Two buttons side-by-side: WhatsApp + Send Inquiry
  - "Send Inquiry" scrolls to the sidebar form on desktop (`#inquiry-form`) or opens WhatsApp/scrolls to top on mobile
- Keep the sticky sidebar InquiryForm for desktop (already exists, line 262)
- Keep mobile sticky bottom CTA bar (already exists, line 270)
- Update the mobile sticky CTA's "Send Inquiry" to scroll to the sidebar form area or open a simple sheet

---

## 6. Cookie Consent (Already Exists)

The CookieNotice component is already in `Index.tsx` (line 43) and works with Accept All / Reject / Manage Preferences. The footer already has "Cookie Preferences" button (TrustSection.tsx line 62-67).

Only needed: Ensure CookieNotice is rendered on ALL pages (not just Index). Currently it's only in Index.tsx.

Fix: Move `<CookieNotice />` into `LanguageLayout.tsx` so it appears on every page.

---

## 7. Accessibility (Already Mostly Done)

- Skip-to-content link exists in Index.tsx (line 22-24)
- Accessibility page exists and is linked in footer
- aria-labels exist on key elements
- Focus states exist via Tailwind ring utilities

Only needed: Add skip-to-content to other pages (Properties, About, etc.) or better yet, add it to LanguageLayout.tsx so it appears everywhere.

---

## Files Modified Summary

1. **`src/components/Header.tsx`** — Logo size adjustment (40px mobile, 56px desktop)
2. **`src/components/HeroSection.tsx`** — Reduce hero to 85svh, add glass card wrapper around search
3. **`src/components/SearchBar.tsx`** — Add ESC handler, add glass card styling in hero context, fix forwardRef warning
4. **`src/components/AvailableHomes.tsx`** — Make entire property card clickable via Link wrapper
5. **`src/pages/PropertyDetail.tsx`** — Replace inline form with compact CTA block before Similar Properties
6. **`src/components/LanguageLayout.tsx`** — Add CookieNotice + skip-to-content link globally

## What Stays Untouched
- All fonts (Playfair Display, DM Sans, Heebo)
- Database schema, RLS policies
- Admin panel, CMS content keys
- Color palette (already refined to deep green + gold)
- Footer structure (already polished)
- WhatsApp button logic
- Property detail gallery

