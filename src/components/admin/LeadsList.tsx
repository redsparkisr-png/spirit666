import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

type Lead = Tables<"leads">;

const LeadsList = () => {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => { if (data) setLeads(data); });
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="font-display font-semibold text-foreground">Leads ({leads.length})</h3>
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
                <th className="py-2 pr-4 text-muted-foreground font-medium">Message</th>
                <th className="py-2 text-muted-foreground font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id} className="border-b border-border/50">
                  <td className="py-2 pr-4 text-foreground">{l.full_name}</td>
                  <td className="py-2 pr-4 text-foreground">{l.email || "–"}</td>
                  <td className="py-2 pr-4 text-foreground">{l.phone || "–"}</td>
                  <td className="py-2 pr-4 text-foreground max-w-[200px] truncate">{l.message || "–"}</td>
                  <td className="py-2 text-muted-foreground whitespace-nowrap">
                    {new Date(l.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LeadsList;
