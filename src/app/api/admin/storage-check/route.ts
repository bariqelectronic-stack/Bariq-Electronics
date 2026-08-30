import { NextResponse } from "next/server";
import { auth } from "@/auth";

/**
 * Diagnostic endpoint — ADMIN only.
 * Checks SUPABASE_URL format and storage connectivity without exposing secrets.
 * Remove or gate behind a feature flag once the issue is resolved.
 */
export async function GET() {
  // Auth check
  let session;
  try {
    session = await auth();
  } catch {
    return NextResponse.json({ error: "auth() threw" }, { status: 500 });
  }
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if ((session as { user?: { role?: string } }).user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const rawUrl = process.env.SUPABASE_URL ?? "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

  // 1. Env var presence
  const urlSet = rawUrl.length > 0;
  const keySet = serviceRoleKey.length > 0;

  // 2. URL format validation (never expose full URL — only scheme+host)
  let urlValid = false;
  let urlScheme = "";
  let urlHost = "";
  let urlFormatError = "";
  try {
    if (!rawUrl) throw new Error("SUPABASE_URL is empty");
    const parsed = new URL(rawUrl);
    urlScheme = parsed.protocol; // "https:" or "http:"
    urlHost = parsed.hostname;   // e.g. "xyzabc.supabase.co"
    urlValid = parsed.protocol === "https:";
    if (!urlValid) urlFormatError = `Protocol is '${parsed.protocol}' — must be 'https:'`;
  } catch (e) {
    urlFormatError = e instanceof Error ? e.message : String(e);
  }

  // 3. Connectivity — try GET /storage/v1/bucket/product-images
  let connectStatus: number | null = null;
  let connectError: string | null = null;
  let bucketExists = false;
  let bucketPublic: boolean | null = null;

  if (urlValid && keySet) {
    const supabaseUrl = rawUrl.replace(/\/$/, "");
    try {
      const res = await fetch(`${supabaseUrl}/storage/v1/bucket/product-images`, {
        method: "GET",
        headers: { Authorization: `Bearer ${serviceRoleKey}` },
      });
      connectStatus = res.status;
      if (res.ok) {
        bucketExists = true;
        const body = await res.json().catch(() => null);
        bucketPublic = body?.public ?? null;
      } else if (res.status === 404 || res.status === 400) {
        bucketExists = false;
        connectError = `Bucket not found (${res.status})`;
      } else {
        const text = await res.text().catch(() => "");
        connectError = `HTTP ${res.status}: ${text.slice(0, 200)}`;
      }
    } catch (e) {
      connectError = e instanceof Error ? e.message : String(e);
    }
  }

  // 4. Lightweight health check — GET /storage/v1/
  let healthStatus: number | null = null;
  let healthError: string | null = null;
  if (urlValid) {
    const supabaseUrl = rawUrl.replace(/\/$/, "");
    try {
      const res = await fetch(`${supabaseUrl}/storage/v1/`, {
        method: "GET",
        headers: { Authorization: `Bearer ${serviceRoleKey}` },
      });
      healthStatus = res.status;
    } catch (e) {
      healthError = e instanceof Error ? e.message : String(e);
    }
  }

  return NextResponse.json({
    env: { urlSet, keySet },
    url: { valid: urlValid, scheme: urlScheme, host: urlHost, formatError: urlFormatError || null },
    health: { status: healthStatus, error: healthError },
    bucket: { status: connectStatus, exists: bucketExists, isPublic: bucketPublic, error: connectError },
  });
}
