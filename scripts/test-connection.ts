import postgres from "postgres";

const rawUrl = process.env.DATABASE_URL;
if (!rawUrl) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

// Parse the URL and decode each component individually so special
// characters in the password ([ ] @ etc.) are not misinterpreted.
const parsed = new URL(rawUrl);
const host = parsed.hostname;
const port = Number(parsed.port) || 5432;
const user = decodeURIComponent(parsed.username);
const password = decodeURIComponent(parsed.password);
const database = parsed.pathname.replace(/^\//, "");

console.log(`Connecting to ${host}:${port} as "${user}" …`);

const sql = postgres({
  host,
  port,
  user,
  password,
  database,
  ssl: "require",
  max: 1,
});

async function main() {
  const [{ version }] = await sql`SELECT version()`;
  console.log("Connection OK:", version.split(" ").slice(0, 2).join(" "));
  await sql.end();
}

main().catch((e) => {
  console.error("Connection failed:", e.message);
  process.exit(1);
});
