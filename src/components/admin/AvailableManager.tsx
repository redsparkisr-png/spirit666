"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { GripVertical, Pencil, Trash2, Plus, X, Copy, ArrowRightCircle, ExternalLink, Zap, Filter } from "lucide-react";
import ImageManager from "./ImageManager";

interface Property {
  id: string;
  title: string;
  short_description: string | null;
  lot_sqm: number | null;
  built_sqm: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  parking: string | null;
  storage: boolean;
  mamad: boolean;
  full_description: string | null;
  google_maps_url: string | null;
  tags: string[] | null;
  neighborhood_note: string | null;
  price_label: string | null;
  images: string[] | null;
  priority_order: number;
  price_number: number | null;
  currency: string;
  price_status: string;
  property_status: string;
  featured: boolean;
  slug: string | null;
  meta_title: string | null;
  meta_description: string | null;
  og_image: string | null;
  location: string | null;
  property_type: string | null;
  created_at: string;
}

const CURRENCY_OPTIONS = ["ILS", "USD", "EUR", "GBP"] as const;
const PRICE_STATUS_OPTIONS = ["For Sale", "Price Upon Request", "Reduced"] as const;
const PROPERTY_STATUS_OPTIONS = ["Draft", "Coming Soon", "Active", "Under Contract", "Off Market"] as const;
const STATUS_COLORS: Record<string, string> = {
  Draft: "bg-muted text-muted-foreground",
  "Coming Soon": "bg-blue-100 text-blue-700",
  Active: "bg-emerald-100 text-emerald-700",
  "Under Contract": "bg-amber-100 text-amber-700",
  "Off Market": "bg-red-100 text-red-700",
};

const empty: Partial<Property> = {
  title: "",
  short_description: "",
  lot_sqm: null,
  built_sqm: null,
  bedrooms: null,
  bathrooms: null,
  parking: "",
  storage: false,
  mamad: false,
  full_description: "",
  google_maps_url: "",
  tags: [],
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
  location: "",
  property_type: "",
};

