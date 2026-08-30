import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Learn — Display Repair Guides & Resources",
  description: "Technical guides, buying guides and resources for LCD and LED display repair professionals.",
};

const articles = [
  {
    slug: "how-to-choose-t-con-board",
    title: "How to Choose the Right T-CON Board for LCD & LED Repair",
    excerpt: "A practical guide to selecting the correct T-CON board for your display repair — covering compatibility, connector configuration and panel specifications. Understand what to check before ordering a replacement T-CON board.",
    category: "Buying Guides",
    readTime: "6 min read",
    emoji: "🔲",
    featured: true,
  },
  {
    slug: "lcd-led-display-repair-bench-setup",
    title: "Professional LCD & LED Display Repair Bench Setup",
    excerpt: "What every professional display repair technician needs on their bench — from panel handling and board diagnostics to COF repair equipment and proper workspace organisation.",
    category: "Repair Guides",
    readTime: "8 min read",
    emoji: "🖥️",
    featured: true,
  },
  {
    slug: "essential-parts-cof-acf-repair",
    title: "Essential Parts for COF and ACF Repair",
    excerpt: "The core components and materials required for professional COF bonding, ACF tape application and ACF removal on LCD and LED display panels.",
    category: "Tool Guides",
    readTime: "5 min read",
    emoji: "✂️",
    featured: false,
  },
  {
    slug: "understanding-lvds-cables",
    title: "Understanding LVDS Cables and Display Connections",
    excerpt: "A guide to LVDS connectors, cable configurations and compatibility for LCD and LED display repair and board replacement work.",
    category: "Technical Guides",
    readTime: "4 min read",
    emoji: "🔗",
    featured: false,
  },
  {
    slug: "t-con-programming-guide",
    title: "T-CON Programming: A Complete Guide for Display Repair",
    excerpt: "How T-CON programmer tools work, which boards they support, and how to use them in professional LCD and LED display repair workflows.",
    category: "Technical Guides",
    readTime: "5 min read",
    emoji: "💾",
    featured: false,
  },
  {
    slug: "acf-tape-application-guide",
    title: "ACF Tape Application Guide for Panel Repair",
    excerpt: "A step-by-step overview of ACF tape selection, handling and application for professional display panel bonding and COF repair.",
    category: "Repair Guides",
    readTime: "4 min read",
    emoji: "🎞️",
    featured: false,
  },
];

const categories = [
  "All", "Buying Guides", "Repair Guides", "Tool Guides", "Technical Guides",
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
            Technical guides, buying advice and resources for LCD and LED display repair professionals.
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
