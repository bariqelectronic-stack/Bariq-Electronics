// ─── Site configuration — single source of truth ──────────────────────────────
// All contact info, branding, and feature flags live here.
// Sensitive data (API keys, secrets) must stay in .env.local only.

export const siteConfig = {
  // ── Branding ───────────────────────────────────────────────────────────────
  name: "Bariq Electronics",
  tagline: "Professional LCD & LED Display Repair Parts",
  description:
    "Pakistan's source for professional LCD and LED display repair parts — COFS, LVDS, T-CON, ACF tape, COF cutters and display repair components.",

  // ── Contact ────────────────────────────────────────────────────────────────
  email: "bariqelectronic@gmail.com",
  phone: "0300 9445230",
  // Display number: as specified by owner — 03009445230 (no space, no +)
  whatsapp: "03009445230",
  // Used in wa.me links — international format, no + sign
  whatsappNumber: "923009445230",

  // ── Site URL ───────────────────────────────────────────────────────────────
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://bariqelectronics.com",

  // ── Commerce ───────────────────────────────────────────────────────────────
  currency: "PKR",
  currencySymbol: "Rs.",
  locale: "en-PK",

  // ── Social links (optional — empty string = hidden in footer) ───────────
  social: {
    whatsapp: "https://wa.me/923009445230",
    facebook:  process.env.NEXT_PUBLIC_FACEBOOK_URL  || "",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
    youtube:   process.env.NEXT_PUBLIC_YOUTUBE_URL   || "",
  },

  // ── Address (optional — empty strings are hidden in UI) ────────────────
  address: {
    line1:    process.env.NEXT_PUBLIC_ADDRESS_LINE1  || "",
    city:     process.env.NEXT_PUBLIC_ADDRESS_CITY   || "Karachi",
    province: "Sindh",
    country:  "Pakistan",
  },
} as const;

/**
 * Returns a WhatsApp deep-link.
 * Always resolves to https://wa.me/923009445230
 *
 * @param message  Optional pre-filled message text
 */
export function getWhatsAppLink(message?: string): string {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/**
 * Returns true if a given optional feature/integration is configured.
 * Use this to conditionally render UI elements that need external services.
 */
export const featureFlags = {
  emailEnabled:      !!(process.env.RESEND_API_KEY || process.env.EMAIL_SERVER_HOST),
  bankTransferEnabled: !!(process.env.BANK_ACCOUNT_NUMBER),
  codEnabled:        process.env.NEXT_PUBLIC_COD_ENABLED !== "false",
  jazzCashEnabled:   !!(process.env.JAZZCASH_MERCHANT_ID && process.env.JAZZCASH_PASSWORD),
  easyPaisaEnabled:  !!(process.env.EASYPAISA_STORE_ID  && process.env.EASYPAISA_HASH_KEY),
  stripeEnabled:     !!(process.env.STRIPE_SECRET_KEY),
  analyticsEnabled:  !!(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID),
} as const;
