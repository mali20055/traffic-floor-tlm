import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Building2,
  ChevronRight,
  ShieldCheck,
  Settings,
  FileCheck,
  Check,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import HeroSlider from "@/components/HeroSlider";
import { getProjects, getBlogPosts } from "@/sanity/lib/fetch";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Traffic Floor — Endüstriyel Zemin Sistemleri | Akademik İnşaat",
  description:
    "Fransız Groupe TLM güvencesiyle ağır trafik ve yoğun forklift için kilitlemeli PVC zemin karoları, reçine sistemleri ve hijyenik duvar/tavan kaplamaları. Türkiye resmi distribütörü.",
};

const CATEGORIES = [
  {
    id: "heavy",
    title: "Ağır Trafik ve Forklift Zeminleri",
    desc: "7 mm kilitli PVC karolar. Yapıştırıcısız döşenen, forklift trafiğine ve aşınmaya dayanıklı sanayi zeminleri.",
    badge: "CSTB U4P4",
    gradient: "from-[#2a1505] to-[#16181b]",
  },
  {
    id: "light-medium",
    title: "Reçine ve Hafif-Orta Trafik",
    desc: "Laboratuvar, hastane ve gıda alanları için tozumayan, kolay temizlenen reçine zemin kaplamaları.",
    badge: "Gıda Onaylı",
    gradient: "from-[#102027] to-[#16181b]",
  },
  {
    id: "wall-ceiling",
    title: "Duvar Koruma ve Tavan Sistemleri",
    desc: "Hastane koridorları için darbe panelleri ve nem önleyici hijyenik tavan profilleri.",
    badge: "Antibakteriyel",
    gradient: "from-[#1f1209] to-[#16181b]",
  },
];

const TRUST_ITEMS = [
  {
    icon: Settings,
    title: "Üretimi Durdurmaz",
    p: "Karolar yapıştırıcısız ve kuru döşenir. Tesis çalışırken uygulanır.",
  },
  {
    icon: ShieldCheck,
    title: "10 Yıl Garanti",
    p: "Traficline 7 mm karolar aşınmaya karşı 10 yıl fabrika garantilidir.",
  },
  {
    icon: FileCheck,
    title: "CE ve CSTB Belgeli",
    p: "EN 14041 normlarına ve CSTB performans testlerine uygundur.",
  },
  {
    icon: Building2,
    title: "Akademik İnşaat Güvencesi",
    p: "Türkiye distribütörü Akademik İnşaat'ın saha ve montaj desteğiyle.",
  },
];

