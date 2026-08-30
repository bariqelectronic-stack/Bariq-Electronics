/**
 * Database client — Drizzle ORM over postgres.js
 *
 * `db` is null when DATABASE_URL is not configured so the app can run in
 * development without a database (demo-product mode).
 *
 * Usage in server components / API routes:
 *   import { db, isDbReady } from "@/db";
 *   if (!isDbReady || !db) return demoFallback();
 */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

type DrizzleDB = ReturnType<typeof drizzle<typeof schema>>;

function createDb(): DrizzleDB | null {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  const client = postgres(url, { max: 10 });
  return drizzle(client, { schema });
}

export const db: DrizzleDB | null = createDb();
export const isDbReady: boolean = db !== null;
export type DB = DrizzleDB;
export * from "./schema";
