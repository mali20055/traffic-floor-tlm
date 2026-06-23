/**
 * Traffic Floor — mock içerik temizliği + gerçek ürün/galeri seed'i
 * ------------------------------------------------------------------
 * Sanity dataset'indeki MOCK seed verisini siler ve TLM kataloğundan üretilen
 * gerçek ürün hatlarını + gerçek fotoğraflardan galeriyi oluşturur.
 *
 * Çalıştırma:
 *   node scripts/cleanup-content.mjs            # uygular
 *   DRY_RUN=1 node scripts/cleanup-content.mjs  # sadece ne yapacağını yazar
 *
 * Token: .env.local içinde SANITY_API_WRITE_TOKEN veya SANITY_API_READ_TOKEN
 * (yazma yetkili) okunur.
 */

import { createClient } from "@sanity/client";
import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DRY = process.env.DRY_RUN === "1";

async function loadEnv() {
  const env = {};
  try {
    const raw = await readFile(join(ROOT, ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Z_]+)\s*=\s*"?([^"\n]*)"?\s*$/);
      if (m) env[m[1]] = m[2];
    }
  } catch {}
  return env;
}

const img = (ref) => ({ _type: "image", asset: { _type: "reference", _ref: ref } });
const galImg = (ref) => ({ _type: "image", _key: Math.random().toString(36).slice(2, 12), asset: { _type: "reference", _ref: ref } });

// ----- Asset _id'leri (gerçek uygulama fotoğrafları) -----
const A = {
  industriesCover: "image-565567f97248a8578eeb4c32dec485a2300d4954-5312x2988-jpg",
  industries2: "image-21d22cdfe39b22ec00c23e3a5f6ed0222b30e214-5312x2988-jpg",
  garagesCover: "image-0c954c3b25b7a524bc6a170bfe393b90579823e3-5184x3456-jpg",
  garages2: "image-057ee3e088230a1762bea699d051c9acf75a630c-1280x720-jpg",
  garages3: "image-b4c54f2a0e45b285156cbccb01f737bc414186d6-1280x720-jpg",
  garages4: "image-b08f707bab70f62d2e581fbc10c372e70e47ce31-1280x720-jpg",
  fitnessCover: "image-4ecdda6e608608ad96f2b2be696f6a2466b05a36-2048x1536-jpg",
  fitness2: "image-cc38dded691378d0b75d5fdda2950d818cc812a1-2048x1536-jpg",
  fitness3: "image-b0e4a6f8a68abd5bcd1b53fcabc50f2189f2a872-3888x2592-jpg",
  showroomsCover: "image-8b52f06b7684207916ea617d557887c7ff59b719-640x480-jpg",
  showroomsWide: "image-4bce9e3f45b623e71e53eb0b78569e233bafe5cb-1920x978-jpg",
  showrooms3: "image-2194c0be6a398960435e857e64e4996bfa48e2ae-640x480-jpg",
  showrooms4: "image-7a54da6405ef890d041d43a0e5c59704c68913fa-1024x768-jpg",
  supermarketsCover: "image-7ae48ba308637817f4b7ad9481393d32f1c10666-1600x1200-jpg",
  supermarkets2: "image-25a4d613b22145cd9ad8f71abc46dd9b15e5d795-1600x1200-jpg",
  supermarkets3: "image-e24be8d92d2334946cd64f5415d064e78fd2c8b6-1600x1200-jpg",
  heklaCover: "image-1a8f958ea46ed02150b973dacac449f9b8927564-1536x2048-jpg",
  scaniaCover: "image-b210725d73d6da160ef148a7e6951f7d7b4b0b6b-480x640-jpg",
};

// ----- Silinecekler -----
const DELETE_IDS = [
  // Mock projeler (uydurma firma referansları)
  "project-tofas-fiat-otomotiv",
  "project-vestel-manisa-lojistik",
  "project-acibadem-altunizade",
  "project-metro-grossmarket",
  "project-ford-otosan-kocaeli",
  "project-bursa-ataturk-spor-kompleksi",
  "project-tusas-havacilik-hangari",
  // Mock ürünler
  "product-gerflor-decochoc-wall-system",
  "product-grip-tile-anti-slip",
  "product-tlm-ceilingline-panels",
  "product-tlm-resin-ep-premium",
  // Boş mock dokümanlar (dosyası olmayan)
  "technicalDocument-doc-cstb-traficline",
  "technicalDocument-doc-epoxy-spec",
  "technicalDocument-doc-traficline-spec",
  // Eski mock galeri öğeleri (placeholder görseller)
  ...Array.from({ length: 15 }, (_, i) => `galleryItem-gal-${i + 1}`),
];

