
# Phase 1: Bilingual Infrastructure + CMS Content System

## Overview
Build the foundational bilingual system with CMS-driven content, enabling `/en/` and `/he/` routing, RTL support, language detection, and a `site_content` table that stores all text. Existing components will be refactored to pull text from this table instead of hardcoding strings.

**No structural, branding, or database changes to existing tables.** Only additive changes.

---

## 1. Database: Create `site_content` Table

Create a new table with RLS policies:

```text
site_content
  id         uuid (PK, default gen_random_uuid())
  key        text NOT NULL
  value_en   text NOT NULL DEFAULT ''
  value_he   text NOT NULL DEFAULT ''
  page       text NOT NULL DEFAULT 'global'
  section    text NOT NULL DEFAULT 'general'
  updated_at timestamptz NOT NULL DEFAULT now()
  UNIQUE(key)
```

**RLS Policies:**
- Anyone can SELECT (public content)
- Admins can INSERT / UPDATE / DELETE

**Seed data:** Prefill ~40-50 rows with all existing hardcoded text from HeroSection, MicroTrustLine, Testimonials, AvailableHomes, SoldHomes, WhyDifferent, LifestyleSection, ContactForm, ExitIntentPopup, CookieNotice, TrustSection, FloatingElements. Each row has both `value_en` and `value_he` translations.

---

## 2. Language Context + Hook

Create `src/lib/i18n.tsx`:
- React context providing `lang` ('en' | 'he') and `setLang()`
- On mount: check localStorage `preferred_lang`, then `navigator.language` (starts with "he" -> Hebrew), default English
- Persist to localStorage on change
- Export `useLanguage()` hook
- Export `useContent(key: string)` hook that returns the correct `value_en` or `value_he` from a cached query

Create `src/hooks/useSiteContent.ts`:
- TanStack Query hook to fetch all `site_content` rows once
- Cache with long staleTime (5 min)
- Provides `t(key: string): string` function — returns value for current language, falls back to English if Hebrew missing
- Logs missing keys to console in development

---

## 3. Routing: `/en/` and `/he/` Prefixes

Update `src/App.tsx`:
- Wrap routes in `LanguageProvider`
- Add route structure:
  ```text
  /         -> redirect to /en/ (or /he/ based on detection)
  /en/      -> Index
  /he/      -> Index
  /en/privacy -> Privacy
  /he/privacy -> Privacy
  /en/terms   -> Terms
  /he/terms   -> Terms
  /en/accessibility -> Accessibility
  /he/accessibility -> Accessibility
  /en/admin -> Admin (admin stays English-only for now)
  /admin    -> Admin (backward compat)
  ```
- Create a `LanguageLayout` wrapper component that:
  - Reads `:lang` param from URL
  - Sets language context accordingly
  - Applies `dir="rtl"` and `lang="he"` to a wrapper div when Hebrew
  - Adds `<link rel="alternate" hreflang>` tags to `<head>`

---

## 4. RTL Support

Add to `src/index.css`:
- `[dir="rtl"]` scoped styles for text alignment, flex direction reversal where needed
- Font adjustment: add a Hebrew-friendly font (e.g., "Heebo" or "Assistant") as fallback in `font-body` for RTL

Update `tailwind.config.ts`:
- Add Hebrew font family to the `body` font stack

---

## 5. Header with Language Switcher

Create `src/components/Header.tsx`:
- Sticky minimal header with:
  - Logo (existing spirit-logo.jpg)
  - Tagline from CMS: key `header.tagline` ("Zichron Yaakov & Coastal Region")
  - Navigation links: Home | Properties (scroll anchor) | Privacy | Terms | Accessibility
  - Language toggle: "HE | EN" text buttons (no flags)
- On language switch: navigate to equivalent route in other language, update localStorage

---

## 6. Refactor Components to Use CMS Content

Each component will be updated to use `t(key)` instead of hardcoded strings. The layout, styling, and logic remain identical.

**Components to update:**
- `HeroSection` — headline, subline, CTA labels, trust strip text
- `MicroTrustLine` — trust line text
- `Testimonials` (FeaturedTestimonial, BottomTestimonial, main) — section title, subtitle, CTA text, individual testimonial quotes/authors/context
- `AvailableHomes` — section title, subtitle, empty state text, bottom italic text, button labels
- `SoldHomes` — section title, subtitle, button label, empty text
- `WhyDifferent` — title, subtitle, team names/roles, tagline
- `LifestyleSection` — title, bullet points, bottom line
- `ContactForm` — title, subtitle, button label, microcopy lines
- `ExitIntentPopup` — headline, subline, button label
- `CookieNotice` — description text, button labels
- `TrustSection` — footer text, nav link labels, copyright
- `FloatingElements` — tooltip text, button labels

Each key follows the convention: `{page}.{section}.{element}` e.g. `home.hero.headline`, `home.hero.subline`, `home.hero.cta_primary`.

---

## 7. Admin CMS: Content Manager Tab

Add a new "Content" tab to the Admin panel (`src/pages/Admin.tsx`):
- New component `src/components/admin/ContentManager.tsx`
- Lists all `site_content` rows grouped by page/section
- Inline editing of `value_en` and `value_he` for each key
- Save button per row
- Search/filter by page or section
- Does NOT allow adding/deleting keys from UI (keys are managed in code)

---

## 8. SEO: hreflang Tags

In the `LanguageLayout` wrapper:
- Dynamically inject `<link rel="alternate" hreflang="en" href="/en/...">` and `<link rel="alternate" hreflang="he" href="/he/...">` into the document head
- Set `<html lang="en">` or `<html lang="he">` based on current route

---

## Technical Details

### Files Created (new):
- `src/lib/i18n.tsx` — Language context + provider
- `src/hooks/useSiteContent.ts` — Content fetching + `t()` function
- `src/components/Header.tsx` — Sticky header with nav + lang switch
- `src/components/LanguageLayout.tsx` — Route wrapper for lang detection + RTL
- `src/components/admin/ContentManager.tsx` — CMS content editor

### Files Modified:
- `src/App.tsx` — New routing structure with lang prefixes
- `src/index.css` — RTL styles + Hebrew font import
- `tailwind.config.ts` — Hebrew font in body stack
- All 12 landing page components — Replace hardcoded text with `t()` calls

### Database Changes:
- 1 new table: `site_content` with RLS
- ~50 seed rows with EN + HE content
- No changes to existing tables

### What Stays Untouched:
- All existing Supabase tables (leads, properties_available, properties_sold, lifestyle_gallery, user_roles)
- Property gallery logic, drag-and-drop, image upload
- Lead capture form logic and sources
- Authentication and roles
- WhatsApp sticky, exit intent popup behavior
- Admin panel existing tabs (Available, Sold, Lifestyle, Leads)
- Branding colors, typography, logo
