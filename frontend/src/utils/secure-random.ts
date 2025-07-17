/**
 * Generates a cryptographically secure random string
 * Falls back to Math.random() for server-side rendering compatibility
 */
export function generateSecureRandomString(length: number = 32): string {
	const array = new Uint8Array(length);

	// Use crypto.getRandomValues() in browser environments
	if (
		typeof globalThis !== 'undefined' &&
		'crypto' in globalThis &&
		'getRandomValues' in globalThis.crypto
	) {
		globalThis.crypto.getRandomValues(array);
	} else {
		// Fallback for server-side or environments without crypto API
		// Note: This is less secure but necessary for SSR compatibility
		for (let i = 0; i < array.length; i++) {
			array[i] = Math.floor(Math.random() * 256);
		}
	}

	// Convert to hex string
	return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Generates a secure session ID with timestamp
 */
export function generateSecureSessionId(): string {
	const timestamp = Date.now();
	const randomPart = generateSecureRandomString(16);
	return `${timestamp}-${randomPart}`;
}
