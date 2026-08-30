import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/app/actions/admin";

export async function Hero() {
  const allCategories = await getCategories();
  // Bottom nav bar: all active categories except Microscopes (not in homepage showcase)
  const navCategories = allCategories.filter((c) => c.isActive && c.slug !== "microscopes");

  return (
    <section className="relative bg-[#0A0A0A] overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      {/* Orange accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#E65C00]" />

      <div className="container-site relative z-10 py-20 lg:py-28">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-6">
            <div className="h-px w-8 bg-[#E65C00]" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E65C00]">
              Professional Equipment
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
            Professional Tools.{" "}
            <span className="text-[#E65C00]">Precise</span>{" "}
            Repairs.
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-[#9E9E9E] max-w-2xl mb-10 leading-relaxed">
            Professional equipment for mobile phone repair, microsoldering, PCB inspection
            and electronics workshops. Built for technicians who demand precision.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Link href="/shop">
              <Button size="lg" className="bg-[#E65C00] hover:bg-[#CC5000] text-white border-0 text-sm font-bold tracking-wide uppercase px-8">
                Shop Products
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link href="/categories">
              <Button variant="outline" size="lg" className="border-[#2A2A2A] bg-transparent text-white hover:bg-[#1A1A1A] hover:border-[#3D3D3D] text-sm font-semibold tracking-wide">
                Explore Equipment
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center gap-6">
            {[
              "Precision Engineered",
              "Technician Focused",
              "Worldwide Shipping",
              "Wholesale Available",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-[#E65C00]" />
                <span className="text-xs text-[#6B6B6B] font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category quick-nav bar — driven by DB, Microscopes excluded from homepage */}
      {navCategories.length > 0 && (
        <div className="border-t border-[#1E1E1E]">
          <div className="container-site">
            <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide py-3">
              {navCategories.map((cat, i) => (
                <React.Fragment key={cat.slug}>
                  {i > 0 && <ChevronRight className="w-3 h-3 text-[#3D3D3D] flex-shrink-0 mx-1" />}
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="text-xs font-medium text-[#9E9E9E] hover:text-white whitespace-nowrap transition-colors px-1"
                  >
                    {cat.name}
                  </Link>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
