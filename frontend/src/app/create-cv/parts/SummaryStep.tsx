'use client';

import { Box, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const summarySchema = z.object({
	summary: z.string().min(50, 'Summary should be at least 50 characters long'),
});

type SummaryData = z.infer<typeof summarySchema>;

interface SummaryStepProps {
	onNext: (data: SummaryData) => void;
	onBack: () => void;
}

export function SummaryStep({ onNext, onBack }: SummaryStepProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SummaryData>({
		resolver: zodResolver(summarySchema),
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
			<TextField
				label="Professional Summary"
				multiline
				rows={6}
				{...register('summary')}
				error={!!errors.summary}
				helperText={
					errors.summary?.message ||
					'Write a compelling summary of your professional background, key achievements, and career goals.'
				}
				fullWidth
				placeholder="Example: Results-driven software engineer with 5+ years of experience in developing scalable web applications..."
			/>

			<Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
				<Button onClick={onBack}>Back</Button>
				<Button type="submit" variant="contained">
					Finish
				</Button>
			</Box>
		</Box>
	);
}
