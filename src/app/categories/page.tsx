import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Product Categories",
  description: "Browse all product categories — COFS, LVDS, LED & LCD boards, T-CON, ACF tape, COF cutters and more.",
};

const categories = [
  { name: "Microscopes",       slug: "microscopes",      desc: "Trinocular, binocular and digital microscopes for display repair.",          emoji: "🔬", count: null },
  { name: "COFS",              slug: "cofs",             desc: "Chip-on-film connectors for LCD and display bonding.",                       emoji: "🔲", count: null },
  { name: "LVDS",              slug: "lvds",             desc: "LVDS cables and connectors for display signal transmission.",               emoji: "🔗", count: null },
  { name: "LED & LCD BOARDS",  slug: "led-lcd-boards",   desc: "LED driver boards and LCD display panels for TV repair.",                   emoji: "📺", count: null },
  { name: "T-CON",             slug: "t-con",            desc: "Timing controller boards for LCD/LED panel signal processing.",             emoji: "🖥️", count: null },
  { name: "SCALLER",           slug: "scaller",          desc: "Scaler boards and chips for display signal conversion.",                    emoji: "📡", count: null },
  { name: "QUARD",             slug: "quard",            desc: "Quard display boards and components.",                                      emoji: "🔳", count: null },
  { name: "FOAM",              slug: "foam",             desc: "Foam padding and cushioning materials for display assembly.",               emoji: "🧱", count: null },
  { name: "T-CON PROGRAMMER",  slug: "t-con-programmer", desc: "Programmer tools for flashing and repairing T-CON boards.",                emoji: "💾", count: null },
  { name: "HEAD ASSEMBLY",     slug: "head-assembly",    desc: "Head assembly components for display bonding and repair.",                  emoji: "⚙️", count: null },
  { name: "ACF TAPE",          slug: "acf-tape",         desc: "Anisotropic conductive film tape for COF bonding.",                        emoji: "🎞️", count: null },
  { name: "ACF REMOVER",       slug: "acf-remover",      desc: "Chemical solutions for ACF residue removal from display panels.",          emoji: "🧪", count: null },
  { name: "COF CUTTER",        slug: "cof-cutter",       desc: "Precision cutters for chip-on-film trimming and preparation.",             emoji: "✂️", count: null },
  { name: "TAPE",              slug: "tape",             desc: "Adhesive tapes for display assembly and component securing.",              emoji: "📏", count: null },
];

export default function CategoriesPage() {
  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="container-site py-8">
          <nav className="text-xs text-[#9E9E9E] mb-3 flex items-center gap-1.5">
            <Link href="/" className="hover:text-[#0A0A0A]">Home</Link>
            <span>/</span>
            <span className="text-[#0A0A0A]">Categories</span>
          </nav>
          <h1 className="text-2xl font-black text-[#0A0A0A] tracking-tight">Product Categories</h1>
        </div>
      </div>

      <div className="container-site py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
              className="group bg-white border border-[#E5E5E5] rounded-[12px] p-6 hover:border-[#E65C00] hover:shadow-[0_4px_16px_0_rgba(230,92,0,0.1)] transition-all duration-200"
            >
              <div className="text-3xl mb-4">{cat.emoji}</div>
              <h2 className="font-bold text-[#0A0A0A] mb-2 group-hover:text-[#E65C00] transition-colors text-lg">
                {cat.name}
              </h2>
              <p className="text-sm text-[#6B6B6B] leading-relaxed mb-4">{cat.desc}</p>
              <div className="flex items-center gap-1.5 text-sm font-medium text-[#E65C00]">
                Browse products <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
