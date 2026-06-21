-- Fix lead source attribution: expand sanitize_public_lead() allowlist to match
-- actual source values used by all public-facing forms on the site.
--
-- WHAT CHANGES:
--   sanitize_public_lead() function body only — allowlist updated.
--   No RLS policies are changed.
--   No other tables or policies are affected.
--   Behavior for authenticated admin users is unchanged (guard: auth.uid() IS NULL).
--
-- ALLOWED AFTER THIS MIGRATION:
--   Static values: website, blueprint, guide, contact_form, contact_page,
--                  exit_popup, under_radar_popup, whatsapp, property_page,
--                  newsletter, valuation, sell_page_valuation, sell_page,
--                  buyer_blueprint, guide_page
--   Dynamic patterns:
--     property:<slug>        — slug must match ^[a-z0-9][a-z0-9-]{0,118}$
--     property_modal:<slug>  — same slug constraint
--   Anything else → normalized to 'website'
--   Hard cap: source > 200 chars → normalized to 'website'
--
-- RLS UNCHANGED:
--   anon INSERT only (with status NULL or 'new' check)
--   anon SELECT: denied
--   anon UPDATE: denied
--   anon DELETE: denied
--
-- ROLLBACK SQL (paste into Supabase SQL editor to revert):
--   CREATE OR REPLACE FUNCTION public.sanitize_public_lead()
--   RETURNS TRIGGER LANGUAGE plpgsql SECURITY INVOKER SET search_path = public AS $$
--   BEGIN
--     IF auth.uid() IS NULL THEN
--       NEW.status := 'new';
--       IF NEW.source IS NULL OR NEW.source NOT IN (
--         'website','blueprint','guide','contact_form','exit_popup','whatsapp','property_page','newsletter'
--       ) THEN
--         NEW.source := 'website';
--       END IF;
--     END IF;
--     RETURN NEW;
--   END;
--   $$;

CREATE OR REPLACE FUNCTION public.sanitize_public_lead()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    -- Force status to 'new' for all anonymous submissions
    NEW.status := 'new';

    -- Enforce source length cap first (defense-in-depth)
    IF length(NEW.source) > 200 THEN
      NEW.source := 'website';
      RETURN NEW;
    END IF;

    -- Allow only known safe source values
    IF NOT (
      -- Static allowlist
      NEW.source IN (
        'website',
        'blueprint',
        'guide',
        'contact_form',
        'contact_page',
        'exit_popup',
        'under_radar_popup',
        'whatsapp',
        'property_page',
        'newsletter',
        'valuation',
        'sell_page_valuation',
        'sell_page',
        'buyer_blueprint',
        'guide_page'
      )
      -- Dynamic: property:<slug> — lowercase alphanumeric and hyphens only
      OR NEW.source ~ '^property:[a-z0-9][a-z0-9-]{0,118}$'
      -- Dynamic: property_modal:<slug> — same safe character set
      OR NEW.source ~ '^property_modal:[a-z0-9][a-z0-9-]{0,118}$'
    ) THEN
      NEW.source := 'website';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

-- Recreate the trigger (same binding — just ensures fresh function is attached)
DROP TRIGGER IF EXISTS sanitize_public_lead_trg ON public.leads;
CREATE TRIGGER sanitize_public_lead_trg
  BEFORE INSERT ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.sanitize_public_lead();
