"use server";

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/db";
import { categories, products } from "@/db/schema";
import { inArray, notInArray } from "drizzle-orm";

const NEW_CATEGORIES = [
  { name: "COFS",            slug: "cofs",            sortOrder: 1  },
  { name: "LVDS",            slug: "lvds",            sortOrder: 2  },
  { name: "LED & LCD BOARDS",slug: "led-lcd-boards",  sortOrder: 3  },
  { name: "T-CON",           slug: "t-con",           sortOrder: 4  },
  { name: "SCALLER",         slug: "scaller",         sortOrder: 5  },
  { name: "QUARD",           slug: "quard",           sortOrder: 6  },
  { name: "FOAM",            slug: "foam",            sortOrder: 7  },
  { name: "T-CON PROGRAMMER",slug: "t-con-programmer",sortOrder: 8  },
  { name: "HEAD ASSEMBLY",   slug: "head-assembly",   sortOrder: 9  },
  { name: "ACF TAPE",        slug: "acf-tape",        sortOrder: 10 },
  { name: "ACF REMOVER",     slug: "acf-remover",     sortOrder: 11 },
  { name: "COF CUTTER",      slug: "cof-cutter",      sortOrder: 12 },
  { name: "TAPE",            slug: "tape",            sortOrder: 13 },
];

const KEEP_SLUGS = ["microscopes"];

export async function POST() {
  const session = await auth();
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!db) {
    return NextResponse.json({ error: "Database not configured" }, { status: 500 });
  }

  // 1. Find categories to delete (all except Microscopes)
  const toDelete = await db
    .select({ id: categories.id, name: categories.name })
    .from(categories)
    .where(notInArray(categories.slug, KEEP_SLUGS));

  const deleteIds = toDelete.map((c) => c.id);

  // 2. NULL out categoryId on any products referencing categories being deleted
  if (deleteIds.length > 0) {
    await db
      .update(products)
      .set({ categoryId: null })
      .where(inArray(products.categoryId, deleteIds));
  }

  // 3. Delete the old categories
  if (deleteIds.length > 0) {
    await db.delete(categories).where(inArray(categories.id, deleteIds));
  }

  // 4. Insert the 13 new categories (skip if slug already exists)
  const existing = await db.select({ slug: categories.slug }).from(categories);
  const existingSlugs = new Set(existing.map((c) => c.slug));

  const toInsert = NEW_CATEGORIES.filter((c) => !existingSlugs.has(c.slug));
  if (toInsert.length > 0) {
    await db.insert(categories).values(
      toInsert.map((c) => ({
        name: c.name,
        slug: c.slug,
        sortOrder: c.sortOrder,
        isActive: true,
        description: null,
      }))
    );
  }

  return NextResponse.json({
    ok: true,
    deleted: toDelete.map((c) => c.name),
    inserted: toInsert.map((c) => c.name),
    productsNulled: deleteIds.length,
  });
}
