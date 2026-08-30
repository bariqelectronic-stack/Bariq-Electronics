/**
 * Payment provider abstraction for Bariq Electronics.
 *
 * Payment methods and their activation requirements:
 *
 *  Method            | Env vars required to activate
 *  ─────────────────────────────────────────────────────────────
 *  Bank Transfer     | BANK_ACCOUNT_NUMBER (+ BANK_NAME, BANK_IBAN optional)
 *  Cash on Delivery  | Enabled by default; set NEXT_PUBLIC_COD_ENABLED=false to disable
 *  JazzCash          | JAZZCASH_MERCHANT_ID + JAZZCASH_PASSWORD + JAZZCASH_INTEGRITY_SALT
 *  EasyPaisa         | EASYPAISA_STORE_ID + EASYPAISA_HASH_KEY
 *  Stripe            | STRIPE_SECRET_KEY + STRIPE_PUBLISHABLE_KEY
 *
 * If the required vars are not set, the method is hidden from checkout silently.
 * No crash, no error — the method simply does not appear.
 *
 * WhatsApp-arranged payment is always available as a fallback.
 */

// ─── Types ─────────────────────────────────────────────────────────────────────

export type PaymentMethodId =
  | "bank_transfer"
  | "cod"
  | "jazzcash"
  | "easypaisa"
  | "stripe";

export interface PaymentMethod {
  id: PaymentMethodId;
  label: string;
  description: string;
  icon: string; // emoji or icon name
  available: boolean;
  requiresRedirect: boolean;
}

export interface PaymentIntent {
  provider: PaymentMethodId;
  orderId: string;
  amount: number; // in PKR
  currency: "PKR";
  customerEmail: string;
  customerPhone?: string;
  description?: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  redirectUrl?: string; // for JazzCash / EasyPaisa redirect flows
  error?: string;
  raw?: unknown;
}

// ─── Provider availability ─────────────────────────────────────────────────────

/**
 * Returns the list of payment methods available in the current environment.
 * Only providers with their required env vars are marked available.
 */
export function getAvailablePaymentMethods(): PaymentMethod[] {
  return [
    {
      id: "bank_transfer",
      label: "Bank Transfer",
      description: "Transfer to our bank account. Account details provided after ordering.",
      icon: "🏦",
      // Disabled until BANK_ACCOUNT_NUMBER is configured in .env.local
      available: !!(process.env.BANK_ACCOUNT_NUMBER),
      requiresRedirect: false,
    },
    {
      id: "cod",
      label: "Cash on Delivery",
      description: "Pay cash when your order is delivered. Available in select areas.",
      icon: "💵",
      available: process.env.NEXT_PUBLIC_COD_ENABLED !== "false",
      requiresRedirect: false,
    },
    {
      id: "jazzcash",
      label: "JazzCash",
      description: "Pay securely using your JazzCash mobile account.",
      icon: "📱",
      available: !!(
        process.env.JAZZCASH_MERCHANT_ID &&
        process.env.JAZZCASH_PASSWORD &&
        process.env.JAZZCASH_INTEGRITY_SALT
      ),
      requiresRedirect: true,
    },
    {
      id: "easypaisa",
      label: "EasyPaisa",
      description: "Pay securely using your EasyPaisa mobile account.",
      icon: "📲",
      available: !!(
        process.env.EASYPAISA_STORE_ID &&
        process.env.EASYPAISA_HASH_KEY
      ),
      requiresRedirect: true,
    },
    {
      id: "stripe",
      label: "Card (Visa / Mastercard)",
      description: "International credit and debit cards via Stripe.",
      icon: "💳",
      available: !!(
        process.env.STRIPE_SECRET_KEY &&
        process.env.STRIPE_PUBLISHABLE_KEY
      ),
      requiresRedirect: false,
    },
  ];
}

// ─── Payment processing ────────────────────────────────────────────────────────

/**
 * Initiate a payment for an order.
 * Returns a PaymentResult — for redirect providers (JazzCash, EasyPaisa),
 * use `result.redirectUrl` to send the customer to the payment page.
 */
export async function processPayment(intent: PaymentIntent): Promise<PaymentResult> {
  switch (intent.provider) {
    case "bank_transfer":
      return processBankTransfer(intent);
    case "cod":
      return processCOD(intent);
    case "jazzcash":
      return processJazzCash(intent);
    case "easypaisa":
      return processEasyPaisa(intent);
    case "stripe":
      return processStripe(intent);
    default:
      return { success: false, error: "Unknown payment provider" };
  }
}

