import { Control, Controller, UseFormWatch } from 'react-hook-form';
import { FormData } from '../schema/schema';
import { memo, useState } from 'react';
import {
	Box,
	Checkbox,
	FormControlLabel,
	TextField,
	Paper,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	alpha,
} from '@mui/material';
import { Trash2 } from 'lucide-react';
import FormInput from '../FormInput';

interface WorkExperienceItemProps {
	control: Control<FormData>;
	index: number;
	errors: any;
	remove: (index: number) => void;
	watch: UseFormWatch<FormData>;
}

const WorkExperienceItem: React.FC<WorkExperienceItemProps> = memo(
	({ control, index, errors, remove, watch }) => {
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
							name={`experience.${index}.jobTitle`}
							control={control}
							label="Job Title"
							error={!!errors.experience?.[index]?.jobTitle}
							helperText={errors.experience?.[index]?.jobTitle?.message}
						/>
						<FormInput
							name={`experience.${index}.company`}
							control={control}
							label="Company"
							error={!!errors.experience?.[index]?.company}
							helperText={errors.experience?.[index]?.company?.message}
						/>
					</Box>

					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
							gap: 2,
							mt: 2,
						}}
					>
						<Controller
							name={`experience.${index}.startDate`}
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									label="Start Date"
									type="date"
									InputLabelProps={{ shrink: true }}
									fullWidth
									error={!!errors.experience?.[index]?.startDate}
									helperText={errors.experience?.[index]?.startDate?.message}
								/>
							)}
						/>

						<Controller
							name={`experience.${index}.isCurrent`}
							control={control}
							render={({ field: { value: isCurrentJob } }) => (
								<Controller
									name={`experience.${index}.endDate`}
									control={control}
									render={({ field }) => (
										<TextField
											{...field}
											label="End Date"
											type="date"
											InputLabelProps={{ shrink: true }}
											fullWidth
											disabled={isCurrentJob === true}
											error={!!errors.experience?.[index]?.endDate}
											helperText={errors.experience?.[index]?.endDate?.message}
										/>
									)}
								/>
							)}
						/>
					</Box>

					<Controller
						name={`experience.${index}.isCurrent`}
						control={control}
						render={({ field: { value, ...field } }) => (
							<FormControlLabel
								control={<Checkbox {...field} checked={value || false} color="primary" />}
								label="Current Position"
								sx={{ mt: 1 }}
							/>
						)}
					/>

					<FormInput
						name={`experience.${index}.responsibilities`}
						control={control}
						label="Responsibilities"
						multiline
						rows={3}
						error={!!errors.experience?.[index]?.responsibilities}
						helperText={errors.experience?.[index]?.responsibilities?.message}
					/>

					<FormInput
						name={`experience.${index}.achievements`}
						control={control}
						label="Achievements"
						multiline
						rows={3}
						error={!!errors.experience?.[index]?.achievements}
						helperText={errors.experience?.[index]?.achievements?.message}
					/>
				</Paper>

				<Dialog
					open={isDeleteDialogOpen}
					onClose={handleCancelDelete}
					aria-labelledby="delete-dialog-title"
				>
					<DialogTitle id="delete-dialog-title">Remove Work Experience</DialogTitle>
					<DialogContent>
						Are you sure you want to remove this work experience? This action cannot be undone.
					</DialogContent>
					<DialogActions>
						<Button onClick={handleCancelDelete} color="inherit">
							Cancel
						</Button>
						<Button onClick={handleConfirmDelete} color="error" variant="contained" autoFocus>
							Remove
						</Button>
					</DialogActions>
				</Dialog>
			</>
		);
	},
);

WorkExperienceItem.displayName = 'WorkExperienceItem';

export default WorkExperienceItem;
