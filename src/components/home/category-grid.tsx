import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  { name: "Microscopes",       slug: "microscopes",      desc: "Trinocular, binocular and digital microscopes for display repair",  emoji: "🔬", bg: "#F7F3EE", accent: "#E65C00" },
  { name: "COFS",              slug: "cofs",             desc: "Chip-on-film connectors for LCD and display bonding",               emoji: "🔲", bg: "#EEF4F7", accent: "#2563EB" },
  { name: "LVDS",              slug: "lvds",             desc: "LVDS cables and connectors for display signal transmission",        emoji: "🔗", bg: "#F7F4EE", accent: "#CA8A04" },
  { name: "LED & LCD BOARDS",  slug: "led-lcd-boards",   desc: "LED driver boards and LCD display panels for TV repair",           emoji: "📺", bg: "#EEF7EE", accent: "#16A34A" },
  { name: "T-CON",             slug: "t-con",            desc: "Timing controller boards for LCD/LED panel signal processing",     emoji: "🖥️", bg: "#F7EEEE", accent: "#DC2626" },
  { name: "SCALLER",           slug: "scaller",          desc: "Scaler boards and chips for display signal conversion",            emoji: "📡", bg: "#EEF7F7", accent: "#0891B2" },
  { name: "QUARD",             slug: "quard",            desc: "Quard display boards and components",                              emoji: "🔳", bg: "#F4EEF7", accent: "#7C3AED" },
  { name: "FOAM",              slug: "foam",             desc: "Foam padding and cushioning materials for display assembly",       emoji: "🧱", bg: "#F7F7EE", accent: "#65A30D" },
  { name: "T-CON PROGRAMMER",  slug: "t-con-programmer", desc: "Programmer tools for flashing and repairing T-CON boards",        emoji: "💾", bg: "#F7EEF4", accent: "#DB2777" },
  { name: "HEAD ASSEMBLY",     slug: "head-assembly",    desc: "Head assembly components for display bonding and repair",          emoji: "⚙️", bg: "#F7F3EE", accent: "#E65C00" },
  { name: "ACF TAPE",          slug: "acf-tape",         desc: "Anisotropic conductive film tape for COF bonding",                 emoji: "🎞️", bg: "#EEF4F7", accent: "#2563EB" },
  { name: "ACF REMOVER",       slug: "acf-remover",      desc: "Chemical solutions for ACF residue removal from display panels",  emoji: "🧪", bg: "#F7F4EE", accent: "#CA8A04" },
  { name: "COF CUTTER",        slug: "cof-cutter",       desc: "Precision cutters for chip-on-film trimming and preparation",     emoji: "✂️", bg: "#EEF7EE", accent: "#16A34A" },
  { name: "TAPE",              slug: "tape",             desc: "Adhesive tapes for display assembly and component securing",      emoji: "📏", bg: "#EEF7F7", accent: "#0891B2" },
];

export function CategoryGrid() {
  return (
    <section className="py-16 bg-[#F7F7F7]">
      <div className="container-site">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E65C00] mb-2">
              Browse by Category
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] tracking-tight">
              Shop by Category
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-[#E65C00] hover:text-[#CC5000] transition-colors"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group relative bg-white border border-[#E5E5E5] rounded-[10px] p-5 hover:border-[#D0D0D0] hover:shadow-[0_4px_16px_0_rgba(0,0,0,0.08)] transition-all duration-200"
            >
              <div
                className="w-10 h-10 rounded-[8px] flex items-center justify-center text-xl mb-4"
                style={{ backgroundColor: cat.bg }}
              >
                {cat.emoji}
              </div>
              <h3 className="font-semibold text-[#0A0A0A] text-sm mb-1 group-hover:text-[#E65C00] transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-[#9E9E9E] leading-relaxed line-clamp-2">{cat.desc}</p>
              <div className="flex items-center gap-1 mt-3 text-xs font-medium text-[#6B6B6B] group-hover:text-[#E65C00] transition-colors">
                Browse <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
