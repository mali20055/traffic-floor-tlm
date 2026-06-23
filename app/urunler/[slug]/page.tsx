import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProductDetail from "./ProductDetail";
import { getProductBySlug, getProductSlugs, getTechnicalDocuments } from "@/sanity/lib/fetch";

export const revalidate = 60;

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Ürün Bulunamadı — Traffic Floor" };
  return {
    title: `${product.title} — Traffic Floor`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [product, documents] = await Promise.all([getProductBySlug(slug), getTechnicalDocuments()]);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0f1113] flex flex-col selection:bg-[#f97316] selection:text-white text-[#e2e8f0]">
      <SiteHeader active="products" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 animate-fadeIn">
        <ProductDetail product={product} documents={documents} />
      </main>

      <SiteFooter />
    </div>
  );
}
