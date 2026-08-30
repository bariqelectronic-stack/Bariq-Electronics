import React from "react";
import { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Migrate Categories | Admin" };

async function runMigration(): Promise<{ ok: boolean; deleted?: string[]; inserted?: string[]; productsNulled?: number; error?: string }> {
  "use server";
  const { auth: getAuth } = await import("@/auth");
  const session = await getAuth();
  if (!session || session.user?.role !== "ADMIN") {
    return { ok: false, error: "Unauthorized" };
  }

  const { db } = await import("@/db");
  const { categories, products } = await import("@/db/schema");
  const { inArray, notInArray } = await import("drizzle-orm");

  if (!db) return { ok: false, error: "Database not configured" };

  const KEEP_SLUGS = ["microscopes"];
  const NEW_CATEGORIES = [
    { name: "COFS",             slug: "cofs",            sortOrder: 1  },
    { name: "LVDS",             slug: "lvds",            sortOrder: 2  },
    { name: "LED & LCD BOARDS", slug: "led-lcd-boards",  sortOrder: 3  },
    { name: "T-CON",            slug: "t-con",           sortOrder: 4  },
    { name: "SCALLER",          slug: "scaller",         sortOrder: 5  },
    { name: "QUARD",            slug: "quard",           sortOrder: 6  },
    { name: "FOAM",             slug: "foam",            sortOrder: 7  },
    { name: "T-CON PROGRAMMER", slug: "t-con-programmer",sortOrder: 8  },
    { name: "HEAD ASSEMBLY",    slug: "head-assembly",   sortOrder: 9  },
    { name: "ACF TAPE",         slug: "acf-tape",        sortOrder: 10 },
    { name: "ACF REMOVER",      slug: "acf-remover",     sortOrder: 11 },
    { name: "COF CUTTER",       slug: "cof-cutter",      sortOrder: 12 },
    { name: "TAPE",             slug: "tape",            sortOrder: 13 },
  ];

  const toDelete = await db
    .select({ id: categories.id, name: categories.name })
    .from(categories)
    .where(notInArray(categories.slug, KEEP_SLUGS));

  const deleteIds = toDelete.map((c) => c.id);

  if (deleteIds.length > 0) {
    await db.update(products).set({ categoryId: null }).where(inArray(products.categoryId, deleteIds));
    await db.delete(categories).where(inArray(categories.id, deleteIds));
  }

  const existing = await db.select({ slug: categories.slug }).from(categories);
  const existingSlugs = new Set(existing.map((c) => c.slug));
  const toInsert = NEW_CATEGORIES.filter((c) => !existingSlugs.has(c.slug));

  if (toInsert.length > 0) {
    await db.insert(categories).values(
      toInsert.map((c) => ({ name: c.name, slug: c.slug, sortOrder: c.sortOrder, isActive: true, description: null }))
    );
  }

  return { ok: true, deleted: toDelete.map((c) => c.name), inserted: toInsert.map((c) => c.name), productsNulled: deleteIds.length };
}

export default async function MigrateCategoriesPage() {
  const session = await auth();
  if (!session || session.user?.role !== "ADMIN") redirect("/login");

  return (
    <div className="p-6 max-w-lg">
      <h1 className="text-xl font-black text-[#0A0A0A] mb-2">Migrate Categories</h1>
      <p className="text-sm text-[#6B6B6B] mb-6">
        This will delete all categories except <strong>Microscopes</strong> and insert the 13 new display-repair categories.
        Products referencing removed categories will have their category set to None (reassign in admin afterwards).
      </p>
      <form action={async () => {
        "use server";
        await runMigration();
        redirect("/admin/categories");
      }}>
        <button
          type="submit"
          className="px-5 py-2.5 bg-[#E65C00] text-white text-sm font-bold rounded-[8px] hover:bg-[#CC5000] transition-colors"
        >
          Run Migration Now
        </button>
      </form>
    </div>
  );
}
