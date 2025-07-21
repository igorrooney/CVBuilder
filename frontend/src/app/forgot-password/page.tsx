'use client';

import React from 'react';
import { Button } from '@/components/UI/button';
import HomeNav from '@/components/UI/HomeNav';
import { Mail, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function ForgotPasswordPage() {
	const [email, setEmail] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitStatus('idle');

		// Simulate password reset request
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setSubmitStatus('success');
			setEmail('');
		} catch (error) {
			setSubmitStatus('error');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
			<HomeNav />

			<div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
				<div className="w-full max-w-md">
					{/* Header */}
					<div className="mb-8 text-center">
						<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
							<Mail className="h-8 w-8 text-blue-600" />
						</div>
						<h1 className="text-3xl font-bold text-gray-900">Reset Your Password</h1>
						<p className="mt-2 text-gray-600">
							Enter your email address and we'll send you a link to reset your password.
						</p>
					</div>

					{/* Form */}
					<div className="rounded-xl bg-white p-8 shadow-sm">
						{submitStatus === 'success' && (
							<div className="mb-6 rounded-lg bg-green-50 p-4 text-green-800">
								<h3 className="mb-1 font-semibold">Check Your Email</h3>
								<p className="text-sm">
									We've sent a password reset link to your email address. Please check your inbox
									and follow the instructions.
								</p>
							</div>
						)}

						{submitStatus === 'error' && (
							<div className="mb-6 rounded-lg bg-red-50 p-4 text-red-800">
								<h3 className="mb-1 font-semibold">Something went wrong</h3>
								<p className="text-sm">
									We couldn't send the reset email. Please try again or contact support.
								</p>
							</div>
						)}

						<form onSubmit={handleSubmit} className="space-y-6">
							<div>
								<label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
									Email Address
								</label>
								<input
									type="email"
									id="email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
									placeholder="Enter your email address"
								/>
							</div>

							<Button
								type="submit"
								disabled={isSubmitting}
								className="w-full bg-blue-600 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
							>
								{isSubmitting ? 'Sending...' : 'Send Reset Link'}
							</Button>
						</form>

						{/* Additional Info */}
						<div className="mt-6 rounded-lg bg-gray-50 p-4">
							<h3 className="mb-2 text-sm font-semibold text-gray-900">Need Help?</h3>
							<ul className="space-y-1 text-sm text-gray-600">
								<li>• Check your spam folder if you don't see the email</li>
								<li>• Make sure you're using the email address associated with your account</li>
								<li>• Contact our support team if you continue having issues</li>
							</ul>
						</div>

						{/* Links */}
						<div className="mt-6 text-center">
							<Link
								href="/login"
								className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
							>
								<ArrowLeft className="mr-2 h-4 w-4" />
								Back to Login
							</Link>
						</div>
					</div>

					{/* Footer */}
					<div className="mt-8 text-center text-sm text-gray-600">
						<p>
							Don't have an account?{' '}
							<Link href="/register" className="font-semibold text-blue-600 hover:text-blue-800">
								Sign up here
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
