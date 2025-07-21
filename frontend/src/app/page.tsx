'use client';

import Link from 'next/link';
import { Button } from '@/components/UI/button';
import HomeNav from '@/components/UI/HomeNav';
import { useLoggedInUser } from '@/hooks/useLoggedInUser';
import {
	FileText,
	Download,
	Edit3,
	Shield,
	Zap,
	Users,
	CheckCircle,
	ArrowRight,
} from 'lucide-react';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function Home() {
	const { user, isLoading } = useLoggedInUser();

	// Show loading state
	if (isLoading) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
				<HomeNav />
				<div className="flex h-screen items-center justify-center">
					<div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
			<HomeNav />
			{/* Hero Section */}
			<section className="relative overflow-hidden">
				<div className="mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 lg:px-8">
					<div className="text-center">
						<div className="mb-6 flex justify-center">
							<div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
								<FileText className="mr-2 h-4 w-4" />
								British CV Builder
							</div>
						</div>

						<h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
							Create Professional
							<span className="block text-blue-600">British CVs in Minutes</span>
						</h1>

						<p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-gray-600">
							Create stunning, UK-standard CVs that stand out to British employers. Our professional
							British CV creation service helps you showcase your skills and experience effectively
							for the UK job market.
						</p>

						<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
							<Link href="/create-cv">
								<Button
									size="lg"
									className="bg-blue-600 px-8 py-3 text-lg text-white hover:bg-blue-700"
								>
									<Edit3 className="mr-2 h-5 w-5" />
									{user ? 'Create New CV' : 'Create Your CV'}
								</Button>
							</Link>
							{!user && (
								<Link href="/login">
									<Button
										variant="outline"
										size="lg"
										className="border-blue-600 px-8 py-3 text-lg text-blue-600 hover:bg-blue-50"
									>
										<Users className="mr-2 h-5 w-5" />
										Sign In
									</Button>
								</Link>
							)}
						</div>
					</div>
				</div>

				{/* Decorative elements */}
				<div className="absolute left-10 top-20 h-20 w-20 rounded-full bg-blue-200 opacity-20"></div>
				<div className="absolute right-20 top-40 h-16 w-16 rounded-full bg-indigo-200 opacity-20"></div>
				<div className="absolute bottom-20 left-20 h-12 w-12 rounded-full bg-blue-300 opacity-30"></div>
			</section>

			{/* Features Section */}
			<section className="bg-white py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mb-16 text-center">
						<h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
							Why Choose Our British CV Service?
						</h2>
						<p className="mx-auto max-w-2xl text-xl text-gray-600">
							Professional British CV creation service designed to help you stand out
						</p>
					</div>

					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						<div className="rounded-xl bg-gray-50 p-6 text-center transition-colors hover:bg-gray-100">
							<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
								<Edit3 className="h-8 w-8 text-blue-600" />
							</div>
							<h3 className="mb-2 text-xl font-semibold text-gray-900">Professional Creation</h3>
							<p className="text-gray-600">
								Expert British CV creation service with professional formatting and structure
							</p>
						</div>

						<div className="rounded-xl bg-gray-50 p-6 text-center transition-colors hover:bg-gray-100">
							<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
								<CheckCircle className="h-8 w-8 text-green-600" />
							</div>
							<h3 className="mb-2 text-xl font-semibold text-gray-900">UK Job Market Ready</h3>
							<p className="text-gray-600">
								Templates designed for the UK job market and British recruitment standards
							</p>
						</div>

						<div className="rounded-xl bg-gray-50 p-6 text-center transition-colors hover:bg-gray-100">
							<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
								<Download className="h-8 w-8 text-purple-600" />
							</div>
							<h3 className="mb-2 text-xl font-semibold text-gray-900">PDF Export</h3>
							<p className="text-gray-600">
								Export your British CV in high-quality PDF format for professional applications
							</p>
						</div>

						<div className="rounded-xl bg-gray-50 p-6 text-center transition-colors hover:bg-gray-100">
							<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
								<Zap className="h-8 w-8 text-orange-600" />
							</div>
							<h3 className="mb-2 text-xl font-semibold text-gray-900">British CV Format</h3>
							<p className="text-gray-600">
								Professional UK-standard CV format that impresses British employers
							</p>
						</div>

						<div className="rounded-xl bg-gray-50 p-6 text-center transition-colors hover:bg-gray-100">
							<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
								<Shield className="h-8 w-8 text-red-600" />
							</div>
							<h3 className="mb-2 text-xl font-semibold text-gray-900">Secure & Private</h3>
							<p className="text-gray-600">
								Your data is protected with enterprise-grade security measures
							</p>
						</div>

						<div className="rounded-xl bg-gray-50 p-6 text-center transition-colors hover:bg-gray-100">
							<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
								<Users className="h-8 w-8 text-indigo-600" />
							</div>
							<h3 className="mb-2 text-xl font-semibold text-gray-900">Collaborative</h3>
							<p className="text-gray-600">Share and collaborate with mentors or career advisors</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20">
				<div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
					<h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
						{user ? 'Ready to Create Another British CV?' : 'Ready to Create Your British CV?'}
					</h2>
					<p className="mb-8 text-xl text-blue-100">
						{user
							? 'Continue building your professional portfolio with our British CV service'
							: 'Join thousands of professionals who have landed their dream jobs with our British CV service'}
					</p>
					<div className="flex flex-col justify-center gap-4 sm:flex-row">
						<Link href="/create-cv">
							<Button
								size="lg"
								className="bg-white px-8 py-3 text-lg font-semibold text-blue-600 hover:bg-gray-100"
							>
								{user ? 'Create New CV' : 'Start Building Now'}
								<ArrowRight className="ml-2 h-5 w-5" />
							</Button>
						</Link>
						{!user && (
							<Link href="/register">
								<Button
									variant="outline"
									size="lg"
									className="border-white px-8 py-3 text-lg text-white hover:bg-white hover:text-blue-600"
								>
									Create Free Account
								</Button>
							</Link>
						)}
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gray-900 py-12 text-white">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="grid gap-8 md:grid-cols-4">
						<div>
							<h3 className="mb-4 text-xl font-bold">British CV Builder</h3>
							<p className="text-gray-400">
								Professional British CV creation service made simple and effective.
							</p>
						</div>
						<div>
							<h4 className="mb-4 font-semibold">Product</h4>
							<ul className="space-y-2 text-gray-400">
								<li>
									<Link href="/create-cv" className="hover:text-white">
										Create CV
									</Link>
								</li>
								<li>
									<Link href="/cvs" className="hover:text-white">
										My CVs
									</Link>
								</li>
								<li>
									<Link href="/pricing" className="hover:text-white">
										Pricing
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="mb-4 font-semibold">Company</h4>
							<ul className="space-y-2 text-gray-400">
								<li>
									<Link href="/about" className="hover:text-white">
										About
									</Link>
								</li>
								<li>
									<Link href="/contact" className="hover:text-white">
										Contact
									</Link>
								</li>
								<li>
									<Link href="/privacy" className="hover:text-white">
										Privacy
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h4 className="mb-4 font-semibold">Support</h4>
							<ul className="space-y-2 text-gray-400">
								<li>
									<Link href="/help" className="hover:text-white">
										Help Center
									</Link>
								</li>
								<li>
									<Link href="/faq" className="hover:text-white">
										FAQ
									</Link>
								</li>
								<li>
									<Link href="/contact" className="hover:text-white">
										Contact Us
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
						<p>&copy; 2024 CV Builder. All rights reserved.</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
