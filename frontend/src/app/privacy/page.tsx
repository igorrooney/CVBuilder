'use client';

import { Button } from '@/components/UI/button';
import HomeNav from '@/components/UI/HomeNav';
import Link from 'next/link';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function PrivacyPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
			<HomeNav />

			{/* Hero Section */}
			<section className="py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">Privacy Policy</h1>
						<p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
							Your privacy is important to us. This policy explains how we collect, use, and protect
							your personal information.
						</p>
						<p className="text-sm text-gray-500">
							Last updated: {new Date().toLocaleDateString('en-GB')}
						</p>
					</div>
				</div>
			</section>

			{/* Privacy Content */}
			<section className="pb-20">
				<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
					<div className="prose prose-lg max-w-none">
						<div className="rounded-xl bg-white p-8 shadow-sm">
							<h2 className="mb-6 text-2xl font-bold text-gray-900">1. Introduction</h2>
							<p className="mb-6 text-gray-600">
								British CV Builder Ltd ("we", "our", or "us") is committed to protecting your
								privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard
								your information when you use our British CV creation service.
							</p>

							<h2 className="mb-6 text-2xl font-bold text-gray-900">2. Information We Collect</h2>
							<h3 className="mb-4 text-xl font-semibold text-gray-900">2.1 Personal Information</h3>
							<p className="mb-4 text-gray-600">
								We collect information you provide directly to us, including:
							</p>
							<ul className="mb-6 list-disc pl-6 text-gray-600">
								<li>Name and contact information (email address, phone number)</li>
								<li>Account credentials and profile information</li>
								<li>CV content and professional information</li>
								<li>Payment and billing information</li>
								<li>Communications with our support team</li>
							</ul>

							<h3 className="mb-4 text-xl font-semibold text-gray-900">
								2.2 Automatically Collected Information
							</h3>
							<p className="mb-4 text-gray-600">
								We automatically collect certain information when you use our service:
							</p>
							<ul className="mb-6 list-disc pl-6 text-gray-600">
								<li>Device information (IP address, browser type, operating system)</li>
								<li>Usage data (pages visited, features used, time spent)</li>
								<li>Cookies and similar tracking technologies</li>
								<li>Log files and analytics data</li>
							</ul>

							<h2 className="mb-6 text-2xl font-bold text-gray-900">
								3. How We Use Your Information
							</h2>
							<p className="mb-4 text-gray-600">We use the information we collect to:</p>
							<ul className="mb-6 list-disc pl-6 text-gray-600">
								<li>Provide and maintain our CV creation service</li>
								<li>Process your account registration and manage your profile</li>
								<li>Generate and customize your CV documents</li>
								<li>Process payments and manage subscriptions</li>
								<li>Provide customer support and respond to inquiries</li>
								<li>Improve our service and develop new features</li>
								<li>Send important updates and notifications</li>
								<li>Comply with legal obligations</li>
							</ul>

							<h2 className="mb-6 text-2xl font-bold text-gray-900">
								4. Legal Basis for Processing (GDPR)
							</h2>
							<p className="mb-4 text-gray-600">
								Under the General Data Protection Regulation (GDPR), we process your personal data
								based on:
							</p>
							<ul className="mb-6 list-disc pl-6 text-gray-600">
								<li>
									<strong>Contract:</strong> To provide our services under our Terms of Service
								</li>
								<li>
									<strong>Legitimate Interest:</strong> To improve our service and prevent fraud
								</li>
								<li>
									<strong>Consent:</strong> For marketing communications (where applicable)
								</li>
								<li>
									<strong>Legal Obligation:</strong> To comply with applicable laws and regulations
								</li>
							</ul>

							<h2 className="mb-6 text-2xl font-bold text-gray-900">
								5. Information Sharing and Disclosure
							</h2>
							<p className="mb-4 text-gray-600">
								We do not sell, trade, or rent your personal information to third parties. We may
								share your information in the following circumstances:
							</p>
							<ul className="mb-6 list-disc pl-6 text-gray-600">
								<li>
									<strong>Service Providers:</strong> With trusted third-party service providers who
									assist us in operating our service
								</li>
								<li>
									<strong>Legal Requirements:</strong> When required by law or to protect our rights
									and safety
								</li>
								<li>
									<strong>Business Transfers:</strong> In connection with a merger, acquisition, or
									sale of assets
								</li>
								<li>
									<strong>Consent:</strong> With your explicit consent for specific purposes
								</li>
							</ul>

							<h2 className="mb-6 text-2xl font-bold text-gray-900">6. Data Security</h2>
							<p className="mb-6 text-gray-600">
								We implement appropriate technical and organizational security measures to protect
								your personal information against unauthorized access, alteration, disclosure, or
								destruction. These measures include:
							</p>
							<ul className="mb-6 list-disc pl-6 text-gray-600">
								<li>Encryption of data in transit and at rest</li>
								<li>Regular security assessments and updates</li>
								<li>Access controls and authentication measures</li>
								<li>Employee training on data protection</li>
								<li>Incident response procedures</li>
							</ul>

							<h2 className="mb-6 text-2xl font-bold text-gray-900">7. Your Rights (GDPR)</h2>
							<p className="mb-4 text-gray-600">
								Under GDPR, you have the following rights regarding your personal data:
							</p>
							<ul className="mb-6 list-disc pl-6 text-gray-600">
								<li>
									<strong>Access:</strong> Request a copy of your personal data
								</li>
								<li>
									<strong>Rectification:</strong> Correct inaccurate or incomplete data
								</li>
								<li>
									<strong>Erasure:</strong> Request deletion of your personal data
								</li>
								<li>
									<strong>Portability:</strong> Receive your data in a structured format
								</li>
								<li>
									<strong>Restriction:</strong> Limit how we process your data
								</li>
								<li>
									<strong>Objection:</strong> Object to certain types of processing
								</li>
								<li>
									<strong>Withdraw Consent:</strong> Withdraw consent where processing is based on
									consent
								</li>
							</ul>

							<h2 className="mb-6 text-2xl font-bold text-gray-900">8. Data Retention</h2>
							<p className="mb-6 text-gray-600">
								We retain your personal information for as long as necessary to provide our services
								and comply with legal obligations. Account data is typically retained for 7 years
								after account closure, while CV content may be retained for 3 years unless you
								request deletion.
							</p>

							<h2 className="mb-6 text-2xl font-bold text-gray-900">9. Cookies and Tracking</h2>
							<p className="mb-4 text-gray-600">We use cookies and similar technologies to:</p>
							<ul className="mb-6 list-disc pl-6 text-gray-600">
								<li>Remember your preferences and settings</li>
								<li>Analyze how our service is used</li>
								<li>Provide personalized content and features</li>
								<li>Improve our service performance</li>
							</ul>
							<p className="mb-6 text-gray-600">
								You can control cookie settings through your browser preferences. However, disabling
								certain cookies may affect service functionality.
							</p>

							<h2 className="mb-6 text-2xl font-bold text-gray-900">
								10. International Data Transfers
							</h2>
							<p className="mb-6 text-gray-600">
								Your information may be transferred to and processed in countries other than your
								own. We ensure appropriate safeguards are in place to protect your data in
								accordance with this Privacy Policy and applicable data protection laws.
							</p>

							<h2 className="mb-6 text-2xl font-bold text-gray-900">11. Children's Privacy</h2>
							<p className="mb-6 text-gray-600">
								Our service is not intended for children under 16 years of age. We do not knowingly
								collect personal information from children under 16. If you believe we have
								collected such information, please contact us immediately.
							</p>

							<h2 className="mb-6 text-2xl font-bold text-gray-900">12. Changes to This Policy</h2>
							<p className="mb-6 text-gray-600">
								We may update this Privacy Policy from time to time. We will notify you of any
								material changes by posting the new policy on our website and updating the "Last
								updated" date. Your continued use of our service after such changes constitutes
								acceptance of the updated policy.
							</p>

							<h2 className="mb-6 text-2xl font-bold text-gray-900">13. Contact Us</h2>
							<p className="mb-4 text-gray-600">
								If you have any questions about this Privacy Policy or our data practices, please
								contact us:
							</p>
							<div className="mb-6 rounded-lg bg-gray-50 p-4">
								<p className="text-gray-600">
									<strong>Email:</strong> privacy@britishcvbuilder.com
									<br />
									<strong>Address:</strong> British CV Builder Ltd, 123 Innovation Street, London,
									EC1A 1BB, United Kingdom
									<br />
									<strong>Phone:</strong> +44 (0) 20 1234 5678
								</p>
							</div>

							<h2 className="mb-6 text-2xl font-bold text-gray-900">14. Supervisory Authority</h2>
							<p className="mb-6 text-gray-600">
								If you are in the UK or EU and believe we have not addressed your privacy concerns,
								you have the right to lodge a complaint with the Information Commissioner's Office
								(ICO) in the UK or your local data protection authority.
							</p>

							<div className="mt-8 border-t pt-6">
								<p className="text-sm text-gray-500">
									This Privacy Policy is effective as of {new Date().toLocaleDateString('en-GB')}{' '}
									and supersedes all previous versions.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20">
				<div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
					<h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
						Have Questions About Your Privacy?
					</h2>
					<p className="mb-8 text-xl text-blue-100">
						We're committed to transparency and protecting your data. Contact us if you need
						clarification.
					</p>
					<div className="flex flex-col justify-center gap-4 sm:flex-row">
						<Link href="/contact">
							<Button
								size="lg"
								className="bg-white px-8 py-3 text-lg font-semibold text-blue-600 hover:bg-gray-100"
							>
								Contact Us
							</Button>
						</Link>
						<Link href="/help">
							<Button
								variant="outline"
								size="lg"
								className="border-white px-8 py-3 text-lg text-white hover:bg-white hover:text-blue-600"
							>
								Help Center
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
