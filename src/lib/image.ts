// Image URL helper — uses Supabase Storage image transformations to deliver
// WebP at the requested width, dramatically reducing payload for legacy uploads.
// Falls through unchanged for non-Supabase URLs (external CDN, local assets).

export interface ImageOpts {
  width?: number;
  quality?: number;
  resize?: "cover" | "contain" | "fill";
  format?: "webp" | "origin";
}

export function optimizedImageUrl(url: string | null | undefined, opts: ImageOpts = {}): string {
  if (!url) return "";
  // Only transform Supabase Storage public URLs
  const match = url.match(/^(https?:\/\/[^/]+)\/storage\/v1\/object\/public\/(.+)$/);
  if (!match) return url;
  const [, origin, rest] = match;
  const width = opts.width ?? 1200;
  const quality = opts.quality ?? 75;
  const resize = opts.resize ?? "cover";
  const format = opts.format ?? "origin";
  return `${origin}/storage/v1/render/image/public/${rest}?width=${width}&quality=${quality}&resize=${resize}&format=${format}`;
}

// Convert an uploaded image File to WebP via canvas, with optional max-width resize.
// Returns a new File ending in .webp. Falls back to the original file on failure.
export async function compressToWebP(
  file: File,
  opts: { maxWidth?: number; quality?: number } = {}
): Promise<File> {
  const maxWidth = opts.maxWidth ?? 2000;
  const quality = opts.quality ?? 0.82;

  if (!file.type.startsWith("image/")) return file;
  // Skip if already small WebP
  if (file.type === "image/webp" && file.size < 400_000) return file;

  try {
    const bitmap = await createImageBitmap(file).catch(() => null);
    if (!bitmap) return file;

    const scale = bitmap.width > maxWidth ? maxWidth / bitmap.width : 1;
    const w = Math.round(bitmap.width * scale);
    const h = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, w, h);
    bitmap.close?.();

    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob((b) => resolve(b), "image/webp", quality)
    );
    if (!blob) return file;
    // Only use compressed version if it's actually smaller
    if (blob.size >= file.size) return file;

    const newName = file.name.replace(/\.[^.]+$/, "") + ".webp";
    return new File([blob], newName, { type: "image/webp", lastModified: Date.now() });
  } catch {
    return file;
  }
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}