// ----- Gerçek ürünler (TLM kataloğundan) -----
const STD_CERTS = ["CSTB", "CE (EN 14041)", "ISO 9001", "Origine France Garantie"];

const PRODUCTS = [
  {
    _id: "product-standline-caillebotis",
    title: "Standline® Caillebotis",
    slug: "standline-caillebotis",
    category: "heavy",
    order: 2,
    frenchModel: "Groupe TLM France — Standline® 14 mm",
    tag: "Drene Edilebilir Ağır Hizmet Karosu",
    shortDescription:
      "14 mm kalınlığında, ızgara (caillebotis) yapısıyla sıvı tahliyesine olanak tanıyan, darbe ve aşınmaya karşı ultra dayanıklı PVC karo. Traficline 7 mm ile uyumludur.",
    specs: {
      thickness: "14,0 mm (drene edilebilir ızgara karo)",
      certifications: STD_CERTS,
      colorOptions: ["Vierge (ham)", "RAL 7016 Antrasit", "Geri dönüştürülmüş siyah", "Geri dönüştürülmüş gri", "RAL 1003 Sarı (rampa)"],
    },
    advantages: [
      "Lastik tokmakla basit ve hızlı montaj",
      "Sıvı tahliyesini kolaylaştıran ajurlu (delikli) yüzey",
      "Darbeye ve aşınmaya karşı çok yüksek direnç",
      "Traficline 7 mm ile uyumlu; özel giriş rampa ve köşeleri mevcut",
    ],
    applications: ["Oto yıkama ve servis alanları", "Sıvı/kimyasal akışlı üretim hatları", "Otopark giriş rampaları", "Dış mekan ve ıslak zeminler"],
    cover: A.garagesCover,
    gallery: [A.garages2, A.garages3, A.garages4],
  },
  {
    _id: "product-decoline",
    title: "Decoline® Tasarım PVC",
    slug: "decoline",
    category: "light-medium",
    order: 3,
    frenchModel: "Groupe TLM France — Decoline® 5 mm",
    tag: "Tasarım PVC — Ofis & Perakende",
    shortDescription:
      "Klipsli (yapıştırıcısız) montajlı, modern renkleriyle şık bir tasarım sunan; 0,7 mm PU aşınma katmanlı 5 mm tasarım PVC karo. Ofis ve perakende gibi tersiyer alanlar için.",
    specs: {
      thickness: "5,0 mm (45×45 / 91×91 cm — 0,7 mm PU aşınma katmanı)",
      certifications: ["CE (EN 14041)", "Antibakteriyel PU yüzey", "Vinylane® yüzey koruma"],
      colorOptions: ["Modern & çağdaş tasarım renkleri", "Ahşap / beton desenleri (talep üzerine)"],
    },
    advantages: [
      "Basit klipsleme ile kolay montaj, yapıştırma gerekmez",
      "Modern ve çağdaş renklerle şık tasarım",
      "0,7 mm PU aşınma katmanı: çizilme ve darbe direnci",
      "Antibakteriyel, kolay temizlenen yüzey",
    ],
    applications: ["Ofis ve çalışma alanları", "Perakende ve mağaza", "Showroom", "Tersiyer (ticari) mekanlar"],
    cover: A.showroomsCover,
    gallery: [A.showroomsWide, A.showrooms3, A.showrooms4],
  },
  {
    _id: "product-visiofloor",
    title: "Visiofloor® Baskılı Zemin",
    slug: "visiofloor",
    category: "light-medium",
    order: 4,
    frenchModel: "Groupe TLM France — Visiofloor® 7 mm",
    tag: "Baskılı Zemin / Görsel İletişim",
    shortDescription:
      "Zemininizi bir iletişim aracına dönüştüren, istenen her motifin UV mürekkeple basılabildiği 7 mm PVC karo. Etkinlik, showroom ve gezici sergiler için idealdir.",
    specs: {
      thickness: "7,0 mm (UV baskılı PVC karo)",
      certifications: ["CSTB", "CE (EN 14041)", "Vinylane® yüzey koruma"],
      colorOptions: ["Özel baskı / sınırsız motif", "Kurumsal logo & yönlendirme", "Uyarı piktogramları"],
    },
    advantages: [
      "UV ile kuruyan mürekkeple dijital baskı",
      "Eşsiz ve özgün bir görsel iletişim aracı",
      "Vinylane® yüzey koruması",
      "İstenen ölçü ve motifte üretim",
    ],
    applications: ["Showroom ve sergi alanları", "Fuar ve etkinlik zeminleri", "Mağaza içi yönlendirme", "Kurumsal karşılama alanları"],
    cover: A.supermarketsCover,
    gallery: [A.supermarkets2, A.supermarkets3],
  },
  {
    _id: "product-exelia",
    title: "Exelia® Görünmez Kilit",
    slug: "exelia",
    category: "light-medium",
    order: 5,
    frenchModel: "Groupe TLM France — Exelia®",
    tag: "Görünmez Kilitli Estetik Karo",
    shortDescription:
      "Görünmez kırlangıçkuyruğu kilit sistemi ve bord-to-bord birleşimle kusursuz, estetik bir zemin görünümü sunan 7 mm PVC karo.",
    specs: {
      thickness: "7,0 mm (50×50 / 25×25 cm — %100 PVC)",
      certifications: ["CSTB", "CE (EN 14041)", "Vinylane® yüzey koruma"],
      colorOptions: ["Gri tonları", "Antrasit", "Özel renk (talep üzerine)"],
    },
    advantages: [
      "Görünmez kilit sistemiyle pürüzsüz, estetik yüzey",
      "Düz veya şaşırtmalı döşemeyle özgün desenler",
      "Küçük ve büyük karoların bir arada kullanımı",
      "Soğuk PU yüzey koruma opsiyonu",
    ],
    applications: ["Showroom ve mağazalar", "Ofis ve toplantı alanları", "Karşılama ve sergi alanları", "Hafif-orta trafikli ticari mekanlar"],
    cover: A.showroomsWide,
    gallery: [A.showrooms3, A.showrooms4],
  },
  {
    _id: "product-fitline",
    title: "Fitline® Kauçuk Spor Zemin",
    slug: "fitline",
    category: "light-medium",
    order: 6,
    frenchModel: "Groupe TLM France — Fitline® (6/8/20/40 mm)",
    tag: "Kauçuk Spor & Darbe Emici Zemin",
    shortDescription:
      "6, 8, 20 ve 40 mm kalınlık seçenekleriyle yüksek darbe direnci ve akustik yalıtım sağlayan, darbe emici kauçuk spor zemin karosu.",
    specs: {
      thickness: "6 / 8 / 20 / 40 mm (kauçuk karo)",
      certifications: ["CE (EN 14041)", "Yüksek akustik yalıtım"],
      colorOptions: ["Siyah - mavi benekli", "Siyah - beyaz benekli", "Siyah - kırmızı benekli"],
    },
    advantages: [
      "Lastik tokmakla kolay montaj",
      "Darbeye ve aşınmaya karşı çok yüksek direnç",
      "Yüksek akustik (ses) yalıtımı",
      "Darbe emici, ekipman ve eklem dostu yüzey",
    ],
    applications: ["Fitness ve ağırlık salonları", "Spor alanları", "Serbest ağırlık / crossfit bölgeleri", "Gürültü yalıtımı gereken alanlar"],
    cover: A.fitnessCover,
    gallery: [A.fitness2, A.fitness3],
  },
];

