import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: any;
}

export function ProductCard({ product }: ProductCardProps) {
  const mainImage = product.images?.[0]?.url || product.image || null;

  return (
    <div className="group bg-white border border-[#E5E5E5] rounded-[12px] p-4 hover:border-[#E65C00] hover:shadow-[0_4px_16px_0_rgba(230,92,0,0.1)] transition-all duration-200">
      {/* Image section - No nested links here */}
      <div className="relative aspect-square bg-[#F7F7F7] overflow-hidden rounded-[8px] mb-3">
        {mainImage ? (
          <Link href={`/products/${product.slug || product.id}`} className="block">
            <Image
              src={mainImage}
              alt={product.name}
              fill
              className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-sm text-[#9E9E9E]">Image missing</p>
          </div>
        )}
      </div>

      {/* Product details */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-medium text-[#E65C00] uppercase tracking-wider">
              {product.category || "Product"}
            </p>
            <Link href={`/products/${product.slug || product.id}`} className="block">
              <h3 className="font-bold text-sm text-[#0A0A0A] mt-1 hover:text-[#E65C00] transition-colors">
                {product.name}
              </h3>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[#0A0A0A]">
            {product.price ? `Rs. ${product.price}` : "Contact for pricing"}
          </span>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <Link
            href={`/products/${product.slug || product.id}`}
            className="w-8 h-8 rounded-[6px] bg-white border border-[#E5E5E5] flex items-center justify-center hover:border-[#E65C00] hover:bg-[#E65C0010]"
            aria-label="View details"
          >
            <Search className="w-4 h-4 text-[#6B6B6B]" />
          </Link>
          <Link
            href={`/products/${product.slug || product.id}`}
            className="flex-1 text-sm font-semibold text-[#0A0A0A] border border-[#E5E5E5] rounded-[6px] px-3 py-2 hover:border-[#E65C00] hover:bg-[#E65C0010]"
            aria-label="Add to cart"
          >
            Add to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}