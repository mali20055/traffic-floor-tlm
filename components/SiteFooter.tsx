import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import { getProducts } from "@/sanity/lib/fetch";

const NAV_LINKS = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Hakkımızda", href: "/hakkimizda" },
  { label: "Ürünler", href: "/urunler" },
  { label: "Referanslar", href: "/referanslar" },
  { label: "Görsel Galeri", href: "/galeri" },
  { label: "S.S.S.", href: "/sss" },
];

/** Shared corporate B2B footer. Solutions column is pulled live from Sanity. */
export default async function SiteFooter() {
  const products = await getProducts().catch(() => []);
  const solutions = products.slice(0, 4).map((p) => ({ label: p.title, slug: p.slug }));

  return (
    <footer className="bg-[#0b0c0e] border-t border-zinc-800 mt-16 text-xs text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: Brand */}
        <div className="space-y-4">
          <Logo size="sm" showTagline={false} />
          <p className="text-[12px] leading-relaxed text-zinc-400">
            Fransız Groupe TLM endüstriyel zemin sistemlerinin Türkiye distribütörü. Zemin ve duvar
            kaplama çözümleri sunar.
          </p>
          <p className="text-[11px] text-zinc-600">
            © {new Date().getFullYear()} Traffic Floor. Tüm hakları saklıdır.
          </p>
        </div>

        {/* Col 2: Sitemap */}
        <div className="space-y-3">
          <h4 className="text-white text-[13px] font-semibold">
            Site Haritası
          </h4>
          <div className="flex flex-col space-y-1.5 text-[12px] text-zinc-400">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Col 3: Solutions (Sanity'den dinamik) */}
        <div className="space-y-3">
          <h4 className="text-white text-[13px] font-semibold">
            Zemin Çözümleri
          </h4>
          <div className="flex flex-col space-y-1.5 text-[12px] text-zinc-400">
            {solutions.map((s) => (
              <Link key={s.slug} href={`/urunler/${s.slug}`} className="hover:text-white transition-colors">
                {s.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Col 4: Legal / Distribution */}
        <div className="space-y-3">
          <h4 className="text-white text-[13px] font-semibold">
            Tescil ve Dağıtım
          </h4>
          <div className="space-y-2 text-[12px] text-zinc-400">
            <p className="leading-relaxed">
              Traffic Floor, Akademik İnşaat Paz. San. Tic. Ltd. Şti. markasıdır ve Groupe TLM
              (Fransa) resmi distribütörüdür.
            </p>
            <div className="pt-1">
              <span className="inline-block bg-zinc-950 border border-zinc-800 text-[11px] px-2 py-0.5 text-emerald-400">
                Yetkili Distribütör
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
