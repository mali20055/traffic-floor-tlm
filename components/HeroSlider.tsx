"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Tam ekran ana sayfa hero slider'ı.
 *
 * GÖRSEL: Arka plan fotoğrafları Sanity'deki gerçek referans projelerinden
 * (industries, garages …) `images` prop'u ile beslenir. Görsel gelmezse ilgili
 * slide'da `gradient` placeholder gösterilir.
 */
type Slide = {
  title: string;
  subtitle: string;
  cta: { label: string; href: string };
  /** Arka plan fotoğrafı (public/ altına göre yol). Boşsa gradient gösterilir. */
  image?: string;
  /** image yokken kullanılacak placeholder gradient. */
  gradient: string;
};

const SLIDES: Slide[] = [
  {
    title: "Endüstriyel Zeminlerde Fransız Kalitesi",
    subtitle: "1978'den bu yana TLM mühendisliği, Türkiye'de Akademik İnşaat güvencesiyle.",
    cta: { label: "Ürünleri İncele", href: "/urunler" },
    image: undefined,
    gradient: "linear-gradient(135deg, #1c1f24 0%, #0f1113 55%, #2a1505 100%)",
  },
  {
    title: "Fabrikadan Mağazaya Her Zemin",
    subtitle: "Forklift trafiğinden spor salonlarına kadar 10 farklı uygulama alanı.",
    cta: { label: "Referansları Gör", href: "/referanslar" },
    image: undefined,
    gradient: "linear-gradient(135deg, #14181c 0%, #0f1113 50%, #102027 100%)",
  },
  {
    title: "Kuru Döşeme, Üretimi Durdurmadan",
    subtitle: "Yapıştırıcısız kilit sistemi sayesinde tesis çalışırken hızlı döşeme.",
    cta: { label: "Teklif Al", href: "/iletisim" },
    image: undefined,
    gradient: "linear-gradient(135deg, #1a1410 0%, #0f1113 55%, #2a1505 100%)",
  },
];

const AUTOPLAY_MS = 5000;

/**
 * @param images Sanity'den gelen gerçek arka plan fotoğrafları. Sırayla
 * slide'lara dağıtılır; eksik kalan slide'lar gradient gösterir.
 */
export default function HeroSlider({ images = [] }: { images?: string[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Sanity görsellerini slide'lara bağla (varsa hardcoded image'i ezer).
  const slides = SLIDES.map((s, i) => ({ ...s, image: images[i] ?? s.image }));
  const count = slides.length;

  const go = useCallback((dir: number) => {
    setIndex((prev) => (prev + dir + count) % count);
  }, [count]);

  const goTo = useCallback((i: number) => setIndex(i), []);

  // Otomatik geçiş — hover'da duraklar.
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => setIndex((p) => (p + 1) % count), AUTOPLAY_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, count]);

  const slide = slides[index];

  return (
    <section
      className="relative w-full h-[88vh] min-h-[520px] max-h-[860px] overflow-hidden bg-[#0f1113] border-b border-zinc-800"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {/* Slides */}
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Arka plan: gerçek görsel varsa Image, yoksa gradient placeholder */}
          {slide.image ? (
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0" style={{ background: slide.gradient }} />
          )}

          {/* Okunabilirlik için koyu overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1113] via-[#0f1113]/70 to-[#0f1113]/40" />
          <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:22px_22px]" />
        </motion.div>
      </AnimatePresence>

      {/* İçerik */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-2xl space-y-5"
          >
            <h1 className="font-display font-black text-3xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
              {slide.title}
            </h1>
            <p className="text-zinc-300 text-base md:text-lg leading-relaxed max-w-xl">
              {slide.subtitle}
            </p>
            <div className="pt-2">
              <Link
                href={slide.cta.href}
                className="inline-flex items-center gap-2 bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold text-sm py-3.5 px-7 transition-colors"
              >
                {slide.cta.label}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Sol / sağ ok butonları */}
      <button
        onClick={() => go(-1)}
        aria-label="Önceki slayt"
        className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-black/40 hover:bg-[#f97316] text-white border border-white/15 backdrop-blur-sm transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Sonraki slayt"
        className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 p-2.5 bg-black/40 hover:bg-[#f97316] text-white border border-white/15 backdrop-blur-sm transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Nokta indikatörleri */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`${i + 1}. slayda git`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-8 bg-[#f97316]" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
