import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Learn — Repair Guides & Resources",
  description: "Technical guides, buying guides and resources for electronics repair professionals.",
};

const articles = [
  {
    slug: "how-to-choose-a-microscope-for-microsoldering",
    title: "How to Choose a Microscope for Microsoldering",
    excerpt: "A practical guide to selecting the right magnification, working distance and optical system for microsoldering and mobile repair work. Covers stereo vs digital, working distance, zoom range, and camera compatibility.",
    category: "Buying Guides",
    readTime: "6 min read",
    emoji: "🔬",
    featured: true,
  },
  {
    slug: "professional-mobile-repair-bench-setup",
    title: "Professional Mobile Repair Bench Setup",
    excerpt: "What every professional repair technician needs on their bench — from lighting and magnification to organization and ESD safety.",
    category: "Repair Guides",
    readTime: "8 min read",
    emoji: "🔧",
    featured: true,
  },
  {
    slug: "essential-tools-for-pcb-repair",
    title: "Essential Tools for PCB Repair",
    excerpt: "The core toolkit for printed circuit board repair work — what you need and why.",
    category: "Tool Guides",
    readTime: "5 min read",
    emoji: "⚙️",
    featured: false,
  },
  {
    slug: "microsoldering-equipment-checklist",
    title: "Microsoldering Equipment Checklist",
    excerpt: "A complete checklist of tools and equipment required to begin microsoldering work on modern mobile devices.",
    category: "Microsoldering",
    readTime: "4 min read",
    emoji: "✅",
    featured: false,
  },
  {
    slug: "understanding-microscope-magnification",
    title: "Understanding Microscope Magnification for Repair Work",
    excerpt: "What does 7x–45x mean? How to choose the right magnification range for your specific repair applications.",
    category: "Buying Guides",
    readTime: "5 min read",
    emoji: "🔍",
    featured: false,
  },
  {
    slug: "soldering-tips-guide",
    title: "Soldering Tips: Types and When to Use Them",
    excerpt: "An overview of common soldering tip profiles and their applications in mobile and PCB repair.",
    category: "Tool Guides",
    readTime: "4 min read",
    emoji: "⚡",
    featured: false,
  },
];

const categories = [
  "All", "Buying Guides", "Repair Guides", "Tool Guides", "Microsoldering", "PCB Repair", "Mobile Repair"
];

export default function LearnPage() {
  const featured = articles.filter((a) => a.featured);
  const rest = articles.filter((a) => !a.featured);

  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="container-site py-10">
          <nav className="text-xs text-[#9E9E9E] mb-3 flex items-center gap-1.5">
            <Link href="/" className="hover:text-[#0A0A0A]">Home</Link>
            <span>/</span>
            <span>Learn</span>
          </nav>
          <h1 className="text-2xl font-black text-[#0A0A0A] tracking-tight mb-2">Learn</h1>
          <p className="text-sm text-[#6B6B6B]">
            Technical guides, buying advice and resources for repair professionals.
          </p>

          {/* Category filter */}
          <div className="flex gap-2 flex-wrap mt-5">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                  i === 0
                    ? "bg-[#0A0A0A] text-white border-[#0A0A0A]"
                    : "bg-white text-[#6B6B6B] border-[#E5E5E5] hover:border-[#D0D0D0]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container-site py-10">
        {/* Featured */}
        {featured.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-bold text-[#0A0A0A] mb-4">Featured Guides</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {featured.map((article) => (
                <Link
                  key={article.slug}
                  href={`/learn/${article.slug}`}
                  className="group bg-white border border-[#E5E5E5] rounded-[12px] p-6 hover:border-[#E65C00] hover:shadow-[0_4px_16px_0_rgba(230,92,0,0.1)] transition-all duration-200"
                >
                  <div className="text-3xl mb-4">{article.emoji}</div>
                  <Badge variant="outline" className="text-[10px] mb-2">{article.category}</Badge>
                  <h3 className="font-bold text-[#0A0A0A] mb-2 group-hover:text-[#E65C00] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed mb-4">{article.excerpt}</p>
                  <div className="flex items-center gap-1.5 text-xs text-[#BDBDBD]">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All articles */}
        <h2 className="text-lg font-bold text-[#0A0A0A] mb-4">All Guides</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((article) => (
            <Link
              key={article.slug}
              href={`/learn/${article.slug}`}
              className="group bg-white border border-[#E5E5E5] rounded-[10px] p-5 hover:border-[#E65C00] transition-all duration-200"
            >
              <div className="text-2xl mb-3">{article.emoji}</div>
              <Badge variant="outline" className="text-[10px] mb-2">{article.category}</Badge>
              <h3 className="font-semibold text-sm text-[#0A0A0A] mb-2 group-hover:text-[#E65C00] transition-colors leading-snug">
                {article.title}
              </h3>
              <p className="text-xs text-[#9E9E9E] leading-relaxed line-clamp-3 mb-3">{article.excerpt}</p>
              <div className="flex items-center gap-1.5 text-xs text-[#BDBDBD]">
                <Clock className="w-3 h-3" />
                {article.readTime}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
