'use client';

import { Box, TextField, Button, IconButton } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const educationSchema = z.object({
	education: z.array(
		z.object({
			institution: z.string().min(1, 'Institution name is required'),
			degree: z.string().min(1, 'Degree is required'),
			graduationYear: z.string().min(1, 'Graduation year is required'),
			fieldOfStudy: z.string().optional(),
			grade: z.string().optional(),
		}),
	),
});

type EducationData = z.infer<typeof educationSchema>;

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
					fieldOfStudy: '',
					grade: '',
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
						label="Field of Study"
						{...register(`education.${index}.fieldOfStudy`)}
						error={!!errors.education?.[index]?.fieldOfStudy}
						helperText={errors.education?.[index]?.fieldOfStudy?.message}
						fullWidth
						sx={{ mb: 2 }}
					/>
					<Box sx={{ display: 'flex', gap: 2 }}>
						<TextField
							label="Graduation Year"
							type="number"
							{...register(`education.${index}.graduationYear`)}
							error={!!errors.education?.[index]?.graduationYear}
							helperText={errors.education?.[index]?.graduationYear?.message}
							fullWidth
						/>
						<TextField
							label="Grade"
							{...register(`education.${index}.grade`)}
							error={!!errors.education?.[index]?.grade}
							helperText={errors.education?.[index]?.grade?.message}
							fullWidth
						/>
					</Box>
				</Box>
			))}

			<Button
				startIcon={<AddIcon />}
				onClick={() =>
					append({
						institution: '',
						degree: '',
						graduationYear: '',
						fieldOfStudy: '',
						grade: '',
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
