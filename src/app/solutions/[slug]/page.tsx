import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/shop/product-card";
import { createServerSupabaseClient } from "@/lib/supabase-server";

interface SolutionPageProps {
  params: Promise<{ slug: string }>;
}

type Solution = {
  name: string;
  description: string;
  categorySlugs: string[];
  guideLinks: { label: string; href: string }[];
  featuredProductLinks: { label: string; href: string }[];
};

const SOLUTIONS: Record<string, Solution> = {
  "lcd-panel-repair": {
    name: "LCD Panel Repair",
    description:
      "Essential parts and solutions for professional LCD panel repair, servicing, signal restoration, and board-to-panel connectivity.",
    categorySlugs: ["led-lcd-boards", "t-con", "lvds"],
    guideLinks: [
      { label: "LVDS Cable Guide: Connectors, Pinouts & Compatibility", href: "/learn/understanding-lvds-cables" },
      { label: "How to Choose the Right T-CON Board", href: "/learn/how-to-choose-t-con-board" },
      { label: "Professional LCD & LED Display Repair Bench Setup", href: "/learn/lcd-led-display-repair-bench-setup" },
    ],
    featuredProductLinks: [
      { label: "LVDS Display Cables", href: "/products/lvds" },
      { label: "4K LVDS Cable", href: "/products/4k-lvds" },
      { label: "T-CON Boards", href: "/products/t-con" },
      { label: "Panel", href: "/products/panel" },
    ],
  },

  "led-display-repair": {
    name: "LED Display Repair",
    description:
      "Professional repair parts for LED displays and television panels, helping technicians diagnose and restore display signal and board systems.",
    categorySlugs: ["led-lcd-boards", "lvds", "t-con"],
    guideLinks: [
      { label: "Professional LCD & LED Display Repair Bench Setup", href: "/learn/lcd-led-display-repair-bench-setup" },
      { label: "LVDS Cable Guide: Connectors, Pinouts & Compatibility", href: "/learn/understanding-lvds-cables" },
      { label: "How to Choose the Right T-CON Board", href: "/learn/how-to-choose-t-con-board" },
    ],
    featuredProductLinks: [
      { label: "LVDS Display Cables", href: "/products/lvds" },
      { label: "Samsung Main Board", href: "/products/samsung-main-board" },
      { label: "TCL Main Board", href: "/products/tcl-main-board" },
      { label: "T-CON Board", href: "/products/t-con" },
    ],
  },

  "cof-acf-repair": {
    name: "COF & ACF Repair",
    description:
      "Specialized products for COF (Chip-on-Film) bonding, ACF conductive tape application, ACF adhesive residue removal, COF cutting, and panel bonding.",
    categorySlugs: ["cofs", "acf-tape", "head-assembly"],
    guideLinks: [
      { label: "Essential Parts for COF and ACF Repair", href: "/learn/essential-parts-cof-acf-repair" },
      { label: "ACF Tape Application Guide for Panel Repair", href: "/learn/acf-tape-application-guide" },
    ],
    featuredProductLinks: [
      { label: "COFS", href: "/products/cofs" },
      { label: "ACF Remover", href: "/products/acf-remover" },
      { label: "ACF Tape", href: "/products/acf-tape" },
      { label: "ACF Tape (7813)", href: "/products/acf-tape-7813" },
      { label: "COF Cutter", href: "/products/cof-cutter" },
      { label: "Head 68mm, 50mm, X1.2/1.4", href: "/products/head-68mm-50mm-x1214" },
    ],
  },

  "display-board-repair": {
    name: "Display Board Repair",
    description:
      "Display boards, T-CON boards, T-CON programmers, scaler boards, and related components for professional LED and LCD television repair and troubleshooting.",
    categorySlugs: ["led-lcd-boards", "t-con", "scaller", "quard"],
    guideLinks: [
      { label: "How to Choose the Right T-CON Board", href: "/learn/how-to-choose-t-con-board" },
      { label: "T-CON Programming: A Complete Guide for Display Repair", href: "/learn/t-con-programming-guide" },
      { label: "LVDS Cable Guide: Connectors, Pinouts & Compatibility", href: "/learn/understanding-lvds-cables" },
    ],
    featuredProductLinks: [
      { label: "T-CON Board", href: "/products/t-con" },
      { label: "T-CON Programmer", href: "/products/t-con-programmer" },
      { label: "Scalar Board", href: "/products/scalar" },
      { label: "Quard", href: "/products/quard" },
    ],
  },
};

