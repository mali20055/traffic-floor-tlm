"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { MapPin, Phone, Mail } from "lucide-react";

const PRODUCT_OPTIONS = [
  "Genel Değerlendirme",
  "Ağır Trafik ve Forklift Zeminleri",
  "Reçine ve Hafif-Orta Trafik",
  "Duvar Koruma ve Tavan Sistemleri",
];

export default function ContactView() {
  const searchParams = useSearchParams();
  const urunParam = searchParams.get("urun");
  // Ürün sayfasından gelen ?urun=<başlık> değerini olduğu gibi kabul et.
  const matchedProduct = urunParam?.trim() || null;

  const [contactForm, setContactForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: matchedProduct ? `${matchedProduct} için teklif talebi` : "Teklif talebi",
    message: "",
    areaSize: "",
    productName: matchedProduct ?? "Genel Değerlendirme",
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [submittingForm, setSubmittingForm] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingForm(true);
    setTimeout(() => {
      setSubmittingForm(false);
      setContactSubmitted(true);
    }, 1200);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Form */}
      <div className="bg-[#16181b] border border-zinc-800 p-6 md:p-8 rounded-none shadow-md">
        {contactSubmitted ? (
          <div className="space-y-4 text-center py-10">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-none border border-emerald-500/20 flex items-center justify-center mx-auto text-xl font-bold">
              ✓
            </div>
            <div className="space-y-2">
              <h3 className="font-display font-medium text-lg text-white">Talebiniz alındı</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Talebiniz ekibimize iletildi. En kısa sürede sizinle iletişime geçeceğiz.
              </p>
            </div>
            <button
              onClick={() => setContactSubmitted(false)}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-4 py-2 text-sm font-semibold"
            >
              Yeni Talep Gönder
            </button>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <h3 className="text-sm font-bold text-[#f97316] border-b border-zinc-800 pb-2">
              Teklif Talep Formu
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400 font-medium">Ad Soyad *</label>
                <input
                  type="text"
                  required
                  className="w-full bg-[#0f1113] border border-zinc-800 focus:border-[#f97316] outline-none text-sm text-white p-3"
                  value={contactForm.name}
                  onChange={(e) => setContactForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Örn: Ahmet Yılmaz"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400 font-medium">Firma Adı *</label>
                <input
                  type="text"
                  required
                  className="w-full bg-[#0f1113] border border-zinc-800 focus:border-[#f97316] outline-none text-sm text-white p-3"
                  value={contactForm.company}
                  onChange={(e) => setContactForm((prev) => ({ ...prev, company: e.target.value }))}
                  placeholder="Örn: X Otomotiv Sanayi"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400 font-medium">E-posta *</label>
                <input
                  type="email"
                  required
                  className="w-full bg-[#0f1113] border border-zinc-800 focus:border-[#f97316] outline-none text-sm text-white p-3"
                  value={contactForm.email}
                  onChange={(e) => setContactForm((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="firma@kurum.com"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400 font-medium">Telefon *</label>
                <input
                  type="tel"
                  required
                  className="w-full bg-[#0f1113] border border-zinc-800 focus:border-[#f97316] outline-none text-sm text-white p-3"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="0532..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400 font-medium">Yaklaşık Alan (m²)</label>
                <input
                  type="number"
                  className="w-full bg-[#0f1113] border border-zinc-800 focus:border-[#f97316] outline-none text-sm text-white p-3"
                  value={contactForm.areaSize}
                  onChange={(e) => setContactForm((prev) => ({ ...prev, areaSize: e.target.value }))}
                  placeholder="Örn: 1500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400 font-medium">İlgilendiğiniz Ürün</label>
                <select
                  className="w-full bg-[#0f1113] border border-zinc-800 focus:border-[#f97316] outline-none text-sm text-white p-3"
                  value={contactForm.productName}
                  onChange={(e) => setContactForm((prev) => ({ ...prev, productName: e.target.value }))}
                >
                  {matchedProduct && !PRODUCT_OPTIONS.includes(matchedProduct) && (
                    <option value={matchedProduct}>{matchedProduct}</option>
                  )}
                  {PRODUCT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-zinc-400 font-medium">Notunuz</label>
              <textarea
                rows={4}
                className="w-full bg-[#0f1113] border border-zinc-800 focus:border-[#f97316] outline-none text-sm text-white p-3"
                value={contactForm.message}
                onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                placeholder="Örn: Mevcut epoksi zeminde forklift dönüşlerinde yırtılmalar var. Üretimi durdurmadan hafta sonu döşeme istiyoruz."
              />
            </div>

            <button
              type="submit"
              disabled={submittingForm}
              className="w-full bg-[#f97316] hover:bg-[#ea580c] disabled:bg-zinc-800 text-white text-sm font-semibold py-4 transition-colors"
            >
              {submittingForm ? "Gönderiliyor..." : "Teklif Talebini Gönder"}
            </button>
          </form>
        )}
      </div>

      {/* Address & map */}
      <div className="space-y-6">
        <div className="bg-[#16181b] border border-zinc-800 p-6 rounded-none space-y-4">
          <h4 className="text-sm font-bold text-[#f97316] border-b border-zinc-800 pb-2">İletişim Bilgileri</h4>

          <div className="space-y-4 text-sm text-zinc-300">
            <div className="flex gap-3 items-start">
              <MapPin className="w-4 h-4 text-[#f97316] shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-semibold">Adres</p>
                <p className="text-zinc-400 mt-1 leading-relaxed">
                  İçerenköy Mah. Karaman Çiftlik Yolu, Özlü Apt. No:42 Daire:7,<br />
                  Ataşehir / İstanbul
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-center">
              <Phone className="w-4 h-4 text-[#f97316] shrink-0" />
              <div>
                <p className="text-zinc-500 text-xs">Telefon</p>
                <a href="tel:+902164443230" className="text-white font-semibold hover:underline">+90 (216) 444 32 30</a>
              </div>
            </div>

            <div className="flex gap-3 items-center">
              <Mail className="w-4 h-4 text-[#f97316] shrink-0" />
              <div>
                <p className="text-zinc-500 text-xs">E-posta</p>
                <a href="mailto:info@akademikinsaat.com.tr" className="text-white font-semibold hover:underline">info@akademikinsaat.com.tr</a>
              </div>
            </div>
          </div>
        </div>

        {/* Google Maps embed (API key gerektirmeyen iframe yöntemi) */}
        <div className="bg-[#16181b] border border-zinc-800 p-2 rounded-none">
          <div className="h-72 w-full overflow-hidden border border-zinc-800">
            <iframe
              title="Traffic Floor — Ataşehir / İstanbul konumu"
              src="https://www.google.com/maps?q=İçerenköy+Mah.+Karaman+Çiftlik+Yolu+Özlü+Apt+No:42+Ataşehir+İstanbul&output=embed"
              width="100%"
              height="100%"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="border-0 grayscale-[35%] contrast-110"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
}
