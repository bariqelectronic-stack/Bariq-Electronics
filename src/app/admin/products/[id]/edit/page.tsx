import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getProduct, getCategories, updateProduct } from "@/app/actions/admin";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImageUploader } from "@/components/admin/image-uploader";

export const metadata: Metadata = { title: "Edit Product | Admin" };

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const [product, categoryList] = await Promise.all([getProduct(id), getCategories()]);

  if (!product) notFound();

  const categoryOptions = [
    { value: "", label: "— No category —" },
    ...categoryList.map((c) => ({ value: c.id, label: c.name })),
  ];

  const statusOptions = [
    { value: "draft", label: "Draft" },
    { value: "published", label: "Published" },
    { value: "archived", label: "Archived" },
  ];

  const stockOptions = [
    { value: "in_stock", label: "In Stock" },
    { value: "low_stock", label: "Low Stock" },
    { value: "out_of_stock", label: "Out of Stock" },
    { value: "preorder", label: "Pre-order" },
    { value: "discontinued", label: "Discontinued" },
  ];

  // Bind the product ID so the Server Action knows which row to update
  const updateThisProduct = updateProduct.bind(null, id);

  const existingImages = Array.isArray(product.images) ? (product.images as string[]) : [];

  return (
    <div className="p-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/products"
          className="p-2 rounded-[6px] text-[#9E9E9E] hover:text-[#0A0A0A] hover:bg-[#F0F0F0] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-xl font-black text-[#0A0A0A]">Edit Product</h1>
          <p className="text-sm text-[#9E9E9E] mt-0.5 truncate max-w-xs">{product.name}</p>
        </div>
      </div>

      <form action={updateThisProduct} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-5 space-y-4">
          <h2 className="font-semibold text-sm text-[#0A0A0A]">Basic Information</h2>

          <Input
            label="Product Name *"
            name="name"
            defaultValue={product.name}
            placeholder="e.g. Professional Trinocular Microscope"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="SKU"
              name="sku"
              defaultValue={product.sku ?? ""}
              placeholder="e.g. MICRO-001"
            />
            <Input
              label="Price (PKR)"
              name="price"
              type="number"
              step="0.01"
              min="0"
              defaultValue={product.price ?? ""}
              placeholder="e.g. 25000"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Sale Price (PKR)"
              name="salePrice"
              type="number"
              step="0.01"
              min="0"
              defaultValue={product.salePrice ?? ""}
              placeholder="Optional"
            />
          </div>

          <Textarea
            label="Short Description"
            name="shortDescription"
            defaultValue={product.shortDescription ?? ""}
            placeholder="Brief summary shown in product listings"
            className="min-h-[80px]"
          />

          <Textarea
            label="Full Description"
            name="description"
            defaultValue={product.description ?? ""}
            placeholder="Detailed product description"
          />
        </div>

        {/* Images */}
        <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-5 space-y-4">
          <div>
            <h2 className="font-semibold text-sm text-[#0A0A0A]">Product Images</h2>
            <p className="text-xs text-[#9E9E9E] mt-0.5">
              First image is the primary display image. Add, remove, or reorder images.
            </p>
          </div>
          <ImageUploader name="images" initialImages={existingImages} />
        </div>

        {/* Categorization */}
        <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-5 space-y-4">
          <h2 className="font-semibold text-sm text-[#0A0A0A]">Categorization</h2>

          <Select
            label="Category"
            name="categoryId"
            options={categoryOptions}
            defaultValue={product.categoryId ?? ""}
            placeholder="— No category —"
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Status"
              name="status"
              options={statusOptions}
              defaultValue={product.status ?? "draft"}
            />
            <Select
              label="Stock Status"
              name="stockStatus"
              options={stockOptions}
              defaultValue={product.stockStatus ?? "in_stock"}
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="isFeatured"
              name="isFeatured"
              value="true"
              defaultChecked={product.isFeatured ?? false}
              className="w-4 h-4 rounded border-[#E5E5E5] accent-[#E65C00]"
            />
            <label htmlFor="isFeatured" className="text-sm font-medium text-[#0A0A0A]">
              Feature this product on the homepage
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button type="submit" className="font-bold">
            Save Changes
          </Button>
          <Link
            href="/admin/products"
            className="text-sm text-[#9E9E9E] hover:text-[#6B6B6B] transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
