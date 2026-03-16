

# Implementation Plan: Search, Price, Admin Sync & SEO Fixes

## Summary of Issues Found

1. **Search bar price range** dynamically shrinks to match current inventory max (lines 358-365 in SearchBar.tsx) — must be fixed to 0–20M default
2. **Property cards on Properties page** still use `price_label` only, missing `price_number` fallback and missing premium price container
3. **AvailableHomes cards** show old micro-copy "Photos, pricing and full details sent privately" — must remove
4. **Properties page cards** lack the CTA button and price formatting from AvailableHomes
5. **WhatsApp messages** are hardcoded across ~5 components (Hero, GoldenConversionPoint, BlueprintPromo, ClosingCTA, TeamTrust) — not loaded from admin
6. **Guide content** loads from `buyer_guide_sections` table correctly in admin, but homepage guide section (GoldenConversionPoint + BlueprintPromoSection) uses hardcoded copy, not CMS
7. **Internal SEO links** exist only at bottom of Index.tsx — need more strategic cross-linking
8. **Admin has `price_label` as a separate text field** — need to clarify it's optional override, `price_number` is source of truth

---

## Part 1–3: Price Data Structure & Display

**SearchBar.tsx** — Fix the dynamic max price:
- Remove the query to `properties_available` for price max calculation (lines 350, 358-365)
- Set `dataMax` to a fixed `20_000_000` (already the initial state, just stop overwriting it)
- Add CMS keys `search.price_min`, `search.price_max`, `search.price_step` to `site_content` table via data insert so admin can control these values
- Load these settings in SearchBar and use them instead of hardcoded values

**AvailableHomes.tsx** — Update PropertyCard price display:
- Replace plain gold gradient text with a premium price badge: `bg-gold/10 border border-gold/20 rounded-lg px-3 py-1.5` container
- Format price from `price_number` as `₪X,XXX,XXX` (HE) or `ILS X,XXX,XXX` (EN) when `price_label` is absent
- Remove the micro-copy line (line 146-148): "Photos, pricing and full details sent privately"

**Properties.tsx** — Sync PropertyCard with AvailableHomes:
- Add the same premium price badge and `price_number` formatting fallback
- Add the CTA button "לפרטי הנכס" / "View Property Details"
- Remove any "Request Full Details" references

**AvailableManager.tsx** — Clarify admin field:
- Add helper text under `price_label` input: "Optional display override. Leave blank to auto-format from Price (number)."
- `price_number` field label: "Price (number) — required for search & display"

---

## Part 5: Search Range Admin Settings

Insert CMS keys into `site_content`:
```sql
INSERT INTO site_content (key, value_en, value_he, page, section) VALUES
('search.price_min', '0', '0', 'global', 'search'),
('search.price_max', '20000000', '20000000', 'global', 'search'),
('search.price_step', '50000', '50000', 'global', 'search');
```

SearchBar will read these on mount and use them for slider min/max/step.

---

## Part 7: Search Filtering Logic

Already works correctly — `Properties.tsx` uses `.lte("price_number", Number(priceMaxFilter))`. No change needed, just ensuring the fixed range doesn't break it.

---

## Part 8: Internal Linking for SEO

Add contextual internal links in these components:
- **LifestyleSection**: Link "זכרון יעקב" mentions to `/properties` and `/living-in-zichron-yaakov`
- **BlueprintPromoSection**: Link guide bullet items to relevant blog/content pages
- **ClosingCTA**: Add link to guide page and properties page
- **Properties page**: Add contextual links to buying guide, lifestyle, contact
- **Blog pages**: Add sidebar/footer links to properties, guide, contact
- Keep links natural with descriptive anchor text, not "click here"

---

## Part 9: Guide Content Loading in Admin

The guide admin (`GuideManager.tsx`) already loads from `buyer_guide_sections` table and works correctly. The issue is that the **homepage** guide sections (`GoldenConversionPoint.tsx`, `BlueprintPromoSection.tsx`) use hardcoded Hebrew/English copy instead of CMS.

**Fix**: Make GoldenConversionPoint and BlueprintPromoSection read from `site_content` keys via `useSiteContent()`:
- Add CMS keys: `guide.title_he`, `guide.hook_he`, `guide.intro_he`, `guide.cta_primary`, `guide.cta_secondary`, `guide.trust_line`, plus all 8 bullet items
- Components fall back to current hardcoded values if CMS keys are empty

Insert the current hardcoded values as initial data in `site_content`.

---

## Part 10: WhatsApp Auto-Messages in Admin

**Current state**: 5+ components hardcode WhatsApp phone number and message text. WhatsAppManager only manages 4 keys.

**Fix**:
- Expand `WA_KEYS` in WhatsAppManager to include section-specific messages:
  - `whatsapp.hero_message` / `whatsapp.guide_message` / `whatsapp.closing_message` / `whatsapp.team_message` / `whatsapp.offmarket_message`
- Insert current hardcoded messages as initial values in `site_content`
- Update all components (HeroSection, GoldenConversionPoint, BlueprintPromoSection, ClosingCTA, TeamTrustSection) to read WhatsApp phone + message from CMS via `useSiteContent()`
- Fall back to current hardcoded values if CMS is empty

---

## Part 11–13: Admin Content Sync & Source of Truth

Most sections already use `useSiteContent()` correctly. The gaps are:
1. **Guide section on homepage** — hardcoded (fix in Part 9)
2. **WhatsApp messages** — hardcoded (fix in Part 10)
3. **Team section** — hardcoded text. Make it read from CMS keys with fallbacks
4. **Off-market message** in AvailableHomes — hardcoded. Add CMS keys

For each, insert current live values into `site_content` and update components to read from CMS with fallbacks.

---

## Implementation Order

1. **Database**: Insert ~25 new `site_content` rows for search settings, guide section, WhatsApp messages, team text, off-market message
2. **SearchBar.tsx**: Fix price range to use CMS settings instead of dynamic inventory max
3. **AvailableHomes.tsx**: Premium price badge, remove micro-copy, format price from `price_number`
4. **Properties.tsx**: Sync card design with AvailableHomes (price badge, CTA, formatting)
5. **AvailableManager.tsx**: Add helper text for price fields
6. **GoldenConversionPoint.tsx + BlueprintPromoSection.tsx**: Read guide copy from CMS
7. **WhatsApp components**: Read phone + messages from CMS (Hero, Guide, Closing, Team, Off-market)
8. **WhatsAppManager.tsx**: Expand keys to cover all WhatsApp CTAs
9. **Internal linking**: Add strategic links in Lifestyle, Blueprint, Closing, Properties, Blog
10. **QA sweep**: Verify all 20 checklist items

