

# Premium Polish + SearchBar Fix

## Problem
The mobile bottom sheet renders options with dark-theme text colors (`text-white/70`) on a light `bg-card` (white) background, making them invisible. Desktop dropdowns work but need polish. Header/hero sizing needs minor tweaks. Footer needs nav links added.

## Changes

### 1. Fix SearchBar Dropdown Color Bug (CRITICAL)

**File: `src/components/SearchBar.tsx`**

The `panelContent` variable always uses dark-theme classes (`text-white/70`, `hover:bg-white/10`) regardless of context. The mobile bottom sheet uses `bg-card` (light), so text is invisible.

**Fix:** The `panelContent` must use the `inline` prop (or detect mobile context) to pick correct text colors:
- Mobile bottom sheet (light bg): use `text-foreground/80`, `hover:bg-muted`, checkmark `text-gold`
- Desktop hero dropdown (dark bg): keep `text-white/70`, `hover:bg-white/10`
- Inline (properties page): use foreground colors

Split the `panelContent` rendering to be context-aware, using `isMobile` and `inline` to determine color scheme. When rendering inside the mobile bottom sheet, always use light-bg-compatible colors.

Also increase z-index on desktop dropdown from `z-50` to `z-[100]` to ensure it renders above hero overlay.

### 2. Header Polish

**File: `src/components/Header.tsx`**

Minor tweaks (most already done in previous batches):
- Ensure "Spirit Real Estate" wordmark is visible on desktop with slightly larger text (`text-base` instead of `text-sm`)
- Increase header padding from `py-4` to `py-5` for more breathing room

### 3. Footer Enhancement

**File: `src/components/TrustSection.tsx`**

Add missing footer elements:
- Add Spirit Real Estate logo at top of footer
- Add quick nav links row (Home, Properties, Sell, About, Contact)
- Add Cookie Policy link next to Privacy, Terms, Accessibility
- Add WhatsApp/contact line
- Keep clean, minimal layout

### 4. Skip-to-Content Link

**File: `src/pages/Index.tsx`** (and other page files)

Add a visually hidden skip-to-content link at the top of `<main>` that becomes visible on focus, linking to `#main-content`. Add `id="main-content"` to the first content section after the header.

### 5. Minor Spacing/Style Tweaks

- **MicroTrustLine**: Slightly increase text size for readability (`text-sm` to `text-[15px]`)
- **SearchBar hero card**: Ensure frosted glass effect is clearly visible with `backdrop-blur-lg` instead of `backdrop-blur-md`

## Files Modified
1. `src/components/SearchBar.tsx` -- fix color bug, increase z-index
2. `src/components/Header.tsx` -- wordmark size, padding
3. `src/components/TrustSection.tsx` -- full footer with nav links
4. `src/pages/Index.tsx` -- skip-to-content link

## What Stays Untouched
- All database tables, RLS policies, gallery upload logic
- WhatsApp button, exit popup, cookie consent
- Admin panel
- Font families (Playfair Display + DM Sans)
- Property detail pages
- All CMS content keys

