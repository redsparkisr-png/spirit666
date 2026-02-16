import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { GripVertical, Pencil, Trash2, Plus, X, Copy, ArrowRightCircle, ExternalLink } from "lucide-react";
import ImageManager from "./ImageManager";
import type { Tables } from "@/integrations/supabase/types";

type Property = Tables<"properties_available">;

const CURRENCY_OPTIONS = ["ILS", "USD", "EUR", "GBP"] as const;
const PRICE_STATUS_OPTIONS = ["For Sale", "Price Upon Request", "Reduced"] as const;
const PROPERTY_STATUS_OPTIONS = ["Active", "Under Contract", "Reserved", "Off Market"] as const;

const empty: Partial<Property> = {
  title: "",
  short_description: "",
  lot_sqm: null,
  built_sqm: null,
  bedrooms: null,
  neighborhood_note: "",
  price_label: "",
  images: [],
  priority_order: 0,
  price_number: null,
  currency: "ILS",
  price_status: "For Sale",
  property_status: "Active",
  featured: false,
  slug: "",
  meta_title: "",
  meta_description: "",
  og_image: "",
};

const AvailableManager = () => {
  const [items, setItems] = useState<Property[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
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
    });
    setIsNew(true);
  };

  const startEdit = (p: Property) => {
    setEditing({ ...p });
    setIsNew(false);
  };

  const duplicate = (p: Property) => {
    setEditing({
      ...p,
      id: "",
      created_at: "",
      title: `${p.title} (Copy)`,
      priority_order: items.length,
    });
    setIsNew(true);
  };

  const markAsSold = async (p: Property) => {
    if (!confirm(`Mark "${p.title}" as sold? This will move it to the Sold tab.`)) return;
    const { error: insertErr } = await supabase.from("properties_sold").insert({
      title: p.title,
      short_description: p.short_description,
      images: p.images,
      sold_date: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      bedrooms: p.bedrooms,
      built_sqm: p.built_sqm,
      lot_sqm: p.lot_sqm,
      neighborhood_note: (p as any).neighborhood_note,
      price_label: p.price_label,
      price_number: (p as any).price_number,
      currency: (p as any).currency,
    });
    if (insertErr) { toast.error(insertErr.message); return; }
    await supabase.from("properties_available").delete().eq("id", p.id);
    toast.success(`"${p.title}" moved to Sold`);
    load();
  };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    const { id, created_at, ...rest } = editing;
    if (isNew) {
      const { error } = await supabase.from("properties_available").insert(rest);
      if (error) toast.error(error.message);
      else toast.success("Property added");
    } else {
      const { error } = await supabase.from("properties_available").update(rest).eq("id", id);
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

  const previewProperty = (p: Property) => {
    window.open(`/?preview=${p.id}`, "_blank");
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
          <input placeholder="Title" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="px-3 py-2 border border-border rounded-md bg-card text-foreground font-body text-sm" />
          <input placeholder="Neighborhood note" value={editing.neighborhood_note || ""} onChange={(e) => setEditing({ ...editing, neighborhood_note: e.target.value })} className="px-3 py-2 border border-border rounded-md bg-card text-foreground font-body text-sm" />
          <input placeholder="Short description" value={editing.short_description || ""} onChange={(e) => setEditing({ ...editing, short_description: e.target.value })} className="px-3 py-2 border border-border rounded-md bg-card text-foreground font-body text-sm sm:col-span-2" />
          <input type="number" placeholder="Lot sqm" value={editing.lot_sqm ?? ""} onChange={(e) => setEditing({ ...editing, lot_sqm: e.target.value ? Number(e.target.value) : null })} className="px-3 py-2 border border-border rounded-md bg-card text-foreground font-body text-sm" />
          <input type="number" placeholder="Built sqm" value={editing.built_sqm ?? ""} onChange={(e) => setEditing({ ...editing, built_sqm: e.target.value ? Number(e.target.value) : null })} className="px-3 py-2 border border-border rounded-md bg-card text-foreground font-body text-sm" />
          <input type="number" placeholder="Bedrooms" value={editing.bedrooms ?? ""} onChange={(e) => setEditing({ ...editing, bedrooms: e.target.value ? Number(e.target.value) : null })} className="px-3 py-2 border border-border rounded-md bg-card text-foreground font-body text-sm" />
          <input placeholder="Price label (display)" value={editing.price_label || ""} onChange={(e) => setEditing({ ...editing, price_label: e.target.value })} className="px-3 py-2 border border-border rounded-md bg-card text-foreground font-body text-sm" />
          <input type="number" placeholder="Price (number)" value={editing.price_number ?? ""} onChange={(e) => setEditing({ ...editing, price_number: e.target.value ? Number(e.target.value) : null })} className="px-3 py-2 border border-border rounded-md bg-card text-foreground font-body text-sm" />
          <select value={editing.currency || "ILS"} onChange={(e) => setEditing({ ...editing, currency: e.target.value })} className="px-3 py-2 border border-border rounded-md bg-card text-foreground font-body text-sm">
            {CURRENCY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={editing.price_status || "For Sale"} onChange={(e) => setEditing({ ...editing, price_status: e.target.value })} className="px-3 py-2 border border-border rounded-md bg-card text-foreground font-body text-sm">
            {PRICE_STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={editing.property_status || "Active"} onChange={(e) => setEditing({ ...editing, property_status: e.target.value })} className="px-3 py-2 border border-border rounded-md bg-card text-foreground font-body text-sm">
            {PROPERTY_STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <input placeholder="Slug (SEO)" value={editing.slug || ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className="px-3 py-2 border border-border rounded-md bg-card text-foreground font-body text-sm" />
          <label className="flex items-center gap-2 text-sm font-body text-foreground">
            <input type="checkbox" checked={editing.featured || false} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} className="rounded" />
            Featured property
          </label>
        </div>

        {/* SEO fields (collapsible) */}
        <details className="text-sm">
          <summary className="cursor-pointer font-body font-medium text-muted-foreground mb-2">SEO Fields (optional)</summary>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input placeholder="Meta title" value={editing.meta_title || ""} onChange={(e) => setEditing({ ...editing, meta_title: e.target.value })} className="px-3 py-2 border border-border rounded-md bg-card text-foreground font-body text-sm" />
            <input placeholder="Meta description" value={editing.meta_description || ""} onChange={(e) => setEditing({ ...editing, meta_description: e.target.value })} className="px-3 py-2 border border-border rounded-md bg-card text-foreground font-body text-sm" />
            <input placeholder="OG Image URL" value={editing.og_image || ""} onChange={(e) => setEditing({ ...editing, og_image: e.target.value })} className="px-3 py-2 border border-border rounded-md bg-card text-foreground font-body text-sm sm:col-span-2" />
          </div>
        </details>

        <div>
          <p className="text-sm font-body font-medium text-foreground mb-2">Images</p>
          <ImageManager images={editing.images || []} onChange={(imgs) => setEditing({ ...editing, images: imgs })} folder="properties" />
        </div>
        <button onClick={save} disabled={saving || !editing.title?.trim()} className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-body text-sm hover:bg-primary/90 disabled:opacity-50">
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
                        {p.images && p.images[0] ? (
                          <img src={p.images[0]} alt="" className="w-12 h-9 object-cover object-center rounded" />
                        ) : (
                          <div className="w-12 h-9 bg-muted rounded flex items-center justify-center text-[10px] text-muted-foreground">No img</div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-body font-medium text-foreground truncate">{p.title}</p>
                            {(p as any).featured && (
                              <span className="text-[10px] bg-gold/20 text-gold-hover px-1.5 py-0.5 rounded font-body font-semibold shrink-0">★</span>
                            )}
                            {(p as any).property_status && (p as any).property_status !== "Active" && (
                              <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded font-body shrink-0">{(p as any).property_status}</span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {p.price_label || p.short_description || "—"}
                          </p>
                        </div>
                        <button onClick={() => previewProperty(p)} className="p-1.5 hover:bg-muted rounded" title="Preview">
                          <ExternalLink className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button onClick={() => duplicate(p)} className="p-1.5 hover:bg-muted rounded" title="Duplicate">
                          <Copy className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button onClick={() => markAsSold(p)} className="p-1.5 hover:bg-muted rounded" title="Mark as Sold">
                          <ArrowRightCircle className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button onClick={() => startEdit(p)} className="p-1.5 hover:bg-muted rounded" title="Edit">
                          <Pencil className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button onClick={() => remove(p.id)} className="p-1.5 hover:bg-destructive/10 rounded" title="Delete">
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
