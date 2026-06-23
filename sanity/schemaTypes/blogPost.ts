import { defineArrayMember, defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Yazısı",
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
    defineField({ name: "category", title: "Kategori", type: "string", validation: (r) => r.required() }),
    defineField({ name: "coverImage", title: "Kapak Görseli", type: "image", options: { hotspot: true } }),
    defineField({ name: "summary", title: "Özet", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({
      name: "content",
      title: "İçerik",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Başlık 2", value: "h2" },
            { title: "Başlık 3", value: "h3" },
            { title: "Başlık 4", value: "h4" },
            { title: "Alıntı", value: "blockquote" },
          ],
          lists: [
            { title: "Madde", value: "bullet" },
            { title: "Numaralı", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Kalın", value: "strong" },
              { title: "İtalik", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Bağlantı",
                fields: [{ name: "href", type: "url", title: "URL" }],
              },
            ],
          },
        }),
        defineArrayMember({ type: "image", options: { hotspot: true } }),
      ],
    }),
    defineField({ name: "date", title: "Tarih (görünen)", type: "string" }),
    defineField({ name: "author", title: "Yazar", type: "string" }),
    defineField({ name: "readTime", title: "Okuma Süresi", type: "string" }),
    defineField({ name: "order", title: "Sıra", type: "number", initialValue: 0 }),
  ],
  orderings: [{ title: "Sıra", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "category", media: "coverImage" } },
});
