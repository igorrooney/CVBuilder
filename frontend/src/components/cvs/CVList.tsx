'use client';

import {
	List,
	ListItem,
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
	Grid,
	Card,
	CardContent,
	CardActions,
	IconButton,
	Box,
	useMediaQuery,
	useTheme,
	Menu,
	ListItemIcon,
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
	MoreVert as MoreVertIcon,
	ViewList,
	ViewModule,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

type SortOption = 'newest' | 'oldest' | 'name-asc' | 'name-desc';
type ViewMode = 'grid' | 'list';

const sortOptions: { value: SortOption; label: string }[] = [
	{ value: 'newest', label: 'Newest first' },
	{ value: 'oldest', label: 'Oldest first' },
	{ value: 'name-asc', label: 'Name (A-Z)' },
	{ value: 'name-desc', label: 'Name (Z-A)' },
];

interface CVListProps extends Omit<CVCardProps, 'cv'> {
	cvs: CVCardProps['cv'][];
	viewMode: ViewMode;
	onViewModeChange: (mode: ViewMode) => void;
}

export function CVList({
	cvs,
	onPreview,
	onEdit,
	onDelete,
	onDownload,
	viewMode,
	onViewModeChange,
}: CVListProps) {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const [searchQuery, setSearchQuery] = useState('');
	const [sortBy, setSortBy] = useState<SortOption>('newest');
	const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
	const [selectedCVId, setSelectedCVId] = useState<string | null>(null);

	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, cvId: string) => {
		setMenuAnchorEl(event.currentTarget);
		setSelectedCVId(cvId);
	};

	const handleMenuClose = () => {
		setMenuAnchorEl(null);
		setSelectedCVId(null);
	};

	const handleAction = (action: (id: string) => void) => {
		if (selectedCVId) {
			action(selectedCVId);
			handleMenuClose();
		}
	};

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

	const renderCVCard = (cv: CVCardProps['cv'], index: number) => {
		const cardContent = (
			<>
				<Typography variant="subtitle1" className="max-w-full truncate font-medium">
					{cv.title || 'Untitled CV'}
				</Typography>
				<Typography variant="body2" color="text.secondary" className="truncate text-sm">
					Last modified:{' '}
					{format(new Date(cv.metadata?.lastModified || cv.updatedAt), 'MMM d, yyyy')}
				</Typography>
			</>
		);

		if (viewMode === 'grid') {
			return (
				<Grid item xs={12} sm={6} md={4} key={cv.id}>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.2, delay: index * 0.05 }}
					>
						<Card>
							<CardContent>{cardContent}</CardContent>
							<Divider />
							<CardActions>
								{isMobile ? (
									<Box
										className="flex space-x-1 p-2"
										sx={{
											justifyContent: 'space-evenly',
											width: '100%',
										}}
									>
										<IconButton
											size="small"
											sx={{
												width: '28px',
												height: '28px',
											}}
											onClick={() => onPreview(cv.id)}
											color="primary"
										>
											<VisibilityIcon fontSize="small" />
										</IconButton>
										<IconButton
											size="small"
											sx={{
												width: '28px',
												height: '28px',
											}}
											onClick={() => onEdit(cv.id)}
											color="primary"
										>
											<EditIcon fontSize="small" />
										</IconButton>
										<IconButton
											size="small"
											sx={{
												width: '28px',
												height: '28px',
											}}
											onClick={() => onDownload(cv.id)}
											color="primary"
										>
											<DownloadIcon fontSize="small" />
										</IconButton>
										<IconButton
											size="small"
											sx={{
												width: '28px',
												height: '28px',
											}}
											onClick={() => onDelete(cv.id)}
											color="error"
										>
											<DeleteIcon fontSize="small" />
										</IconButton>
									</Box>
								) : (
									<Box
										className="flex space-x-1 p-2"
										sx={{
											justifyContent: 'space-evenly',
											width: '100%',
										}}
									>
										<IconButton
											size="small"
											sx={{
												width: '20px',
												height: '20px',
											}}
											onClick={() => onPreview(cv.id)}
											color="primary"
										>
											<VisibilityIcon fontSize="small" />
										</IconButton>
										<IconButton
											size="small"
											sx={{
												width: '20px',
												height: '20px',
											}}
											onClick={() => onEdit(cv.id)}
											color="primary"
										>
											<EditIcon fontSize="small" />
										</IconButton>
										<IconButton
											size="small"
											sx={{
												width: '20px',
												height: '20px',
											}}
											onClick={() => onDownload(cv.id)}
											color="primary"
										>
											<DownloadIcon fontSize="small" />
										</IconButton>
										<IconButton
											size="small"
											sx={{
												width: '20px',
												height: '20px',
											}}
											onClick={() => onDelete(cv.id)}
											color="error"
										>
											<DeleteIcon fontSize="small" />
										</IconButton>
									</Box>
								)}
							</CardActions>
						</Card>
					</motion.div>
				</Grid>
			);
		}

		return (
			<motion.div
				key={cv.id}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, height: 0 }}
				transition={{ duration: 0.2, delay: index * 0.05 }}
				className="w-full"
			>
				<ListItem className="flex items-center justify-between py-2">
					<Box className="min-w-0 flex-grow overflow-hidden">{cardContent}</Box>
					<Box className="flex shrink-0 items-center space-x-2">
						{isMobile ? (
							<IconButton size="small" onClick={(e) => handleMenuOpen(e, cv.id)} color="primary">
								<MoreVertIcon fontSize="small" />
							</IconButton>
						) : (
							<>
								<Button
									startIcon={<VisibilityIcon />}
									onClick={() => onPreview(cv.id)}
									size="small"
									variant="text"
									color="primary"
								>
									Preview
								</Button>
								<Button
									startIcon={<EditIcon />}
									onClick={() => onEdit(cv.id)}
									size="small"
									variant="text"
									color="primary"
								>
									Edit
								</Button>
								<Button
									startIcon={<DownloadIcon />}
									onClick={() => onDownload(cv.id)}
									size="small"
									variant="text"
									color="primary"
								>
									Download
								</Button>
								<Button
									startIcon={<DeleteIcon />}
									onClick={() => onDelete(cv.id)}
									size="small"
									variant="text"
									color="error"
								>
									Delete
								</Button>
							</>
						)}
					</Box>
				</ListItem>
				{index < filteredAndSortedCVs.length - 1 && <Divider />}
			</motion.div>
		);
	};

	return (
		<Box className="w-full overflow-hidden">
			<Box className="max-w-full px-4 md:px-6">
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Box className="flex flex-col items-center gap-4 sm:flex-row" mt={1}>
							<Box className="flex w-full flex-grow flex-col gap-4 sm:flex-row">
								<TextField
									placeholder="Search CVs..."
									variant="outlined"
									size="small"
									className="w-full sm:max-w-md"
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<Search className="text-gray-400" fontSize="small" />
											</InputAdornment>
										),
									}}
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
								<FormControl variant="outlined" size="small" className="w-full sm:w-[200px]">
									<InputLabel id="sort-select-label">Sort by</InputLabel>
									<Select
										labelId="sort-select-label"
										value={sortBy}
										onChange={(e) => setSortBy(e.target.value as SortOption)}
										label="Sort by"
									>
										{sortOptions.map((option) => (
											<MenuItem key={option.value} value={option.value}>
												{option.label}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Box>
							<Button
								variant="outlined"
								size="medium"
								onClick={() => onViewModeChange(viewMode === 'grid' ? 'list' : 'grid')}
								className="w-full whitespace-nowrap sm:w-auto"
								startIcon={viewMode === 'grid' ? <ViewList /> : <ViewModule />}
							>
								{viewMode === 'grid' ? 'List View' : 'Grid View'}
							</Button>
						</Box>
					</Grid>

					<Grid item xs={12}>
						{filteredAndSortedCVs.length === 0 ? (
							<Box className="p-4 text-center">
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
							</Box>
						) : viewMode === 'grid' ? (
							<Grid container spacing={2} className="w-full">
								<AnimatePresence mode="popLayout">
									{filteredAndSortedCVs.map((cv, index) => renderCVCard(cv, index))}
								</AnimatePresence>
							</Grid>
						) : (
							<List className="w-full">
								<AnimatePresence mode="popLayout">
									{filteredAndSortedCVs.map((cv, index) => renderCVCard(cv, index))}
								</AnimatePresence>
							</List>
						)}
					</Grid>
				</Grid>
			</Box>

			<Menu
				anchorEl={menuAnchorEl}
				open={Boolean(menuAnchorEl)}
				onClose={handleMenuClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
			>
				<MenuItem onClick={() => handleAction(onPreview)}>
					<ListItemIcon>
						<VisibilityIcon fontSize="small" />
					</ListItemIcon>
					Preview
				</MenuItem>
				<MenuItem onClick={() => handleAction(onEdit)}>
					<ListItemIcon>
						<EditIcon fontSize="small" />
					</ListItemIcon>
					Edit
				</MenuItem>
				<MenuItem onClick={() => handleAction(onDownload)}>
					<ListItemIcon>
						<DownloadIcon fontSize="small" />
					</ListItemIcon>
					Download
				</MenuItem>
				<MenuItem onClick={() => handleAction(onDelete)} className="text-red-600">
					<ListItemIcon>
						<DeleteIcon fontSize="small" className="text-red-600" />
					</ListItemIcon>
					Delete
				</MenuItem>
			</Menu>
		</Box>
	);
}
