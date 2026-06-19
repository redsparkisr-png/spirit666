"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Home, AlertCircle, FileText, CheckCircle2 } from "lucide-react";

interface Kpis {
  incomplete: number;
  active: number;
  sold: number;
  posts: number;
}

const AdminDashboard = ({ onNavigate }: { onNavigate?: (tab: string) => void }) => {
  const [kpis, setKpis] = useState<Kpis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [incompleteRes, activeRes, soldRes, postsRes] = await Promise.all([
        supabase.from("properties_available").select("id", { count: "exact", head: true }).or("location.is.null,property_type.is.null"),
        supabase.from("properties_available").select("id", { count: "exact", head: true }),
        supabase.from("properties_sold").select("id", { count: "exact", head: true }),
        supabase.from("blog_posts").select("id", { count: "exact", head: true }).eq("status", "published"),
      ]);
      if (cancelled) return;
      setKpis({
        incomplete: incompleteRes.count ?? 0,
        active: activeRes.count ?? 0,
        sold: soldRes.count ?? 0,
        posts: postsRes.count ?? 0,
      });
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  const cards = [
    { label: "נכסים ללא מיקום / סוג", value: kpis?.incomplete, icon: AlertCircle, tab: "Available", accent: kpis?.incomplete ? "text-destructive" : "text-emerald-500" },
    { label: "נכסים פעילים", value: kpis?.active, icon: Home, tab: "Available", accent: "text-primary" },
    { label: "נכסים שנמכרו", value: kpis?.sold, icon: CheckCircle2, tab: "Sold", accent: "text-primary" },
    { label: "פוסטים מפורסמים", value: kpis?.posts, icon: FileText, tab: "Blog", accent: "text-gold" },
  ];

  return (
    <div dir="rtl" className="space-y-8">
      <div>
        <h2 className="font-display text-2xl text-foreground mb-1">דשבורד</h2>
        <p className="text-sm text-muted-foreground font-body">סקירה מהירה של פעילות האתר</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <button
            key={c.label}
            onClick={() => onNavigate?.(c.tab)}
            className="text-right bg-card border border-border rounded-xl p-5 hover:border-gold/50 hover:shadow-[0_8px_24px_-12px_hsl(var(--primary)/0.2)] transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <c.icon className={`w-5 h-5 ${c.accent} opacity-70 group-hover:opacity-100`} />
            </div>
            <div className="text-3xl font-display text-foreground mb-1">
              {loading ? <span className="inline-block w-10 h-7 bg-muted rounded animate-pulse" /> : c.value}
            </div>
            <div className="text-sm text-muted-foreground font-body">{c.label}</div>
          </button>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-display text-lg text-foreground mb-3">פעולות מהירות</h3>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => onNavigate?.("Available")} className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-body hover:bg-primary/90 transition-colors">
            נכס חדש
          </button>
          <button onClick={() => onNavigate?.("Blog")} className="px-4 py-2 rounded-full border border-border text-foreground text-sm font-body hover:bg-muted transition-colors">
            פוסט חדש
          </button>
          <button onClick={() => onNavigate?.("Testimonials")} className="px-4 py-2 rounded-full border border-border text-foreground text-sm font-body hover:bg-muted transition-colors">
            המלצה חדשה
          </button>
          <button onClick={() => onNavigate?.("Hero")} className="px-4 py-2 rounded-full border border-border text-foreground text-sm font-body hover:bg-muted transition-colors">
            עריכת Hero
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;