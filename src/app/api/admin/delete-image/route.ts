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

  let body: { url?: string };
  try {
    body = await request.json() as { url?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { url } = body;
  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "No URL provided" }, { status: 400 });
  }

  // Extract the storage path from the public URL
  // Expected format: {supabaseUrl}/storage/v1/object/public/product-images/{path}
  const prefix = `${supabaseUrl}/storage/v1/object/public/product-images/`;
  if (!url.startsWith(prefix)) {
    // Not a managed storage URL — ignore silently
    return NextResponse.json({ success: true });
  }
  const storagePath = url.slice(prefix.length);

  const deleteRes = await fetch(
    `${supabaseUrl}/storage/v1/object/product-images`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prefixes: [storagePath] }),
    }
  );

  if (!deleteRes.ok) {
    const errText = await deleteRes.text();
    console.error("[delete-image] Supabase error:", deleteRes.status, errText);
    return NextResponse.json({ error: "Storage delete failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
