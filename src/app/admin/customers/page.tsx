import React from "react";
import { Metadata } from "next";
import { Search, UserCircle } from "lucide-react";

export const metadata: Metadata = { title: "Customers | Admin" };

export default function AdminCustomersPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-black text-[#0A0A0A]">Customers</h1>
          <p className="text-sm text-[#9E9E9E] mt-0.5">View and manage customer accounts</p>
        </div>
      </div>

      <div className="flex gap-3 mb-5">
        <div className="flex-1 min-w-48 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9E9E]" />
          <input
            type="search"
            placeholder="Search customers..."
            className="w-full border border-[#E5E5E5] rounded-[6px] pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-[#E65C00] bg-white"
          />
        </div>
      </div>

      <div className="bg-white border border-[#E5E5E5] rounded-[10px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E5E5] bg-[#F7F7F7]">
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Customer</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Email</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Orders</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Total Spent</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Joined</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={6} className="text-center py-16">
                  <div className="flex flex-col items-center gap-2">
                    <UserCircle className="w-10 h-10 text-[#E5E5E5]" />
                    <p className="font-medium text-[#9E9E9E]">No customers yet</p>
                    <p className="text-xs text-[#BDBDBD]">Customer accounts will appear here once registration is enabled.</p>
                    <p className="text-xs text-[#BDBDBD]">Requires database configuration.</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
