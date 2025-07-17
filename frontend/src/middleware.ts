import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of auth routes that should redirect to home if user is already authenticated
const authRoutes = ['/login', '/register'];

// List of protected routes that require authentication
const protectedRoutes = ['/create-cv', '/cvs', '/my-cvs'];

// List of admin routes that require admin role
const adminRoutes = ['/admin'];

// Security headers configuration
const securityHeaders = {
	'X-Frame-Options': 'DENY',
	'X-Content-Type-Options': 'nosniff',
	'Referrer-Policy': 'strict-origin-when-cross-origin',
	'X-XSS-Protection': '1; mode=block',
	'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
	'Content-Security-Policy':
		"default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' 'wasm-unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https: data: blob:; worker-src 'self' blob: data:; child-src 'self' blob: data:; frame-ancestors 'none';",
};

export async function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;
	const response = NextResponse.next();

	// Add security headers to all responses
	Object.entries(securityHeaders).forEach(([key, value]) => {
		response.headers.set(key, value);
	});

	// Add CSRF protection headers
	const csrfToken = request.headers.get('x-csrf-token');
	if (request.method !== 'GET' && request.method !== 'HEAD') {
		// In production, validate CSRF token here
		// For now, we'll just check if it exists
		if (!csrfToken && process.env.NODE_ENV === 'production') {
			return NextResponse.json({ error: 'CSRF token required' }, { status: 403 });
		}
	}

	// Debug: Log all cookies
	const allCookies = request.cookies.getAll();

	// Check for the session cookie that Appwrite sets
	const sessionNames = ['a_session_', 'a_session_legacy_', 'appwrite_session'];
	const hasSession = allCookies.some((cookie) =>
		sessionNames.some((name) => cookie.name.startsWith(name)),
	);

	// If the user is authenticated and tries to access auth routes (login/register)
	// redirect them to the home page
	if (hasSession && authRoutes.includes(pathname)) {
		return NextResponse.redirect(new URL('/', request.url));
	}

	// Check if route requires authentication
	const requiresAuth = protectedRoutes.some((route) => pathname.startsWith(route));
	const requiresAdmin = adminRoutes.some((route) => pathname.startsWith(route));

	if ((requiresAuth || requiresAdmin) && !hasSession) {
		// Redirect to login with callback URL
		const callbackUrl = encodeURIComponent(request.url);
		return NextResponse.redirect(new URL(`/login?callbackUrl=${callbackUrl}`, request.url));
	}

	// Rate limiting headers (basic implementation)
	// In production, implement proper rate limiting here
	response.headers.set('X-RateLimit-Limit', '100');
	response.headers.set('X-RateLimit-Remaining', '99'); // This should be dynamic
	response.headers.set('X-RateLimit-Reset', Math.floor(Date.now() / 1000 + 60).toString());

	return response;
}

// Configure the middleware to run on specific paths
export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - public folder
		 * - api routes (handled separately)
		 */
		'/((?!_next/static|_next/image|favicon.ico|api|.*\.(?:svg|png|jpg|jpeg|gif|webp|pdf)$).*)',
	],
};
