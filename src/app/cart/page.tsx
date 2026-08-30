"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getItemCount } = useCartStore();
  const subtotal = getSubtotal();
  const itemCount = getItemCount();

  if (items.length === 0) {
    return (
      <div className="bg-[#F7F7F7] min-h-screen">
        <div className="container-site py-16 text-center">
          <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-12 max-w-md mx-auto">
            <ShoppingBag className="w-12 h-12 text-[#BDBDBD] mx-auto mb-4" />
            <h1 className="text-xl font-black text-[#0A0A0A] mb-2">Your cart is empty</h1>
            <p className="text-sm text-[#9E9E9E] mb-6">
              Add products to your cart to begin your order.
            </p>
            <Link href="/shop">
              <Button size="lg" className="font-bold w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="container-site py-6">
          <h1 className="text-xl font-black text-[#0A0A0A] tracking-tight">
            Shopping Cart ({itemCount} {itemCount === 1 ? "item" : "items"})
          </h1>
        </div>
      </div>

      <div className="container-site py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-3">
            {items.map((item) => {
              const mainImage = item.product.images?.[0];
              return (
                <div key={item.id} className="bg-white border border-[#E5E5E5] rounded-[10px] p-4 flex gap-4">
                  {/* Image */}
                  <Link href={`/products/${item.product.slug}`} className="w-20 h-20 bg-[#F7F7F7] rounded-[8px] flex-shrink-0 relative overflow-hidden">
                    {mainImage ? (
                      <Image src={mainImage} alt={item.product.name} fill className="object-contain p-2" sizes="80px" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">📦</div>
                    )}
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.product.slug}`} className="font-semibold text-sm text-[#0A0A0A] hover:text-[#E65C00] transition-colors line-clamp-2">
                      {item.product.name}
                    </Link>
                    {item.product.sku && (
                      <div className="text-xs text-[#9E9E9E] mt-0.5">SKU: {item.product.sku}</div>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity */}
                      <div className="flex items-center gap-1 border border-[#E5E5E5] rounded-[6px]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#6B6B6B] hover:text-[#0A0A0A] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        {item.priceAtAdd > 0 ? (
                          <div className="font-bold text-sm text-[#0A0A0A]">
                            {formatPrice(item.priceAtAdd * item.quantity)}
                          </div>
                        ) : (
                          <div className="text-xs text-[#9E9E9E]">Contact for price</div>
                        )}
                        {item.quantity > 1 && item.priceAtAdd > 0 && (
                          <div className="text-xs text-[#9E9E9E]">{formatPrice(item.priceAtAdd)} each</div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="w-8 h-8 rounded-[6px] text-[#9E9E9E] hover:text-[#DC2626] hover:bg-[#FEE2E2] transition-colors flex items-center justify-center flex-shrink-0"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-5 sticky top-20">
              <h2 className="font-bold text-[#0A0A0A] mb-4 pb-4 border-b border-[#E5E5E5]">
                Order Summary
              </h2>

              <div className="space-y-2.5 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-[#6B6B6B]">Subtotal ({itemCount} items)</span>
                  <span className="font-medium text-[#0A0A0A]">
                    {subtotal > 0 ? formatPrice(subtotal) : "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B6B6B]">Shipping</span>
                  <span className="text-[#6B6B6B]">Calculated at checkout</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B6B6B]">Tax</span>
                  <span className="text-[#6B6B6B]">Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t border-[#E5E5E5] pt-4 mb-5">
                <div className="flex justify-between font-bold text-[#0A0A0A]">
                  <span>Total</span>
                  <span>{subtotal > 0 ? formatPrice(subtotal) : "—"}</span>
                </div>
              </div>

              {/* Coupon */}
              <div className="mb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Discount code"
                    className="flex-1 border border-[#E5E5E5] rounded-[6px] px-3 py-2 text-sm focus:outline-none focus:border-[#E65C00]"
                  />
                  <button className="px-3 py-2 border border-[#E5E5E5] rounded-[6px] text-sm font-medium hover:bg-[#F7F7F7] transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              <Link href="/checkout">
                <Button size="lg" className="w-full font-bold tracking-wide">
                  Proceed to Checkout <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>

              <Link href="/shop" className="block text-center text-sm text-[#9E9E9E] hover:text-[#6B6B6B] mt-3 transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
