import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { siteConfig, getWhatsAppLink } from "@/lib/config";

export const metadata: Metadata = { title: "Shipping Information" };

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
          <p className="text-[#9E9E9E] text-sm bg-[#F7F3EE] border border-[#E65C0020] rounded-[6px] p-3 not-prose mb-5">
            <strong>Note:</strong> This page is editable in the admin panel → Pages. Configure your actual shipping policy here.
          </p>
          <h2>International Shipping</h2>
          <p>
            We ship our products worldwide. Shipping rates and estimated delivery times are calculated based on
            destination, package weight and chosen shipping method.
          </p>
          <h2>Shipping Process</h2>
          <p>After your order is confirmed and payment is arranged:</p>
          <ul>
            <li>Orders are processed and packed</li>
            <li>Shipment tracking information is provided when available</li>
            <li>Estimated delivery times vary by destination</li>
          </ul>
          <h2>Shipping Costs</h2>
          <p>
            Shipping costs are calculated at checkout or confirmed with your order. For wholesale and bulk orders,
            shipping arrangements are discussed directly.
          </p>
          <h2>Tracking</h2>
          <p>
            When your order ships, tracking information will be provided where available.
            You can use the <Link href="/track-order">Track Order</Link> page.
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
