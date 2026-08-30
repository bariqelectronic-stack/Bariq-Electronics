import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { FileText, ExternalLink, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Pages | Admin" };

const EDITABLE_PAGES = [
  { slug: "homepage", title: "Homepage", path: "/", note: "Hero, sections, content" },
  { slug: "about", title: "About", path: "/about", note: "Company information" },
  { slug: "shipping", title: "Shipping Policy", path: "/shipping", note: "Shipping terms" },
  { slug: "returns", title: "Returns Policy", path: "/returns", note: "Return conditions" },
  { slug: "faq", title: "FAQ", path: "/faq", note: "Frequently asked questions" },
  { slug: "wholesale", title: "Wholesale", path: "/wholesale", note: "B2B information" },
  { slug: "privacy", title: "Privacy Policy", path: "/privacy", note: "Privacy terms" },
  { slug: "terms", title: "Terms of Service", path: "/terms", note: "Terms and conditions" },
  { slug: "contact", title: "Contact", path: "/contact", note: "Contact info & form" },
];

export default function AdminPagesPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-black text-[#0A0A0A]">Pages</h1>
          <p className="text-sm text-[#9E9E9E] mt-0.5">Manage static and content pages</p>
        </div>
      </div>

      <div className="bg-[#FEF9C3] border border-[#CA8A04] rounded-[8px] p-3 mb-5 text-xs text-[#78350F]">
        <strong>Note:</strong> Pages are currently managed as code files in <code className="bg-[#FEF08A] px-1 rounded">src/app/</code>.
        Full CMS-based editing requires database configuration. Edit page files directly in the project.
      </div>

      <div className="bg-white border border-[#E5E5E5] rounded-[10px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E5E5] bg-[#F7F7F7]">
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Page</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">URL</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Note</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F0F0]">
              {EDITABLE_PAGES.map((page) => (
                <tr key={page.slug} className="hover:bg-[#F7F7F7] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#9E9E9E] flex-shrink-0" />
                      <span className="font-medium text-[#0A0A0A]">{page.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-[#6B6B6B]">{page.path}</td>
                  <td className="px-4 py-3 text-xs text-[#9E9E9E]">{page.note}</td>
                  <td className="px-4 py-3">
                    <Badge variant="success">Live</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 justify-end">
                      <Link href={page.path} target="_blank" className="p-1.5 rounded-[4px] text-[#9E9E9E] hover:text-[#0A0A0A] hover:bg-[#F0F0F0] transition-colors inline-flex" title="View page">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <button className="p-1.5 rounded-[4px] text-[#9E9E9E] hover:text-[#E65C00] hover:bg-[#F7F3EE] transition-colors inline-flex" title="Edit (requires DB)">
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
