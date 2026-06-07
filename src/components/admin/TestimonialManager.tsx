"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { GripVertical, Pencil, Trash2, Plus, X, Star, Upload } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  country: string;
  quote_en: string;
  quote_he: string;
  photo_url: string;
  initials: string;
  display_order: number;
  is_featured: boolean;
  created_at: string;
}

const empty: Partial<Testimonial> = {
  name: "",
  country: "",
  quote_en: "",
  quote_he: "",
  photo_url: "",
  initials: "",
  display_order: 0,
  is_featured: false,
};

const TestimonialManager = () => {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    const { data } = await (supabase as any)
      .from("testimonials")
      .select("*")
      .order("display_order");
    if (data) setItems(data);
  };

  useEffect(() => { load(); }, []);

  const startNew = () => {
    setEditing({ ...empty, id: "", created_at: "", display_order: items.length });
    setIsNew(true);
  };

  const startEdit = (t: Testimonial) => {
    setEditing({ ...t });
    setIsNew(false);
  };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    const { id, created_at, ...rest } = editing;
    if (isNew) {
      const { error } = await (supabase as any).from("testimonials").insert(rest);
      if (error) toast.error(error.message);
      else toast.success("Testimonial added");
    } else {
      const { error } = await (supabase as any).from("testimonials").update(rest).eq("id", id);
      if (error) toast.error(error.message);
      else toast.success("Testimonial updated");
    }
    setSaving(false);
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    await (supabase as any).from("testimonials").delete().eq("id", id);
    toast.success("Deleted");
    load();
  };

  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `testimonials/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("images").upload(path, file);
    if (error) { toast.error(error.message); setUploading(false); return; }
    const { data } = supabase.storage.from("images").getPublicUrl(path);
    setEditing({ ...editing, photo_url: data.publicUrl });
    setUploading(false);
    e.target.value = "";
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const reordered = [...items];
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setItems(reordered);
    for (let i = 0; i < reordered.length; i++) {
      await (supabase as any).from("testimonials").update({ display_order: i }).eq("id", reordered[i].id);
    }
  };

  const inputCls = "px-3 py-2 border border-border rounded-md bg-card text-foreground font-body text-sm w-full";

  if (editing) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-semibold text-foreground">{isNew ? "Add Testimonial" : "Edit Testimonial"}</h3>
          <button onClick={() => setEditing(null)} className="p-1 hover:bg-muted rounded"><X className="w-5 h-5" /></button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input placeholder="Name *" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className={inputCls} />
          <input placeholder="Country" value={editing.country || ""} onChange={(e) => setEditing({ ...editing, country: e.target.value })} className={inputCls} />
          <input placeholder="Initials (e.g. DS)" value={editing.initials || ""} onChange={(e) => setEditing({ ...editing, initials: e.target.value.toUpperCase().slice(0, 3) })} className={inputCls} />
          <label className="flex items-center gap-2 text-sm font-body text-foreground">
            <input type="checkbox" checked={editing.is_featured || false} onChange={(e) => setEditing({ ...editing, is_featured: e.target.checked })} className="rounded" />
            Featured testimonial
          </label>
        </div>

        <div>
          <label className="text-xs font-body text-muted-foreground mb-1 block">Quote (English) *</label>
          <textarea value={editing.quote_en} onChange={(e) => setEditing({ ...editing, quote_en: e.target.value })} rows={3} placeholder="Their testimonial in English..." className={`${inputCls} resize-y`} />
        </div>

        <div dir="rtl">
          <label className="text-xs font-body text-muted-foreground mb-1 block">ציטוט (עברית)</label>
          <textarea value={editing.quote_he || ""} onChange={(e) => setEditing({ ...editing, quote_he: e.target.value })} rows={3} placeholder="הציטוט בעברית..." className={`${inputCls} resize-y`} />
        </div>

        {/* Photo */}
        <div>
          <label className="text-xs font-body text-muted-foreground mb-1 block">Photo</label>
          <div className="flex items-center gap-3">
            {editing.photo_url ? (
              <img src={editing.photo_url} alt="" className="w-14 h-14 rounded-full object-cover border border-border" />
            ) : (
              <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-xs text-muted-foreground font-body">
                {editing.initials || "?"}
              </div>
            )}
            <label className="cursor-pointer inline-flex items-center gap-1.5 text-sm bg-primary/10 text-primary px-3 py-1.5 rounded-md hover:bg-primary/20">
              <Upload className="w-3.5 h-3.5" />
              {uploading ? "Uploading..." : "Upload Photo"}
              <input type="file" accept="image/*" onChange={uploadPhoto} className="hidden" disabled={uploading} />
            </label>
          </div>
        </div>

        <button onClick={save} disabled={saving || !editing.name?.trim() || !editing.quote_en?.trim()} className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-body text-sm hover:bg-primary/90 disabled:opacity-50">
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-foreground">Testimonials ({items.length})</h3>
        <button onClick={startNew} className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-md font-body text-sm hover:bg-primary/90">
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      {items.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-6 text-center">
          <p className="text-muted-foreground text-sm font-body mb-2">No testimonials in database yet.</p>
          <p className="text-xs text-muted-foreground font-body">The site currently uses hardcoded testimonials from the CMS content keys. Add testimonials here to override them.</p>
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="testimonials">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-2">
                {items.map((t, idx) => (
                  <Draggable key={t.id} draggableId={t.id} index={idx}>
                    {(prov) => (
                      <div ref={prov.innerRef} {...prov.draggableProps} className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg">
                        <div {...prov.dragHandleProps} className="cursor-grab">
                          <GripVertical className="w-4 h-4 text-muted-foreground" />
                        </div>
                        {t.photo_url ? (
                          <img src={t.photo_url} alt="" className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xs font-body font-bold text-primary">
                            {t.initials || "?"}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-body font-medium text-foreground">{t.name}</p>
                            {t.country && <span className="text-xs text-muted-foreground font-body">· {t.country}</span>}
                            {t.is_featured && <Star className="w-3 h-3 text-gold fill-gold" />}
                          </div>
                          <p className="text-xs text-muted-foreground truncate max-w-sm font-body italic">"{t.quote_en}"</p>
                        </div>
                        <button onClick={() => startEdit(t)} className="p-1.5 hover:bg-muted rounded" title="Edit">
                          <Pencil className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button onClick={() => remove(t.id)} className="p-1.5 hover:bg-destructive/10 rounded" title="Delete">
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

export default TestimonialManager;
