import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { SESSION_COOKIE } from './lib/server/const';

export function middleware(req: NextRequest) {
	const session = req.cookies.get(SESSION_COOKIE);

	if (!session) {
		return NextResponse.redirect(new URL('/login', req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/dashboard/:path*', '/create-cv/:path*', '/my-cvs/:path*'],
};
