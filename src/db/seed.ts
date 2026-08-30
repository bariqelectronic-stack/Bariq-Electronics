/**
 * Database seed script for Bariq Electronics
 *
 * Creates:
 *  - 14 product categories
 *  - 8 demo products (isDemo = true, price = null — replace via admin)
 *  - Inventory records for each demo product
 *  - Default site settings
 *  - One admin user at admin@bariqelectronics.com
 *
 * Admin password behaviour:
 *  - If ADMIN_INITIAL_PASSWORD is set in the environment, that password is used.
 *  - Otherwise a secure random password is generated.
 *  - The password is printed ONCE to the terminal at seed time.
 *  - mustChangePassword is set to true — the admin must change it on first login.
 *  - The password is never written to files, logs, or the database in plaintext.
 *
 * Usage:
 *   DATABASE_URL="..." ADMIN_INITIAL_PASSWORD="YourChoice" npm run db:seed
 *   DATABASE_URL="..." npm run db:seed   # auto-generates password
 *
 * DEMO PRODUCTS:
 *  All products have isDemo = true and price = null.
 *  Replace them with your real products via /admin/products.
 *  Deleting a demo product in the admin will permanently remove it.
 */

import crypto from "crypto";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

// ─── Database connection ───────────────────────────────────────────────────────

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("");
  console.error("❌  DATABASE_URL is not set.");
  console.error("    Set it before running the seed:");
  console.error("    DATABASE_URL=\"postgresql://...\" npm run db:seed");
  console.error("");
  process.exit(1);
}

const client = postgres(DATABASE_URL, { max: 1 });
const db = drizzle(client, { schema });

// ─── Secure password helper ────────────────────────────────────────────────────

function generateSecurePassword(): string {
  // 20-char password: uppercase + lowercase + digits + symbols
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%^&*";
  return Array.from(crypto.randomBytes(20))
    .map((b) => chars[b % chars.length])
    .join("");
}

// ─── Categories ───────────────────────────────────────────────────────────────

const CATEGORIES = [
  { name: "Microscopes",        slug: "microscopes",       description: "Stereo and digital microscopes for display inspection.",                    sortOrder: 0  },
  { name: "COFS",               slug: "cofs",              description: "Chip-on-film connectors for LCD and display bonding.",                      sortOrder: 1  },
  { name: "LVDS",               slug: "lvds",              description: "LVDS cables and connectors for display signal transmission.",               sortOrder: 2  },
  { name: "LED & LCD BOARDS",   slug: "led-lcd-boards",    description: "LED driver boards and LCD display panels for TV repair.",                   sortOrder: 3  },
  { name: "T-CON",              slug: "t-con",             description: "Timing controller boards for LCD/LED panel signal processing.",             sortOrder: 4  },
  { name: "SCALLER",            slug: "scaller",           description: "Scaler boards and chips for display signal conversion.",                    sortOrder: 5  },
  { name: "QUARD",              slug: "quard",             description: "Quard display boards and components.",                                      sortOrder: 6  },
  { name: "FOAM",               slug: "foam",              description: "Foam padding and cushioning materials for display assembly.",               sortOrder: 7  },
  { name: "T-CON PROGRAMMER",   slug: "t-con-programmer",  description: "Programmer tools for flashing and repairing T-CON boards.",                sortOrder: 8  },
  { name: "HEAD ASSEMBLY",      slug: "head-assembly",     description: "Head assembly components for display bonding and repair.",                  sortOrder: 9  },
  { name: "ACF TAPE",           slug: "acf-tape",          description: "Anisotropic conductive film tape for COF bonding.",                        sortOrder: 10 },
  { name: "ACF REMOVER",        slug: "acf-remover",       description: "Chemical solutions for ACF residue removal from display panels.",          sortOrder: 11 },
  { name: "COF CUTTER",         slug: "cof-cutter",        description: "Precision cutters for chip-on-film trimming and preparation.",             sortOrder: 12 },
  { name: "TAPE",               slug: "tape",              description: "Adhesive tapes for display assembly and component securing.",              sortOrder: 13 },
] as const;

// ─── Demo products ─────────────────────────────────────────────────────────────

type DemoProduct = {
  name: string;
  slug: string;
  sku: string;
  shortDescription: string;
  description: string;
  categorySlug: string;
  features: string[];
  applications: string[];
  tags: string[];
  isFeatured: boolean;
  specs: { name: string; value: string; unit?: string; groupName: string }[];
  inventoryQty: number;
  lowStockThreshold: number;
};

