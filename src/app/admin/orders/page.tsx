import React from "react";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";

export const metadata: Metadata = { title: "Orders | Admin" };

const ORDER_STATUS_COLORS: Record<string, "default" | "info" | "warning" | "success" | "error"> = {
  pending: "warning",
  payment_confirmed: "info",
  processing: "info",
  shipped: "success",
  delivered: "success",
  cancelled: "error",
  refunded: "default",
};

export default function AdminOrdersPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-black text-[#0A0A0A]">Orders</h1>
          <p className="text-sm text-[#9E9E9E] mt-0.5">Manage customer orders</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="flex-1 min-w-48 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9E9E]" />
          <input
            type="search"
            placeholder="Search orders..."
            className="w-full border border-[#E5E5E5] rounded-[6px] pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-[#E65C00] bg-white"
          />
        </div>
        <div className="flex items-center gap-2 border border-[#E5E5E5] rounded-[6px] px-3 py-2 bg-white text-sm text-[#6B6B6B] cursor-pointer hover:border-[#D0D0D0]">
          <Filter className="w-4 h-4" /> Filter by status
        </div>
      </div>

      {/* Status tabs */}
      <div className="flex gap-1 mb-5 overflow-x-auto pb-1">
        {["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map((tab, i) => (
          <button
            key={tab}
            className={`text-xs font-medium px-3 py-1.5 rounded-[5px] whitespace-nowrap ${
              i === 0
                ? "bg-[#0A0A0A] text-white"
                : "bg-white border border-[#E5E5E5] text-[#6B6B6B] hover:border-[#D0D0D0]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E5E5E5] rounded-[10px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E5E5] bg-[#F7F7F7]">
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Order</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Customer</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Date</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Items</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Total</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Payment</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={8} className="text-center py-16 text-[#BDBDBD]">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-3xl">📋</span>
                    <p className="font-medium text-[#9E9E9E]">No orders yet</p>
                    <p className="text-xs text-[#BDBDBD]">Orders will appear here once customers start purchasing.</p>
                    <p className="text-xs text-[#BDBDBD] mt-1">Requires database configuration.</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Order status legend */}
      <div className="mt-5 bg-white border border-[#E5E5E5] rounded-[10px] p-4">
        <h3 className="font-semibold text-[#0A0A0A] text-xs uppercase tracking-wider mb-3">Order Status Guide</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(ORDER_STATUS_COLORS).map(([status, color]) => (
            <Badge key={status} variant={color} className="text-[10px]">
              {status.replace(/_/g, " ")}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
