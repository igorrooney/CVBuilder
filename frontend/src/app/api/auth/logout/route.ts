import { createSessionClient } from '@/lib/server/appwrite';
import { SESSION_COOKIE } from '@/lib/server/const';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
	try {
		const { account } = await createSessionClient();
		await account.deleteSession('current'); // Logout user session

		// Remove session cookie
		(await cookies()).delete(SESSION_COOKIE);

		return NextResponse.json({ success: true });
	} catch (error) {
		return NextResponse.json({ error: 'Failed to log out' }, { status: 500 });
	}
}
