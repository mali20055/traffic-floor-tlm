import React, { Suspense } from "react";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ContactView from "./ContactView";

export const metadata: Metadata = {
  title: "İletişim & Teklif Talebi | Traffic Floor",
  description:
    "Traffic Floor teknik ekibiyle iletişime geçin. Ücretsiz numune, yerinde keşif ve endüstriyel zemin şartname analizi için hızlı teklif talebi oluşturun.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0f1113] flex flex-col selection:bg-[#f97316] selection:text-white text-[#e2e8f0]">
      <SiteHeader active="contact" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 space-y-8 animate-fadeIn">
        <div className="border-l-4 border-[#f97316] pl-3">
          <p className="text-xs text-[#f97316] tracking-wide uppercase font-semibold">İletişim</p>
          <h1 className="font-display font-black text-3xl text-white">Bize Ulaşın</h1>
        </div>

        <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
          Teklif, ürün numunesi ve yerinde keşif için formu doldurun veya doğrudan telefon ve e-posta ile iletişime geçin.
        </p>

        <Suspense fallback={<div className="text-xs font-mono text-zinc-500">Form yükleniyor…</div>}>
          <ContactView />
        </Suspense>
      </main>

      <SiteFooter />
    </div>
  );
}
