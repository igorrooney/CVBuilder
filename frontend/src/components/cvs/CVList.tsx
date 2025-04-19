'use client';

import {
	List,
	ListItem,
	ListItemText,
	Button,
	Divider,
	Typography,
	Paper,
	TextField,
	InputAdornment,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
} from '@mui/material';
import { format } from 'date-fns';
import { CVCardProps } from '@/types/cv';
import {
	Edit as EditIcon,
	Delete as DeleteIcon,
	Download as DownloadIcon,
	Visibility as VisibilityIcon,
	Search,
	Sort,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

type SortOption = 'newest' | 'oldest' | 'name-asc' | 'name-desc';

const sortOptions: { value: SortOption; label: string }[] = [
	{ value: 'newest', label: 'Newest first' },
	{ value: 'oldest', label: 'Oldest first' },
	{ value: 'name-asc', label: 'Name (A-Z)' },
	{ value: 'name-desc', label: 'Name (Z-A)' },
];

export function CVList({
	cvs,
	onPreview,
	onEdit,
	onDelete,
	onDownload,
}: { cvs: CVCardProps['cv'][] } & Omit<CVCardProps, 'cv'>) {
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

			<Paper elevation={0} variant="outlined" className="overflow-hidden">
				{filteredAndSortedCVs.length === 0 ? (
					<div className="p-6 text-center">
						<Typography variant="body1" color="text.secondary">
							{searchQuery
								? 'No CVs match your search criteria'
								: 'No CVs found. Create your first CV to get started!'}
						</Typography>
						{searchQuery && (
							<Typography variant="body2" color="text.secondary" className="mt-1">
								Try adjusting your search or clear the filter to see all CVs
							</Typography>
						)}
					</div>
				) : (
					<List className="p-0">
						<AnimatePresence mode="popLayout">
							{filteredAndSortedCVs.map((cv, index) => (
								<motion.div
									key={cv.id}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, height: 0 }}
									transition={{ duration: 0.2, delay: index * 0.05 }}
								>
									<ListItem className="flex items-center py-3">
										<div className="min-w-0 flex-grow">
											<Typography variant="subtitle1" className="font-medium">
												{cv.title || 'Untitled CV'}
											</Typography>
											<Typography variant="body2" className="text-gray-500">
												Last modified:{' '}
												{format(new Date(cv.metadata?.lastModified || cv.updatedAt), 'MMM d, yyyy')}
											</Typography>
										</div>
										<div className="ml-4 flex items-center gap-2">
											<Button
												startIcon={<VisibilityIcon />}
												onClick={() => onPreview(cv.id)}
												size="small"
												className="text-gray-700 hover:text-blue-600"
											>
												Preview
											</Button>
											<Button
												startIcon={<EditIcon />}
												onClick={() => onEdit(cv.id)}
												size="small"
												className="text-gray-700 hover:text-blue-600"
											>
												Edit
											</Button>
											<Button
												startIcon={<DownloadIcon />}
												onClick={() => onDownload(cv.id)}
												size="small"
												className="text-gray-700 hover:text-blue-600"
											>
												Download
											</Button>
											<Button
												startIcon={<DeleteIcon />}
												onClick={() => onDelete(cv.id)}
												size="small"
												className="text-red-600 hover:text-red-700"
											>
												Delete
											</Button>
										</div>
									</ListItem>
									{index < filteredAndSortedCVs.length - 1 && <Divider />}
								</motion.div>
							))}
						</AnimatePresence>
					</List>
				)}
			</Paper>
		</div>
	);
}
