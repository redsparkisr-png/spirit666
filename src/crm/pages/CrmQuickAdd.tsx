import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useCrmAuth } from "../hooks/useCrmAuth";
import { LEAD_SOURCE_LABELS } from "../types";

const CrmQuickAdd = () => {
  const navigate = useNavigate();
  const { user } = useCrmAuth();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    source: "whatsapp_personal",
    note: "",
    country: "",
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name.trim()) {
      toast.error("נא להזין שם");
      return;
    }
    setSaving(true);

    // Calculate initial score
    let score = 0;
    if (form.phone) score += 8;
    if (form.email) score += 4;
    if (form.source.includes("whatsapp")) score += 12;

    const { data, error } = await supabase.from("crm_leads").insert({
      full_name: form.full_name.trim(),
      phone: form.phone.trim() || null,
      email: form.email.trim() || null,
      country: form.country.trim() || null,
      source: form.source,
      assigned_to: user?.id,
      status: "new",
      pipeline_stage: "new",
      temperature: score >= 20 ? "hot" : "warm",
      lead_score: score,
      whatsapp: form.phone.trim() || null,
    }).select("id").single();

    if (error) {
      toast.error("שגיאה ביצירת ליד");
      setSaving(false);
      return;
    }

    // Add initial note if provided
    if (form.note.trim() && data) {
      await supabase.from("crm_notes").insert({
        lead_id: data.id,
        created_by: user!.id,
        content: form.note.trim(),
      });
    }

    // Log activity
    if (data) {
      await supabase.from("crm_activities").insert({
        lead_id: data.id,
        performed_by: user?.id,
        action_type: "lead_created",
        description: `ליד חדש נוצר - ${form.full_name}`,
      });
    }

    toast.success("ליד נוצר בהצלחה!");
    navigate(`/crm/leads/${data?.id}`);
  };

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  return (
    <div className="p-4 md:p-6 pb-24 lg:pb-6 max-w-lg">
      <h1 className="text-xl font-bold text-white mb-6">ליד חדש</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-gray-400 text-xs block mb-1">שם *</label>
          <input value={form.full_name} onChange={(e) => update("full_name", e.target.value)} required className="w-full bg-[#1a1d27] text-white text-sm rounded-lg px-4 py-3 border border-white/5 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500/40" placeholder="שם מלא" />
        </div>

        <div>
          <label className="text-gray-400 text-xs block mb-1">טלפון</label>
          <input value={form.phone} onChange={(e) => update("phone", e.target.value)} type="tel" dir="ltr" className="w-full bg-[#1a1d27] text-white text-sm rounded-lg px-4 py-3 border border-white/5 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500/40" placeholder="+972..." />
        </div>

        <div>
          <label className="text-gray-400 text-xs block mb-1">אימייל</label>
          <input value={form.email} onChange={(e) => update("email", e.target.value)} type="email" dir="ltr" className="w-full bg-[#1a1d27] text-white text-sm rounded-lg px-4 py-3 border border-white/5 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500/40" placeholder="email@example.com" />
        </div>

        <div>
          <label className="text-gray-400 text-xs block mb-1">מדינה</label>
          <input value={form.country} onChange={(e) => update("country", e.target.value)} className="w-full bg-[#1a1d27] text-white text-sm rounded-lg px-4 py-3 border border-white/5 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500/40" placeholder="ישראל / ארה״ב..." />
        </div>

        <div>
          <label className="text-gray-400 text-xs block mb-1">מקור</label>
          <select value={form.source} onChange={(e) => update("source", e.target.value)} className="w-full bg-[#1a1d27] text-white text-sm rounded-lg px-4 py-3 border border-white/5">
            {Object.entries(LEAD_SOURCE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
        </div>

        <div>
          <label className="text-gray-400 text-xs block mb-1">הערה ראשונית</label>
          <textarea value={form.note} onChange={(e) => update("note", e.target.value)} rows={3} className="w-full bg-[#1a1d27] text-white text-sm rounded-lg px-4 py-3 border border-white/5 placeholder:text-gray-500 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500/40" placeholder="הערות על הפנייה..." />
        </div>

        <button type="submit" disabled={saving} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
          {saving ? "שומר..." : "צור ליד"}
        </button>
      </form>
    </div>
  );
};

export default CrmQuickAdd;
