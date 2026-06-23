import React from "react";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import DocumentsView from "./DocumentsView";
import { getTechnicalDocuments } from "@/sanity/lib/fetch";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Teknik Dokümanlar & Şartnameler | Traffic Floor",
  description:
    "Traffic Floor endüstriyel zemin sistemleri katalogları, teknik şartnameleri ve CE / CSTB sertifikaları. Proje ihalelerinizde kullanabileceğiniz tescilli belgeler.",
};

export default async function DocumentsPage() {
  const documents = await getTechnicalDocuments();
  return (
    <div className="min-h-screen bg-[#0f1113] flex flex-col selection:bg-[#f97316] selection:text-white text-[#e2e8f0]">
      <SiteHeader active="documents" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 space-y-8 animate-fadeIn">
        <div className="border-l-4 border-[#f97316] pl-3">
          <p className="text-xs text-[#f97316] tracking-wide uppercase font-semibold">Dokümanlar</p>
          <h1 className="font-display font-black text-3xl text-white">Teknik Dokümanlar ve Şartnameler</h1>
        </div>

        <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
          Proje şartnamelerinizde kullanabileceğiniz kataloglar, teknik şartnameler ve sertifikalar aşağıdadır.
        </p>

        <DocumentsView documents={documents} />
      </main>

      <SiteFooter />
    </div>
  );
}
