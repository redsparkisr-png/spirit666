import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import type { CrmLead } from "../types";
import { PIPELINE_STAGES, TEMPERATURE_CONFIG, LEAD_SOURCE_LABELS } from "../types";

const CrmPipeline = () => {
  const [leads, setLeads] = useState<CrmLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    const { data } = await supabase.from("crm_leads").select("*").order("updated_at", { ascending: false }).limit(500);
    if (data) setLeads(data as CrmLead[]);
    setLoading(false);
  };

  const handleDrop = async (leadId: string, newStage: string) => {
    setDraggingId(null);
    const lead = leads.find((l) => l.id === leadId);
    if (!lead || lead.pipeline_stage === newStage) return;

    // Optimistic update
    setLeads((prev) => prev.map((l) => l.id === leadId ? { ...l, pipeline_stage: newStage } : l));

    const { error } = await supabase.from("crm_leads").update({ pipeline_stage: newStage }).eq("id", leadId);
    if (error) {
      toast.error("שגיאה בעדכון");
      loadLeads();
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center py-20">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 pb-24 lg:pb-6">
      <h1 className="text-xl font-bold text-white mb-4">Pipeline</h1>

      <div className="overflow-x-auto pb-4">
        <div className="flex gap-3" style={{ minWidth: `${PIPELINE_STAGES.length * 260}px` }}>
          {PIPELINE_STAGES.map((stage) => {
            const stageLeads = leads.filter((l) => l.pipeline_stage === stage.id);
            return (
              <div
                key={stage.id}
                className="w-[250px] flex-shrink-0"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const leadId = e.dataTransfer.getData("text/plain");
                  if (leadId) handleDrop(leadId, stage.id);
                }}
              >
                {/* Column header */}
                <div className="flex items-center gap-2 mb-3 px-1">
                  <div className={`w-2.5 h-2.5 rounded-full ${stage.color}`} />
                  <span className="text-xs font-semibold text-gray-300">{stage.label}</span>
                  <span className="text-[10px] text-gray-500 bg-white/5 px-1.5 py-0.5 rounded-full">{stageLeads.length}</span>
                </div>

                {/* Cards */}
                <div className="space-y-2 min-h-[100px] bg-white/[0.01] rounded-xl p-1.5">
                  {stageLeads.map((lead) => (
                    <Link
                      key={lead.id}
                      to={`/crm/leads/${lead.id}`}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("text/plain", lead.id);
                        setDraggingId(lead.id);
                      }}
                      onDragEnd={() => setDraggingId(null)}
                      className={`block bg-[#1a1d27] rounded-lg border border-white/5 p-3 hover:bg-white/[0.04] transition-colors cursor-grab active:cursor-grabbing ${
                        draggingId === lead.id ? "opacity-50" : ""
                      }`}
                    >
                      <p className="text-sm font-medium text-white truncate">{lead.full_name}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        {lead.temperature && (
                          <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full border ${TEMPERATURE_CONFIG[lead.temperature as keyof typeof TEMPERATURE_CONFIG]?.color || ""}`}>
                            {TEMPERATURE_CONFIG[lead.temperature as keyof typeof TEMPERATURE_CONFIG]?.label || lead.temperature}
                          </span>
                        )}
                        <span className="text-[10px] text-gray-500">{LEAD_SOURCE_LABELS[lead.source] || lead.source}</span>
                      </div>
                      {lead.next_followup_date && (
                        <p className={`text-[10px] mt-1 ${new Date(lead.next_followup_date) < new Date() ? "text-red-400" : "text-gray-500"}`}>
                          📅 {new Date(lead.next_followup_date).toLocaleDateString("he-IL")}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CrmPipeline;
