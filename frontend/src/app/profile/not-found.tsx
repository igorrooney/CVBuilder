import { Box, Typography, Button } from '@mui/material';
import Link from 'next/link';

export default function ProfileNotFound() {
	return (
		<Box className="container mx-auto max-w-2xl px-4 py-16 text-center">
			<Typography variant="h1" component="h1" className="mb-4 text-6xl font-bold text-gray-900">
				404
			</Typography>
			<Typography variant="h4" component="h2" className="mb-4 font-semibold text-gray-800">
				Profile Not Found
			</Typography>
			<Typography variant="body1" color="text.secondary" className="mb-8">
				The profile page you're looking for doesn't exist or you don't have permission to access it.
			</Typography>
			<Box className="flex flex-col justify-center gap-4 sm:flex-row">
				<Button component={Link} href="/" variant="contained" size="large">
					Go Home
				</Button>
				<Button component={Link} href="/login" variant="outlined" size="large">
					Sign In
				</Button>
			</Box>
		</Box>
	);
}
