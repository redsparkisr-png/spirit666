export interface CrmLead {
  id: string;
  created_at: string;
  updated_at: string;
  full_name: string;
  phone: string | null;
  email: string | null;
  whatsapp: string | null;
  country: string | null;
  city: string | null;
  language: string | null;
  timezone: string | null;
  source: string;
  medium: string | null;
  campaign: string | null;
  ad_content: string | null;
  landing_page: string | null;
  entry_point: string | null;
  first_page_visited: string | null;
  guide_requested: boolean | null;
  related_property: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  buyer_type: string | null;
  budget_min: number | null;
  budget_max: number | null;
  budget_currency: string | null;
  timeline_to_buy: string | null;
  property_type_preference: string | null;
  preferred_neighborhoods: string[] | null;
  must_have_features: string[] | null;
  financing_needed: boolean | null;
  motivation_notes: string | null;
  assigned_to: string | null;
  status: string;
  temperature: string | null;
  lead_score: number | null;
  priority: string | null;
  last_contacted_at: string | null;
  next_action: string | null;
  next_followup_date: string | null;
  next_followup_type: string | null;
  pipeline_stage: string;
  public_lead_id: string | null;
  original_message: string | null;
}

export interface CrmNote {
  id: string;
  lead_id: string;
  created_by: string;
  created_at: string;
  content: string;
  is_pinned: boolean | null;
}

export interface CrmActivity {
  id: string;
  lead_id: string;
  performed_by: string | null;
  created_at: string;
  action_type: string;
  description: string | null;
  metadata: Record<string, any>;
}

export interface CrmTask {
  id: string;
  lead_id: string | null;
  assigned_to: string | null;
  created_by: string | null;
  created_at: string;
  action_type: string;
  due_date: string;
  due_time: string | null;
  notes: string | null;
  status: string;
  completed_at: string | null;
}

export const PIPELINE_STAGES = [
  { id: "new", label: "חדש", color: "bg-blue-500" },
  { id: "contacted", label: "נוצר קשר", color: "bg-cyan-500" },
  { id: "awaiting_reply", label: "ממתין לתגובה", color: "bg-yellow-500" },
  { id: "qualified", label: "מתאים", color: "bg-emerald-500" },
  { id: "properties_sent", label: "נכסים נשלחו", color: "bg-teal-500" },
  { id: "call_scheduled", label: "שיחה מתואמת", color: "bg-indigo-500" },
  { id: "active_buyer", label: "קונה פעיל", color: "bg-purple-500" },
  { id: "visit_planned", label: "ביקור מתוכנן", color: "bg-pink-500" },
  { id: "negotiation", label: "משא ומתן", color: "bg-orange-500" },
  { id: "closed_won", label: "נסגר בהצלחה", color: "bg-green-600" },
  { id: "closed_lost", label: "אבד", color: "bg-red-500" },
  { id: "long_term", label: "מעקב ארוך טווח", color: "bg-gray-500" },
] as const;

export const LEAD_SOURCES = [
  "google_ads", "facebook_ads", "instagram_ads", "website_form",
  "property_page", "buying_guide", "website_whatsapp", "whatsapp_broadcast",
  "whatsapp_personal", "referral", "phone_call", "organic", "direct", "manual",
] as const;

export const LEAD_SOURCE_LABELS: Record<string, string> = {
  google_ads: "Google Ads",
  facebook_ads: "Facebook Ads",
  instagram_ads: "Instagram Ads",
  website_form: "טופס באתר",
  property_page: "דף נכס",
  buying_guide: "מדריך רכישה",
  website_whatsapp: "WhatsApp מהאתר",
  whatsapp_broadcast: "WhatsApp שידור",
  whatsapp_personal: "WhatsApp אישי",
  referral: "הפניה",
  phone_call: "שיחת טלפון",
  organic: "אורגני",
  direct: "ישיר",
  manual: "הזנה ידנית",
};

export const TEMPERATURE_CONFIG = {
  hot: { label: "חם 🔥", color: "bg-red-100 text-red-700 border-red-200" },
  warm: { label: "חמים", color: "bg-amber-100 text-amber-700 border-amber-200" },
  cold: { label: "קר", color: "bg-blue-100 text-blue-700 border-blue-200" },
} as const;

export const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  new: { label: "חדש", color: "bg-blue-100 text-blue-700" },
  contacted: { label: "נוצר קשר", color: "bg-cyan-100 text-cyan-700" },
  qualified: { label: "מתאים", color: "bg-emerald-100 text-emerald-700" },
  proposal: { label: "הצעה", color: "bg-purple-100 text-purple-700" },
  negotiation: { label: "מו\"מ", color: "bg-orange-100 text-orange-700" },
  won: { label: "נסגר ✓", color: "bg-green-100 text-green-700" },
  lost: { label: "אבד", color: "bg-red-100 text-red-700" },
  on_hold: { label: "בהמתנה", color: "bg-gray-100 text-gray-700" },
};

export const TASK_TYPES = [
  { id: "call", label: "שיחה", icon: "📞" },
  { id: "whatsapp", label: "WhatsApp", icon: "💬" },
  { id: "email", label: "אימייל", icon: "📧" },
  { id: "meeting", label: "פגישה", icon: "🤝" },
  { id: "send_properties", label: "שליחת נכסים", icon: "🏠" },
  { id: "follow_up", label: "מעקב", icon: "🔄" },
] as const;
