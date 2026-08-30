import React from "react";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const articles = [
  {
    slug: "how-to-choose-a-microscope-for-microsoldering",
    title: "How to Choose a Microscope for Microsoldering",
    excerpt: "A practical guide to selecting the right magnification, working distance and optical system for microsoldering and mobile repair work.",
    category: "Buying Guides",
    readTime: "6 min read",
    emoji: "🔬",
  },
  {
    slug: "professional-mobile-repair-bench-setup",
    title: "Professional Mobile Repair Bench Setup",
    excerpt: "What every professional repair technician needs on their bench — from lighting and magnification to organization and safety.",
    category: "Repair Guides",
    readTime: "8 min read",
    emoji: "🔧",
  },
  {
    slug: "essential-tools-for-pcb-repair",
    title: "Essential Tools for PCB Repair",
    excerpt: "The core toolkit for printed circuit board repair work — microscopes, soldering stations, multimeters and more.",
    category: "Tool Guides",
    readTime: "5 min read",
    emoji: "⚙️",
  },
  {
    slug: "microsoldering-equipment-checklist",
    title: "Microsoldering Equipment Checklist",
    excerpt: "A complete checklist of tools and equipment required to begin microsoldering work on modern mobile devices.",
    category: "Microsoldering",
    readTime: "4 min read",
    emoji: "✅",
  },
];

export function LearnSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container-site">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E65C00] mb-2">
              Knowledge Base
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] tracking-tight">
              Guides & Resources
            </h2>
            <p className="text-sm text-[#9E9E9E] mt-1">
              Technical guides for repair professionals.
            </p>
          </div>
          <Link
            href="/learn"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-[#E65C00] hover:text-[#CC5000] transition-colors"
          >
            All guides <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/learn/${article.slug}`}
              className="group bg-[#F7F7F7] border border-[#F0F0F0] rounded-[10px] p-5 hover:bg-white hover:border-[#E5E5E5] hover:shadow-[0_4px_16px_0_rgba(0,0,0,0.06)] transition-all duration-200"
            >
              <div className="text-2xl mb-3">{article.emoji}</div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-[10px]">{article.category}</Badge>
              </div>
              <h3 className="font-semibold text-sm text-[#0A0A0A] mb-2 group-hover:text-[#E65C00] transition-colors leading-snug">
                {article.title}
              </h3>
              <p className="text-xs text-[#9E9E9E] leading-relaxed line-clamp-3 mb-4">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-[#BDBDBD]">
                <Clock className="w-3 h-3" />
                {article.readTime}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
