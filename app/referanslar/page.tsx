import React from "react";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProjectsView from "./ProjectsView";
import { getProjects } from "@/sanity/lib/fetch";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Referanslar — Endüstriyel Saha Uygulamaları | Traffic Floor",
  description:
    "Otomotiv fabrikaları, lojistik depoları, hastaneler ve spor tesislerinde tamamlanan Traffic Floor endüstriyel zemin kaplama referans projeleri.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <div className="min-h-screen bg-[#0f1113] flex flex-col selection:bg-[#f97316] selection:text-white text-[#e2e8f0]">
      <SiteHeader active="projects" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 animate-fadeIn">
        <ProjectsView projects={projects} />
      </main>

      <SiteFooter />
    </div>
  );
}
