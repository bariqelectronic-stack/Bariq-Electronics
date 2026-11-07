import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { siteConfig, getWhatsAppLink } from "@/lib/config";

export const metadata: Metadata = {
  title: "FAQ — LCD & LED Repair Parts, LVDS, ACF & COF",
  description:
    "Frequently asked questions about Bariq Electronics LCD and LED display repair parts — including LVDS cable compatibility, ACF remover, COF cutters, ACF tape, T-CON boards, ordering, and wholesale enquiries.",
  alternates: {
    canonical: "https://www.bariqelectronics.com/faq",
  },
};

const faqs = [
  {
    q: "How do I identify a compatible LVDS cable?",
    a: "Match the original LVDS cable part number together with the exact display panel and main board/T-CON model numbers. Verify the pin count and connector body style at both ends (such as 20–30 pin single-channel or 30–51 pin dual-channel), check pin-1 orientation and power/ground pin assignment, and confirm the required cable length. Matching pin counts alone do not guarantee identical wiring.",
    links: [
      { label: "LVDS Product Page", href: "/products/lvds" },
      { label: "4K LVDS", href: "/products/4k-lvds" },
      { label: "LVDS Category", href: "/categories/lvds" },
      { label: "LVDS Cable Guide", href: "/learn/understanding-lvds-cables" },
    ],
  },
  {
    q: "What is ACF remover used for?",
    a: "ACF remover is used by display repair technicians to soften and clean hardened Anisotropic Conductive Film (ACF) adhesive residue from LCD and LED glass substrates and PCB bonding pads before applying new ACF tape and bonding a replacement COF (Chip-on-Film) component. Thorough residue removal helps give the new bond a clean contact surface.",
    links: [
      { label: "ACF Remover", href: "/products/acf-remover" },
      { label: "ACF Remover Category", href: "/categories/acf-remover" },
      { label: "COF & ACF Repair Guide", href: "/learn/essential-parts-cof-acf-repair" },
    ],
  },
  {
    q: "Is ACF remover the same as ACF remover solution?",
    a: "Both phrases are generally used for liquid cleaners that soften old Anisotropic Conductive Film adhesive on panel glass and PCB flex pads before re-bonding, but formulations vary, so check the product label. Verify compatibility with your specific panel substrate and allow the cleaned bonding area to dry completely before applying new ACF tape.",
    links: [
      { label: "ACF Remover", href: "/products/acf-remover" },
      { label: "ACF Tape", href: "/products/acf-tape" },
      { label: "ACF Tape (7813)", href: "/products/acf-tape-7813" },
    ],
  },
  {
    q: "What should I check before purchasing a COF cutter?",
    a: "Before selecting a COF cutter, check that the blade configuration and cutting precision suit the COF package dimensions and panel preparation workflow on your repair bench. A sharp, controlled cutting edge is essential to trim Chip-on-Film tabs cleanly without damaging adjacent panel circuitry or glass traces.",
    links: [
      { label: "COF Cutter", href: "/products/cof-cutter" },
      { label: "COF Cutters Category", href: "/categories/cof-cutter" },
      { label: "COFS Category", href: "/categories/cofs" },
      { label: "Essential Parts for COF & ACF Repair", href: "/learn/essential-parts-cof-acf-repair" },
    ],
  },
  {
    q: "How do I choose the right T-CON board or T-CON programmer?",
    a: "For a replacement T-CON (Timing Controller) board, match the exact board model number printed on the original board, verify screen size and resolution compatibility, and inspect the LVDS and ribbon connector layout. If you are diagnosing or re-flashing board firmware, verify that the T-CON programmer supports your target board family and connection method (such as ISP header or flash clip), and always back up the original firmware before writing.",
    links: [
      { label: "T-CON Board", href: "/products/t-con" },
      { label: "T-CON Programmer", href: "/products/t-con-programmer" },
      { label: "How to Choose a T-CON Board", href: "/learn/how-to-choose-t-con-board" },
      { label: "T-CON Programming Guide", href: "/learn/t-con-programming-guide" },
    ],
  },
  {
    q: "What should I check when selecting ACF tape and bonding head assemblies?",
    a: "Match the ACF tape width and thickness to the COF bonding pad area (on glass or PCB) and verify the required bonding temperature, pressure, and storage conditions (typically refrigerated before use). Ensure your bonding head assembly (such as 68mm or 50mm configurations) matches the required bonding width and equipment setup.",
    links: [
      { label: "ACF Tape", href: "/products/acf-tape" },
      { label: "ACF Tape (7813)", href: "/products/acf-tape-7813" },
      { label: "Head Assembly 68mm / 50mm", href: "/products/head-68mm-50mm-x1214" },
      { label: "ACF Tape Application Guide", href: "/learn/acf-tape-application-guide" },
    ],
  },
  {
    q: "How can customers enquire about LCD/LED repair equipment?",
    a: `You can enquire directly via WhatsApp at ${siteConfig.whatsapp}, by phone at ${siteConfig.phone}, by email at ${siteConfig.email}, or through our Contact and Wholesale pages. When asking about part compatibility, share the display panel model number, board part number, or connector pin count so our team can assist you accurately.`,
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Wholesale Enquiries", href: "/wholesale" },
      { label: "Shop All Products", href: "/shop" },
    ],
  },
  {
    q: "How do I place an order?",
    a: "Browse our products, add items to your cart, and proceed to checkout. For wholesale or bulk orders, use our wholesale inquiry form.",
    links: [
      { label: "Shop Products", href: "/shop" },
      { label: "Product Categories", href: "/categories" },
      { label: "Wholesale Form", href: "/wholesale" },
    ],
  },
  {
    q: "What payment methods are accepted?",
    a: "We currently accept bank transfer and WhatsApp-arranged payment. Online payment (Stripe, PayPal) integration is planned. Contact us to discuss options.",
    links: [
      { label: "Contact Support", href: "/contact" },
    ],
  },
  {
    q: "Do you ship internationally?",
    a: "Yes, we ship worldwide. Shipping rates and delivery times are calculated at checkout or confirmed with your order.",
    links: [
      { label: "Shipping Information", href: "/shipping" },
    ],
  },
  {
    q: "How do I track my order?",
    a: "Once your order is shipped, you'll receive tracking information. You can also use the Track Order page with your order number and email.",
    links: [
      { label: "Track Order", href: "/track-order" },
    ],
  },
  {
    q: "What is your return policy?",
    a: "Please review our returns policy page for full details on returns and exchanges. Contact us if you have a specific question.",
    links: [
      { label: "Returns Policy", href: "/returns" },
    ],
  },
  {
    q: "Do you offer wholesale pricing?",
    a: "Yes. We work with repair shops, distributors and resellers. Submit a wholesale inquiry with your business details and we'll be in touch.",
    links: [
      { label: "Request Wholesale Pricing", href: "/wholesale" },
    ],
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function FaqPage() {
  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="container-site py-10">
          <nav className="text-xs text-[#9E9E9E] mb-3 flex items-center gap-1.5">
            <Link href="/" className="hover:text-[#0A0A0A]">Home</Link>
            <span>/</span>
            <span>FAQ</span>
          </nav>
          <h1 className="text-2xl font-black text-[#0A0A0A] tracking-tight">Frequently Asked Questions</h1>
          <p className="text-sm text-[#6B6B6B] mt-1 max-w-2xl">
            Answers to common technical and ordering questions about LVDS cables, ACF remover, ACF tape, COF cutters, T-CON boards, and LCD/LED display repair parts.
          </p>
        </div>
      </div>

      <div className="container-site py-10 max-w-3xl">
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-[#E5E5E5] rounded-[10px] p-5">
              <h2 className="font-bold text-[#0A0A0A] text-base mb-2">{faq.q}</h2>
              <p className="text-sm text-[#6B6B6B] leading-relaxed">{faq.a}</p>
              {faq.links && faq.links.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-[#F0F0F0]">
                  {faq.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-xs font-medium text-[#E65C00] hover:underline"
                    >
                      {link.label} →
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white border border-[#E5E5E5] rounded-[10px] p-5 text-center">
          <p className="text-sm text-[#6B6B6B] mb-3">
            Need help confirming compatibility for a specific panel, board, or repair tool?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact" className="inline-block bg-[#E65C00] text-white text-sm font-bold px-5 py-2.5 rounded-[6px] hover:bg-[#CC5000] transition-colors">
              Contact Us
            </Link>
            <a
              href={getWhatsAppLink("Hello, I have a question about LCD/LED display repair parts.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-[#E5E5E5] bg-white text-[#0A0A0A] text-sm font-semibold px-5 py-2.5 rounded-[6px] hover:bg-[#F7F7F7] transition-colors"
            >
              Ask on WhatsApp ({siteConfig.whatsapp})
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
