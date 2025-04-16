import { Control } from 'react-hook-form';
import { FormData } from '../schema/schema';
import { memo, useState } from 'react';
import {
	Box,
	Paper,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	alpha,
} from '@mui/material';
import FormInput from '../FormInput';
import { Trash2 } from 'lucide-react';

interface EducationItemProps {
	control: Control<FormData>;
	index: number;
	errors: any;
	remove: (index: number) => void;
}

const EducationItem: React.FC<EducationItemProps> = memo(({ control, index, errors, remove }) => {
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

	const handleDelete = () => {
		setIsDeleteDialogOpen(true);
	};

	const handleConfirmDelete = () => {
		remove(index);
		setIsDeleteDialogOpen(false);
	};

	const handleCancelDelete = () => {
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
						{index === 0 ? 'Most Recent Education' : `Previous Education ${index}`}
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
						>
							Remove
						</Button>
					)}
				</div>

				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
						gap: 2,
					}}
				>
					<FormInput
						name={`education.${index}.institution`}
						control={control}
						label="Institution"
						error={!!errors.education?.[index]?.institution}
						helperText={errors.education?.[index]?.institution?.message}
					/>
					<FormInput
						name={`education.${index}.degree`}
						control={control}
						label="Degree"
						error={!!errors.education?.[index]?.degree}
						helperText={errors.education?.[index]?.degree?.message}
					/>
				</Box>

				<Box sx={{ mt: 2 }}>
					<FormInput
						name={`education.${index}.graduationYear`}
						control={control}
						label="Graduation Year"
						error={!!errors.education?.[index]?.graduationYear}
						helperText={errors.education?.[index]?.graduationYear?.message}
					/>
				</Box>
			</Paper>

			<Dialog
				open={isDeleteDialogOpen}
				onClose={handleCancelDelete}
				aria-labelledby="delete-education-dialog-title"
			>
				<DialogTitle id="delete-education-dialog-title">Remove Education Entry</DialogTitle>
				<DialogContent>
					Are you sure you want to remove this education entry? This action cannot be undone.
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCancelDelete} color="inherit">
						Cancel
					</Button>
					<Button onClick={handleConfirmDelete} color="error" variant="contained">
						Remove
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
});

EducationItem.displayName = 'EducationItem';

export default EducationItem;
