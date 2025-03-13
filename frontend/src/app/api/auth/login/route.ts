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

		// ✅ DEBUG: Log Appwrite Response Before Parsing
		const sessionResponse = await account.createEmailPasswordSession(email, password);
		console.log('Appwrite Response:', sessionResponse);

		// ✅ Check if sessionResponse contains valid JSON
		if (!sessionResponse || !sessionResponse.secret) {
			console.error('Appwrite Login Failed:', sessionResponse);
			return NextResponse.json(
				{ success: false, error: 'Invalid Appwrite response.' },
				{ status: 500 },
			);
		}

		(await cookies()).set(SESSION_COOKIE, sessionResponse.secret, {
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			expires: new Date(+sessionResponse.expire * 1000), // Ensure timestamp conversion
			path: '/',
		});

		return NextResponse.json({ success: true });
	} catch (e) {
		console.error('Login error:', e); // Log error for debugging
		return NextResponse.json({ success: false, error: (e as Error).message }, { status: 500 });
	}
}
