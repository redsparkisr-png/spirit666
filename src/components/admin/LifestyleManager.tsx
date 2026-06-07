"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { GripVertical, Trash2, Upload } from "lucide-react";

interface GalleryItem {
  id: string;
  image_url: string;
  display_order: number;
  title_en: string;
  title_he: string;
  description_en: string;
  description_he: string;
  alt_en: string;
  alt_he: string;
}

const LifestyleManager = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("lifestyle_gallery").select("*").order("display_order");
    if (data) {
      setItems(data.map((d: any) => ({
        id: d.id,
        image_url: d.image_url,
        display_order: d.display_order,
        title_en: d.title_en || "",
        title_he: d.title_he || "",
        description_en: d.description_en || "",
        description_he: d.description_he || "",
        alt_en: d.alt_en || "",
        alt_he: d.alt_he || "",
      })));
    }
  };

  useEffect(() => { load(); }, []);

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const path = `lifestyle/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("images").upload(path, file);
      if (error) { toast.error(error.message); continue; }
      const { data } = supabase.storage.from("images").getPublicUrl(path);
      await supabase.from("lifestyle_gallery").insert({
        image_url: data.publicUrl,
        display_order: items.length,
      } as any);
    }
    setUploading(false);
    e.target.value = "";
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Remove this image?")) return;
    await supabase.from("lifestyle_gallery").delete().eq("id", id);
    toast.success("Removed");
    load();
  };

  const updateField = async (id: string, field: string, value: string) => {
    await supabase.from("lifestyle_gallery").update({ [field]: value } as any).eq("id", id);
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const reordered = [...items];
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setItems(reordered);
    for (let i = 0; i < reordered.length; i++) {
      await supabase.from("lifestyle_gallery").update({ display_order: i }).eq("id", reordered[i].id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-foreground">Lifestyle Gallery ({items.length})</h3>
        <label className="cursor-pointer inline-flex items-center gap-1.5 bg-primary text-primary-foreground px-4 py-2 rounded-md font-body text-sm hover:bg-primary/90">
          <Upload className="w-4 h-4" />
          {uploading ? "Uploading..." : "Add Images"}
          <input type="file" accept="image/*" multiple onChange={upload} className="hidden" disabled={uploading} />
        </label>
      </div>

      <p className="text-muted-foreground text-xs font-body">
        Each image has editable Title, Description and Alt text in English + Hebrew. These appear on the gallery overlay.
      </p>

      {items.length === 0 ? (
        <p className="text-muted-foreground text-sm font-body">No lifestyle images yet. Fallback images will show on the site.</p>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="lifestyle">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
                {items.map((item, idx) => (
                  <Draggable key={item.id} draggableId={item.id} index={idx}>
                    {(prov) => (
                      <div
                        ref={prov.innerRef}
                        {...prov.draggableProps}
                        className="flex gap-3 border border-border rounded-lg p-3 bg-card"
                      >
                        {/* Drag + Image */}
                        <div className="flex flex-col items-center gap-2 shrink-0">
                          <div {...prov.dragHandleProps} className="p-1 cursor-grab">
                            <GripVertical className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div className="w-24 h-18 rounded-md overflow-hidden">
                            <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                          </div>
                          <button onClick={() => remove(item.id)} className="p-1 text-destructive hover:bg-destructive/10 rounded" title="Delete">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-[10px] text-muted-foreground font-body">#{idx + 1}</span>
                        </div>

                        {/* Fields */}
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div>
                            <label className="text-[10px] text-muted-foreground font-body uppercase tracking-wide">Title (EN)</label>
                            <input
                              defaultValue={item.title_en}
                              onBlur={(e) => updateField(item.id, "title_en", e.target.value)}
                              placeholder="e.g. Mediterranean Sea Views"
                              className="w-full text-xs px-2 py-1 border border-border rounded bg-background text-foreground font-body"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-muted-foreground font-body uppercase tracking-wide">Title (HE)</label>
                            <input
                              defaultValue={item.title_he}
                              onBlur={(e) => updateField(item.id, "title_he", e.target.value)}
                              placeholder="כותרת בעברית"
                              dir="rtl"
                              className="w-full text-xs px-2 py-1 border border-border rounded bg-background text-foreground font-body"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-muted-foreground font-body uppercase tracking-wide">Description (EN)</label>
                            <input
                              defaultValue={item.description_en}
                              onBlur={(e) => updateField(item.id, "description_en", e.target.value)}
                              placeholder="Short description (7-8 words)"
                              className="w-full text-xs px-2 py-1 border border-border rounded bg-background text-foreground font-body"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-muted-foreground font-body uppercase tracking-wide">Description (HE)</label>
                            <input
                              defaultValue={item.description_he}
                              onBlur={(e) => updateField(item.id, "description_he", e.target.value)}
                              placeholder="תיאור קצר בעברית"
                              dir="rtl"
                              className="w-full text-xs px-2 py-1 border border-border rounded bg-background text-foreground font-body"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-muted-foreground font-body uppercase tracking-wide">Alt Text (EN)</label>
                            <input
                              defaultValue={item.alt_en}
                              onBlur={(e) => updateField(item.id, "alt_en", e.target.value)}
                              placeholder="Accessibility alt text"
                              className="w-full text-xs px-2 py-1 border border-border rounded bg-background text-foreground font-body"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-muted-foreground font-body uppercase tracking-wide">Alt Text (HE)</label>
                            <input
                              defaultValue={item.alt_he}
                              onBlur={(e) => updateField(item.id, "alt_he", e.target.value)}
                              placeholder="טקסט נגישות בעברית"
                              dir="rtl"
                              className="w-full text-xs px-2 py-1 border border-border rounded bg-background text-foreground font-body"
                            />
                          </div>
                        </div>
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

export default LifestyleManager;
