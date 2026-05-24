
-- 1. Revoke EXECUTE on SECURITY DEFINER functions from anon/authenticated
-- These are used inside RLS policies (which run as definer) so revoking direct EXECUTE is safe
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.has_crm_access(uuid) FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.sync_public_lead_to_crm() FROM anon, authenticated, public;

-- 2. Tighten leads INSERT policy: replace WITH CHECK (true) with explicit validation
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;
CREATE POLICY "Anyone can insert leads"
  ON public.leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    status IS NULL OR status = 'new'
  );

-- Trigger to sanitize publicly-submitted lead fields (force safe defaults for unauthenticated)
CREATE OR REPLACE FUNCTION public.sanitize_public_lead()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    NEW.status := 'new';
    IF NEW.source IS NULL OR NEW.source NOT IN ('website','blueprint','guide','contact_form','exit_popup','whatsapp','property_page','newsletter') THEN
      NEW.source := 'website';
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

-- 3. Explicit deny policies on user_roles to prevent privilege escalation
DROP POLICY IF EXISTS "No one can insert user_roles via API" ON public.user_roles;
CREATE POLICY "No one can insert user_roles via API"
  ON public.user_roles
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

DROP POLICY IF EXISTS "No one can update user_roles via API" ON public.user_roles;
CREATE POLICY "No one can update user_roles via API"
  ON public.user_roles
  FOR UPDATE
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

DROP POLICY IF EXISTS "No one can delete user_roles via API" ON public.user_roles;
CREATE POLICY "No one can delete user_roles via API"
  ON public.user_roles
  FOR DELETE
  TO anon, authenticated
  USING (false);

-- 4. Restrict Realtime channel subscriptions to CRM users for sensitive tables
ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "CRM users can receive crm realtime" ON realtime.messages;
CREATE POLICY "CRM users can receive crm realtime"
  ON realtime.messages
  FOR SELECT
  TO authenticated
  USING (
    public.has_crm_access(auth.uid())
  );
