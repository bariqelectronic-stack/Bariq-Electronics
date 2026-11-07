import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { siteConfig, getWhatsAppLink } from "@/lib/config";

export const metadata: Metadata = {
  title: { absolute: "About Bariq Electronics — LCD & LED Repair Parts Supplier" },
  description:
    "Bariq Electronics supplies professional LCD and LED display repair parts, tools, and bonding components — COFS, LVDS cables, T-CON boards, ACF tape, ACF remover, COF cutters, and T-CON programmers — for technicians and workshops.",
  alternates: {
    canonical: "https://www.bariqelectronics.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <div className="bg-[#0A0A0A]">
        <div className="container-site py-14">
          <nav className="text-xs text-[#6B6B6B] mb-3 flex items-center gap-1.5">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-[#9E9E9E]">About</span>
          </nav>
          <h1 className="text-3xl font-black text-white tracking-tight mb-3">About Bariq Electronics</h1>
          <p className="text-[#9E9E9E] max-w-xl text-base leading-relaxed">
            Professional LCD and LED display repair parts for technicians and repair workshops worldwide.
          </p>
        </div>
      </div>

      <div className="container-site py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 sm:p-8">
              <h2 className="text-xl font-black text-[#0A0A0A] mb-4">Who We Are</h2>
              <div className="prose">
                <p>
                  <strong>Bariq Electronics</strong> (<Link href="/">www.bariqelectronics.com</Link>) is a supplier of
                  professional LCD and LED display repair parts for technicians, repair workshops, and businesses
                  working on television and display panel systems.
                </p>
                <p>
                  We focus on the components, bonding materials, and diagnostic tools that display repair technicians
                  actually need — including <Link href="/categories/cofs">COFs (Chip-on-Film)</Link>,{" "}
                  <Link href="/products/lvds">LVDS display cables</Link>,{" "}
                  <Link href="/categories/led-lcd-boards">LED &amp; LCD main boards</Link>,{" "}
                  <Link href="/products/t-con">T-CON (Timing Controller) boards</Link>,{" "}
                  <Link href="/products/acf-tape">ACF conductive bonding tape</Link>,{" "}
                  <Link href="/products/acf-remover">ACF remover</Link>,{" "}
                  <Link href="/products/cof-cutter">COF cutters</Link>,{" "}
                  <Link href="/products/t-con-programmer">T-CON programmers</Link>,{" "}
                  <Link href="/categories/head-assembly">bonding head assemblies</Link>,{" "}
                  <Link href="/categories/scaller">scaler boards</Link>,{" "}
                  <Link href="/categories/quard">quard products</Link>,{" "}
                  <Link href="/categories/foam">panel repair foam</Link>, and{" "}
                  <Link href="/categories/tape">repair tapes</Link>. Every product in our catalogue is selected with
                  professional display repair work in mind.
                </p>
                <h3>Our Mission</h3>
                <p>
                  Our goal is to make professional-grade display repair parts and panel bonding supplies accessible to
                  technicians and workshops worldwide. We also publish practical technical guides in our{" "}
                  <Link href="/learn">Learn knowledge base</Link> to help technicians verify compatibility before ordering.
                </p>
                <h3>How to Enquire &amp; Order</h3>
                <p>
                  Technicians and buyers can browse our <Link href="/shop">online catalog</Link>, check application
                  workflows on our <Link href="/solutions">Solutions</Link> pages, or contact our team directly via{" "}
                  <a href={getWhatsAppLink("Hello, I have a question about LCD/LED display repair parts.")} target="_blank" rel="noopener noreferrer">
                    WhatsApp ({siteConfig.whatsapp})
                  </a>, phone (<a href={`tel:+${siteConfig.whatsappNumber}`}>{siteConfig.phone}</a>), or email (
                  <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>) with panel model numbers, board part
                  numbers, or connector specifications.
                </p>
                <h3>Wholesale &amp; Business</h3>
                <p>
                  We work with TV and display repair shops, electronics distributors, training centers, and parts
                  resellers. If you are interested in bulk ordering or business partnerships, submit an enquiry on our{" "}
                  <Link href="/wholesale">Wholesale page</Link> or <Link href="/contact">Contact page</Link>.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-5">
              <h3 className="font-bold text-[#0A0A0A] text-sm mb-4">Contact Information</h3>
              <div className="space-y-2.5 text-sm">
                <div>
                  <div className="text-xs text-[#9E9E9E]">Company</div>
                  <div className="font-medium text-[#0A0A0A]">{siteConfig.name}</div>
                </div>
                <div>
                  <div className="text-xs text-[#9E9E9E]">Email</div>
                  <a href={`mailto:${siteConfig.email}`} className="font-medium text-[#E65C00] hover:underline">{siteConfig.email}</a>
                </div>
                <div>
                  <div className="text-xs text-[#9E9E9E]">Phone</div>
                  <a href={`tel:${siteConfig.phone}`} className="font-medium text-[#0A0A0A]">{siteConfig.phone}</a>
                </div>
                <div>
                  <div className="text-xs text-[#9E9E9E]">WhatsApp</div>
                  <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="font-medium text-[#16A34A]">{siteConfig.whatsapp}</a>
                </div>
              </div>
            </div>

            <Link href="/contact" className="block bg-[#E65C00] text-white text-center font-bold text-sm py-3 px-5 rounded-[8px] hover:bg-[#CC5000] transition-colors">
              Contact Us
            </Link>
            <Link href="/wholesale" className="block bg-[#0A0A0A] text-white text-center font-bold text-sm py-3 px-5 rounded-[8px] hover:bg-[#3D3D3D] transition-colors">
              Wholesale Inquiries
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
