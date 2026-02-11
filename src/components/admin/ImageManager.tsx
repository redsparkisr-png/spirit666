import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { X, ArrowUp, ArrowDown, Upload, Star } from "lucide-react";
import { toast } from "sonner";

interface Props {
  images: string[];
  onChange: (images: string[]) => void;
  folder: string;
}

const ImageManager = ({ images, onChange, folder }: Props) => {
  const [uploading, setUploading] = useState(false);

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    const newUrls: string[] = [];
    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("images").upload(path, file);
      if (error) {
        toast.error(`Upload failed: ${error.message}`);
        continue;
      }
      const { data } = supabase.storage.from("images").getPublicUrl(path);
      newUrls.push(data.publicUrl);
    }
    onChange([...images, ...newUrls]);
    setUploading(false);
    e.target.value = "";
  };

  const remove = (idx: number) => {
    onChange(images.filter((_, i) => i !== idx));
  };

  const move = (idx: number, dir: -1 | 1) => {
    const arr = [...images];
    const target = idx + dir;
    if (target < 0 || target >= arr.length) return;
    [arr[idx], arr[target]] = [arr[target], arr[idx]];
    onChange(arr);
  };

  const setFirst = (idx: number) => {
    if (idx === 0) return;
    const arr = [...images];
    const [item] = arr.splice(idx, 1);
    arr.unshift(item);
    onChange(arr);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <label className="cursor-pointer inline-flex items-center gap-1.5 text-sm bg-primary/10 text-primary px-3 py-1.5 rounded-md hover:bg-primary/20 transition-colors">
          <Upload className="w-3.5 h-3.5" />
          {uploading ? "Uploading..." : "Add Images"}
          <input type="file" accept="image/*" multiple onChange={upload} className="hidden" disabled={uploading} />
        </label>
        <span className="text-xs text-muted-foreground">{images.length} image(s)</span>
      </div>
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {images.map((url, idx) => (
            <div key={idx} className="relative group aspect-[4/3] rounded-md overflow-hidden border border-border">
              <img src={url} alt="" className="w-full h-full object-cover" />
              {idx === 0 && (
                <div className="absolute top-1 left-1 bg-gold text-primary-foreground text-[10px] px-1.5 py-0.5 rounded font-body font-semibold">
                  Primary
                </div>
              )}
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                {idx > 0 && (
                  <button onClick={() => setFirst(idx)} className="p-1 bg-card rounded" title="Set as primary">
                    <Star className="w-3.5 h-3.5 text-gold" />
                  </button>
                )}
                {idx > 0 && (
                  <button onClick={() => move(idx, -1)} className="p-1 bg-card rounded">
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                )}
                {idx < images.length - 1 && (
                  <button onClick={() => move(idx, 1)} className="p-1 bg-card rounded">
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                )}
                <button onClick={() => remove(idx)} className="p-1 bg-destructive/90 rounded">
                  <X className="w-3.5 h-3.5 text-destructive-foreground" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageManager;
