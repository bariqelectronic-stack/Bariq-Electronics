import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/shop/product-card";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { Badge } from "@/components/ui/badge";

export async function FeaturedProducts() {
  const supabase = await createServerSupabaseClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(8);

  const productList = products ?? [];

  return (
    <section className="py-16 bg-white">
      <div className="container-site">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E65C00]">
                Featured
              </div>
              <Badge variant="demo">Featured Products</Badge>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] tracking-tight">
              Featured Equipment
            </h2>
            <p className="text-sm text-[#9E9E9E] mt-1">
              Browse our top-rated professional repair equipment.
            </p>
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-[#E65C00] hover:text-[#CC5000] transition-colors"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {productList.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {productList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-[#E5E5E5] rounded-[10px]">
            <div className="text-3xl mb-3">📦</div>
            <p className="text-[#6B6B6B] font-medium">No products yet</p>
            <p className="text-sm text-[#9E9E9E] mt-1">
              Add your products in the <Link href="/admin/products" className="text-[#E65C00] underline">admin panel</Link>
            </p>
          </div>
        )}

        <div className="mt-6 sm:hidden text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#E65C00]"
          >
            View all products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}