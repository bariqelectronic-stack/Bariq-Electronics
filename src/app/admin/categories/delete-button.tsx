"use client";

import { deleteCategory } from "@/app/actions/admin";

export function DeleteCategoryButton({ id, name }: { id: string; name: string }) {
  async function handleDelete() {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    await deleteCategory(id);
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="text-xs text-[#9E9E9E] hover:text-[#DC2626] transition-colors px-2 py-1 rounded-[4px] hover:bg-[#FEE2E2] flex-shrink-0 ml-2"
    >
      Delete
    </button>
  );
}
