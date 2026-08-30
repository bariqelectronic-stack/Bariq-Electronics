"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/db";
import { products, categories, inventory } from "@/db/schema";

// ── Auth guard ────────────────────────────────────────────────────────────────

async function requireAdmin() {
  const session = await auth();
  if (!session) redirect("/login");
  if (session.user?.role !== "ADMIN") redirect("/");
  return session;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function toSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ── Product actions ───────────────────────────────────────────────────────────

export async function getAdminProducts() {
  await requireAdmin();
  if (!db) return [];
  return db.query.products.findMany({
    with: { category: true },
    orderBy: (p, { desc }) => [desc(p.createdAt)],
  });
}

export async function createProduct(formData: FormData) {
  await requireAdmin();
  if (!db) throw new Error("Database not configured");

  const name = (formData.get("name") as string).trim();
  const sku = (formData.get("sku") as string | null)?.trim() || null;
  const description = (formData.get("description") as string | null)?.trim() || null;
  const shortDescription = (formData.get("shortDescription") as string | null)?.trim() || null;
  const price = (formData.get("price") as string | null)?.trim() || null;
  const salePrice = (formData.get("salePrice") as string | null)?.trim() || null;
  const categoryId = (formData.get("categoryId") as string | null)?.trim() || null;
  const status = (formData.get("status") as string) || "draft";
  const stockStatus = (formData.get("stockStatus") as string) || "in_stock";
  const quantity = parseInt((formData.get("quantity") as string) || "0", 10);
  const isFeatured = formData.get("isFeatured") === "true";

  if (!name) throw new Error("Product name is required");

  // Generate unique slug
  const baseSlug = toSlug(name);
  let slug = baseSlug;
  let attempt = 0;
  while (true) {
    const existing = await db.select({ id: products.id })
      .from(products)
      .where(eq(products.slug, slug))
      .limit(1);
    if (existing.length === 0) break;
    attempt++;
    slug = `${baseSlug}-${attempt}`;
  }

  const [product] = await db.insert(products).values({
    name,
    slug,
    sku: sku || null,
    description: description || null,
    shortDescription: shortDescription || null,
    price: price || null,
    salePrice: salePrice || null,
    categoryId: categoryId || null,
    status,
    stockStatus,
    isFeatured,
    tags: [],
    images: [],
    features: [],
    applications: [],
    compatibility: [],
    whatsIncluded: [],
  }).returning({ id: products.id, slug: products.slug });

  // Create inventory record
  await db.insert(inventory).values({
    productId: product.id,
    quantity: isNaN(quantity) ? 0 : quantity,
    reserved: 0,
  });

  revalidatePath("/admin/products");
  redirect(`/admin/products`);
}

export async function deleteProduct(id: string) {
  await requireAdmin();
  if (!db) throw new Error("Database not configured");
  await db.delete(products).where(eq(products.id, id));
  revalidatePath("/admin/products");
}

// ── Category actions ──────────────────────────────────────────────────────────

export async function getCategories() {
  if (!db) return [];
  return db.select().from(categories).orderBy(categories.sortOrder, categories.name);
}

export async function getAdminCategories() {
  await requireAdmin();
  return getCategories();
}

export async function createCategory(formData: FormData) {
  await requireAdmin();
  if (!db) throw new Error("Database not configured");

  const name = (formData.get("name") as string).trim();
  const description = (formData.get("description") as string | null)?.trim() || null;
  const sortOrder = parseInt((formData.get("sortOrder") as string) || "0", 10);

  if (!name) throw new Error("Category name is required");

  const baseSlug = toSlug(name);
  let slug = baseSlug;
  let attempt = 0;
  while (true) {
    const existing = await db.select({ id: categories.id })
      .from(categories)
      .where(eq(categories.slug, slug))
      .limit(1);
    if (existing.length === 0) break;
    attempt++;
    slug = `${baseSlug}-${attempt}`;
  }

  await db.insert(categories).values({
    name,
    slug,
    description: description || null,
    sortOrder: isNaN(sortOrder) ? 0 : sortOrder,
    isActive: true,
  });

  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function deleteCategory(id: string) {
  await requireAdmin();
  if (!db) throw new Error("Database not configured");
  await db.delete(categories).where(eq(categories.id, id));
  revalidatePath("/admin/categories");
}
