// File: app/api/login/route.ts
import { Client, Account } from 'node-appwrite';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { appwriteConfig } from '@/lib/appwrite/config';

interface LoginPayload {
	email: string;
	password: string;
}

export async function POST(req: Request) {
	try {
		const body = (await req.json()) as LoginPayload;
		const { email, password } = body;

		if (!email || !password) {
			return NextResponse.json(
				{ success: false, error: 'Email and password are required.' },
				{ status: 400 },
			);
		}

		// 1) Initialize an Appwrite client
		const client = new Client()
			.setEndpoint(appwriteConfig.endpointUrl) // from .env
			.setProject(appwriteConfig.projectId); // from .env

		const account = new Account(client);

		// 2) Validate user credentials (creates a session in Appwrite)
		const sessionResponse = await account.createEmailPasswordSession(email, password);

		// 3) Generate a JWT for this user
		const jwtResponse = await account.createJWT();

		// 4) Check that JWT is valid
		if (!jwtResponse.jwt) {
			return NextResponse.json({ success: false, error: 'Failed to create JWT.' }, { status: 500 });
		}

		// 5) Store the JWT in a secure HTTP-only cookie
		// The cookie name is defined in your .env as SESSION_COOKIE
		const cookieName = process.env.SESSION_COOKIE || 'appwriteJWT';
		(await cookies()).set(cookieName, jwtResponse.jwt, {
			httpOnly: true,
			secure: true, // Use HTTPS in production
			sameSite: 'strict',
			path: '/',
			// Optional: set an expiration if desired
			// expires: new Date(Date.now() + 1000 * 60 * 60) // 1 hour
		});

		return NextResponse.json({ success: true });
	} catch (e) {
		console.error('Login error:', e);
		return NextResponse.json({ success: false, error: (e as Error).message }, { status: 500 });
	}
}
