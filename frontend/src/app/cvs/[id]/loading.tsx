import { Box, Container, Skeleton } from '@mui/material';

export default function CVLoading() {
	return (
		<Container maxWidth="lg" className="py-8">
			<Box className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<Skeleton variant="text" width={200} height={40} />
					<Skeleton variant="text" width={150} height={24} />
				</div>
				<Skeleton variant="rectangular" width={120} height={40} />
			</Box>

			<Box className="rounded-lg border bg-white p-6 shadow-sm">
				<div className="space-y-6">
					{/* Header */}
					<div className="flex flex-col gap-2 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
						<div className="min-w-0">
							<Skeleton variant="text" width={180} height={32} />
							<div className="mt-2 flex flex-wrap gap-4">
								<Skeleton variant="text" width={120} height={24} />
								<Skeleton variant="text" width={100} height={24} />
								<Skeleton variant="text" width={150} height={24} />
							</div>
						</div>
					</div>

					{/* Summary */}
					<div className="flex items-start gap-2">
						<Skeleton variant="circular" width={24} height={24} />
						<div className="min-w-0 flex-grow">
							<Skeleton variant="text" width={100} height={24} />
							<Skeleton variant="text" width="100%" height={60} />
						</div>
					</div>

					{/* Experience */}
					<div>
						<div className="mb-2 flex items-center gap-2">
							<Skeleton variant="circular" width={24} height={24} />
							<Skeleton variant="text" width={100} height={24} />
						</div>
						<div className="space-y-4">
							{[1, 2].map((i) => (
								<div key={i} className="border-l-4 border-blue-100 pl-4">
									<Skeleton variant="text" width={180} height={24} />
									<Skeleton variant="text" width={150} height={20} />
									<Skeleton variant="text" width="100%" height={60} />
								</div>
							))}
						</div>
					</div>

					{/* Education */}
					<div>
						<div className="mb-2 flex items-center gap-2">
							<Skeleton variant="circular" width={24} height={24} />
							<Skeleton variant="text" width={100} height={24} />
						</div>
						<div className="space-y-4">
							{[1, 2].map((i) => (
								<div key={i} className="border-l-4 border-blue-100 pl-4">
									<Skeleton variant="text" width={180} height={24} />
									<Skeleton variant="text" width={150} height={20} />
									<Skeleton variant="text" width={100} height={20} />
								</div>
							))}
						</div>
					</div>

					{/* Skills */}
					<div>
						<div className="mb-2 flex items-center gap-2">
							<Skeleton variant="circular" width={24} height={24} />
							<Skeleton variant="text" width={100} height={24} />
						</div>
						<div className="flex flex-wrap gap-2">
							{[1, 2, 3, 4, 5].map((i) => (
								<Skeleton key={i} variant="rounded" width={80} height={28} />
							))}
						</div>
					</div>
				</div>
			</Box>
		</Container>
	);
}
