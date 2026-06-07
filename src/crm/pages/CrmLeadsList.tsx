"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import Link from "next/link";
import { Search, Phone, MessageCircle, Mail, Filter, ChevronDown } from "lucide-react";
import type { CrmLead } from "../types";
import { LEAD_SOURCE_LABELS, TEMPERATURE_CONFIG, STATUS_CONFIG } from "../types";

const CrmLeadsList = () => {
  const [leads, setLeads] = useState<CrmLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterTemp, setFilterTemp] = useState("");
  const [filterSource, setFilterSource] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<"created_at" | "updated_at" | "next_followup_date">("created_at");

  useEffect(() => {
    loadLeads();
    // Realtime subscription
    const channel = supabase
      .channel("crm_leads_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "crm_leads" }, () => {
        loadLeads();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const loadLeads = async () => {
    const { data } = await supabase
      .from("crm_leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (data) setLeads(data as CrmLead[]);
    setLoading(false);
  };

  const filtered = useMemo(() => {
    let result = leads;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((l) =>
        l.full_name.toLowerCase().includes(q) ||
        l.phone?.includes(q) ||
        l.email?.toLowerCase().includes(q) ||
        l.country?.toLowerCase().includes(q)
      );
    }
    if (filterStatus) result = result.filter((l) => l.status === filterStatus);
    if (filterTemp) result = result.filter((l) => l.temperature === filterTemp);
    if (filterSource) result = result.filter((l) => l.source === filterSource);

    result.sort((a, b) => {
      const aVal = a[sortBy] || "";
      const bVal = b[sortBy] || "";
      return bVal.localeCompare(aVal);
    });

    return result;
  }, [leads, search, filterStatus, filterTemp, filterSource, sortBy]);

  const quickCounts = useMemo(() => {
    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);
    return {
      total: leads.length,
      newToday: leads.filter((l) => l.created_at.slice(0, 10) === todayStr).length,
      hot: leads.filter((l) => l.temperature === "hot").length,
      overdue: leads.filter((l) => l.next_followup_date && l.next_followup_date < now.toISOString()).length,
    };
  }, [leads]);

  if (loading) {
    return (
      <div className="p-6 flex justify-center py-20">
        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 pb-24 lg:pb-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">לידים</h1>
        <Link href="/crm/leads/new" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          + ליד חדש
        </Link>
      </div>

      {/* Quick filter chips */}
      <div className="flex gap-2 flex-wrap">
        <button onClick={() => { setFilterStatus(""); setFilterTemp(""); setFilterSource(""); }} className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${!filterStatus && !filterTemp && !filterSource ? "bg-blue-600/20 text-blue-400 border-blue-500/30" : "bg-white/5 text-gray-400 border-white/10 hover:text-white"}`}>
          הכל ({quickCounts.total})
        </button>
        <button onClick={() => { setFilterTemp("hot"); setFilterStatus(""); setFilterSource(""); }} className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${filterTemp === "hot" ? "bg-red-600/20 text-red-400 border-red-500/30" : "bg-white/5 text-gray-400 border-white/10 hover:text-white"}`}>
          חמים 🔥 ({quickCounts.hot})
        </button>
        <button onClick={() => setShowFilters(!showFilters)} className="px-3 py-1.5 rounded-full text-xs font-medium border bg-white/5 text-gray-400 border-white/10 hover:text-white transition-colors flex items-center gap-1">
          <Filter className="w-3 h-3" />
          סינון
          <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="חיפוש שם, טלפון, אימייל..."
          className="w-full pr-10 pl-4 py-2.5 rounded-lg bg-[#1a1d27] border border-white/5 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500/40"
          dir="rtl"
        />
      </div>

      {/* Advanced filters */}
      {showFilters && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-[#1a1d27] p-3 rounded-lg border border-white/5">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="bg-[#0f1117] text-white text-xs rounded-lg px-2 py-2 border border-white/10">
            <option value="">כל הסטטוסים</option>
            {Object.entries(STATUS_CONFIG).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
          </select>
          <select value={filterTemp} onChange={(e) => setFilterTemp(e.target.value)} className="bg-[#0f1117] text-white text-xs rounded-lg px-2 py-2 border border-white/10">
            <option value="">כל הטמפרטורות</option>
            <option value="hot">חם 🔥</option>
            <option value="warm">חמים</option>
            <option value="cold">קר</option>
          </select>
          <select value={filterSource} onChange={(e) => setFilterSource(e.target.value)} className="bg-[#0f1117] text-white text-xs rounded-lg px-2 py-2 border border-white/10">
            <option value="">כל המקורות</option>
            {Object.entries(LEAD_SOURCE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="bg-[#0f1117] text-white text-xs rounded-lg px-2 py-2 border border-white/10">
            <option value="created_at">מיון: תאריך יצירה</option>
            <option value="updated_at">מיון: עדכון אחרון</option>
            <option value="next_followup_date">מיון: מעקב הבא</option>
          </select>
        </div>
      )}

      {/* Results count */}
      <p className="text-xs text-gray-500">{filtered.length} תוצאות</p>

      {/* Lead cards */}
      <div className="space-y-2">
        {filtered.map((lead) => (
          <Link key={lead.id} href={`/crm/leads/${lead.id}`} className="block bg-[#1a1d27] rounded-xl border border-white/5 p-4 hover:bg-white/[0.03] transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-white truncate">{lead.full_name}</p>
                  {lead.temperature && (
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${TEMPERATURE_CONFIG[lead.temperature as keyof typeof TEMPERATURE_CONFIG]?.color || ""}`}>
                      {TEMPERATURE_CONFIG[lead.temperature as keyof typeof TEMPERATURE_CONFIG]?.label || lead.temperature}
                    </span>
                  )}
                  {lead.status && STATUS_CONFIG[lead.status] && (
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${STATUS_CONFIG[lead.status].color}`}>
                      {STATUS_CONFIG[lead.status].label}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  {lead.country && <span>{lead.country}</span>}
                  <span>{LEAD_SOURCE_LABELS[lead.source] || lead.source}</span>
                  <span>{new Date(lead.created_at).toLocaleDateString("he-IL")}</span>
                </div>
                {lead.next_followup_date && (
                  <p className={`text-xs mt-1 ${new Date(lead.next_followup_date) < new Date() ? "text-red-400" : "text-amber-400"}`}>
                    מעקב: {new Date(lead.next_followup_date).toLocaleDateString("he-IL")}
                  </p>
                )}
                {!lead.next_action && lead.status !== "won" && lead.status !== "lost" && (
                  <p className="text-[10px] text-red-400/70 mt-1">⚠ ללא פעולה הבאה</p>
                )}
              </div>

              {/* Quick actions */}
              <div className="flex gap-1.5 flex-shrink-0" onClick={(e) => e.preventDefault()}>
                {lead.phone && (
                  <a href={`tel:${lead.phone}`} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                    <Phone className="w-4 h-4" />
                  </a>
                )}
                {(lead.whatsapp || lead.phone) && (
                  <a href={`https://wa.me/${(lead.whatsapp || lead.phone || "").replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener" className="p-2 rounded-lg bg-white/5 hover:bg-green-600/20 text-gray-400 hover:text-green-400 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                  </a>
                )}
                {lead.email && (
                  <a href={`mailto:${lead.email}`} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-sm">לא נמצאו לידים</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CrmLeadsList;
