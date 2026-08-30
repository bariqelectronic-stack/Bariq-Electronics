import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/shop/product-card";
import { Badge } from "@/components/ui/badge";
import { getProductsByCategory } from "@/lib/demo-products";
import { db } from "@/db";
import { CategoryFeatureSection } from "@/components/category/category-feature-section";
import { CATEGORY_CONTENT } from "@/lib/category-content";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!db) return { title: "Category" };
  const cat = await db.query.categories.findFirst({
    where: (c, { eq }) => eq(c.slug, slug),
  });
  if (!cat) return { title: "Category Not Found" };
  return {
    title: cat.name,
    description: cat.description ?? `Browse ${cat.name} products`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  if (!db) notFound();

  const cat = await db.query.categories.findFirst({
    where: (c, { eq }) => eq(c.slug, slug),
  });

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
          <div>
            <h1 className="text-2xl font-black text-[#0A0A0A] tracking-tight">{cat.name}</h1>
            {cat.description && (
              <p className="text-sm text-[#6B6B6B] mt-1 max-w-2xl">{cat.description}</p>
            )}
          </div>
        </div>
      </div>

      {CATEGORY_CONTENT[slug] && (
        <CategoryFeatureSection content={CATEGORY_CONTENT[slug]} slug={slug} />
      )}

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
