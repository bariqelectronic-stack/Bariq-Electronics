import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (session.user?.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json({ error: "Storage not configured" }, { status: 500 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
  }
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "File too large (max 5 MB)" }, { status: 400 });
  }

  const ext = (file.name.split(".").pop() ?? "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const storagePath = `products/${filename}`;

  const bytes = await file.arrayBuffer();

  const uploadRes = await fetch(
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

  if (!uploadRes.ok) {
    const errText = await uploadRes.text();
    console.error("[upload] Supabase error:", uploadRes.status, errText);
    return NextResponse.json({ error: "Storage upload failed" }, { status: 500 });
  }

  const publicUrl = `${supabaseUrl}/storage/v1/object/public/product-images/${storagePath}`;
  return NextResponse.json({ url: publicUrl });
}
