import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { ProductCard } from "@/components/shop/product-card";
import { demoProducts } from "@/lib/demo-products";
import { Button } from "@/components/ui/button";

const solutions: Record<string, {
  title: string;
  subtitle: string;
  desc: string;
  toolCategories: string[];
  keyFeatures: string[];
  categorySlugs: string[];
}> = {
  "mobile-phone-repair": {
    title: "Mobile Phone Repair",
    subtitle: "Complete toolkit for professional smartphone repair",
    desc: "Mobile phone repair requires a combination of precision hand tools, magnification and diagnostic equipment. From screen replacement to board-level microsoldering — having the right tools for each task makes the difference.",
    toolCategories: ["Precision Screwdrivers", "Microscopes", "Soldering Tools", "Cleaning Tools", "Opening Tools", "Repair Cables"],
    keyFeatures: ["Screen replacement tools", "Logic board repair", "Component replacement", "Battery replacement", "Camera and sensor work"],
    categorySlugs: ["screwdrivers", "microscopes"],
  },
  "microsoldering": {
    title: "Microsoldering",
    subtitle: "Precision equipment for chip-level repair work",
    desc: "Microsoldering involves soldering work at the chip and component level on mobile phone and electronics PCBs. The work is extremely fine — requiring proper magnification, temperature-controlled soldering and precision handling.",
    toolCategories: ["Stereo Microscopes", "Soldering Stations", "Hot Air Stations", "Flux & Solder", "Fine Tweezers", "PCB Holders"],
    keyFeatures: ["Chip replacement", "BGA rework", "Pad repair", "Component bridging", "Trace repair"],
    categorySlugs: ["microscopes", "soldering-tools"],
  },
  "pcb-repair": {
    title: "PCB Repair",
    subtitle: "Diagnostic and rework tools for circuit board repair",
    desc: "PCB repair covers board-level diagnostics, component testing, trace repair and rework of circuit boards in mobile phones, laptops and other electronics.",
    toolCategories: ["Microscopes", "Multimeters", "Hot Air Stations", "Soldering Equipment", "Cleaning Tools", "Repair Cables"],
    keyFeatures: ["Component diagnostics", "Trace repair", "Pad cleaning", "Rework and reballing", "Contamination removal"],
    categorySlugs: ["microscopes", "pcb-repair"],
  },
  "electronics-laboratory": {
    title: "Electronics Laboratory",
    subtitle: "Complete bench equipment for electronics work",
    desc: "A professional electronics laboratory requires a complete range of test, measurement and repair equipment. From bench power supplies to oscilloscopes and diagnostic tools — build a complete workspace.",
    toolCategories: ["Bench Power Supplies", "Multimeters", "Oscilloscopes", "Soldering Equipment", "Microscopes", "Component Storage"],
    keyFeatures: ["Circuit development", "Component testing", "Fault diagnosis", "Prototype assembly", "Production testing"],
    categorySlugs: ["lab-tools"],
  },
};

interface SolutionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sol = solutions[slug];
  if (!sol) return { title: "Solution Not Found" };
  return {
    title: sol.title,
    description: sol.desc,
  };
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { slug } = await params;
  const sol = solutions[slug];
  if (!sol) notFound();

  const relatedProducts = demoProducts.filter((p) =>
    sol.categorySlugs.some((s) => p.category?.slug === s)
  ).slice(0, 4);

  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <div className="bg-[#0A0A0A]">
        <div className="container-site py-14">
          <nav className="text-xs text-[#6B6B6B] mb-4 flex items-center gap-1.5">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/solutions" className="hover:text-white">Solutions</Link>
            <span>/</span>
            <span className="text-[#9E9E9E]">{sol.title}</span>
          </nav>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-8 bg-[#E65C00]" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E65C00]">Solutions</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight mb-3">{sol.title}</h1>
          <p className="text-[#9E9E9E] text-base max-w-xl leading-relaxed">{sol.subtitle}</p>
        </div>
      </div>

      <div className="container-site py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6">
              <h2 className="font-bold text-[#0A0A0A] mb-3">Overview</h2>
              <p className="text-sm text-[#6B6B6B] leading-relaxed">{sol.desc}</p>
            </div>

            <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6">
              <h2 className="font-bold text-[#0A0A0A] mb-4">Key Applications</h2>
              <ul className="space-y-2">
                {sol.keyFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-[#3D3D3D]">
                    <Check className="w-3.5 h-3.5 text-[#E65C00] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {relatedProducts.length > 0 && (
              <div>
                <h2 className="font-bold text-[#0A0A0A] mb-4">Relevant Products</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {relatedProducts.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-5">
              <h3 className="font-bold text-[#0A0A0A] text-sm mb-3">Tool Categories</h3>
              <ul className="space-y-2">
                {sol.toolCategories.map((cat) => (
                  <li key={cat} className="text-sm text-[#6B6B6B] flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-[#E65C00] rounded-full" />
                    {cat}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <Link href="/shop">
                <Button className="w-full font-bold text-sm">
                  Browse Products <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="w-full font-semibold text-sm">
                  Get Expert Advice
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return Object.keys(solutions).map((slug) => ({ slug }));
}
