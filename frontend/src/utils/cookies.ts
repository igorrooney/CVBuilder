// Utility functions to handle cookies safely in browser environment

export const setCookie = (
	name: string,
	value: string,
	options: { path?: string; maxAge?: number; sameSite?: string } = {},
) => {
	if (typeof window === 'undefined') return;

	const { path = '/', maxAge = 60 * 60 * 24 * 30, sameSite = 'Lax' } = options;
	document.cookie = `${name}=${value}; path=${path}; max-age=${maxAge}; SameSite=${sameSite}`;
};

export const clearCookie = (name: string) => {
	if (typeof window === 'undefined') return;
	document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

export const getCookie = (name: string): string | null => {
	if (typeof window === 'undefined') return null;

	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
	return null;
};
