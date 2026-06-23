# Traffic Floor

Traffic Floor (Akademik İnşaat) için endüstriyel zemin kaplama tanıtım sitesi —
Fransız **Groupe TLM**'nin Türkiye distribütörlüğü.

Next.js (App Router) + TypeScript + Tailwind CSS ile geliştirilmiştir.

## Yerelde Çalıştırma

**Gereksinim:** Node.js 18+

1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
2. `.env.example` dosyasını `.env.local` olarak kopyalayıp Sanity değerlerini girin
   (bkz. `.env.example`).
3. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```
4. Site: `http://localhost:3000` — Admin paneli (Sanity Studio): `http://localhost:3000/studio`

## İçerik (Sanity CMS)

Tüm içerik **Sanity CMS**'te yönetilir ve siteye GROQ sorgularıyla canlı çekilir.
İçerik tipleri: Ürün, Referans Proje, Blog Yazısı (Portable Text), Galeri Görseli,
Teknik Doküman, S.S.S.

- Şemalar: `sanity/schemaTypes/`
- GROQ sorguları ve veri çekme: `sanity/lib/`
- İçerik tipi (TypeScript) tanımları: `lib/types.ts`
- Studio (admin panel): `/studio` route'una gömülüdür

İçerik düzenleme `/studio` üzerinden yapılır; yayınlanan değişiklikler siteye en geç
60 saniye içinde (ISR) yansır.
