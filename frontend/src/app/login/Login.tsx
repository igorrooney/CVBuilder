'use client';

import { Button } from '@/components/UI/button';
import { Input } from '@/components/UI/input';
import { Label } from '@/components/UI/label';
import { useLogin } from '@/hooks/useLogin';
import { ILoginPayload } from '@/types/LoginTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const loginSchema = z.object({
	email: z.string().email('Invalid email address').nonempty('Email is required'),
	password: z.string().nonempty('Password is required'),
});

export default function Login() {
	const router = useRouter();
	const queryClient = useQueryClient();

	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginPayload>({
		resolver: zodResolver(loginSchema),
	});

	// Destructure the mutate function (login) and loading state
	const loginMutation = useLogin();

	const onSubmit = (data: ILoginPayload) => {
		setErrorMessage(null); // Clear any previous error message
		loginMutation.mutate(data);
	};

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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
					Sign in to your account
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				{errorMessage && (
					<div className="mb-4 rounded-md bg-red-100 p-2 text-center text-sm text-red-600">
						{errorMessage}
					</div>
				)}

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					<div>
						<Label htmlFor="email" className="block text-sm font-medium text-gray-900">
							Email address
						</Label>
						<div className="mt-2">
							<Input
								id="email"
								type="email"
								{...register('email')}
								className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 shadow-sm focus:outline-indigo-600"
							/>
							{errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
						</div>
					</div>

					<div>
						<div className="flex items-center justify-between">
							<Label htmlFor="password" className="block text-sm font-medium text-gray-900">
								Password
							</Label>
						</div>
						<div className="mt-2">
							<Input
								id="password"
								type="password"
								{...register('password')}
								className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 shadow-sm focus:outline-indigo-600"
							/>
							{errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
						</div>
					</div>

					<div>
						<Button
							type="submit"
							disabled={loginMutation.isPending}
							className="shadow-xs flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500"
						>
							{loginMutation.isPending ? 'Logging in...' : 'Sign in'}
						</Button>
					</div>
				</form>

				<p className="mt-10 text-center text-sm text-gray-500">
					Not a member?{' '}
					<Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
						Register now
					</Link>
				</p>
			</div>
		</div>
	);
}
