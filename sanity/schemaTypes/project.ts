import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Referans Proje",
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
      title: "Sektör",
      type: "string",
      options: {
        list: ["Fabrika", "Depo", "Sağlık", "Mağaza", "Otomotiv", "Spor"].map((v) => ({ title: v, value: v })),
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "coverImage", title: "Kapak Görseli", type: "image", options: { hotspot: true } }),
    defineField({ name: "gallery", title: "Galeri", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
    defineField({ name: "description", title: "Açıklama", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "productsUsed", title: "Kullanılan Ürünler", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "scale", title: "Ölçek (m²)", type: "string" }),
    defineField({ name: "location", title: "Lokasyon", type: "string" }),
    defineField({ name: "order", title: "Sıra", type: "number", initialValue: 0 }),
  ],
  orderings: [{ title: "Sıra", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "category", media: "coverImage" } },
});
