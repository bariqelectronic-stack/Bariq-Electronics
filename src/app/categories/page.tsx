import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Product Categories",
  description: "Browse all product categories — microscopes, soldering tools, screwdrivers, PCB tools and more.",
};

const categories = [
  { name: "Microscopes", slug: "microscopes", desc: "Stereo, trinocular and digital microscopes for repair and inspection.", emoji: "🔬", count: null },
  { name: "Microscope Cameras", slug: "microscope-cameras", desc: "High-resolution USB cameras for microscope integration.", emoji: "📷", count: null },
  { name: "Soldering Tools", slug: "soldering-tools", desc: "Stations, irons, tips and hot air equipment.", emoji: "⚡", count: null },
  { name: "Precision Screwdrivers", slug: "screwdrivers", desc: "Sets and individual drivers for mobile and electronics repair.", emoji: "🔩", count: null },
  { name: "PCB Repair Tools", slug: "pcb-repair", desc: "Board-level diagnostics and component rework tools.", emoji: "🔧", count: null },
  { name: "Cleaning Tools", slug: "cleaning-tools", desc: "Anti-static brushes, swabs and cleaning fluids.", emoji: "🧹", count: null },
  { name: "Repair Cables", slug: "repair-cables", desc: "Power boot cables and diagnostic test lines.", emoji: "🔌", count: null },
  { name: "Lab Tools", slug: "lab-tools", desc: "Multimeters, power supplies and bench equipment.", emoji: "🧪", count: null },
  { name: "Accessories", slug: "accessories", desc: "ESD mats, tweezers, organizers and workshop essentials.", emoji: "📦", count: null },
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
