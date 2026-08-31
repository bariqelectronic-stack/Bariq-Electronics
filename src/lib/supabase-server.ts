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
  const supabaseUrl = process.env.SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variable"
    );
  }

  // Validate URL format
  try {
    const url = new URL(supabaseUrl);
    if (url.protocol !== "https:") {
      throw new Error("SUPABASE_URL must use https://");
    }
  } catch (err) {
    throw new Error(
      `Invalid SUPABASE_URL: ${err instanceof Error ? err.message : String(err)}`
    );
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
