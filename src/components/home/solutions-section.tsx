import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const solutions = [
  {
    slug: "mobile-phone-repair",
    title: "Mobile Phone Repair",
    desc: "Tools and equipment for complete smartphone repair — from screen replacement to board-level microsoldering.",
    items: ["Screwdriver sets", "Opening tools", "Microscopes", "Soldering stations"],
    icon: "📱",
  },
  {
    slug: "microsoldering",
    title: "Microsoldering",
    desc: "Precision soldering equipment for chip-level repairs, component replacement and BGA rework.",
    items: ["Soldering stations", "Hot air stations", "Microscopes", "Flux and solder"],
    icon: "⚡",
  },
  {
    slug: "pcb-repair",
    title: "PCB Repair",
    desc: "Diagnostic and rework tools for printed circuit board repair, trace repair and component testing.",
    items: ["Multimeters", "Microscopes", "Hot air tools", "Cleaning tools"],
    icon: "🔧",
  },
  {
    slug: "electronics-laboratory",
    title: "Electronics Laboratory",
    desc: "Complete bench setup equipment for professional electronics diagnostics, testing and development.",
    items: ["Power supplies", "Multimeters", "Oscilloscopes", "Component storage"],
    icon: "🧪",
  },
];

export function SolutionsSection() {
  return (
    <section className="py-16 bg-[#F7F7F7]">
      <div className="container-site">
        <div className="text-center mb-10">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E65C00] mb-2">
            By Application
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] tracking-tight">
            Solutions for Every Repair
          </h2>
          <p className="text-sm text-[#6B6B6B] mt-2 max-w-lg mx-auto">
            Whether you repair phones, work with microsoldering, or run a full electronics lab —
            find the right tools for your workflow.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {solutions.map((sol) => (
            <Link
              key={sol.slug}
              href={`/solutions/${sol.slug}`}
              className="group bg-white border border-[#E5E5E5] rounded-[10px] p-6 hover:border-[#E65C00] hover:shadow-[0_4px_16px_0_rgba(230,92,0,0.1)] transition-all duration-200"
            >
              <div className="text-3xl mb-4">{sol.icon}</div>
              <h3 className="font-bold text-[#0A0A0A] mb-2 group-hover:text-[#E65C00] transition-colors">
                {sol.title}
              </h3>
              <p className="text-sm text-[#6B6B6B] leading-relaxed mb-4">{sol.desc}</p>
              <ul className="space-y-1 mb-5">
                {sol.items.map((item) => (
                  <li key={item} className="text-xs text-[#9E9E9E] flex items-center gap-1.5">
                    <div className="w-1 h-1 bg-[#E65C00] rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-1 text-sm font-medium text-[#E65C00]">
                Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
