import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { siteConfig, getWhatsAppLink } from "@/lib/config";

export const metadata: Metadata = { title: "Returns Policy" };

export default function ReturnsPage() {
  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="container-site py-8">
          <nav className="text-xs text-[#9E9E9E] mb-3 flex items-center gap-1.5">
            <Link href="/" className="hover:text-[#0A0A0A]">Home</Link>
            <span>/</span>
            <span>Returns</span>
          </nav>
          <h1 className="text-2xl font-black text-[#0A0A0A]">Returns & Refunds</h1>
        </div>
      </div>
      <div className="container-site py-10 max-w-3xl">
        <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 sm:p-8 prose">
          <p className="text-[#9E9E9E] text-sm bg-[#F7F3EE] border border-[#E65C0020] rounded-[6px] p-3 not-prose mb-5">
            <strong>Note:</strong> This returns policy is editable in the admin panel → Pages. Configure your actual policy here.
          </p>
          <h2>Returns Policy</h2>
          <p>
            We want you to be satisfied with your purchase. If you have an issue with your order, please
            contact us as soon as possible.
          </p>
          <h2>How to Request a Return</h2>
          <p>
            Contact us at <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or via{" "}
            <a href={getWhatsAppLink("Hello, I have a question about a return.")} target="_blank" rel="noopener noreferrer">WhatsApp</a>{" "}
            with your order number and reason for return.
          </p>
          <h2>Conditions</h2>
          <ul>
            <li>Items must be unused and in original packaging</li>
            <li>Please contact us within a reasonable time of receiving your order</li>
            <li>Customized or special-order items may have different conditions</li>
          </ul>
          <h2>Refunds</h2>
          <p>
            Refund arrangements will be discussed and processed on a case-by-case basis.
            We will work with you to resolve any issues fairly.
          </p>
        </div>
      </div>
    </div>
  );
}
