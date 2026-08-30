import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { ProductCard } from "@/components/shop/product-card";
import { Badge } from "@/components/ui/badge";
import { demoProducts } from "@/lib/demo-products";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse professional electronics repair tools — microscopes, soldering equipment, screwdrivers, PCB tools and more.",
};

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "best_selling", label: "Best Selling" },
];

const CATEGORY_FILTERS = [
  { value: "", label: "All Categories" },
  { value: "microscopes", label: "Microscopes" },
  { value: "microscope-cameras", label: "Microscope Cameras" },
  { value: "soldering-tools", label: "Soldering Tools" },
  { value: "screwdrivers", label: "Precision Screwdrivers" },
  { value: "pcb-repair", label: "PCB Repair Tools" },
  { value: "cleaning-tools", label: "Cleaning Tools" },
  { value: "repair-cables", label: "Repair Cables" },
  { value: "lab-tools", label: "Lab Tools" },
  { value: "accessories", label: "Accessories" },
];

interface ShopPageProps {
  searchParams: Promise<{ q?: string; category?: string; sort?: string; inStock?: string }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const query = params.q || "";
  const category = params.category || "";
  const sort = params.sort || "featured";
  const inStockOnly = params.inStock === "true";

  let products = [...demoProducts];

  if (query) {
    const q = query.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription?.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (category) {
    products = products.filter((p) => p.category?.slug === category);
  }

  if (inStockOnly) {
    products = products.filter((p) => p.stockStatus !== "out_of_stock");
  }

  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      {/* Page header */}
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="container-site py-8">
          <nav className="text-xs text-[#9E9E9E] mb-3 flex items-center gap-1.5">
            <Link href="/" className="hover:text-[#0A0A0A]">Home</Link>
            <span>/</span>
            <span className="text-[#0A0A0A]">Shop</span>
          </nav>
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-2xl font-black text-[#0A0A0A] tracking-tight">All Products</h1>
              <p className="text-sm text-[#9E9E9E] mt-1">
                {products.length} {products.length === 1 ? "product" : "products"} found
                {query && ` for "${query}"`}
              </p>
            </div>
            <Badge variant="demo">Demo Catalog</Badge>
          </div>
        </div>
      </div>

      <div className="container-site py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar filters */}
          <aside className="w-full lg:w-56 flex-shrink-0">
            <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-5 space-y-6">
              {/* Search */}
              <div>
                <form action="/shop" className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9E9E]" />
                  <input
                    type="search"
                    name="q"
                    defaultValue={query}
                    placeholder="Search products..."
                    className="w-full border border-[#E5E5E5] rounded-[6px] pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-[#E65C00] bg-[#F7F7F7]"
                  />
                  {/* Preserve other params */}
                  {category && <input type="hidden" name="category" value={category} />}
                  {sort && <input type="hidden" name="sort" value={sort} />}
                </form>
              </div>

              {/* Categories */}
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#9E9E9E] mb-3">
                  Category
                </div>
                <ul className="space-y-1">
                  {CATEGORY_FILTERS.map((cat) => (
                    <li key={cat.value}>
                      <Link
                        href={`/shop?${new URLSearchParams({ ...(query && { q: query }), ...(cat.value && { category: cat.value }), sort }).toString()}`}
                        className={`block text-sm px-2 py-1.5 rounded-[5px] transition-colors ${
                          category === cat.value
                            ? "bg-[#E65C0010] text-[#E65C00] font-medium"
                            : "text-[#6B6B6B] hover:bg-[#F7F7F7] hover:text-[#0A0A0A]"
                        }`}
                      >
                        {cat.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Availability */}
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#9E9E9E] mb-3">
                  Availability
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={inStockOnly}
                    className="w-4 h-4 accent-[#E65C00]"
                  />
                  <span className="text-sm text-[#6B6B6B]">In stock only</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            {/* Sort bar */}
            <div className="flex items-center justify-between mb-4 bg-white border border-[#E5E5E5] rounded-[8px] px-4 py-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#9E9E9E]" />
                <span className="text-sm text-[#6B6B6B]">{products.length} results</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#9E9E9E]">Sort:</span>
                <form action="/shop">
                  {query && <input type="hidden" name="q" value={query} />}
                  {category && <input type="hidden" name="category" value={category} />}
                  <div className="relative">
                    <select
                      name="sort"
                      defaultValue={sort}
                      className="appearance-none border border-[#E5E5E5] rounded-[6px] text-sm px-3 py-1.5 pr-7 bg-white focus:outline-none focus:border-[#E65C00]"
                    >
                      {SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9E9E9E] pointer-events-none" />
                  </div>
                </form>
              </div>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-dashed border-[#E5E5E5] rounded-[10px] py-20 text-center">
                <div className="text-4xl mb-3">🔍</div>
                <p className="font-semibold text-[#0A0A0A]">No products found</p>
                {query && (
                  <p className="text-sm text-[#9E9E9E] mt-1">
                    No results for &ldquo;{query}&rdquo;.{" "}
                    <Link href="/shop" className="text-[#E65C00] underline">Clear search</Link>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
