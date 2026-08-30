import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions",
};

const faqs = [
  {
    q: "How do I place an order?",
    a: "Browse our products, add items to your cart, and proceed to checkout. For wholesale or bulk orders, use our wholesale inquiry form.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We currently accept bank transfer and WhatsApp-arranged payment. Online payment (Stripe, PayPal) integration is planned. Contact us to discuss options.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes, we ship worldwide. Shipping rates and delivery times are calculated at checkout or confirmed with your order.",
  },
  {
    q: "How do I track my order?",
    a: "Once your order is shipped, you'll receive tracking information. You can also use the Track Order page with your order number and email.",
  },
  {
    q: "What is your return policy?",
    a: "Please review our returns policy page for full details on returns and exchanges. Contact us if you have a specific question.",
  },
  {
    q: "Do you offer wholesale pricing?",
    a: "Yes. We work with repair shops, distributors and resellers. Submit a wholesale inquiry with your business details and we'll be in touch.",
  },
  {
    q: "Are the demo products available to purchase?",
    a: "The demo products shown on the website are placeholders for development. The business owner will add their actual products to the catalog.",
  },
  {
    q: "How can I contact you?",
    a: `You can reach us by email at ${siteConfig.email}, by phone at ${siteConfig.phone}, or via WhatsApp at ${siteConfig.whatsapp}.`,
  },
];

export default function FaqPage() {
  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="container-site py-10">
          <nav className="text-xs text-[#9E9E9E] mb-3 flex items-center gap-1.5">
            <Link href="/" className="hover:text-[#0A0A0A]">Home</Link>
            <span>/</span>
            <span>FAQ</span>
          </nav>
          <h1 className="text-2xl font-black text-[#0A0A0A] tracking-tight">Frequently Asked Questions</h1>
        </div>
      </div>

      <div className="container-site py-10 max-w-3xl">
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-[#E5E5E5] rounded-[10px] p-5">
              <h3 className="font-bold text-[#0A0A0A] text-sm mb-2">{faq.q}</h3>
              <p className="text-sm text-[#6B6B6B] leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white border border-[#E5E5E5] rounded-[10px] p-5 text-center">
          <p className="text-sm text-[#6B6B6B] mb-3">Can&apos;t find what you&apos;re looking for?</p>
          <Link href="/contact" className="inline-block bg-[#E65C00] text-white text-sm font-bold px-5 py-2.5 rounded-[6px] hover:bg-[#CC5000] transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
