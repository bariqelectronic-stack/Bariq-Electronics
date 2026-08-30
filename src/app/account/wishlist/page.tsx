"use client";

import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/store/wishlist";
import { ProductCard } from "@/components/shop/product-card";
import { demoProducts } from "@/lib/demo-products";

export default function WishlistPage() {
  const { productIds } = useWishlistStore();
  const products = demoProducts.filter((p) => productIds.includes(p.id));

  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="container-site py-6">
          <nav className="text-xs text-[#9E9E9E] mb-2 flex items-center gap-1.5">
            <Link href="/account" className="hover:text-[#0A0A0A]">Account</Link>
            <span>/</span>
            <span>Wishlist</span>
          </nav>
          <h1 className="text-xl font-black text-[#0A0A0A]">Wishlist ({products.length})</h1>
        </div>
      </div>
      <div className="container-site py-8">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart className="w-12 h-12 text-[#BDBDBD] mx-auto mb-3" />
            <p className="font-semibold text-[#0A0A0A]">Your wishlist is empty</p>
            <p className="text-sm text-[#9E9E9E] mt-1 mb-5">Save products to come back to them later.</p>
            <Link href="/shop" className="inline-flex items-center gap-1.5 bg-[#E65C00] text-white text-sm font-bold px-5 py-2.5 rounded-[6px] hover:bg-[#CC5000] transition-colors">
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
