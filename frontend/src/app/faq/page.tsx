'use client';

import { Button } from '@/components/UI/button';
import HomeNav from '@/components/UI/HomeNav';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface FAQItem {
	id: string;
	question: string;
	answer: string;
	category: string;
}

const faqData: FAQItem[] = [
	// Getting Started
	{
		id: 'how-to-start',
		question: 'How do I create my first CV?',
		answer:
			'Creating your first CV is easy! Simply click "Create CV" on our homepage, sign up for a free account, and follow our step-by-step wizard. You can choose from our professional British CV templates and fill in your information. The process takes about 10-15 minutes.',
		category: 'Getting Started',
	},
	{
		id: 'free-vs-paid',
		question: "What's the difference between free and paid plans?",
		answer:
			'Our free plan includes 1 CV template, basic CV creation, PDF download, and email support. Paid plans (Pro £9.99/month) include all templates, unlimited CVs, advanced customization, priority support, CV analytics, and Word export. Enterprise plans (£29.99/month) add team collaboration and API access.',
		category: 'Getting Started',
	},
	{
		id: 'account-creation',
		question: 'Do I need to create an account?',
		answer:
			"Yes, creating an account is required to save your CVs and access our service. It's free and takes less than a minute. Your account allows you to create multiple CVs, edit them anytime, and download them in various formats.",
		category: 'Getting Started',
	},

	// Templates & Design
	{
		id: 'template-selection',
		question: 'How do I choose the right CV template?',
		answer:
			'Choose a template based on your industry and experience level. Professional templates work well for corporate roles, while creative templates suit design and marketing positions. Consider your target audience - conservative industries prefer traditional layouts, while startups may appreciate modern designs.',
		category: 'Templates & Design',
	},
	{
		id: 'customization',
		question: 'Can I customize the CV templates?',
		answer:
			'Yes! All our templates are fully customizable. You can change colors, fonts, layout sections, and add or remove elements. Pro users get access to advanced customization options including custom branding and more design flexibility.',
		category: 'Templates & Design',
	},
	{
		id: 'british-format',
		question: 'Are your templates suitable for British employers?',
		answer:
			'Absolutely! All our templates are specifically designed for the UK job market and follow British CV standards. They include the right sections (personal statement, work experience, education, skills) and formatting that British recruiters expect.',
		category: 'Templates & Design',
	},

	// Export & Download
	{
		id: 'pdf-export',
		question: 'How do I download my CV as PDF?',
		answer:
			'After creating your CV, click the "Download" button in the top right corner. Select "PDF" format and your CV will be generated and downloaded automatically. The PDF maintains perfect formatting and is ready for job applications.',
		category: 'Export & Download',
	},
	{
		id: 'word-export',
		question: 'Can I export my CV to Word format?',
		answer:
			'Word export is available for Pro and Enterprise subscribers. Click the download button and select "Word" format. This allows you to make final edits in Microsoft Word if needed, though we recommend using our editor for the best results.',
		category: 'Export & Download',
	},
	{
		id: 'file-size',
		question: "What's the file size of downloaded CVs?",
		answer:
			'Our PDF CVs are typically 100-300KB, which is perfect for email attachments and online applications. Word files are usually 50-150KB. Both formats are optimized for fast loading and professional quality.',
		category: 'Export & Download',
	},

	// Account & Billing
	{
		id: 'subscription-cancel',
		question: 'How do I cancel my subscription?',
		answer:
			'You can cancel your subscription anytime from your account settings. Go to Profile > Subscription and click "Cancel Subscription". You\'ll continue to have access until the end of your billing period. No questions asked!',
		category: 'Account & Billing',
	},
	{
		id: 'refund-policy',
		question: 'Do you offer refunds?',
		answer:
			"Yes, we offer a 30-day money-back guarantee. If you're not satisfied with our service, contact our support team within 30 days of your purchase and we'll process a full refund. No questions asked.",
		category: 'Account & Billing',
	},
	{
		id: 'plan-upgrade',
		question: 'Can I upgrade or downgrade my plan?',
		answer:
			"Yes, you can change your plan at any time from your account settings. Upgrades take effect immediately, while downgrades take effect at the end of your current billing period. You'll only pay the difference for upgrades.",
		category: 'Account & Billing',
	},

	// Privacy & Security
	{
		id: 'data-security',
		question: 'Is my personal information secure?',
		answer:
			'Absolutely! We use enterprise-grade security measures including SSL encryption, secure data centers, and regular security audits. Your personal information and CV data are protected and never shared with third parties without your consent.',
		category: 'Privacy & Security',
	},
	{
		id: 'data-deletion',
		question: 'Can I delete my account and data?',
		answer:
			'Yes, you can delete your account and all associated data at any time. Go to Profile > Account Settings > Delete Account. This will permanently remove all your CVs and personal information from our servers.',
		category: 'Privacy & Security',
	},
	{
		id: 'gdpr-compliance',
		question: 'Are you GDPR compliant?',
		answer:
			"Yes, we fully comply with GDPR and UK data protection laws. You have full control over your data including the right to access, rectify, and delete your information. We process data only for the purposes you've consented to.",
		category: 'Privacy & Security',
	},

	// Support
	{
		id: 'support-response',
		question: 'How quickly do you respond to support requests?',
		answer:
			'We typically respond to email support requests within 24 hours, often much sooner. Pro users get priority support with faster response times. For urgent issues, you can also call our support line during business hours.',
		category: 'Support',
	},
	{
		id: 'contact-methods',
		question: 'How can I contact customer support?',
		answer:
			'You can reach us via email at support@britishcvbuilder.com, phone at +44 (0) 20 1234 5678, or through our contact form. We also have a comprehensive help center and FAQ section for self-service support.',
		category: 'Support',
	},
	{
		id: 'business-hours',
		question: 'What are your support hours?',
		answer:
			'Our support team is available Monday-Friday 9 AM-6 PM GMT, and Saturday 10 AM-4 PM GMT. Email support is monitored 24/7, and we aim to respond to all inquiries within 24 hours.',
		category: 'Support',
	},
];

