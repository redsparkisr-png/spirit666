import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Trash2, GripVertical, Plus } from "lucide-react";

interface PropertyType {
  id: string;
  name_en: string;
  name_he: string;
  display_order: number;
}

const PropertyTypesManager = () => {
  const [items, setItems] = useState<PropertyType[]>([]);
  const [newEn, setNewEn] = useState("");
  const [newHe, setNewHe] = useState("");

  const load = async () => {
    const { data } = await supabase.from("search_property_types").select("*").order("display_order");
    if (data) setItems(data);
  };

  useEffect(() => { load(); }, []);

  const addItem = async () => {
    if (!newEn.trim() || !newHe.trim()) { toast.error("Both names required"); return; }
    const maxOrder = items.length > 0 ? Math.max(...items.map(i => i.display_order)) : 0;
    const { error } = await supabase.from("search_property_types").insert({
      name_en: newEn.trim(),
      name_he: newHe.trim(),
      display_order: maxOrder + 1,
    });
    if (error) toast.error(error.message);
    else { toast.success("Added"); setNewEn(""); setNewHe(""); load(); }
  };

  const deleteItem = async (id: string) => {
    await supabase.from("search_property_types").delete().eq("id", id);
    toast.success("Deleted");
    load();
  };

  return (
    <div className="space-y-6">
      <h2 className="font-display font-semibold text-foreground text-lg">Property Types</h2>
      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <label className="text-xs text-muted-foreground font-body mb-1 block">English</label>
          <input value={newEn} onChange={e => setNewEn(e.target.value)} className="w-full px-3 py-2 border border-border rounded-lg text-sm font-body bg-card" placeholder="e.g. Villa" />
        </div>
        <div className="flex-1">
          <label className="text-xs text-muted-foreground font-body mb-1 block">Hebrew</label>
          <input value={newHe} onChange={e => setNewHe(e.target.value)} className="w-full px-3 py-2 border border-border rounded-lg text-sm font-body bg-card" placeholder="e.g. וילה" />
        </div>
        <button onClick={addItem} className="bg-charcoal hover:bg-charcoal-hover text-white px-4 py-2 rounded-lg text-sm font-body flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>
      <div className="space-y-2">
        {items.map(item => (
          <div key={item.id} className="flex items-center gap-3 bg-card border border-border rounded-lg px-4 py-3">
            <GripVertical className="w-4 h-4 text-muted-foreground" />
            <span className="flex-1 font-body text-sm text-foreground">{item.name_en}</span>
            <span className="flex-1 font-body text-sm text-muted-foreground">{item.name_he}</span>
            <button onClick={() => deleteItem(item.id)} className="text-destructive hover:text-destructive/80">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyTypesManager;
