import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Users, AlertTriangle, Flame, CalendarClock, TrendingUp, Clock } from "lucide-react";
import type { CrmLead } from "../types";
import { LEAD_SOURCE_LABELS, TEMPERATURE_CONFIG, STATUS_CONFIG } from "../types";

interface DashboardStats {
  newToday: number;
  newThisWeek: number;
  followupsToday: number;
  overdue: number;
  hotLeads: number;
  noNextAction: number;
  bySource: Record<string, number>;
  recentLeads: CrmLead[];
}

const CrmDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    newToday: 0, newThisWeek: 0, followupsToday: 0, overdue: 0, hotLeads: 0, noNextAction: 0,
    bySource: {}, recentLeads: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay()).toISOString();
    const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).toISOString();

    const [allRes, todayRes, weekRes, followupRes, overdueRes, hotRes, noActionRes] = await Promise.all([
      supabase.from("crm_leads").select("source").limit(1000),
      supabase.from("crm_leads").select("id", { count: "exact", head: true }).gte("created_at", todayStart),
      supabase.from("crm_leads").select("id", { count: "exact", head: true }).gte("created_at", weekStart),
      supabase.from("crm_leads").select("id", { count: "exact", head: true }).gte("next_followup_date", todayStart).lt("next_followup_date", todayEnd),
      supabase.from("crm_leads").select("id", { count: "exact", head: true }).lt("next_followup_date", todayStart).not("next_followup_date", "is", null),
      supabase.from("crm_leads").select("id", { count: "exact", head: true }).eq("temperature", "hot"),
      supabase.from("crm_leads").select("id", { count: "exact", head: true }).is("next_action", null).not("status", "in", "(won,lost)"),
    ]);

    const recentRes = await supabase.from("crm_leads").select("*").order("created_at", { ascending: false }).limit(5);

    // Count by source
    const bySource: Record<string, number> = {};
    allRes.data?.forEach((l) => {
      bySource[l.source] = (bySource[l.source] || 0) + 1;
    });

    setStats({
      newToday: todayRes.count || 0,
      newThisWeek: weekRes.count || 0,
      followupsToday: followupRes.count || 0,
      overdue: overdueRes.count || 0,
      hotLeads: hotRes.count || 0,
      noNextAction: noActionRes.count || 0,
      bySource,
      recentLeads: (recentRes.data || []) as CrmLead[],
    });
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center py-20">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const kpis = [
    { label: "לידים חדשים היום", value: stats.newToday, icon: Users, color: "text-blue-400 bg-blue-500/10" },
    { label: "לידים חדשים השבוע", value: stats.newThisWeek, icon: TrendingUp, color: "text-emerald-400 bg-emerald-500/10" },
    { label: "מעקב היום", value: stats.followupsToday, icon: CalendarClock, color: "text-amber-400 bg-amber-500/10" },
    { label: "מעקב באיחור", value: stats.overdue, icon: AlertTriangle, color: "text-red-400 bg-red-500/10" },
    { label: "לידים חמים 🔥", value: stats.hotLeads, icon: Flame, color: "text-orange-400 bg-orange-500/10" },
    { label: "בלי פעולה הבאה", value: stats.noNextAction, icon: Clock, color: "text-gray-400 bg-gray-500/10" },
  ];

  return (
    <div className="p-4 md:p-6 pb-24 lg:pb-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">דשבורד</h1>
        <Link to="/crm/leads/new" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          + ליד חדש
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-[#1a1d27] rounded-xl p-4 border border-white/5">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${kpi.color}`}>
              <kpi.icon className="w-4.5 h-4.5" />
            </div>
            <p className="text-2xl font-bold text-white">{kpi.value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{kpi.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Recent leads */}
        <div className="bg-[#1a1d27] rounded-xl border border-white/5 p-4">
          <h2 className="text-sm font-semibold text-white mb-3">לידים אחרונים</h2>
          {stats.recentLeads.length === 0 ? (
            <p className="text-gray-500 text-sm py-4">אין לידים עדיין</p>
          ) : (
            <div className="space-y-2">
              {stats.recentLeads.map((lead) => (
                <Link key={lead.id} to={`/crm/leads/${lead.id}`} className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{lead.full_name}</p>
                    <p className="text-xs text-gray-500">{LEAD_SOURCE_LABELS[lead.source] || lead.source}</p>
                  </div>
                  <div className="flex items-center gap-2 mr-3">
                    {lead.temperature && (
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${TEMPERATURE_CONFIG[lead.temperature as keyof typeof TEMPERATURE_CONFIG]?.color || "bg-gray-100 text-gray-600"}`}>
                        {TEMPERATURE_CONFIG[lead.temperature as keyof typeof TEMPERATURE_CONFIG]?.label || lead.temperature}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Leads by source */}
        <div className="bg-[#1a1d27] rounded-xl border border-white/5 p-4">
          <h2 className="text-sm font-semibold text-white mb-3">לידים לפי מקור</h2>
          {Object.keys(stats.bySource).length === 0 ? (
            <p className="text-gray-500 text-sm py-4">אין נתונים</p>
          ) : (
            <div className="space-y-2">
              {Object.entries(stats.bySource)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 8)
                .map(([source, count]) => (
                  <div key={source} className="flex items-center justify-between py-1.5">
                    <span className="text-sm text-gray-300">{LEAD_SOURCE_LABELS[source] || source}</span>
                    <span className="text-sm font-medium text-white">{count}</span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CrmDashboard;