const categories = [
	'Getting Started',
	'Templates & Design',
	'Export & Download',
	'Account & Billing',
	'Privacy & Security',
	'Support',
];

export default function FAQPage() {
	const [openItems, setOpenItems] = useState<string[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<string>('all');

	const toggleItem = (id: string) => {
		setOpenItems((prev) =>
			prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
		);
	};

	const filteredFAQs =
		selectedCategory === 'all'
			? faqData
			: faqData.filter((faq) => faq.category === selectedCategory);

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
			<HomeNav />

			{/* Hero Section */}
			<section className="py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
							Frequently Asked Questions
						</h1>
						<p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
							Find quick answers to the most common questions about our British CV service.
						</p>
					</div>
				</div>
			</section>

			{/* Category Filter */}
			<section className="pb-12">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mb-8">
						<h2 className="mb-4 text-2xl font-bold text-gray-900">Browse by Category</h2>
						<div className="flex flex-wrap gap-2">
							<button
								onClick={() => setSelectedCategory('all')}
								className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
									selectedCategory === 'all'
										? 'bg-blue-600 text-white'
										: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
								}`}
							>
								All Questions
							</button>
							{categories.map((category) => (
								<button
									key={category}
									onClick={() => setSelectedCategory(category)}
									className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
										selectedCategory === category
											? 'bg-blue-600 text-white'
											: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
									}`}
								>
									{category}
								</button>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* FAQ Items */}
			<section className="pb-20">
				<div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
					<div className="space-y-4">
						{filteredFAQs.map((faq) => (
							<div key={faq.id} className="rounded-lg border bg-white shadow-sm">
								<button
									onClick={() => toggleItem(faq.id)}
									className="flex w-full items-center justify-between p-6 text-left hover:bg-gray-50"
								>
									<div className="flex-1">
										<h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
									</div>
									<div className="ml-4 flex-shrink-0">
										{openItems.includes(faq.id) ? (
											<ChevronUp className="h-5 w-5 text-gray-500" />
										) : (
											<ChevronDown className="h-5 w-5 text-gray-500" />
										)}
									</div>
								</button>
								{openItems.includes(faq.id) && (
									<div className="border-t px-6 pb-6 pt-4">
										<p className="leading-relaxed text-gray-600">{faq.answer}</p>
									</div>
								)}
							</div>
						))}
					</div>

					{filteredFAQs.length === 0 && (
						<div className="py-12 text-center">
							<HelpCircle className="mx-auto mb-4 h-16 w-16 text-gray-400" />
							<h3 className="mb-2 text-lg font-semibold text-gray-900">No questions found</h3>
							<p className="text-gray-600">
								Try selecting a different category or contact our support team.
							</p>
						</div>
					)}
				</div>
			</section>

			{/* Quick Actions */}
			<section className="bg-white py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mb-12 text-center">
						<h2 className="mb-4 text-3xl font-bold text-gray-900">Still Have Questions?</h2>
						<p className="text-xl text-gray-600">Our support team is ready to help you succeed.</p>
					</div>

					<div className="grid gap-8 md:grid-cols-2">
						<div className="text-center">
							<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
								<HelpCircle className="h-8 w-8 text-blue-600" />
							</div>
							<h3 className="mb-2 text-xl font-semibold text-gray-900">Help Center</h3>
							<p className="mb-4 text-gray-600">
								Browse our comprehensive help articles and tutorials.
							</p>
							<Link href="/help">
								<Button variant="outline" className="w-full">
									Visit Help Center
								</Button>
							</Link>
						</div>

						<div className="text-center">
							<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
								<HelpCircle className="h-8 w-8 text-green-600" />
							</div>
							<h3 className="mb-2 text-xl font-semibold text-gray-900">Contact Support</h3>
							<p className="mb-4 text-gray-600">
								Get in touch with our expert support team for personalized help.
							</p>
							<Link href="/contact">
								<Button variant="outline" className="w-full">
									Contact Us
								</Button>
							</Link>
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
						Now that your questions are answered, start building your career success story.
					</p>
					<Link href="/create-cv">
						<Button
							size="lg"
							className="bg-white px-8 py-3 text-lg font-semibold text-blue-600 hover:bg-gray-100"
						>
							Start Creating Now
						</Button>
					</Link>
				</div>
			</section>
		</div>
	);
}
