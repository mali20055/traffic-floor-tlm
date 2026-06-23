import React from "react";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import GalleryGrid from "./GalleryGrid";
import { getGalleryItems } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Saha Uygulama Galerisi | Traffic Floor",
  description:
    "Tamamlanan ağır hizmet, gıda üretimi, temiz oda ve kaymaz zemin sahalarımızdan montaj ve detay görselleri.",
};

export const revalidate = 60;

export default async function GalleryPage() {
  const items = await getGalleryItems();

  return (
    <div className="min-h-screen bg-[#0f1113] flex flex-col selection:bg-[#f97316] selection:text-white text-[#e2e8f0]">
      <SiteHeader active="gallery" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 space-y-8 animate-fadeIn">
        <div className="border-l-4 border-[#f97316] pl-3">
          <p className="text-xs text-[#f97316] tracking-wide uppercase font-semibold">Galeri</p>
          <h1 className="font-display font-black text-3xl text-white">Saha Uygulama Galerisi</h1>
        </div>

        <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
          Tamamlanan projelerden montaj ve detay görselleri. Büyütmek için görsellere tıklayın.
        </p>

        <GalleryGrid items={items} />
      </main>

      <SiteFooter />
    </div>
  );
}
