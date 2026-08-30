import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Package, Edit } from "lucide-react";
import { demoProducts } from "@/lib/demo-products";

export const metadata: Metadata = { title: "Inventory | Admin" };

export default function AdminInventoryPage() {
  const lowStock = demoProducts.filter(
    (p) => p.stockStatus === "low_stock" || p.stockStatus === "out_of_stock"
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-black text-[#0A0A0A]">Inventory</h1>
          <p className="text-sm text-[#9E9E9E] mt-0.5">Track stock levels and movements</p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Products", value: demoProducts.length, icon: Package, color: "text-[#2563EB]", bg: "bg-[#DBEAFE]" },
          { label: "In Stock", value: demoProducts.filter(p => p.stockStatus === "in_stock").length, icon: Package, color: "text-[#16A34A]", bg: "bg-[#DCFCE7]" },
          { label: "Low Stock", value: lowStock.length, icon: AlertTriangle, color: "text-[#CA8A04]", bg: "bg-[#FEF9C3]" },
          { label: "Out of Stock", value: demoProducts.filter(p => p.stockStatus === "out_of_stock").length, icon: AlertTriangle, color: "text-[#DC2626]", bg: "bg-[#FEE2E2]" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-[#E5E5E5] rounded-[10px] p-4">
            <div className={`w-8 h-8 ${stat.bg} rounded-[6px] flex items-center justify-center mb-2`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <div className="text-2xl font-black text-[#0A0A0A]">{stat.value}</div>
            <div className="text-xs text-[#9E9E9E] mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Inventory table */}
      <div className="bg-white border border-[#E5E5E5] rounded-[10px] overflow-hidden">
        <div className="px-5 py-3 border-b border-[#E5E5E5] flex items-center justify-between bg-[#F7F7F7]">
          <h3 className="font-semibold text-[#0A0A0A] text-sm">All Products — Inventory</h3>
          <Badge variant="demo">Demo Data</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E5E5]">
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Product</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">SKU</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">In Stock</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Reserved</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Available</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Low Stock Alert</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F0F0]">
              {demoProducts.map((product) => {
                const inv = product.inventory;
                const qty = inv?.quantity ?? 0;
                const reserved = inv?.reserved ?? 0;
                const available = qty - reserved;
                const threshold = inv?.lowStockThreshold ?? 5;
                const isLow = qty <= threshold && qty > 0;
                const isOut = qty <= 0;

                return (
                  <tr key={product.id} className="hover:bg-[#F7F7F7] transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-[#9E9E9E] flex-shrink-0" />
                        <span className="font-medium text-[#0A0A0A] line-clamp-1 max-w-[200px]">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-[#6B6B6B]">{product.sku || "—"}</td>
                    <td className="px-4 py-3 font-semibold text-[#0A0A0A]">{qty}</td>
                    <td className="px-4 py-3 text-[#6B6B6B]">{reserved}</td>
                    <td className="px-4 py-3 font-semibold text-[#0A0A0A]">{available}</td>
                    <td className="px-4 py-3 text-[#6B6B6B] text-xs">{threshold} units</td>
                    <td className="px-4 py-3">
                      {isOut ? (
                        <Badge variant="error">Out of Stock</Badge>
                      ) : isLow ? (
                        <Badge variant="warning">Low Stock</Badge>
                      ) : (
                        <Badge variant="success">In Stock</Badge>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/admin/products`} className="p-1.5 rounded-[4px] text-[#9E9E9E] hover:text-[#E65C00] hover:bg-[#F7F3EE] transition-colors inline-flex">
                        <Edit className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-[#9E9E9E] mt-3 text-center">
        Live inventory tracking requires database configuration. Adjust stock levels in product edit pages.
      </p>
    </div>
  );
}
