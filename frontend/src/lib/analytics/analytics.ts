interface AnalyticsEvent {
	event: string;
	properties?: Record<string, unknown>;
	timestamp?: number;
	userId?: string;
	sessionId?: string;
}

interface PerformanceMetric {
	name: string;
	value: number;
	unit: string;
	timestamp: number;
}

class Analytics {
	private sessionId: string;
	private userId?: string;
	private isEnabled: boolean;

	constructor() {
		this.sessionId = this.generateSessionId();
		this.isEnabled =
			process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true';
	}

	private generateSessionId(): string {
		return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
	}

	setUserId(userId: string): void {
		this.userId = userId;
	}

	track(event: string, properties?: Record<string, unknown>): void {
		if (!this.isEnabled) return;

		const analyticsEvent: AnalyticsEvent = {
			event,
			properties,
			timestamp: Date.now(),
			userId: this.userId,
			sessionId: this.sessionId,
		};

		// Send to analytics service
		this.sendToAnalytics(analyticsEvent);
	}

	trackPageView(page: string, properties?: Record<string, unknown>): void {
		this.track('page_view', {
			page,
			url: typeof window !== 'undefined' ? window.location.href : '',
			referrer: typeof document !== 'undefined' ? document.referrer : '',
			...properties,
		});
	}

	trackCVAction(
		action: 'create' | 'edit' | 'delete' | 'download' | 'preview',
		cvId?: string,
	): void {
		this.track('cv_action', {
			action,
			cvId,
			timestamp: Date.now(),
		});
	}

	trackFormStep(step: number, formType: 'cv_creation' | 'cv_edit'): void {
		this.track('form_step', {
			step,
			formType,
			timestamp: Date.now(),
		});
	}

	trackError(error: Error, context?: Record<string, unknown>): void {
		this.track('error', {
			message: error.message,
			stack: error.stack,
			context,
			timestamp: Date.now(),
		});
	}

	trackPerformance(metric: PerformanceMetric): void {
		this.track('performance', {
			...metric,
			timestamp: Date.now(),
		});
	}

	private async sendToAnalytics(_event: AnalyticsEvent): Promise<void> {
		try {
			// In production, send to your analytics service
			// Example: Google Analytics, Mixpanel, Amplitude, etc.
			// Send to your analytics API
			// await fetch('/api/analytics', {
			//   method: 'POST',
			//   headers: { 'Content-Type': 'application/json' },
			//   body: JSON.stringify(event),
			// });
		} catch (error) {
			console.error('Failed to send analytics event:', error);
		}
	}
}

// Performance monitoring
class PerformanceMonitor {
	private analytics: Analytics;

	constructor(analytics: Analytics) {
		this.analytics = analytics;
	}

	measurePageLoad(): void {
		if (typeof window === 'undefined') return;

		window.addEventListener('load', () => {
			const navigation = performance.getEntriesByType(
				'navigation',
			)[0] as PerformanceNavigationTiming;

			if (navigation) {
				this.analytics.trackPerformance({
					name: 'page_load_time',
					value: navigation.loadEventEnd - navigation.loadEventStart,
					unit: 'ms',
					timestamp: Date.now(),
				});

				this.analytics.trackPerformance({
					name: 'dom_content_loaded',
					value: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
					unit: 'ms',
					timestamp: Date.now(),
				});
			}
		});
	}

	measureApiCall(endpoint: string, duration: number, success: boolean): void {
		this.analytics.trackPerformance({
			name: 'api_call',
			value: duration,
			unit: 'ms',
			timestamp: Date.now(),
		});

		this.analytics.track('api_call', {
			endpoint,
			duration,
			success,
			timestamp: Date.now(),
		});
	}

	measureUserInteraction(action: string, duration: number): void {
		this.analytics.trackPerformance({
			name: 'user_interaction',
			value: duration,
			unit: 'ms',
			timestamp: Date.now(),
		});

		this.analytics.track('user_interaction', {
			action,
			duration,
			timestamp: Date.now(),
		});
	}
}

// Create singleton instances
export const analytics = new Analytics();
export const performanceMonitor = new PerformanceMonitor(analytics);

// Initialize performance monitoring
if (typeof window !== 'undefined') {
	performanceMonitor.measurePageLoad();
}
