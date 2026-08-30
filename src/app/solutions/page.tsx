import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Solutions — LCD & LED Display Repair",
  description: "Professional LCD and LED display repair solutions for technicians — LCD panel repair, LED display repair, COF & ACF repair, and display board repair.",
};

const solutions = [
  {
    slug: "lcd-panel-repair",
    title: "LCD PANEL REPAIR",
    desc: "Essential parts and solutions for professional LCD panel repair, servicing and restoration.",
    emoji: "🖥️",
  },
  {
    slug: "led-display-repair",
    title: "LED DISPLAY REPAIR",
    desc: "Professional repair parts for LED displays and television panels, helping technicians diagnose and restore display systems.",
    emoji: "📺",
  },
  {
    slug: "cof-acf-repair",
    title: "COF & ACF REPAIR",
    desc: "Specialized products for COF and ACF bonding, removal, cutting and professional LCD/LED panel repair.",
    emoji: "✂️",
  },
  {
    slug: "display-board-repair",
    title: "DISPLAY BOARD REPAIR",
    desc: "Display boards and related components for professional LED and LCD television repair and troubleshooting.",
    emoji: "🔲",
  },
];

export default function SolutionsPage() {
  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="container-site py-10">
          <nav className="text-xs text-[#9E9E9E] mb-3 flex items-center gap-1.5">
            <Link href="/" className="hover:text-[#0A0A0A]">Home</Link>
            <span>/</span>
            <span>Solutions</span>
          </nav>
          <h1 className="text-2xl font-black text-[#0A0A0A] tracking-tight mb-2">Solutions</h1>
          <p className="text-sm text-[#6B6B6B]">Professional LCD and LED display repair parts for every application.</p>
        </div>
      </div>
      <div className="container-site py-10">
        <div className="grid sm:grid-cols-2 gap-5">
          {solutions.map((sol) => (
            <Link
              key={sol.slug}
              href={`/solutions/${sol.slug}`}
              className="group bg-white border border-[#E5E5E5] rounded-[12px] p-7 hover:border-[#E65C00] hover:shadow-[0_4px_16px_0_rgba(230,92,0,0.1)] transition-all duration-200"
            >
              <div className="text-3xl mb-4">{sol.emoji}</div>
              <h2 className="text-lg font-bold text-[#0A0A0A] mb-2 group-hover:text-[#E65C00] transition-colors">{sol.title}</h2>
              <p className="text-sm text-[#6B6B6B] leading-relaxed mb-4">{sol.desc}</p>
              <div className="flex items-center gap-1 text-sm font-medium text-[#E65C00]">
                Explore solution <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
