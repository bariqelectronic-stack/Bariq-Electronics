/**
 * Analytics abstraction layer for Bariq Electronics.
 *
 * Provides a unified API for tracking events across multiple providers
 * (Google Analytics 4, Meta Pixel). Each function is safe to call in any
 * environment — events are silently dropped if the provider is not configured.
 *
 * Setup:
 *   1. Add your IDs to .env.local:
 *      NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 *      NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXXXXXXXXX
 *   2. Add the <Analytics /> component to your root layout (see below).
 *   3. Call track*() helpers from client components or event handlers.
 *
 * Layout usage:
 *   import { Analytics } from "@/lib/analytics";
 *   // In your layout.tsx <body>:
 *   <Analytics />
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ProductEventData {
  id: string;
  name: string;
  category?: string;
  brand?: string;
  sku?: string;
}

export interface AddToCartEventData extends ProductEventData {
  quantity: number;
}

export interface PurchaseEventData {
  orderId: string;
  items: ProductEventData[];
  value?: number;
  currency?: string;
}

// ---------------------------------------------------------------------------
// GA4 helpers
// ---------------------------------------------------------------------------

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function gtag(...args: unknown[]) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag(...args);
  }
}

function fbq(...args: unknown[]) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq(...args);
  }
}

// ---------------------------------------------------------------------------
// Pageview
// ---------------------------------------------------------------------------

export function trackPageView(url: string) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (gaId) {
    gtag("config", gaId, { page_path: url });
  }
  fbq("track", "PageView");
}

// ---------------------------------------------------------------------------
// Product events
// ---------------------------------------------------------------------------

export function trackViewProduct(product: ProductEventData) {
  // GA4
  gtag("event", "view_item", {
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        item_brand: product.brand,
      },
    ],
  });

  // Meta
  fbq("track", "ViewContent", {
    content_ids: [product.id],
    content_name: product.name,
    content_type: "product",
  });
}

export function trackAddToCart(data: AddToCartEventData) {
  gtag("event", "add_to_cart", {
    items: [
      {
        item_id: data.id,
        item_name: data.name,
        item_category: data.category,
        item_brand: data.brand,
        quantity: data.quantity,
      },
    ],
  });

  fbq("track", "AddToCart", {
    content_ids: [data.id],
    content_name: data.name,
    content_type: "product",
    quantity: data.quantity,
  });
}

export function trackRemoveFromCart(product: ProductEventData) {
  gtag("event", "remove_from_cart", {
    items: [
      {
        item_id: product.id,
        item_name: product.name,
      },
    ],
  });
}

export function trackAddToWishlist(product: ProductEventData) {
  gtag("event", "add_to_wishlist", {
    items: [{ item_id: product.id, item_name: product.name }],
  });

  fbq("track", "AddToWishlist", {
    content_ids: [product.id],
    content_name: product.name,
  });
}

export function trackSearch(searchTerm: string) {
  gtag("event", "search", { search_term: searchTerm });
  fbq("track", "Search", { search_string: searchTerm });
}

// ---------------------------------------------------------------------------
// Checkout funnel
// ---------------------------------------------------------------------------

export function trackBeginCheckout() {
  gtag("event", "begin_checkout");
  fbq("track", "InitiateCheckout");
}

export function trackPurchase(data: PurchaseEventData) {
  gtag("event", "purchase", {
    transaction_id: data.orderId,
    currency: data.currency ?? "PKR",
    value: data.value ?? 0,
    items: data.items.map((p) => ({
      item_id: p.id,
      item_name: p.name,
      item_category: p.category,
    })),
  });

  fbq("track", "Purchase", {
    currency: data.currency ?? "PKR",
    value: data.value ?? 0,
    content_ids: data.items.map((p) => p.id),
    content_type: "product",
    order_id: data.orderId,
  });
}

// ---------------------------------------------------------------------------
// Lead / enquiry events
// ---------------------------------------------------------------------------

export function trackWhatsAppClick(context: string) {
  gtag("event", "whatsapp_click", { context });
  fbq("track", "Contact", { method: "whatsapp", context });
}

export function trackContactFormSubmit() {
  gtag("event", "contact_form_submit");
  fbq("track", "Lead", { source: "contact_form" });
}

export function trackWholesaleEnquiry() {
  gtag("event", "wholesale_enquiry");
  fbq("track", "Lead", { source: "wholesale_form" });
}

// Analytics script component lives in src/components/analytics.tsx (requires .tsx for JSX).
