import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, User, Calendar, Clock } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import PortableTextRenderer from "@/components/PortableTextRenderer";
import { getBlogPostBySlug, getBlogSlugs } from "@/sanity/lib/fetch";

export const revalidate = 60;

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogPostBySlug(slug);
  if (!blog) return { title: "Yazı Bulunamadı — Traffic Floor" };
  return {
    title: `${blog.title} — Traffic Floor Blog`,
    description: blog.summary,
  };
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await getBlogPostBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0f1113] flex flex-col selection:bg-[#f97316] selection:text-white text-[#e2e8f0]">
      <SiteHeader active="blog" />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 space-y-6 animate-fadeIn">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs font-mono text-[#f97316] hover:underline">
          <ArrowLeft className="w-4 h-4" /> Tüm Yayınlara Geri Dön
        </Link>

        {/* Blog Post Detail article container */}
        <div className="bg-[#16181b] p-6 sm:p-10 border border-zinc-800 rounded-none space-y-6 shadow-2xl">
          <div className="space-y-3">
            <span className="bg-[#f97316] text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-none uppercase">
              {blog.category}
            </span>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-white leading-tight">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-[#f97316]" /> {blog.author}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-zinc-500" /> {blog.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-zinc-500" /> {blog.readTime}</span>
            </div>
          </div>

          <div className="relative h-72 w-full rounded-none overflow-hidden border border-zinc-800">
            <img src={blog.coverImage} alt={blog.title} className="object-cover w-full h-full opacity-85" />
          </div>

          <div className="pt-4 border-t border-zinc-800">
            <PortableTextRenderer value={blog.content} />
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
