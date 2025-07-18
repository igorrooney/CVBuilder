import { Error as ErrorIcon } from '@mui/icons-material';
import { Box, Button, Container, Typography } from '@mui/material';
import Link from 'next/link';

export default function CVNotFound() {
	return (
		<Container maxWidth="lg" className="py-16">
			<Box className="flex flex-col items-center justify-center text-center">
				<ErrorIcon className="mb-4 text-6xl text-gray-400" />
				<Typography variant="h4" component="h1" className="mb-2 font-bold text-gray-900">
					CV Not Found
				</Typography>
				<Typography variant="body1" color="text.secondary" className="mb-8 max-w-md">
					The CV you're looking for doesn't exist or you don't have permission to view it.
				</Typography>
				<Link href="/cvs">
					<Button variant="contained" size="large">
						Back to My CVs
					</Button>
				</Link>
			</Box>
		</Container>
	);
}
