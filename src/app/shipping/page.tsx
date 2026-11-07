import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { siteConfig, getWhatsAppLink } from "@/lib/config";

export const metadata: Metadata = {
  title: "Shipping Information",
  description:
    "How to ask Bariq Electronics about delivery options, charges and order status for LCD and LED display repair parts.",
  alternates: {
    canonical: "https://www.bariqelectronics.com/shipping",
  },
};

export default function ShippingPage() {
  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="container-site py-8">
          <nav className="text-xs text-[#9E9E9E] mb-3 flex items-center gap-1.5">
            <Link href="/" className="hover:text-[#0A0A0A]">Home</Link>
            <span>/</span>
            <span>Shipping</span>
          </nav>
          <h1 className="text-2xl font-black text-[#0A0A0A]">Shipping Information</h1>
        </div>
      </div>
      <div className="container-site py-10 max-w-3xl">
        <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 sm:p-8 prose">
          <h2>Delivery Enquiries</h2>
          <p>
            Delivery availability, charges and timing depend on your location and order. Please contact us to
            confirm these details before you order.
          </p>
          <h2>Order Status</h2>
          <p>
            If you have a question about an order, contact us with your order number. You can also try the{" "}
            <Link href="/track-order">Track Order</Link> page.
          </p>
          <h2>Questions</h2>
          <p>
            For shipping questions, contact us at <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>{" "}
            or via <a href={getWhatsAppLink("Hello, I have a shipping question.")} target="_blank" rel="noopener noreferrer">WhatsApp</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
