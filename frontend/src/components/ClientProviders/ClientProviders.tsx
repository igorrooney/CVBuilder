'use client';

import theme from '@/theme';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { useState } from 'react';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<QueryClientProvider client={queryClient}>
				{children}
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</ThemeProvider>
	);
}
