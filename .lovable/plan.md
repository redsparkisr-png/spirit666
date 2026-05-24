# Refinement Plan — Quiet Luxury Polish

Keep the existing brand intact. Apply low-risk, high-impact refinements that elevate the boutique feel without breaking layout or copy.

## 1. Thin gold section dividers
- Add a reusable `<GoldDivider />` component: centered thin line (1px) in `--gold` at 30% opacity, ~120px wide, with optional small diamond/dot in the middle.
- Place between main homepage sections (Hero → Trust → Properties → WhyDifferent → About → CTA).

## 2. Refined property card hover
- Update `PropertyCard` hover: subtle lift (`translateY(-4px)`), soft shadow using gold tint (`0 12px 40px -12px hsl(var(--gold)/0.25)`), image `scale(1.03)` over 600ms ease-out.
- Gold underline animation on the property title on hover.

## 3. Heading typography polish (desktop only)
- Add `tracking-[0.01em]` to h1/h2 in EN, `tracking-normal` in HE (Hebrew shouldn't be tracked).
- Slightly tighter `leading` on large display headings.

## 4. Subtler scroll reveals
- Reduce existing fade-in distance from `translateY(10px)` to `translateY(6px)`, duration 500ms, ease-out.
- Stagger children by 60ms in section grids.

## 5. Micro-refinements
- Primary CTA: add gentle gold ring on hover (`ring-1 ring-gold/40`).
- Section padding rhythm: ensure consistent `py-20 md:py-28` across homepage sections.

## Files to edit
- `src/components/ui/gold-divider.tsx` (new)
- `src/pages/Index.tsx` (insert dividers)
- `src/components/PropertyCard.tsx` (hover refinement)
- `src/index.css` (refined keyframes, tracking utility)
- `src/components/HeroSection.tsx`, `TrustSection.tsx`, `WhyDifferent.tsx` (padding/tracking pass)

## QA
- Verify both `/he` and `/en` routes
- Check mobile (375px) and desktop (1373px)
- Confirm no console errors, no layout shifts, RTL/LTR both correct