const DEMO_PRODUCTS: DemoProduct[] = [
  {
    name: "Professional Trinocular Stereo Microscope",
    slug: "professional-trinocular-stereo-microscope",
    sku: "DEMO-MICRO-001",
    shortDescription: "Professional stereo microscope for display inspection and panel-level repair work.",
    description: "DEMO PRODUCT — Replace via Admin > Products with your real product details.",
    categorySlug: "cofs",
    features: ["Trinocular head for camera attachment", "Wide zoom range", "Adjustable stand", "Compatible with various camera systems"],
    applications: ["LCD panel inspection", "COF repair work", "Display component inspection", "Board-level diagnostics"],
    tags: ["microscope", "stereo", "trinocular", "display repair"],
    isFeatured: true,
    specs: [
      { name: "Magnification", value: "TBC — update in admin", unit: "x", groupName: "Optics" },
      { name: "Working Distance", value: "TBC — update in admin", unit: "mm", groupName: "Optics" },
    ],
    inventoryQty: 10,
    lowStockThreshold: 3,
  },
  {
    name: "LVDS Display Cable — High Resolution",
    slug: "lvds-display-cable-high-resolution",
    sku: "DEMO-LVDS-001",
    shortDescription: "LVDS cable for LCD and LED display signal connections and panel repair.",
    description: "DEMO PRODUCT — Replace via Admin > Products with your real product details.",
    categorySlug: "lvds",
    features: ["High-quality signal transmission", "Multiple connector options", "Compatible with leading display panels", "Reliable connection"],
    applications: ["LCD display repair", "LED panel repair", "Display board replacement", "Signal connection"],
    tags: ["LVDS", "display cable", "LCD", "LED"],
    isFeatured: true,
    specs: [
      { name: "Connector Type", value: "TBC — update in admin", groupName: "Connectivity" },
      { name: "Pin Count", value: "TBC — update in admin", groupName: "Connectivity" },
    ],
    inventoryQty: 8,
    lowStockThreshold: 3,
  },
  {
    name: "Head Assembly — Display Bonding",
    slug: "head-assembly-display-bonding",
    sku: "DEMO-HEAD-001",
    shortDescription: "Head assembly for professional COF bonding and display panel repair work.",
    description: "DEMO PRODUCT — Replace via Admin > Products with your real product details.",
    categorySlug: "head-assembly",
    features: ["Precision bonding head", "Compatible with standard bonding equipment", "Designed for display panel repair", "Professional grade"],
    applications: ["COF bonding", "ACF tape application", "Display panel repair", "Panel bonding work"],
    tags: ["head assembly", "bonding", "COF", "display repair"],
    isFeatured: true,
    specs: [
      { name: "Bonding Width", value: "TBC — update in admin", groupName: "Specifications" },
      { name: "Type", value: "TBC — update in admin", groupName: "Specifications" },
    ],
    inventoryQty: 15,
    lowStockThreshold: 5,
  },
  {
    name: "Precision COF Cutter",
    slug: "precision-cof-cutter",
    sku: "DEMO-COFC-001",
    shortDescription: "Precision cutter for COF chip-on-film trimming and display panel preparation.",
    description: "DEMO PRODUCT — Replace via Admin > Products with your real product details.",
    categorySlug: "cof-cutter",
    features: ["Precision cutting blade", "Designed for COF work", "Clean, accurate cuts", "Professional grade"],
    applications: ["COF cutting", "Display panel preparation", "LCD/LED panel repair", "COF bonding preparation"],
    tags: ["COF cutter", "precision cutter", "display repair", "COF"],
    isFeatured: true,
    specs: [
      { name: "Blade Type", value: "TBC — update in admin", groupName: "Specifications" },
    ],
    inventoryQty: 25,
    lowStockThreshold: 5,
  },
  {
    name: "COF Chip-on-Film Component",
    slug: "cof-chip-on-film-component",
    sku: "DEMO-COF-001",
    shortDescription: "COF chip-on-film component for LCD and LED display panel repair and bonding.",
    description: "DEMO PRODUCT — Replace via Admin > Products with your real product details.",
    categorySlug: "cofs",
    features: ["Compatible with display panel repair", "Professional grade COF", "For bonding applications"],
    applications: ["COF bonding", "Display panel repair", "LCD/LED repair"],
    tags: ["COF", "chip on film", "display repair"],
    isFeatured: false,
    specs: [
      { name: "Compatibility", value: "TBC — update in admin", groupName: "Specifications" },
    ],
    inventoryQty: 20,
    lowStockThreshold: 5,
  },
  {
    name: "ACF Remover Solution",
    slug: "acf-remover-solution",
    sku: "DEMO-ACFR-001",
    shortDescription: "Professional ACF remover for residue removal from LCD and LED display panels.",
    description: "DEMO PRODUCT — Replace via Admin > Products with your real product details.",
    categorySlug: "acf-remover",
    features: ["Effective ACF residue removal", "Safe for display panel substrates", "Professional grade formulation"],
    applications: ["ACF residue removal", "Display panel preparation", "COF repair preparation"],
    tags: ["ACF remover", "display repair", "panel repair"],
    isFeatured: false,
    specs: [],
    inventoryQty: 50,
    lowStockThreshold: 10,
  },
  {
    name: "T-CON Programmer Tool",
    slug: "t-con-programmer-tool",
    sku: "DEMO-TCP-001",
    shortDescription: "Professional T-CON programmer for flashing and repairing T-CON boards in LCD/LED displays.",
    description: "DEMO PRODUCT — Replace via Admin > Products with your real product details.",
    categorySlug: "t-con-programmer",
    features: ["Supports multiple T-CON board models", "Read and write firmware", "Board diagnostics"],
    applications: ["T-CON board programming", "Display repair", "Board-level diagnostics", "Firmware restoration"],
    tags: ["T-CON programmer", "display repair", "T-CON board"],
    isFeatured: false,
    specs: [
      { name: "Supported Boards", value: "TBC — update in admin", groupName: "Specifications" },
    ],
    inventoryQty: 12,
    lowStockThreshold: 3,
  },
  {
    name: "ACF Tape — Display Panel Bonding",
    slug: "acf-tape-display-panel-bonding",
    sku: "DEMO-ACFT-001",
    shortDescription: "Anisotropic conductive film tape for COF bonding and LCD/LED display panel repair.",
    description: "DEMO PRODUCT — Replace via Admin > Products with your real product details.",
    categorySlug: "acf-tape",
    features: ["Anisotropic conductive film", "For professional bonding applications", "Compatible with display panel substrates"],
    applications: ["COF bonding", "Display panel bonding", "LCD/LED panel repair"],
    tags: ["ACF tape", "bonding tape", "COF", "display repair"],
    isFeatured: false,
    specs: [],
    inventoryQty: 30,
    lowStockThreshold: 5,
  },
];

