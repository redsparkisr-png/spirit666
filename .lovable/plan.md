

# Refactor Images for Manual Editing & Fix Cookie Banner

## Overview
Make all images across the landing page directly editable via Lovable's Visual Editor (static `img` tags with plain `src` attributes, no dynamic CSS filters), and fix the cookie banner for proper behavior and conversion-friendliness.

---

## 1. Remove Dynamic Image Filters

**HeroSection.tsx**
- Remove the inline `style={{ filter: 'contrast(1.1) saturate(1.2) brightness(1.02)' }}` from the hero `<img>` tag
- Keep the image as a plain `<img>` with `object-cover` and `object-[center_35%]` only
- The dark green gradient overlay div stays (it's separate from the image)

## 2. Simplify Image Components Across Sections

**AvailableHomes.tsx (Property Cards with Carousel)**
- Keep the `MiniCarousel` component as-is -- it already uses plain `<img>` tags with standard `src` imports
- Each property's `images` array already maps to static asset imports, making them individually replaceable by swapping the file in `src/assets/`
- No dynamic filters to remove here -- already clean
- Aspect ratio is enforced by `h-56` container -- consistent

**SoldHomes.tsx**
- Already uses plain `<img>` tags with static imports -- no changes needed
- Images are replaceable by swapping files in `src/assets/`

**LifestyleSection.tsx**
- Already uses plain `<img>` tags with static imports in a clean grid
- Aspect ratio enforced by `aspect-[4/3]` -- already correct
- The hover overlay (`bg-foreground/0` to `bg-foreground/5`) is on a separate div, not the image itself -- image remains editable
- No changes needed

**WhyDifferent.tsx (Team)**
- Already uses plain `<img>` tags with static imports -- no changes needed

## 3. Cookie Banner Fix

**CookieNotice.tsx** -- Rewrite with these improvements:
- Add an "X" close button (top-right corner) using lucide `X` icon
- Add a "Privacy Policy" text link (links to `/privacy`)
- Change localStorage key to `cookieConsent` (as specified)
- On Accept OR Close, hide banner and store `cookieConsent=true`
- Reposition to `bottom-4` instead of `bottom-20` to avoid covering CTAs but stay visible
- Style: white/card background, subtle shadow, small text, gold Accept button, green accents
- Keep the `AnimatePresence` animation for elegance

---

## Technical Details

### Files to modify:
1. **`src/components/HeroSection.tsx`** -- Remove `style={{ filter: ... }}` from hero image (line 21)
2. **`src/components/CookieNotice.tsx`** -- Rewrite with X button, Privacy Policy link, updated localStorage key, and repositioned layout

### Files that need NO changes (already clean):
- `src/components/AvailableHomes.tsx` -- images already static and editable
- `src/components/SoldHomes.tsx` -- images already static and editable
- `src/components/LifestyleSection.tsx` -- images already static and editable
- `src/components/WhyDifferent.tsx` -- images already static and editable

### Summary
Most image components are already properly structured with static imports and plain `<img>` tags. The only dynamic image styling is the CSS filter on the hero image. The cookie banner needs a more complete implementation with close button, privacy link, and proper positioning.

