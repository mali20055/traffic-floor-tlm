import React from "react";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Hakkımızda — Traffic Floor | Akademik İnşaat",
  description:
    "Traffic Floor, Akademik İnşaat çatısı altında Fransız Groupe TLM endüstriyel zemin sistemlerinin Türkiye resmi distribütörüdür. Avrupa standartlarında zemin ve duvar kaplama çözümleri.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0f1113] flex flex-col selection:bg-[#f97316] selection:text-white text-[#e2e8f0]">
      <SiteHeader active="about" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 space-y-12 animate-fadeIn">
        <div className="border-l-4 border-[#f97316] pl-3">
          <p className="text-xs text-[#f97316] tracking-wide uppercase font-semibold">Kurumsal</p>
          <h1 className="font-display font-black text-3xl md:text-4xl text-white">Hakkımızda</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4 text-sm text-zinc-300 leading-relaxed">
            <p>
              <strong>Traffic Floor</strong>, endüstriyel tesisler için kuru döşenen PVC karo ve reçine zemin sistemleri sunan bir markadır.
            </p>
            <p>
              Türkiye distribütörlüğünü üstlendiğimiz Fransız <strong>Groupe TLM</strong>, 1978 yılından bu yana homojen PVC modüler zemin karoları ve reçine zemin sistemleri üretmektedir.
            </p>
            <p>
              Markamız, <strong>Akademik İnşaat Paz. San. Tic. Ltd. Şti.</strong> çatısı altında faaliyet gösterir. Teknik ekibimiz keşif, montaj ve satış sonrası destek sağlar.
            </p>
            <div className="p-4 bg-[#16181b] border border-zinc-800">
              <h4 className="text-[#f97316] font-semibold text-sm mb-1">Misyonumuz</h4>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Tesislerin zemin yenileme sürecinde üretimi durdurmadan, dayanıklı ve uzun ömürlü zemin kaplamaları sunmak.
              </p>
            </div>
          </div>

          <div className="relative h-80 bg-zinc-950 border border-zinc-800 overflow-hidden flex flex-col justify-end p-6">
            <div className="absolute inset-0 bg-gradient-to-br from-[#2a1505] to-[#16181b]"></div>
            <div className="relative z-10 space-y-2">
              <h3 className="font-display text-white font-bold text-xl">Avrupa Standardında Üretim</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Zemin sistemlerimiz forklift trafiğine, nokta yüküne ve kimyasal temasa dayanıklıdır.
              </p>
            </div>
          </div>
        </div>

        {/* Quality Standard Badges */}
        <div className="bg-[#16181b] border border-zinc-800 rounded-none p-8 space-y-6">
          <h3 className="text-lg font-bold text-white">Sertifikalar</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="border border-zinc-800 p-4 rounded-none bg-[#0f1113]/60 flex items-start gap-3">
              <span className="p-2 bg-[#f97316]/10 text-[#f97316] font-bold text-sm font-mono">CE</span>
              <div>
                <h4 className="text-white font-semibold">EN 14041 Uygunluğu</h4>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">Avrupa yapı malzemeleri direktiflerine uygun kaymazlık ve düşük emisyon değerleri.</p>
              </div>
            </div>

            <div className="border border-zinc-800 p-4 rounded-none bg-[#0f1113]/60 flex items-start gap-3">
              <span className="p-2 bg-[#f97316]/10 text-[#f97316] font-bold text-sm font-mono">CSTB</span>
              <div>
                <h4 className="text-white font-semibold">U4 P4 E1 C2</h4>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">Ağır sanayi binaları için aşınma, nokta yükü ve kimyasal temas direnci tescili.</p>
              </div>
            </div>

            <div className="border border-zinc-800 p-4 rounded-none bg-[#0f1113]/60 flex items-start gap-3">
              <span className="p-2 bg-[#f97316]/10 text-[#f97316] font-bold text-sm font-mono">ISO</span>
              <div>
                <h4 className="text-white font-semibold">ISO 9001</h4>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">Kalite yönetim standardına uygun, geri dönüştürülebilir PVC üretimi.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
