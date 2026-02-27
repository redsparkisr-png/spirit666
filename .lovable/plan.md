
# Critical UX Bug Fixes + Legal Compliance Polish

## Summary
Six focused fixes: dropdown clipping bug, "Send Inquiry" mobile flow, property page inquiry form, logo sizing, cookie consent restoration, and mobile layout collision prevention. No font changes. No database changes needed.

---

## A. Search Bar Dropdown Clipping Fix (CRITICAL)

**Root cause**: The hero `<section>` has `overflow-hidden` (line 11 of `HeroSection.tsx`), which clips the absolutely-positioned dropdown panels that extend below the search card.

**Fix 1 -- HeroSection.tsx**: Remove `overflow-hidden` from the hero section className. The `scale-105` on the background image can be contained by adding `overflow-hidden` to the background `<div>` wrapper instead (which already exists at line 19).

**Fix 2 -- SearchBar.tsx**: Increase `max-h-[240px]` to `max-h-[320px]` on the options container (line 95) to ensure all 5 options are visible without scrolling. Add a `console.log` in the data-fetch `useEffect` to log options count for dev verification.

**Fix 3 -- SearchBar.tsx mobile bottom sheet**: The mobile sheet currently works but the `max-h-[70vh]` is fine. Ensure the option list `flex-1 overflow-y-auto` is correct (already is). No further changes needed for mobile.

**Files**: `src/components/HeroSection.tsx`, `src/components/SearchBar.tsx`

---

## B. "Send Inquiry" Button -- Mobile Fix

**Current state**: PropertyDetail.tsx has a mobile sticky CTA bar with a "Send Inquiry" button that tries to `scrollIntoView` an element with id `inquiry-form-mobile` -- but that element does not exist on mobile. The desktop sidebar form has id `inquiry-form`, and there is no mobile-visible form to scroll to.

**Fix**: Add a mobile-visible inquiry form section on PropertyDetail.tsx (placed before "Similar Properties") with `id="inquiry-form-mobile"`. This form will:
- Pre-fill the message field with `"Interested in: {property.title}"`
- Submit to the `leads` table with source `property_page:{slug}`
- Show success toast on submit
- Include validation (name + phone required)

This also addresses **Section C** (compact inquiry form before Similar Properties).

**Files**: `src/components/PropertyDetail.tsx`

---

## C. Property Page Inquiry Form (Before Similar Properties)

Merged with Section B above. Implementation:
1. Insert a compact form section between the FOMO line and Similar Properties
2. Fields: Full Name, Phone, Email, Message (pre-filled with property title + URL)
3. Primary CTA: "Send Inquiry" (charcoal button)
4. Secondary CTA: "WhatsApp Us" (green button)
5. The form uses `id="inquiry-form-mobile"` so the sticky bottom bar's "Send Inquiry" scrolls to it
6. On desktop, the existing sticky sidebar form remains; this new form is visible on all screen sizes as an additional conversion point

**Files**: `src/pages/PropertyDetail.tsx`

---

## D. Logo Sizing Fix

**Current state**: Header.tsx already has `w-[42px] h-[42px] md:w-[58px] md:h-[58px]`. The logo may appear blurry if the source image is low-res at 2x display.

**Fix**: 
- Add `image-rendering: -webkit-optimize-contrast` style for crispness
- Ensure the img tag specifies proper `width` and `height` attributes to prevent layout shift
- Keep rounded-lg and existing sizing

**Files**: `src/components/Header.tsx`

---

## E. Cookie Consent + Legal Footer

**Cookie consent**: The `CookieNotice.tsx` component already exists with Accept All / Reject / Manage Preferences functionality. Need to verify it renders on first visit.

**Fix 1**: Check if the cookie notice is being blocked by existing localStorage. The component uses `cookieConsentV1` key. If the user already accepted, it won't show. This is correct behavior. No code change needed unless the banner was removed from the page -- it's currently in `Index.tsx` (line 43). Verify it appears on other pages too by checking if it's in the layout.

**Fix 2 -- Footer "Cookie Preferences" link**: Add a "Cookie Preferences" button/link in `TrustSection.tsx` footer that clears `cookieConsentV1` from localStorage and dispatches a reset event to re-show the banner.

**Fix 3 -- CookieNotice.tsx**: Add a global event listener for `"cookie-reopen"` that re-shows the banner when the footer link is clicked.

**Accessibility Statement**: Already exists at `src/pages/Accessibility.tsx` with CMS-driven bilingual content. Just needs to be linked in footer (already linked).

**Files**: `src/components/TrustSection.tsx`, `src/components/CookieNotice.tsx`

---

## F. Mobile Layout Collisions

**Current state**: FloatingElements.tsx already hides when a modal is open and shifts upward when cookie banner is visible. PropertyDetail.tsx has a fixed bottom CTA bar.

**Fix 1 -- PropertyDetail.tsx**: When the mobile bottom sheet (from search dropdowns) is open, hide the sticky CTA bar. Add a CSS check or state flag.

**Fix 2**: Add `pb-[env(safe-area-inset-bottom)]` to the mobile sticky CTA bar in PropertyDetail.tsx for iPhone safe areas.

**Fix 3**: Ensure the cookie banner's z-index (90) is below the bottom-sheet overlay (200) so they don't fight.

**Files**: `src/pages/PropertyDetail.tsx`, `src/components/FloatingElements.tsx`

---

## Technical Details

### File changes summary:
1. **HeroSection.tsx**: Move `overflow-hidden` from section to background div only
2. **SearchBar.tsx**: Increase max-height, add dev console.log for option counts
3. **PropertyDetail.tsx**: Add inline inquiry form before Similar Properties with id="inquiry-form-mobile", add safe-area padding to sticky CTA
4. **Header.tsx**: Add image-rendering style for logo crispness
5. **TrustSection.tsx**: Add "Cookie Preferences" link that reopens cookie banner
6. **CookieNotice.tsx**: Add listener for cookie-reopen event

### No changes to:
- Font families (Playfair Display + DM Sans unchanged)
- Database schema (no migrations)
- Admin panel functionality
- Gallery upload logic
- WhatsApp button logic
- Color palette