// ─── Bank Transfer ─────────────────────────────────────────────────────────────

async function processBankTransfer(intent: PaymentIntent): Promise<PaymentResult> {
  if (!process.env.BANK_ACCOUNT_NUMBER) {
    return { success: false, error: "Bank Transfer is not configured. Add BANK_ACCOUNT_NUMBER to .env.local." };
  }
  // Manual flow — record intent, admin confirms after receiving transfer
  return { success: true, transactionId: `BT-${intent.orderId}` };
}

/**
 * Returns bank account details for display at checkout.
 * Returns null if bank transfer is not configured.
 */
export function getBankDetails(): {
  bankName: string;
  accountTitle: string;
  accountNumber: string;
  iban: string;
  branch: string;
} | null {
  const accountNumber = process.env.BANK_ACCOUNT_NUMBER;
  if (!accountNumber) return null;
  return {
    bankName:      process.env.BANK_NAME           || "",
    accountTitle:  process.env.BANK_ACCOUNT_TITLE  || "Bariq Electronics",
    accountNumber,
    iban:          process.env.BANK_IBAN           || "",
    branch:        process.env.BANK_BRANCH         || "",
  };
}

// ─── Cash on Delivery ──────────────────────────────────────────────────────────

async function processCOD(intent: PaymentIntent): Promise<PaymentResult> {
  console.log(`[payment] COD order confirmed: ${intent.orderId}`);
  return { success: true, transactionId: `COD-${intent.orderId}` };
}

// ─── JazzCash ─────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function processJazzCash(_intent: PaymentIntent): Promise<PaymentResult> {
  const merchantId   = process.env.JAZZCASH_MERCHANT_ID;
  const password     = process.env.JAZZCASH_PASSWORD;
  const integritySalt = process.env.JAZZCASH_INTEGRITY_SALT;

  if (!merchantId || !password || !integritySalt) {
    return { success: false, error: "JazzCash is not configured. Set JAZZCASH_MERCHANT_ID, JAZZCASH_PASSWORD, JAZZCASH_INTEGRITY_SALT in .env.local." };
  }

  // TODO: Implement JazzCash MIGS redirect or REST API call.
  // Docs: https://sandbox.jazzcash.com.pk/ApplicationAPI/API/
  console.warn("[payment] JazzCash integration placeholder — implement MIGS/REST call.");
  return {
    success: false,
    error: "JazzCash integration not yet implemented. Configure and implement in src/lib/payment.ts.",
  };
}

// ─── EasyPaisa ────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function processEasyPaisa(_intent: PaymentIntent): Promise<PaymentResult> {
  const storeId  = process.env.EASYPAISA_STORE_ID;
  const hashKey  = process.env.EASYPAISA_HASH_KEY;

  if (!storeId || !hashKey) {
    return { success: false, error: "EasyPaisa is not configured. Set EASYPAISA_STORE_ID, EASYPAISA_HASH_KEY in .env.local." };
  }

  // TODO: Implement EasyPaisa Order Creation API.
  // Docs: https://easypaisa.com.pk/techintegration/
  console.warn("[payment] EasyPaisa integration placeholder — implement API call.");
  return {
    success: false,
    error: "EasyPaisa integration not yet implemented. Configure and implement in src/lib/payment.ts.",
  };
}

// ─── Stripe ───────────────────────────────────────────────────────────────────

async function processStripe(intent: PaymentIntent): Promise<PaymentResult> {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    return { success: false, error: "Stripe is not configured. Set STRIPE_SECRET_KEY in .env.local." };
  }

  try {
    // Dynamic require so the stripe package is optional at build time.
    // Install with: npm install stripe
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const StripeLib = require("stripe") as { default: new (key: string, opts: { apiVersion: string }) => {
      paymentIntents: {
        create: (params: {
          amount: number;
          currency: string;
          metadata: Record<string, string>;
          description: string;
        }) => Promise<{ id: string; client_secret: string | null }>;
      };
    }};
    const stripe = new StripeLib.default(secretKey, { apiVersion: "2024-06-20" });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(intent.amount * 100), // Stripe uses smallest currency unit
      currency: "pkr",
      metadata: {
        orderId: intent.orderId,
        customerEmail: intent.customerEmail,
      },
      description: intent.description || `Bariq Electronics order ${intent.orderId}`,
    });

    return {
      success: true,
      transactionId: paymentIntent.id,
      raw: { clientSecret: paymentIntent.client_secret },
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { success: false, error: `Stripe error: ${msg}` };
  }
}