function getSolution(slug: string) {
  return SOLUTIONS[slug];
}

export async function generateMetadata({
  params,
}: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);

  if (!solution) {
    return {
      title: "Solution Not Found",
    };
  }

  return {
    title: `${solution.name} — LCD & LED Display Repair Solutions`,
    description: solution.description,
    alternates: {
      canonical: `https://www.bariqelectronics.com/solutions/${encodeURIComponent(slug)}`,
    },
  };
}

export default async function SolutionPage({
  params,
}: SolutionPageProps) {
  const { slug } = await params;
  const solution = getSolution(slug);

  if (!solution) {
    notFound();
  }

  const supabase = await createServerSupabaseClient();

  // Find the real category IDs from the existing categories table.
  const { data: categories } = await supabase
    .from("categories")
    .select("id, slug")
    .in("slug", solution.categorySlugs);

  const categoryIds = (categories ?? []).map((category) => category.id);

  let products: any[] = [];

  if (categoryIds.length > 0) {
    const result = await supabase
      .from("products")
      .select("*")
      .in("category_id", categoryIds)
      .order("created_at", { ascending: false });

    products = result.data ?? [];
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.bariqelectronics.com" },
      { "@type": "ListItem", position: 2, name: "Solutions", item: "https://www.bariqelectronics.com/solutions" },
      { "@type": "ListItem", position: 3, name: solution.name, item: `https://www.bariqelectronics.com/solutions/${encodeURIComponent(slug)}` },
    ],
  };

  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* Header */}
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="container-site py-8">
          <nav className="text-xs text-[#9E9E9E] mb-3 flex items-center gap-1.5">
            <Link
              href="/"
              className="hover:text-[#0A0A0A]"
            >
              Home
            </Link>

            <span>/</span>

            <Link
              href="/solutions"
              className="hover:text-[#0A0A0A]"
            >
              Solutions
            </Link>

            <span>/</span>

            <span className="text-[#0A0A0A]">
              {solution.name}
            </span>
          </nav>

          <div>
            <h1 className="text-2xl font-black text-[#0A0A0A] tracking-tight">
              {solution.name}
            </h1>

            <p className="text-sm text-[#6B6B6B] mt-1 max-w-2xl">
              {solution.description}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {solution.featuredProductLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-medium bg-[#F7F7F7] border border-[#E5E5E5] rounded-full px-3 py-1 text-[#3D3D3D] hover:border-[#E65C00] hover:text-[#E65C00] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="container-site py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <p className="text-sm text-[#6B6B6B]">
              {products.length}{" "}
              {products.length === 1 ? "product" : "products"}
            </p>
          </div>

          <Link
            href="/shop"
            className="flex items-center gap-1 text-sm text-[#E65C00] hover:underline"
          >
            Browse all products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-dashed border-[#E5E5E5] rounded-[10px] py-20 text-center">
            <p className="font-semibold text-[#0A0A0A]">
              Enquire for {solution.name} products
            </p>

            <p className="text-sm text-[#9E9E9E] mt-1">
              Contact our team via{" "}
              <Link href="/contact" className="text-[#E65C00] underline">
                our contact page
              </Link>{" "}
              for specifications and availability.
            </p>
          </div>
        )}

        {/* Related Guides */}
        {solution.guideLinks.length > 0 && (
          <div className="mt-10 bg-white border border-[#E5E5E5] rounded-[12px] p-6">
            <h2 className="text-base font-bold text-[#0A0A0A] mb-3">
              Related Technical Guides for {solution.name}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {solution.guideLinks.map((g) => (
                <Link
                  key={g.href}
                  href={g.href}
                  className="text-sm text-[#3D3D3D] hover:text-[#E65C00] border border-[#F0F0F0] rounded-[8px] p-3.5 transition-colors flex items-center justify-between gap-2"
                >
                  <span>{g.label}</span>
                  <ArrowRight className="w-4 h-4 text-[#E65C00] flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}