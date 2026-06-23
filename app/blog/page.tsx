import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { User } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { getBlogPosts } from "@/sanity/lib/fetch";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog — Teknik Görüşler & Zemin Bilimi | Traffic Floor",
  description:
    "Endüstriyel zemin aşınması, epoksi ve PVC karo karşılaştırmaları, CSTB/UPEC standartları ve HACCP uyumlu zeminler üzerine uzman mühendislik makaleleri.",
};

export default async function BlogListPage() {
  const blogs = await getBlogPosts();
  return (
    <div className="min-h-screen bg-[#0f1113] flex flex-col selection:bg-[#f97316] selection:text-white text-[#e2e8f0]">
      <SiteHeader active="blog" />

      {/* Main Contents Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 space-y-8 animate-fadeIn">
        <div className="border-l-4 border-[#f97316] pl-3">
          <p className="text-xs text-[#f97316] tracking-wide uppercase font-semibold">Blog</p>
          <h1 className="font-display font-black text-3xl text-white">Yazılar</h1>
        </div>

        <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
          Zemin kaplama seçimi, epoksi ve PVC karo karşılaştırmaları ve sektör standartları üzerine yazılarımız.
        </p>

        {/* Blog Post Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog.slug} className="bg-[#16181b] border border-zinc-800 rounded-none overflow-hidden flex flex-col justify-between hover:border-zinc-700 transition-all">
              <div>
                <div className="relative h-44 w-full bg-zinc-950 overflow-hidden">
                  <img src={blog.coverImage} alt={blog.title} className="object-cover w-full h-full opacity-85" />
                  <span className="absolute bottom-3 left-3 bg-[#f97316] text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded-none uppercase">
                    {blog.category}
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-3 text-xs text-zinc-400">
                    <span className="flex items-center gap-1"><User className="w-3 h-3 text-[#f97316]" /> {blog.author}</span>
                    <span>•</span>
                    <span>{blog.date}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white hover:text-[#f97316] transition-colors leading-snug">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-zinc-400 line-clamp-2 leading-relaxed">{blog.summary}</p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <Link
                  href={`/blog/${blog.slug}`}
                  className="inline-block bg-zinc-900 border border-zinc-800 hover:bg-[#f97316] hover:text-white text-[#f97316] text-center text-sm font-semibold px-3 py-2.5 w-full transition-all mt-4"
                >
                  Yazıyı Oku
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
