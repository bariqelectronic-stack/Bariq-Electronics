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
    // .trim() is critical: copy-pasting into Vercel can introduce trailing
    // newlines or spaces that corrupt the JWT and cause "JWS Protected Header
    // is invalid" from Supabase Storage.
    const supabaseUrl = (process.env.SUPABASE_URL ?? "").trim().replace(/\/$/, "");
    const serviceRoleKey = (process.env.SUPABASE_SERVICE_ROLE_KEY ?? "").trim();

    if (!supabaseUrl || !serviceRoleKey) {
      console.error("[upload] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
      return NextResponse.json({ success: false, error: "Storage not configured" }, { status: 500 });
    }

    // Validate URL format — must be https:// or fetch() will throw
    try {
      const parsed = new URL(supabaseUrl);
      if (parsed.protocol !== "https:") {
        console.error("[upload] SUPABASE_URL wrong protocol:", parsed.protocol);
        return NextResponse.json(
          { success: false, error: `Storage configuration error: SUPABASE_URL must start with https:// (got ${parsed.protocol}//)` },
          { status: 500 }
        );
      }
    } catch {
      console.error("[upload] SUPABASE_URL is not a valid URL");
      return NextResponse.json(
        { success: false, error: "Storage configuration error: SUPABASE_URL is not a valid URL — it must be https://<project>.supabase.co" },
        { status: 500 }
      );
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

    // ── Upload directly to the existing product-images bucket ─────────────────
    // The bucket must already exist in Supabase Storage and be set to Public.
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
      const msg = fetchErr instanceof Error ? fetchErr.message : String(fetchErr);
      console.error("[upload] Supabase fetch threw:", fetchErr);
      if (msg.toLowerCase().includes("invalid url") || msg.toLowerCase().includes("failed to parse")) {
        return NextResponse.json(
          { success: false, error: "Storage configuration error: SUPABASE_URL is not a valid URL" },
          { status: 500 }
        );
      }
      return NextResponse.json(
        { success: false, error: `Storage unreachable (${msg}). Check that your Supabase project is not paused.` },
        { status: 502 }
      );
    }

    if (!uploadRes.ok) {
      const errText = await uploadRes.text().catch(() => "");
      console.error("[upload] Supabase upload failed:", uploadRes.status, errText);

      let detail = `HTTP ${uploadRes.status}`;
      try {
        const errJson = JSON.parse(errText) as { message?: string; error?: string };
        detail = errJson.message ?? errJson.error ?? detail;
      } catch {
        if (errText) detail = errText.slice(0, 120);
      }

      if (uploadRes.status === 401 || uploadRes.status === 403) {
        return NextResponse.json(
          { success: false, error: `Storage permission denied: ${detail}. Check SUPABASE_SERVICE_ROLE_KEY.` },
          { status: 500 }
        );
      }
      if (uploadRes.status === 404) {
        return NextResponse.json(
          { success: false, error: `Storage bucket not found: ensure a bucket named "product-images" exists in your Supabase project and is set to Public.` },
          { status: 500 }
        );
      }
      return NextResponse.json(
        { success: false, error: `Storage upload failed: ${detail}` },
        { status: 500 }
      );
    }

    // ── Return public URL ─────────────────────────────────────────────────────
    const publicUrl = `${supabaseUrl}/storage/v1/object/public/product-images/${storagePath}`;
    return NextResponse.json({ success: true, url: publicUrl, path: storagePath });

  } catch (unexpected) {
    console.error("[upload] Unexpected error:", unexpected);
    return NextResponse.json({ success: false, error: "An unexpected server error occurred" }, { status: 500 });
  }
}
