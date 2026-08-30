"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { demoProducts } from "@/lib/demo-products";
import { getWhatsAppLink } from "@/lib/config";
import { X, Plus, ArrowRight, MessageCircle, Check } from "lucide-react";

// Re-export type for clarity
type CompareProduct = (typeof demoProducts)[number];

const MAX_COMPARE = 3;

function getCellValue(product: CompareProduct, key: string): string {
  switch (key) {
    case "category":
      return product.category?.name ?? "—";
    case "brand":
      return product.brand?.name ?? "—";
    case "sku":
      return product.sku ?? "—";
    case "availability":
      return product.stockStatus === "in_stock"
        ? "In Stock"
        : product.stockStatus === "out_of_stock"
        ? "Out of Stock"
        : "Pre-order";
    case "warranty":
      return product.warranty ?? "—";
    default:
      return "—";
  }
}

const COMPARE_ROWS: { key: string; label: string }[] = [
  { key: "category", label: "Category" },
  { key: "brand", label: "Brand" },
  { key: "sku", label: "SKU" },
  { key: "availability", label: "Availability" },
  { key: "warranty", label: "Warranty" },
];

export default function ComparePage() {
  const [selected, setSelected] = useState<CompareProduct[]>([]);
  const [search, setSearch] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const filtered = demoProducts.filter(
    (p) =>
      !selected.find((s) => s.slug === p.slug) &&
      (search === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.category?.name ?? "").toLowerCase().includes(search.toLowerCase()))
  );

  function addProduct(product: CompareProduct) {
    if (selected.length < MAX_COMPARE) {
      setSelected((prev) => [...prev, product]);
    }
    if (selected.length + 1 >= MAX_COMPARE) setShowPicker(false);
    setSearch("");
  }

  function removeProduct(slug: string) {
    setSelected((prev) => prev.filter((p) => p.slug !== slug));
  }

  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      {/* Page header */}
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="container-site py-6">
          <nav className="text-xs text-[#9E9E9E] mb-2 flex items-center gap-1.5">
            <Link href="/" className="hover:text-[#0A0A0A]">Home</Link>
            <span>/</span>
            <span>Compare</span>
          </nav>
          <h1 className="text-xl font-black text-[#0A0A0A]">Compare Products</h1>
          <p className="text-sm text-[#9E9E9E] mt-1">
            Add up to {MAX_COMPARE} products to compare side-by-side.
          </p>
        </div>
      </div>

      <div className="container-site py-8">
        {/* Product slots */}
        <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: `repeat(${MAX_COMPARE}, 1fr)` }}>
          {Array.from({ length: MAX_COMPARE }).map((_, i) => {
            const product = selected[i];
            if (product) {
              const waLink = getWhatsAppLink(`Hi, I'm interested in the ${product.name} (${product.sku})`);
              return (
                <div key={product.slug} className="bg-white border border-[#E5E5E5] rounded-[12px] overflow-hidden">
                  <div className="relative">
                    <button
                      onClick={() => removeProduct(product.slug)}
                      className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center bg-white rounded-full border border-[#E5E5E5] hover:bg-[#FEE2E2] hover:border-[#DC2626]/30 hover:text-[#DC2626] transition-colors z-10"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    {/* Image placeholder */}
                    <div className="bg-[#F7F7F7] aspect-square flex items-center justify-center border-b border-[#E5E5E5]">
                      <div className="text-4xl font-black text-[#E5E5E5]">
                        {product.name[0]}
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    {product.isDemo && (
                      <Badge variant="demo" className="mb-2 text-[10px]">DEMO</Badge>
                    )}
                    <div className="font-bold text-[#0A0A0A] text-sm leading-snug mb-1">
                      {product.name}
                    </div>
                    <div className="text-xs text-[#9E9E9E] font-mono mb-3">{product.sku}</div>
                    <a href={waLink} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="w-full font-bold text-xs">
                        <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                        Get Quote
                      </Button>
                    </a>
                  </div>
                </div>
              );
            }

            // Empty slot
            return (
              <div key={i} className="border-2 border-dashed border-[#E5E5E5] rounded-[12px] flex flex-col items-center justify-center p-6 min-h-[280px] text-center">
                <div className="w-10 h-10 bg-[#F7F7F7] rounded-full flex items-center justify-center mb-3">
                  <Plus className="w-5 h-5 text-[#BDBDBD]" />
                </div>
                <p className="text-sm text-[#9E9E9E] font-medium mb-3">Add product</p>
                <Button
                  size="sm"
                  variant="outline"
                  className="font-bold text-xs"
                  onClick={() => setShowPicker(true)}
                  disabled={selected.length >= MAX_COMPARE}
                >
                  Browse
                </Button>
              </div>
            );
          })}
        </div>

        {/* Comparison table */}
        {selected.length >= 2 && (
          <div className="bg-white border border-[#E5E5E5] rounded-[12px] overflow-hidden mb-6">
            <div className="px-5 py-4 border-b border-[#E5E5E5] bg-[#F7F7F7]">
              <h2 className="text-sm font-bold text-[#0A0A0A]">Specifications</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E5E5E5]">
                    <th className="text-left px-5 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider w-40">
                      Spec
                    </th>
                    {selected.map((p) => (
                      <th key={p.slug} className="text-left px-5 py-3 font-semibold text-[#0A0A0A] text-xs">
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F0F0]">
                  {COMPARE_ROWS.map((row) => {
                    const values = selected.map((p) => getCellValue(p, row.key));
                    const allSame = values.every((v) => v === values[0]);
                    return (
                      <tr key={row.key} className="hover:bg-[#F7F7F7] transition-colors">
                        <td className="px-5 py-3 text-xs font-medium text-[#6B6B6B]">{row.label}</td>
                        {values.map((val, i) => (
                          <td key={i} className={`px-5 py-3 text-xs font-medium ${allSame ? "text-[#6B6B6B]" : "text-[#0A0A0A]"}`}>
                            {val}
                          </td>
                        ))}
                      </tr>
                    );
                  })}

                  {/* Description row */}
                  <tr className="hover:bg-[#F7F7F7] transition-colors">
                    <td className="px-5 py-3 text-xs font-medium text-[#6B6B6B]">Description</td>
                    {selected.map((p) => (
                      <td key={p.slug} className="px-5 py-3 text-xs text-[#6B6B6B] max-w-xs">
                        <span className="line-clamp-3">{p.description || "—"}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Features rows */}
                  <tr className="hover:bg-[#F7F7F7] transition-colors">
                    <td className="px-5 py-3 text-xs font-medium text-[#6B6B6B] align-top">Key Features</td>
                    {selected.map((p) => (
                      <td key={p.slug} className="px-5 py-3 text-xs text-[#6B6B6B]">
                        {p.features && p.features.length > 0 ? (
                          <ul className="space-y-1">
                            {p.features.slice(0, 5).map((f, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <Check className="w-3 h-3 text-[#E65C00] flex-shrink-0 mt-0.5" />
                                {f}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-[#BDBDBD]">—</span>
                        )}
                      </td>
                    ))}
                  </tr>

                  {/* Price row */}
                  <tr className="bg-[#F7F7F7]">
                    <td className="px-5 py-3 text-xs font-medium text-[#6B6B6B]">Price</td>
                    {selected.map((p) => (
                      <td key={p.slug} className="px-5 py-3">
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#E65C00]">
                          <MessageCircle className="w-3 h-3" />
                          Contact for quote
                        </span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selected.length < 2 && (
          <div className="text-center py-8 text-sm text-[#9E9E9E]">
            Add at least 2 products to see a comparison.
          </div>
        )}

        {/* Product picker */}
        {showPicker && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowPicker(false)} />
            <div className="relative bg-white w-full sm:max-w-md sm:rounded-[16px] rounded-t-[16px] p-5 shadow-2xl max-h-[80vh] flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-black text-[#0A0A0A]">Choose a Product</h3>
                <button
                  onClick={() => setShowPicker(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F0F0F0] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full border border-[#E5E5E5] rounded-[8px] px-3 py-2 text-sm mb-3 focus:outline-none focus:border-[#E65C00] focus:ring-1 focus:ring-[#E65C00]/20"
                autoFocus
              />
              <div className="overflow-y-auto flex-1 -mx-1">
                {filtered.length === 0 && (
                  <p className="text-sm text-[#9E9E9E] text-center py-6">No products found.</p>
                )}
                {filtered.map((product) => (
                  <button
                    key={product.slug}
                    onClick={() => addProduct(product)}
                    className="w-full flex items-center gap-3 p-3 rounded-[8px] hover:bg-[#F7F7F7] transition-colors text-left"
                  >
                    <div className="w-10 h-10 bg-[#F7F7F7] border border-[#E5E5E5] rounded-[8px] flex items-center justify-center text-sm font-black text-[#BDBDBD] flex-shrink-0">
                      {product.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-[#0A0A0A] truncate">{product.name}</div>
                      <div className="text-xs text-[#9E9E9E]">{product.category?.name ?? ""}</div>
                    </div>
                    <Plus className="w-4 h-4 text-[#E65C00] flex-shrink-0" />
                  </button>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-[#F0F0F0]">
                <Link href="/shop" onClick={() => setShowPicker(false)}>
                  <Button variant="outline" className="w-full font-bold text-sm">
                    Browse Full Catalog
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
