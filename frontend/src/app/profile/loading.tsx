import { Box, Card, CardContent, Skeleton, Grid } from '@mui/material';

export default function ProfileLoading() {
	return (
		<Box className="container mx-auto max-w-6xl px-4 py-8">
			{/* Header Skeleton */}
			<Box className="mb-8">
				<Skeleton variant="text" width="60%" height={48} className="mb-2" />
				<Skeleton variant="text" width="40%" height={24} />
			</Box>

			<Grid container spacing={4}>
				{/* Profile Information Skeleton */}
				<Grid item xs={12} lg={8}>
					<Card className="mb-6">
						<CardContent className="p-6">
							<Box className="mb-6 flex items-center justify-between">
								<Skeleton variant="text" width="30%" height={32} />
								<Skeleton variant="rectangular" width={120} height={40} />
							</Box>

							<Grid container spacing={3}>
								{/* Profile Picture Skeleton */}
								<Grid item xs={12} sm={3}>
									<Box className="flex flex-col items-center">
										<Skeleton variant="circular" width={120} height={120} className="mb-2" />
										<Skeleton variant="rectangular" width={100} height={32} />
									</Box>
								</Grid>

								{/* Form Fields Skeleton */}
								<Grid item xs={12} sm={9}>
									<Grid container spacing={3}>
										<Grid item xs={12} sm={6}>
											<Skeleton variant="rectangular" width="100%" height={56} />
										</Grid>
										<Grid item xs={12} sm={6}>
											<Skeleton variant="rectangular" width="100%" height={56} />
										</Grid>
										<Grid item xs={12} sm={6}>
											<Skeleton variant="rectangular" width="100%" height={56} />
										</Grid>
										<Grid item xs={12} sm={6}>
											<Skeleton variant="rectangular" width="100%" height={56} />
										</Grid>
										<Grid item xs={12}>
											<Skeleton variant="rectangular" width="100%" height={56} />
										</Grid>
										<Grid item xs={12}>
											<Skeleton variant="rectangular" width="100%" height={80} />
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</CardContent>
					</Card>

					{/* Account Security Skeleton */}
					<Card className="mb-6">
						<CardContent className="p-6">
							<Skeleton variant="text" width="25%" height={32} className="mb-4" />
							<Grid container spacing={3}>
								<Grid item xs={12} sm={6}>
									<Skeleton variant="rectangular" width="100%" height={80} />
								</Grid>
								<Grid item xs={12} sm={6}>
									<Skeleton variant="rectangular" width="100%" height={80} />
								</Grid>
								<Grid item xs={12}>
									<Skeleton variant="rectangular" width="100%" height={40} />
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Grid>

				{/* Sidebar Skeleton */}
				<Grid item xs={12} lg={4}>
					{/* Account Information Skeleton */}
					<Card className="mb-6">
						<CardContent className="p-6">
							<Skeleton variant="text" width="40%" height={28} className="mb-4" />
							<Box className="space-y-3">
								{[1, 2, 3, 4].map((i) => (
									<Box key={i} className="flex items-center justify-between">
										<Skeleton variant="text" width="30%" height={20} />
										<Skeleton variant="text" width="40%" height={20} />
									</Box>
								))}
							</Box>
						</CardContent>
					</Card>

					{/* Danger Zone Skeleton */}
					<Card className="border-red-200 bg-red-50">
						<CardContent className="p-6">
							<Skeleton variant="text" width="30%" height={28} className="mb-4" />
							<Skeleton variant="text" width="100%" height={40} className="mb-4" />
							<Skeleton variant="rectangular" width="100%" height={40} />
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Box>
	);
}
