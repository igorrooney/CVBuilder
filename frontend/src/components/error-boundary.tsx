'use client';

import { Component, ReactNode } from 'react';
import { Box, Button, Typography, Paper, Alert } from '@mui/material';
import { Refresh, BugReport, Home } from '@mui/icons-material';
import Link from 'next/link';

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
	errorInfo: { componentStack?: string } | null;
}

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, error: null, errorInfo: null };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error, errorInfo: null };
	}

	componentDidCatch(error: Error, errorInfo: { componentStack?: string }) {
		this.setState({
			error,
			errorInfo,
		});

		// Log error to console in development
		if (process.env.NODE_ENV === 'development') {
			console.error('Error caught by boundary:', error, errorInfo);
		}

		// In production, you would send this to your error tracking service
		// Example: Sentry.captureException(error, { extra: errorInfo });
		this.logErrorToService(error, errorInfo);
	}

	private logErrorToService(error: Error, errorInfo: { componentStack?: string }) {
		// This is where you would integrate with error tracking services
		// like Sentry, LogRocket, or your own error logging API
		try {
			const errorData = {
				message: error.message,
				stack: error.stack,
				componentStack: errorInfo?.componentStack,
				url: typeof window !== 'undefined' ? window.location.href : '',
				timestamp: new Date().toISOString(),
				userAgent:
					typeof window !== 'undefined' && window.navigator ? window.navigator.userAgent : '',
			};

			// Send to your error tracking service
			// fetch('/api/errors', {
			//   method: 'POST',
			//   headers: { 'Content-Type': 'application/json' },
			//   body: JSON.stringify(errorData),
			// });

			// For now, just log to console
			console.error('Error logged:', errorData);
		} catch (loggingError) {
			console.error('Failed to log error:', loggingError);
		}
	}

	private handleRetry = () => {
		this.setState({ hasError: false, error: null, errorInfo: null });
	};

	private handleReportError = () => {
		const { error, errorInfo } = this.state;
		if (error) {
			// Open email client with error details
			const subject = encodeURIComponent('CV Builder Error Report');
			const body = encodeURIComponent(`
Error Details:
Message: ${error.message}
Stack: ${error.stack}
Component Stack: ${errorInfo?.componentStack}
URL: ${typeof window !== 'undefined' ? window.location.href : ''}
Timestamp: ${new Date().toISOString()}
			`);
			window.open(`mailto:support@cvbuilder.com?subject=${subject}&body=${body}`);
		}
	};

	render() {
		if (this.state.hasError) {
			// Custom fallback UI
			if (this.props.fallback) {
				return this.props.fallback;
			}

			// Default error UI
			return (
				<Box
					sx={{
						minHeight: '100vh',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						padding: 3,
						backgroundColor: 'background.default',
					}}
				>
					<Paper
						elevation={3}
						sx={{
							padding: 4,
							maxWidth: 600,
							width: '100%',
							textAlign: 'center',
						}}
					>
						<Alert severity="error" sx={{ mb: 3 }}>
							<Typography variant="h5" component="h1" gutterBottom>
								Something went wrong
							</Typography>
						</Alert>

						<Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
							We're sorry, but something unexpected happened. Our team has been notified and is
							working to fix this issue.
						</Typography>

						{process.env.NODE_ENV === 'development' && this.state.error && (
							<Box sx={{ mb: 3, textAlign: 'left' }}>
								<Typography variant="h6" gutterBottom>
									Error Details (Development):
								</Typography>
								<Paper
									variant="outlined"
									sx={{
										p: 2,
										backgroundColor: 'grey.50',
										fontFamily: 'monospace',
										fontSize: '0.875rem',
										overflow: 'auto',
										maxHeight: 200,
									}}
								>
									<Typography variant="body2" component="pre">
										{this.state.error.message}
									</Typography>
									{this.state.error.stack && (
										<Typography variant="body2" component="pre" sx={{ mt: 1 }}>
											{this.state.error.stack}
										</Typography>
									)}
								</Paper>
							</Box>
						)}

						<Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
							<Button
								variant="contained"
								startIcon={<Refresh />}
								onClick={this.handleRetry}
								size="large"
							>
								Try Again
							</Button>

							<Link href="/" style={{ textDecoration: 'none' }}>
								<Button variant="outlined" startIcon={<Home />} size="large">
									Go Home
								</Button>
							</Link>

							<Button
								variant="outlined"
								startIcon={<BugReport />}
								onClick={this.handleReportError}
								size="large"
							>
								Report Issue
							</Button>
						</Box>

						<Typography variant="caption" color="text.secondary" sx={{ mt: 3, display: 'block' }}>
							If this problem persists, please contact our support team.
						</Typography>
					</Paper>
				</Box>
			);
		}

		return this.props.children;
	}
}
