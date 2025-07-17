'use client';

import { useState, useEffect } from 'react';
import { useLoggedInUser } from '@/hooks/useLoggedInUser';
import { useUpdateProfile } from '@/hooks/useUpdateProfile';
import { useDeleteAccount } from '@/hooks/useDeleteAccount';
import { useLogout } from '@/hooks/useLogout';
import {
	Box,
	Card,
	CardContent,
	Typography,
	TextField,
	Button,
	Avatar,
	Grid,
	Alert,
	CircularProgress,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Paper,
	Chip,
} from '@mui/material';
import {
	Edit as EditIcon,
	Save as SaveIcon,
	Cancel as CancelIcon,
	Delete as DeleteIcon,
	Security as SecurityIcon,
	Person as PersonIcon,
	Email as EmailIcon,
	VerifiedUser as VerifiedIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface ProfileFormData {
	name: string;
	email: string;
	phone?: string;
	bio?: string;
	location?: string;
	website?: string;
}

export default function ProfilePage() {
	const { user, isLoading } = useLoggedInUser();
	const { updateProfile, isUpdating } = useUpdateProfile();
	const { deleteAccount, isDeleting } = useDeleteAccount();
	const { logout } = useLogout();
	const router = useRouter();

	const [isEditing, setIsEditing] = useState(false);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState<string | null>(null);

	const [formData, setFormData] = useState<ProfileFormData>({
		name: '',
		email: '',
		phone: '',
		bio: '',
		location: '',
		website: '',
	});

	// Update form data when user data is available
	useEffect(() => {
		if (user) {
			setFormData({
				name: user.name || '',
				email: user.email || '',
				phone: user.prefs?.phone || '',
				bio: user.prefs?.bio || '',
				location: user.prefs?.location || '',
				website: user.prefs?.website || '',
			});
		}
	}, [user]);

	if (isLoading) {
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: '60vh',
				}}
			>
				<CircularProgress size={60} />
			</Box>
		);
	}

	if (!user) {
		router.push('/login');
		return null;
	}

	const handleInputChange = (field: keyof ProfileFormData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSave = async () => {
		try {
			setError(null);
			await updateProfile({
				name: formData.name,
				prefs: {
					phone: formData.phone,
					bio: formData.bio,
					location: formData.location,
					website: formData.website,
				},
			});
			setSuccess('Profile updated successfully!');
			setIsEditing(false);
		} catch (err: unknown) {
			const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
			setError(errorMessage);
		}
	};

	const handleCancel = () => {
		setFormData({
			name: user?.name || '',
			email: user?.email || '',
			phone: user?.prefs?.phone || '',
			bio: user?.prefs?.bio || '',
			location: user?.prefs?.location || '',
			website: user?.prefs?.website || '',
		});
		setIsEditing(false);
		setError(null);
	};

	const handleDeleteAccount = async () => {
		try {
			await deleteAccount();
			await logout();
			router.push('/');
		} catch (err: unknown) {
			const errorMessage = err instanceof Error ? err.message : 'Failed to delete account';
			setError(errorMessage);
		}
	};

	const firstName = user?.name.split(' ')[0] || '';
	const lastName = user?.name.split(' ')[1] || '';
	const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;
	const profilePictureUrl = user?.prefs?.profilePictureUrl;

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	return (
		<Box className="container mx-auto max-w-6xl px-4 py-8">
			{/* Header */}
			<Box className="mb-8">
				<Typography variant="h3" component="h1" className="mb-2 font-bold text-gray-900">
					Profile Settings
				</Typography>
				<Typography variant="body1" color="text.secondary">
					Manage your account information and preferences
				</Typography>
			</Box>

			{/* Alerts */}
			{error && (
				<Alert severity="error" className="mb-4" onClose={() => setError(null)}>
					{error}
				</Alert>
			)}
			{success && (
				<Alert severity="success" className="mb-4" onClose={() => setSuccess(null)}>
					{success}
				</Alert>
			)}

			<Grid container spacing={4}>
				{/* Profile Information */}
				<Grid item xs={12} lg={8}>
					<Card className="mb-6">
						<CardContent className="p-6">
							<Box className="mb-6 flex items-center justify-between">
								<Typography variant="h5" component="h2" className="font-semibold">
									Personal Information
								</Typography>
								{!isEditing ? (
									<Button
										variant="outlined"
										startIcon={<EditIcon />}
										onClick={() => setIsEditing(true)}
									>
										Edit Profile
									</Button>
								) : (
									<Box className="flex gap-2">
										<Button
											variant="contained"
											startIcon={<SaveIcon />}
											onClick={handleSave}
											disabled={isUpdating}
										>
											{isUpdating ? 'Saving...' : 'Save Changes'}
										</Button>
										<Button
											variant="outlined"
											startIcon={<CancelIcon />}
											onClick={handleCancel}
											disabled={isUpdating}
										>
											Cancel
										</Button>
									</Box>
								)}
							</Box>

							<Grid container spacing={3}>
								{/* Profile Picture */}
								<Grid item xs={12} sm={3}>
									<Box className="flex flex-col items-center">
										{profilePictureUrl ? (
											<Avatar
												src={profilePictureUrl}
												alt="Profile picture"
												sx={{ width: 120, height: 120, mb: 2 }}
											/>
										) : (
											<Avatar
												sx={{
													width: 120,
													height: 120,
													mb: 2,
													bgcolor: 'primary.main',
													fontSize: '2rem',
												}}
											>
												{initials}
											</Avatar>
										)}
										{isEditing && (
											<Button variant="outlined" size="small">
												Change Photo
											</Button>
										)}
									</Box>
								</Grid>

								{/* Form Fields */}
								<Grid item xs={12} sm={9}>
									<Grid container spacing={3}>
										<Grid item xs={12} sm={6}>
											<TextField
												fullWidth
												label="Full Name"
												value={formData.name}
												onChange={(e) => handleInputChange('name', e.target.value)}
												disabled={!isEditing}
												InputProps={{
													startAdornment: <PersonIcon className="mr-2 text-gray-400" />,
												}}
											/>
										</Grid>
										<Grid item xs={12} sm={6}>
											<TextField
												fullWidth
												label="Email"
												value={formData.email}
												disabled
												InputProps={{
													startAdornment: <EmailIcon className="mr-2 text-gray-400" />,
												}}
												helperText="Email cannot be changed"
											/>
										</Grid>
										<Grid item xs={12} sm={6}>
											<TextField
												fullWidth
												label="Phone Number"
												value={formData.phone}
												onChange={(e) => handleInputChange('phone', e.target.value)}
												disabled={!isEditing}
												placeholder="+1 (555) 123-4567"
											/>
										</Grid>
										<Grid item xs={12} sm={6}>
											<TextField
												fullWidth
												label="Location"
												value={formData.location}
												onChange={(e) => handleInputChange('location', e.target.value)}
												disabled={!isEditing}
												placeholder="City, Country"
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												fullWidth
												label="Website"
												value={formData.website}
												onChange={(e) => handleInputChange('website', e.target.value)}
												disabled={!isEditing}
												placeholder="https://yourwebsite.com"
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												fullWidth
												label="Bio"
												value={formData.bio}
												onChange={(e) => handleInputChange('bio', e.target.value)}
												disabled={!isEditing}
												multiline
												rows={3}
												placeholder="Tell us about yourself..."
											/>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</CardContent>
					</Card>

					{/* Account Security */}
					<Card className="mb-6">
						<CardContent className="p-6">
							<Typography variant="h5" component="h2" className="mb-4 font-semibold">
								Account Security
							</Typography>
							<Grid container spacing={3}>
								<Grid item xs={12} sm={6}>
									<Paper className="border p-4">
										<Box className="flex items-center justify-between">
											<Box>
												<Typography variant="subtitle1" className="font-medium">
													Email Verification
												</Typography>
												<Typography variant="body2" color="text.secondary">
													{user?.emailVerification ? 'Verified' : 'Not verified'}
												</Typography>
											</Box>
											{user?.emailVerification ? (
												<VerifiedIcon color="success" />
											) : (
												<Button variant="outlined" size="small">
													Verify Email
												</Button>
											)}
										</Box>
									</Paper>
								</Grid>
								<Grid item xs={12} sm={6}>
									<Paper className="border p-4">
										<Box className="flex items-center justify-between">
											<Box>
												<Typography variant="subtitle1" className="font-medium">
													Phone Verification
												</Typography>
												<Typography variant="body2" color="text.secondary">
													{user?.phoneVerification ? 'Verified' : 'Not verified'}
												</Typography>
											</Box>
											{user?.phoneVerification ? (
												<VerifiedIcon color="success" />
											) : (
												<Button variant="outlined" size="small">
													Verify Phone
												</Button>
											)}
										</Box>
									</Paper>
								</Grid>
								<Grid item xs={12}>
									<Button variant="outlined" startIcon={<SecurityIcon />} fullWidth>
										Change Password
									</Button>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Grid>

				{/* Sidebar */}
				<Grid item xs={12} lg={4}>
					{/* Account Information */}
					<Card className="mb-6">
						<CardContent className="p-6">
							<Typography variant="h6" component="h3" className="mb-4 font-semibold">
								Account Information
							</Typography>
							<Box className="space-y-3">
								<Box className="flex items-center justify-between">
									<Typography variant="body2" color="text.secondary">
										Account ID
									</Typography>
									<Typography variant="body2" className="font-mono text-sm">
										{user?.$id ? `${user.$id.slice(0, 8)}...` : 'N/A'}
									</Typography>
								</Box>
								<Box className="flex items-center justify-between">
									<Typography variant="body2" color="text.secondary">
										Member Since
									</Typography>
									<Typography variant="body2">
										{user?.$createdAt ? formatDate(user.$createdAt) : 'N/A'}
									</Typography>
								</Box>
								<Box className="flex items-center justify-between">
									<Typography variant="body2" color="text.secondary">
										Last Updated
									</Typography>
									<Typography variant="body2">
										{user?.$updatedAt ? formatDate(user.$updatedAt) : 'N/A'}
									</Typography>
								</Box>
								<Box className="flex items-center justify-between">
									<Typography variant="body2" color="text.secondary">
										Account Type
									</Typography>
									<Chip
										label={user?.prefs?.role === 'admin' ? 'Administrator' : 'User'}
										color={user?.prefs?.role === 'admin' ? 'error' : 'default'}
										size="small"
									/>
								</Box>
							</Box>
						</CardContent>
					</Card>

					{/* Danger Zone */}
					<Card className="border-red-200 bg-red-50">
						<CardContent className="p-6">
							<Typography variant="h6" component="h3" className="mb-4 font-semibold text-red-800">
								Danger Zone
							</Typography>
							<Typography variant="body2" color="text.secondary" className="mb-4">
								Once you delete your account, there is no going back. Please be certain.
							</Typography>
							<Button
								variant="outlined"
								color="error"
								startIcon={<DeleteIcon />}
								onClick={() => setShowDeleteDialog(true)}
								fullWidth
							>
								Delete Account
							</Button>
						</CardContent>
					</Card>
				</Grid>
			</Grid>

			{/* Delete Account Dialog */}
			<Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
				<DialogTitle>Delete Account</DialogTitle>
				<DialogContent>
					<Typography>
						Are you sure you want to delete your account? This action cannot be undone and will
						permanently remove all your data.
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
					<Button
						onClick={handleDeleteAccount}
						color="error"
						variant="contained"
						disabled={isDeleting}
					>
						{isDeleting ? 'Deleting...' : 'Delete Account'}
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
}
