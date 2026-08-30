import { NextResponse } from "next/server";
import { auth } from "@/auth";

/**
 * Diagnostic endpoint — ADMIN only.
 * Verifies SUPABASE_URL format, bucket existence, and upload capability.
 * Does NOT create or modify any bucket.
 */
export async function GET() {
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

  // 2. URL format (reveal only scheme + host, never full URL or key)
  let urlValid = false;
  let urlScheme = "";
  let urlHost = "";
  let urlFormatError: string | null = null;
  try {
    if (!rawUrl) throw new Error("SUPABASE_URL is empty");
    const parsed = new URL(rawUrl);
    urlScheme = parsed.protocol;
    urlHost = parsed.hostname;
    urlValid = parsed.protocol === "https:";
    if (!urlValid) urlFormatError = `Protocol must be https: (got ${parsed.protocol})`;
  } catch (e) {
    urlFormatError = e instanceof Error ? e.message : String(e);
  }

  if (!urlValid || !keySet) {
    return NextResponse.json({
      env: { urlSet, keySet },
      url: { valid: urlValid, scheme: urlScheme, host: urlHost, formatError: urlFormatError },
      bucket: null,
      uploadTest: null,
    });
  }

  const supabaseUrl = rawUrl.replace(/\/$/, "");

  // 3. Check bucket exists
  let bucketStatus: number | null = null;
  let bucketExists = false;
  let bucketPublic: boolean | null = null;
  let bucketError: string | null = null;
  try {
    const res = await fetch(`${supabaseUrl}/storage/v1/bucket/product-images`, {
      method: "GET",
      headers: { Authorization: `Bearer ${serviceRoleKey}` },
    });
    bucketStatus = res.status;
    if (res.ok) {
      bucketExists = true;
      const body = await res.json().catch(() => null) as { public?: boolean } | null;
      bucketPublic = body?.public ?? null;
    } else {
      const text = await res.text().catch(() => "");
      bucketError = `HTTP ${res.status}: ${text.slice(0, 200)}`;
    }
  } catch (e) {
    bucketError = e instanceof Error ? e.message : String(e);
  }

  // 4. Test upload (1×1 transparent PNG, then delete it)
  let uploadStatus: number | null = null;
  let uploadOk = false;
  let uploadError: string | null = null;
  let uploadPublicUrlReachable = false;

  if (bucketExists) {
    // 1×1 transparent PNG (67 bytes)
    const testPng = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
      "base64"
    );
    const testPath = `products/_diagnostic_${Date.now()}.png`;
    try {
      const up = await fetch(`${supabaseUrl}/storage/v1/object/product-images/${testPath}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${serviceRoleKey}`,
          "Content-Type": "image/png",
          "x-upsert": "true",
        },
        body: testPng,
      });
      uploadStatus = up.status;
      uploadOk = up.ok;
      if (!up.ok) {
        const text = await up.text().catch(() => "");
        uploadError = `HTTP ${up.status}: ${text.slice(0, 200)}`;
      } else {
        // Verify public URL is reachable
        const pubUrl = `${supabaseUrl}/storage/v1/object/public/product-images/${testPath}`;
        try {
          const check = await fetch(pubUrl, { method: "HEAD" });
          uploadPublicUrlReachable = check.ok;
        } catch {
          uploadPublicUrlReachable = false;
        }
        // Clean up test file (best-effort)
        await fetch(`${supabaseUrl}/storage/v1/object/product-images/${testPath}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${serviceRoleKey}` },
        }).catch(() => null);
      }
    } catch (e) {
      uploadError = e instanceof Error ? e.message : String(e);
    }
  }

  return NextResponse.json({
    env: { urlSet, keySet },
    url: { valid: urlValid, scheme: urlScheme, host: urlHost, formatError: urlFormatError },
    bucket: { status: bucketStatus, exists: bucketExists, isPublic: bucketPublic, error: bucketError },
    uploadTest: { status: uploadStatus, ok: uploadOk, publicUrlReachable: uploadPublicUrlReachable, error: uploadError },
  });
}
