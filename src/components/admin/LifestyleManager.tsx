import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { GripVertical, Trash2, Upload, Star } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type GalleryItem = Tables<"lifestyle_gallery">;

const CATEGORIES = ["Nature", "Community", "Cafes", "Beach", "Pedestrian Street", "Wine", "Architecture", "Other"] as const;

const LifestyleManager = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    const { data } = await supabase.from("lifestyle_gallery").select("*").order("display_order");
    if (data) setItems(data);
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
      });
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

  const toggleHero = async (item: GalleryItem) => {
    const isHero = (item as any).is_hero;
    // If setting as hero, unset all others first
    if (!isHero) {
      await supabase.from("lifestyle_gallery").update({ is_hero: false } as any).neq("id", item.id);
    }
    await supabase.from("lifestyle_gallery").update({ is_hero: !isHero } as any).eq("id", item.id);
    load();
  };

  const updateField = async (id: string, field: string, value: string) => {
    await supabase.from("lifestyle_gallery").update({ [field]: value } as any).eq("id", id);
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
        .from("lifestyle_gallery")
        .update({ display_order: i })
        .eq("id", reordered[i].id);
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
      {items.length === 0 ? (
        <p className="text-muted-foreground text-sm font-body">No lifestyle images yet.</p>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="lifestyle" direction="horizontal">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {items.map((item, idx) => (
                  <Draggable key={item.id} draggableId={item.id} index={idx}>
                    {(prov) => (
                      <div
                        ref={prov.innerRef}
                        {...prov.draggableProps}
                        className="relative group rounded-lg overflow-hidden border border-border"
                      >
                        <div className="aspect-[4/3]">
                          <img src={item.image_url} alt="" className="w-full h-full object-cover object-center" />
                        </div>
                        {/* Drag handle */}
                        <div {...prov.dragHandleProps} className="absolute top-1 left-1 p-1 bg-card/80 rounded cursor-grab opacity-0 group-hover:opacity-100 transition-opacity">
                          <GripVertical className="w-3.5 h-3.5 text-muted-foreground" />
                        </div>
                        {/* Hero badge */}
                        {(item as any).is_hero && (
                          <div className="absolute top-1 left-8 bg-gold text-primary-foreground text-[10px] px-1.5 py-0.5 rounded font-body font-semibold">
                            Hero
                          </div>
                        )}
                        {/* Actions */}
                        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                          <button onClick={() => toggleHero(item)} className="p-1 bg-card rounded" title="Toggle hero">
                            <Star className={`w-3.5 h-3.5 ${(item as any).is_hero ? "text-gold fill-gold" : "text-muted-foreground"}`} />
                          </button>
                          <button onClick={() => remove(item.id)} className="p-1 bg-destructive/90 rounded">
                            <Trash2 className="w-3.5 h-3.5 text-destructive-foreground" />
                          </button>
                        </div>
                        {/* Category & caption below image */}
                        <div className="p-2 bg-card space-y-1">
                          <select
                            value={(item as any).category || ""}
                            onChange={(e) => updateField(item.id, "category", e.target.value)}
                            className="w-full text-[11px] px-1 py-0.5 border border-border rounded bg-card text-foreground font-body"
                          >
                            <option value="">No category</option>
                            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                          </select>
                          <input
                            placeholder="Caption (optional)"
                            defaultValue={(item as any).caption || ""}
                            onBlur={(e) => updateField(item.id, "caption", e.target.value)}
                            className="w-full text-[11px] px-1 py-0.5 border border-border rounded bg-card text-foreground font-body"
                          />
                        </div>
                        <div className="absolute bottom-[52px] right-1 bg-foreground/60 text-primary-foreground text-[10px] px-1.5 py-0.5 rounded font-body">
                          #{idx + 1}
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
