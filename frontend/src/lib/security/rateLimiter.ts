interface RateLimitConfig {
	windowMs: number; // Time window in milliseconds
	maxRequests: number; // Maximum requests per window
	message?: string;
}

interface RateLimitStore {
	[key: string]: {
		count: number;
		resetTime: number;
	};
}

class RateLimiter {
	private store: RateLimitStore = {};
	private config: RateLimitConfig;

	constructor(config: RateLimitConfig) {
		this.config = config;
	}

	private getKey(identifier: string): string {
		return `rate_limit:${identifier}`;
	}

	private cleanup(): void {
		const now = Date.now();
		Object.keys(this.store).forEach((key) => {
			if (this.store[key].resetTime < now) {
				delete this.store[key];
			}
		});
	}

	isRateLimited(identifier: string): { limited: boolean; remaining: number; resetTime: number } {
		this.cleanup();

		const key = this.getKey(identifier);
		const now = Date.now();
		const windowEnd = now + this.config.windowMs;

		if (!this.store[key]) {
			this.store[key] = {
				count: 1,
				resetTime: windowEnd,
			};
			return {
				limited: false,
				remaining: this.config.maxRequests - 1,
				resetTime: windowEnd,
			};
		}

		const record = this.store[key];

		// Reset if window has passed
		if (now > record.resetTime) {
			record.count = 1;
			record.resetTime = windowEnd;
			return {
				limited: false,
				remaining: this.config.maxRequests - 1,
				resetTime: windowEnd,
			};
		}

		// Check if limit exceeded
		if (record.count >= this.config.maxRequests) {
			return {
				limited: true,
				remaining: 0,
				resetTime: record.resetTime,
			};
		}

		// Increment count
		record.count++;

		return {
			limited: false,
			remaining: this.config.maxRequests - record.count,
			resetTime: record.resetTime,
		};
	}

	getHeaders(identifier: string): Record<string, string> {
		const result = this.isRateLimited(identifier);
		return {
			'X-RateLimit-Limit': this.config.maxRequests.toString(),
			'X-RateLimit-Remaining': result.remaining.toString(),
			'X-RateLimit-Reset': result.resetTime.toString(),
		};
	}
}

// Create rate limiters for different endpoints
export const authRateLimiter = new RateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
	maxRequests: 5, // 5 attempts per 15 minutes
	message: 'Too many authentication attempts. Please try again later.',
});

export const apiRateLimiter = new RateLimiter({
	windowMs: 60 * 1000, // 1 minute
	maxRequests: 100, // 100 requests per minute
	message: 'Too many requests. Please try again later.',
});

export const cvCreationRateLimiter = new RateLimiter({
	windowMs: 60 * 60 * 1000, // 1 hour
	maxRequests: 10, // 10 CV creations per hour
	message: 'Too many CV creation attempts. Please try again later.',
});
