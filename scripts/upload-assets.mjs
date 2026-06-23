/**
 * Traffic Floor — toplu asset yükleme script'i
 * ---------------------------------------------
 * traffic-floor-assets/ klasöründeki görselleri ve PDF'leri Sanity'ye yükler,
 * product / project / technicalDocument dokümanlarına bağlar.
 *
 * Çalıştırma (PowerShell):
 *   $env:SANITY_API_WRITE_TOKEN="<editor-token>"; node scripts/upload-assets.mjs
 *   # Sadece ne yapacağını görmek için (yükleme yapmaz):
 *   $env:DRY_RUN="1"; node scripts/upload-assets.mjs
 *
 * Notlar:
 *  - Token: sanity.io/manage > traffic-floor > API > Tokens > "Editor" yetkisiyle oluşturun.
 *  - Mevcut seed dokümanlarının ÜZERİNE yazmaz; yalnızca görsel/dosya alanlarını ekler
 *    (createIfNotExists + patch). Önce seed'i import etmiş olmanız önerilir.
 *  - Re-run güvenli: proje dokümanları sabit _id ile createOrReplace edilir.
 *  - Videolar ve Thumbs.db atlanır.
 */

import { createClient } from "@sanity/client";
import { createReadStream } from "node:fs";
import { readdir, readFile, stat } from "node:fs/promises";
import { join, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const ASSETS = join(ROOT, "traffic-floor-assets");
const DRY = process.env.DRY_RUN === "1";

// --- Sanity client (projectId/dataset public; sanity.cli.ts ile aynı) ---
async function loadEnv() {
  // .env.local içinden public değerleri oku (yoksa bilinen varsayılanlara düş).
  let env = {};
  try {
    const raw = await readFile(join(ROOT, ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Z_]+)\s*=\s*"?([^"\n]*)"?\s*$/);
      if (m) env[m[1]] = m[2];
    }
  } catch {}
  return env;
}

const IMG_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const isImage = (f) => IMG_EXT.has(extname(f).toLowerCase());

const slug = (s) =>
  s
    .toLowerCase()
    .replace(/[çÇ]/g, "c").replace(/[ğĞ]/g, "g").replace(/[ıİ]/g, "i")
    .replace(/[öÖ]/g, "o").replace(/[şŞ]/g, "s").replace(/[üÜ]/g, "u")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const key = () => Math.random().toString(36).slice(2, 12);

// ===================================================================
//  YAPILANDIRMA — neyin nereye gideceği
// ===================================================================

// Ürün: Traficfloor render + renk swatch'ları -> mevcut product'a eklenir.
const PRODUCT = {
  id: "product-traficline-heavy-duty",
  dir: "Traficfloor",
  // Kapak için tercih edilen render (yoksa ilk görsel kapak olur).
  cover: "TF HD ASSEMB.jpg",
  colorOptions: ["Acier", "Anthracite", "Beige", "Blanc", "Bleu", "Noir", "Orange", "Jaune", "Rouge", "Vert", "Gris"],
};

// Referans projeler: her klasör bir 'project' dokümanı.
const PROJECTS = [
  {
    id: "project-asset-industries", title: "Endüstriyel Tesis Uygulamaları", category: "Fabrika",
    dir: "industries", excludeSubdirs: ["SCANIA"],
    description: "Çeşitli endüstriyel tesislerde Traffic Floor PVC karo zemin uygulamaları.",
  },
  {
    id: "project-asset-scania-angers", title: "Scania Angers Fabrikası", category: "Otomotiv",
    dir: "industries/SCANIA",
    description: "Scania Angers üretim tesisinde ağır trafiğe dayanıklı zemin uygulaması.",
  },
  {
    id: "project-asset-garages", title: "Otopark & Garaj Zeminleri", category: "Otomotiv",
    dir: "garages", extraFiles: ["access ramp corner.jpg"],
    description: "Otopark, garaj ve giriş rampalarında kaymaz, dayanıklı PVC karo zeminler.",
  },
  {
    id: "project-asset-supermarkets", title: "Intermarché & Weldom Mağazaları", category: "Mağaza",
    dir: "supermarkets, retails",
    description: "Intermarché ve Weldom perakende mağazalarında zemin uygulamaları.",
  },
  {
    id: "project-asset-showrooms", title: "Showroom Uygulamaları", category: "Mağaza",
    dir: "showrooms",
    description: "Showroom ve sergi alanlarında dekoratif PVC karo zemin uygulamaları.",
  },
  {
    id: "project-asset-fitness", title: "Fitness & Spor Salonları", category: "Spor",
    dir: "fitness",
    description: "Fitness merkezleri ve spor salonlarında darbe emici, kilitli karo zeminler.",
  },
  {
    id: "project-asset-sports", title: "Spor Alanları", category: "Spor",
    dir: "sports areas",
    description: "Spor alanlarında dayanıklı zemin uygulamaları.",
  },
  {
    id: "project-asset-hekla", title: "HEKLA Referansı", category: "Mağaza",
    dir: "HEKLA",
    description: "HEKLA mekanında Traficline PVC karo zemin uygulaması.",
  },
];

// Teknik dokümanlar: kök PDF'ler -> dosya alanı.
const DOCS = [
  { id: "technicalDocument-doc-genel-katalog", file: "TLM_BROCHURE_DallesPVC_FR_Juin2023 HEKLA.pdf",
    title: "Traffic Floor Dalles PVC Kataloğu (FR)", category: "catalogue", language: "FR" },
  { id: "technicalDocument-doc-ce-conformity", file: "TRAFICFLOOR CERTIFICATES.PDF",
    title: "Traficfloor Sertifikaları", category: "certificate" },
  { id: "technicalDocument-asset-uygulama", file: "Uygulama Görselleri.pdf",
    title: "Uygulama Görselleri", category: "catalogue", language: "TR", create: true },
];

