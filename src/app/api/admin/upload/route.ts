import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
  // Top-level catch: Next.js returns an empty response body for unhandled route
  // handler exceptions. Every code path MUST return a JSON response so the
  // client's res.json() call never receives an empty body.
  try {
    // ── Auth ──────────────────────────────────────────────────────────────────
    let session;
    try {
      session = await auth();
    } catch (authErr) {
      console.error("[upload] auth() threw:", authErr);
      return NextResponse.json({ success: false, error: "Authentication error" }, { status: 500 });
    }

    if (!session) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    if ((session as { user?: { role?: string } }).user?.role !== "ADMIN") {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    // ── Storage configuration ─────────────────────────────────────────────────
    const supabaseUrl = (process.env.SUPABASE_URL ?? "").replace(/\/$/, ""); // strip trailing slash
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !serviceRoleKey) {
      console.error("[upload] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
      return NextResponse.json({ success: false, error: "Storage not configured" }, { status: 500 });
    }

    // ── Parse multipart body ──────────────────────────────────────────────────
    let formData: FormData;
    try {
      formData = await request.formData();
    } catch (parseErr) {
      console.error("[upload] formData parse error:", parseErr);
      return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 });
    }

    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ success: false, error: "Only image files are allowed" }, { status: 400 });
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ success: false, error: "File too large (max 5 MB)" }, { status: 413 });
    }

    // ── Read file bytes ───────────────────────────────────────────────────────
    let bytes: ArrayBuffer;
    try {
      bytes = await file.arrayBuffer();
    } catch (readErr) {
      console.error("[upload] arrayBuffer error:", readErr);
      return NextResponse.json({ success: false, error: "Failed to read file" }, { status: 500 });
    }

    // ── Build storage path ────────────────────────────────────────────────────
    const ext = (file.name.split(".").pop() ?? "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const storagePath = `products/${filename}`;

    // ── Ensure bucket exists (create if missing) ──────────────────────────────
    try {
      const bucketCheck = await fetch(`${supabaseUrl}/storage/v1/bucket/product-images`, {
        method: "GET",
        headers: { Authorization: `Bearer ${serviceRoleKey}` },
      });
      if (bucketCheck.status === 400 || bucketCheck.status === 404) {
        // Bucket missing — create it as public
        const createRes = await fetch(`${supabaseUrl}/storage/v1/bucket`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${serviceRoleKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: "product-images", name: "product-images", public: true }),
        });
        if (!createRes.ok) {
          const createErr = await createRes.text().catch(() => "");
          console.error("[upload] bucket create failed:", createRes.status, createErr);
          return NextResponse.json({ success: false, error: "Storage bucket could not be created" }, { status: 500 });
        }
        console.log("[upload] Created product-images bucket");
      }
    } catch (bucketErr) {
      // Non-fatal: bucket check failed, proceed anyway and let upload fail if needed
      console.error("[upload] bucket check error:", bucketErr);
    }

    // ── Upload to Supabase Storage ────────────────────────────────────────────
    let uploadRes: Response;
    try {
      uploadRes = await fetch(
        `${supabaseUrl}/storage/v1/object/product-images/${storagePath}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${serviceRoleKey}`,
            "Content-Type": file.type,
            "x-upsert": "true",
          },
          body: bytes,
        }
      );
    } catch (fetchErr) {
      // Network error, DNS failure, or Supabase unreachable
      console.error("[upload] Supabase fetch threw:", fetchErr);
      return NextResponse.json(
        { success: false, error: "Storage unreachable — check SUPABASE_URL" },
        { status: 502 }
      );
    }

    if (!uploadRes.ok) {
      const errText = await uploadRes.text().catch(() => String(uploadRes.status));
      console.error("[upload] Supabase upload failed:", uploadRes.status, errText);
      return NextResponse.json(
        { success: false, error: `Storage upload failed (${uploadRes.status})` },
        { status: 500 }
      );
    }

    // ── Return public URL ─────────────────────────────────────────────────────
    const publicUrl = `${supabaseUrl}/storage/v1/object/public/product-images/${storagePath}`;
    return NextResponse.json({ success: true, url: publicUrl, path: storagePath });

  } catch (unexpected) {
    // Safety net: if anything slips through, always return JSON
    console.error("[upload] Unexpected error:", unexpected);
    return NextResponse.json({ success: false, error: "An unexpected server error occurred" }, { status: 500 });
  }
}
