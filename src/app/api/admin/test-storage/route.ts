import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET(request: NextRequest) {
  try {
    // Auth check
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if ((session as { user?: { role?: string } }).user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const supabaseUrl = (process.env.SUPABASE_URL ?? "").trim().replace(/\/$/, "");
    const serviceRoleKey = (process.env.SUPABASE_SERVICE_ROLE_KEY ?? "").trim();

    // Safe diagnostic info (NO SECRET VALUES)
    const diagnostic = {
      timestamp: new Date().toISOString(),
      checks: {
        supabaseUrlExists: !!supabaseUrl,
        supabaseUrlLength: supabaseUrl.length,
        supabaseUrlFormat: supabaseUrl.startsWith("https://") ? "valid" : "invalid",
        supabaseUrlHost: supabaseUrl ? new URL(supabaseUrl).hostname : "N/A",
        serviceRoleKeyExists: !!serviceRoleKey,
        serviceRoleKeyLength: serviceRoleKey.length,
        // Service role keys should be JWT format (roughly 200-300 chars with dots)
        serviceRoleKeyFormat: serviceRoleKey.includes(".") && serviceRoleKey.length > 100 ? "JWT-like" : "unexpected format",
        serviceRoleKeyPrefix: serviceRoleKey.substring(0, 10), // First 10 chars to identify key type
      },
    };

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({
        success: false,
        message: "Environment variables missing",
        diagnostic,
      });
    }

    // Test Storage bucket list
    let storageTestResult;
    try {
      const listRes = await fetch(`${supabaseUrl}/storage/v1/bucket`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${serviceRoleKey}`,
          apikey: serviceRoleKey,
        },
      });

      const listStatus = listRes.status;
      const listBody = await listRes.text();

      let parsedBody;
      try {
        parsedBody = JSON.parse(listBody);
      } catch {
        parsedBody = listBody.substring(0, 200);
      }

      storageTestResult = {
        status: listStatus,
        ok: listRes.ok,
        response: parsedBody,
      };

      // Check if product-images bucket exists
      if (listRes.ok && Array.isArray(parsedBody)) {
        const productImagesBucket = parsedBody.find((b: { name: string }) => b.name === "product-images");
        storageTestResult.productImagesBucketExists = !!productImagesBucket;
        if (productImagesBucket) {
          storageTestResult.productImagesBucket = {
            name: productImagesBucket.name,
            public: productImagesBucket.public,
          };
        }
      }
    } catch (err) {
      storageTestResult = {
        error: err instanceof Error ? err.message : String(err),
      };
    }

    return NextResponse.json({
      success: true,
      message: "Storage diagnostic complete",
      diagnostic,
      storageTestResult,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
