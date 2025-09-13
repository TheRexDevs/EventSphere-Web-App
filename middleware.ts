import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public routes that don't require authentication
const PUBLIC_PATTERNS: RegExp[] = [
	/^\/(login|signup|verify-email)\/?$/,
	/^\/(about|contact|events|gallery)?\/?$/,
	/^\/$/,
];

function isPublicPath(pathname: string): boolean {
	return PUBLIC_PATTERNS.some((re) => re.test(pathname));
}

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const token = request.cookies.get("access_token")?.value;

	// If not authenticated and path is not public → redirect to login
	if (!token && !isPublicPath(pathname)) {
		const loginUrl = new URL("/login", request.url);
		loginUrl.searchParams.set("from", pathname);
		return NextResponse.redirect(loginUrl);
	}

	// If authenticated and visiting auth pages → redirect home
	if (token && /^(\/login|\/signup|\/verify-email)\/?$/.test(pathname)) {
		const homeUrl = new URL("/", request.url);
		return NextResponse.redirect(homeUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		// Skip middleware for static files and Next.js internals
		"/((?!_next/|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico)).*)",
	],
};
