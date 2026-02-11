import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { GripVertical, Pencil, Trash2, Plus, X } from "lucide-react";
import ImageManager from "./ImageManager";
import type { Tables } from "@/integrations/supabase/types";

type Property = Tables<"properties_available">;

const empty: Omit<Property, "id" | "created_at"> = {
  title: "",
  short_description: "",
  lot_sqm: null,
  built_sqm: null,
  bedrooms: null,
  neighborhood_note: "",
  price_label: "",
  images: [],
  priority_order: 0,
};

const AvailableManager = () => {
  const [items, setItems] = useState<Property[]>([]);
  const [editing, setEditing] = useState<Property | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const { data } = await supabase
      .from("properties_available")
      .select("*")
      .order("priority_order", { ascending: true });
    if (data) setItems(data);
  };

  useEffect(() => { load(); }, []);

  const startNew = () => {
    setEditing({
      ...empty,
      id: "",
      created_at: "",
      priority_order: items.length,
    } as Property);
    setIsNew(true);
  };

  const startEdit = (p: Property) => {
    setEditing({ ...p });
    setIsNew(false);
  };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    if (isNew) {
      const { id, created_at, ...rest } = editing;
      const { error } = await supabase.from("properties_available").insert(rest);
      if (error) toast.error(error.message);
      else toast.success("Property added");
    } else {
      const { created_at, ...rest } = editing;
      const { error } = await supabase.from("properties_available").update(rest).eq("id", editing.id);
      if (error) toast.error(error.message);
      else toast.success("Property updated");
    }
    setSaving(false);
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this property?")) return;
    await supabase.from("properties_available").delete().eq("id", id);
    toast.success("Deleted");
    load();
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const reordered = [...items];
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setItems(reordered);
    for (let i = 0; i < reordered.length; i++) {
      await supabase
        .from("properties_available")
        .update({ priority_order: i })
        .eq("id", reordered[i].id);
    }
  };

  if (editing) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-semibold text-foreground">
            {isNew ? "Add Property" : "Edit Property"}
          </h3>
          <button onClick={() => setEditing(null)} className="p-1 hover:bg-muted rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            placeholder="Title"
            value={editing.title}
            onChange={(e) => setEditing({ ...editing, title: e.target.value })}
            className="px-3 py-2 border border-border rounded-md bg-card text-foreground font-body text-sm"
          />
          <input
            placeholder="Neighborhood note"
            value={editing.neighborhood_note || ""}
            onChange={(e) => setEditing({ ...editing, neighborhood_note: e.target.value })}
            className="px-3 py-2 border border-border rounded-md bg-card text-foreground font-body text-sm"
          />
          <input
            placeholder="Short description"
            value={editing.short_description || ""}
            onChange={(e) => setEditing({ ...editing, short_description: e.target.value })}
            className="px-3 py-2 border border-border rounded-md bg-card text-foreground font-body text-sm sm:col-span-2"
          />
          <input
            type="number"
            placeholder="Lot sqm"
            value={editing.lot_sqm ?? ""}
            onChange={(e) => setEditing({ ...editing, lot_sqm: e.target.value ? Number(e.target.value) : null })}
            className="px-3 py-2 border border-border rounded-md bg-card text-foreground font-body text-sm"
          />
          <input
            type="number"
            placeholder="Built sqm"
            value={editing.built_sqm ?? ""}
            onChange={(e) => setEditing({ ...editing, built_sqm: e.target.value ? Number(e.target.value) : null })}
            className="px-3 py-2 border border-border rounded-md bg-card text-foreground font-body text-sm"
          />
          <input
            type="number"
            placeholder="Bedrooms"
            value={editing.bedrooms ?? ""}
            onChange={(e) => setEditing({ ...editing, bedrooms: e.target.value ? Number(e.target.value) : null })}
            className="px-3 py-2 border border-border rounded-md bg-card text-foreground font-body text-sm"
          />
          <input
            placeholder="Price label (optional)"
            value={editing.price_label || ""}
            onChange={(e) => setEditing({ ...editing, price_label: e.target.value })}
            className="px-3 py-2 border border-border rounded-md bg-card text-foreground font-body text-sm"
          />
        </div>
        <div>
          <p className="text-sm font-body font-medium text-foreground mb-2">Images</p>
          <ImageManager
            images={editing.images || []}
            onChange={(imgs) => setEditing({ ...editing, images: imgs })}
            folder="properties"
          />
        </div>
        <button
          onClick={save}
          disabled={saving || !editing.title.trim()}
          className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-body text-sm hover:bg-primary/90 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-foreground">Available Properties ({items.length})</h3>
        <button onClick={startNew} className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-md font-body text-sm hover:bg-primary/90">
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>
      {items.length === 0 ? (
        <p className="text-muted-foreground text-sm font-body">No properties yet. Add one above.</p>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="available">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-2">
                {items.map((p, idx) => (
                  <Draggable key={p.id} draggableId={p.id} index={idx}>
                    {(prov) => (
                      <div
                        ref={prov.innerRef}
                        {...prov.draggableProps}
                        className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg"
                      >
                        <div {...prov.dragHandleProps} className="cursor-grab">
                          <GripVertical className="w-4 h-4 text-muted-foreground" />
                        </div>
                        {p.images && p.images[0] && (
                          <img src={p.images[0]} alt="" className="w-12 h-9 object-cover rounded" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-body font-medium text-foreground truncate">{p.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{p.short_description}</p>
                        </div>
                        <button onClick={() => startEdit(p)} className="p-1.5 hover:bg-muted rounded">
                          <Pencil className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button onClick={() => remove(p.id)} className="p-1.5 hover:bg-destructive/10 rounded">
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};

export default AvailableManager;
