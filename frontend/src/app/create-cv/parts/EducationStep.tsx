'use client';

import { Box, TextField, Button, IconButton } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const educationSchema = z.object({
	education: z
		.array(
			z.object({
				institution: z
					.string()
					.min(1, 'Institution name is required')
					.max(100, 'Institution name is too long'),
				degree: z.string().min(1, 'Degree is required').max(100, 'Degree is too long'),
				graduationYear: z
					.string()
					.min(1, 'Graduation year is required')
					.max(4, 'Invalid graduation year'),
			}),
		)
		.min(1, 'At least one education entry is required'),
});

export type EducationData = z.infer<typeof educationSchema>;

interface EducationStepProps {
	onNext: (data: EducationData) => void;
	onBack: () => void;
}

export function EducationStep({ onNext, onBack }: EducationStepProps) {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<EducationData>({
		resolver: zodResolver(educationSchema),
		defaultValues: {
			education: [
				{
					institution: '',
					degree: '',
					graduationYear: '',
				},
			],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'education',
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
			{fields.map((field, index) => (
				<Box
					key={field.id}
					sx={{
						p: 2,
						border: '1px solid',
						borderColor: 'divider',
						borderRadius: 1,
						position: 'relative',
					}}
				>
					{fields.length > 1 && (
						<IconButton
							onClick={() => remove(index)}
							sx={{ position: 'absolute', top: 8, right: 8 }}
						>
							<DeleteIcon />
						</IconButton>
					)}
					<TextField
						label="Institution"
						{...register(`education.${index}.institution`)}
						error={!!errors.education?.[index]?.institution}
						helperText={errors.education?.[index]?.institution?.message}
						fullWidth
						sx={{ mb: 2 }}
					/>
					<TextField
						label="Degree"
						{...register(`education.${index}.degree`)}
						error={!!errors.education?.[index]?.degree}
						helperText={errors.education?.[index]?.degree?.message}
						fullWidth
						sx={{ mb: 2 }}
					/>
					<TextField
						label="Graduation Year"
						type="number"
						{...register(`education.${index}.graduationYear`)}
						error={!!errors.education?.[index]?.graduationYear}
						helperText={errors.education?.[index]?.graduationYear?.message}
						fullWidth
					/>
				</Box>
			))}

			<Button
				startIcon={<AddIcon />}
				onClick={() =>
					append({
						institution: '',
						degree: '',
						graduationYear: '',
					})
				}
				sx={{ alignSelf: 'flex-start' }}
			>
				Add Education
			</Button>

			<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
				<Button onClick={onBack}>Back</Button>
				<Button type="submit" variant="contained">
					Next
				</Button>
			</Box>
		</Box>
	);
}
