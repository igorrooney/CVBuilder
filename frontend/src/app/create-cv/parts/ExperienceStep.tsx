'use client';

import { Box, Button, Paper, Typography } from '@mui/material';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormData } from './schema/schema';
import AddIcon from '@mui/icons-material/Add';
import WorkExperienceItem from './WorkExperienceItem/WorkExperienceItem';

interface ExperienceStepProps {
	onNext: () => void;
	onBack: () => void;
}

export function ExperienceStep({ onNext, onBack }: ExperienceStepProps) {
	const { control, watch } = useFormContext<FormData>();
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'experience',
	});

	const handleAddExperience = () => {
		append({
			jobTitle: '',
			company: '',
			startDate: '',
			endDate: '',
			isCurrent: false,
			responsibilities: '',
			achievements: '',
		});
	};

	return (
		<Box
			component="form"
			onSubmit={(e) => {
				e.preventDefault();
				onNext();
			}}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
			}}
		>
			<Box component="section" aria-labelledby="work-experience-heading">
				<Typography variant="h6" id="work-experience-heading" gutterBottom>
					Work Experience
				</Typography>
				<Paper elevation={0} sx={{ p: 3, bgcolor: 'background.paper' }}>
					{fields.map((field, index) => (
						<WorkExperienceItem
							key={field.id}
							control={control}
							index={index}
							errors={{}}
							remove={() => remove(index)}
							watch={watch}
						/>
					))}
					<Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddExperience}>
						Add Experience
					</Button>
				</Paper>
			</Box>

			<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
				<Button
					onClick={onBack}
					variant="outlined"
					sx={{
						'color': 'primary.main',
						'textTransform': 'uppercase',
						'&:hover': {
							backgroundColor: 'transparent',
						},
					}}
				>
					Back
				</Button>
				<Button
					type="submit"
					variant="contained"
					sx={{
						'background': 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
						'color': 'white',
						'textTransform': 'uppercase',
						'&:hover': {
							background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
						},
					}}
				>
					Next
				</Button>
			</Box>
		</Box>
	);
}
