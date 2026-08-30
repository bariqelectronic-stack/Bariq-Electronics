"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { formatPrice, calculateDiscount } from "@/lib/utils";
import { toast } from "@/components/ui/toast";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const { toggle, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);

  const price = product.price ? parseFloat(product.price) : null;
  const salePrice = product.salePrice ? parseFloat(product.salePrice) : null;
  const discount = price && salePrice ? calculateDiscount(price, salePrice) : 0;
  const displayPrice = salePrice || price;
  const mainImage = product.images?.[0];

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    if (product.stockStatus === "out_of_stock") return;
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      sku: product.sku,
      price: product.price,
      salePrice: product.salePrice,
      images: product.images,
      stockStatus: product.stockStatus,
    });
    toast.success("Added to cart");
  }

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    toggle(product.id);
    toast.success(wishlisted ? "Removed from wishlist" : "Added to wishlist");
  }

  const stockBadge = product.stockStatus === "out_of_stock"
    ? <Badge variant="error">Out of Stock</Badge>
    : product.stockStatus === "low_stock"
    ? <Badge variant="warning">Low Stock</Badge>
    : product.stockStatus === "preorder"
    ? <Badge variant="info">Pre-order</Badge>
    : null;

  return (
    <div className={cn("group bg-white border border-[#E5E5E5] rounded-[10px] overflow-hidden hover:border-[#D0D0D0] hover:shadow-[0_4px_16px_0_rgba(0,0,0,0.08)] transition-all duration-200", className)}>
      <Link href={`/products/${product.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-square bg-[#F7F7F7] overflow-hidden">
          {mainImage ? (
            <Image
              src={mainImage}
              alt={product.name}
              fill
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-4xl opacity-20">📦</div>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
            {discount > 0 && (
              <Badge variant="error" className="text-[10px]">-{discount}%</Badge>
            )}
            {product.isDemo && (
              <Badge variant="demo" className="text-[10px]">Demo</Badge>
            )}
            {stockBadge}
          </div>

          {/* Hover actions */}
          <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={handleWishlist}
              className={cn(
                "w-8 h-8 rounded-[6px] flex items-center justify-center transition-colors shadow-sm",
                wishlisted ? "bg-[#E65C00] text-white" : "bg-white text-[#6B6B6B] hover:text-[#E65C00]"
              )}
              aria-label="Add to wishlist"
            >
              <Heart className="w-3.5 h-3.5" fill={wishlisted ? "currentColor" : "none"} />
            </button>
            <Link
              href={`/products/${product.slug}`}
              className="w-8 h-8 rounded-[6px] bg-white flex items-center justify-center text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors shadow-sm"
              aria-label="Quick view"
            >
              <Eye className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {product.category && (
          <div className="text-[10px] font-semibold uppercase tracking-wider text-[#E65C00] mb-1.5">
            {product.category.name}
          </div>
        )}

        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-sm text-[#0A0A0A] line-clamp-2 hover:text-[#E65C00] transition-colors leading-snug mb-2">
            {product.name}
          </h3>
        </Link>

        {product.shortDescription && (
          <p className="text-xs text-[#9E9E9E] line-clamp-2 mb-3">{product.shortDescription}</p>
        )}

        {/* Price + action */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-[#F0F0F0]">
          <div>
            {displayPrice !== null ? (
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#0A0A0A]">
                  {formatPrice(displayPrice)}
                </span>
                {salePrice && price && (
                  <span className="text-xs text-[#BDBDBD] line-through">
                    {formatPrice(price)}
                  </span>
                )}
              </div>
            ) : (
              <span className="text-xs text-[#9E9E9E]">Contact for pricing</span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stockStatus === "out_of_stock"}
            className="w-8 h-8 rounded-[6px] bg-[#0A0A0A] text-white flex items-center justify-center hover:bg-[#E65C00] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
