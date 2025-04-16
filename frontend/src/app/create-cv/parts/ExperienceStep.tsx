'use client';

import { Box, Button, Paper, Typography } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import WorkExperienceItem from './WorkExperienceItem/WorkExperienceItem';

const experienceSchema = z.object({
	experiences: z.array(
		z.object({
			jobTitle: z.string().min(1, 'Job title is required'),
			company: z.string().min(1, 'Company name is required'),
			startDate: z.string().min(1, 'Start date is required'),
			endDate: z.string().optional(),
			isCurrent: z.boolean().optional(),
			responsibilities: z.string().min(1, 'Responsibilities are required'),
			achievements: z.string().optional(),
		}),
	),
});

type ExperienceData = z.infer<typeof experienceSchema>;

interface ExperienceStepProps {
	onNext: (data: ExperienceData) => void;
	onBack: () => void;
}

export function ExperienceStep({ onNext, onBack }: ExperienceStepProps) {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<ExperienceData>({
		resolver: zodResolver(experienceSchema),
		defaultValues: {
			experiences: [
				{
					jobTitle: '',
					company: '',
					startDate: '',
					endDate: '',
					isCurrent: false,
					responsibilities: '',
					achievements: '',
				},
			],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'experiences',
	});

	return (
		<Box
			component="form"
			onSubmit={handleSubmit(onNext)}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 3,
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
							errors={errors}
							remove={remove}
						/>
					))}
					<Button
						variant="contained"
						onClick={() =>
							append({
								jobTitle: '',
								company: '',
								startDate: '',
								endDate: '',
								isCurrent: false,
								responsibilities: '',
								achievements: '',
							})
						}
						sx={{
							'mt': 2,
							'background': 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
							'&:hover': {
								background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
							},
						}}
					>
						Add Experience
					</Button>
				</Paper>
			</Box>

			<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
				<Button
					onClick={onBack}
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
