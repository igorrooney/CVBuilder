'use client';

import { Button } from '@/components/UI/button';
import HomeNav from '@/components/UI/HomeNav';
import { Check, Star } from 'lucide-react';
import Link from 'next/link';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function PricingPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
			<HomeNav />

			{/* Hero Section */}
			<section className="py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
							Simple, Transparent Pricing
						</h1>
						<p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
							Choose the perfect plan for your CV creation needs. All plans include our professional
							British CV templates.
						</p>
					</div>
				</div>
			</section>

			{/* Pricing Cards */}
			<section className="pb-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="grid gap-8 lg:grid-cols-3">
						{/* Free Plan */}
						<div className="rounded-xl border bg-white p-8 shadow-sm">
							<div className="mb-6">
								<h3 className="text-2xl font-bold text-gray-900">Free</h3>
								<div className="mt-2 flex items-baseline">
									<span className="text-4xl font-bold text-gray-900">£0</span>
									<span className="ml-1 text-gray-500">/month</span>
								</div>
								<p className="mt-2 text-sm text-gray-500">Perfect for getting started</p>
							</div>

							<ul className="mb-8 space-y-3">
								<li className="flex items-center">
									<Check className="mr-3 h-5 w-5 text-green-500" />
									<span className="text-gray-700">1 CV template</span>
								</li>
								<li className="flex items-center">
									<Check className="mr-3 h-5 w-5 text-green-500" />
									<span className="text-gray-700">Basic CV creation</span>
								</li>
								<li className="flex items-center">
									<Check className="mr-3 h-5 w-5 text-green-500" />
									<span className="text-gray-700">PDF download</span>
								</li>
								<li className="flex items-center">
									<Check className="mr-3 h-5 w-5 text-green-500" />
									<span className="text-gray-700">Email support</span>
								</li>
							</ul>

							<Link href="/register" className="block">
								<Button variant="outline" className="w-full">
									Get Started Free
								</Button>
							</Link>
						</div>

						{/* Pro Plan */}
						<div className="relative rounded-xl border-2 border-blue-500 bg-white p-8 shadow-lg">
							<div className="absolute -top-4 left-1/2 -translate-x-1/2">
								<span className="inline-flex items-center rounded-full bg-blue-500 px-4 py-1 text-sm font-semibold text-white">
									<Star className="mr-1 h-4 w-4" />
									Most Popular
								</span>
							</div>

							<div className="mb-6">
								<h3 className="text-2xl font-bold text-gray-900">Pro</h3>
								<div className="mt-2 flex items-baseline">
									<span className="text-4xl font-bold text-gray-900">£9.99</span>
									<span className="ml-1 text-gray-500">/month</span>
								</div>
								<p className="mt-2 text-sm text-gray-500">For serious job seekers</p>
							</div>

							<ul className="mb-8 space-y-3">
								<li className="flex items-center">
									<Check className="mr-3 h-5 w-5 text-green-500" />
									<span className="text-gray-700">All CV templates (5+)</span>
								</li>
								<li className="flex items-center">
									<Check className="mr-3 h-5 w-5 text-green-500" />
									<span className="text-gray-700">Unlimited CVs</span>
								</li>
								<li className="flex items-center">
									<Check className="mr-3 h-5 w-5 text-green-500" />
									<span className="text-gray-700">Advanced customization</span>
								</li>
								<li className="flex items-center">
									<Check className="mr-3 h-5 w-5 text-green-500" />
									<span className="text-gray-700">Priority support</span>
								</li>
								<li className="flex items-center">
									<Check className="mr-3 h-5 w-5 text-green-500" />
									<span className="text-gray-700">CV analytics</span>
								</li>
								<li className="flex items-center">
									<Check className="mr-3 h-5 w-5 text-green-500" />
									<span className="text-gray-700">Export to Word</span>
								</li>
							</ul>

							<Link href="/register" className="block">
								<Button className="w-full bg-blue-600 hover:bg-blue-700">Start Pro Trial</Button>
							</Link>
						</div>

						{/* Enterprise Plan */}
						<div className="rounded-xl border bg-white p-8 shadow-sm">
							<div className="mb-6">
								<h3 className="text-2xl font-bold text-gray-900">Enterprise</h3>
								<div className="mt-2 flex items-baseline">
									<span className="text-4xl font-bold text-gray-900">£29.99</span>
									<span className="ml-1 text-gray-500">/month</span>
								</div>
								<p className="mt-2 text-sm text-gray-500">For teams and organizations</p>
							</div>

							<ul className="mb-8 space-y-3">
								<li className="flex items-center">
									<Check className="mr-3 h-5 w-5 text-green-500" />
									<span className="text-gray-700">Everything in Pro</span>
								</li>
								<li className="flex items-center">
									<Check className="mr-3 h-5 w-5 text-green-500" />
									<span className="text-gray-700">Team collaboration</span>
								</li>
								<li className="flex items-center">
									<Check className="mr-3 h-5 w-5 text-green-500" />
									<span className="text-gray-700">Brand customization</span>
								</li>
								<li className="flex items-center">
									<Check className="mr-3 h-5 w-5 text-green-500" />
									<span className="text-gray-700">API access</span>
								</li>
								<li className="flex items-center">
									<Check className="mr-3 h-5 w-5 text-green-500" />
									<span className="text-gray-700">Dedicated support</span>
								</li>
								<li className="flex items-center">
									<Check className="mr-3 h-5 w-5 text-green-500" />
									<span className="text-gray-700">SSO integration</span>
								</li>
							</ul>

							<Link href="/contact" className="block">
								<Button variant="outline" className="w-full">
									Contact Sales
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section className="bg-white py-20">
				<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
					<div className="mb-12 text-center">
						<h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
					</div>

					<div className="space-y-8">
						<div>
							<h3 className="mb-2 text-lg font-semibold text-gray-900">
								Can I cancel my subscription anytime?
							</h3>
							<p className="text-gray-600">
								Yes, you can cancel your subscription at any time. You'll continue to have access
								until the end of your billing period.
							</p>
						</div>

						<div>
							<h3 className="mb-2 text-lg font-semibold text-gray-900">Do you offer refunds?</h3>
							<p className="text-gray-600">
								We offer a 30-day money-back guarantee. If you're not satisfied, contact our support
								team.
							</p>
						</div>

						<div>
							<h3 className="mb-2 text-lg font-semibold text-gray-900">
								Can I switch between plans?
							</h3>
							<p className="text-gray-600">
								Yes, you can upgrade or downgrade your plan at any time. Changes take effect
								immediately.
							</p>
						</div>

						<div>
							<h3 className="mb-2 text-lg font-semibold text-gray-900">Is my data secure?</h3>
							<p className="text-gray-600">
								Absolutely. We use enterprise-grade security measures to protect your personal
								information and CV data.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20">
				<div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
					<h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
						Ready to Create Your Professional CV?
					</h2>
					<p className="mb-8 text-xl text-blue-100">
						Join thousands of professionals who have landed their dream jobs with our British CV
						service.
					</p>
					<div className="flex flex-col justify-center gap-4 sm:flex-row">
						<Link href="/register">
							<Button
								size="lg"
								className="bg-white px-8 py-3 text-lg font-semibold text-blue-600 hover:bg-gray-100"
							>
								Start Free Trial
							</Button>
						</Link>
						<Link href="/contact">
							<Button
								variant="outline"
								size="lg"
								className="border-white px-8 py-3 text-lg text-white hover:bg-white hover:text-blue-600"
							>
								Contact Sales
							</Button>
						</Link>
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
