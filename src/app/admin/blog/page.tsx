import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Plus, Eye, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Blog | Admin" };

// Demo articles matching the learn section
const demoArticles = [
  { slug: "how-to-choose-a-microscope-for-microsoldering", title: "How to Choose a Microscope for Microsoldering", category: "Buying Guides", status: "published", date: "2025-08-01" },
  { slug: "professional-mobile-repair-bench-setup", title: "Professional Mobile Repair Bench Setup", category: "Repair Guides", status: "published", date: "2025-08-05" },
  { slug: "essential-tools-for-pcb-repair", title: "Essential Tools for PCB Repair", category: "Tool Guides", status: "published", date: "2025-08-10" },
  { slug: "microsoldering-equipment-checklist", title: "Microsoldering Equipment Checklist", category: "Microsoldering", status: "published", date: "2025-08-15" },
  { slug: "understanding-microscope-magnification", title: "Understanding Microscope Magnification", category: "Buying Guides", status: "published", date: "2025-08-20" },
  { slug: "soldering-tips-guide", title: "Soldering Tips: Types and When to Use Them", category: "Tool Guides", status: "published", date: "2025-08-25" },
];

export default function AdminBlogPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-black text-[#0A0A0A]">Blog / Learn</h1>
          <p className="text-sm text-[#9E9E9E] mt-0.5">{demoArticles.length} articles</p>
        </div>
        <Button size="sm" className="font-bold">
          <Plus className="w-4 h-4 mr-1" />
          New Article
        </Button>
      </div>

      <div className="bg-[#FEF9C3] border border-[#CA8A04] rounded-[8px] p-3 mb-5 text-xs text-[#78350F]">
        <strong>Note:</strong> These articles are currently hardcoded in <code className="bg-[#FEF08A] px-1 rounded">src/app/learn/</code>.
        Full CMS-based article management requires database configuration. You can edit the article files directly.
      </div>

      <div className="bg-white border border-[#E5E5E5] rounded-[10px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E5E5] bg-[#F7F7F7]">
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Title</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Category</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Published</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F0F0]">
              {demoArticles.map((article) => (
                <tr key={article.slug} className="hover:bg-[#F7F7F7] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#9E9E9E] flex-shrink-0" />
                      <span className="font-medium text-[#0A0A0A] line-clamp-1">{article.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="text-[10px]">{article.category}</Badge>
                  </td>
                  <td className="px-4 py-3 text-[#6B6B6B] text-xs">{article.date}</td>
                  <td className="px-4 py-3">
                    <Badge variant="success">Published</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 justify-end">
                      <Link href={`/learn/${article.slug}`} className="p-1.5 rounded-[4px] text-[#9E9E9E] hover:text-[#0A0A0A] hover:bg-[#F0F0F0] transition-colors inline-flex" title="View article">
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <button className="p-1.5 rounded-[4px] text-[#9E9E9E] hover:text-[#E65C00] hover:bg-[#F7F3EE] transition-colors inline-flex" title="Edit article">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
