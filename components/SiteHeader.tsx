"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Menu, X, ChevronRight } from "lucide-react";
import Logo from "./Logo";

type NavItem = { id: string; label: string; href: string };

const NAV: NavItem[] = [
  { id: "home", label: "Anasayfa", href: "/" },
  { id: "about", label: "Hakkımızda", href: "/hakkimizda" },
  { id: "products", label: "Ürünler", href: "/urunler" },
  { id: "projects", label: "Referanslar", href: "/referanslar" },
  { id: "gallery", label: "Galeri", href: "/galeri" },
  { id: "faq", label: "S.S.S.", href: "/sss" },
  { id: "documents", label: "Dokümanlar", href: "/dokumanlar" },
  { id: "blog", label: "Blog", href: "/blog" },
  { id: "contact", label: "İletişim", href: "/iletisim" },
];

/**
 * Shared corporate header (trust banner + sticky nav). Pass `active` with the
 * id of the current section to highlight it.
 */
export default function SiteHeader({ active }: { active?: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Banner / Trust Row — sade: solda 1 bilgi, sağda iletişim */}
      <div className="bg-[#16181b] border-b border-zinc-800 text-[12px] py-2 px-4 text-zinc-400">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#f97316]" /> Groupe TLM Türkiye Resmi Distribütörü
          </span>
          <a href="tel:+902164443230" className="text-zinc-300 hover:text-white transition-colors">
            +90 (216) 444 32 30
          </a>
        </div>
      </div>

      {/* Main Corporate Header */}
      <header className="sticky top-0 z-50 bg-[#16181b]/95 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Brand wordmark */}
          <Link href="/" className="group flex items-center">
            <Logo />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-sm">
            {NAV.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={`px-3 py-2 transition-colors font-medium ${
                  active === link.id
                    ? "text-[#f97316] border-b-2 border-[#f97316] pb-1.5"
                    : "text-zinc-400 hover:text-[#f97316]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Section CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/iletisim"
              className="bg-[#f97316] hover:bg-[#ea580c] text-white text-sm font-semibold px-5 py-2.5 transition-colors flex items-center gap-1.5 group"
            >
              Teklif Al
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-300 hover:text-white"
            aria-label="Menüyü aç/kapat"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#16181b] border-b border-zinc-800 px-4 py-4 flex flex-col gap-1.5 text-sm max-h-[85vh] overflow-y-auto">
            {NAV.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2.5 px-3 text-left font-medium transition-colors ${
                  active === link.id
                    ? "bg-[#0f1113] text-[#f97316] border-l-4 border-[#f97316]"
                    : "text-zinc-300 hover:bg-zinc-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-zinc-800 pt-4 my-2">
              <Link
                href="/iletisim"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-2.5 px-4 bg-[#f97316] text-white font-semibold text-center"
              >
                Teklif Al
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
