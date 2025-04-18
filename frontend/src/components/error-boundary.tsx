'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import { Button, Typography, Box } from '@mui/material';

interface Props {
	children: ReactNode;
	fallback?: ReactNode;
}

interface State {
	hasError: boolean;
	error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false,
		error: null,
	};

	public static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('Uncaught error:', error, errorInfo);
	}

	private handleReset = () => {
		this.setState({ hasError: false, error: null });
	};

	public render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						minHeight: '100vh',
						p: 3,
						textAlign: 'center',
					}}
				>
					<Typography variant="h4" component="h1" gutterBottom>
						Something went wrong
					</Typography>
					<Typography variant="body1" color="text.secondary" paragraph>
						{this.state.error?.message || 'An unexpected error occurred'}
					</Typography>
					<Button variant="contained" color="primary" onClick={this.handleReset} sx={{ mt: 2 }}>
						Try again
					</Button>
				</Box>
			);
		}

		return this.props.children;
	}
}
