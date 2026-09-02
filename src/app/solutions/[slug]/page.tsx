import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { ProductCard } from "@/components/shop/product-card";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { Button } from "@/components/ui/button";

interface SolutionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createServerSupabaseClient();
  const { data: solution } = await supabase
    .from("solutions")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!solution) return { title: "Solution Not Found" };
  return {
    title: solution.name,
    description: solution.description ?? `Browse ${solution.name} solutions`,
  };
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { slug } = await params;
  const supabase = await createServerSupabaseClient();

  const { data: solution } = await supabase
    .from("solutions")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!solution) notFound();

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("solutions_id", solution.id)
    .order("created_at", { ascending: false });

  const productList = products ?? [];

  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="container-site py-8">
          <nav className="text-xs text-[#9E9E9E] mb-3 flex items-center gap-1.5">
            <Link href="/" className="hover:text-[#0A0A0A]">Home</Link>
            <span>/</span>
            <Link href="/solutions" className="hover:text-[#0A0A0A]">Solutions</Link>
            <span>/</span>
            <span className="text-[#0A0A0A]">{solution.name}</span>
          </nav>
          <div>
            <h1 className="text-2xl font-black text-[#0A0A0A] tracking-tight">{solution.name}</h1>
            {solution.description && (
              <p className="text-sm text-[#6B6B6B] mt-1 max-w-2xl">{solution.description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Products list */}
      <div className="container-site py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <p className="text-sm text-[#6B6B6B]">
              {productList.length} {productList.length === 1 ? "product" : "products"}
            </p>
          </div>
          <Link href="/shop" className="text-sm text-[#E65C00] hover:underline">
            Browse all categories
          </Link>
        </div>

        {productList.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {productList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-dashed border-[#E5E5E5] rounded-[10px] py-20 text-center">
            <p className="font-semibold text-[#0A0A0A]">No products in this solution yet</p>
            <p className="text-sm text-[#9E9E9E] mt-1">
              Add products in the <Link href="/admin/products" className="text-[#E65C00] underline">admin panel</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}