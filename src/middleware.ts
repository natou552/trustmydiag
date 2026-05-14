import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

interface RateLimitRule {
  pattern: RegExp;
  maxRequests: number;
  windowMs: number;
}

const rules: RateLimitRule[] = [
  {
    pattern: /^\/api\/auth\/forgot-password$/,
    maxRequests: 3,
    windowMs: 300_000,
  },
  {
    pattern: /^\/api\/register$/,
    maxRequests: 5,
    windowMs: 60_000,
  },
  {
    pattern: /^\/api\/auth\/.+/,
    maxRequests: 10,
    windowMs: 60_000,
  },
];

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.ip ?? "unknown";
}

export function middleware(request: NextRequest): NextResponse {
  const pathname = request.nextUrl.pathname;

  const matchedRule = rules.find((rule) => rule.pattern.test(pathname));
  if (!matchedRule) return NextResponse.next();

  const ip = getClientIp(request);
  const key = `${ip}:${pathname}`;
  const now = Date.now();

  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + matchedRule.windowMs });
    return NextResponse.next();
  }

  if (entry.count >= matchedRule.maxRequests) {
    return NextResponse.json(
      { error: "Trop de requêtes. Réessayez dans quelques secondes." },
      { status: 429 }
    );
  }

  entry.count += 1;
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/register", "/api/auth/:path*"],
};
