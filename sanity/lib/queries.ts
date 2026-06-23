import { groq } from "next-sanity";

/** All FAQ (S.S.S.) items, ordered, shaped to match the SssItem type. */
export const faqQuery = groq`*[_type == "sssItem"] | order(order asc){
  "id": _id,
  question,
  answer
}`;

// --- Products ---
const productProjection = groq`{
  title,
  "slug": slug.current,
  category,
  shortDescription,
  "coverImage": coverImage.asset->url,
  "gallery": gallery[].asset->url,
  specs,
  advantages,
  applications,
  frenchModel,
  tag,
  pdfUrl
}`;

export const productsQuery = groq`*[_type == "product"] | order(order asc) ${productProjection}`;
export const productBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0] ${productProjection}`;
export const productSlugsQuery = groq`*[_type == "product" && defined(slug.current)].slug.current`;

/**
 * Hero slider için gerçek uygulama fotoğrafları.
 * Asset yükleme script'iyle oluşturulan gerçek referans projelerinin
 * (industries, garages, supermarkets …) kapak görsellerini, en çok galeriye
 * sahip (yani en kapsamlı) projeden başlayarak döner.
 */
export const heroImagesQuery = groq`*[_type == "project" && _id match "project-asset-*" && defined(coverImage.asset)]
  | order(count(gallery) desc)[0...6].coverImage.asset->url`;

// --- Projects ---
export const projectsQuery = groq`*[_type == "project"] | order(order asc){
  title,
  "slug": slug.current,
  category,
  "coverImage": coverImage.asset->url,
  "gallery": gallery[].asset->url,
  description,
  productsUsed,
  scale,
  location
}`;

// --- Blog ---
export const blogListQuery = groq`*[_type == "blogPost"] | order(order asc){
  title,
  "slug": slug.current,
  category,
  "coverImage": coverImage.asset->url,
  summary,
  date,
  author,
  readTime
}`;

export const blogBySlugQuery = groq`*[_type == "blogPost" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  category,
  "coverImage": coverImage.asset->url,
  summary,
  content,
  date,
  author,
  readTime
}`;

export const blogSlugsQuery = groq`*[_type == "blogPost" && defined(slug.current)].slug.current`;

// --- Gallery ---
export const galleryQuery = groq`*[_type == "galleryItem"] | order(order asc){
  "id": _id,
  "image": image.asset->url,
  category
}`;

// --- Technical documents ---
export const documentsQuery = groq`*[_type == "technicalDocument"] | order(order asc){
  "id": _id,
  title,
  category,
  fileSize,
  language,
  code,
  "fileUrl": file.asset->url
}`;
