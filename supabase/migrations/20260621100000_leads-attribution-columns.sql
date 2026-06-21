-- Phase 2B: Add attribution columns to public.leads and update sync trigger.
--
-- WHAT CHANGES:
--   1. ADD COLUMN IF NOT EXISTS on public.leads (13 new text columns, all nullable)
--   2. UPDATE sanitize_public_lead() to length-cap the new fields for anon submissions
--   3. UPDATE sync_public_lead_to_crm() to forward attribution fields to crm_leads
--
-- NO RLS POLICY CHANGES. No breaking changes. All new columns default to NULL.
--
-- New columns on public.leads:
--   utm_source, utm_medium, utm_campaign, utm_content, utm_term
--   gclid, fbclid
--   landing_page, referrer, page_path
--   lang, property_slug, property_title
--
-- ROLLBACK: Run the DROP COLUMN statements below, then restore the two functions
--   to their previous versions (see migration 20260621000000 for sanitize body;
--   see migration 20260308214817 for sync body).

-- ── 1. New columns ──────────────────────────────────────────────────────────
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS utm_source     TEXT,
  ADD COLUMN IF NOT EXISTS utm_medium     TEXT,
  ADD COLUMN IF NOT EXISTS utm_campaign   TEXT,
  ADD COLUMN IF NOT EXISTS utm_content    TEXT,
  ADD COLUMN IF NOT EXISTS utm_term       TEXT,
  ADD COLUMN IF NOT EXISTS gclid          TEXT,
  ADD COLUMN IF NOT EXISTS fbclid         TEXT,
  ADD COLUMN IF NOT EXISTS landing_page   TEXT,
  ADD COLUMN IF NOT EXISTS referrer       TEXT,
  ADD COLUMN IF NOT EXISTS page_path      TEXT,
  ADD COLUMN IF NOT EXISTS lang           TEXT,
  ADD COLUMN IF NOT EXISTS property_slug  TEXT,
  ADD COLUMN IF NOT EXISTS property_title TEXT;

-- ── 2. sanitize_public_lead() — length-cap new fields for anon inserts ─────
CREATE OR REPLACE FUNCTION public.sanitize_public_lead()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    -- Force status = 'new' for all anonymous submissions
    NEW.status := 'new';

    -- Source: hard length cap, then allowlist (unchanged logic)
    IF length(NEW.source) > 200 THEN
      NEW.source := 'website';
      RETURN NEW;
    END IF;
    IF NOT (
      NEW.source IN (
        'website', 'blueprint', 'guide', 'contact_form', 'contact_page',
        'exit_popup', 'under_radar_popup', 'whatsapp', 'property_page',
        'newsletter', 'valuation', 'sell_page_valuation', 'sell_page',
        'buyer_blueprint', 'guide_page'
      )
      OR NEW.source ~ '^property:[a-z0-9][a-z0-9-]{0,118}$'
      OR NEW.source ~ '^property_modal:[a-z0-9][a-z0-9-]{0,118}$'
    ) THEN
      NEW.source := 'website';
    END IF;

    -- Attribution fields: length caps (values come from the browser/URL, not user input)
    IF length(NEW.utm_source)     > 500 THEN NEW.utm_source     := NULL; END IF;
    IF length(NEW.utm_medium)     > 500 THEN NEW.utm_medium     := NULL; END IF;
    IF length(NEW.utm_campaign)   > 500 THEN NEW.utm_campaign   := NULL; END IF;
    IF length(NEW.utm_content)    > 500 THEN NEW.utm_content    := NULL; END IF;
    IF length(NEW.utm_term)       > 500 THEN NEW.utm_term       := NULL; END IF;
    IF length(NEW.gclid)          > 200 THEN NEW.gclid          := NULL; END IF;
    IF length(NEW.fbclid)         > 200 THEN NEW.fbclid         := NULL; END IF;
    IF length(NEW.landing_page)   > 500 THEN NEW.landing_page   := NULL; END IF;
    IF length(NEW.referrer)       > 500 THEN NEW.referrer       := NULL; END IF;
    IF length(NEW.page_path)      > 500 THEN NEW.page_path      := NULL; END IF;
    IF length(NEW.property_title) > 300 THEN NEW.property_title := NULL; END IF;

    -- lang: only allow known values; anything else becomes NULL
    IF NEW.lang IS NOT NULL AND NEW.lang NOT IN ('en', 'he') THEN
      NEW.lang := NULL;
    END IF;

    -- property_slug: same safe character set as property source slugs
    IF NEW.property_slug IS NOT NULL
       AND NEW.property_slug !~ '^[a-z0-9][a-z0-9-]{0,118}$' THEN
      NEW.property_slug := NULL;
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS sanitize_public_lead_trg ON public.leads;
CREATE TRIGGER sanitize_public_lead_trg
  BEFORE INSERT ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.sanitize_public_lead();

-- ── 3. sync_public_lead_to_crm() — forward attribution to crm_leads ────────
-- crm_leads mappings used:
--   leads.utm_*        → crm_leads.utm_*        (exact column names match)
--   leads.landing_page → crm_leads.landing_page  (exact match)
--   leads.referrer     → crm_leads.entry_point   (closest semantic match)
--   leads.lang         → crm_leads.language       (renamed)
--   leads.property_slug → crm_leads.related_property (closest semantic match)
--   leads.gclid/fbclid/page_path/property_title — no crm_leads column; stored in leads only
CREATE OR REPLACE FUNCTION public.sync_public_lead_to_crm()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.crm_leads (
    full_name, phone, email, source, original_message, public_lead_id, status, pipeline_stage,
    utm_source, utm_medium, utm_campaign, utm_content, utm_term,
    landing_page, entry_point, language, related_property
  ) VALUES (
    NEW.full_name, NEW.phone, NEW.email, NEW.source, NEW.message, NEW.id, 'new', 'new',
    NEW.utm_source, NEW.utm_medium, NEW.utm_campaign, NEW.utm_content, NEW.utm_term,
    NEW.landing_page, NEW.referrer, NEW.lang, NEW.property_slug
  );
  RETURN NEW;
END;
$$;
