import postgres from "postgres";

const rawUrl = process.env.DATABASE_URL!;
const parsed = new URL(rawUrl);
const sql = postgres({
  host: parsed.hostname,
  port: Number(parsed.port),
  user: decodeURIComponent(parsed.username),
  password: decodeURIComponent(parsed.password),
  database: parsed.pathname.replace(/^\//, ""),
  ssl: "require",
  max: 1,
});

async function main() {
  // 1. List all tables
  const tables = await sql<{ tablename: string }[]>`
    SELECT tablename FROM pg_tables
    WHERE schemaname = 'public'
    ORDER BY tablename
  `;
  console.log(`\nTables in database (${tables.length} total):`);
  tables.forEach((t) => console.log(`  ${t.tablename}`));

  // 2. Check expected tables
  const expected = [
    "users", "accounts", "sessions", "verification_tokens",
    "categories", "products", "product_images", "product_specs",
    "orders", "order_items",
    "cart_items",
    "wishlists",
    "reviews",
    "addresses",
    "wholesale_enquiries",
    "contact_messages",
    "blog_posts",
    "pages",
  ];
  const found = new Set(tables.map((t) => t.tablename));
  const missing = expected.filter((t) => !found.has(t));

  if (missing.length === 0) {
    console.log("\nAll expected tables present.");
  } else {
    console.log(`\nMissing tables (${missing.length}):`);
    missing.forEach((t) => console.log(`  MISSING: ${t}`));
  }

  // 3. Row counts for key tables
  const checks = ["users", "categories", "products", "orders", "cart_items", "wholesale_enquiries"];
  console.log("\nRow counts:");
  for (const table of checks) {
    if (found.has(table)) {
      const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM ${sql(table)}`;
      console.log(`  ${table}: ${count} rows`);
    } else {
      console.log(`  ${table}: TABLE NOT FOUND`);
    }
  }

  await sql.end();
}

main().catch((e) => {
  console.error("Error:", e.message);
  process.exit(1);
});
