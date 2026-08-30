import React from "react";
import { Metadata } from "next";
import { Briefcase, Mail } from "lucide-react";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = { title: "Wholesale Leads | Admin" };

export default function AdminWholesalePage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-black text-[#0A0A0A]">Wholesale Leads</h1>
          <p className="text-sm text-[#9E9E9E] mt-0.5">Business & bulk order inquiries</p>
        </div>
        <a
          href={`mailto:${siteConfig.email}`}
          className="flex items-center gap-2 text-sm font-medium text-[#E65C00] hover:underline"
        >
          <Mail className="w-4 h-4" />
          {siteConfig.email}
        </a>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Leads", value: "—", color: "text-[#2563EB]", bg: "bg-[#DBEAFE]" },
          { label: "New", value: "—", color: "text-[#CA8A04]", bg: "bg-[#FEF9C3]" },
          { label: "Converted", value: "—", color: "text-[#16A34A]", bg: "bg-[#DCFCE7]" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-[#E5E5E5] rounded-[10px] p-4">
            <div className={`text-2xl font-black ${s.color} mb-1`}>{s.value}</div>
            <div className="text-xs text-[#9E9E9E]">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E5E5E5] rounded-[10px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E5E5] bg-[#F7F7F7]">
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Company</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Country</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Type</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Email</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Volume</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Date</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={8} className="text-center py-16">
                  <Briefcase className="w-10 h-10 text-[#E5E5E5] mx-auto mb-3" />
                  <p className="font-medium text-[#9E9E9E]">No wholesale leads yet</p>
                  <p className="text-xs text-[#BDBDBD] mt-1">
                    Leads from the wholesale form will appear here once the database is configured.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 text-xs text-[#9E9E9E] text-center">
        Currently, wholesale form submissions are sent to <strong>{siteConfig.email}</strong>.
        Database configuration required to store and manage leads here.
      </div>
    </div>
  );
}
