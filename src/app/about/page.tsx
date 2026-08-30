import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { siteConfig, getWhatsAppLink } from "@/lib/config";

export const metadata: Metadata = {
  title: "About Bariq Electronics",
  description: "Bariq Electronics — professional electronics, mobile repair and microsoldering tools for technicians worldwide.",
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
            Professional electronics, mobile repair and microsoldering tools for technicians worldwide.
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
                  Bariq Electronics is a supplier of professional equipment for mobile phone repair technicians,
                  microsoldering specialists, PCB repair professionals and electronics workshops.
                </p>
                <p>
                  We focus on tools that working repair technicians actually use — microscopes, soldering stations,
                  precision screwdrivers, PCB repair equipment and workshop accessories. Every product in our catalog
                  is selected with professional repair work in mind.
                </p>
                <h3>Our Mission</h3>
                <p>
                  Our goal is to make professional-grade repair tools accessible to technicians and workshops worldwide.
                  We believe the right equipment makes every repair faster, more accurate and more reliable.
                </p>
                <h3>Wholesale & Business</h3>
                <p>
                  We work with repair shops, distributors, training centers and resellers. If you&apos;re interested in
                  wholesale pricing or business partnerships, contact us directly.
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
