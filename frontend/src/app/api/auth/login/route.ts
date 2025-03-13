import { createAdminClient } from '@/lib/appwrite';
import { SESSION_COOKIE } from '@/lib/server/const';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

interface LoginPayload {
	email: string;
	password: string;
}

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { email, password }: LoginPayload = body;

		if (!email || !password) {
			return NextResponse.json(
				{ success: false, error: 'Email and password are required.' },
				{ status: 400 },
			);
		}

		const account = (await createAdminClient()).account;
		const session = await account.createEmailPasswordSession(email, password);

		// Set the session cookie correctly
		(await cookies()).set(SESSION_COOKIE, session.secret, {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			expires: new Date(+session.expire * 1000), // Convert timestamp
			path: '/',
		});

		return NextResponse.json({ success: true });
	} catch (e) {
		console.error('Login error:', e); // Log error for debugging
		return NextResponse.json({ success: false, error: (e as Error).message }, { status: 400 });
	}
}
