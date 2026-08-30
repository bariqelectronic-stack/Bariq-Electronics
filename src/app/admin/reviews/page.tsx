import React from "react";
import { Metadata } from "next";
import { Star } from "lucide-react";

export const metadata: Metadata = { title: "Reviews | Admin" };

export default function AdminReviewsPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-black text-[#0A0A0A]">Reviews</h1>
          <p className="text-sm text-[#9E9E9E] mt-0.5">Manage product reviews and ratings</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Reviews", value: "0" },
          { label: "Pending Approval", value: "0" },
          { label: "Avg. Rating", value: "—" },
          { label: "Verified Reviews", value: "0" },
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
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Product</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Customer</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Rating</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Review</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Date</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={7} className="text-center py-16">
                  <Star className="w-10 h-10 text-[#E5E5E5] mx-auto mb-3" />
                  <p className="font-medium text-[#9E9E9E]">No reviews yet</p>
                  <p className="text-xs text-[#BDBDBD] mt-1">Customer reviews will appear here once submitted.</p>
                  <p className="text-xs text-[#BDBDBD]">Requires database configuration.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-5 bg-[#F7F3EE] border border-[#E65C0020] rounded-[8px] p-4 text-xs text-[#6B6B6B]">
        <strong className="text-[#0A0A0A]">Review Policy:</strong> Only approve reviews from verified purchasers.
        No fake reviews, inflated ratings or anonymous testimonials should be published.
        Reviews are tied to order IDs for verification.
      </div>
    </div>
  );
}
