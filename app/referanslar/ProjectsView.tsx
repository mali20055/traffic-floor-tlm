"use client";

import React, { useState } from "react";
import { FileCheck, X } from "lucide-react";
import type { Project } from "@/lib/types";

const FILTERS = [
  { id: "all", label: "Tüm Sektörler" },
  { id: "Fabrika", label: "Fabrikalar" },
  { id: "Depo", label: "Depolar & Lojistik" },
  { id: "Sağlık", label: "Sağlık" },
  { id: "Mağaza", label: "Mağaza / Perakende" },
  { id: "Otomotiv", label: "Otomotiv" },
  { id: "Spor", label: "Spor" },
];

export default function ProjectsView({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<string>("all");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const visible = projects.filter((p) => filter === "all" || p.category === filter);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-4 border-b border-zinc-800">
        <div className="space-y-1">
          <p className="text-xs text-[#f97316] tracking-wide uppercase font-semibold">Referanslar</p>
          <h1 className="font-display font-black text-3xl text-white">Tamamlanan Projeler</h1>
        </div>

        <div className="flex flex-wrap gap-1 bg-[#16181b] p-1 border border-zinc-800 rounded-none text-[12px]">
          {FILTERS.map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id)}
              className={`px-3 py-1.5 rounded-none transition-all cursor-pointer font-medium ${
                filter === item.id ? "bg-[#f97316] text-white" : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((proj) => (
          <div key={proj.slug} className="bg-[#16181b] border border-zinc-800 rounded-none overflow-hidden flex flex-col justify-between">
            <div>
              <div className="relative h-48 bg-zinc-950 overflow-hidden">
                <img src={proj.coverImage} alt={proj.title} className="object-cover w-full h-full opacity-90" />
                <div className="absolute top-3 left-3 bg-zinc-950/90 px-2.5 py-1 rounded-none text-[10px] font-mono text-zinc-300 border border-zinc-800">
                  {proj.location}
                </div>
                <div className="absolute top-3 right-3 bg-[#f97316] text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded-none">
                  {proj.scale || "Endüstriyel"}
                </div>
              </div>
              <div className="p-4 space-y-2">
                <p className="text-xs text-[#f97316] uppercase font-semibold tracking-wide">{proj.category}</p>
                <h3 className="text-sm font-bold text-white">{proj.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{proj.description}</p>
              </div>
            </div>

            <div className="px-4">
              <p className="text-xs text-zinc-500 mb-1">Uygulama görselleri</p>
              <div className="grid grid-cols-3 gap-1">
                {(proj.gallery ?? []).map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setLightbox(img)}
                    className="aspect-video bg-zinc-900 border border-zinc-800 cursor-pointer overflow-hidden max-h-12"
                  >
                    <img src={img} alt="Açık Detay" className="object-cover w-full h-full opacity-70 hover:opacity-100" />
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-dashed border-zinc-800 mt-4">
              <div className="flex flex-col gap-1 text-xs text-zinc-300">
                <span className="text-zinc-500">Kullanılan ürünler:</span>
                <span className="text-[#f97316] text-sm font-semibold">{(proj.productsUsed ?? []).join(", ")}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#16181b]/60 border border-zinc-800/80 rounded-none p-6 flex items-start gap-4">
        <span className="p-3 bg-[#f97316]/10 text-[#f97316] rounded-none shrink-0 mt-1"><FileCheck className="w-6 h-6" /></span>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-white">Uygulama ve Montaj</h4>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Projeler, teknik ekibimizin denetiminde montaj edilerek tamamlanmıştır. Tesisinizde zemin incelemesi ve saha keşfi için bizimle iletişime geçebilirsiniz.
          </p>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-4xl max-h-[85vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/80 hover:bg-[#f97316] text-white border border-zinc-800 transition-colors"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={lightbox} alt="Traffic Floor Referans Görseli" className="object-contain max-w-full max-h-[85vh]" />
          </div>
        </div>
      )}
    </div>
  );
}