// ----- Yeni galeri öğeleri (gerçek fotoğraflar) -----
const GALLERY = [
  { ref: A.industriesCover, category: "Endüstriyel Tesis" },
  { ref: A.industries2, category: "Üretim Sahası" },
  { ref: A.garagesCover, category: "Otopark & Garaj" },
  { ref: A.garages2, category: "Giriş Rampası" },
  { ref: A.fitnessCover, category: "Fitness Salonu" },
  { ref: A.fitness3, category: "Spor Alanı" },
  { ref: A.showroomsCover, category: "Showroom" },
  { ref: A.showroomsWide, category: "Mağaza Teşhir" },
  { ref: A.supermarketsCover, category: "Süpermarket" },
  { ref: A.supermarkets3, category: "Perakende" },
  { ref: A.heklaCover, category: "HEKLA Mağaza" },
  { ref: A.scaniaCover, category: "Otomotiv Fabrikası" },
];

// Gerçek projeleri anlamlı sırayla göstermek için order ataması.
const PROJECT_ORDER = {
  "project-asset-industries": 1,
  "project-asset-garages": 2,
  "project-asset-supermarkets": 3,
  "project-asset-fitness": 4,
  "project-asset-showrooms": 5,
  "project-asset-scania-angers": 6,
  "project-asset-hekla": 7,
  "project-asset-sports": 8,
};

