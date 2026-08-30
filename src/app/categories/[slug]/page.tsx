import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/shop/product-card";
import { Badge } from "@/components/ui/badge";
import { getProductsByCategory } from "@/lib/demo-products";

const CATEGORY_META: Record<string, { name: string; desc: string; longDesc: string; emoji: string }> = {
  "microscopes": {
    name: "Microscopes",
    emoji: "🔬",
    desc: "Professional stereo and digital microscopes for mobile phone repair, microsoldering and PCB inspection.",
    longDesc: "Choose from a range of trinocular, binocular and digital microscopes designed for professional repair and inspection work. Each microscope is selected for its suitability in mobile phone repair, PCB inspection and microsoldering environments.",
  },
  "microscope-cameras": {
    name: "Microscope Cameras",
    emoji: "📷",
    desc: "High-resolution digital cameras for microscope integration and live inspection.",
    longDesc: "Integrate a digital camera with your microscope to display a live feed on a monitor, record repair sessions, or document your work. Available in various resolutions and interface types.",
  },
  "soldering-tools": {
    name: "Soldering Tools",
    emoji: "⚡",
    desc: "Precision soldering stations, irons and tips for professional electronics work.",
    longDesc: "From temperature-controlled soldering stations to fine-tip irons for microsoldering, find the right soldering equipment for your repair bench.",
  },
  "screwdrivers": {
    name: "Precision Screwdrivers",
    emoji: "🔩",
    desc: "Complete sets and individual precision screwdrivers for mobile device repair.",
    longDesc: "Quality precision screwdrivers for mobile phone, tablet and laptop disassembly. ESD safe, with a wide range of bit sizes and profiles.",
  },
  "pcb-repair": {
    name: "PCB Repair Tools",
    emoji: "🔧",
    desc: "Professional tools for circuit board-level diagnostics and component rework.",
    longDesc: "Equipment for PCB-level repair, trace repair, component removal and diagnostics. Suitable for mobile phone motherboard and electronics board repair.",
  },
  "cleaning-tools": {
    name: "Cleaning Tools",
    emoji: "🧹",
    desc: "Anti-static brushes, swabs and cleaning solutions for electronics maintenance.",
    longDesc: "Keep your components and boards clean with professional anti-static brushes, IPA applicators, swabs and cleaning solutions.",
  },
  "repair-cables": {
    name: "Repair Cables",
    emoji: "🔌",
    desc: "Diagnostic power boot cables for mobile device PCB testing.",
    longDesc: "Specialized cables for testing and booting mobile device motherboards during repair. Compatible with various device models.",
  },
  "lab-tools": {
    name: "Lab Tools",
    emoji: "🧪",
    desc: "Bench equipment for electronics diagnostics, testing and development.",
    longDesc: "Multimeters, power supplies, oscilloscopes and other essential bench equipment for professional electronics workshops.",
  },
  "accessories": {
    name: "Accessories",
    emoji: "📦",
    desc: "ESD mats, tweezers, organizers and essential workshop accessories.",
    longDesc: "Everything else you need for a professional repair bench — ESD protection, precision tweezers, component organizers, lighting and more.",
  },
};

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORY_META[slug];
  if (!cat) return { title: "Category Not Found" };
  return {
    title: cat.name,
    description: cat.desc,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const cat = CATEGORY_META[slug];
  if (!cat) notFound();

  const products = getProductsByCategory(slug);

  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="container-site py-8">
          <nav className="text-xs text-[#9E9E9E] mb-3 flex items-center gap-1.5">
            <Link href="/" className="hover:text-[#0A0A0A]">Home</Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-[#0A0A0A]">Categories</Link>
            <span>/</span>
            <span className="text-[#0A0A0A]">{cat.name}</span>
          </nav>
          <div className="flex items-start gap-4">
            <div className="text-4xl">{cat.emoji}</div>
            <div>
              <h1 className="text-2xl font-black text-[#0A0A0A] tracking-tight">{cat.name}</h1>
              <p className="text-sm text-[#6B6B6B] mt-1 max-w-2xl">{cat.longDesc}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-site py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <p className="text-sm text-[#6B6B6B]">
              {products.length} {products.length === 1 ? "product" : "products"}
            </p>
            <Badge variant="demo">Demo</Badge>
          </div>
          <Link href="/shop" className="text-sm text-[#E65C00] hover:underline">
            Browse all categories
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-dashed border-[#E5E5E5] rounded-[10px] py-20 text-center">
            <div className="text-4xl mb-3">{cat.emoji}</div>
            <p className="font-semibold text-[#0A0A0A]">No products in this category yet</p>
            <p className="text-sm text-[#9E9E9E] mt-1">
              Add products in the{" "}
              <Link href="/admin/products" className="text-[#E65C00] underline">admin panel</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return Object.keys(CATEGORY_META).map((slug) => ({ slug }));
}
