import React from "react";
import { Metadata } from "next";
import { Tag, Layers } from "lucide-react";
import { createCategory, getAdminCategories } from "@/app/actions/admin";
import { DeleteCategoryButton } from "./delete-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Categories | Admin" };

export default async function AdminCategoriesPage() {
  const categoryList = await getAdminCategories();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-xl font-black text-[#0A0A0A]">Categories</h1>
        <p className="text-sm text-[#9E9E9E] mt-0.5">
          {categoryList.length} {categoryList.length === 1 ? "category" : "categories"}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Add Category Form */}
        <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-5">
          <h2 className="font-semibold text-sm text-[#0A0A0A] mb-4">Add Category</h2>

          <form action={createCategory} className="space-y-4">
            <Input
              label="Category Name *"
              name="name"
              placeholder="e.g. Microscopes"
              required
            />
            <Textarea
              label="Description"
              name="description"
              placeholder="Optional description"
              className="min-h-[80px]"
            />
            <Input
              label="Sort Order"
              name="sortOrder"
              type="number"
              min="0"
              defaultValue="0"
              helper="Lower numbers appear first"
            />
            <Button type="submit" size="sm" className="font-bold">
              Add Category
            </Button>
          </form>
        </div>

        {/* Category List */}
        <div className="bg-white border border-[#E5E5E5] rounded-[10px] overflow-hidden">
          <div className="px-5 py-3 border-b border-[#E5E5E5] bg-[#F7F7F7]">
            <h2 className="font-semibold text-sm text-[#0A0A0A]">Existing Categories</h2>
          </div>

          {categoryList.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-16 text-center px-4">
              <Layers className="w-10 h-10 text-[#E5E5E5]" />
              <p className="font-medium text-[#9E9E9E]">No categories yet</p>
              <p className="text-xs text-[#BDBDBD]">
                Add your first category using the form.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-[#F0F0F0]">
              {categoryList.map((cat) => (
                <li key={cat.id} className="flex items-center justify-between px-5 py-3 hover:bg-[#F7F7F7] transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-7 h-7 bg-[#F7F3EE] rounded-[5px] flex items-center justify-center flex-shrink-0">
                      <Tag className="w-3.5 h-3.5 text-[#E65C00]" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-sm text-[#0A0A0A] truncate">{cat.name}</div>
                      <div className="text-xs text-[#9E9E9E] font-mono truncate">{cat.slug}</div>
                    </div>
                  </div>
                  <DeleteCategoryButton id={cat.id} name={cat.name} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
