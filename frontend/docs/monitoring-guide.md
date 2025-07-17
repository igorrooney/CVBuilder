# Monitoring & Analytics Usage Guide

## 🎯 **Overview**

The CV Builder now includes comprehensive monitoring and analytics features that help you:

- Track user behavior and interactions
- Monitor application performance
- Identify and debug errors
- Optimize user experience
- Make data-driven decisions

## 📈 **Analytics System**

### **Basic Usage**

The analytics system is automatically initialized and ready to use. Here's how to track different events:

```typescript
import { analytics } from '@/lib/analytics/analytics';

// Track page views
analytics.trackPageView('/dashboard', { userId: '123', source: 'email' });

// Track CV actions
analytics.trackCVAction('create', 'cv-123');
analytics.trackCVAction('edit', 'cv-456');
analytics.trackCVAction('delete', 'cv-789');
analytics.trackCVAction('download', 'cv-123');
analytics.trackCVAction('preview', 'cv-456');

// Track form steps
analytics.trackFormStep(1, 'cv_creation');
analytics.trackFormStep(2, 'cv_creation');
analytics.trackFormStep(3, 'cv_edit');

// Track custom events
analytics.track('button_click', { button: 'create_cv', page: '/dashboard' });
analytics.track('user_preference', { theme: 'dark', language: 'en' });

// Track errors
analytics.trackError(new Error('API call failed'), {
	action: 'create_cv',
	userId: '123',
});
```

### **Performance Monitoring**

The performance monitoring automatically tracks:

- Page load times
- API call durations
- User interaction times

```typescript
import { performanceMonitor } from '@/lib/analytics/analytics';

// Manually track API calls
const startTime = Date.now();
try {
	const result = await apiCall();
	const duration = Date.now() - startTime;
	performanceMonitor.measureApiCall('/api/cv', duration, true);
} catch (error) {
	const duration = Date.now() - startTime;
	performanceMonitor.measureApiCall('/api/cv', duration, false);
}

// Track user interactions
const interactionStart = Date.now();
// ... user interaction ...
const duration = Date.now() - interactionStart;
performanceMonitor.measureUserInteraction('form_submit', duration);
```

## 🔍 **Error Tracking**

### **Automatic Error Tracking**

Errors are automatically tracked in:

- API calls (via performanceMonitor)
- React components (via ErrorBoundary)
- Form submissions
- User interactions

### **Manual Error Tracking**

```typescript
import { analytics } from '@/lib/analytics/analytics';

try {
	// Your code here
} catch (error) {
	analytics.trackError(error, {
		context: 'cv_creation',
		userId: user.id,
		formData: { title: cvData.title },
	});
}
```

## 📊 **Viewing Analytics Data**

### **Development Mode**

In development, analytics events are logged to the console:

```javascript
// Console output example:
Analytics Event: {
  event: "cv_action",
  properties: { action: "create", cvId: "cv-123" },
  timestamp: 1703123456789,
  userId: "user-456",
  sessionId: "session-789"
}
```

### **Production Mode**

In production, you can integrate with external services:

```typescript
// In src/lib/analytics/analytics.ts, uncomment and configure:

// Google Analytics
// gtag('event', event, properties);

// Mixpanel
// mixpanel.track(event, properties);

// Sentry
// Sentry.captureMessage(event, { extra: properties });

// Custom API
await fetch('/api/analytics', {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify(analyticsEvent),
});
```

## 🛠 **Integration Examples**

### **1. Google Analytics Integration**

```typescript
// Add to your _app.tsx or layout.tsx
import Script from 'next/script';

export default function Layout({ children }) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
        `}
      </Script>
      {children}
    </>
  );
}
```

### **2. Sentry Integration**

```bash
pnpm add @sentry/nextjs
```

```typescript
// In src/lib/analytics/analytics.ts
import * as Sentry from '@sentry/nextjs';

// Replace the sendToAnalytics method:
private async sendToAnalytics(event: AnalyticsEvent): Promise<void> {
  try {
    if (process.env.NODE_ENV === 'production') {
      // Send to Sentry
      Sentry.captureMessage(event.event, {
        level: 'info',
        extra: event.properties,
        tags: {
          userId: event.userId,
          sessionId: event.sessionId,
        },
      });
    }
  } catch (error) {
    console.error('Failed to send analytics event:', error);
  }
}
```

### **3. Custom Analytics API**

```typescript
// Create src/app/api/analytics/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const event = await request.json();

		// Store in database
		await saveAnalyticsEvent(event);

		// Send to external service
		await sendToExternalService(event);

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Analytics API error:', error);
		return NextResponse.json({ error: 'Failed to track event' }, { status: 500 });
	}
}
```

## 📈 **Key Metrics to Track**

### **User Engagement**

- Page views and time on page
- CV creation completion rate
- Form step progression
- Button clicks and interactions

### **Performance**

- Page load times
- API response times
- Error rates
- User interaction delays

### **Business Metrics**

- CV creation success rate
- Download frequency
- User retention
- Feature usage

## 🔧 **Configuration**

### **Environment Variables**

```env
# .env.local
NEXT_PUBLIC_ANALYTICS_ENABLED=true
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@sentry.io/xxxxx
```

### **Enable/Disable Analytics**

```typescript
// Analytics are enabled by default in production
// To disable: set NEXT_PUBLIC_ANALYTICS_ENABLED=false

// Or programmatically:
analytics.setEnabled(false);
```

## 📊 **Dashboard Examples**

### **Basic Analytics Dashboard**

```typescript
// Create a dashboard component
import { useState, useEffect } from 'react';

export function AnalyticsDashboard() {
  const [metrics, setMetrics] = useState({
    totalCVs: 0,
    totalUsers: 0,
    avgCreationTime: 0,
    errorRate: 0,
  });

  useEffect(() => {
    // Fetch analytics data
    fetchAnalyticsData().then(setMetrics);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <MetricCard title="Total CVs" value={metrics.totalCVs} />
      <MetricCard title="Total Users" value={metrics.totalUsers} />
      <MetricCard title="Avg Creation Time" value={`${metrics.avgCreationTime}s`} />
      <MetricCard title="Error Rate" value={`${metrics.errorRate}%`} />
    </div>
  );
}
```

## 🚀 **Best Practices**

### **1. Privacy Compliance**

- Always inform users about analytics tracking
- Provide opt-out mechanisms
- Follow GDPR/CCPA requirements
- Anonymize sensitive data

### **2. Performance**

- Don't block page loads with analytics
- Use async loading for external services
- Batch events when possible
- Monitor analytics impact on performance

### **3. Data Quality**

- Validate event data before sending
- Use consistent naming conventions
- Include relevant context
- Clean up old/irrelevant data

### **4. Actionable Insights**

- Focus on metrics that drive decisions
- Set up alerts for critical issues
- Regular review of analytics data
- A/B testing for optimization

## 🔍 **Troubleshooting**

### **Common Issues**

1. **Events not tracking**

   - Check if analytics is enabled
   - Verify console for errors
   - Check network tab for failed requests

2. **Performance impact**

   - Use async loading
   - Implement rate limiting
   - Monitor bundle size

3. **Data accuracy**
   - Validate event structure
   - Check for duplicate events
   - Verify user identification

### **Debug Mode**

```typescript
// Enable debug mode in development
if (process.env.NODE_ENV === 'development') {
	analytics.setDebugMode(true);
}
```

This monitoring system provides comprehensive insights into your CV Builder's performance and user behavior, helping you make data-driven decisions for continuous improvement.
