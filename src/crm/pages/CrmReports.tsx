import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LEAD_SOURCE_LABELS } from "../types";

interface ReportData {
  bySource: Record<string, number>;
  byCampaign: Record<string, number>;
  byCountry: Record<string, number>;
  byMonth: Record<string, number>;
  guideRequests: number;
  whatsappLeads: number;
  closedWon: number;
  closedLost: number;
  noFollowup: number;
  total: number;
}

const CrmReports = () => {
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    const { data: leads } = await supabase.from("crm_leads").select("source, campaign, country, created_at, guide_requested, pipeline_stage, next_followup_date, status").limit(1000);

    if (!leads) { setLoading(false); return; }

    const bySource: Record<string, number> = {};
    const byCampaign: Record<string, number> = {};
    const byCountry: Record<string, number> = {};
    const byMonth: Record<string, number> = {};
    let guideRequests = 0;
    let whatsappLeads = 0;
    let closedWon = 0;
    let closedLost = 0;
    let noFollowup = 0;

    leads.forEach((l: any) => {
      bySource[l.source] = (bySource[l.source] || 0) + 1;
      if (l.campaign) byCampaign[l.campaign] = (byCampaign[l.campaign] || 0) + 1;
      if (l.country) byCountry[l.country] = (byCountry[l.country] || 0) + 1;
      const month = l.created_at.slice(0, 7);
      byMonth[month] = (byMonth[month] || 0) + 1;
      if (l.guide_requested) guideRequests++;
      if (l.source?.includes("whatsapp")) whatsappLeads++;
      if (l.pipeline_stage === "closed_won") closedWon++;
      if (l.pipeline_stage === "closed_lost") closedLost++;
      if (!l.next_followup_date && l.status !== "won" && l.status !== "lost") noFollowup++;
    });

    setData({ bySource, byCampaign, byCountry, byMonth, guideRequests, whatsappLeads, closedWon, closedLost, noFollowup, total: leads.length });
    setLoading(false);
  };

  if (loading || !data) {
    return (
      <div className="p-6 flex justify-center py-20">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const renderTable = (title: string, entries: Record<string, number>, labelMap?: Record<string, string>) => (
    <div className="bg-[#1a1d27] rounded-xl border border-white/5 p-4">
      <h3 className="text-sm font-semibold text-white mb-3">{title}</h3>
      <div className="space-y-1.5">
        {Object.entries(entries)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 10)
          .map(([key, count]) => {
            const pct = data.total > 0 ? (count / data.total) * 100 : 0;
            return (
              <div key={key} className="flex items-center gap-3">
                <span className="text-xs text-gray-400 flex-1 truncate">{labelMap?.[key] || key || "(ריק)"}</span>
                <div className="w-24 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs text-white font-medium w-8 text-left">{count}</span>
              </div>
            );
          })}
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-6 pb-24 lg:pb-6 space-y-4">
      <h1 className="text-xl font-bold text-white">דוחות</h1>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "סה\"כ לידים", value: data.total },
          { label: "בקשות מדריך", value: data.guideRequests },
          { label: "לידים WhatsApp", value: data.whatsappLeads },
          { label: "נסגרו בהצלחה", value: data.closedWon },
          { label: "אבדו", value: data.closedLost },
          { label: "ללא מעקב", value: data.noFollowup },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-[#1a1d27] rounded-xl border border-white/5 p-3">
            <p className="text-xl font-bold text-white">{kpi.value}</p>
            <p className="text-[10px] text-gray-400">{kpi.label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {renderTable("לפי מקור", data.bySource, LEAD_SOURCE_LABELS)}
        {renderTable("לפי מדינה", data.byCountry)}
        {renderTable("לפי קמפיין", data.byCampaign)}
        {renderTable("לפי חודש", data.byMonth)}
      </div>
    </div>
  );
};

export default CrmReports;
