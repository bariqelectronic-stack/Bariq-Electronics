import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createServerSupabaseClient } from "@/lib/supabase-server";

// Visual-only styling map — slug → { emoji, bg }.
const CATEGORY_VISUALS: Record<string, { emoji: string; bg: string }> = {
  cofs:               { emoji: "🔲", bg: "#EEF4F7" },
  lvds:               { emoji: "🔗", bg: "#F7F4EE" },
  "led-lcd-boards":   { emoji: "📺", bg: "#EEF7EE" },
  "t-con":            { emoji: "🖥️", bg: "#F7EEEE" },
  scaller:            { emoji: "📡", bg: "#EEF7F7" },
  quard:              { emoji: "🔳", bg: "#F4EEF7" },
  foam:               { emoji: "🧱", bg: "#F7F7EE" },
  "t-con-programmer": { emoji: "💾", bg: "#F7EEF4" },
  "head-assembly":    { emoji: "⚙️", bg: "#F7F3EE" },
  "acf-tape":         { emoji: "🎞️", bg: "#EEF4F7" },
  "acf-remover":      { emoji: "🧪", bg: "#F7F4EE" },
  "cof-cutter":       { emoji: "✂️", bg: "#EEF7EE" },
  tape:               { emoji: "📏", bg: "#EEF7F7" },
};
const DEFAULT_VISUAL = { emoji: "📦", bg: "#F7F7F7" };

export async function CategoryGrid() {
  const supabase = await createServerSupabaseClient();
  const { data: allCategories } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  // Microscopes is excluded from the homepage category showcase.
  const categories = (allCategories ?? []).filter((c) => c.isActive && c.slug !== "microscopes");

  return (
    <section className="py-16 bg-[#F7F7F7]">
      <div className="container-site">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E65C00] mb-2">
              Browse by Category
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] tracking-tight">
              Shop by Category
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-[#E65C00] hover:text-[#CC5000] transition-colors"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-3">
          {categories.map((cat) => {
            const visual = CATEGORY_VISUALS[cat.slug] ?? DEFAULT_VISUAL;
            return (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group relative bg-white border border-[#E5E5E5] rounded-[10px] p-5 hover:border-[#D0D0D0] hover:shadow-[0_4px_16px_0_rgba(0,0,0,0.08)] transition-all duration-200"
              >
                <div
                  className="w-10 h-10 rounded-[8px] flex items-center justify-center text-xl mb-4"
                  style={{ backgroundColor: visual.bg }}
                >
                  {visual.emoji}
                </div>
                <h3 className="font-semibold text-[#0A0A0A] text-sm mb-1 group-hover:text-[#E65C00] transition-colors">
                  {cat.name}
                </h3>
                {cat.description && (
                  <p className="text-xs text-[#9E9E9E] leading-relaxed line-clamp-2">{cat.description}</p>
                )}
                <div className="flex items-center gap-1 mt-3 text-xs font-medium text-[#6B6B6B] group-hover:text-[#E65C00] transition-colors">
                  Browse <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}