export default async function HomePage() {
  const [projects, blogs] = await Promise.all([getProjects(), getBlogPosts()]);
  return (
    <div className="min-h-screen bg-[#0f1113] flex flex-col selection:bg-[#f97316] selection:text-white text-[#e2e8f0]">
      <SiteHeader active="home" />

      {/* HERO SLIDER (tam genişlik) */}
      <HeroSlider />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-12">
        <div className="space-y-16 animate-fadeIn">
          {/* ÜRÜN KATEGORİLERİ */}
          <div className="space-y-6">
            <div className="border-l-4 border-[#f97316] pl-3">
              <p className="text-xs text-[#f97316] tracking-wide uppercase font-semibold">Ürün Grupları</p>
              <h2 className="font-display font-black text-2xl text-white">Zemin Çözümlerimiz</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href="/urunler"
                  className="group relative overflow-hidden border border-zinc-800 hover:border-[#f97316] transition-all flex flex-col justify-between min-h-[260px]"
                >
                  {/* Arka plan (şimdilik gradient — kategori görseli buraya gelebilir) */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} transition-transform duration-500 group-hover:scale-105`} />
                  <div className="absolute inset-0 bg-[#0f1113]/30 group-hover:bg-[#0f1113]/10 transition-colors" />

                  <div className="relative p-6 flex flex-col justify-between h-full">
                    <span className="self-start text-[11px] bg-black/40 text-zinc-200 px-2.5 py-1 border border-white/10 backdrop-blur-sm">
                      {cat.badge}
                    </span>
                    <div className="space-y-2 mt-auto pt-8">
                      <h3 className="text-lg font-bold text-white">{cat.title}</h3>
                      <p className="text-sm text-zinc-300 leading-relaxed">{cat.desc}</p>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#f97316] pt-2 group-hover:gap-2 transition-all">
                        Ürünleri İncele
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* NEDEN TRAFFIC FLOOR */}
          <div className="bg-[#16181b] border border-zinc-800 p-8 space-y-8">
            <div className="border-l-4 border-[#f97316] pl-3">
              <p className="text-xs text-[#f97316] tracking-wide uppercase font-semibold">Güvence</p>
              <h2 className="font-display font-black text-2xl text-white">Neden Traffic Floor?</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {TRUST_ITEMS.map((item, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="w-10 h-10 bg-[#f97316]/10 flex items-center justify-center border border-[#f97316]/20">
                    <item.icon className="w-5 h-5 text-[#f97316]" />
                  </div>
                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.p}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SEÇİLİ REFERANSLAR */}
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <div className="border-l-4 border-[#f97316] pl-3">
                <p className="text-xs text-[#f97316] tracking-wide uppercase font-semibold">Referanslar</p>
                <h2 className="font-display font-black text-2xl text-white">Tamamlanan Projeler</h2>
              </div>
              <Link
                href="/referanslar"
                className="hidden sm:flex items-center gap-1 text-sm text-zinc-300 hover:text-white transition-colors"
              >
                Tümünü Gör <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.slice(0, 3).map((proj) => (
                <Link
                  key={proj.slug}
                  href="/referanslar"
                  className="group bg-[#16181b] border border-zinc-800 overflow-hidden hover:border-[#f97316] transition-all flex flex-col"
                >
                  <div className="relative h-48 w-full bg-zinc-950 overflow-hidden">
                    <img
                      src={proj.coverImage}
                      alt={proj.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Hover overlay: proje adı + sektör */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f1113] via-[#0f1113]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                      <span className="text-[11px] text-[#f97316] uppercase font-semibold tracking-wide">{proj.category}</span>
                      <h3 className="text-base font-bold text-white">{proj.title}</h3>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#f97316] uppercase font-semibold tracking-wide">{proj.category}</span>
                      {proj.location && <span className="text-zinc-500">{proj.location}</span>}
                    </div>
                    <h3 className="text-sm font-bold text-white group-hover:text-[#f97316] transition-colors">{proj.title}</h3>
                    <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">{proj.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* BLOG */}
          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <div className="border-l-4 border-[#f97316] pl-3">
                <p className="text-xs text-[#f97316] tracking-wide uppercase font-semibold">Blog</p>
                <h2 className="font-display font-black text-2xl text-white">Güncel Yazılar</h2>
              </div>
              <Link href="/blog" className="text-sm text-zinc-300 hover:text-white transition-colors">
                Tüm Yazılar
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.slice(0, 3).map((blog) => (
                <div key={blog.slug} className="bg-[#16181b] border border-zinc-800 overflow-hidden hover:border-[#f97316] transition-all flex flex-col justify-between">
                  <div>
                    <div className="relative h-40 bg-zinc-950 overflow-hidden">
                      <img src={blog.coverImage} alt={blog.title} className="object-cover w-full h-full" />
                      <span className="absolute bottom-3 left-3 bg-[#f97316] text-white text-[11px] font-semibold px-2 py-0.5">
                        {blog.category}
                      </span>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="flex items-center gap-3 text-xs text-zinc-400">
                        <span>{blog.date}</span>
                        <span>•</span>
                        <span>{blog.readTime}</span>
                      </div>
                      <h3 className="text-sm font-bold text-white hover:text-[#f97316] transition-colors leading-snug line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">{blog.summary}</p>
                    </div>
                  </div>
                  <div className="p-4 pt-0">
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="text-sm font-semibold text-[#f97316] hover:underline flex items-center gap-1 pt-3 border-t border-zinc-800 w-full"
                    >
                      Devamını Oku <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ALT CTA */}
          <div className="bg-gradient-to-br from-[#16181b] to-[#0f1113] border border-[#f97316]/30 p-8 flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="space-y-2 text-center lg:text-left max-w-2xl">
              <h3 className="font-display font-black text-2xl text-white">Zemin projeniz için teklif alın</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Ücretsiz numune, yerinde keşif ve metraj için ekibimiz hazır. Talebinizi iletin, kısa sürede dönüş yapalım.
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center lg:justify-start pt-2 text-sm text-zinc-400">
                <span className="flex items-center gap-1"><Check className="w-4 h-4 text-[#f97316]" /> Ücretsiz numune</span>
                <span className="flex items-center gap-1"><Check className="w-4 h-4 text-[#f97316]" /> Yerinde keşif</span>
                <span className="flex items-center gap-1"><Check className="w-4 h-4 text-[#f97316]" /> Şartname desteği</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full lg:w-auto">
              <Link
                href="/iletisim"
                className="bg-[#f97316] hover:bg-[#ea580c] text-white text-sm font-semibold px-6 py-3 text-center transition-colors"
              >
                Teklif Al
              </Link>
              <Link
                href="/dokumanlar"
                className="border border-zinc-700 bg-[#16181b] hover:bg-zinc-800 text-white text-sm font-semibold px-6 py-3 text-center transition-colors"
              >
                Katalogları İndir
              </Link>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
