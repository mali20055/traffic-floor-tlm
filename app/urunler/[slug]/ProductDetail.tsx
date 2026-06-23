"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Download, X } from "lucide-react";
import type { Product, TechnicalDocument } from "@/lib/types";

export default function ProductDetail({
  product,
  documents,
}: {
  product: Product;
  documents: TechnicalDocument[];
}) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [downloadLogs, setDownloadLogs] = useState<Record<string, number>>({});

  // "Teknik Katalog İndir" hedefi: ürünün kendi geçerli pdfUrl'i yoksa
  // Sanity'deki gerçek katalog dokümanına (fileUrl) düş.
  const catalogUrl =
    (product.pdfUrl && product.pdfUrl.includes("cdn.sanity.io") ? product.pdfUrl : null) ??
    documents.find((d) => d.category === "catalogue" && d.fileUrl)?.fileUrl ??
    null;

  const triggerDownload = (id: string, title: string) => {
    setDownloadLogs((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    alert(`"${title}" dosyası henüz yüklenmedi.`);
  };

  return (
    <div className="space-y-8">
      <Link href="/urunler" className="inline-flex items-center gap-1 text-sm font-medium text-[#f97316] hover:underline">
        ← Tüm Ürünler
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Photo & gallery */}
        <div className="space-y-4">
          <div className="relative h-96 w-full bg-[#0f1113] border border-zinc-800 rounded-none overflow-hidden shadow-2xl">
            <img src={product.coverImage} alt={product.title} className="object-cover w-full h-full" />
            <div className="absolute top-4 left-4 bg-zinc-950/90 px-3 py-1 rounded-none font-mono text-[10px] text-[#f97316] border border-zinc-800">
              {product.frenchModel}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {product.gallery.map((img, i) => (
              <div
                key={i}
                onClick={() => setLightbox(img)}
                className="aspect-[4/3] bg-zinc-950 border border-zinc-800 overflow-hidden cursor-pointer hover:border-[#f97316]"
              >
                <img src={img} alt={`${product.title} Galeri ${i + 1}`} className="object-cover w-full h-full opacity-80 hover:opacity-100" />
              </div>
            ))}
          </div>

          <div className="bg-[#16181b] border border-zinc-800 p-5 rounded-none space-y-3">
            <h3 className="text-sm font-bold text-[#f97316]">Sertifikalar</h3>
            <div className="flex flex-wrap gap-2">
              {product.specs.certifications.map((st, i) => (
                <span key={i} className="text-xs font-mono bg-zinc-950 text-zinc-300 border border-zinc-800 px-2.5 py-1 rounded-none">
                  {st}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Tech specs */}
        <div className="space-y-6">
          <div>
            <span className="inline-block text-xs font-semibold text-[#f97316] bg-[#f97316]/10 px-2.5 py-1 rounded-none">
              {product.tag}
            </span>
            <h1 className="font-display font-black text-2xl md:text-3xl text-white mt-2">{product.title}</h1>
            <p className="text-zinc-400 text-sm leading-relaxed mt-2">{product.shortDescription}</p>
          </div>

          <div className="border border-zinc-800 rounded-none overflow-hidden">
            <div className="bg-[#16181b] px-4 py-2 text-xs font-mono font-bold text-white border-b border-zinc-800 tracking-wider uppercase">
              TEKNİK VERİLER
            </div>
            <table className="w-full text-xs font-sans text-[#E2E8F0]">
              <tbody>
                <tr className="bg-zinc-900/50">
                  <td className="px-4 py-2.5 font-mono text-zinc-400 border-r border-zinc-800 w-2/5">Malzeme Kalınlığı</td>
                  <td className="px-4 py-2.5 text-white font-medium">{product.specs.thickness}</td>
                </tr>
                <tr className="bg-zinc-950/20">
                  <td className="px-4 py-2.5 font-mono text-zinc-400 border-r border-zinc-800 w-2/5">Renk Seçenekleri</td>
                  <td className="px-4 py-2.5 text-white font-medium">{product.specs.colorOptions.join(", ")}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-[#f97316]">Avantajlar</h4>
              <ul className="text-sm space-y-1.5 text-zinc-300">
                {product.advantages.map((adv, idx) => (
                  <li key={idx} className="flex items-start gap-1 pb-1">
                    <span className="text-[#f97316] mt-0.5">•</span>
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-bold text-white">Uygulama Alanları</h4>
              <ul className="text-sm space-y-1.5 text-zinc-400">
                {product.applications.map((app, idx) => (
                  <li key={idx} className="flex items-start gap-1 pb-1">
                    <span className="text-zinc-500 mt-0.5">◼</span>
                    <span>{app}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-4 bg-[#16181b] border border-zinc-800 rounded-none flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="space-y-0.5 text-center sm:text-left">
              <p className="text-sm font-bold text-white">Bu ürün için teklif alın</p>
              <p className="text-xs text-zinc-400">Ücretsiz numune ve keşif dahildir.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              {catalogUrl && (
                <a
                  href={catalogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 border border-zinc-700 hover:border-[#f97316] text-white text-sm font-semibold px-5 py-2.5 rounded-none w-full sm:w-auto text-center transition-colors"
                >
                  <Download className="w-4 h-4" /> Teknik Katalog İndir
                </a>
              )}
              <Link
                href={`/iletisim?urun=${encodeURIComponent(product.title)}`}
                className="bg-[#f97316] hover:bg-[#ea580c] text-white text-sm font-semibold px-5 py-2.5 rounded-none w-full sm:w-auto text-center"
              >
                Teklif Al
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Technical catalogs */}
      <div className="pt-6 border-t border-zinc-800 space-y-4">
        <h3 className="text-base font-bold text-white">İlgili Teknik Dokümanlar</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((doc) => (
            <div key={doc.id} className="bg-[#16181b] p-4 border border-zinc-800 rounded-none flex justify-between items-center">
              <div className="space-y-1">
                <p className="text-sm text-white font-semibold">{doc.title}</p>
                <p className="text-xs font-mono text-zinc-400">{doc.code} • {doc.fileSize} • {doc.language}</p>
              </div>
              {doc.fileUrl ? (
                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#f97316] hover:bg-[#ea580c] text-white p-2.5 rounded-none"
                  aria-label={`${doc.title} indir`}
                >
                  <Download className="w-4 h-4" />
                </a>
              ) : (
                <button
                  onClick={() => triggerDownload(doc.id, doc.title)}
                  className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 p-2.5 rounded-none"
                  aria-label={`${doc.title} örnek indir`}
                >
                  <Download className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
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
            <img src={lightbox} alt={product.title} className="object-contain max-w-full max-h-[85vh]" />
          </div>
        </div>
      )}
    </div>
  );
}
