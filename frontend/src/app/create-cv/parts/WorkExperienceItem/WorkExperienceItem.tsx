'use client';

import { Control } from 'react-hook-form';
import { Box, Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormData } from '../schema/schema';

interface WorkExperienceItemProps {
	control: Control<FormData>;
	index: number;
	errors: any;
	remove: () => void;
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

	return (
		<Box
			sx={{
				p: 2,
				border: '1px solid',
				borderColor: 'divider',
				borderRadius: 1,
			}}
		>
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
			<Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={remove}>
				Remove Experience
			</Button>
		</Box>
	);
}
