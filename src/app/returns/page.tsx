import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { siteConfig, getWhatsAppLink } from "@/lib/config";

export const metadata: Metadata = {
  title: "Returns & Refunds",
  description:
    "How to contact Bariq Electronics about a return or refund for LCD and LED display repair parts.",
  alternates: {
    canonical: "https://www.bariqelectronics.com/returns",
  },
};

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
          <h2>Questions About a Return or Refund</h2>
          <p>
            If you have an issue with your order, or want to ask about a return or refund, please contact us as
            soon as possible and before sending anything back.
          </p>
          <h2>How to Contact Us</h2>
          <p>
            Contact us at <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> or via{" "}
            <a href={getWhatsAppLink("Hello, I have a question about a return.")} target="_blank" rel="noopener noreferrer">WhatsApp</a>{" "}
            with your order number and the reason. Our team will confirm the options for your order.
          </p>
        </div>
      </div>
    </div>
  );
}
