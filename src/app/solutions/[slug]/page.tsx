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
};

const SOLUTIONS: Record<string, Solution> = {
  "lcd-panel-repair": {
    name: "LCD Panel Repair",
    description:
      "Essential parts and solutions for professional LCD panel repair, servicing and restoration.",
    categorySlugs: ["led-lcd-boards", "t-con", "lvds"],
  },

  "led-display-repair": {
    name: "LED Display Repair",
    description:
      "Professional repair parts for LED displays and television panels, helping technicians diagnose and restore display systems.",
    categorySlugs: ["led-lcd-boards", "lvds", "t-con"],
  },

  "cof-acf-repair": {
    name: "COF & ACF Repair",
    description:
      "Specialized products for COF and ACF bonding, removal, cutting and professional LCD/LED panel repair.",
    categorySlugs: ["cofs", "acf-tape", "head-assembly"],
  },

  "display-board-repair": {
    name: "Display Board Repair",
    description:
      "Display boards and related components for professional LED and LCD television repair and troubleshooting.",
    categorySlugs: ["led-lcd-boards", "t-con", "scaller", "quard"],
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
    title: solution.name,
    description: solution.description,
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

  return (
    <div className="bg-[#F7F7F7] min-h-screen">
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
              No products in this solution yet
            </p>

            <p className="text-sm text-[#9E9E9E] mt-1">
              Add products in the{" "}
              <Link
                href="/admin/products"
                className="text-[#E65C00] underline"
              >
                admin panel
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}