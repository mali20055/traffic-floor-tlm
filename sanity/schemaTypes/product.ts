import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Ürün",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Başlık", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "string",
      options: {
        list: [
          { title: "Ağır Trafik", value: "heavy" },
          { title: "Hafif-Orta / Reçine", value: "light-medium" },
          { title: "Duvar & Tavan", value: "wall-ceiling" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "shortDescription", title: "Kısa Açıklama", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "coverImage", title: "Kapak Görseli", type: "image", options: { hotspot: true } }),
    defineField({ name: "gallery", title: "Galeri", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
    defineField({
      name: "specs",
      title: "Teknik Veriler",
      type: "object",
      fields: [
        defineField({ name: "thickness", title: "Kalınlık", type: "string" }),
        defineField({ name: "certifications", title: "Sertifikalar", type: "array", of: [{ type: "string" }] }),
        defineField({ name: "colorOptions", title: "Renk Seçenekleri", type: "array", of: [{ type: "string" }] }),
      ],
    }),
    defineField({ name: "advantages", title: "Avantajlar", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "applications", title: "Uygulama Alanları", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "frenchModel", title: "Fransız Model / Kaynak", type: "string" }),
    defineField({ name: "tag", title: "Etiket", type: "string" }),
    defineField({ name: "pdfUrl", title: "PDF Bağlantısı", type: "url" }),
    defineField({ name: "order", title: "Sıra", type: "number", initialValue: 0 }),
  ],
  orderings: [{ title: "Sıra", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "tag", media: "coverImage" } },
});
