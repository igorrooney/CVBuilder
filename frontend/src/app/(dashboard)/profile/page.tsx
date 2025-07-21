'use client';

import { useLoggedInUser } from '@/hooks/useLoggedInUser';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
import {
	Box,
	Button,
	CircularProgress,
	Container,
	TextField,
	Typography,
	Alert,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
	const { user, isLoading: isUserLoading, unauthorized } = useLoggedInUser();
	const { updateProfile, isUpdating } = useUpdateProfile();
	const router = useRouter();

	const [formData, setFormData] = useState({
		name: '',
		email: '',
	});
	const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

	useEffect(() => {
		if (!isUserLoading && (unauthorized || !user)) {
			router.push('/login?callbackUrl=/profile');
		}
	}, [isUserLoading, unauthorized, user, router]);

	useEffect(() => {
		if (user) {
			setFormData({
				name: user.name || '',
				email: user.email || '',
			});
		}
	}, [user]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setMessage(null);

		try {
			await updateProfile({
				name: formData.name,
			});
			setMessage({ type: 'success', text: 'Profile updated successfully!' });
		} catch (error) {
			setMessage({
				type: 'error',
				text: error instanceof Error ? error.message : 'Failed to update profile',
			});
		}
	};

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	if (isUserLoading) {
		return (
			<Box
				sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
			>
				<CircularProgress size={60} />
			</Box>
		);
	}

	if (!user) {
		return null;
	}

	return (
		<Container maxWidth="md" sx={{ py: 4 }}>
			<Typography variant="h4" component="h1" gutterBottom>
				Profile Settings
			</Typography>

			<Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
				Manage your account information and preferences.
			</Typography>

			{message && (
				<Alert severity={message.type} sx={{ mb: 3 }}>
					{message.text}
				</Alert>
			)}

			<Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500 }}>
				<TextField
					fullWidth
					label="Full Name"
					value={formData.name}
					onChange={(e) => handleInputChange('name', e.target.value)}
					margin="normal"
					required
					disabled={isUpdating}
				/>

				<TextField
					fullWidth
					label="Email"
					value={formData.email}
					margin="normal"
					disabled
					helperText="Email cannot be changed"
					sx={{ '& .MuiInputBase-input': { color: 'text.disabled' } }}
				/>

				<Box sx={{ mt: 3 }}>
					<Button
						type="submit"
						variant="contained"
						size="large"
						disabled={isUpdating}
						sx={{ mr: 2 }}
					>
						{isUpdating ? 'Updating...' : 'Update Profile'}
					</Button>

					<Button variant="outlined" size="large" onClick={() => router.push('/cvs')}>
						Back to CVs
					</Button>
				</Box>
			</Box>

			<Box sx={{ mt: 6, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
				<Typography variant="h6" gutterBottom>
					Account Information
				</Typography>
				<Typography variant="body2" color="text.secondary">
					User ID: {user.$id}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Account Created: {new Date(user.$createdAt).toLocaleDateString()}
				</Typography>
			</Box>
		</Container>
	);
}
