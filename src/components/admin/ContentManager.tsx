import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Search, Save, Loader2 } from "lucide-react";

interface ContentRow {
  id: string;
  key: string;
  value_en: string;
  value_he: string;
  page: string;
  section: string;
  updated_at: string;
}

const ContentManager = () => {
  const [rows, setRows] = useState<ContentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterPage, setFilterPage] = useState<string>("all");
  const [editedRows, setEditedRows] = useState<Record<string, Partial<ContentRow>>>({});
  const [savingIds, setSavingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("site_content")
      .select("*")
      .order("page")
      .order("section")
      .order("key");
    if (error) {
      toast.error("Failed to load content");
    } else {
      setRows((data ?? []) as ContentRow[]);
    }
    setLoading(false);
  };

  const pages = [...new Set(rows.map((r) => r.page))].sort();

  const filtered = rows.filter((r) => {
    if (filterPage !== "all" && r.page !== filterPage) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        r.key.toLowerCase().includes(q) ||
        r.value_en.toLowerCase().includes(q) ||
        r.value_he.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Group by page > section
  const grouped: Record<string, Record<string, ContentRow[]>> = {};
  filtered.forEach((r) => {
    if (!grouped[r.page]) grouped[r.page] = {};
    if (!grouped[r.page][r.section]) grouped[r.page][r.section] = [];
    grouped[r.page][r.section].push(r);
  });

  const handleEdit = (id: string, field: "value_en" | "value_he", value: string) => {
    setEditedRows((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleSave = async (row: ContentRow) => {
    const edits = editedRows[row.id];
    if (!edits) return;
    setSavingIds((prev) => new Set(prev).add(row.id));
    const { error } = await supabase
      .from("site_content")
      .update({
        value_en: edits.value_en ?? row.value_en,
        value_he: edits.value_he ?? row.value_he,
      })
      .eq("id", row.id);
    if (error) {
      toast.error(`Failed to save "${row.key}"`);
    } else {
      toast.success(`Saved "${row.key}"`);
      setRows((prev) =>
        prev.map((r) =>
          r.id === row.id
            ? { ...r, value_en: edits.value_en ?? r.value_en, value_he: edits.value_he ?? r.value_he }
            : r
        )
      );
      setEditedRows((prev) => {
        const next = { ...prev };
        delete next[row.id];
        return next;
      });
    }
    setSavingIds((prev) => {
      const next = new Set(prev);
      next.delete(row.id);
      return next;
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search keys or content..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-border rounded-lg text-sm font-body bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <select
          value={filterPage}
          onChange={(e) => setFilterPage(e.target.value)}
          className="px-3 py-2 border border-border rounded-lg text-sm font-body bg-background text-foreground"
        >
          <option value="all">All pages</option>
          {pages.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <p className="text-xs text-muted-foreground font-body">
        {filtered.length} content entries · Edit text below and save per row
      </p>

      {/* Content grouped */}
      {Object.entries(grouped).map(([page, sections]) => (
        <div key={page} className="space-y-4">
          <h3 className="font-display font-semibold text-foreground text-base capitalize border-b border-border pb-2">
            {page}
          </h3>
          {Object.entries(sections).map(([section, items]) => (
            <div key={section} className="space-y-3">
              <h4 className="text-sm font-body font-medium text-muted-foreground uppercase tracking-wide">
                {section}
              </h4>
              {items.map((row) => {
                const edits = editedRows[row.id];
                const isDirty = !!edits;
                const isSaving = savingIds.has(row.id);
                return (
                  <div key={row.id} className="bg-card border border-border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <code className="text-xs text-primary font-mono">{row.key}</code>
                      {isDirty && (
                        <button
                          onClick={() => handleSave(row)}
                          disabled={isSaving}
                          className="inline-flex items-center gap-1.5 text-xs font-body font-medium text-primary-foreground bg-primary hover:bg-primary/90 px-3 py-1.5 rounded-md disabled:opacity-50"
                        >
                          {isSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                          Save
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-body text-muted-foreground mb-1 block">English</label>
                        <textarea
                          value={edits?.value_en ?? row.value_en}
                          onChange={(e) => handleEdit(row.id, "value_en", e.target.value)}
                          rows={2}
                          className="w-full px-3 py-2 border border-border rounded-md text-sm font-body bg-background text-foreground resize-y focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                      <div dir="rtl">
                        <label className="text-xs font-body text-muted-foreground mb-1 block">עברית</label>
                        <textarea
                          value={edits?.value_he ?? row.value_he}
                          onChange={(e) => handleEdit(row.id, "value_he", e.target.value)}
                          rows={2}
                          className="w-full px-3 py-2 border border-border rounded-md text-sm font-body bg-background text-foreground resize-y focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ContentManager;
