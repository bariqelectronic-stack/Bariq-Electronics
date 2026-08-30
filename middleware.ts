import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  // Protect all /admin routes and admin API routes
  const isAdminRoute =
    pathname.startsWith("/admin") || pathname.startsWith("/api/admin");

  if (!isAdminRoute) return NextResponse.next();

  // Not authenticated — redirect to login
  if (!session) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Authenticated but not ADMIN — return 403
  if (session.user?.role !== "ADMIN") {
    return new NextResponse(
      JSON.stringify({ error: "Forbidden: Admin access required" }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Match all /admin routes and /api/admin routes
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};
