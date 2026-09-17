import React from "react";
import { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { Search, Filter } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Orders | Admin",
};

const ORDER_STATUS_COLORS: Record<
  string,
  "default" | "info" | "warning" | "success" | "error"
> = {
  pending: "warning",
  payment_confirmed: "info",
  processing: "info",
  shipped: "success",
  delivered: "success",
  cancelled: "error",
  refunded: "default",
};

export default async function AdminOrdersPage() {
  const supabase = await createServerSupabaseClient();

  const { data: orderRows, error } = await supabase
    .from("orders")
    .select(
      "id, order_number, email, status, payment_status, total, created_at, user_id"
    )
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-black text-[#0A0A0A]">Orders</h1>
        <p className="text-sm text-[#DC2626] mt-2">
          Unable to load orders right now.
        </p>
      </div>
    );
  }

  const ordersList = orderRows ?? [];

  const userIds = ordersList
    .map((order) => order.user_id)
    .filter((id): id is string => Boolean(id));

  let customerMap = new Map<string, { name: string | null }>();

  if (userIds.length > 0) {
    const { data: customers } = await supabase
      .from("users")
      .select("id, name")
      .in("id", userIds);

    customerMap = new Map(
      (customers ?? []).map((customer) => [customer.id, customer])
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-black text-[#0A0A0A]">Orders</h1>
          <p className="text-sm text-[#9E9E9E] mt-0.5">
            Manage customer orders
          </p>
        </div>

        <div className="text-xs text-[#9E9E9E]">
          {ordersList.length} order{ordersList.length === 1 ? "" : "s"}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-5">
        <div className="flex-1 min-w-48 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9E9E]" />
          <input
            type="search"
            placeholder="Search orders..."
            className="w-full border border-[#E5E5E5] rounded-[6px] pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-[#E65C00] bg-white"
          />
        </div>

        <div className="flex items-center gap-2 border border-[#E5E5E5] rounded-[6px] px-3 py-2 bg-white text-sm text-[#6B6B6B]">
          <Filter className="w-4 h-4" />
          Filter by status
        </div>
      </div>

      <div className="flex gap-1 mb-5 overflow-x-auto pb-1">
        {[
          "All",
          "Pending",
          "Processing",
          "Shipped",
          "Delivered",
          "Cancelled",
        ].map((tab, i) => (
          <button
            key={tab}
            className={`text-xs font-medium px-3 py-1.5 rounded-[5px] whitespace-nowrap ${
              i === 0
                ? "bg-[#0A0A0A] text-white"
                : "bg-white border border-[#E5E5E5] text-[#6B6B6B]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white border border-[#E5E5E5] rounded-[10px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E5E5] bg-[#F7F7F7]">
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#6B6B6B] uppercase">
                  Order
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#6B6B6B] uppercase">
                  Customer
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#6B6B6B] uppercase">
                  Date
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#6B6B6B] uppercase">
                  Total
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#6B6B6B] uppercase">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-[#6B6B6B] uppercase">
                  Payment
                </th>
              </tr>
            </thead>

            <tbody>
              {ordersList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-3xl">📋</span>
                      <p className="font-medium text-[#9E9E9E]">
                        No orders yet
                      </p>
                      <p className="text-xs text-[#BDBDBD]">
                        New customer orders will appear here automatically.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                ordersList.map((order) => {
                  const status = order.status || "pending";
                  const payment = order.payment_status || "unpaid";
                  const customer = order.user_id
                    ? customerMap.get(order.user_id)
                    : null;

                  return (
                    <tr
                      key={order.id}
                      className="border-b border-[#F0F0F0] last:border-0"
                    >
                      <td className="px-4 py-4">
                        <div className="font-bold text-[#0A0A0A]">
                          #{order.order_number}
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <div className="font-medium text-[#0A0A0A]">
                          {customer?.name || "Guest Customer"}
                        </div>
                        <div className="text-xs text-[#9E9E9E]">
                          {order.email}
                        </div>
                      </td>

                      <td className="px-4 py-4 text-[#6B6B6B]">
                        {order.created_at
                          ? new Date(order.created_at).toLocaleDateString()
                          : "—"}
                      </td>

                      <td className="px-4 py-4 font-bold text-[#0A0A0A]">
                        PKR{" "}
                        {Number(order.total || 0).toLocaleString()}
                      </td>

                      <td className="px-4 py-4">
                        <Badge
                          variant={
                            ORDER_STATUS_COLORS[status] || "default"
                          }
                          className="text-[10px]"
                        >
                          {status.replace(/_/g, " ")}
                        </Badge>
                      </td>

                      <td className="px-4 py-4">
                        <Badge variant="default" className="text-[10px]">
                          {payment.replace(/_/g, " ")}
                        </Badge>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}