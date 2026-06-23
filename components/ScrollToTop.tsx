"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Sayfa belirli bir mesafe (400px) aşağı kaydırıldığında sağ alt köşede görünen
 * "yukarı çık" butonu. Tüm sayfalarda layout üzerinden render edilir.
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Sayfanın başına dön"
      className="fixed bottom-6 right-6 z-50 p-3 bg-[#f97316] hover:bg-[#ea580c] text-white shadow-lg transition-colors animate-fadeIn"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