async function main() {
  const env = await loadEnv();
  const token = process.env.SANITY_API_WRITE_TOKEN || env.SANITY_API_WRITE_TOKEN || env.SANITY_API_READ_TOKEN;
  if (!token) {
    console.error("HATA: Yazma yetkili token bulunamadı (.env.local).");
    process.exit(1);
  }
  const client = createClient({
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID || "y8r1xc1u",
    dataset: env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2024-10-01",
    token,
    useCdn: false,
  });

  console.log(DRY ? "=== DRY RUN ===\n" : "=== UYGULANIYOR ===\n");

  // 1) Sil
  console.log(`1) Silinecek ${DELETE_IDS.length} doküman:`);
  DELETE_IDS.forEach((id) => console.log("   - " + id));
  if (!DRY) {
    let tx = client.transaction();
    DELETE_IDS.forEach((id) => (tx = tx.delete(id)));
    await tx.commit();
    console.log("   ✓ silindi");
  }

  // 2) Gerçek ürünler (createOrReplace)
  console.log(`\n2) Oluşturulacak/güncellenecek ${PRODUCTS.length} ürün:`);
  for (const p of PRODUCTS) {
    console.log(`   - ${p.title} [${p.category}]`);
    if (DRY) continue;
    await client.createOrReplace({
      _id: p._id,
      _type: "product",
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      category: p.category,
      shortDescription: p.shortDescription,
      coverImage: img(p.cover),
      gallery: p.gallery.map(galImg),
      specs: p.specs,
      advantages: p.advantages,
      applications: p.applications,
      frenchModel: p.frenchModel,
      tag: p.tag,
      order: p.order,
    });
  }
  if (!DRY) console.log("   ✓ ürünler hazır");

  // 3) Mevcut Traficline ürününü düzelt (order + example.com pdfUrl'i kaldır)
  console.log(`\n3) Traficline Heavy Duty: order=1, geçersiz pdfUrl temizleniyor`);
  if (!DRY) {
    await client.patch("product-traficline-heavy-duty").set({ order: 1 }).unset(["pdfUrl"]).commit();
    console.log("   ✓ güncellendi");
  }

  // 4) Yeni galeri öğeleri
  console.log(`\n4) Oluşturulacak ${GALLERY.length} galeri öğesi (gerçek fotoğraflar)`);
  if (!DRY) {
    for (let i = 0; i < GALLERY.length; i++) {
      const g = GALLERY[i];
      await client.createOrReplace({
        _id: `galleryItem-real-${i + 1}`,
        _type: "galleryItem",
        image: img(g.ref),
        category: g.category,
        order: i + 1,
      });
    }
    console.log("   ✓ galeri kuruldu");
  }

  // 5) Proje sıralaması
  console.log(`\n5) Proje sıralaması ayarlanıyor`);
  if (!DRY) {
    for (const [id, order] of Object.entries(PROJECT_ORDER)) {
      await client.patch(id).set({ order }).commit();
    }
    console.log("   ✓ sıralandı");
  }

  console.log("\n✅ Bitti.");
}

main().catch((e) => {
  console.error("\n❌ Hata:", e.message);
  process.exit(1);
});
