import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Package } from "lucide-react";

export const metadata: Metadata = { title: "My Orders" };

export default function OrdersPage() {
  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="container-site py-6">
          <nav className="text-xs text-[#9E9E9E] mb-2 flex items-center gap-1.5">
            <Link href="/account" className="hover:text-[#0A0A0A]">Account</Link>
            <span>/</span>
            <span>Orders</span>
          </nav>
          <h1 className="text-xl font-black text-[#0A0A0A]">My Orders</h1>
        </div>
      </div>
      <div className="container-site py-10 text-center">
        <Package className="w-12 h-12 text-[#BDBDBD] mx-auto mb-3" />
        <p className="font-semibold text-[#0A0A0A]">No orders yet</p>
        <p className="text-sm text-[#9E9E9E] mt-1 mb-5">Orders will appear here after purchase.</p>
        <Link href="/shop" className="inline-flex items-center gap-1.5 bg-[#E65C00] text-white text-sm font-bold px-5 py-2.5 rounded-[6px] hover:bg-[#CC5000] transition-colors">
          Start Shopping
        </Link>
      </div>
    </div>
  );
}
