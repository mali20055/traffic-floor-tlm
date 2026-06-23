import type { PortableTextBlock } from "@portabletext/types";
import { client } from "./client";
import {
  faqQuery,
  productsQuery,
  productBySlugQuery,
  productSlugsQuery,
  projectsQuery,
  blogListQuery,
  blogBySlugQuery,
  blogSlugsQuery,
  galleryQuery,
  documentsQuery,
  heroImagesQuery,
} from "./queries";
import type {
  SssItem,
  Product,
  Project,
  BlogPost,
  GalleryItem,
  TechnicalDocument,
} from "@/lib/types";

/** Blog post as returned by Sanity — content is Portable Text instead of a string. */
export type BlogPostDetail = Omit<BlogPost, "content"> & {
  content: PortableTextBlock[];
};

// Revalidate cached content every 60 seconds (ISR).
const opts = { next: { revalidate: 60 } } as const;

export function getFaqItems(): Promise<SssItem[]> {
  return client.fetch<SssItem[]>(faqQuery, {}, opts);
}

export function getProducts(): Promise<Product[]> {
  return client.fetch<Product[]>(productsQuery, {}, opts);
}

export function getProjects(): Promise<Project[]> {
  return client.fetch<Project[]>(projectsQuery, {}, opts);
}

/** Hero slider arka plan görselleri (gerçek referans proje fotoğrafları). */
export function getHeroImages(): Promise<string[]> {
  return client.fetch<string[]>(heroImagesQuery, {}, opts);
}

export function getGalleryItems(): Promise<GalleryItem[]> {
  return client.fetch<GalleryItem[]>(galleryQuery, {}, opts);
}

export function getTechnicalDocuments(): Promise<TechnicalDocument[]> {
  return client.fetch<TechnicalDocument[]>(documentsQuery, {}, opts);
}

export function getBlogPosts(): Promise<BlogPost[]> {
  return client.fetch<BlogPost[]>(blogListQuery, {}, opts);
}

export function getProductBySlug(slug: string): Promise<Product | null> {
  return client.fetch<Product | null>(productBySlugQuery, { slug }, opts);
}

export function getBlogPostBySlug(slug: string): Promise<BlogPostDetail | null> {
  return client.fetch<BlogPostDetail | null>(blogBySlugQuery, { slug }, opts);
}

export function getProductSlugs(): Promise<string[]> {
  return client.fetch<string[]>(productSlugsQuery);
}

export function getBlogSlugs(): Promise<string[]> {
  return client.fetch<string[]>(blogSlugsQuery);
}
