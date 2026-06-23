"use client";

import React, { useState } from "react";
import { X, Eye } from "lucide-react";
import type { GalleryItem } from "@/lib/types";

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedImage(item.image)}
            className="group relative aspect-square bg-[#16181b] border border-zinc-800 overflow-hidden cursor-pointer hover:border-[#f97316] transition-all"
          >
            <img
              src={item.image}
              alt={item.category}
              className="object-cover w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 pointer-events-none">
              <span className="text-[11px] text-[#f97316] bg-zinc-950 px-2 py-0.5 rounded-none font-semibold inline-block self-start">
                {item.category}
              </span>
              <p className="text-xs text-white mt-1 font-medium flex items-center gap-1">
                Büyüt <Eye className="w-3 h-3 text-[#f97316]" />
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[85vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/80 hover:bg-[#f97316] text-white border border-zinc-800 transition-colors"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={selectedImage} alt="Traffic Floor Büyük Görünüm" className="object-contain max-w-full max-h-[85vh]" />
          </div>
        </div>
      )}
    </>
  );
}
