'use client';

import React from 'react';
import { Button } from '@/components/UI/button';
import HomeNav from '@/components/UI/HomeNav';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitStatus('idle');

		// Simulate form submission
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setSubmitStatus('success');
			setFormData({ name: '', email: '', subject: '', message: '' });
		} catch (error) {
			setSubmitStatus('error');
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
			<HomeNav />

			{/* Hero Section */}
			<section className="py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">Get in Touch</h1>
						<p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
							Have questions about our British CV service? We're here to help you succeed in your
							career journey.
						</p>
					</div>
				</div>
			</section>

			{/* Contact Form & Info */}
			<section className="pb-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="grid gap-12 lg:grid-cols-2">
						{/* Contact Form */}
						<div className="rounded-xl bg-white p-8 shadow-sm">
							<h2 className="mb-6 text-2xl font-bold text-gray-900">Send us a Message</h2>

							{submitStatus === 'success' && (
								<div className="mb-6 rounded-lg bg-green-50 p-4 text-green-800">
									Thank you for your message! We'll get back to you within 24 hours.
								</div>
							)}

							{submitStatus === 'error' && (
								<div className="mb-6 rounded-lg bg-red-50 p-4 text-red-800">
									Something went wrong. Please try again or contact us directly.
								</div>
							)}

							<form onSubmit={handleSubmit} className="space-y-6">
								<div className="grid gap-6 md:grid-cols-2">
									<div>
										<label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
											Full Name *
										</label>
										<input
											type="text"
											id="name"
											required
											value={formData.name}
											onChange={(e) => handleInputChange('name', e.target.value)}
											className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
											placeholder="Your full name"
										/>
									</div>
									<div>
										<label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
											Email Address *
										</label>
										<input
											type="email"
											id="email"
											required
											value={formData.email}
											onChange={(e) => handleInputChange('email', e.target.value)}
											className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
											placeholder="your.email@example.com"
										/>
									</div>
								</div>

								<div>
									<label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-700">
										Subject *
									</label>
									<input
										type="text"
										id="subject"
										required
										value={formData.subject}
										onChange={(e) => handleInputChange('subject', e.target.value)}
										className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
										placeholder="How can we help you?"
									/>
								</div>

								<div>
									<label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
										Message *
									</label>
									<textarea
										id="message"
										required
										rows={6}
										value={formData.message}
										onChange={(e) => handleInputChange('message', e.target.value)}
										className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
										placeholder="Tell us more about your inquiry..."
									/>
								</div>

								<Button
									type="submit"
									disabled={isSubmitting}
									className="w-full bg-blue-600 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
								>
									{isSubmitting ? (
										'Sending...'
									) : (
										<>
											<Send className="mr-2 h-5 w-5" />
											Send Message
										</>
									)}
								</Button>
							</form>
						</div>

						{/* Contact Information */}
						<div className="space-y-8">
							<div>
								<h2 className="mb-6 text-2xl font-bold text-gray-900">Contact Information</h2>
								<p className="mb-8 text-gray-600">
									We're here to help you create the perfect British CV. Reach out to us through any
									of these channels.
								</p>
							</div>

							<div className="space-y-6">
								<div className="flex items-start">
									<div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
										<Mail className="h-6 w-6 text-blue-600" />
									</div>
									<div className="ml-4">
										<h3 className="text-lg font-semibold text-gray-900">Email Support</h3>
										<p className="text-gray-600">support@britishcvbuilder.com</p>
										<p className="text-sm text-gray-500">We typically respond within 24 hours</p>
									</div>
								</div>

								<div className="flex items-start">
									<div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
										<Phone className="h-6 w-6 text-green-600" />
									</div>
									<div className="ml-4">
										<h3 className="text-lg font-semibold text-gray-900">Phone Support</h3>
										<p className="text-gray-600">+44 (0) 20 1234 5678</p>
										<p className="text-sm text-gray-500">Monday - Friday, 9 AM - 6 PM GMT</p>
									</div>
								</div>

								<div className="flex items-start">
									<div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
										<MapPin className="h-6 w-6 text-purple-600" />
									</div>
									<div className="ml-4">
										<h3 className="text-lg font-semibold text-gray-900">Office Address</h3>
										<p className="text-gray-600">
											British CV Builder Ltd
											<br />
											123 Innovation Street
											<br />
											London, EC1A 1BB
											<br />
											United Kingdom
										</p>
									</div>
								</div>

								<div className="flex items-start">
									<div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
										<Clock className="h-6 w-6 text-orange-600" />
									</div>
									<div className="ml-4">
										<h3 className="text-lg font-semibold text-gray-900">Business Hours</h3>
										<p className="text-gray-600">
											Monday - Friday: 9:00 AM - 6:00 PM GMT
											<br />
											Saturday: 10:00 AM - 4:00 PM GMT
											<br />
											Sunday: Closed
										</p>
									</div>
								</div>
							</div>

							{/* FAQ Quick Links */}
							<div className="rounded-xl bg-gray-50 p-6">
								<h3 className="mb-4 text-lg font-semibold text-gray-900">Quick Help</h3>
								<div className="space-y-2">
									<a href="/help" className="block text-blue-600 hover:text-blue-800">
										Help Center →
									</a>
									<a href="/faq" className="block text-blue-600 hover:text-blue-800">
										Frequently Asked Questions →
									</a>
									<a href="/pricing" className="block text-blue-600 hover:text-blue-800">
										Pricing Information →
									</a>
								</div>
							</div>
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
						Don't wait - start building your career success story today with our British CV service.
					</p>
					<Button
						size="lg"
						className="bg-white px-8 py-3 text-lg font-semibold text-blue-600 hover:bg-gray-100"
					>
						Start Creating Now
					</Button>
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
