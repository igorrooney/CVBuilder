import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of auth routes that should redirect to home if user is already authenticated
const authRoutes = ['/login', '/register'];

export async function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	// Check for the session cookie that Appwrite sets
	const sessionNames = ['a_session_', 'a_session_legacy_'];
	const hasSession = request.cookies
		.getAll()
		.some((cookie) => sessionNames.some((name) => cookie.name.startsWith(name)));

	// If the user is authenticated and tries to access auth routes (login/register)
	// redirect them to the home page
	if (hasSession && authRoutes.includes(pathname)) {
		return NextResponse.redirect(new URL('/', request.url));
	}

	return NextResponse.next();
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
		 * - api routes
		 */
		'/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
	],
};
