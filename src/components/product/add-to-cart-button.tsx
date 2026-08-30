"use client";

import React, { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { toast } from "@/components/ui/toast";
import type { Product } from "@/types";

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export function AddToCartButton({
  product,
  quantity = 1,
  className,
  size = "lg",
  fullWidth,
}: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const outOfStock = product.stockStatus === "out_of_stock";

  function handleAdd() {
    if (outOfStock) return;
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      sku: product.sku,
      price: product.price,
      salePrice: product.salePrice,
      images: product.images,
      stockStatus: product.stockStatus,
    }, quantity);
    toast.success("Added to cart");
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <Button
      size={size}
      onClick={handleAdd}
      disabled={outOfStock}
      className={`${fullWidth ? "w-full" : ""} ${className || ""} font-bold tracking-wide`}
    >
      {outOfStock ? (
        "Out of Stock"
      ) : added ? (
        <>
          <Check className="w-4 h-4 mr-2" />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </>
      )}
    </Button>
  );
}
