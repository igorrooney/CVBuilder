import { createAdminClient, createSessionClient } from '@/lib/appwrite';
import { SESSION_COOKIE } from '@/lib/server/const';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { Account } from 'node-appwrite';

interface LoginPayload {
	email: string;
	password: string;
}

export async function POST(req: Request) {
	const { email, password }: LoginPayload = await req.json();

	const account = (await createAdminClient()).account;

	try {
		// Create the session using the Appwrite client
		const session = await account.createEmailPasswordSession(email, password);

		// Set the session cookie
		const response = NextResponse.json({ success: true });
		response.cookies.set(SESSION_COOKIE, session.secret, {
			// use the session secret as the cookie value
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			expires: new Date(session.expire),
			path: '/',
		});
		return response;
	} catch (e) {
		return NextResponse.json({ success: false, error: (e as Error).message }, { status: 400 });
	}
}
