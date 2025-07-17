'use client';

import { useState, useEffect } from 'react';
import {
	Box,
	Card,
	CardContent,
	Typography,
	Grid,
	CircularProgress,
	Alert,
	Button,
} from '@mui/material';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	LineChart,
	Line,
	PieChart,
	Pie,
	Cell,
} from 'recharts';
import { analytics } from '@/lib/analytics/analytics';

interface AnalyticsData {
	totalCVs: number;
	totalUsers: number;
	avgCreationTime: number;
	errorRate: number;
	cvActions: Array<{ action: string; count: number }>;
	pageViews: Array<{ page: string; views: number }>;
	performance: Array<{ metric: string; value: number }>;
}

// Mock data - replace with real API calls
const mockAnalyticsData: AnalyticsData = {
	totalCVs: 1250,
	totalUsers: 450,
	avgCreationTime: 2.5,
	errorRate: 0.8,
	cvActions: [
		{ action: 'Create', count: 450 },
		{ action: 'Edit', count: 320 },
		{ action: 'Download', count: 280 },
		{ action: 'Preview', count: 200 },
		{ action: 'Delete', count: 50 },
	],
	pageViews: [
		{ page: 'Dashboard', views: 1200 },
		{ page: 'Create CV', views: 800 },
		{ page: 'CV List', views: 600 },
		{ page: 'Preview', views: 400 },
	],
	performance: [
		{ metric: 'Page Load', value: 1200 },
		{ metric: 'API Calls', value: 450 },
		{ metric: 'Form Submit', value: 800 },
	],
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export function AnalyticsDashboard() {
	const [data, setData] = useState<AnalyticsData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		loadAnalyticsData();
	}, []);

	const loadAnalyticsData = async () => {
		try {
			setLoading(true);
			// In a real app, fetch from your analytics API
			// const response = await fetch('/api/analytics/dashboard');
			// const analyticsData = await response.json();

			// For demo purposes, use mock data
			await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
			setData(mockAnalyticsData);

			// Track dashboard view
			analytics.trackPageView('/analytics-dashboard', {
				userId: 'admin',
				role: 'admin',
			});
		} catch (err) {
			setError('Failed to load analytics data');
			analytics.trackError(err as Error, {
				context: 'analytics_dashboard',
				action: 'load_data',
			});
		} finally {
			setLoading(false);
		}
	};

	const handleRefresh = () => {
		analytics.track('dashboard_refresh', { timestamp: Date.now() });
		loadAnalyticsData();
	};

	const handleExportData = () => {
		analytics.track('export_analytics', {
			format: 'csv',
			timestamp: Date.now(),
		});
		// Implement export functionality
		alert('Export functionality would be implemented here');
	};

	if (loading) {
		return (
			<Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
				<CircularProgress size={60} />
			</Box>
		);
	}

	if (error) {
		return (
			<Alert severity="error" sx={{ mb: 2 }}>
				{error}
			</Alert>
		);
	}

	if (!data) return null;

	return (
		<Box sx={{ p: 3 }}>
			<Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
				<Typography variant="h4" component="h1">
					Analytics Dashboard
				</Typography>
				<Box>
					<Button onClick={handleRefresh} sx={{ mr: 1 }}>
						Refresh
					</Button>
					<Button variant="contained" onClick={handleExportData}>
						Export Data
					</Button>
				</Box>
			</Box>

			{/* Key Metrics */}
			<Grid container spacing={3} mb={4}>
				<Grid item xs={12} sm={6} md={3}>
					<Card>
						<CardContent>
							<Typography color="textSecondary" gutterBottom>
								Total CVs
							</Typography>
							<Typography variant="h4" component="div">
								{data.totalCVs.toLocaleString()}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<Card>
						<CardContent>
							<Typography color="textSecondary" gutterBottom>
								Total Users
							</Typography>
							<Typography variant="h4" component="div">
								{data.totalUsers.toLocaleString()}
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<Card>
						<CardContent>
							<Typography color="textSecondary" gutterBottom>
								Avg Creation Time
							</Typography>
							<Typography variant="h4" component="div">
								{data.avgCreationTime}s
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				<Grid item xs={12} sm={6} md={3}>
					<Card>
						<CardContent>
							<Typography color="textSecondary" gutterBottom>
								Error Rate
							</Typography>
							<Typography
								variant="h4"
								component="div"
								color={data.errorRate > 1 ? 'error' : 'success'}
							>
								{data.errorRate}%
							</Typography>
						</CardContent>
					</Card>
				</Grid>
			</Grid>

			{/* Charts */}
			<Grid container spacing={3}>
				{/* CV Actions Chart */}
				<Grid item xs={12} md={6}>
					<Card>
						<CardContent>
							<Typography variant="h6" gutterBottom>
								CV Actions
							</Typography>
							<ResponsiveContainer width="100%" height={300}>
								<BarChart data={data.cvActions}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="action" />
									<YAxis />
									<Tooltip />
									<Bar dataKey="count" fill="#8884d8" />
								</BarChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>
				</Grid>

				{/* Page Views Chart */}
				<Grid item xs={12} md={6}>
					<Card>
						<CardContent>
							<Typography variant="h6" gutterBottom>
								Page Views
							</Typography>
							<ResponsiveContainer width="100%" height={300}>
								<PieChart>
									<Pie
										data={data.pageViews}
										cx="50%"
										cy="50%"
										labelLine={false}
										label={({ page, percent = 0 }) => `${page} ${(percent * 100).toFixed(0)}%`}
										outerRadius={80}
										fill="#8884d8"
										dataKey="views"
									>
										{data.pageViews.map((_, index) => (
											<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
										))}
									</Pie>
									<Tooltip />
								</PieChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>
				</Grid>

				{/* Performance Chart */}
				<Grid item xs={12}>
					<Card>
						<CardContent>
							<Typography variant="h6" gutterBottom>
								Performance Metrics
							</Typography>
							<ResponsiveContainer width="100%" height={300}>
								<LineChart data={data.performance}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="metric" />
									<YAxis />
									<Tooltip />
									<Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
								</LineChart>
							</ResponsiveContainer>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Box>
	);
}
