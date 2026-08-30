import { NextResponse } from "next/server";
import { auth } from "@/auth";

/**
 * Diagnostic endpoint — ADMIN only.
 * Verifies SUPABASE_URL format, key structure, bucket existence, and upload.
 * Does NOT create or modify any bucket. Never exposes credential values.
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

  // Always trim — copy-paste into Vercel can add trailing newlines/spaces that
  // corrupt JWT auth and cause "JWS Protected Header is invalid".
  const rawUrl = (process.env.SUPABASE_URL ?? "").trim();
  const rawKey = (process.env.SUPABASE_SERVICE_ROLE_KEY ?? "").trim();

  // ── 1. Env var presence ───────────────────────────────────────────────────
  const urlSet = rawUrl.length > 0;
  const keySet = rawKey.length > 0;

  // ── 2. URL format ─────────────────────────────────────────────────────────
  let urlValid = false;
  let urlScheme = "";
  let urlHost = "";
  let urlFormatError: string | null = null;
  if (rawUrl) {
    try {
      const parsed = new URL(rawUrl);
      urlScheme = parsed.protocol;
      urlHost = parsed.hostname;
      urlValid = parsed.protocol === "https:";
      if (!urlValid) urlFormatError = `Protocol must be https: (got ${parsed.protocol})`;
    } catch (e) {
      urlFormatError = e instanceof Error ? e.message : String(e);
    }
  } else {
    urlFormatError = "SUPABASE_URL is not set";
  }

  // ── 3. Key structure (JWT sanity check — never expose value) ─────────────
  // A valid Supabase service-role key is a JWT: three base64url segments
  // separated by dots, first segment decodes to {"alg":"HS256","typ":"JWT"}.
  // "JWS Protected Header is invalid" means Supabase couldn't parse the JWT —
  // usually caused by whitespace/newline around the key (copy-paste artifact).
  let keyStructure: {
    length: number;
    hasWhitespace: boolean;
    rawLength: number;
    startsWithEyJ: boolean;
    partCount: number;
    headerDecodable: boolean;
    headerAlg: string | null;
    verdict: string;
  } | null = null;

  if (keySet) {
    const raw = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
    const trimmed = raw.trim();
    const parts = trimmed.split(".");
    let headerAlg: string | null = null;
    let headerDecodable = false;
    try {
      const headerJson = Buffer.from(parts[0] ?? "", "base64url").toString("utf8");
      const header = JSON.parse(headerJson) as { alg?: string; typ?: string };
      headerAlg = header.alg ?? null;
      headerDecodable = true;
    } catch {
      // not decodable
    }

    const verdict =
      raw !== trimmed
        ? "INVALID — key has leading/trailing whitespace or newlines (copy-paste artifact). Re-enter in Vercel without surrounding spaces."
        : !trimmed.startsWith("eyJ")
        ? "SUSPICIOUS — does not start with eyJ (expected for a Supabase JWT service-role key)"
        : parts.length !== 3
        ? `INVALID — expected 3 JWT segments separated by dots, got ${parts.length}`
        : !headerDecodable
        ? "INVALID — JWT header is not valid base64url JSON"
        : headerAlg !== "HS256"
        ? `SUSPICIOUS — JWT header alg is '${headerAlg}', expected 'HS256'`
        : "OK — key has valid JWT structure";

    keyStructure = {
      length: trimmed.length,
      hasWhitespace: raw !== trimmed,
      rawLength: raw.length,
      startsWithEyJ: trimmed.startsWith("eyJ"),
      partCount: parts.length,
      headerDecodable,
      headerAlg,
      verdict,
    };
  }

  if (!urlValid || !keySet) {
    return NextResponse.json({
      env: { urlSet, keySet },
      url: { valid: urlValid, scheme: urlScheme, host: urlHost, formatError: urlFormatError },
      key: keyStructure,
      bucket: null,
      uploadTest: null,
    });
  }

  const supabaseUrl = rawUrl.replace(/\/$/, "");

  // ── 4. Bucket check ───────────────────────────────────────────────────────
  let bucketStatus: number | null = null;
  let bucketExists = false;
  let bucketPublic: boolean | null = null;
  let bucketError: string | null = null;
  try {
    const res = await fetch(`${supabaseUrl}/storage/v1/bucket/product-images`, {
      method: "GET",
      headers: { Authorization: `Bearer ${rawKey}` },
    });
    bucketStatus = res.status;
    if (res.ok) {
      bucketExists = true;
      const body = await res.json().catch(() => null) as { public?: boolean } | null;
      bucketPublic = body?.public ?? null;
    } else {
      const text = await res.text().catch(() => "");
      bucketError = `HTTP ${res.status}: ${text.slice(0, 300)}`;
    }
  } catch (e) {
    bucketError = e instanceof Error ? e.message : String(e);
  }

  // ── 5. Test upload (1×1 transparent PNG, deleted after) ──────────────────
  let uploadStatus: number | null = null;
  let uploadOk = false;
  let uploadError: string | null = null;
  let uploadPublicUrlReachable = false;

  if (bucketExists) {
    const testPng = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
      "base64"
    );
    const testPath = `products/_diagnostic_${Date.now()}.png`;
    try {
      const up = await fetch(`${supabaseUrl}/storage/v1/object/product-images/${testPath}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${rawKey}`,
          "Content-Type": "image/png",
          "x-upsert": "true",
        },
        body: testPng,
      });
      uploadStatus = up.status;
      uploadOk = up.ok;
      if (!up.ok) {
        const text = await up.text().catch(() => "");
        uploadError = `HTTP ${up.status}: ${text.slice(0, 300)}`;
      } else {
        const pubUrl = `${supabaseUrl}/storage/v1/object/public/product-images/${testPath}`;
        try {
          const check = await fetch(pubUrl, { method: "HEAD" });
          uploadPublicUrlReachable = check.ok;
        } catch {
          uploadPublicUrlReachable = false;
        }
        // Clean up
        await fetch(`${supabaseUrl}/storage/v1/object/product-images/${testPath}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${rawKey}` },
        }).catch(() => null);
      }
    } catch (e) {
      uploadError = e instanceof Error ? e.message : String(e);
    }
  }

  return NextResponse.json({
    env: { urlSet, keySet },
    url: { valid: urlValid, scheme: urlScheme, host: urlHost, formatError: urlFormatError },
    key: keyStructure,
    bucket: { status: bucketStatus, exists: bucketExists, isPublic: bucketPublic, error: bucketError },
    uploadTest: { status: uploadStatus, ok: uploadOk, publicUrlReachable: uploadPublicUrlReachable, error: uploadError },
  });
}
