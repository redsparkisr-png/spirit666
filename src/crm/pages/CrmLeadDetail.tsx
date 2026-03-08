import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowRight, Phone, MessageCircle, Mail, Save, Plus, CalendarClock } from "lucide-react";
import type { CrmLead, CrmNote, CrmActivity } from "../types";
import { LEAD_SOURCE_LABELS, TEMPERATURE_CONFIG, STATUS_CONFIG, PIPELINE_STAGES, TASK_TYPES } from "../types";
import { useCrmAuth } from "../hooks/useCrmAuth";

const CrmLeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useCrmAuth();
  const [lead, setLead] = useState<CrmLead | null>(null);
  const [notes, setNotes] = useState<CrmNote[]>([]);
  const [activities, setActivities] = useState<CrmActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState("");
  const [activeTab, setActiveTab] = useState<"info" | "notes" | "activity">("info");

  // Editable fields
  const [status, setStatus] = useState("");
  const [temperature, setTemperature] = useState("");
  const [pipelineStage, setPipelineStage] = useState("");
  const [nextAction, setNextAction] = useState("");
  const [nextFollowupDate, setNextFollowupDate] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    loadLead();
  }, [id]);

  const loadLead = async () => {
    setLoading(true);
    const [leadRes, notesRes, actRes] = await Promise.all([
      supabase.from("crm_leads").select("*").eq("id", id!).single(),
      supabase.from("crm_notes").select("*").eq("lead_id", id!).order("created_at", { ascending: false }),
      supabase.from("crm_activities").select("*").eq("lead_id", id!).order("created_at", { ascending: false }).limit(50),
    ]);

    if (leadRes.data) {
      const l = leadRes.data as CrmLead;
      setLead(l);
      setStatus(l.status);
      setTemperature(l.temperature || "warm");
      setPipelineStage(l.pipeline_stage);
      setNextAction(l.next_action || "");
      setNextFollowupDate(l.next_followup_date ? l.next_followup_date.slice(0, 10) : "");
    }
    if (notesRes.data) setNotes(notesRes.data as CrmNote[]);
    if (actRes.data) setActivities(actRes.data as CrmActivity[]);
    setLoading(false);
  };

  const saveLead = async () => {
    if (!id) return;
    setSaving(true);
    const updates: any = {
      status,
      temperature,
      pipeline_stage: pipelineStage,
      next_action: nextAction || null,
      next_followup_date: nextFollowupDate || null,
    };

    // Calculate lead score
    let score = 0;
    if (lead?.source === "property_page") score += 15;
    if (lead?.guide_requested) score += 8;
    if (lead?.source?.includes("whatsapp")) score += 12;
    if (lead?.phone) score += 8;
    if (lead?.email) score += 4;
    if (lead?.budget_max) score += 10;
    if (lead?.timeline_to_buy === "under_3_months") score += 20;
    updates.lead_score = score;

    // Auto-classify temperature based on score
    if (score >= 30) updates.temperature = "hot";
    else if (score >= 15) updates.temperature = "warm";

    const { error } = await supabase.from("crm_leads").update(updates).eq("id", id);
    if (error) {
      toast.error("שגיאה בשמירה");
    } else {
      toast.success("נשמר בהצלחה");
      // Log activity
      await supabase.from("crm_activities").insert({
        lead_id: id,
        performed_by: user?.id,
        action_type: "status_changed",
        description: `סטטוס עודכן ל-${STATUS_CONFIG[status]?.label || status}`,
      });
    }
    setSaving(false);
  };

  const addNote = async () => {
    if (!newNote.trim() || !id || !user) return;
    const { error } = await supabase.from("crm_notes").insert({
      lead_id: id,
      created_by: user.id,
      content: newNote.trim(),
    });
    if (error) {
      toast.error("שגיאה בהוספת הערה");
    } else {
      setNewNote("");
      await supabase.from("crm_activities").insert({
        lead_id: id,
        performed_by: user.id,
        action_type: "note_added",
        description: newNote.trim().slice(0, 100),
      });
      loadLead();
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center py-20">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="p-6 text-center py-20">
        <p className="text-gray-400">ליד לא נמצא</p>
        <Link to="/crm/leads" className="text-blue-400 text-sm underline mt-2 inline-block">חזרה לרשימה</Link>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 pb-24 lg:pb-6 space-y-4 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/crm/leads")} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 transition-colors">
          <ArrowRight className="w-4 h-4" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold text-white">{lead.full_name}</h1>
          <p className="text-xs text-gray-500">{LEAD_SOURCE_LABELS[lead.source] || lead.source} • {new Date(lead.created_at).toLocaleDateString("he-IL")}</p>
        </div>
        {/* Quick contact */}
        <div className="flex gap-1.5">
          {lead.phone && (
            <a href={`tel:${lead.phone}`} className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white">
              <Phone className="w-4 h-4" />
            </a>
          )}
          {(lead.whatsapp || lead.phone) && (
            <a href={`https://wa.me/${(lead.whatsapp || lead.phone || "").replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener" className="p-2.5 rounded-lg bg-green-600/20 hover:bg-green-600/30 text-green-400">
              <MessageCircle className="w-4 h-4" />
            </a>
          )}
          {lead.email && (
            <a href={`mailto:${lead.email}`} className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white">
              <Mail className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Tab navigation */}
      <div className="flex gap-1 border-b border-white/5">
        {(["info", "notes", "activity"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              activeTab === tab ? "border-blue-500 text-blue-400" : "border-transparent text-gray-500 hover:text-gray-300"
            }`}
          >
            {tab === "info" ? "פרטים" : tab === "notes" ? `הערות (${notes.length})` : "פעילות"}
          </button>
        ))}
      </div>

      {/* Info tab */}
      {activeTab === "info" && (
        <div className="space-y-4">
          {/* Contact info */}
          <div className="bg-[#1a1d27] rounded-xl border border-white/5 p-4 space-y-3">
            <h3 className="text-sm font-semibold text-white">פרטי קשר</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-gray-500 text-xs">טלפון</span><p className="text-white" dir="ltr">{lead.phone || "—"}</p></div>
              <div><span className="text-gray-500 text-xs">אימייל</span><p className="text-white truncate" dir="ltr">{lead.email || "—"}</p></div>
              <div><span className="text-gray-500 text-xs">מדינה</span><p className="text-white">{lead.country || "—"}</p></div>
              <div><span className="text-gray-500 text-xs">עיר</span><p className="text-white">{lead.city || "—"}</p></div>
              <div><span className="text-gray-500 text-xs">שפה</span><p className="text-white">{lead.language || "—"}</p></div>
              <div><span className="text-gray-500 text-xs">WhatsApp</span><p className="text-white" dir="ltr">{lead.whatsapp || lead.phone || "—"}</p></div>
            </div>
          </div>

          {/* Lead handling */}
          <div className="bg-[#1a1d27] rounded-xl border border-white/5 p-4 space-y-3">
            <h3 className="text-sm font-semibold text-white">ניהול ליד</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-gray-500 text-xs block mb-1">סטטוס</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full bg-[#0f1117] text-white text-sm rounded-lg px-3 py-2 border border-white/10">
                  {Object.entries(STATUS_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </select>
              </div>
              <div>
                <label className="text-gray-500 text-xs block mb-1">טמפרטורה</label>
                <select value={temperature} onChange={(e) => setTemperature(e.target.value)} className="w-full bg-[#0f1117] text-white text-sm rounded-lg px-3 py-2 border border-white/10">
                  <option value="hot">חם 🔥</option>
                  <option value="warm">חמים</option>
                  <option value="cold">קר</option>
                </select>
              </div>
              <div>
                <label className="text-gray-500 text-xs block mb-1">שלב Pipeline</label>
                <select value={pipelineStage} onChange={(e) => setPipelineStage(e.target.value)} className="w-full bg-[#0f1117] text-white text-sm rounded-lg px-3 py-2 border border-white/10">
                  {PIPELINE_STAGES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
              </div>
              <div>
                <label className="text-gray-500 text-xs block mb-1">מעקב הבא</label>
                <input type="date" value={nextFollowupDate} onChange={(e) => setNextFollowupDate(e.target.value)} className="w-full bg-[#0f1117] text-white text-sm rounded-lg px-3 py-2 border border-white/10" dir="ltr" />
              </div>
              <div className="col-span-2">
                <label className="text-gray-500 text-xs block mb-1">פעולה הבאה</label>
                <input type="text" value={nextAction} onChange={(e) => setNextAction(e.target.value)} placeholder="לדוגמה: להתקשר ביום ראשון" className="w-full bg-[#0f1117] text-white text-sm rounded-lg px-3 py-2 border border-white/10 placeholder:text-gray-600" />
              </div>
            </div>
            <button onClick={saveLead} disabled={saving} className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
              <Save className="w-4 h-4" />
              {saving ? "שומר..." : "שמור שינויים"}
            </button>
          </div>

          {/* Marketing source */}
          {(lead.utm_source || lead.campaign || lead.landing_page) && (
            <div className="bg-[#1a1d27] rounded-xl border border-white/5 p-4 space-y-3">
              <h3 className="text-sm font-semibold text-white">מקור שיווקי</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {lead.utm_source && <div><span className="text-gray-500 text-xs">UTM Source</span><p className="text-white">{lead.utm_source}</p></div>}
                {lead.utm_medium && <div><span className="text-gray-500 text-xs">UTM Medium</span><p className="text-white">{lead.utm_medium}</p></div>}
                {lead.campaign && <div><span className="text-gray-500 text-xs">קמפיין</span><p className="text-white">{lead.campaign}</p></div>}
                {lead.landing_page && <div className="col-span-2"><span className="text-gray-500 text-xs">דף נחיתה</span><p className="text-white truncate" dir="ltr">{lead.landing_page}</p></div>}
              </div>
            </div>
          )}

          {/* Buyer details */}
          <div className="bg-[#1a1d27] rounded-xl border border-white/5 p-4 space-y-3">
            <h3 className="text-sm font-semibold text-white">פרטי רוכש</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><span className="text-gray-500 text-xs">סוג רוכש</span><p className="text-white">{lead.buyer_type || "—"}</p></div>
              <div><span className="text-gray-500 text-xs">תקציב</span><p className="text-white">{lead.budget_min || lead.budget_max ? `${lead.budget_min || "?"} - ${lead.budget_max || "?"}` : "—"}</p></div>
              <div><span className="text-gray-500 text-xs">טיימליין</span><p className="text-white">{lead.timeline_to_buy || "—"}</p></div>
              <div><span className="text-gray-500 text-xs">סוג נכס</span><p className="text-white">{lead.property_type_preference || "—"}</p></div>
              {lead.guide_requested && <div className="col-span-2"><span className="text-xs text-emerald-400">✓ ביקש מדריך רכישה</span></div>}
            </div>
          </div>

          {/* Original message */}
          {lead.original_message && (
            <div className="bg-[#1a1d27] rounded-xl border border-white/5 p-4">
              <h3 className="text-sm font-semibold text-white mb-2">הודעה מקורית</h3>
              <p className="text-sm text-gray-300 whitespace-pre-line">{lead.original_message}</p>
            </div>
          )}

          {/* Lead score */}
          <div className="bg-[#1a1d27] rounded-xl border border-white/5 p-4 flex items-center justify-between">
            <span className="text-sm text-gray-400">ציון ליד</span>
            <span className="text-lg font-bold text-white">{lead.lead_score || 0}</span>
          </div>
        </div>
      )}

      {/* Notes tab */}
      {activeTab === "notes" && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addNote()}
              placeholder="הוסף הערה..."
              className="flex-1 bg-[#1a1d27] text-white text-sm rounded-lg px-4 py-2.5 border border-white/5 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500/40"
            />
            <button onClick={addNote} className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-lg transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2">
            {notes.map((note) => (
              <div key={note.id} className="bg-[#1a1d27] rounded-xl border border-white/5 p-4">
                <p className="text-sm text-gray-200 whitespace-pre-line">{note.content}</p>
                <p className="text-[10px] text-gray-500 mt-2">{new Date(note.created_at).toLocaleString("he-IL")}</p>
              </div>
            ))}
            {notes.length === 0 && <p className="text-gray-500 text-sm text-center py-8">אין הערות עדיין</p>}
          </div>
        </div>
      )}

      {/* Activity tab */}
      {activeTab === "activity" && (
        <div className="space-y-2">
          {activities.map((act) => (
            <div key={act.id} className="flex gap-3 py-2.5 border-b border-white/5 last:border-0">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-300">{act.description || act.action_type}</p>
                <p className="text-[10px] text-gray-500">{new Date(act.created_at).toLocaleString("he-IL")}</p>
              </div>
            </div>
          ))}
          {activities.length === 0 && <p className="text-gray-500 text-sm text-center py-8">אין פעילות עדיין</p>}
        </div>
      )}
    </div>
  );
};

export default CrmLeadDetail;