// ─── Site settings ─────────────────────────────────────────────────────────────

const SITE_SETTINGS = [
  { key: "site.name",            value: "Bariq Electronics",              group: "general", label: "Site Name" },
  { key: "site.tagline",         value: "Professional Repair Tools & Equipment", group: "general", label: "Tagline" },
  { key: "site.email",           value: "bariqelectronic@gmail.com",      group: "contact", label: "Contact Email" },
  { key: "site.phone",           value: "0300 9445230",                   group: "contact", label: "Phone" },
  { key: "site.whatsapp_number", value: "923009445230",                   group: "contact", label: "WhatsApp (country code, no +)" },
  { key: "site.currency",        value: "PKR",                            group: "commerce", label: "Currency" },
  { key: "site.address.city",    value: "Karachi",                        group: "contact", label: "City" },
  { key: "site.address.country", value: "Pakistan",                       group: "contact", label: "Country" },
  { key: "orders.cod_enabled",   value: "true",                           group: "commerce", label: "Cash on Delivery Enabled" },
] as const;

// ─── Main seed function ────────────────────────────────────────────────────────

async function seed() {
  console.log("");
  console.log("🌱  Bariq Electronics — Database Seed");
  console.log("─────────────────────────────────────");

  // 1. Categories
  console.log("\n📁  Seeding categories…");
  const categoryIdMap: Record<string, string> = {};
  for (const cat of CATEGORIES) {
    const [row] = await db
      .insert(schema.categories)
      .values({ name: cat.name, slug: cat.slug, description: cat.description, sortOrder: cat.sortOrder, isActive: true })
      .onConflictDoUpdate({
        target: schema.categories.slug,
        set: { name: cat.name, description: cat.description, sortOrder: cat.sortOrder },
      })
      .returning({ id: schema.categories.id, slug: schema.categories.slug });
    categoryIdMap[row.slug] = row.id;
    console.log(`   ✓ ${cat.name}`);
  }

  // 2. Demo products
  console.log("\n📦  Seeding demo products…");
  const { eq } = await import("drizzle-orm");
  for (const p of DEMO_PRODUCTS) {
    const categoryId = categoryIdMap[p.categorySlug];
    if (!categoryId) { console.warn(`   ⚠  Category "${p.categorySlug}" not found, skipping ${p.name}`); continue; }

    const [product] = await db
      .insert(schema.products)
      .values({
        name: p.name, slug: p.slug, sku: p.sku,
        description: p.description, shortDescription: p.shortDescription,
        categoryId, price: null, salePrice: null,
        status: "published", stockStatus: "in_stock",
        features: p.features, applications: p.applications,
        tags: p.tags, isFeatured: p.isFeatured, isDemo: true,
        images: [], compatibility: [], whatsIncluded: [],
      })
      .onConflictDoUpdate({
        target: schema.products.slug,
        set: { name: p.name, description: p.description, isDemo: true, updatedAt: new Date() },
      })
      .returning({ id: schema.products.id });

    if (p.specs.length > 0) {
      await db.delete(schema.productSpecs).where(eq(schema.productSpecs.productId, product.id));
      await db.insert(schema.productSpecs).values(
        p.specs.map((s, i) => ({ productId: product.id, name: s.name, value: s.value, unit: s.unit ?? null, sortOrder: i, groupName: s.groupName }))
      );
    }
    await db.insert(schema.inventory)
      .values({ productId: product.id, quantity: p.inventoryQty, reserved: 0, lowStockThreshold: p.lowStockThreshold })
      .onConflictDoUpdate({ target: schema.inventory.productId, set: { quantity: p.inventoryQty } });

    console.log(`   ✓ ${p.name} (DEMO — price: null)`);
  }

  // 3. Site settings
  console.log("\n⚙️   Seeding site settings…");
  for (const s of SITE_SETTINGS) {
    await db.insert(schema.siteSettings)
      .values({ key: s.key, value: s.value, group: s.group, label: s.label })
      .onConflictDoUpdate({ target: schema.siteSettings.key, set: { value: s.value, label: s.label } });
  }
  console.log("   ✓ Done");

  // 4. Admin user — secure password, never hardcoded
  console.log("\n👤  Setting up admin account…");
  const { hash } = await import("bcryptjs");

  const rawPassword = process.env.ADMIN_INITIAL_PASSWORD || generateSecurePassword();
  const passwordHash = await hash(rawPassword, 12);

  await db.insert(schema.users)
    .values({
      email: "admin@bariqelectronics.com",
      name: "Bariq Admin",
      role: "ADMIN",
      passwordHash,
      mustChangePassword: true, // forces password change on first login
    })
    .onConflictDoUpdate({
      target: schema.users.email,
      set: {
        role: "ADMIN",
        // Only update mustChangePassword if this is a re-seed of the exact default password
        mustChangePassword: !process.env.ADMIN_INITIAL_PASSWORD,
      },
    });

  // Print password ONCE to terminal only — never written to file or logs
  console.log("");
  console.log("  ┌─────────────────────────────────────────────────┐");
  console.log("  │  ADMIN CREDENTIALS — SAVE THESE NOW            │");
  console.log("  │                                                 │");
  console.log(`  │  Email:    admin@bariqelectronics.com           │`);
  console.log(`  │  Password: ${rawPassword.padEnd(37)} │`);
  console.log("  │                                                 │");
  console.log("  │  mustChangePassword = true                      │");
  console.log("  │  You will be prompted to change this on login.  │");
  console.log("  └─────────────────────────────────────────────────┘");
  console.log("");
  console.log("  ⚠  This password is printed here once and never stored in plaintext.");
  console.log("  ⚠  Change it immediately after first login.");
  console.log("");

  console.log("✅  Seed complete!");
  console.log("");
  console.log("Next steps:");
  console.log("  1. Log in at /admin and change your password.");
  console.log("  2. Add your real products at /admin/products.");
  console.log("  3. Archive or delete the DEMO products once real ones are added.");
  console.log("");
}

seed()
  .catch((err) => { console.error("❌  Seed failed:", err); process.exit(1); })
  .finally(() => client.end());
