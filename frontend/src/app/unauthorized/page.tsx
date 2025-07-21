'use client';

import { Button } from '@/components/UI/button';
import HomeNav from '@/components/UI/HomeNav';
import { Shield, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function UnauthorizedPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
			<HomeNav />

			<div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
				<div className="w-full max-w-md text-center">
					{/* Icon */}
					<div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
						<Shield className="h-12 w-12 text-red-600" />
					</div>

					{/* Content */}
					<h1 className="mb-4 text-4xl font-bold text-gray-900">Access Denied</h1>
					<p className="mb-8 text-lg text-gray-600">
						Sorry, you don't have permission to access this page. If you believe this is an error,
						please contact our support team.
					</p>

					{/* Actions */}
					<div className="space-y-4">
						<Link href="/" className="block">
							<Button className="w-full bg-blue-600 hover:bg-blue-700">
								<Home className="mr-2 h-5 w-5" />
								Go to Homepage
							</Button>
						</Link>

						<Link href="/contact" className="block">
							<Button variant="outline" className="w-full">
								Contact Support
							</Button>
						</Link>

						<button
							onClick={() => window.history.back()}
							className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
						>
							<ArrowLeft className="mr-2 h-4 w-4" />
							Go Back
						</button>
					</div>

					{/* Additional Info */}
					<div className="mt-12 rounded-lg bg-gray-50 p-6">
						<h3 className="mb-2 text-sm font-semibold text-gray-900">Need Help?</h3>
						<p className="mb-4 text-sm text-gray-600">
							If you're trying to access a specific feature, you may need to:
						</p>
						<ul className="space-y-1 text-left text-sm text-gray-600">
							<li>• Upgrade your subscription plan</li>
							<li>• Contact your account administrator</li>
							<li>• Verify your account permissions</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
