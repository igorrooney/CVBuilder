'use client';

import { Box, TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const personalInfoSchema = z.object({
	firstName: z.string().min(1, 'First name is required'),
	lastName: z.string().min(1, 'Last name is required'),
	email: z.string().email('Invalid email address'),
	phone: z.string().min(1, 'Phone number is required'),
	address: z.string().min(1, 'Address is required'),
});

type PersonalInfoData = z.infer<typeof personalInfoSchema>;

interface PersonalInfoStepProps {
	onNext: (data: PersonalInfoData) => void;
}

export function PersonalInfoStep({ onNext }: PersonalInfoStepProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<PersonalInfoData>({
		resolver: zodResolver(personalInfoSchema),
	});

	return (
		<Box
			component="form"
			onSubmit={handleSubmit(onNext)}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
			}}
		>
			<TextField
				label="First Name"
				{...register('firstName')}
				error={!!errors.firstName}
				helperText={errors.firstName?.message}
				fullWidth
			/>
			<TextField
				label="Last Name"
				{...register('lastName')}
				error={!!errors.lastName}
				helperText={errors.lastName?.message}
				fullWidth
			/>
			<TextField
				label="Email"
				type="email"
				{...register('email')}
				error={!!errors.email}
				helperText={errors.email?.message}
				fullWidth
			/>
			<TextField
				label="Phone"
				{...register('phone')}
				error={!!errors.phone}
				helperText={errors.phone?.message}
				fullWidth
			/>
			<TextField
				label="Address"
				{...register('address')}
				error={!!errors.address}
				helperText={errors.address?.message}
				fullWidth
				multiline
				rows={2}
			/>
			<Button type="submit" variant="contained" sx={{ mt: 2, alignSelf: 'flex-end' }}>
				Next
			</Button>
		</Box>
	);
}
