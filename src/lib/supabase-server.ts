/**
 * Server-side Supabase client using service_role key for Storage operations.
 * This client bypasses RLS and should ONLY be used in server-side code with proper auth checks.
 */

import { createClient } from "@supabase/supabase-js";

/**
 * Creates a Supabase client with service_role privileges for server-side operations.
 * NEVER expose this client or its key to the browser.
 */
export function createServerSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL
    ?.trim()
    .replace(/[\n\r]/g, "")
    .replace(/\s+/g, "");

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    ?.trim()
    .replace(/[\n\r]/g, "")
    .replace(/\s+/g, "");

  if (!supabaseUrl || !serviceRoleKey) {
    const missing = [];
    if (!supabaseUrl) missing.push("SUPABASE_URL");
    if (!serviceRoleKey) missing.push("SUPABASE_SERVICE_ROLE_KEY");

    throw new Error(
      `Missing environment variable(s): ${missing.join(", ")}`
    );
  }

  try {
    const url = new URL(supabaseUrl);

    if (url.protocol !== "https:") {
      throw new Error("SUPABASE_URL must use https://");
    }

    if (!url.hostname.includes("supabase.co")) {
      throw new Error("SUPABASE_URL must be a valid Supabase URL");
    }
  } catch (err) {
    throw new Error(
      `Invalid SUPABASE_URL: ${
        err instanceof Error ? err.message : String(err)
      }`
    );
  }

  if (!serviceRoleKey.startsWith("eyJ")) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY must be a valid JWT token"
    );
  }

  const parts = serviceRoleKey.split(".");

  if (parts.length !== 3) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY must be a valid JWT with 3 parts"
    );
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
