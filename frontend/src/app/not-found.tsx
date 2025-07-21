'use client';

import { Button } from '@/components/UI/button';
import HomeNav from '@/components/UI/HomeNav';
import { Search, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
	const router = useRouter();

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
			<HomeNav />

			<div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
				<div className="w-full max-w-md text-center">
					{/* Icon */}
					<div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
						<Search className="h-12 w-12 text-gray-600" />
					</div>

					{/* Content */}
					<h1 className="mb-4 text-4xl font-bold text-gray-900">Page Not Found</h1>
					<p className="mb-8 text-lg text-gray-600">
						Sorry, the page you're looking for doesn't exist. It might have been moved, deleted, or
						you entered the wrong URL.
					</p>

					{/* Actions */}
					<div className="space-y-4">
						<Link href="/" className="block">
							<Button className="w-full bg-blue-600 hover:bg-blue-700">
								<Home className="mr-2 h-5 w-5" />
								Go to Homepage
							</Button>
						</Link>

						<Link href="/create-cv" className="block">
							<Button variant="outline" className="w-full">
								Create Your CV
							</Button>
						</Link>

						<button
							onClick={() => router.back()}
							className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
						>
							<ArrowLeft className="mr-2 h-4 w-4" />
							Go Back
						</button>
					</div>

					{/* Popular Pages */}
					<div className="mt-12 rounded-lg bg-gray-50 p-6">
						<h3 className="mb-4 text-sm font-semibold text-gray-900">Popular Pages</h3>
						<div className="grid gap-2 text-sm">
							<Link href="/create-cv" className="block text-blue-600 hover:text-blue-800">
								Create CV
							</Link>
							<Link href="/pricing" className="block text-blue-600 hover:text-blue-800">
								Pricing
							</Link>
							<Link href="/help" className="block text-blue-600 hover:text-blue-800">
								Help Center
							</Link>
							<Link href="/contact" className="block text-blue-600 hover:text-blue-800">
								Contact Us
							</Link>
						</div>
					</div>

					{/* Error Code */}
					<div className="mt-8 text-center">
						<p className="text-sm text-gray-500">Error 404</p>
					</div>
				</div>
			</div>
		</div>
	);
}
