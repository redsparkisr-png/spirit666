
# Complete Boutique Upgrade — Spirit Real Estate

## Overview
Transform the site into a premium image-first boutique experience with a redesigned hero, compact mobile search with "More Filters" bottom sheet, refined color palette, boutique copy, and polished property cards. No font changes. No database changes. No breaking existing functionality.

---

## 1. Hero Section — Image-First Refinement

**File: `src/components/HeroSection.tsx`**

- Replace heavy gradient overlay (`from-black/50 via-black/35 to-black/65`) with a subtle bottom-only gradient (`from-transparent via-transparent to-black/50`) so the image dominates (~70% visible)
- Remove heavy `textShadow` from H1; use a subtle `0 1px 8px rgba(0,0,0,0.3)` instead
- Increase H1 `line-height` from `1.15` to `1.25` for an airier feel
- Increase whitespace: add `mb-12` between H1 and search area
- Reduce motion intensity: change `y: 25` to `y: 10` for gentler fade-in
- Remove the glassmorphism card wrapper from SearchBar (handled in SearchBar itself)

## 2. Search Experience Redesign

**File: `src/components/SearchBar.tsx`** — Major rewrite

### Mobile (hero context, `inline=false`):
- Show only 3 fields in a compact row: **Location**, **Property Type**, **CTA button**
- Add a "More Filters" text button that opens a bottom sheet containing:
  - Bedrooms (pill buttons)
  - Price range slider
  - Apply / Clear buttons
- Replace bordered input triggers with **underline-style** inputs (transparent bg, bottom border only) for a minimal look
- Remove the heavy `bg-white/10 backdrop-blur-lg rounded-2xl p-4 border` card wrapper; use transparent layout on hero
- Reduce vertical padding significantly

### Desktop (hero context):
- Show all 5 fields in a single clean row (Location, Type, Beds pills, Price, CTA)
- Use transparent underline-style fields (no boxed card)
- Desktop dropdowns: ensure `z-[100]`, `max-h-[320px]`, proper `overflow-y-auto`
- Dropdown panel: `bg-charcoal border-white/15` with smooth animation

### Inline context (Properties page):
- Keep current boxed card style with light bg
- Show all fields

### Boutique copy:
- CTA button text: use CMS key `search.button` — will update to "Explore Select Homes" / Hebrew equivalent via CMS (no hardcoded change needed, but update the default fallback)

## 3. Color Palette Refinement

**File: `src/index.css`**

Update CSS variables:
- `--primary`: change from `0 0% 11%` (pure charcoal) to `160 42% 11%` (deep green #0F2E26) for header/footer/primary
- `--gold`: change from `42 54% 53%` to `39 37% 55%` (refined gold #C8A96A, less yellow)
- `--gold-hover`: adjust to `37 38% 48%` (#A8894F)
- Keep `--charcoal: 0 0% 11%` for buttons (separate from primary)
- Keep `--background`, `--foreground`, `--card` unchanged

This shifts the header, footer, and primary elements from pure black to the brand deep green while keeping charcoal for CTAs.

## 4. Typography & Spacing Polish

**File: `src/index.css`**

- H1: increase `line-height` from `1.15` to `1.25`
- H2: increase from `26px`/`34px` to `28px`/`36px`
- Body: already at `17px/1.6` — keep
- Add button letter-spacing utility: `.btn-text { letter-spacing: 0.03em }`

**Multiple section files**: Increase section vertical padding from `py-16 md:py-24` to `py-20 md:py-28` for breathing room:
- `src/components/AvailableHomes.tsx`
- `src/components/SoldHomes.tsx`
- `src/components/WhyDifferent.tsx`
- `src/components/LifestyleSection.tsx`
- `src/components/ContactForm.tsx`
- `src/components/BlueprintSection.tsx`

## 5. Property Cards — Hover Polish

**File: `src/components/AvailableHomes.tsx`** and **`src/pages/Properties.tsx`**

- Add subtle `shadow-md hover:shadow-xl` transition (desktop only via `md:hover:shadow-xl`)
- Keep existing `hover:-translate-y-1`
- Add `rounded-2xl` instead of `rounded-xl` for softer corners
- Style price label with gold gradient text (CSS `background-clip: text` using `from-[#C8A96A] to-[#A8894F]`)

## 6. Property Detail — Inquiry Form Refinement

**File: `src/pages/PropertyDetail.tsx`**

- Change mobile inquiry form CTA from "Send Inquiry" to CMS key mapped to "Request Private Details"
- Make form visible on ALL screen sizes (remove `lg:hidden`), positioned before Similar Properties
- Keep desktop sticky sidebar form as well (dual placement = more conversion)
- Add success animation on form submit (brief checkmark icon)

## 7. Boutique Copy Updates (CMS Fallbacks)

**File: `src/hooks/useSiteContent.ts`** — Update default fallback strings:

| Key | Old English | New English |
|-----|------------|-------------|
| `search.button` | "Search" | "Explore Select Homes" |
| `home.available.details_button` | "View Details" | "View Curated Home" |
| `property.detail.send_inquiry` | "Send Inquiry" | "Request Private Details" |
| `header.nav.contact` | "Contact" | "Start a Conversation" |

Hebrew equivalents will also be updated.

## 8. Footer Cleanup

**File: `src/components/TrustSection.tsx`**

- Increase spacing between sections (`gap-8` instead of `gap-6`)
- Add subtle gold divider line between nav and legal links
- Reduce density: use `text-[13px]` for legal links

## 9. Micro Interactions

**File: `src/components/SearchBar.tsx`** — Already has `rotate-180` on chevron. Ensure smooth `duration-200`.

**Multiple files**: Use `whileInView` with `margin: "-50px"` consistently for earlier trigger of fade-in animations.

## 10. Bug Fixes

### Dropdown clipping (already partially fixed):
- Confirm `HeroSection.tsx` has no `overflow-hidden` on section (already removed in previous iteration)
- SearchBar desktop dropdown `z-[100]` already set

### Send Inquiry button:
- Already working via `scrollIntoView` to `#inquiry-form-mobile` (added in previous iteration)
- Make form visible on all screens (remove `lg:hidden`) so desktop users also see it

### Sticky button overlaps:
- Add `z-30` to sticky CTA bar (below dropdown `z-[100]` and bottom-sheet `z-[200]`)

---

## Files Modified Summary

1. `src/components/HeroSection.tsx` — lighter gradient, airier spacing, gentler animation
2. `src/components/SearchBar.tsx` — mobile "More Filters" pattern, underline inputs, transparent hero layout
3. `src/index.css` — deep green primary, refined gold, typography spacing
4. `src/components/AvailableHomes.tsx` — card polish, increased section spacing
5. `src/pages/Properties.tsx` — card hover polish
6. `src/pages/PropertyDetail.tsx` — form visible all screens, boutique CTA copy
7. `src/hooks/useSiteContent.ts` — boutique copy fallbacks
8. `src/components/TrustSection.tsx` — footer spacing
9. `src/components/MicroTrustLine.tsx` — minor spacing tweak

## What Stays Untouched
- All fonts (Playfair Display, DM Sans, Heebo)
- Database schema, RLS policies, migrations
- Admin panel and gallery upload UX
- WhatsApp button, exit popup, cookie consent
- Header structure and logo sizing
- Property detail page gallery
