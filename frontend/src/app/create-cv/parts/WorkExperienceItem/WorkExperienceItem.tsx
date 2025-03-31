import { Control, Controller } from 'react-hook-form';
import { FormData } from '../schema/schema';
import { memo } from 'react';
import { Box, Checkbox, FormControlLabel, IconButton, TextField } from '@mui/material';
import FormInput from '../FormInput';
import { DeleteIcon } from 'lucide-react';

interface WorkExperienceItemProps {
	control: Control<FormData>;
	index: number;
	errors: any;
	remove: (index: number) => void;
	watch: any;
}

const WorkExperienceItem: React.FC<WorkExperienceItemProps> = memo(
	({ control, index, errors, remove, watch }) => {
		const isCurrent = watch(`experience.${index}.isCurrent`);
		return (
			<Box
				component="section"
				sx={{
					border: '1px solid #ccc',
					p: 2,
					mb: 2,
					borderRadius: 1,
					position: 'relative',
				}}
				aria-labelledby={`work-experience-heading-${index}`}
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
							margin="normal"
							error={!!errors.experience?.[index]?.startDate}
							helperText={errors.experience?.[index]?.startDate?.message}
							inputProps={{ 'aria-label': 'Start Date' }}
						/>
					)}
				/>
				<Controller
					name={`experience.${index}.isCurrent`}
					control={control}
					render={({ field }) => (
						<FormControlLabel
							label="Currently working here"
							control={<Checkbox {...field} checked={field.value} color="primary" />}
							sx={{ mt: 1 }}
						/>
					)}
				/>
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
							margin="normal"
							disabled={isCurrent}
							error={!!errors.experience?.[index]?.endDate}
							helperText={errors.experience?.[index]?.endDate?.message}
							inputProps={{ 'aria-label': 'End Date' }}
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
				{index > 0 && (
					<IconButton
						onClick={() => remove(index)}
						aria-label="Delete experience"
						sx={{ position: 'absolute', top: 8, right: 8 }}
						color="error"
					>
						<DeleteIcon />
					</IconButton>
				)}
			</Box>
		);
	},
);
WorkExperienceItem.displayName = 'WorkExperienceItem';

export default WorkExperienceItem;
