import React from "react";
import { Package, Search, Headphones, Globe } from "lucide-react";

const reasons = [
  {
    icon: Search,
    title: "Curated Selection",
    desc: "We stock tools that actually work. Every product in our catalog is selected for professional repair use, not bulk buying.",
  },
  {
    icon: Package,
    title: "Wholesale Friendly",
    desc: "We work with repair shops, distributors and resellers. Contact us for competitive bulk pricing on all products.",
  },
  {
    icon: Globe,
    title: "Worldwide Delivery",
    desc: "We ship internationally. Get your tools delivered to your workshop wherever you are.",
  },
  {
    icon: Headphones,
    title: "Technical Support",
    desc: "Our team understands repair. We're available on WhatsApp and email to help you choose the right tool.",
  },
];

export function WhyBariq() {
  return (
    <section className="py-16 bg-white">
      <div className="container-site">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#E65C00]" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E65C00]">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] tracking-tight mb-4">
              Why Bariq Electronics
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-8">
              We focus on professional repair tools for technicians, workshops and businesses.
              Our goal is to make the right equipment accessible to repair professionals worldwide.
            </p>
            <div className="border-l-2 border-[#E65C00] pl-5">
              <p className="text-sm text-[#3D3D3D] italic leading-relaxed">
                &ldquo;The right tools make the difference between a frustrating repair and a
                confident one. We want every technician to have access to professional-grade equipment.&rdquo;
              </p>
              <div className="mt-3 text-xs font-semibold text-[#0A0A0A]">Bariq Electronics</div>
            </div>
          </div>

          {/* Right */}
          <div className="grid grid-cols-2 gap-4">
            {reasons.map((reason) => (
              <div
                key={reason.title}
                className="bg-[#F7F7F7] border border-[#F0F0F0] rounded-[10px] p-5"
              >
                <div className="w-9 h-9 bg-white border border-[#E5E5E5] rounded-[8px] flex items-center justify-center mb-3 shadow-sm">
                  <reason.icon className="w-4 h-4 text-[#E65C00]" />
                </div>
                <h3 className="font-semibold text-sm text-[#0A0A0A] mb-1.5">{reason.title}</h3>
                <p className="text-xs text-[#6B6B6B] leading-relaxed">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
