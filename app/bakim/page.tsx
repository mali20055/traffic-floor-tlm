import React from "react";
import type { Metadata } from "next";
import { Wrench, Phone, Mail } from "lucide-react";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "Sitemiz Yenileniyor — Traffic Floor",
  description: "Traffic Floor web sitesi kısa süreliğine bakımda.",
  robots: { index: false, follow: false },
};

/**
 * Bakım modu sayfası. Middleware, MAINTENANCE_MODE=true iken tüm ziyaretçileri
 * (önizleme baypası olanlar hariç) bu sayfaya yönlendirir.
 */
export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-[#0f1113] text-[#e2e8f0] flex flex-col items-center justify-center px-6 text-center selection:bg-[#f97316] selection:text-white">
      <div className="max-w-lg w-full space-y-8 animate-fadeIn">
        <div className="flex justify-center">
          <Logo size="md" showTagline={false} />
        </div>

        <div className="w-14 h-14 mx-auto bg-[#f97316]/10 border border-[#f97316]/25 flex items-center justify-center">
          <Wrench className="w-7 h-7 text-[#f97316]" />
        </div>

        <div className="space-y-3">
          <h1 className="font-display font-black text-2xl md:text-3xl text-white">
            Sitemiz yenileniyor
          </h1>
          <p className="text-sm md:text-base text-zinc-400 leading-relaxed">
            Web sitemiz üzerinde çalışıyoruz ve çok kısa süre içinde yeniden yayında olacağız.
            Bu süreçte bize doğrudan ulaşabilirsiniz.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <a
            href="tel:+902164443230"
            className="inline-flex items-center justify-center gap-2 bg-[#f97316] hover:bg-[#ea580c] text-white text-sm font-semibold px-6 py-3 transition-colors"
          >
            <Phone className="w-4 h-4" /> +90 (216) 444 32 30
          </a>
          <a
            href="mailto:info@akademikinsaat.com.tr"
            className="inline-flex items-center justify-center gap-2 border border-zinc-700 hover:bg-white/5 text-white text-sm font-semibold px-6 py-3 transition-colors"
          >
            <Mail className="w-4 h-4" /> E-posta Gönder
          </a>
        </div>

        <p className="text-xs text-zinc-600 pt-4">
          © {new Date().getFullYear()} Traffic Floor — Akademik İnşaat
        </p>
      </div>
    </div>
  );
}
