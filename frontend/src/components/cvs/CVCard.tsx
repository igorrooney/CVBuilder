'use client';

import { CVCardProps } from '@/types/cv';
import {
	Delete as DeleteIcon,
	Download as DownloadIcon,
	Edit as EditIcon,
	Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { Box, ButtonBase, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

const ActionButton = ({
	icon: Icon,
	label,
	onClick,
	variant = 'default',
}: {
	icon: React.ElementType;
	label: string;
	onClick: () => void;
	variant?: 'default' | 'danger';
}) => (
	<ButtonBase
		onClick={onClick}
		className={`
			flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium
			transition-all duration-200 ease-in-out
			${
				variant === 'danger'
					? 'text-red-600 hover:bg-red-50 active:bg-red-100'
					: 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
			}
		`}
	>
		<Icon className={`h-4 w-4 ${variant === 'danger' ? 'text-red-500' : 'text-gray-500'}`} />
		{label}
	</ButtonBase>
);

export function CVCard({ cv, onPreview, onEdit, onDelete, onDownload }: CVCardProps) {
	const handleEdit = () => onEdit(cv.id);
	const handleDelete = () => onDelete(cv.id);
	const handleDownload = () => onDownload(cv.id);
	const handlePreview = () => onPreview(cv.id);

	return (
		<MotionCard
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			whileHover={{ scale: 1.02 }}
			transition={{ duration: 0.2 }}
			className="relative overflow-hidden bg-white"
			sx={{
				'borderRadius': '12px',
				'boxShadow': '0 2px 8px rgba(0, 0, 0, 0.08)',
				'&:hover': {
					boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12)',
				},
			}}
		>
			<Box className="relative h-44">
				<CardMedia
					component="img"
					height="176"
					image={cv.thumbnail || '/placeholder-cv.png'}
					alt={cv.title}
					className="h-full w-full object-cover"
				/>
				<Box className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
				<Box className="absolute bottom-0 left-0 right-0 p-4">
					<Typography variant="h6" className="line-clamp-2 font-medium text-white">
						{cv.title}
					</Typography>
					<Typography variant="caption" className="text-gray-200">
						Last modified:{' '}
						{format(new Date(cv.metadata?.lastModified || cv.updatedAt), 'MMM d, yyyy')}
					</Typography>
				</Box>
			</Box>

			<CardContent className="p-3">
				<Stack
					direction="row"
					spacing={1}
					className="-mx-3 mt-2 flex-wrap items-center border-t border-gray-100 px-3 pt-3"
				>
					<ActionButton icon={VisibilityIcon} label="Preview" onClick={handlePreview} />
					<ActionButton icon={EditIcon} label="Edit" onClick={handleEdit} />
					<ActionButton icon={DownloadIcon} label="Download" onClick={handleDownload} />
					<Box className="flex-grow" />
					<ActionButton icon={DeleteIcon} label="Delete" onClick={handleDelete} variant="danger" />
				</Stack>
			</CardContent>
		</MotionCard>
	);
}
