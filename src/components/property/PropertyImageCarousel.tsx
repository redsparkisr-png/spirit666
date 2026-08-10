"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { optimizedImageUrl } from "@/lib/image";

// The site-wide standard for how a property's photos render inside a card:
// every image shows in full (object-contain, adaptive aspect-ratio measured
// per photo — no crop, no letterbox), with swipe/arrow/dot navigation when
// there's more than one. Requires the immediate parent to have `group` in
// its className so the hover-revealed arrows work.
interface Props {
  images: string[];
  altBase: string;
  width?: number;
  eager?: boolean;
  fallbackRatio?: number;
  noImageText?: string;
}

const PropertyImageCarousel = ({ images, altBase, width = 800, eager = false, fallbackRatio = 1.5, noImageText = "No image" }: Props) => {
  const [current, setCurrent] = useState(0);
  const [ratios, setRatios] = useState<Record<number, number>>({});
  const touchStartX = useRef<number | null>(null);
  const count = Math.max(images.length, 1);

  const recordRatio = (idx: number, el: HTMLImageElement | null) => {
    if (!el || !el.naturalWidth || !el.naturalHeight) return;
    const ratio = Math.min(2.5, Math.max(0.4, el.naturalWidth / el.naturalHeight));
    setRatios((r) => (r[idx] ? r : { ...r, [idx]: ratio }));
  };
  const measureRef = (idx: number) => (el: HTMLImageElement | null) => {
    if (el && el.complete) recordRatio(idx, el);
  };
  const noteRatio = (idx: number) => (e: React.SyntheticEvent<HTMLImageElement>) => recordRatio(idx, e.currentTarget);
  const frameRatio = ratios[current] ?? fallbackRatio;

  const next = (e: React.MouseEvent) => { e.stopPropagation(); e.preventDefault(); setCurrent((c) => (c + 1) % count); };
  const prev = (e: React.MouseEvent) => { e.stopPropagation(); e.preventDefault(); setCurrent((c) => (c - 1 + count) % count); };
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) setCurrent((c) => (c + 1) % count);
      else setCurrent((c) => (c - 1 + count) % count);
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="relative overflow-hidden bg-muted transition-[aspect-ratio] duration-500 ease-out"
      style={{ aspectRatio: frameRatio }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {images.length === 0 && (
        <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-sm font-body">{noImageText}</div>
      )}
      {images.map((url, idx) => (
        <img
          key={idx}
          ref={measureRef(idx)}
          src={optimizedImageUrl(url, { width, quality: 75 })}
          onLoad={noteRatio(idx)}
          alt={`${altBase} – photo ${idx + 1}`}
          className="absolute inset-0 w-full h-full object-contain transition-opacity duration-[500ms] ease-out"
          style={{ opacity: current === idx ? 1 : 0 }}
          loading={eager && idx === 0 ? "eager" : "lazy"}
          fetchPriority={eager && idx === 0 ? "high" : undefined}
          decoding="async"
        />
      ))}
      {images.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Previous image">
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>
          <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Next image">
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full transition-colors" style={{ backgroundColor: i === current ? "#fff" : "rgba(255,255,255,0.5)" }} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PropertyImageCarousel;
