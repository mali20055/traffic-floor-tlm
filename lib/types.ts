// Shared content type contracts. These describe the shape of data returned by
// the Sanity GROQ queries and consumed by the components. (Images are projected
// to plain URL strings in the queries, so these stay simple string fields.)

export interface Product {
  title: string;
  slug: string;
  category: "heavy" | "light-medium" | "wall-ceiling";
  shortDescription: string;
  coverImage: string;
  gallery: string[];
  specs: {
    thickness: string;
    certifications: string[];
    colorOptions: string[];
  };
  advantages: string[];
  applications: string[];
  pdfUrl?: string;
  frenchModel?: string;
  tag?: string;
}

export interface Project {
  title: string;
  slug: string;
  category: "Fabrika" | "Depo" | "Sağlık" | "Mağaza" | "Otomotiv" | "Spor";
  coverImage: string;
  gallery: string[];
  description: string;
  productsUsed: string[];
  scale?: string;
  location?: string;
}

export interface BlogPost {
  title: string;
  slug: string;
  category: string;
  coverImage: string;
  summary: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
}

export interface TechnicalDocument {
  id: string;
  title: string;
  category: "catalogue" | "specification" | "certificate";
  fileSize: string;
  language: string;
  code: string;
  /** URL of an uploaded PDF (when a file is attached in Sanity). */
  fileUrl?: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  category: string;
}

export interface SssItem {
  id: string;
  question: string;
  answer: string;
}
