"use client";

import React, { useState } from "react";
import { Download } from "lucide-react";
import type { TechnicalDocument } from "@/lib/types";

const CATEGORY_LABELS: Record<TechnicalDocument["category"], string> = {
  catalogue: "Katalog",
  specification: "Şartname",
  certificate: "Sertifika",
};

export default function DocumentsView({ documents }: { documents: TechnicalDocument[] }) {
  const [downloadLogs, setDownloadLogs] = useState<Record<string, number>>({});

  const triggerDownload = (id: string, title: string) => {
    setDownloadLogs((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    alert(`"${title}" dosyası henüz yüklenmedi.`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {documents.map((doc) => {
        const count = downloadLogs[doc.id] || 0;
        return (
          <div key={doc.id} className="bg-[#16181b] border border-zinc-800 p-5 rounded-none flex flex-col justify-between hover:border-zinc-700 transition-colors">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-none ${
                    doc.category === "catalogue"
                      ? "bg-sky-500/15 text-sky-400"
                      : doc.category === "specification"
                      ? "bg-[#f97316]/15 text-[#f97316]"
                      : "bg-emerald-500/15 text-emerald-400"
                  }`}
                >
                  {CATEGORY_LABELS[doc.category]}
                </span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">{doc.code}</span>
              </div>
              <h4 className="text-sm font-bold text-white leading-snug line-clamp-2">{doc.title}</h4>
              <p className="text-xs text-zinc-400">
                Boyut: <strong className="text-white">{doc.fileSize}</strong> · Dil: {doc.language}
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-zinc-800 flex justify-between items-center text-[10px] font-mono text-zinc-500">
              {doc.fileUrl ? (
                <>
                  <span>PDF hazır</span>
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#f97316] hover:bg-[#ea580c] text-white px-3 py-1.5 rounded-none font-bold transition-all flex items-center gap-1 shrink-0 uppercase tracking-wider text-[9px]"
                  >
                    <Download className="w-3.5 h-3.5" /> PDF İndir
                  </a>
                </>
              ) : (
                <>
                  <span>{count > 0 ? `${count} kez indirildi` : "Dosya yüklenmedi"}</span>
                  <button
                    onClick={() => triggerDownload(doc.id, doc.title)}
                    className="bg-zinc-700 hover:bg-zinc-600 text-white px-3 py-1.5 rounded-none font-bold transition-all flex items-center gap-1 shrink-0 uppercase tracking-wider text-[9px]"
                  >
                    <Download className="w-3.5 h-3.5" /> Örnek İndir
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
