import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Trash2, ArrowUp, ArrowDown, Upload } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type GalleryItem = Tables<"lifestyle_gallery">;

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
    await supabase.from("lifestyle_gallery").delete().eq("id", id);
    toast.success("Removed");
    load();
  };

  const move = async (idx: number, dir: -1 | 1) => {
    const target = idx + dir;
    if (target < 0 || target >= items.length) return;
    const a = items[idx];
    const b = items[target];
    await supabase.from("lifestyle_gallery").update({ display_order: target }).eq("id", a.id);
    await supabase.from("lifestyle_gallery").update({ display_order: idx }).eq("id", b.id);
    load();
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {items.map((item, idx) => (
            <div key={item.id} className="relative group aspect-[4/3] rounded-lg overflow-hidden border border-border">
              <img src={item.image_url} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                {idx > 0 && (
                  <button onClick={() => move(idx, -1)} className="p-1 bg-card rounded"><ArrowUp className="w-3.5 h-3.5" /></button>
                )}
                {idx < items.length - 1 && (
                  <button onClick={() => move(idx, 1)} className="p-1 bg-card rounded"><ArrowDown className="w-3.5 h-3.5" /></button>
                )}
                <button onClick={() => remove(item.id)} className="p-1 bg-destructive/90 rounded"><Trash2 className="w-3.5 h-3.5 text-destructive-foreground" /></button>
              </div>
              <div className="absolute bottom-1 right-1 bg-foreground/60 text-primary-foreground text-[10px] px-1.5 py-0.5 rounded font-body">
                #{idx + 1}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LifestyleManager;
