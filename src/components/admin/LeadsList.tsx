"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Download, ChevronDown, MessageCircle } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Lead = Tables<"leads">;

const STATUS_OPTIONS = ["new", "contacted", "qualified", "closed"] as const;
const STATUS_COLORS: Record<string, string> = {
  new: "bg-gold/20 text-gold-hover",
  contacted: "bg-primary/15 text-primary",
  qualified: "bg-[hsl(142,50%,90%)] text-[hsl(142,50%,30%)]",
  closed: "bg-muted text-muted-foreground",
};

const LeadsList = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [notesValue, setNotesValue] = useState("");

  const load = async () => {
    const { data } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setLeads(data);
  };

  useEffect(() => { load(); }, []);

  const newCount = leads.filter((l) => (l as any).status === "new").length;

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("leads").update({ status } as any).eq("id", id);
    if (error) toast.error(error.message);
    else load();
  };

  const saveNotes = async (id: string) => {
    const { error } = await supabase.from("leads").update({ notes: notesValue } as any).eq("id", id);
    if (error) toast.error(error.message);
    else { setEditingNotes(null); load(); }
  };

  const exportCSV = () => {
    const headers = ["Name", "Email", "Phone", "Source", "Status", "Notes", "Date"];
    const rows = leads.map((l) => [
      l.full_name,
      l.email || "",
      l.phone || "",
      l.source,
      (l as any).status || "new",
      ((l as any).notes || "").replace(/"/g, '""'),
      new Date(l.created_at).toLocaleDateString(),
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.map((v) => `"${v}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 bg-[#25D366]/10 border border-[#25D366]/30 rounded-xl px-4 py-3">
        <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
        <p className="text-sm font-body text-foreground/80">
          <span className="font-semibold">הלידים מגיעים דרך וואטסאפ.</span>{" "}
          פניות שנשלחו ישירות לאפליקציה לא נרשמות כאן אוטומטית. הטבלה הזו שומרת פניות שהגיעו דרך טפסים אם יופעלו בעתיד.
        </p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="font-display font-semibold text-foreground">לידים ({leads.length})</h3>
          {newCount > 0 && (
            <span className="bg-gold text-primary-foreground text-xs font-body font-semibold px-2 py-0.5 rounded-full">
              {newCount} new
            </span>
          )}
        </div>
        <button onClick={exportCSV} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground font-body">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {leads.length === 0 ? (
        <p className="text-muted-foreground text-sm font-body">No leads yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="py-2 pr-4 text-muted-foreground font-medium">Name</th>
                <th className="py-2 pr-4 text-muted-foreground font-medium">Email</th>
                <th className="py-2 pr-4 text-muted-foreground font-medium">Phone</th>
                <th className="py-2 pr-4 text-muted-foreground font-medium">Source</th>
                <th className="py-2 pr-4 text-muted-foreground font-medium">Status</th>
                <th className="py-2 pr-4 text-muted-foreground font-medium">Notes</th>
                <th className="py-2 text-muted-foreground font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => {
                const status = (l as any).status || "new";
                return (
                  <tr key={l.id} className="border-b border-border/50">
                    <td className="py-2 pr-4 text-foreground">{l.full_name}</td>
                    <td className="py-2 pr-4 text-foreground">{l.email || "–"}</td>
                    <td className="py-2 pr-4 text-foreground">{l.phone || "–"}</td>
                    <td className="py-2 pr-4 text-muted-foreground text-xs max-w-[120px] truncate">{l.source}</td>
                    <td className="py-2 pr-4">
                      <div className="relative inline-block">
                        <select
                          value={status}
                          onChange={(e) => updateStatus(l.id, e.target.value)}
                          className={`appearance-none text-xs font-semibold px-2 py-1 pr-6 rounded-full border-0 cursor-pointer ${STATUS_COLORS[status] || STATUS_COLORS.new}`}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                          ))}
                        </select>
                        <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                      </div>
                    </td>
                    <td className="py-2 pr-4 max-w-[200px]">
                      {editingNotes === l.id ? (
                        <div className="flex gap-1">
                          <input
                            value={notesValue}
                            onChange={(e) => setNotesValue(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && saveNotes(l.id)}
                            className="px-2 py-1 border border-border rounded text-xs bg-card text-foreground flex-1 min-w-0"
                            autoFocus
                          />
                          <button onClick={() => saveNotes(l.id)} className="text-xs text-primary font-semibold">Save</button>
                          <button onClick={() => setEditingNotes(null)} className="text-xs text-muted-foreground">✕</button>
                        </div>
                      ) : (
                        <button
                          onClick={() => { setEditingNotes(l.id); setNotesValue((l as any).notes || ""); }}
                          className="text-xs text-muted-foreground hover:text-foreground truncate block max-w-full text-left"
                        >
                          {(l as any).notes || "Add note…"}
                        </button>
                      )}
                    </td>
                    <td className="py-2 text-muted-foreground whitespace-nowrap">
                      {new Date(l.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LeadsList;
