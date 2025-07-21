'use client';

import { Button } from '@/components/UI/button';
import HomeNav from '@/components/UI/HomeNav';
import {
	Search,
	BookOpen,
	FileText,
	Download,
	Settings,
	User,
	CreditCard,
	HelpCircle,
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface HelpArticle {
	id: string;
	title: string;
	content: string;
	category: string;
	tags: string[];
}

const helpArticles: HelpArticle[] = [
	{
		id: 'getting-started',
		title: 'Getting Started with British CV Builder',
		content: 'Learn how to create your first professional British CV in minutes.',
		category: 'Getting Started',
		tags: ['first-cv', 'tutorial', 'beginner'],
	},
	{
		id: 'cv-templates',
		title: 'Understanding CV Templates',
		content:
			'Explore our professional British CV templates and choose the right one for your industry.',
		category: 'Templates',
		tags: ['templates', 'design', 'professional'],
	},
	{
		id: 'export-pdf',
		title: 'How to Export Your CV as PDF',
		content: 'Step-by-step guide to downloading your CV in high-quality PDF format.',
		category: 'Export',
		tags: ['pdf', 'download', 'export'],
	},
	{
		id: 'account-settings',
		title: 'Managing Your Account Settings',
		content: 'Learn how to update your profile, change password, and manage account preferences.',
		category: 'Account',
		tags: ['profile', 'settings', 'password'],
	},
	{
		id: 'subscription-management',
		title: 'Managing Your Subscription',
		content: 'How to upgrade, downgrade, or cancel your subscription plan.',
		category: 'Billing',
		tags: ['subscription', 'billing', 'payment'],
	},
	{
		id: 'cv-tips',
		title: 'Professional CV Writing Tips',
		content: 'Expert advice on creating a CV that stands out to British employers.',
		category: 'Tips',
		tags: ['writing', 'tips', 'professional'],
	},
];

const categories = [
	{ name: 'Getting Started', icon: BookOpen, color: 'blue' },
	{ name: 'Templates', icon: FileText, color: 'green' },
	{ name: 'Export', icon: Download, color: 'purple' },
	{ name: 'Account', icon: User, color: 'orange' },
	{ name: 'Billing', icon: CreditCard, color: 'red' },
	{ name: 'Tips', icon: HelpCircle, color: 'indigo' },
];

export default function HelpPage() {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState<string>('all');

	const filteredArticles = helpArticles.filter((article) => {
		const matchesSearch =
			article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
			article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

		const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;

		return matchesSearch && matchesCategory;
	});

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
			<HomeNav />

			{/* Hero Section */}
			<section className="py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">Help Center</h1>
						<p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
							Find answers to your questions and learn how to make the most of our British CV
							service.
						</p>

						{/* Search Bar */}
						<div className="mx-auto max-w-2xl">
							<div className="relative">
								<Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
								<input
									type="text"
									placeholder="Search for help articles..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="w-full rounded-lg border border-gray-300 bg-white px-12 py-4 text-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Categories */}
			<section className="pb-12">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<h2 className="mb-8 text-2xl font-bold text-gray-900">Browse by Category</h2>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						<button
							onClick={() => setSelectedCategory('all')}
							className={`flex items-center rounded-lg border p-4 text-left transition-colors ${
								selectedCategory === 'all'
									? 'border-blue-500 bg-blue-50'
									: 'border-gray-200 bg-white hover:bg-gray-50'
							}`}
						>
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
								<HelpCircle className="h-6 w-6 text-blue-600" />
							</div>
							<div className="ml-4">
								<h3 className="font-semibold text-gray-900">All Articles</h3>
								<p className="text-sm text-gray-600">Browse all help content</p>
							</div>
						</button>

						{categories.map((category) => {
							const Icon = category.icon;
							const colorClasses = {
								blue: 'bg-blue-100 text-blue-600',
								green: 'bg-green-100 text-green-600',
								purple: 'bg-purple-100 text-purple-600',
								orange: 'bg-orange-100 text-orange-600',
								red: 'bg-red-100 text-red-600',
								indigo: 'bg-indigo-100 text-indigo-600',
							};

							return (
								<button
									key={category.name}
									onClick={() => setSelectedCategory(category.name)}
									className={`flex items-center rounded-lg border p-4 text-left transition-colors ${
										selectedCategory === category.name
											? 'border-blue-500 bg-blue-50'
											: 'border-gray-200 bg-white hover:bg-gray-50'
									}`}
								>
									<div
										className={`flex h-12 w-12 items-center justify-center rounded-full ${colorClasses[category.color as keyof typeof colorClasses]}`}
									>
										<Icon className="h-6 w-6" />
									</div>
									<div className="ml-4">
										<h3 className="font-semibold text-gray-900">{category.name}</h3>
										<p className="text-sm text-gray-600">
											{helpArticles.filter((article) => article.category === category.name).length}{' '}
											articles
										</p>
									</div>
								</button>
							);
						})}
					</div>
				</div>
			</section>

			{/* Articles */}
			<section className="pb-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mb-8 flex items-center justify-between">
						<h2 className="text-2xl font-bold text-gray-900">
							{searchQuery ? 'Search Results' : 'Popular Articles'}
						</h2>
						{filteredArticles.length > 0 && (
							<p className="text-gray-600">
								{filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
							</p>
						)}
					</div>

					{filteredArticles.length > 0 ? (
						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
							{filteredArticles.map((article) => (
								<div key={article.id} className="rounded-lg border bg-white p-6 shadow-sm">
									<div className="mb-4">
										<span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
											{article.category}
										</span>
									</div>
									<h3 className="mb-2 text-lg font-semibold text-gray-900">{article.title}</h3>
									<p className="mb-4 text-gray-600">{article.content}</p>
									<div className="flex flex-wrap gap-2">
										{article.tags.map((tag) => (
											<span
												key={tag}
												className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
											>
												{tag}
											</span>
										))}
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="py-12 text-center">
							<HelpCircle className="mx-auto mb-4 h-16 w-16 text-gray-400" />
							<h3 className="mb-2 text-lg font-semibold text-gray-900">No articles found</h3>
							<p className="mb-6 text-gray-600">
								Try adjusting your search terms or browse our categories above.
							</p>
							<Button
								onClick={() => {
									setSearchQuery('');
									setSelectedCategory('all');
								}}
								className="bg-blue-600 hover:bg-blue-700"
							>
								Clear Search
							</Button>
						</div>
					)}
				</div>
			</section>

			{/* Quick Actions */}
			<section className="bg-white py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mb-12 text-center">
						<h2 className="mb-4 text-3xl font-bold text-gray-900">Still Need Help?</h2>
						<p className="text-xl text-gray-600">Our support team is here to help you succeed.</p>
					</div>

					<div className="grid gap-8 md:grid-cols-3">
						<div className="text-center">
							<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
								<HelpCircle className="h-8 w-8 text-blue-600" />
							</div>
							<h3 className="mb-2 text-xl font-semibold text-gray-900">FAQ</h3>
							<p className="mb-4 text-gray-600">
								Find quick answers to frequently asked questions.
							</p>
							<Link href="/faq">
								<Button variant="outline" className="w-full">
									Browse FAQ
								</Button>
							</Link>
						</div>

						<div className="text-center">
							<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
								<Settings className="h-8 w-8 text-green-600" />
							</div>
							<h3 className="mb-2 text-xl font-semibold text-gray-900">Contact Support</h3>
							<p className="mb-4 text-gray-600">Get in touch with our expert support team.</p>
							<Link href="/contact">
								<Button variant="outline" className="w-full">
									Contact Us
								</Button>
							</Link>
						</div>

						<div className="text-center">
							<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
								<FileText className="h-8 w-8 text-purple-600" />
							</div>
							<h3 className="mb-2 text-xl font-semibold text-gray-900">Documentation</h3>
							<p className="mb-4 text-gray-600">
								Detailed guides and tutorials for advanced users.
							</p>
							<Link href="/docs">
								<Button variant="outline" className="w-full">
									View Docs
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
						Now that you know how everything works, start building your career success story.
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
