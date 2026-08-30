import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Plus, Edit, Eye, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAdminProducts } from "@/app/actions/admin";
import { demoProducts } from "@/lib/demo-products";

export const metadata: Metadata = {
  title: "Products | Admin",
};

export default async function AdminProductsPage() {
  const dbProducts = await getAdminProducts();
  const isDemo = dbProducts.length === 0;
  const productList = isDemo ? demoProducts : dbProducts;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-black text-[#0A0A0A]">Products</h1>
          <p className="text-sm text-[#9E9E9E] mt-0.5">
            {productList.length} {isDemo ? "products (demo)" : "products"}
          </p>
        </div>
        <Link href="/admin/products/new">
          <Button size="sm" className="font-bold">
            <Plus className="w-4 h-4 mr-1" />
            Add Product
          </Button>
        </Link>
      </div>

      {isDemo && (
        <div className="bg-[#FEF9C3] border border-[#CA8A04] rounded-[8px] p-3 mb-5 text-xs text-[#78350F]">
          <strong>Demo Data:</strong> No products in your database yet. Click{" "}
          <Link href="/admin/products/new" className="underline font-semibold">Add Product</Link>{" "}
          to create your first product.
        </div>
      )}

      <div className="bg-white border border-[#E5E5E5] rounded-[10px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E5E5] bg-[#F7F7F7]">
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Product</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">SKU</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Category</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Price</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Stock</th>
                <th className="text-left px-4 py-3 font-semibold text-[#6B6B6B] text-xs uppercase tracking-wider">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F0F0]">
              {productList.map((product) => (
                <tr key={product.id} className="hover:bg-[#F7F7F7] transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-[#F7F7F7] border border-[#E5E5E5] rounded-[6px] flex items-center justify-center flex-shrink-0">
                        <Package className="w-4 h-4 text-[#9E9E9E]" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-[#0A0A0A] line-clamp-1">{product.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#6B6B6B] font-mono text-xs">{product.sku || "—"}</td>
                  <td className="px-4 py-3 text-[#6B6B6B]">{product.category?.name || "—"}</td>
                  <td className="px-4 py-3 text-[#6B6B6B]">
                    {product.price
                      ? `Rs. ${product.price}`
                      : <span className="text-[#BDBDBD] text-xs">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={
                      product.stockStatus === "in_stock" ? "success"
                      : product.stockStatus === "out_of_stock" ? "error"
                      : "warning"
                    }>
                      {product.stockStatus?.replace(/_/g, " ")}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <Badge variant={product.status === "published" ? "success" : "default"}>
                        {product.status}
                      </Badge>
                      {"isDemo" in product && product.isDemo && (
                        <Badge variant="demo">Demo</Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 justify-end">
                      <Link
                        href={`/products/${product.slug}`}
                        className="p-1.5 rounded-[4px] text-[#9E9E9E] hover:text-[#0A0A0A] hover:bg-[#F0F0F0] transition-colors"
                        title="View product"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="p-1.5 rounded-[4px] text-[#9E9E9E] hover:text-[#E65C00] hover:bg-[#F7F3EE] transition-colors"
                        title="Edit product"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </Link>
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
