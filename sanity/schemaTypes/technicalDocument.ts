import { defineField, defineType } from "sanity";

export const technicalDocument = defineType({
  name: "technicalDocument",
  title: "Teknik Doküman",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Başlık", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "category",
      title: "Tür",
      type: "string",
      options: {
        list: [
          { title: "Katalog", value: "catalogue" },
          { title: "Şartname", value: "specification" },
          { title: "Sertifika", value: "certificate" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "fileSize", title: "Dosya Boyutu", type: "string" }),
    defineField({ name: "language", title: "Dil", type: "string" }),
    defineField({ name: "code", title: "Kod", type: "string" }),
    defineField({
      name: "file",
      title: "PDF Dosyası",
      type: "file",
      options: { accept: ".pdf" },
      description: "İndirilecek gerçek PDF dosyası. Boş bırakılırsa indirme simülasyonu gösterilir.",
    }),
    defineField({ name: "order", title: "Sıra", type: "number", initialValue: 0 }),
  ],
  orderings: [{ title: "Sıra", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "code" } },
});
