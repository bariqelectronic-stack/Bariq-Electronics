import React from "react";
import { Metadata } from "next";
import { MessageSquare, Mail } from "lucide-react";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = { title: "Messages | Admin" };

export default function AdminMessagesPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-black text-[#0A0A0A]">Messages</h1>
          <p className="text-sm text-[#9E9E9E] mt-0.5">Contact form submissions</p>
        </div>
        <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 text-sm font-medium text-[#E65C00] hover:underline">
          <Mail className="w-4 h-4" /> {siteConfig.email}
        </a>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Messages", value: "—" },
          { label: "Unread", value: "—" },
          { label: "This Week", value: "—" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-[#E5E5E5] rounded-[10px] p-4">
            <div className="text-2xl font-black text-[#0A0A0A] mb-1">{s.value}</div>
            <div className="text-xs text-[#9E9E9E]">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#E5E5E5] rounded-[10px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E5E5] bg-[#F7F7F7]">
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Name</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Email</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Subject</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Preview</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Date</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={6} className="text-center py-16">
                  <MessageSquare className="w-10 h-10 text-[#E5E5E5] mx-auto mb-3" />
                  <p className="font-medium text-[#9E9E9E]">No messages yet</p>
                  <p className="text-xs text-[#BDBDBD] mt-1">Contact form submissions will appear here.</p>
                  <p className="text-xs text-[#BDBDBD]">Requires database configuration.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
