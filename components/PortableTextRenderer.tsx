import React from "react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { urlForImage } from "@/sanity/lib/image";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-zinc-300 leading-relaxed">{children}</p>,
    h2: ({ children }) => <h2 className="font-display font-black text-xl text-white mt-6 mb-1">{children}</h2>,
    h3: ({ children }) => <h3 className="font-display font-bold text-base text-white mt-5 mb-1">{children}</h3>,
    h4: ({ children }) => <h4 className="font-mono font-bold text-sm text-[#f97316] uppercase tracking-wider mt-4 mb-1">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[#f97316] pl-4 italic text-zinc-400">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-5 space-y-1 text-zinc-300">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-5 space-y-1 text-zinc-300">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="text-white font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a href={value?.href} className="text-[#f97316] underline" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const url = urlForImage(value).width(1200).fit("max").url();
      return (
        <img
          src={url}
          alt={value.alt || ""}
          className="w-full rounded-none border border-zinc-800 my-4"
        />
      );
    },
  },
};

export default function PortableTextRenderer({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="text-xs sm:text-sm space-y-4">
      <PortableText value={value} components={components} />
    </div>
  );
}
