import React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const useCases = [
  {
    title: "Mobile Phone Repair",
    desc: "Inspect solder joints, connectors and small components with clarity on modern smartphone PCBs.",
  },
  {
    title: "Microsoldering",
    desc: "Perform precise microsoldering work on tiny pads and components under magnification.",
  },
  {
    title: "PCB Inspection",
    desc: "Identify cracks, cold joints, corrosion and component damage on circuit boards.",
  },
  {
    title: "BGA Work",
    desc: "Reballing and rework of BGA chips requires consistent, reliable magnification.",
  },
];

export function MicroscopeSection() {
  return (
    <section className="py-16 bg-[#0A0A0A]">
      <div className="container-site">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#E65C00]" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E65C00]">
                Microscopes
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight mb-4">
              See Every Detail.{" "}
              <span className="text-[#E65C00]">Repair With Confidence.</span>
            </h2>
            <p className="text-[#9E9E9E] text-base leading-relaxed mb-8">
              The right microscope is the foundation of every professional repair bench.
              Whether you&apos;re diagnosing a hairline crack, soldering a 0201 component,
              or reballing a BGA chip — clear, consistent magnification makes the difference.
            </p>

            <div className="space-y-4 mb-8">
              {useCases.map((uc) => (
                <div key={uc.title} className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E65C0020] border border-[#E65C0040] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#E65C00]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{uc.title}</div>
                    <div className="text-xs text-[#9E9E9E] mt-0.5 leading-relaxed">{uc.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/categories/microscopes">
                <Button className="bg-[#E65C00] hover:bg-[#CC5000] text-white font-bold tracking-wide">
                  Shop Microscopes <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link href="/learn/how-to-choose-a-microscope">
                <Button variant="outline" className="border-[#2A2A2A] bg-transparent text-white hover:bg-[#1A1A1A]">
                  Buying Guide
                </Button>
              </Link>
            </div>
          </div>

          {/* Visual panel */}
          <div className="bg-[#111] border border-[#1E1E1E] rounded-[12px] p-8 lg:p-10">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#E65C00] mb-4">
              Comparison Factors
            </div>
            <div className="space-y-3">
              {[
                { label: "Magnification Range", desc: "Check zoom range for your use case" },
                { label: "Working Distance", desc: "Space between lens and component" },
                { label: "Optical System", desc: "Parallel vs. convergent optics" },
                { label: "Camera Compatibility", desc: "Trinocular for imaging/recording" },
                { label: "Stand Type", desc: "Boom arm, pillar, or table stand" },
                { label: "Lighting", desc: "Ring light, LED bar, or fluorescent" },
                { label: "Application", desc: "PCB, mobile repair, or general use" },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className="flex items-start gap-3 py-3 border-b border-[#1A1A1A] last:border-0"
                >
                  <div className="w-5 h-5 rounded-[4px] bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center flex-shrink-0 text-xs font-bold text-[#9E9E9E]">
                    {i + 1}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{item.label}</div>
                    <div className="text-xs text-[#6B6B6B] mt-0.5">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/categories/microscopes"
              className="mt-6 flex items-center gap-2 text-sm font-medium text-[#E65C00] hover:text-[#FF7A1A] transition-colors"
            >
              View all microscopes <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
