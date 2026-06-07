"use client";

import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { GripVertical, Upload, Star, Trash2, Replace, CheckSquare, X } from "lucide-react";
import { toast } from "sonner";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { compressToWebP, formatBytes } from "@/lib/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  images: string[];
  onChange: (images: string[]) => void;
  folder: string;
}

const ImageManager = ({ images, onChange, folder }: Props) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const [bulkMode, setBulkMode] = useState(false);
  const [bulkSelected, setBulkSelected] = useState<Set<number>>(new Set());
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false);
  const replaceRef = useRef<HTMLInputElement>(null);
  const [replaceIndex, setReplaceIndex] = useState<number | null>(null);

  const uploadFiles = async (files: FileList, insertAt?: number) => {
    setUploading(true);
    const newUrls: string[] = [];
    const progress: Record<string, number> = {};

    for (const file of Array.from(files)) {
      progress[file.name] = 0;
      setUploadProgress({ ...progress });

      // Compress + convert to WebP in browser before upload
      const originalSize = file.size;
      const optimized = await compressToWebP(file, { maxWidth: 2000, quality: 0.82 });
      if (optimized !== file && optimized.size < originalSize) {
        toast.success(`${file.name}: ${formatBytes(originalSize)} → ${formatBytes(optimized.size)}`);
      }

      const ext = optimized.name.split(".").pop();
      const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error } = await supabase.storage.from("images").upload(path, optimized, {
        contentType: optimized.type,
        cacheControl: "31536000",
      });
      if (error) {
        toast.error(`Upload failed: ${error.message}`);
        continue;
      }
      const { data } = supabase.storage.from("images").getPublicUrl(path);
      newUrls.push(data.publicUrl);
      progress[file.name] = 100;
      setUploadProgress({ ...progress });
    }

    if (insertAt !== null && insertAt !== undefined) {
      const arr = [...images];
      arr[insertAt] = newUrls[0];
      onChange(arr);
    } else {
      onChange([...images, ...newUrls]);
    }
    setUploading(false);
    setUploadProgress({});
  };

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    await uploadFiles(files);
    e.target.value = "";
  };

  const handleReplace = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length || replaceIndex === null) return;
    await uploadFiles(files, replaceIndex);
    setReplaceIndex(null);
    e.target.value = "";
  };

  const confirmDelete = () => {
    if (deleteTarget === null) return;
    onChange(images.filter((_, i) => i !== deleteTarget));
    toast.success("Image removed");
    setDeleteTarget(null);
  };

  const confirmBulkDelete = () => {
    onChange(images.filter((_, i) => !bulkSelected.has(i)));
    toast.success(`${bulkSelected.size} image(s) removed`);
    setBulkSelected(new Set());
    setBulkMode(false);
    setBulkDeleteConfirm(false);
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

  const toggleBulkItem = (idx: number) => {
    const next = new Set(bulkSelected);
    next.has(idx) ? next.delete(idx) : next.add(idx);
    setBulkSelected(next);
  };

  const activeUploads = Object.entries(uploadProgress);

  return (
    <TooltipProvider>
      <div className="space-y-3">
        {/* Controls row */}
        <div className="flex items-center gap-2 flex-wrap">
          <label className="cursor-pointer inline-flex items-center gap-1.5 text-sm bg-primary/10 text-primary px-3 py-1.5 rounded-md hover:bg-primary/20 transition-colors">
            <Upload className="w-3.5 h-3.5" />
            {uploading ? "Uploading…" : "Add Images"}
            <input type="file" accept="image/*" multiple onChange={upload} className="hidden" disabled={uploading} />
          </label>
          <span className="text-xs text-muted-foreground">{images.length} image(s)</span>
          {images.length > 1 && (
            <button
              onClick={() => { setBulkMode(!bulkMode); setBulkSelected(new Set()); }}
              className={`ml-auto inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-md transition-colors ${
                bulkMode ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              {bulkMode ? "Cancel" : "Bulk"}
            </button>
          )}
        </div>

        {/* Bulk action bar */}
        {bulkMode && bulkSelected.size > 0 && (
          <div className="flex items-center gap-2 p-2 bg-destructive/5 rounded-md border border-destructive/20">
            <span className="text-xs text-destructive font-body font-medium">{bulkSelected.size} selected</span>
            <button
              onClick={() => setBulkDeleteConfirm(true)}
              className="ml-auto text-xs bg-destructive text-destructive-foreground px-3 py-1.5 rounded-md hover:bg-destructive/90 transition-colors"
            >
              Delete Selected
            </button>
          </div>
        )}

        {/* Upload progress */}
        {activeUploads.length > 0 && (
          <div className="space-y-1">
            {activeUploads.map(([name, pct]) => (
              <div key={name} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="truncate max-w-[120px]">{name}</span>
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-300 rounded-full" style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Image grid with drag-and-drop */}
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
                          className={`relative group aspect-[4/3] rounded-md overflow-hidden border transition-all ${
                            snapshot.isDragging ? "border-primary shadow-lg z-10 scale-105" : "border-border"
                          } ${bulkMode && bulkSelected.has(idx) ? "ring-2 ring-destructive" : ""}`}
                        >
                          <img src={url} alt="" className="w-full h-full object-cover" loading="lazy" />

                          {/* Primary badge */}
                          {idx === 0 && (
                            <div className="absolute top-1 left-1 bg-gold text-primary-foreground text-[10px] px-1.5 py-0.5 rounded font-body font-semibold">
                              Primary
                            </div>
                          )}

                          {/* Drag handle — only this triggers drag, min 44x44 hit area */}
                          <div
                            {...prov.dragHandleProps}
                            className="absolute top-1.5 right-1.5 w-11 h-11 rounded-md bg-black/40 backdrop-blur-sm flex items-center justify-center cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Drag to reorder"
                          >
                            <GripVertical className="w-6 h-6 text-white" />
                          </div>

                          {/* Bulk select overlay */}
                          {bulkMode && (
                            <button
                              onClick={() => toggleBulkItem(idx)}
                              className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors"
                            >
                              {bulkSelected.has(idx) && (
                                <CheckSquare className="w-6 h-6 text-white" />
                              )}
                            </button>
                          )}

                          {/* Hover actions (non-bulk) — large hit targets (44x44) */}
                          {!bulkMode && (
                            <div className="absolute bottom-0 inset-x-0 p-1.5 flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/60 to-transparent">
                              {idx > 0 && (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <button
                                      onClick={(e) => { e.stopPropagation(); setFirst(idx); }}
                                      className="w-11 h-11 rounded-md bg-card/90 flex items-center justify-center hover:bg-card transition-colors"
                                    >
                                      <Star className="w-4 h-4 text-gold" />
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent>Set as primary</TooltipContent>
                                </Tooltip>
                              )}
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setReplaceIndex(idx);
                                      replaceRef.current?.click();
                                    }}
                                    className="w-11 h-11 rounded-md bg-card/90 flex items-center justify-center hover:bg-card transition-colors"
                                  >
                                    <Replace className="w-4 h-4 text-foreground" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>Replace image</TooltipContent>
                              </Tooltip>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <button
                                    onClick={(e) => { e.stopPropagation(); setDeleteTarget(idx); }}
                                    className="w-12 h-12 rounded-lg bg-red-500/80 hover:bg-red-500 flex items-center justify-center text-white shadow-lg transition-all duration-200 active:scale-90"
                                  >
                                    <Trash2 className="w-6 h-6" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>Delete image</TooltipContent>
                              </Tooltip>
                            </div>
                          )}
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

        {/* Hidden replace input */}
        <input ref={replaceRef} type="file" accept="image/*" onChange={handleReplace} className="hidden" />

        {/* Single delete confirmation */}
        <AlertDialog open={deleteTarget !== null} onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this image?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Bulk delete confirmation */}
        <AlertDialog open={bulkDeleteConfirm} onOpenChange={setBulkDeleteConfirm}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete {bulkSelected.size} image(s)?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmBulkDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete All
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </TooltipProvider>
  );
};

export default ImageManager;
