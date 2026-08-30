"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, Truck, CheckCircle, Clock, CreditCard, MapPin } from "lucide-react";

const ORDER_STEPS = [
  { label: "Order Received", icon: Package, desc: "Your order has been placed" },
  { label: "Payment Confirmed", icon: CreditCard, desc: "Payment has been confirmed" },
  { label: "Processing", icon: Clock, desc: "Your order is being prepared" },
  { label: "Shipped", icon: Truck, desc: "Your order is on its way" },
  { label: "In Transit", icon: MapPin, desc: "Your package is in transit" },
  { label: "Delivered", icon: CheckCircle, desc: "Your package has been delivered" },
];

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [searched, setSearched] = useState(false);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearched(true);
  }

  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="container-site py-8">
          <nav className="text-xs text-[#9E9E9E] mb-3 flex items-center gap-1.5">
            <Link href="/" className="hover:text-[#0A0A0A]">Home</Link>
            <span>/</span>
            <span>Track Order</span>
          </nav>
          <h1 className="text-2xl font-black text-[#0A0A0A]">Track Your Order</h1>
        </div>
      </div>

      <div className="container-site py-10 max-w-xl">
        <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 sm:p-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <Input
              label="Order Number"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="e.g. BRQ-XXXXXX-XXXX"
              required
            />
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email used when ordering"
              required
            />
            <Button type="submit" className="w-full font-bold">Track Order</Button>
          </form>
        </div>

        {searched && (
          <div className="mt-6 bg-white border border-[#E5E5E5] rounded-[12px] p-6">
            <div className="text-center py-6">
              <Package className="w-10 h-10 text-[#BDBDBD] mx-auto mb-3" />
              <p className="font-semibold text-[#0A0A0A]">Order not found</p>
              <p className="text-sm text-[#9E9E9E] mt-1">
                We couldn&apos;t find an order with that number and email combination.
                Please check your details and try again.
              </p>
              <p className="text-sm text-[#9E9E9E] mt-3">
                Need help?{" "}
                <Link href="/contact" className="text-[#E65C00] underline">Contact us</Link>
              </p>
            </div>
          </div>
        )}

        {/* Order status explanation */}
        <div className="mt-6 bg-white border border-[#E5E5E5] rounded-[12px] p-5">
          <h3 className="font-bold text-[#0A0A0A] text-sm mb-4">Order Status Stages</h3>
          <div className="space-y-3">
            {ORDER_STEPS.map((step) => (
              <div key={step.label} className="flex items-start gap-3">
                <div className="w-7 h-7 bg-[#F7F7F7] border border-[#E5E5E5] rounded-full flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-3.5 h-3.5 text-[#9E9E9E]" />
                </div>
                <div>
                  <div className="text-sm font-medium text-[#0A0A0A]">{step.label}</div>
                  <div className="text-xs text-[#9E9E9E]">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