// ===================================================================

let client;

async function listImages(dir, { excludeSubdirs = [] } = {}) {
  const abs = join(ASSETS, dir);
  const out = [];
  const entries = await readdir(abs, { withFileTypes: true });
  for (const e of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    if (e.isDirectory()) continue; // alt klasörler ayrı projelere ait
    if (isImage(e.name)) out.push(join(abs, e.name));
  }
  return out;
}

async function uploadImageRef(filePath) {
  const filename = basename(filePath);
  if (DRY) {
    console.log(`    [dry] image: ${filename}`);
    return { _type: "image", _key: key(), asset: { _type: "reference", _ref: "image-DRY" } };
  }
  const asset = await client.assets.upload("image", createReadStream(filePath), { filename });
  console.log(`    ✓ ${filename}  (${asset._id})`);
  return { _type: "image", _key: key(), asset: { _type: "reference", _ref: asset._id } };
}

async function uploadFileRef(filePath) {
  const filename = basename(filePath);
  if (DRY) { console.log(`    [dry] file: ${filename}`); return { _type: "file", asset: { _type: "reference", _ref: "file-DRY" } }; }
  const asset = await client.assets.upload("file", createReadStream(filePath), { filename });
  console.log(`    ✓ ${filename}  (${asset._id})`);
  return { _type: "file", asset: { _type: "reference", _ref: asset._id } };
}

async function doProduct() {
  console.log(`\n● ÜRÜN: ${PRODUCT.id}`);
  const all = await listImages(PRODUCT.dir);
  if (!all.length) { console.log("  (görsel yok, atlanıyor)"); return; }
  // Kapağı öne al.
  const coverIdx = all.findIndex((p) => basename(p) === PRODUCT.cover);
  const ordered = coverIdx >= 0 ? [all[coverIdx], ...all.filter((_, i) => i !== coverIdx)] : all;

  const refs = [];
  for (const p of ordered) refs.push(await uploadImageRef(p));
  const [cover, ...gallery] = refs;

  if (DRY) { console.log(`  -> coverImage + ${gallery.length} galeri + ${PRODUCT.colorOptions.length} renk`); return; }
  await client.createIfNotExists({ _id: PRODUCT.id, _type: "product", title: "Traficline® Heavy Duty",
    slug: { _type: "slug", current: "traficline-heavy-duty" }, category: "heavy", shortDescription: "Ağır trafik PVC karo." });
  await client.patch(PRODUCT.id)
    .set({ coverImage: { ...cover, _key: undefined }, gallery })
    .setIfMissing({ specs: {} })
    .set({ "specs.colorOptions": PRODUCT.colorOptions })
    .commit();
  console.log(`  -> güncellendi: kapak + ${gallery.length} galeri görseli + renk listesi`);
}

async function doProject(cfg) {
  console.log(`\n● PROJE: ${cfg.title} [${cfg.category}]`);
  const imgs = await listImages(cfg.dir, { excludeSubdirs: cfg.excludeSubdirs });
  for (const f of cfg.extraFiles || []) {
    const p = join(ASSETS, f);
    try { await stat(p); imgs.push(p); } catch {}
  }
  if (!imgs.length) { console.log("  (görsel yok, atlanıyor)"); return; }

  const refs = [];
  for (const p of imgs) refs.push(await uploadImageRef(p));
  const [cover, ...gallery] = refs;

  if (DRY) { console.log(`  -> coverImage + ${gallery.length} galeri`); return; }
  await client.createOrReplace({
    _id: cfg.id, _type: "project", title: cfg.title,
    slug: { _type: "slug", current: slug(cfg.title) },
    category: cfg.category, description: cfg.description,
    coverImage: { ...cover, _key: undefined }, gallery, order: 100,
  });
  console.log(`  -> oluşturuldu: kapak + ${gallery.length} galeri görseli`);
}

async function doDoc(cfg) {
  console.log(`\n● DOKÜMAN: ${cfg.title} [${cfg.category}]`);
  const p = join(ASSETS, cfg.file);
  try { await stat(p); } catch { console.log(`  (dosya yok: ${cfg.file})`); return; }
  const ref = await uploadFileRef(p);
  if (DRY) return;
  if (cfg.create) {
    await client.createIfNotExists({ _id: cfg.id, _type: "technicalDocument", title: cfg.title,
      category: cfg.category, language: cfg.language, order: 50 });
  }
  await client.patch(cfg.id).set({ file: ref, ...(cfg.language ? { language: cfg.language } : {}) }).commit();
  console.log(`  -> dosya bağlandı`);
}

async function main() {
  const env = await loadEnv();
  const projectId = process.env.SANITY_PROJECT_ID || env.NEXT_PUBLIC_SANITY_PROJECT_ID || "y8r1xc1u";
  const dataset = process.env.SANITY_DATASET || env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!DRY && !token) {
    console.error("HATA: SANITY_API_WRITE_TOKEN tanımlı değil. Editor token gerekli.");
    console.error('PowerShell: $env:SANITY_API_WRITE_TOKEN="..."; node scripts/upload-assets.mjs');
    process.exit(1);
  }
  client = createClient({ projectId, dataset, apiVersion: "2024-10-01", token, useCdn: false });

  console.log(`Hedef: projectId=${projectId} dataset=${dataset} ${DRY ? "(DRY RUN)" : ""}`);

  await doProduct();
  for (const cfg of PROJECTS) await doProject(cfg);
  for (const cfg of DOCS) await doDoc(cfg);

  console.log("\n✅ Bitti.");
}

main().catch((e) => { console.error("\n❌ Hata:", e.message); process.exit(1); });
