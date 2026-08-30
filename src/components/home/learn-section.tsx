import React from "react";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const articles = [
  {
    slug: "how-to-choose-t-con-board",
    title: "How to Choose the Right T-CON Board for LCD & LED Repair",
    excerpt: "A practical guide to selecting the correct T-CON board for your display repair — covering compatibility, connector configuration and panel specifications.",
    category: "Buying Guides",
    readTime: "6 min read",
    emoji: "🔲",
  },
  {
    slug: "lcd-led-display-repair-bench-setup",
    title: "Professional LCD & LED Display Repair Bench Setup",
    excerpt: "What every professional display repair technician needs on their bench — from panel handling to board-level diagnostics and COF repair equipment.",
    category: "Repair Guides",
    readTime: "8 min read",
    emoji: "🖥️",
  },
  {
    slug: "essential-parts-cof-acf-repair",
    title: "Essential Parts for COF and ACF Repair",
    excerpt: "The core components and materials required for professional COF bonding, ACF tape application and ACF removal on LCD and LED display panels.",
    category: "Tool Guides",
    readTime: "5 min read",
    emoji: "✂️",
  },
  {
    slug: "understanding-lvds-cables",
    title: "Understanding LVDS Cables and Display Connections",
    excerpt: "A guide to LVDS connectors, cable configurations and compatibility for LCD and LED display repair and board replacement work.",
    category: "Technical Guides",
    readTime: "4 min read",
    emoji: "🔗",
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
              Technical guides for display repair professionals.
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
