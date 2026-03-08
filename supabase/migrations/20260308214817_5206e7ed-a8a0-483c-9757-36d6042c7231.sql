
-- CRM Leads table
CREATE TABLE public.crm_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  -- Contact Info
  full_name text NOT NULL,
  phone text,
  email text,
  whatsapp text,
  country text,
  city text,
  language text DEFAULT 'en',
  timezone text,

  -- Marketing Source
  source text NOT NULL DEFAULT 'manual',
  medium text,
  campaign text,
  ad_content text,
  landing_page text,
  entry_point text,
  first_page_visited text,
  guide_requested boolean DEFAULT false,
  related_property text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,

  -- Buyer Details
  buyer_type text,
  budget_min numeric,
  budget_max numeric,
  budget_currency text DEFAULT 'ILS',
  timeline_to_buy text,
  property_type_preference text,
  preferred_neighborhoods text[],
  must_have_features text[],
  financing_needed boolean,
  motivation_notes text,

  -- Lead Handling
  assigned_to uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'new',
  temperature text DEFAULT 'warm',
  lead_score integer DEFAULT 0,
  priority text DEFAULT 'normal',
  last_contacted_at timestamptz,
  next_action text,
  next_followup_date timestamptz,
  next_followup_type text,

  -- Pipeline
  pipeline_stage text NOT NULL DEFAULT 'new',

  -- Sync
  public_lead_id uuid REFERENCES public.leads(id) ON DELETE SET NULL,
  original_message text
);

-- CRM Notes
CREATE TABLE public.crm_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES public.crm_leads(id) ON DELETE CASCADE,
  created_by uuid NOT NULL REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  content text NOT NULL,
  is_pinned boolean DEFAULT false
);

-- CRM Activity Log
CREATE TABLE public.crm_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES public.crm_leads(id) ON DELETE CASCADE,
  performed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  action_type text NOT NULL,
  description text,
  metadata jsonb DEFAULT '{}'
);

-- CRM Tasks / Follow-ups
CREATE TABLE public.crm_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid REFERENCES public.crm_leads(id) ON DELETE CASCADE,
  assigned_to uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  action_type text NOT NULL DEFAULT 'follow_up',
  due_date timestamptz NOT NULL,
  due_time text,
  notes text,
  status text NOT NULL DEFAULT 'pending',
  completed_at timestamptz
);

-- Indexes for performance
CREATE INDEX idx_crm_leads_status ON public.crm_leads(status);
CREATE INDEX idx_crm_leads_pipeline ON public.crm_leads(pipeline_stage);
CREATE INDEX idx_crm_leads_assigned ON public.crm_leads(assigned_to);
CREATE INDEX idx_crm_leads_temperature ON public.crm_leads(temperature);
CREATE INDEX idx_crm_leads_followup ON public.crm_leads(next_followup_date);
CREATE INDEX idx_crm_tasks_due ON public.crm_tasks(due_date);
CREATE INDEX idx_crm_tasks_assigned ON public.crm_tasks(assigned_to);
CREATE INDEX idx_crm_tasks_status ON public.crm_tasks(status);
CREATE INDEX idx_crm_notes_lead ON public.crm_notes(lead_id);
CREATE INDEX idx_crm_activities_lead ON public.crm_activities(lead_id);

-- Updated_at trigger for crm_leads
CREATE OR REPLACE FUNCTION public.update_crm_leads_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_crm_leads_updated_at
  BEFORE UPDATE ON public.crm_leads
  FOR EACH ROW
  EXECUTE FUNCTION public.update_crm_leads_updated_at();

-- Enable RLS on all CRM tables
ALTER TABLE public.crm_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_tasks ENABLE ROW LEVEL SECURITY;

-- Helper: check CRM access (super_admin or lead_manager)
CREATE OR REPLACE FUNCTION public.has_crm_access(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('super_admin', 'lead_manager', 'admin')
  )
$$;

-- RLS for crm_leads
CREATE POLICY "CRM users can view leads" ON public.crm_leads
  FOR SELECT TO authenticated
  USING (public.has_crm_access(auth.uid()));

CREATE POLICY "CRM users can insert leads" ON public.crm_leads
  FOR INSERT TO authenticated
  WITH CHECK (public.has_crm_access(auth.uid()));

CREATE POLICY "CRM users can update leads" ON public.crm_leads
  FOR UPDATE TO authenticated
  USING (public.has_crm_access(auth.uid()));

CREATE POLICY "CRM users can delete leads" ON public.crm_leads
  FOR DELETE TO authenticated
  USING (public.has_crm_access(auth.uid()));

-- RLS for crm_notes
CREATE POLICY "CRM users can view notes" ON public.crm_notes
  FOR SELECT TO authenticated
  USING (public.has_crm_access(auth.uid()));

CREATE POLICY "CRM users can insert notes" ON public.crm_notes
  FOR INSERT TO authenticated
  WITH CHECK (public.has_crm_access(auth.uid()));

CREATE POLICY "CRM users can update notes" ON public.crm_notes
  FOR UPDATE TO authenticated
  USING (public.has_crm_access(auth.uid()));

CREATE POLICY "CRM users can delete notes" ON public.crm_notes
  FOR DELETE TO authenticated
  USING (public.has_crm_access(auth.uid()));

-- RLS for crm_activities
CREATE POLICY "CRM users can view activities" ON public.crm_activities
  FOR SELECT TO authenticated
  USING (public.has_crm_access(auth.uid()));

CREATE POLICY "CRM users can insert activities" ON public.crm_activities
  FOR INSERT TO authenticated
  WITH CHECK (public.has_crm_access(auth.uid()));

-- RLS for crm_tasks
CREATE POLICY "CRM users can view tasks" ON public.crm_tasks
  FOR SELECT TO authenticated
  USING (public.has_crm_access(auth.uid()));

CREATE POLICY "CRM users can insert tasks" ON public.crm_tasks
  FOR INSERT TO authenticated
  WITH CHECK (public.has_crm_access(auth.uid()));

CREATE POLICY "CRM users can update tasks" ON public.crm_tasks
  FOR UPDATE TO authenticated
  USING (public.has_crm_access(auth.uid()));

CREATE POLICY "CRM users can delete tasks" ON public.crm_tasks
  FOR DELETE TO authenticated
  USING (public.has_crm_access(auth.uid()));

-- Function to sync a public lead into CRM
CREATE OR REPLACE FUNCTION public.sync_public_lead_to_crm()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO public.crm_leads (
    full_name, phone, email, source, original_message, public_lead_id, status, pipeline_stage
  ) VALUES (
    NEW.full_name, NEW.phone, NEW.email, NEW.source, NEW.message, NEW.id, 'new', 'new'
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_sync_lead_to_crm
  AFTER INSERT ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_public_lead_to_crm();

-- Enable realtime for CRM leads
ALTER PUBLICATION supabase_realtime ADD TABLE public.crm_leads;
ALTER PUBLICATION supabase_realtime ADD TABLE public.crm_tasks;
