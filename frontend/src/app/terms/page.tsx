'use client';

import { Button } from '@/components/UI/button';
import HomeNav from '@/components/UI/HomeNav';
import Link from 'next/link';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function TermsPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
			<HomeNav />

			{/* Hero Section */}
			<section className="py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">Terms of Service</h1>
						<p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
							Please read these terms carefully before using our British CV creation service.
						</p>
						<p className="text-sm text-gray-500">
							Last updated: {new Date().toLocaleDateString('en-GB')}
						</p>
					</div>
				</div>
			</section>

			{/* Terms Content */}
			<section className="pb-20">
				<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
					<div className="prose prose-lg max-w-none">
						<div className="rounded-xl bg-white p-8 shadow-sm">
							<h2 className="mb-6 text-2xl font-bold text-gray-900">1. Acceptance of Terms</h2>
							<p className="mb-6 text-gray-600">
								By accessing and using British CV Builder ("the Service"), you accept and agree to
								be bound by the terms and provision of this agreement. If you do not agree to abide
								by the above, please do not use this service.
							</p>

							<h2 className="mb-6 text-2xl font-bold text-gray-900">2. Description of Service</h2>
							<p className="mb-6 text-gray-600">
								British CV Builder provides an online platform for creating professional CVs and
								resumes. Our service includes CV templates, editing tools, PDF export functionality,
								and related features designed to help users create professional documents for job
								applications.
							</p>

							<h2 className="mb-6 text-2xl font-bold text-gray-900">3. User Accounts</h2>
							<h3 className="mb-4 text-xl font-semibold text-gray-900">3.1 Account Creation</h3>
							<p className="mb-4 text-gray-600">
								To use certain features of our service, you must create an account. You agree to
								provide accurate, current, and complete information during registration and to
								update such information to keep it accurate, current, and complete.
							</p>
							<h3 className="mb-4 text-xl font-semibold text-gray-900">3.2 Account Security</h3>
							<p className="mb-6 text-gray-600">
								You are responsible for safeguarding the password and for all activities that occur
								under your account. You agree to notify us immediately of any unauthorized use of
								your account.
							</p>

							<h2 className="mb-6 text-2xl font-bold text-gray-900">4. User Content</h2>
							<h3 className="mb-4 text-xl font-semibold text-gray-900">4.1 Ownership</h3>
							<p className="mb-4 text-gray-600">
								You retain ownership of all content you create using our service, including CVs,
								resumes, and other documents. You grant us a limited license to store and process
								your content solely for the purpose of providing our service.
							</p>
							<h3 className="mb-4 text-xl font-semibold text-gray-900">
								4.2 Content Responsibility
							</h3>
							<p className="mb-6 text-gray-600">
								You are solely responsible for the content you create and upload. You represent and
								warrant that your content does not violate any applicable laws or regulations,
								infringe on third-party rights, or contain malicious code.
							</p>

							<h2 className="mb-6 text-2xl font-bold text-gray-900">5. Subscription and Payment</h2>
							<h3 className="mb-4 text-xl font-semibold text-gray-900">5.1 Subscription Plans</h3>
							<p className="mb-4 text-gray-600">
								We offer various subscription plans with different features and pricing. All prices
								are in British Pounds (GBP) and are subject to change with notice.
							</p>
							<h3 className="mb-4 text-xl font-semibold text-gray-900">5.2 Payment Terms</h3>
							<p className="mb-4 text-gray-600">
								Payment is due at the time of subscription purchase. We use secure third-party
								payment processors to handle all transactions. You authorize us to charge your
								payment method for all fees incurred.
							</p>
							<h3 className="mb-4 text-xl font-semibold text-gray-900">
								5.3 Cancellation and Refunds
							</h3>
							<p className="mb-6 text-gray-600">
								You may cancel your subscription at any time. We offer a 30-day money-back guarantee
								for new subscriptions. Refunds are processed within 5-10 business days.
							</p>

							<h2 className="mb-6 text-2xl font-bold text-gray-900">6. Acceptable Use</h2>
							<p className="mb-4 text-gray-600">You agree not to use our service to:</p>
							<ul className="mb-6 list-disc pl-6 text-gray-600">
								<li>
									Create content that is illegal, harmful, threatening, abusive, or defamatory
								</li>
								<li>Impersonate any person or entity or misrepresent your affiliation</li>
								<li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
								<li>Use automated tools to access or interact with our service</li>
								<li>Interfere with or disrupt the service or servers</li>
								<li>Violate any applicable laws or regulations</li>
							</ul>

							<h2 className="mb-6 text-2xl font-bold text-gray-900">7. Intellectual Property</h2>
							<h3 className="mb-4 text-xl font-semibold text-gray-900">7.1 Our Rights</h3>
							<p className="mb-4 text-gray-600">
								The service, including all software, templates, designs, and content, is owned by
								British CV Builder Ltd and is protected by copyright, trademark, and other
								intellectual property laws.
							</p>
							<h3 className="mb-4 text-xl font-semibold text-gray-900">7.2 License</h3>
							<p className="mb-6 text-gray-600">
								We grant you a limited, non-exclusive, non-transferable license to use our service
								for personal or business purposes in accordance with these terms.
							</p>

							<h2 className="mb-6 text-2xl font-bold text-gray-900">
								8. Privacy and Data Protection
							</h2>
							<p className="mb-6 text-gray-600">
								Your privacy is important to us. Our collection and use of personal information is
								governed by our Privacy Policy, which is incorporated into these terms by reference.
							</p>

							<h2 className="mb-6 text-2xl font-bold text-gray-900">9. Disclaimers</h2>
							<p className="mb-4 text-gray-600">
								Our service is provided "as is" without warranties of any kind. We do not guarantee:
							</p>
							<ul className="mb-6 list-disc pl-6 text-gray-600">
								<li>That the service will be uninterrupted or error-free</li>
								<li>That CVs created will result in job offers or interviews</li>
								<li>The accuracy or completeness of any templates or content</li>
								<li>Compatibility with all devices or browsers</li>
							</ul>

							<h2 className="mb-6 text-2xl font-bold text-gray-900">10. Limitation of Liability</h2>
							<p className="mb-6 text-gray-600">
								To the maximum extent permitted by law, British CV Builder Ltd shall not be liable
								for any indirect, incidental, special, consequential, or punitive damages, including
								but not limited to loss of profits, data, or use, arising out of or relating to your
								use of our service.
							</p>

							<h2 className="mb-6 text-2xl font-bold text-gray-900">11. Indemnification</h2>
							<p className="mb-6 text-gray-600">
								You agree to indemnify and hold harmless British CV Builder Ltd from any claims,
								damages, or expenses arising from your use of the service or violation of these
								terms.
							</p>

							<h2 className="mb-6 text-2xl font-bold text-gray-900">12. Termination</h2>
							<p className="mb-6 text-gray-600">
								We may terminate or suspend your account and access to our service at any time, with
								or without cause, with or without notice. Upon termination, your right to use the
								service will cease immediately.
							</p>

							<h2 className="mb-6 text-2xl font-bold text-gray-900">13. Governing Law</h2>
							<p className="mb-6 text-gray-600">
								These terms shall be governed by and construed in accordance with the laws of
								England and Wales. Any disputes shall be subject to the exclusive jurisdiction of
								the courts of England and Wales.
							</p>

							<h2 className="mb-6 text-2xl font-bold text-gray-900">14. Changes to Terms</h2>
							<p className="mb-6 text-gray-600">
								We reserve the right to modify these terms at any time. We will notify users of
								material changes by posting the new terms on our website. Your continued use of the
								service after such changes constitutes acceptance of the updated terms.
							</p>

							<h2 className="mb-6 text-2xl font-bold text-gray-900">15. Contact Information</h2>
							<p className="mb-4 text-gray-600">
								If you have any questions about these Terms of Service, please contact us:
							</p>
							<div className="mb-6 rounded-lg bg-gray-50 p-4">
								<p className="text-gray-600">
									<strong>Email:</strong> legal@britishcvbuilder.com
									<br />
									<strong>Address:</strong> British CV Builder Ltd, 123 Innovation Street, London,
									EC1A 1BB, United Kingdom
									<br />
									<strong>Phone:</strong> +44 (0) 20 1234 5678
								</p>
							</div>

							<div className="mt-8 border-t pt-6">
								<p className="text-sm text-gray-500">
									These Terms of Service are effective as of{' '}
									{new Date().toLocaleDateString('en-GB')} and supersede all previous versions.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20">
				<div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
					<h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Ready to Get Started?</h2>
					<p className="mb-8 text-xl text-blue-100">
						Now that you understand our terms, create your professional British CV today.
					</p>
					<div className="flex flex-col justify-center gap-4 sm:flex-row">
						<Link href="/create-cv">
							<Button
								size="lg"
								className="bg-white px-8 py-3 text-lg font-semibold text-blue-600 hover:bg-gray-100"
							>
								Create Your CV
							</Button>
						</Link>
						<Link href="/contact">
							<Button
								variant="outline"
								size="lg"
								className="border-white px-8 py-3 text-lg text-white hover:bg-white hover:text-blue-600"
							>
								Contact Us
							</Button>
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
}
