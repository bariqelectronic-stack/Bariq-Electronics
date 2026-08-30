import React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type CategoryContent } from "@/lib/category-content";

interface CategoryFeatureSectionProps {
  content: CategoryContent;
  slug: string;
}

export function CategoryFeatureSection({ content, slug }: CategoryFeatureSectionProps) {
  return (
    <section className="py-16 bg-[#0A0A0A]">
      <div className="container-site">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#E65C00]" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E65C00]">
                {content.label}
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight mb-4">
              {content.headlinePart1}
              <span className="text-[#E65C00]">{content.headlineAccent}</span>
            </h2>
            <p className="text-[#9E9E9E] text-base leading-relaxed mb-8">
              {content.description}
            </p>

            <div className="space-y-4 mb-8">
              {content.bullets.map((bullet) => (
                <div key={bullet.title} className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E65C0020] border border-[#E65C0040] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-[#E65C00]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{bullet.title}</div>
                    <div className="text-xs text-[#9E9E9E] mt-0.5 leading-relaxed">{bullet.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <Link href={`/shop?category=${slug}`}>
              <Button className="bg-[#E65C00] hover:bg-[#CC5000] text-white font-bold tracking-wide">
                {content.ctaLabel} <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          {/* Visual panel */}
          <div className="bg-[#111] border border-[#1E1E1E] rounded-[12px] p-8 lg:p-10">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#E65C00] mb-4">
              Comparison Factors
            </div>
            <div className="space-y-3">
              {content.factors.map((item, i) => (
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
              href={`/shop?category=${slug}`}
              className="mt-6 flex items-center gap-2 text-sm font-medium text-[#E65C00] hover:text-[#FF7A1A] transition-colors"
            >
              View all products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
