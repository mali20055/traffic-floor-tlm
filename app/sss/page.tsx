import React from "react";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SssAccordion from "./SssAccordion";
import { getFaqItems } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular (S.S.S.) | Traffic Floor",
  description:
    "Endüstriyel zemin kaplama ömürleri, kuru döşeme uygulaması, yük kapasitesi, ESD ve garanti gibi en çok sorulan teknik soruların yanıtları.",
};

// Sanity'den gelen içerik için 60 saniyede bir yeniden doğrulama.
export const revalidate = 60;

export default async function SssPage() {
  const items = await getFaqItems();

  return (
    <div className="min-h-screen bg-[#0f1113] flex flex-col selection:bg-[#f97316] selection:text-white text-[#e2e8f0]">
      <SiteHeader active="faq" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 space-y-8 animate-fadeIn">
        <div className="border-l-4 border-[#f97316] pl-3">
          <p className="text-xs text-[#f97316] tracking-wide uppercase font-semibold">Destek</p>
          <h1 className="font-display font-black text-3xl text-white">Sıkça Sorulan Sorular</h1>
        </div>

        <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
          Zemin ömrü, uygulama, kilit sistemi ve sertifikalar hakkında en çok sorulan soruların yanıtları.
        </p>

        <SssAccordion items={items} />
      </main>

      <SiteFooter />
    </div>
  );
}
