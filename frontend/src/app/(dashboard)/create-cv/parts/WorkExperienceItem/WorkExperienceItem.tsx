'use client';

import { Control } from 'react-hook-form';
import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	TextField,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Paper,
	alpha,
} from '@mui/material';
import { Trash2 } from 'lucide-react';
import { FormData } from '../schema/schema';
import { useState } from 'react';

interface WorkExperienceItemProps {
	control: Control<FormData>;
	index: number;
	errors: any;
	remove: (index: number) => void;
	watch: any;
}

export default function WorkExperienceItem({
	control,
	index,
	errors,
	remove,
	watch,
}: WorkExperienceItemProps) {
	const isCurrent = watch(`experience.${index}.isCurrent`);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	const handleDelete = (e: React.MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		setIsDeleteDialogOpen(true);
	};

	const handleConfirmDelete = (e: React.MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		remove(index);
		setIsDeleteDialogOpen(false);
	};

	const handleCancelDelete = (e: React.MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		setIsDeleteDialogOpen(false);
	};

	return (
		<>
			<Paper
				elevation={0}
				sx={{
					'p': 3,
					'mb': 3,
					'borderRadius': 2,
					'border': '1px solid',
					'borderColor': 'divider',
					'position': 'relative',
					'transition': 'all 0.2s ease-in-out',
					'&:hover': {
						'boxShadow': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
						'& .delete-button': {
							opacity: 1,
							transform: 'translateX(0)',
						},
					},
				}}
			>
				<div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-2">
					<h3 className="text-sm font-medium text-gray-700">
						{index === 0 ? 'Most Recent Experience' : `Previous Experience ${index}`}
					</h3>
					{index > 0 && (
						<Button
							startIcon={<Trash2 className="h-4 w-4" />}
							onClick={handleDelete}
							color="error"
							variant="text"
							size="small"
							className="delete-button"
							sx={{
								'opacity': 0.85,
								'transform': 'translateX(10px)',
								'transition': 'all 0.2s ease-in-out',
								'&:hover': {
									backgroundColor: (theme) => alpha(theme.palette.error.main, 0.08),
									transform: 'translateX(0)',
								},
							}}
							type="button"
							onMouseDown={(e) => e.preventDefault()}
						>
							Remove
						</Button>
					)}
				</div>

				<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
					<TextField
						label="Job Title"
						error={!!errors?.experience?.[index]?.jobTitle}
						helperText={errors?.experience?.[index]?.jobTitle?.message}
						{...control.register(`experience.${index}.jobTitle`)}
						fullWidth
						sx={{ mr: 2 }}
					/>
					<TextField
						label="Company"
						error={!!errors?.experience?.[index]?.company}
						helperText={errors?.experience?.[index]?.company?.message}
						{...control.register(`experience.${index}.company`)}
						fullWidth
					/>
				</Box>
				<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
					<TextField
						label="Start Date"
						type="date"
						error={!!errors?.experience?.[index]?.startDate}
						helperText={errors?.experience?.[index]?.startDate?.message}
						{...control.register(`experience.${index}.startDate`)}
						InputLabelProps={{ shrink: true }}
						sx={{ mr: 2 }}
					/>
					{!isCurrent && (
						<TextField
							label="End Date"
							type="date"
							error={!!errors?.experience?.[index]?.endDate}
							helperText={errors?.experience?.[index]?.endDate?.message}
							{...control.register(`experience.${index}.endDate`)}
							InputLabelProps={{ shrink: true }}
							sx={{ mr: 2 }}
						/>
					)}
					<FormControlLabel
						control={<Checkbox {...control.register(`experience.${index}.isCurrent`)} />}
						label="Current Position"
					/>
				</Box>
				<TextField
					label="Responsibilities"
					multiline
					rows={3}
					error={!!errors?.experience?.[index]?.responsibilities}
					helperText={errors?.experience?.[index]?.responsibilities?.message}
					{...control.register(`experience.${index}.responsibilities`)}
					fullWidth
					sx={{ mb: 2 }}
				/>
				<TextField
					label="Achievements"
					multiline
					rows={3}
					error={!!errors?.experience?.[index]?.achievements}
					helperText={errors?.experience?.[index]?.achievements?.message}
					{...control.register(`experience.${index}.achievements`)}
					fullWidth
					sx={{ mb: 2 }}
				/>

				<Dialog
					open={isDeleteDialogOpen}
					onClose={handleCancelDelete}
					aria-labelledby="delete-experience-dialog-title"
					onClick={(e) => e.stopPropagation()}
				>
					<DialogTitle id="delete-experience-dialog-title">Remove Work Experience</DialogTitle>
					<DialogContent>
						Are you sure you want to remove this work experience? This action cannot be undone.
					</DialogContent>
					<DialogActions>
						<Button
							onClick={handleCancelDelete}
							type="button"
							onMouseDown={(e) => e.preventDefault()}
							color="inherit"
						>
							Cancel
						</Button>
						<Button
							onClick={handleConfirmDelete}
							color="error"
							variant="contained"
							type="button"
							onMouseDown={(e) => e.preventDefault()}
						>
							Remove
						</Button>
					</DialogActions>
				</Dialog>
			</Paper>
		</>
	);
}
