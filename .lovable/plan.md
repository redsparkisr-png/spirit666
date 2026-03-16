

# Spirit Real Estate — Targeted Fixes

## Summary
The codebase is already in good shape from previous iterations. This pass addresses the remaining console errors and the few gaps between current state and the requirements.

---

## 1. Fix Missing i18n Key: `property.detail.interested_title`

**File: `src/hooks/useSiteContent.ts`**

The console shows `[i18n] Missing key: "property.detail.interested_title"`. Add this key to the `localFallbacks` object:
- EN: "Interested in this home?"
- HE: "מעוניינים בנכס הזה?"

---

## 2. Fix forwardRef Console Warnings

**File: `src/pages/PropertyDetail.tsx`**

Two `forwardRef` warnings appear:
- `InquiryForm` is defined as an inline function component inside `PropertyDetail` and receives an `id` prop but React tries to pass a ref. Fix by converting `InquiryForm` to use `React.forwardRef` or by extracting it outside the render function as a standalone component with proper typing.

The simplest fix: move `InquiryForm` outside the `PropertyDetail` component and pass `property`, `formData`, etc. as props. This prevents React from trying to assign a ref to an inline component.

**File: `src/components/Header.tsx`**

The Header forwardRef warning comes from it being used somewhere that passes a ref. Since Header doesn't need a ref, wrap it with `React.forwardRef` to silence the warning, or check the call site. The warning points to PropertyDetail's render -- likely the `<Header />` call. This is a React quirk with function components; wrapping Header in `forwardRef` with a no-op ref fixes it cleanly.

---

## 3. Property Detail "Send Inquiry" Mobile Behavior

**File: `src/pages/PropertyDetail.tsx`**

Current: The CTA block's "Send Inquiry" button tries `getElementById("inquiry-form")` (desktop sidebar, hidden on mobile) and falls back to `openWhatsApp()`. This is functional but inconsistent with user expectation.

Fix: On mobile, when `#inquiry-form` is not visible, scroll to `#inquiry-form-mobile` (the CTA block itself) and open WhatsApp as a more explicit action. OR better: make the "Send Inquiry" button in the mobile sticky bar scroll to the CTA block AND show a toast prompting the user to use WhatsApp or call. This keeps the flow consistent.

Actually, the simplest robust fix: change the CTA block's "Send Inquiry" to always open WhatsApp with a pre-filled message (since there's no standalone form on mobile). The desktop sidebar form handles desktop users.

---

## 4. Verify All Existing Features Are Working

Already confirmed working:
- Header: logo centered, sizes correct (40px mobile, 56px desktop)
- Hero: 85svh, dark glass card wrapper around search
- Search: ESC handler, click-outside close, z-[100] dropdowns, mobile bottom sheets
- Property cards: fully wrapped in `Link`, clickable everywhere
- Cookie consent: global in `LanguageLayout`, reopen from footer
- Accessibility: skip-to-content in `LanguageLayout`, accessibility page linked in footer
- Footer: gold divider, cookie preferences button, legal links

---

## Files Modified

1. **`src/hooks/useSiteContent.ts`** -- Add `property.detail.interested_title` fallback (EN/HE)
2. **`src/pages/PropertyDetail.tsx`** -- Extract InquiryForm to fix forwardRef warning, improve Send Inquiry mobile fallback
3. **`src/components/Header.tsx`** -- Wrap in forwardRef to fix console warning

