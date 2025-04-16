'use client';

import { Button } from '@/components/UI/button';
import { Input } from '@/components/UI/input';
import { Label } from '@/components/UI/label';
import { useLogin } from '@/hooks/useLogin';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Alert, AlertDescription } from '@/components/UI/alert';
import { Loader2 } from 'lucide-react';

const loginSchema = z.object({
	email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
	password: z
		.string()
		.min(1, 'Password is required')
		.min(8, 'Password must be at least 8 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
	const queryClient = useQueryClient();
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const router = useRouter();
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get('callbackUrl');

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setFocus,
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		mode: 'onBlur',
	});

	const loginMutation = useLogin();

	const handleRedirect = () => {
		const redirectUrl = callbackUrl || '/cvc';
		console.log('Redirecting to:', redirectUrl);
		router.push(redirectUrl);
	};

	// Add success handler to the mutation
	useEffect(() => {
		if (loginMutation.isSuccess && loginMutation.data) {
			handleRedirect();
		}
	}, [loginMutation.isSuccess, loginMutation.data]);

	useEffect(() => {
		setFocus('email');
	}, [setFocus]);

	// Log mutation state changes
	useEffect(() => {
		console.log('Login mutation state:', {
			isPending: loginMutation.isPending,
			isSuccess: loginMutation.isSuccess,
			isError: loginMutation.isError,
			error: loginMutation.error,
			data: loginMutation.data,
		});
	}, [
		loginMutation.isPending,
		loginMutation.isSuccess,
		loginMutation.isError,
		loginMutation.error,
		loginMutation.data,
	]);

	const onSubmit = async (data: LoginFormData) => {
		try {
			setErrorMessage(null);
			console.log('Starting login process');

			const result = await loginMutation.mutateAsync({
				email: data.email,
				password: data.password,
			});

			handleRedirect();
		} catch (error) {
			console.error('Login error:', error);
			setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
		}
	};

	// Backup redirection in case immediate redirect fails
	useEffect(() => {
		if (loginMutation.isSuccess && loginMutation.data) {
			handleRedirect();
		}
	}, [loginMutation.isSuccess, loginMutation.data]);

	return (
		<div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<Image
					alt="CVBuilder Logo"
					src="/logo.svg"
					width={48}
					height={48}
					className="mx-auto h-12 w-12"
					priority
				/>
				<h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Sign in to your account
				</h1>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				{errorMessage && (
					<Alert variant="destructive" className="mb-4">
						<AlertDescription>{errorMessage}</AlertDescription>
					</Alert>
				)}

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
					<div>
						<Label htmlFor="email">Email address</Label>
						<div className="mt-2">
							<Input
								id="email"
								type="email"
								autoComplete="email"
								aria-invalid={errors.email ? 'true' : 'false'}
								aria-describedby={errors.email ? 'email-error' : undefined}
								{...register('email')}
							/>
							{errors.email && (
								<p id="email-error" className="mt-2 text-sm text-red-600">
									{errors.email.message}
								</p>
							)}
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<Label htmlFor="password">Password</Label>
							<Link
								href="/forgot-password"
								className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
							>
								Forgot password?
							</Link>
						</div>
						<div className="mt-2">
							<Input
								id="password"
								type="password"
								autoComplete="current-password"
								aria-invalid={errors.password ? 'true' : 'false'}
								aria-describedby={errors.password ? 'password-error' : undefined}
								{...register('password')}
							/>
							{errors.password && (
								<p id="password-error" className="mt-2 text-sm text-red-600">
									{errors.password.message}
								</p>
							)}
						</div>
					</div>

					<div>
						<Button
							type="submit"
							disabled={isSubmitting || loginMutation.isPending}
							className="flex w-full justify-center"
						>
							{isSubmitting || loginMutation.isPending ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Signing in...
								</>
							) : (
								'Sign in'
							)}
						</Button>
					</div>
				</form>

				<p className="mt-10 text-center text-sm text-gray-500">
					Not a member?{' '}
					<Link
						href="/register"
						className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
					>
						Register now
					</Link>
				</p>
			</div>
		</div>
	);
}
