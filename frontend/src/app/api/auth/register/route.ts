import { createAdminClient } from '@/lib/appwrite';
import { SESSION_COOKIE } from '@/lib/server/const';
import { IRegisterFormInputs } from '@/types/RegisterTypes';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { ID } from 'node-appwrite';

export async function POST(req: Request) {
	const { email, password, firstName, lastName }: IRegisterFormInputs = await req.json();
	const fullName = `${firstName} ${lastName}`;
	try {
		// Register the user
		const user = await (
			await createAdminClient()
		).account.create(ID.unique(), email, password, fullName);

		// Automatically log in the user after signup
		const session = await (
			await createAdminClient()
		).account.createEmailPasswordSession(email, password);

		// Store session securely in an HTTP-only cookie
		(await cookies()).set(SESSION_COOKIE, session.$id, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			path: '/',
			sameSite: 'strict',
		});

		return NextResponse.json({ success: true, user });
	} catch (error) {
		return NextResponse.json({ error: 'Registration failed' }, { status: 400 });
	}
}
