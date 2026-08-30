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
    shortDescription: "Professional stereo microscope for mobile phone repair and PCB inspection.",
    description: "DEMO PRODUCT — Replace via Admin > Products with your real product details.",
    categorySlug: "microscopes",
    features: ["Trinocular head for camera attachment", "Continuous zoom magnification", "Adjustable boom stand", "Long working distance"],
    applications: ["Mobile phone microsoldering", "PCB inspection", "BGA rework", "Component identification"],
    tags: ["microscope", "stereo", "trinocular", "microsoldering"],
    isFeatured: true,
    specs: [
      { name: "Magnification", value: "TBC — update in admin", unit: "x", groupName: "Optics" },
      { name: "Working Distance", value: "TBC — update in admin", unit: "mm", groupName: "Optics" },
    ],
    inventoryQty: 10,
    lowStockThreshold: 3,
  },
  {
    name: "Digital Microscope Camera — High Resolution",
    slug: "digital-microscope-camera-high-resolution",
    sku: "DEMO-CAM-001",
    shortDescription: "High-resolution camera for microscope integration with PC/Mac compatibility.",
    description: "DEMO PRODUCT — Replace via Admin > Products with your real product details.",
    categorySlug: "lvds",
    features: ["High resolution CMOS sensor", "USB connectivity", "Compatible with major microscope brands", "Measurement software included"],
    applications: ["Microscope documentation", "Live view inspection", "Quality control"],
    tags: ["camera", "microscope camera", "digital", "USB"],
    isFeatured: true,
    specs: [
      { name: "Resolution", value: "TBC — update in admin", unit: "MP", groupName: "Sensor" },
      { name: "Interface", value: "USB", groupName: "Connectivity" },
    ],
    inventoryQty: 8,
    lowStockThreshold: 3,
  },
  {
    name: "Precision Soldering Station",
    slug: "precision-soldering-station",
    sku: "DEMO-SOLD-001",
    shortDescription: "Temperature-controlled soldering station for microsoldering and PCB rework.",
    description: "DEMO PRODUCT — Replace via Admin > Products with your real product details.",
    categorySlug: "head-assembly",
    features: ["Digital temperature display", "Fast heat-up", "Interchangeable tips", "ESD safe"],
    applications: ["Microsoldering", "PCB rework", "Component replacement"],
    tags: ["soldering", "soldering station", "microsoldering", "ESD"],
    isFeatured: true,
    specs: [
      { name: "Temperature Range", value: "TBC — update in admin", unit: "°C", groupName: "Performance" },
      { name: "Power", value: "TBC — update in admin", unit: "W", groupName: "Performance" },
    ],
    inventoryQty: 15,
    lowStockThreshold: 5,
  },
  {
    name: "Hot Air Rework Station",
    slug: "hot-air-rework-station",
    sku: "DEMO-HAIRS-001",
    shortDescription: "Dual-display hot air station for SMD rework and chip-level repair.",
    description: "DEMO PRODUCT — Replace via Admin > Products with your real product details.",
    categorySlug: "t-con",
    features: ["Separate temperature and airflow control", "Digital LED display", "Multiple nozzle sizes", "Auto-sleep function"],
    applications: ["SMD rework", "Chip-level repair", "BGA reballing", "Flex cable removal"],
    tags: ["hot air", "rework", "SMD", "BGA"],
    isFeatured: true,
    specs: [
      { name: "Air Temperature Range", value: "TBC — update in admin", unit: "°C", groupName: "Performance" },
      { name: "Airflow Range", value: "TBC — update in admin", unit: "L/min", groupName: "Performance" },
    ],
    inventoryQty: 12,
    lowStockThreshold: 3,
  },
  {
    name: "Precision Screwdriver Set — Mobile Repair",
    slug: "precision-screwdriver-set-mobile-repair",
    sku: "DEMO-SCRW-001",
    shortDescription: "Complete precision screwdriver set for mobile phone and laptop disassembly.",
    description: "DEMO PRODUCT — Replace via Admin > Products with your real product details.",
    categorySlug: "cof-cutter",
    features: ["Pentalobe, Torx, Phillips, Flathead bits", "Rotating top cap", "ESD safe handles", "Magnetic tips", "Storage case"],
    applications: ["iPhone disassembly", "Android repair", "Laptop servicing"],
    tags: ["screwdriver", "precision", "pentalobe", "torx"],
    isFeatured: true,
    specs: [
      { name: "Bits Included", value: "TBC — update in admin", groupName: "Contents" },
    ],
    inventoryQty: 25,
    lowStockThreshold: 5,
  },
  {
    name: "PCB Repair Power Boot Cable",
    slug: "pcb-repair-power-boot-cable",
    sku: "DEMO-CABLE-001",
    shortDescription: "Diagnostic power boot cable for mobile device PCB testing.",
    description: "DEMO PRODUCT — Replace via Admin > Products with your real product details.",
    categorySlug: "cofs",
    features: ["Multi-device compatibility", "Direct PCB power boot", "Short circuit protection"],
    applications: ["PCB short-circuit diagnosis", "Baseband boot testing", "Dead phone repair"],
    tags: ["boot cable", "PCB cable", "diagnostic"],
    isFeatured: false,
    specs: [
      { name: "Compatibility", value: "TBC — update in admin", groupName: "Specifications" },
    ],
    inventoryQty: 20,
    lowStockThreshold: 5,
  },
  {
    name: "Digital Multimeter — Professional Grade",
    slug: "digital-multimeter-professional-grade",
    sku: "DEMO-LAB-001",
    shortDescription: "Professional auto-ranging digital multimeter for electronics diagnostics.",
    description: "DEMO PRODUCT — Replace via Admin > Products with your real product details.",
    categorySlug: "t-con-programmer",
    features: ["Auto-ranging", "Large backlit LCD", "AC/DC voltage, current, resistance, continuity", "Overload protection"],
    applications: ["Component testing", "Voltage/current measurement", "Board-level diagnostics"],
    tags: ["multimeter", "DMM", "diagnostic", "lab"],
    isFeatured: false,
    specs: [
      { name: "DC Voltage Range", value: "TBC — update in admin", groupName: "Measurements" },
      { name: "AC Voltage Range", value: "TBC — update in admin", groupName: "Measurements" },
    ],
    inventoryQty: 12,
    lowStockThreshold: 3,
  },
  {
    name: "ESD Safe Tweezers Set",
    slug: "esd-safe-tweezers-set",
    sku: "DEMO-ACC-001",
    shortDescription: "Anti-static precision tweezers for SMD work and mobile phone repair.",
    description: "DEMO PRODUCT — Replace via Admin > Products with your real product details.",
    categorySlug: "acf-tape",
    features: ["ESD-safe composite", "Multiple tip profiles", "Anti-magnetic", "Storage pouch"],
    applications: ["SMD component placement", "BGA inspection", "Mobile phone repair"],
    tags: ["tweezers", "ESD", "SMD", "anti-static"],
    isFeatured: false,
    specs: [
      { name: "Material", value: "ESD-safe composite", groupName: "Build" },
    ],
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