const AvailableManager = () => {
  const [items, setItems] = useState<Property[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [quickMode, setQuickMode] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [locationOptions, setLocationOptions] = useState<{ value: string; label: string }[]>([]);
  const [typeOptions, setTypeOptions] = useState<{ value: string; label: string }[]>([]);

  const load = async () => {
    const [propRes, locRes, typeRes] = await Promise.all([
      supabase.from("properties_available").select("*").order("priority_order", { ascending: true }),
      supabase.from("search_locations").select("name_en").order("display_order"),
      supabase.from("search_property_types").select("name_en").order("display_order"),
    ]);
    if (propRes.data) setItems(propRes.data as any);
    if (locRes.data) setLocationOptions(locRes.data.map((r) => ({ value: r.name_en, label: r.name_en })));
    if (typeRes.data) setTypeOptions(typeRes.data.map((r) => ({ value: r.name_en, label: r.name_en })));
  };

  useEffect(() => { load(); }, []);

  const startNew = (quick = false) => {
    setEditing({
      ...empty,
      id: "",
      created_at: "",
      priority_order: items.length,
    });
    setIsNew(true);
    setQuickMode(quick);
  };

  const startEdit = (p: Property) => {
    setEditing({ ...p });
    setIsNew(false);
    setQuickMode(false);
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
    setQuickMode(false);
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
      neighborhood_note: p.neighborhood_note,
      price_label: p.price_label,
      price_number: p.price_number,
      currency: p.currency,
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
      const { error } = await supabase.from("properties_available").insert(rest as any);
      if (error) toast.error(error.message);
      else toast.success("Property added");
    } else {
      const { error } = await supabase.from("properties_available").update(rest as any).eq("id", id);
      if (error) toast.error(error.message);
      else toast.success("Property updated");
    }
    setSaving(false);
    setEditing(null);
    setQuickMode(false);
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
        .update({ priority_order: i } as any)
        .eq("id", reordered[i].id);
    }
  };

  const addTag = () => {
    if (!tagInput.trim() || !editing) return;
    const currentTags = editing.tags || [];
    if (!currentTags.includes(tagInput.trim())) {
      setEditing({ ...editing, tags: [...currentTags, tagInput.trim()] });
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    if (!editing) return;
    setEditing({ ...editing, tags: (editing.tags || []).filter((t: string) => t !== tag) });
  };

  const filteredItems = filterStatus === "all"
    ? items
    : items.filter((p) => p.property_status === filterStatus);

  // Group by status for pipeline view
  const statusGroups = PROPERTY_STATUS_OPTIONS.map((status) => ({
    status,
    items: items.filter((p) => p.property_status === status),
  })).filter((g) => g.items.length > 0);

  if (editing) {
    const inputCls = "px-3 py-2 border border-border rounded-md bg-card text-foreground font-body text-sm";

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-semibold text-foreground">
            {isNew ? (quickMode ? "⚡ Quick Add Property" : "Add Property") : "Edit Property"}
          </h3>
          <button onClick={() => { setEditing(null); setQuickMode(false); }} className="p-1 hover:bg-muted rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Core fields (always shown) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input placeholder="Title *" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className={inputCls} />
          <input placeholder="Neighborhood note (display text)" value={editing.neighborhood_note || ""} onChange={(e) => setEditing({ ...editing, neighborhood_note: e.target.value })} className={inputCls} />
          <div className="flex flex-col gap-0.5">
            <select value={editing.location || ""} onChange={(e) => setEditing({ ...editing, location: e.target.value || null })} className={inputCls}>
              <option value="">Location (for search filter)</option>
              {locationOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <span className="text-[10px] text-muted-foreground font-body">Required for location filter to work</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <select value={editing.property_type || ""} onChange={(e) => setEditing({ ...editing, property_type: e.target.value || null })} className={inputCls}>
              <option value="">Property Type (for search filter)</option>
              {typeOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <span className="text-[10px] text-muted-foreground font-body">Required for property type filter to work</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <input type="number" placeholder="Price (number) *" value={editing.price_number ?? ""} onChange={(e) => setEditing({ ...editing, price_number: e.target.value ? Number(e.target.value) : null })} className={inputCls} />
            <span className="text-[10px] text-muted-foreground font-body">Required — source of truth for search & card display (store as number only, e.g. 4750000)</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <input placeholder="Price label (optional override)" value={editing.price_label || ""} onChange={(e) => setEditing({ ...editing, price_label: e.target.value })} className={inputCls} />
            <span className="text-[10px] text-muted-foreground font-body">Leave blank to auto-format from Price number. Use for custom text like "Price Upon Request".</span>
          </div>
          <input type="number" placeholder="Bedrooms" value={editing.bedrooms ?? ""} onChange={(e) => setEditing({ ...editing, bedrooms: e.target.value ? Number(e.target.value) : null })} className={inputCls} />
          <select value={editing.property_status || "Active"} onChange={(e) => setEditing({ ...editing, property_status: e.target.value })} className={inputCls}>
            {PROPERTY_STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <label className="flex items-center gap-2 text-sm font-body text-foreground">
            <input type="checkbox" checked={editing.featured || false} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} className="rounded" />
            Featured property
          </label>
        </div>

        {/* Quick mode: show images + save */}
        {quickMode && (
          <>
            <div>
              <p className="text-sm font-body font-medium text-foreground mb-2">Featured Image</p>
              <ImageManager images={editing.images || []} onChange={(imgs) => setEditing({ ...editing, images: imgs })} folder="properties" />
            </div>
            <button onClick={save} disabled={saving || !editing.title?.trim()} className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-body text-sm hover:bg-primary/90 disabled:opacity-50">
              {saving ? "Saving..." : "Quick Save"}
            </button>
            <p className="text-xs text-muted-foreground font-body">You can add more details by editing the property later.</p>
          </>
        )}

        {/* Full mode: show all fields */}
        {!quickMode && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input placeholder="Short description" value={editing.short_description || ""} onChange={(e) => setEditing({ ...editing, short_description: e.target.value })} className={`${inputCls} sm:col-span-2`} />
              <input type="number" placeholder="Bathrooms" value={editing.bathrooms ?? ""} onChange={(e) => setEditing({ ...editing, bathrooms: e.target.value ? Number(e.target.value) : null })} className={inputCls} />
              <input type="number" placeholder="Lot sqm" value={editing.lot_sqm ?? ""} onChange={(e) => setEditing({ ...editing, lot_sqm: e.target.value ? Number(e.target.value) : null })} className={inputCls} />
              <input type="number" placeholder="Built sqm" value={editing.built_sqm ?? ""} onChange={(e) => setEditing({ ...editing, built_sqm: e.target.value ? Number(e.target.value) : null })} className={inputCls} />
              <input placeholder="Parking (e.g. 2 covered)" value={editing.parking || ""} onChange={(e) => setEditing({ ...editing, parking: e.target.value })} className={inputCls} />
              <select value={editing.currency || "ILS"} onChange={(e) => setEditing({ ...editing, currency: e.target.value })} className={inputCls}>
                {CURRENCY_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <select value={editing.price_status || "For Sale"} onChange={(e) => setEditing({ ...editing, price_status: e.target.value })} className={inputCls}>
                {PRICE_STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <label className="flex items-center gap-2 text-sm font-body text-foreground">
                <input type="checkbox" checked={editing.storage || false} onChange={(e) => setEditing({ ...editing, storage: e.target.checked })} className="rounded" />
                Storage room
              </label>
              <label className="flex items-center gap-2 text-sm font-body text-foreground">
                <input type="checkbox" checked={editing.mamad || false} onChange={(e) => setEditing({ ...editing, mamad: e.target.checked })} className="rounded" />
                Safe room (Mamad)
              </label>
            </div>

            {/* Full description */}
            <div>
              <label className="text-xs font-body text-muted-foreground mb-1 block">Full Description</label>
              <textarea
                placeholder="Detailed property description..."
                value={editing.full_description || ""}
                onChange={(e) => setEditing({ ...editing, full_description: e.target.value })}
                rows={4}
                className={`${inputCls} w-full resize-y`}
              />
            </div>

            {/* Google Maps */}
            <input placeholder="Google Maps URL" value={editing.google_maps_url || ""} onChange={(e) => setEditing({ ...editing, google_maps_url: e.target.value })} className={`${inputCls} w-full`} />

            {/* Tags */}
            <div>
              <label className="text-xs font-body text-muted-foreground mb-1 block">Tags</label>
              <div className="flex gap-2 flex-wrap mb-2">
                {(editing.tags || []).map((tag: string) => (
                  <span key={tag} className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-body">
                    {tag}
                    <button onClick={() => removeTag(tag)} className="hover:text-destructive">×</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  placeholder="Add tag..."
                  className={`${inputCls} flex-1`}
                />
                <button onClick={addTag} className="text-sm text-primary font-body font-medium px-3">Add</button>
              </div>
            </div>

            <input placeholder="Slug (SEO)" value={editing.slug || ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className={`${inputCls} w-full`} />

            {/* SEO fields */}
            <details className="text-sm">
              <summary className="cursor-pointer font-body font-medium text-muted-foreground mb-2">SEO Fields (optional)</summary>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input placeholder="Meta title" value={editing.meta_title || ""} onChange={(e) => setEditing({ ...editing, meta_title: e.target.value })} className={inputCls} />
                <input placeholder="Meta description" value={editing.meta_description || ""} onChange={(e) => setEditing({ ...editing, meta_description: e.target.value })} className={inputCls} />
                <input placeholder="OG Image URL" value={editing.og_image || ""} onChange={(e) => setEditing({ ...editing, og_image: e.target.value })} className={`${inputCls} sm:col-span-2`} />
              </div>
            </details>

            <div>
              <p className="text-sm font-body font-medium text-foreground mb-2">Images</p>
              <ImageManager images={editing.images || []} onChange={(imgs) => setEditing({ ...editing, images: imgs })} folder="properties" />
            </div>
            <button onClick={save} disabled={saving || !editing.title?.trim()} className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-body text-sm hover:bg-primary/90 disabled:opacity-50">
              {saving ? "Saving..." : "Save"}
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="font-display font-semibold text-foreground">Available Properties ({items.length})</h3>
        <div className="flex gap-2">
          <button onClick={() => startNew(true)} className="inline-flex items-center gap-1.5 bg-gold text-white px-4 py-2 rounded-md font-body text-sm hover:bg-gold-hover">
            <Zap className="w-4 h-4" /> Quick Add
          </button>
          <button onClick={() => startNew(false)} className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-md font-body text-sm hover:bg-primary/90">
            <Plus className="w-4 h-4" /> Full Add
          </button>
        </div>
      </div>

      {/* Status filter */}
      <div className="flex gap-1.5 flex-wrap items-center">
        <Filter className="w-3.5 h-3.5 text-muted-foreground" />
        <button
          onClick={() => setFilterStatus("all")}
          className={`text-xs px-2.5 py-1 rounded-full font-body transition-colors ${filterStatus === "all" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
        >
          All ({items.length})
        </button>
        {PROPERTY_STATUS_OPTIONS.map((status) => {
          const count = items.filter((p) => p.property_status === status).length;
          if (count === 0) return null;
          return (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`text-xs px-2.5 py-1 rounded-full font-body transition-colors ${filterStatus === status ? "bg-primary text-primary-foreground" : `${STATUS_COLORS[status] || "bg-muted text-muted-foreground"} hover:opacity-80`}`}
            >
              {status} ({count})
            </button>
          );
        })}
      </div>

      {/* Pipeline summary */}
      {filterStatus === "all" && statusGroups.length > 1 && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {PROPERTY_STATUS_OPTIONS.map((status) => {
            const count = items.filter((p) => p.property_status === status).length;
            return (
              <div key={status} className={`rounded-lg p-3 text-center ${STATUS_COLORS[status] || "bg-muted text-muted-foreground"}`}>
                <p className="text-lg font-display font-semibold">{count}</p>
                <p className="text-[10px] font-body uppercase tracking-wide">{status}</p>
              </div>
            );
          })}
        </div>
      )}

      {filteredItems.length === 0 ? (
        <p className="text-muted-foreground text-sm font-body">No properties match this filter.</p>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="available">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-2">
                {filteredItems.map((p, idx) => (
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
                            {p.featured && (
                              <span className="text-[10px] bg-gold/20 text-gold-hover px-1.5 py-0.5 rounded font-body font-semibold shrink-0">★</span>
                            )}
                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-body shrink-0 ${STATUS_COLORS[p.property_status] || "bg-muted text-muted-foreground"}`}>
                              {p.property_status}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {[p.location, p.property_type, p.bedrooms ? `${p.bedrooms}br` : null].filter(Boolean).join(" · ") || p.price_label || p.short_description || "—"}
                          </p>
                        </div>
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
