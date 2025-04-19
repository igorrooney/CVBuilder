'use client';

import {
	Typography,
	Box,
	TextField,
	InputAdornment,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Paper,
} from '@mui/material';
import { CV, CVActions } from '@/types/cv';
import { CVList } from './CVList';
import { Search, Sort } from '@mui/icons-material';
import { useState } from 'react';

interface CVsViewProps extends CVActions {
	cvs: CV[];
}

type SortOption = 'newest' | 'oldest' | 'name-asc' | 'name-desc';

const sortOptions: { value: SortOption; label: string }[] = [
	{ value: 'newest', label: 'Newest first' },
	{ value: 'oldest', label: 'Oldest first' },
	{ value: 'name-asc', label: 'Name (A-Z)' },
	{ value: 'name-desc', label: 'Name (Z-A)' },
];

export function CVsView({ cvs, onPreview, onEdit, onDelete, onDownload }: CVsViewProps) {
	const [searchQuery, setSearchQuery] = useState('');
	const [sortBy, setSortBy] = useState<SortOption>('newest');

	const filteredAndSortedCVs = cvs
		.filter((cv) => cv.title.toLowerCase().includes(searchQuery.toLowerCase()))
		.sort((a, b) => {
			switch (sortBy) {
				case 'newest':
					return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
				case 'oldest':
					return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
				case 'name-asc':
					return a.title.localeCompare(b.title);
				case 'name-desc':
					return b.title.localeCompare(a.title);
				default:
					return 0;
			}
		});

	if (cvs.length === 0) {
		return (
			<Box className="flex flex-col items-center justify-center py-16 text-center">
				<Typography variant="h5" color="text.secondary" gutterBottom>
					No CVs found
				</Typography>
				<Typography variant="body1" color="text.secondary" className="max-w-md">
					Create your first CV to get started! Choose from our professional templates and customize
					it to match your style.
				</Typography>
			</Box>
		);
	}

	return (
		<div className="space-y-4">
			<Paper elevation={0} variant="outlined" className="p-4">
				<div className="flex flex-col gap-4 sm:flex-row">
					<TextField
						placeholder="Search CVs..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						variant="outlined"
						size="small"
						fullWidth
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Search className="text-gray-400" />
								</InputAdornment>
							),
						}}
						className="flex-grow sm:max-w-md"
					/>
					<FormControl size="small" className="w-full sm:w-48">
						<InputLabel id="sort-select-label">Sort by</InputLabel>
						<Select
							labelId="sort-select-label"
							value={sortBy}
							label="Sort by"
							onChange={(e) => setSortBy(e.target.value as SortOption)}
							startAdornment={
								<InputAdornment position="start">
									<Sort className="text-gray-400" />
								</InputAdornment>
							}
						>
							{sortOptions.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
			</Paper>

			<CVList
				cvs={filteredAndSortedCVs}
				onPreview={onPreview}
				onEdit={onEdit}
				onDelete={onDelete}
				onDownload={onDownload}
			/>

			{filteredAndSortedCVs.length === 0 && searchQuery && (
				<Paper elevation={0} variant="outlined" className="p-6 text-center">
					<Typography variant="body1" color="text.secondary">
						No CVs match your search criteria
					</Typography>
					<Typography variant="body2" color="text.secondary" className="mt-1">
						Try adjusting your search or clear the filter to see all CVs
					</Typography>
				</Paper>
			)}
		</div>
	);
}
