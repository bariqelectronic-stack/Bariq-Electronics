import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number | string | null | undefined, currency = "PKR"): string {
  if (amount === null || amount === undefined) return "Contact for price";
  const num = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(num)) return "Contact for price";
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function generateOrderNumber(): string {
  const prefix = "BRQ";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

export function calculateDiscount(price: number, salePrice: number): number {
  if (salePrice >= price) return 0;
  return Math.round(((price - salePrice) / price) * 100);
}

export function getStockStatus(quantity: number, threshold = 5): {
  label: string;
  color: string;
  inStock: boolean;
} {
  if (quantity <= 0) return { label: "Out of Stock", color: "error", inStock: false };
  if (quantity <= threshold) return { label: "Low Stock", color: "warning", inStock: true };
  return { label: "In Stock", color: "success", inStock: true };
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
