import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronRight } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getProducts } from "@/sanity/lib/fetch";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Ürünler — Endüstriyel Zemin Sistemleri | Traffic Floor",
  description:
    "Traficline ve Standline ağır trafik PVC karolar; Decoline, Visiofloor, Exelia tasarım zeminleri ve Fitline kauçuk spor zemini. CSTB ve CE sertifikalı endüstriyel zemin kataloğu.",
};

const CATEGORY_TITLES: Record<string, string> = {
  heavy: "Endüstriyel ve Ağır Trafik Zeminleri",
  "light-medium": "Tasarım, Ticari ve Spor Zeminleri",
  "wall-ceiling": "Duvar Koruma ve Tavan Sistemleri",
};

const CATEGORY_ORDER = ["heavy", "light-medium", "wall-ceiling"] as const;

export default async function ProductsPage() {
  const products = await getProducts();
  return (
    <div className="min-h-screen bg-[#0f1113] flex flex-col selection:bg-[#f97316] selection:text-white text-[#e2e8f0]">
      <SiteHeader active="products" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 space-y-8 animate-fadeIn">
        <div className="space-y-2">
          <p className="text-xs text-[#f97316] tracking-wide uppercase font-semibold">Ürünler</p>
          <h1 className="font-display font-black text-3xl text-white">Zemin Sistemleri</h1>
          <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
            Sektörlere göre zemin kaplama çözümlerimiz. Teknik bilgileri ve renk seçeneklerini görmek için bir ürün seçin.
          </p>
        </div>

        {CATEGORY_ORDER.map((catKey) => {
          const filtered = products.filter((p) => p.category === catKey);
          // Ürünü olmayan kategori başlığını gösterme.
          if (filtered.length === 0) return null;
          return (
            <div key={catKey} className="space-y-4">
              <div className="border-b border-zinc-800 pb-2">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#f97316] inline-block"></span>
                  {CATEGORY_TITLES[catKey]}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((prod) => (
                  <Link
                    key={prod.slug}
                    href={`/urunler/${prod.slug}`}
                    className="bg-[#16181b] border border-zinc-800 hover:border-[#f97316] rounded-none overflow-hidden cursor-pointer hover:shadow-lg transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="h-44 bg-zinc-950 relative overflow-hidden">
                        <img src={prod.coverImage} alt={prod.title} className="object-cover w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" />
                        <span className="absolute bottom-3 right-3 bg-zinc-900/95 text-[10px] font-mono px-2 py-0.5 text-zinc-300 border border-zinc-800">
                          {prod.frenchModel}
                        </span>
                      </div>
                      <div className="p-4 space-y-2">
                        <span className="inline-block text-[11px] font-semibold text-[#f97316] bg-[#f97316]/10 px-2 py-0.5">
                          {prod.tag || "Endüstriyel"}
                        </span>
                        <h3 className="text-sm font-bold text-white mt-1 group-hover:text-[#f97316] transition-colors">{prod.title}</h3>
                        <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">{prod.shortDescription}</p>
                      </div>
                    </div>
                    <div className="p-4 pt-0 border-t border-zinc-800 mt-2 flex justify-between items-center bg-zinc-900/10">
                      <span className="text-xs text-zinc-500">CE & CSTB belgeli</span>
                      <span className="text-sm text-[#f97316] group-hover:underline flex items-center gap-0.5 font-semibold">
                        İncele <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </main>

      <SiteFooter />
    </div>
  );
}
