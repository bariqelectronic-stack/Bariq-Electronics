import React from "react";
import Link from "next/link";
import { ArrowRight, Monitor, Tv, Scissors, CircuitBoard } from "lucide-react";

const solutions = [
  {
    slug: "lcd-panel-repair",
    href: "/shop",
    title: "LCD PANEL REPAIR",
    desc: "Essential parts and solutions for professional LCD panel repair, servicing and restoration.",
    items: [
      "LCD Panel Parts",
      "Panel Repair Materials",
      "Display Connection Parts",
      "Professional Repair Components",
    ],
    Icon: Monitor,
  },
  {
    slug: "led-display-repair",
    href: "/categories/led-lcd-boards",
    title: "LED DISPLAY REPAIR",
    desc: "Professional repair parts for LED displays and television panels, helping technicians diagnose and restore display systems.",
    items: [
      "LED Display Parts",
      "LED Panel Components",
      "Display Repair Materials",
      "Replacement Components",
    ],
    Icon: Tv,
  },
  {
    slug: "cof-acf-repair",
    href: "/categories/cofs",
    title: "COF & ACF REPAIR",
    desc: "Specialized products for COF and ACF bonding, removal, cutting and professional LCD/LED panel repair.",
    items: [
      "COF Parts & Solutions",
      "ACF Tape",
      "ACF Remover",
      "COF Cutters",
    ],
    Icon: Scissors,
  },
  {
    slug: "display-board-repair",
    href: "/categories/t-con",
    title: "DISPLAY BOARD REPAIR",
    desc: "Display boards and related components for professional LED and LCD television repair and troubleshooting.",
    items: [
      "T-CON Boards",
      "LED & LCD Boards",
      "LVDS Solutions",
      "T-CON Programmers",
    ],
    Icon: CircuitBoard,
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
            Solutions for Every Display Repair
          </h2>
          <p className="text-sm text-[#6B6B6B] mt-2 max-w-lg mx-auto">
            Professional LCD and LED repair parts for technicians working on panels, display boards,
            COF, ACF, T-CON and related display-repair applications.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {solutions.map((sol) => (
            <Link
              key={sol.slug}
              href={sol.href}
              className="group bg-white border border-[#E5E5E5] rounded-[10px] p-6 hover:border-[#E65C00] hover:shadow-[0_4px_16px_0_rgba(230,92,0,0.1)] transition-all duration-200"
            >
              <div className="mb-4 w-8 h-8 text-[#E65C00]">
                <sol.Icon className="w-8 h-8" />
              </div>
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
