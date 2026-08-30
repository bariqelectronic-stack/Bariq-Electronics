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
  "lcd-panel-repair": {
    title: "LCD PANEL REPAIR",
    subtitle: "Essential parts and solutions for professional LCD panel repair",
    desc: "LCD panel repair requires the right components, materials and tools. From display connection parts to panel repair materials — having the correct products for each stage of the repair process is essential for professional results.",
    toolCategories: ["COFS", "LVDS Cables", "ACF Tape", "Head Assembly", "Panel Repair Materials", "Display Connection Parts"],
    keyFeatures: ["LCD panel servicing", "Display connection repair", "Panel-level component work", "COF bonding and repair", "ACF application"],
    categorySlugs: ["cofs", "lvds", "acf-tape"],
  },
  "led-display-repair": {
    title: "LED DISPLAY REPAIR",
    subtitle: "Professional repair parts for LED displays and television panels",
    desc: "LED display repair covers board replacement, panel troubleshooting and component-level servicing of LED television and display systems. The right parts and components make diagnosis and restoration faster and more reliable.",
    toolCategories: ["LED & LCD Boards", "T-CON Boards", "LVDS Cables", "SCALLER", "QUARD", "Replacement Components"],
    keyFeatures: ["LED panel diagnosis", "Display board replacement", "Panel signal troubleshooting", "Board-level repair", "Display restoration"],
    categorySlugs: ["led-lcd-boards", "t-con", "lvds"],
  },
  "cof-acf-repair": {
    title: "COF & ACF REPAIR",
    subtitle: "Specialized products for COF and ACF bonding and panel repair",
    desc: "COF and ACF repair involves precise bonding, removal and preparation work on LCD and LED display panels. Professional COF and ACF repair requires the correct materials, cutters and handling equipment for consistent results.",
    toolCategories: ["COFS", "ACF Tape", "ACF Remover", "COF Cutters", "Head Assembly", "Foam"],
    keyFeatures: ["COF bonding and repair", "ACF tape application", "ACF residue removal", "COF cutting and preparation", "Panel bonding work"],
    categorySlugs: ["cofs", "acf-tape", "acf-remover", "cof-cutter"],
  },
  "display-board-repair": {
    title: "DISPLAY BOARD REPAIR",
    subtitle: "Display boards and components for LED and LCD television repair",
    desc: "Display board repair covers T-CON boards, LED and LCD boards, LVDS connections and T-CON programming for professional television and display servicing. Identify and replace faulty boards to restore display functionality.",
    toolCategories: ["T-CON Boards", "LED & LCD Boards", "LVDS Solutions", "T-CON Programmers", "SCALLER", "QUARD"],
    keyFeatures: ["T-CON board diagnosis and replacement", "LED/LCD board servicing", "LVDS signal troubleshooting", "T-CON programming", "Display board restoration"],
    categorySlugs: ["t-con", "led-lcd-boards", "lvds", "t-con-programmer"],
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
              <h3 className="font-bold text-[#0A0A0A] text-sm mb-3">Product Categories</h3>
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
