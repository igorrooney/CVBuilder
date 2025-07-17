import DOMPurify from 'dompurify';

export class InputSanitizer {
	/**
	 * Sanitize HTML content to prevent XSS attacks
	 */
	static sanitizeHtml(html: string): string {
		if (typeof window !== 'undefined') {
			return DOMPurify.sanitize(html, {
				ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'br', 'p'],
				ALLOWED_ATTR: ['href', 'target'],
			});
		}
		// Server-side fallback - basic HTML stripping
		return html.replace(/<[^>]*>/g, '');
	}

	/**
	 * Sanitize plain text by removing potentially dangerous characters
	 */
	static sanitizeText(text: string): string {
		if (!text || typeof text !== 'string') return '';

		return text
			.trim()
			.replace(/[<>]/g, '') // Remove < and >
			.replace(/javascript:/gi, '') // Remove javascript: protocol
			.replace(/on\w+=/gi, '') // Remove event handlers
			.replace(/data:/gi, '') // Remove data: protocol
			.slice(0, 10000); // Limit length
	}

	/**
	 * Sanitize email address
	 */
	static sanitizeEmail(email: string): string {
		if (!email || typeof email !== 'string') return '';

		const sanitized = email.trim().toLowerCase();
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		return emailRegex.test(sanitized) ? sanitized : '';
	}

	/**
	 * Sanitize phone number
	 */
	static sanitizePhone(phone: string): string {
		if (!phone || typeof phone !== 'string') return '';

		return phone
			.replace(/[^\d+\-\(\)\s]/g, '') // Keep only digits, +, -, (, ), and spaces
			.trim()
			.slice(0, 20); // Limit length
	}

	/**
	 * Sanitize URL
	 */
	static sanitizeUrl(url: string): string {
		if (!url || typeof url !== 'string') return '';

		const sanitized = url.trim();

		// Check if it's a valid URL
		try {
			const urlObj = new URL(sanitized);
			// Only allow http and https protocols
			if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
				return '';
			}
			return sanitized;
		} catch {
			return '';
		}
	}

	/**
	 * Sanitize CV data object
	 */
	static sanitizeCVData(data: Record<string, unknown>): Record<string, unknown> {
		const sanitized: Record<string, unknown> = {};

		for (const [key, value] of Object.entries(data)) {
			if (typeof value === 'string') {
				switch (key) {
					case 'email':
						sanitized[key] = this.sanitizeEmail(value);
						break;
					case 'phoneNumber':
						sanitized[key] = this.sanitizePhone(value);
						break;
					case 'summary':
					case 'responsibilities':
					case 'achievements':
						sanitized[key] = this.sanitizeHtml(value);
						break;
					case 'credentialUrl':
					case 'website':
						sanitized[key] = this.sanitizeUrl(value);
						break;
					default:
						sanitized[key] = this.sanitizeText(value);
				}
			} else if (Array.isArray(value)) {
				sanitized[key] = value.map((item) =>
					typeof item === 'string' ? this.sanitizeText(item) : item,
				);
			} else {
				sanitized[key] = value;
			}
		}

		return sanitized;
	}

	/**
	 * Validate and sanitize form data
	 */
	static sanitizeFormData<T extends Record<string, unknown>>(data: T): T {
		return this.sanitizeCVData(data) as T;
	}
}
