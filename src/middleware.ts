import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Add your IP addresses here
const ALLOWED_IPS = [
  "::1", // localhost IPv6 (for development)
  "127.0.0.1", // localhost IPv4 (for development)
  process.env.ADMIN_IP,
  // Add your production IPs here:
  // '123.45.67.89',  // Your office IP
  // '98.76.54.32',   // Your home IP
];

// Set to true to skip IP check (useful during development)
const SKIP_IP_CHECK = process.env.NODE_ENV === "development";

export function middleware(request: NextRequest) {
  // Only apply to admin routes (both pages and API)
  if (request.nextUrl.pathname.startsWith("/admin") || request.nextUrl.pathname.startsWith("/api/admin")) {
    // Skip login page from middleware check
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next();
    }

    // Skip login/logout API endpoints
    if (request.nextUrl.pathname === "/api/admin/login" || request.nextUrl.pathname === "/api/admin/logout") {
      return NextResponse.next();
    }

    // Get client IP from headers
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";

    console.log(`[Admin Access] IP: ${ip} - Path: ${request.nextUrl.pathname}`);

    // First check: IP whitelist (skip in development if configured)
    if (!SKIP_IP_CHECK && !ALLOWED_IPS.includes(ip)) {
      console.log(`[BLOCKED] IP not in whitelist: ${ip}`);

      // For API routes, return JSON error
      if (request.nextUrl.pathname.startsWith("/api/admin")) {
        return new NextResponse(JSON.stringify({ error: "page not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }

      // For pages, show error page
      return new NextResponse("Page not found", { status: 404 });
    }

    // Second check: Authentication cookie
    const authCookie = request.cookies.get("admin_auth");
    if (!authCookie || authCookie.value !== "authenticated") {
      console.log(`[REDIRECT] No valid auth cookie - redirecting to login`);

      // For API routes, return 401
      if (request.nextUrl.pathname.startsWith("/api/admin")) {
        return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        });
      }

      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    console.log(`[ALLOWED] Access granted`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
