import { defineField, defineType } from "sanity";

export const sssItem = defineType({
  name: "sssItem",
  title: "Sıkça Sorulan Soru",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Soru",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Cevap",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Sıra",
      type: "number",
      description: "Listeleme sırası (küçükten büyüğe).",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Sıra (artan)",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "question", order: "order" },
    prepare({ title, order }) {
      return { title, subtitle: typeof order === "number" ? `Sıra: ${order}` : undefined };
    },
  },
});
