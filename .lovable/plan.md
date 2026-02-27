
# Batch 1: Header, Hero, Search Bar, Properties Page

## Overview
This batch transforms the homepage header and hero into a premium minimal design, adds an advanced search bar with price slider, and creates a new `/properties` results page. Existing data and components are preserved.

---

## 1. Header Redesign

**Current:** Sticky header with logo left, nav links center-right, lang toggle right.
**New:** Premium charcoal header.

- Background: charcoal (`hsl(0, 0%, 15%)` or similar dark)
- Left: hamburger menu icon (opens slide-out drawer with nav links)
- Center: Spirit Real Estate logo (white text or logo image)
- Right: HE | EN toggle (text only, light color)
- Mobile: same layout, hamburger opens full-height slide-out

**File:** `src/components/Header.tsx` -- full rewrite of layout/styling. Nav links move into a side drawer (Sheet component from shadcn).

---

## 2. Hero Section Redesign

**Current:** Full-screen hero with pre-title, multi-line headline, subline paragraph, two CTA buttons, trust strip.
**New:** Minimal and strong.

- Full-screen hero image (keep existing `hero-bg.jpg`)
- Darker gradient overlay for contrast
- Small top line: "Spirit Real Estate" (subtle, tracked)
- Single-line main slogan:
  - EN: "Zichron Yaakov -- Local Guidance. Smarter Decisions."
  - HE: "זכרון יעקב -- ליווי מקומי. החלטות חכמות יותר."
- No paragraph text, no CTA buttons, no trust strip
- Search bar sits at the bottom of the hero (see section 3)

**CMS keys to update:** `home.hero.pre_title`, `home.hero.headline` (new values). Remove usage of `home.hero.subline`, `home.hero.cta_primary`, `home.hero.cta_secondary`, `home.hero.anchor_text`, `home.hero.trust_*` from the component (CMS rows stay for backward safety).

**File:** `src/components/HeroSection.tsx` -- simplified layout.

---

## 3. Advanced Search Bar (Inside Hero)

New component: `src/components/SearchBar.tsx`

Premium glass-style module positioned at bottom of hero section.

**Fields:**
1. **Location** -- multi-select dropdown, options from a new `search_locations` table
2. **Property Type** -- dropdown, options from a new `search_property_types` table
3. **Bedrooms** -- dropdown: 2+, 3+, 4+, 5+, 6+
4. **Price Range** -- dual-handle slider (min/max) with live numeric display
5. **Search Button** -- charcoal, pill/rounded

**Price slider details:**
- Uses Radix Slider (already installed) with dual thumbs
- Default currency: ILS (shekel symbol)
- English mode: optional toggle for USD display (client-side conversion not needed, just display format)
- Touch-friendly, large thumb targets
- "Price Upon Request" listings excluded from slider filtering
- Min/max range derived from actual property data

**Database tables (new):**

```text
search_locations
  id           uuid PK
  name_en      text NOT NULL
  name_he      text NOT NULL
  display_order integer DEFAULT 0

search_property_types
  id           uuid PK
  name_en      text NOT NULL
  name_he      text NOT NULL
  display_order integer DEFAULT 0
```

Both with public SELECT, admin INSERT/UPDATE/DELETE RLS.

**Seed data for locations:** Zichron Yaakov, Caesarea, Pardes Hanna-Karkur, Binyamina, Atlit
**Seed data for property types:** Villa, Apartment, Cottage, Penthouse, Land

**Search behavior:**
- On submit, navigates to `/:lang/properties?location=...&type=...&beds=...&priceMin=...&priceMax=...`
- Filters encoded in URL query params

**Admin management:** Add "Locations" and "Property Types" tabs to Admin panel for CRUD + reorder.

---

## 4. Properties Results Page

New page: `src/pages/Properties.tsx`
New route: `/:lang/properties`

**Layout:**
- Header at top
- Filter bar (same fields as search bar, pre-filled from URL params)
- Property grid (reuses existing `PropertyCard` component, extracted from `AvailableHomes`)
- Clicking a card navigates to `/:lang/property/:slug`
- Sort options: Newest, Price (Low-High, High-Low)
- Empty state with CTA

**Data fetching:**
- Reads `properties_available` table
- Applies filters from URL query params
- Location filter requires a new `location` column on `properties_available` (nullable text, non-breaking)

**Database change:**
- Add `location` column (text, nullable) to `properties_available`
- Add `property_type` column (text, nullable) to `properties_available`
- No existing data is modified; admin can populate these fields going forward

---

## 5. Property Detail Page (Stub)

New page: `src/pages/PropertyDetail.tsx`
New route: `/:lang/property/:slug`

This batch creates a basic version:
- Gallery (reuses existing `ImageGallery` from PropertyModal)
- Title, location, price
- Stats grid (beds, sqm, lot)
- Description
- Inquiry form (reuses existing form logic)
- Sticky mobile CTA
- "Similar properties" placeholder

Full enrichment (description blocks, FOMO line, sticky desktop box) will come in Batch 2.

---

## 6. Design Token Updates

**CSS variables (src/index.css):**
- Add `--charcoal: 0 0% 15%` for header/button backgrounds
- Add `--charcoal-hover: 0 0% 20%`
- Add `--bronze: 30 45% 55%` for subtle accent

**Button changes:**
- Primary CTA buttons switch to charcoal background with white text
- Gold remains for price labels, accents, secondary highlights
- Update button classes across components

**Tailwind config:**
- Add `charcoal` color to extend colors

---

## 7. Navigation Updates

- Add `/properties` to header nav
- Add route to `App.tsx`
- Update `PropertyCard` to support both modal-open and navigate-to-page modes

---

## Files Summary

**New files:**
- `src/components/SearchBar.tsx` -- glass search bar
- `src/pages/Properties.tsx` -- results grid page
- `src/pages/PropertyDetail.tsx` -- property detail page

**Modified files:**
- `src/components/Header.tsx` -- charcoal redesign with drawer
- `src/components/HeroSection.tsx` -- minimal single-line
- `src/components/AvailableHomes.tsx` -- extract PropertyCard, update button colors
- `src/App.tsx` -- add new routes
- `src/index.css` -- new CSS variables, charcoal tokens
- `tailwind.config.ts` -- charcoal color
- `src/pages/Admin.tsx` -- add Location/PropertyType admin tabs

**Database migrations:**
- Create `search_locations` table + RLS + seed
- Create `search_property_types` table + RLS + seed
- Add `location` and `property_type` columns to `properties_available`

**CMS content:**
- Update hero CMS rows with new copy
- Add search bar placeholder text keys
- Add properties page title/subtitle keys
- Add property detail page keys

---

## What Stays Untouched
- All existing property data (available + sold)
- Gallery upload/drag-and-drop/reorder logic
- Lead capture logic and sources
- WhatsApp button, exit popup, cookie notice
- Blueprint section, Market Snapshot
- Team/firm section
- Footer (TrustSection)
- Legal pages (Privacy, Terms, Accessibility)
- Sell, About, Contact pages
- Admin existing tabs (Available, Sold, Lifestyle, Leads, Content)
