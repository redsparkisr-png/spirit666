import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { X, Upload, Star, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

interface Props {
  images: string[];
  onChange: (images: string[]) => void;
  folder: string;
}

const ImageManager = ({ images, onChange, folder }: Props) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    const total = files.length;
    let done = 0;
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
      done++;
      setProgress(Math.round((done / total) * 100));
    }
    onChange([...images, ...newUrls]);
    setUploading(false);
    setProgress(0);
    e.target.value = "";
  };

  const remove = (idx: number) => {
    onChange(images.filter((_, i) => i !== idx));
  };

  const setFirst = (idx: number) => {
    if (idx === 0) return;
    const arr = [...images];
    const [item] = arr.splice(idx, 1);
    arr.unshift(item);
    onChange(arr);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const arr = [...images];
    const [moved] = arr.splice(result.source.index, 1);
    arr.splice(result.destination.index, 0, moved);
    onChange(arr);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <label className="cursor-pointer inline-flex items-center gap-1.5 text-sm bg-primary/10 text-primary px-3 py-1.5 rounded-md hover:bg-primary/20 transition-colors">
          <Upload className="w-3.5 h-3.5" />
          {uploading ? `Uploading ${progress}%` : "Add Images"}
          <input type="file" accept="image/*" multiple onChange={upload} className="hidden" disabled={uploading} />
        </label>
        <span className="text-xs text-muted-foreground">{images.length} image(s)</span>
      </div>

      {/* Upload progress bar */}
      {uploading && (
        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {images.length > 0 && (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="image-grid" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="grid grid-cols-3 sm:grid-cols-4 gap-2"
              >
                {images.map((url, idx) => (
                  <Draggable key={`${url}-${idx}`} draggableId={`img-${idx}`} index={idx}>
                    {(prov, snapshot) => (
                      <div
                        ref={prov.innerRef}
                        {...prov.draggableProps}
                        {...prov.dragHandleProps}
                        className={`relative group aspect-[4/3] rounded-md overflow-hidden border cursor-grab ${
                          snapshot.isDragging ? "border-primary shadow-lg z-10" : "border-border"
                        }`}
                      >
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
                          <button onClick={() => remove(idx)} className="p-1 bg-destructive/90 rounded" title="Remove">
                            <Trash2 className="w-3.5 h-3.5 text-destructive-foreground" />
                          </button>
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

export default ImageManager;
