import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const PUBLIC_ROUTES = ["/", "/login", "/register"];
const AUTH_API_PREFIX = "/api/auth";
const STATIC_PREFIXES = [
  "/_next",
  "/static",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
];

function isPublicRoute(pathname: string) {
  if (PUBLIC_ROUTES.includes(pathname)) return true;
  if (pathname.startsWith(AUTH_API_PREFIX)) return true;
  if (STATIC_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return true;
  return false;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  const sessionCookie = getSessionCookie(request);
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const platformMatch = pathname.match(/^\/(teacher|lawyer)(?:\/|$)/);
  if (platformMatch) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-platform-slug", platformMatch[1]);
    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\..*$).*)"],
};
