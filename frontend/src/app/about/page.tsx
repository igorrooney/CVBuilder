'use client';

import { Button } from '@/components/UI/button';
import HomeNav from '@/components/UI/HomeNav';
import { Users, Award, Target, Heart } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
			<HomeNav />

			{/* Hero Section */}
			<section className="py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
							About British CV Builder
						</h1>
						<p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
							We're on a mission to help professionals across the UK create stunning, job-winning
							CVs that stand out in today's competitive job market.
						</p>
					</div>
				</div>
			</section>

			{/* Story Section */}
			<section className="bg-white py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="grid gap-12 lg:grid-cols-2 lg:items-center">
						<div>
							<h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">Our Story</h2>
							<div className="space-y-4 text-lg text-gray-600">
								<p>
									British CV Builder was born from a simple observation: too many talented
									professionals were struggling to get their foot in the door because their CVs
									weren't showcasing their true potential.
								</p>
								<p>
									Founded in 2024, we set out to create a solution that combines the professional
									standards of British recruitment with modern, user-friendly technology. Our team
									of career experts and developers worked together to build a platform that makes CV
									creation both simple and effective.
								</p>
								<p>
									Today, we've helped thousands of professionals across the UK land their dream
									jobs, and we're just getting started.
								</p>
							</div>
						</div>
						<div className="relative">
							<div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-200 p-8">
								<div className="flex h-full items-center justify-center">
									<Users className="h-32 w-32 text-blue-600" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Mission & Values */}
			<section className="py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mb-16 text-center">
						<h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
							Our Mission & Values
						</h2>
						<p className="mx-auto max-w-2xl text-xl text-gray-600">
							We believe everyone deserves the opportunity to showcase their skills and experience
							effectively.
						</p>
					</div>

					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						<div className="text-center">
							<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
								<Target className="h-8 w-8 text-blue-600" />
							</div>
							<h3 className="mb-2 text-xl font-semibold text-gray-900">Our Mission</h3>
							<p className="text-gray-600">
								To democratize professional CV creation by providing accessible, high-quality tools
								that help everyone succeed in their career journey.
							</p>
						</div>

						<div className="text-center">
							<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
								<Award className="h-8 w-8 text-green-600" />
							</div>
							<h3 className="mb-2 text-xl font-semibold text-gray-900">Quality First</h3>
							<p className="text-gray-600">
								We maintain the highest standards in everything we do, from our CV templates to our
								customer support.
							</p>
						</div>

						<div className="text-center">
							<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
								<Heart className="h-8 w-8 text-purple-600" />
							</div>
							<h3 className="mb-2 text-xl font-semibold text-gray-900">User-Centric</h3>
							<p className="text-gray-600">
								Every feature we build is designed with our users in mind, making CV creation as
								simple and effective as possible.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Team Section */}
			<section className="bg-white py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mb-16 text-center">
						<h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Meet Our Team</h2>
						<p className="mx-auto max-w-2xl text-xl text-gray-600">
							We're a passionate team of career experts, designers, and developers dedicated to
							helping you succeed.
						</p>
					</div>

					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						<div className="text-center">
							<div className="mx-auto mb-4 h-32 w-32 rounded-full bg-gradient-to-br from-blue-100 to-indigo-200"></div>
							<h3 className="mb-1 text-xl font-semibold text-gray-900">Sarah Johnson</h3>
							<p className="mb-2 text-blue-600">CEO & Founder</p>
							<p className="text-gray-600">
								15+ years in HR and recruitment. Former Head of Talent at a leading UK tech company.
							</p>
						</div>

						<div className="text-center">
							<div className="mx-auto mb-4 h-32 w-32 rounded-full bg-gradient-to-br from-green-100 to-emerald-200"></div>
							<h3 className="mb-1 text-xl font-semibold text-gray-900">Michael Chen</h3>
							<p className="mb-2 text-blue-600">Head of Product</p>
							<p className="text-gray-600">
								Product leader with expertise in career development platforms and user experience
								design.
							</p>
						</div>

						<div className="text-center">
							<div className="mx-auto mb-4 h-32 w-32 rounded-full bg-gradient-to-br from-purple-100 to-pink-200"></div>
							<h3 className="mb-1 text-xl font-semibold text-gray-900">Emma Thompson</h3>
							<p className="mb-2 text-blue-600">Lead Designer</p>
							<p className="text-gray-600">
								Award-winning designer specializing in professional document design and user
								interfaces.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="grid gap-8 text-center md:grid-cols-4">
						<div>
							<div className="mb-2 text-4xl font-bold text-white">10,000+</div>
							<div className="text-blue-100">CVs Created</div>
						</div>
						<div>
							<div className="mb-2 text-4xl font-bold text-white">5,000+</div>
							<div className="text-blue-100">Happy Users</div>
						</div>
						<div>
							<div className="mb-2 text-4xl font-bold text-white">95%</div>
							<div className="text-blue-100">Success Rate</div>
						</div>
						<div>
							<div className="mb-2 text-4xl font-bold text-white">24/7</div>
							<div className="text-blue-100">Support</div>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20">
				<div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
					<h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
						Ready to Join Our Success Story?
					</h2>
					<p className="mb-8 text-xl text-gray-600">
						Start creating your professional British CV today and take the next step in your career.
					</p>
					<div className="flex flex-col justify-center gap-4 sm:flex-row">
						<Link href="/create-cv">
							<Button
								size="lg"
								className="bg-blue-600 px-8 py-3 text-lg font-semibold text-white hover:bg-blue-700"
							>
								Create Your CV
							</Button>
						</Link>
						<Link href="/contact">
							<Button
								variant="outline"
								size="lg"
								className="border-blue-600 px-8 py-3 text-lg text-blue-600 hover:bg-blue-50"
							>
								Get in Touch
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
