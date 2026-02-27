
# Full Premium Site Refinement + Legal Compliance

## Summary
Most features already exist from Batch 1 and Batch 2. This plan focuses on **polishing, upgrading, and filling gaps** rather than building from scratch. The work is grouped into 6 focused tasks.

---

## Task 1: Design Token + Spacing Refinement

**What changes:**
- Update CSS variables in `src/index.css`:
  - `--charcoal` from `0 0% 15%` to `0 0% 11%` (closer to #1B1B1B)
  - `--background` to `38 27% 95%` (closer to #F6F4EF warm off-white)
  - Remove deep green from `--primary`, shift to charcoal-based primary or keep only for subtle accents
- Increase global section spacing: all `py-16 md:py-24` sections bump to `py-20 md:py-28 lg:py-32`
- Add visible focus indicators globally: `focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2` base style
- Add `outline-offset` utility for keyboard nav visibility

**Files:** `src/index.css`, `tailwind.config.ts`

---

## Task 2: Header + Hero Polish

**Header (`src/components/Header.tsx`):**
- Increase logo size: mobile `w-[42px] h-[42px]`, desktop `w-[58px] h-[58px]`
- Increase vertical padding: `py-3` to `py-4`
- Menu drawer: increase width from `w-72` to `w-[85%] max-w-sm`, add subtle gold left-border on active nav link, increase nav link padding

**Hero (`src/components/HeroSection.tsx`):**
- Increase breathing space between pre-title and H1 (`mb-6` to `mb-8`)
- Slightly stronger gradient overlay for text readability

**SearchBar (`src/components/SearchBar.tsx`):**
- Replace native `<select>` elements with custom dropdown panels (dark luxury style using Popover/Command or custom dropdown)
- Add subtle gold border to search button: `border border-gold/30`
- Thin gold active range on price slider: change `bg-white/60` to `bg-gold`
- All dropdown panels render as dark overlay panels, not browser-native modals

**Files:** `Header.tsx`, `HeroSection.tsx`, `SearchBar.tsx`

---

## Task 3: Cookie Consent Upgrade

**Current state:** Two buttons (Accept/Decline). No "Manage Preferences" option. No analytics blocking.

**Changes to `src/components/CookieNotice.tsx`:**
- Add third button: "Manage Preferences" / "העדפות" 
- "Manage Preferences" opens an expandable panel with toggle switches for: Analytics, Marketing
- "Accept All" enables all; "Reject Non-Essential" disables analytics + marketing
- Store granular consent in localStorage: `{ analytics: boolean, marketing: boolean, ts: number }`
- Emit `cookie-consent` custom event with detail payload for analytics scripts to listen
- Block any analytics loading until `analytics: true` is confirmed
- Luxury dark card styling matching the site theme

**CMS keys needed (inserted via data tool):**
- `home.cookie.manage_preferences` (EN/HE)
- `home.cookie.analytics_label` (EN/HE)
- `home.cookie.marketing_label` (EN/HE)
- `home.cookie.save_preferences` (EN/HE)
- `home.cookie.reject_all` (EN/HE)

**Files:** `src/components/CookieNotice.tsx`

---

## Task 4: Privacy Policy + Accessibility Statement (CMS-driven, bilingual)

**Current state:** Both pages exist but are hardcoded in English only, not CMS-driven, and lack Israeli compliance details.

**Privacy Policy (`src/pages/Privacy.tsx`):**
- Rewrite to pull all sections from CMS using `t()` keys
- Add sections: Data Collection, Form Data Usage, Analytics Disclosure, Marketing Communication, Data Retention, International Visitors, User Rights (GDPR-style), Contact Details
- Add Header component at top for consistent navigation
- ~15 new CMS keys (e.g., `privacy.section1.title`, `privacy.section1.body`, etc.)

**Accessibility Statement (`src/pages/Accessibility.tsx`):**
- Rewrite to pull from CMS
- Add Israeli Standard 5568 reference alongside WCAG 2.1 AA
- Add structured sections: Compliance Standard, Implemented Adjustments, Contact for Issues, Commitment to Prompt Response
- Add Header component
- ~10 new CMS keys

**CMS data insertion:** ~25 new key-value pairs via the data insertion tool.

**Files:** `src/pages/Privacy.tsx`, `src/pages/Accessibility.tsx`

---

## Task 5: Accessibility Hardening (WCAG 2.1 AA)

**Across all components:**
- Ensure all `<img>` tags have meaningful `alt` text (already mostly done, audit and fix gaps)
- Add `aria-label` to icon-only buttons (hamburger, carousel arrows, close buttons)
- Ensure heading hierarchy: only one `<h1>` per page, proper `<h2>` > `<h3>` nesting
- Add `role="navigation"` to nav containers, `role="main"` to main content
- Add visible focus indicators to all interactive elements (buttons, links, form inputs)
- Ensure color contrast: verify charcoal-on-warm-white meets 4.5:1 ratio, gold text on white meets 3:1 for large text
- Add `aria-live="polite"` to toast/notification areas
- Keyboard navigation: ensure Sheet drawer is keyboard-trappable (already handled by Radix)
- Forms: associate `<label>` elements with inputs using `htmlFor`/`id` pairs

**Files:** Multiple components -- `Header.tsx`, `SearchBar.tsx`, `HeroSection.tsx`, `ContactForm.tsx`, `BlueprintSection.tsx`, `ExitIntentPopup.tsx`, `PropertyDetail.tsx`, `CookieNotice.tsx`

---

## Task 6: SEO + Performance Final Pass

**SEO (`src/components/SchemaOrg.tsx`):**
- Add `properties` and `property/:slug` to ROUTE_NAMES for breadcrumb support
- Add dynamic `<title>` and `<meta name="description">` via `useEffect` in LanguageLayout based on current route
- Already has Organization + BreadcrumbList schemas -- no changes needed there

**Sitemap:** Create `public/sitemap.xml` with static routes for both languages (en/he). Dynamic property pages would need server-side generation which is not feasible in this stack, so include static routes only.

**Performance:**
- Add `loading="lazy"` to all below-fold images (already mostly done, audit gaps)
- Ensure hero image has `loading="eager"` and `fetchpriority="high"`
- Add `width`/`height` attributes to prevent CLS where missing

**Files:** `SchemaOrg.tsx`, `LanguageLayout.tsx`, new `public/sitemap.xml`

---

## What Stays Untouched
- All existing property data and gallery logic (drag, reorder, primary image)
- WhatsApp integration
- Exit intent popup logic (already correct: 50% scroll + upward on mobile)
- Lead capture sources and form structure
- Admin panel functionality
- Database schema (no migrations needed)
- Sold section, Team section, Blueprint section (already built in Batch 2, only spacing/token adjustments)

---

## Execution Order
1. Design tokens + spacing (foundation for everything)
2. Header + Hero + SearchBar polish
3. Cookie consent upgrade
4. Privacy + Accessibility pages (CMS-driven)
5. Accessibility hardening pass
6. SEO + performance final pass

All CMS content will be inserted via the data insertion tool as each task is implemented.
