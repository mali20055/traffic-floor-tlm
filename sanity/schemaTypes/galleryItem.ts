import { defineField, defineType } from "sanity";

export const galleryItem = defineType({
  name: "galleryItem",
  title: "Galeri Görseli",
  type: "document",
  fields: [
    defineField({ name: "image", title: "Görsel", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: "category", title: "Kategori / Etiket", type: "string", validation: (r) => r.required() }),
    defineField({ name: "order", title: "Sıra", type: "number", initialValue: 0 }),
  ],
  orderings: [{ title: "Sıra", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "category", media: "image" } },
});
