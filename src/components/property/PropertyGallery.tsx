"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { optimizedImageUrl } from "@/lib/image";
import type { Tables } from "@/integrations/supabase/types";
import { trackGalleryOpen } from "@/components/GoogleAnalyticsConsent";

type Property = Tables<"properties_available">;

type Props = {
  property: Property;
  lang: string;
};

const PropertyGallery = ({ property, lang }: Props) => {
  const isHe = lang === "he";
  const images = property.images || [];

  const imageAlt = (idx: number) =>
    isHe
      ? `${property.title}${property.location ? ` ב${property.location}` : ""}, זכרון יעקב – תמונה ${idx + 1}`
      : `${property.title}${property.location ? ` in ${property.location}` : ""}, Zichron Yaakov – photo ${idx + 1}`;

  const [currentImg, setCurrentImg] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const galleryTracked = useRef(false);

  const openLightbox = () => {
    if (!galleryTracked.current) {
      galleryTracked.current = true;
      trackGalleryOpen({ property_slug: property.slug || property.id, property_title: property.title });
    }
    setLightboxOpen(true);
  };

  useEffect(() => {
    setCurrentImg(0);
  }, [property.id]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      else if (e.key === "ArrowRight") setCurrentImg((c) => (c + 1) % images.length);
      else if (e.key === "ArrowLeft") setCurrentImg((c) => (c - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, images.length]);

  if (images.length === 0) {
    return (
      <div className="relative w-full aspect-[16/9] md:aspect-[2.1/1] bg-charcoal flex items-center justify-center text-muted-foreground font-body">
        No images
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <div className="relative w-full aspect-[16/9] md:aspect-[2.1/1] bg-charcoal overflow-hidden">
        {images.map((url, idx) => (
          <img
            key={idx}
            src={optimizedImageUrl(url, { width: 1600, quality: 80 })}
            alt={imageAlt(idx)}
            onClick={openLightbox}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 cursor-zoom-in"
            style={{ opacity: currentImg === idx ? 1 : 0 }}
            loading={idx === 0 ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={idx === 0 ? "high" : undefined}
          />
        ))}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setCurrentImg((c) => (c - 1 + images.length) % images.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentImg((c) => (c + 1) % images.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm text-white text-xs font-body px-3 py-1 rounded-full">
              {currentImg + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="container px-6 py-3 flex gap-2.5 overflow-x-auto scrollbar-hide">
          {images.map((url, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImg(idx)}
              className={`flex-shrink-0 w-[88px] h-[60px] rounded-lg overflow-hidden border-2 bg-charcoal/5 transition-colors ${
                currentImg === idx ? "border-charcoal" : "border-transparent opacity-60 hover:opacity-100"
              }`}
              aria-label={`View image ${idx + 1}`}
            >
              <img
                src={optimizedImageUrl(url, { width: 200, quality: 70 })}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={isHe ? "גלריית תמונות" : "Image gallery"}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10"
            aria-label={isHe ? "סגירה" : "Close"}
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={optimizedImageUrl(images[currentImg], { width: 2000, quality: 85 })}
            alt={imageAlt(currentImg)}
            onClick={(e) => e.stopPropagation()}
            className="max-w-[95vw] max-h-[90vh] object-contain select-none"
          />
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setCurrentImg((c) => (c - 1 + images.length) % images.length); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setCurrentImg((c) => (c + 1) % images.length); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-sm text-white text-sm font-body px-4 py-1.5 rounded-full">
                {currentImg + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default PropertyGallery;
