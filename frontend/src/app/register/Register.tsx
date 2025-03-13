'use client';

import { Button } from '@/components/UI/button';
import { Input } from '@/components/UI/input';
import { Label } from '@/components/UI/label';
import { useRegister } from '@/hooks/useRegister';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Control, Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z
	.object({
		firstName: z.string().min(2, 'First name must be at least 2 characters'),
		lastName: z.string().min(2, 'Last name must be at least 2 characters'),
		email: z.string().email('Invalid email address'),
		password: z.string().min(8, 'Password must be at least 8 characters'),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});

type FormData = z.infer<typeof schema>;

type InputFieldProps = {
	label: string;
	type: string;
	name: keyof FormData;
	control: Control<FormData>;
	errors: Record<string, { message?: string }>;
};

const InputField = ({ label, type, name, control, errors }: InputFieldProps) => (
	<div>
		<Label className="block text-sm font-medium text-gray-900" htmlFor={name}>
			{label}
		</Label>
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<Input
					{...field}
					id={name}
					type={type}
					className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 shadow-sm focus:outline-indigo-600"
					autoComplete={type === 'password' ? 'new-password' : 'off'}
					aria-invalid={!!errors[name]}
				/>
			)}
		/>
		{errors[name]?.message && (
			<p className="mt-1 text-sm text-red-700" role="alert" aria-live="assertive">
				{errors[name].message}
			</p>
		)}
	</div>
);

const PasswordStrengthMeter = ({ password }: { password: string }) => {
	const strength = password.length >= 12 ? 'Strong' : password.length >= 8 ? 'Medium' : 'Weak';
	const color =
		strength === 'Strong'
			? 'text-green-600'
			: strength === 'Medium'
				? 'text-yellow-600'
				: 'text-red-600';
	return password ? (
		<p className={`mt-1 text-sm ${color}`} aria-live="polite">
			Password Strength: {strength}
		</p>
	) : null;
};

export default function Register() {
	const router = useRouter();
	const [successMessage, setSuccessMessage] = useState<string>('');
	const [errorMessage, setErrorMessage] = useState<string>('');
	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormData>({ resolver: zodResolver(schema), mode: 'onChange' });

	const { isLoading, registerUser } = useRegister();
	const password = watch('password', '');

	const onSubmit = (data: FormData) => {
		setErrorMessage(''); // Reset error message before submitting
		registerUser(data, {
			onSuccess: () => {
				setSuccessMessage('Registration successful! Redirecting to login...');
				setTimeout(() => {
					router.push('/login');
				}, 2000);
			},
			onError: (error: Error) => {
				const axiosError = error as AxiosError<{ message?: string }>;
				setErrorMessage(
					axiosError.response?.data?.message || 'An error occurred. Please try again.',
				);
			},
		});
	};

	return (
		<main
			className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8"
			aria-hidden="false"
		>
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<Image
					alt="CVBuilder Logo"
					src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
					width={50}
					height={50}
					className="mx-auto"
					priority
				/>
				<h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
					Create an account
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				{!!errorMessage && (
					<div
						className="mb-4 rounded-md bg-red-100 p-3 text-center text-red-700"
						role="alert"
						aria-live="assertive"
					>
						{errorMessage}
					</div>
				)}
				{!!successMessage && (
					<div
						className="mb-4 rounded-md bg-green-100 p-3 text-center text-green-700"
						role="alert"
						aria-live="polite"
					>
						{successMessage}
					</div>
				)}

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<InputField
						label="First Name"
						type="text"
						name="firstName"
						control={control}
						errors={errors}
					/>
					<InputField
						label="Last Name"
						type="text"
						name="lastName"
						control={control}
						errors={errors}
					/>
					<InputField
						label="Email Address"
						type="email"
						name="email"
						control={control}
						errors={errors}
					/>
					<InputField
						label="Password"
						type="password"
						name="password"
						control={control}
						errors={errors}
					/>
					<PasswordStrengthMeter password={password} />
					<InputField
						label="Confirm Password"
						type="password"
						name="confirmPassword"
						control={control}
						errors={errors}
					/>

					<Button
						type="submit"
						className="shadow-xs flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500"
						aria-disabled={isLoading}
					>
						{isLoading ? (
							<span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
						) : (
							'Sign up'
						)}
					</Button>
				</form>

				<p className="mt-10 text-center text-sm text-gray-500">
					Already have an account?{' '}
					<Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
						Sign in
					</Link>
				</p>
			</div>
		</main>
	);
}
