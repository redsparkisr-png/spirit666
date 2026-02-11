import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import ImageManager from "./ImageManager";
import type { Tables } from "@/integrations/supabase/types";

type SoldProp = Tables<"properties_sold">;

const SoldManager = () => {
  const [items, setItems] = useState<SoldProp[]>([]);
  const [editing, setEditing] = useState<SoldProp | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("properties_sold").select("*").order("created_at", { ascending: false });
    if (data) setItems(data);
  };

  useEffect(() => { load(); }, []);

  const startNew = () => {
    setEditing({ id: "", title: "", short_description: "", images: [], sold_date: "", created_at: "" } as SoldProp);
    setIsNew(true);
  };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    if (isNew) {
      const { id, created_at, ...rest } = editing;
      const { error } = await supabase.from("properties_sold").insert(rest);
      if (error) toast.error(error.message);
      else toast.success("Added");
    } else {
      const { created_at, ...rest } = editing;
      const { error } = await supabase.from("properties_sold").update(rest).eq("id", editing.id);
      if (error) toast.error(error.message);
      else toast.success("Updated");
    }
    setSaving(false);
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete?")) return;
    await supabase.from("properties_sold").delete().eq("id", id);
    toast.success("Deleted");
    load();
  };

  if (editing) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-semibold text-foreground">{isNew ? "Add Sold Property" : "Edit"}</h3>
          <button onClick={() => setEditing(null)} className="p-1 hover:bg-muted rounded"><X className="w-5 h-5" /></button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input placeholder="Title" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="px-3 py-2 border border-border rounded-md bg-card text-foreground font-body text-sm" />
          <input placeholder="Sold date (e.g. Jan 2025)" value={editing.sold_date || ""} onChange={(e) => setEditing({ ...editing, sold_date: e.target.value })} className="px-3 py-2 border border-border rounded-md bg-card text-foreground font-body text-sm" />
          <input placeholder="Short description" value={editing.short_description || ""} onChange={(e) => setEditing({ ...editing, short_description: e.target.value })} className="px-3 py-2 border border-border rounded-md bg-card text-foreground font-body text-sm sm:col-span-2" />
        </div>
        <ImageManager images={editing.images || []} onChange={(imgs) => setEditing({ ...editing, images: imgs })} folder="sold" />
        <button onClick={save} disabled={saving || !editing.title.trim()} className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-body text-sm hover:bg-primary/90 disabled:opacity-50">
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-foreground">Sold Properties ({items.length})</h3>
        <button onClick={startNew} className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-md font-body text-sm hover:bg-primary/90">
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>
      {items.length === 0 ? (
        <p className="text-muted-foreground text-sm font-body">No sold properties yet.</p>
      ) : (
        <div className="space-y-2">
          {items.map((p) => (
            <div key={p.id} className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg">
              {p.images && p.images[0] && <img src={p.images[0]} alt="" className="w-12 h-9 object-cover rounded" />}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-body font-medium text-foreground truncate">{p.title}</p>
                <p className="text-xs text-muted-foreground">{p.sold_date}</p>
              </div>
              <button onClick={() => { setEditing({ ...p }); setIsNew(false); }} className="p-1.5 hover:bg-muted rounded"><Pencil className="w-4 h-4 text-muted-foreground" /></button>
              <button onClick={() => remove(p.id)} className="p-1.5 hover:bg-destructive/10 rounded"><Trash2 className="w-4 h-4 text-destructive" /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SoldManager;
