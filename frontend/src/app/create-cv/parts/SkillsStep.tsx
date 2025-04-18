'use client';

import { Box, TextField, Button, Chip, Autocomplete } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const skillsSchema = z.object({
	skills: z.array(z.string()).min(1, 'At least one skill is required'),
	hobbies: z.string().optional(),
});

export type SkillsData = z.infer<typeof skillsSchema>;

interface SkillsStepProps {
	onNext: (data: SkillsData) => void;
	onBack: () => void;
}

const commonSkills = [
	'JavaScript',
	'TypeScript',
	'React',
	'Node.js',
	'Python',
	'Java',
	'C++',
	'SQL',
	'HTML',
	'CSS',
	'Git',
	'Docker',
	'AWS',
	'Azure',
	'Agile',
	'Scrum',
];

export function SkillsStep({ onNext, onBack }: SkillsStepProps) {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<SkillsData>({
		resolver: zodResolver(skillsSchema),
		defaultValues: {
			skills: [],
			hobbies: '',
		},
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
			<Controller
				name="skills"
				control={control}
				render={({ field: { onChange, value } }) => (
					<Autocomplete
						multiple
						freeSolo
						options={commonSkills}
						value={value}
						onChange={(_, newValue) => onChange(newValue)}
						renderTags={(value, getTagProps) =>
							value.map((option, index) => (
								<Chip variant="outlined" label={option} {...getTagProps({ index })} />
							))
						}
						renderInput={(params) => (
							<TextField
								{...params}
								label="Skills"
								placeholder="Type or select skills"
								error={!!errors.skills}
								helperText={errors.skills?.message}
							/>
						)}
					/>
				)}
			/>

			<Controller
				name="hobbies"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						label="Hobbies & Interests"
						placeholder="Type your hobbies"
						error={!!errors.hobbies}
						helperText={errors.hobbies?.message}
						fullWidth
						multiline
						rows={2}
					/>
				)}
			/>

			<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
				<Button onClick={onBack}>Back</Button>
				<Button type="submit" variant="contained">
					Next
				</Button>
			</Box>
		</Box>
	);
}
