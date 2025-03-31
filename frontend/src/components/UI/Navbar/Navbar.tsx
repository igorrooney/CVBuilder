// components/UI/Navbar.tsx
'use client';

import MobileNav from '@/components/MobileNav';
import UserMenu from '@/components/UserMenu';
import { useLoggedInUser } from '@/hooks/useLoggedInUser';
import { Box, CircularProgress } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

export default function Navbar() {
	const { user, isLoading } = useLoggedInUser();

	if (isLoading) {
		return (
			<Box
				sx={{
					height: '100vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<CircularProgress size={60} />
			</Box>
		);
	}
	return (
		<header className="relative bg-white shadow-md dark:bg-gray-800" aria-label="Main Navigation">
			<nav className="border-gray-200 px-4 py-2.5 lg:px-6">
				<div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
					{/* Logo & Title */}
					<Link href="/" className="flex items-center">
						<Image
							src="https://flowbite.com/docs/images/logo.svg"
							className="mr-3 h-6 sm:h-9"
							alt="CV Builder Logo"
							width={36}
							height={36}
							priority
						/>
						<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
							CV Builder
						</span>
					</Link>

					{/* Right-hand side */}
					<div className="flex items-center lg:order-2">
						{user ? (
							<UserMenu user={user} />
						) : (
							<>
								<Link
									href="/login"
									className="mr-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800 lg:px-5 lg:py-2.5"
								>
									Log in
								</Link>
								<Link
									href="/register"
									className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 lg:px-5 lg:py-2.5"
								>
									Get started
								</Link>
							</>
						)}

						{/* Mobile Nav Toggler */}
						<Suspense fallback={<div>Loading mobile nav...</div>}>
							<MobileNav />
						</Suspense>
					</div>

					{/* Desktop Nav */}
					<div className="hidden lg:order-1 lg:flex lg:w-auto">
						<ul className="mt-4 flex flex-col font-medium lg:mt-0 lg:flex-row lg:space-x-8">
							<li>
								<Link
									href="/"
									className="block rounded bg-indigo-600 py-2 pl-3 pr-4 text-white lg:bg-transparent lg:p-0 lg:text-indigo-600"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									href="/create-cv"
									className="block py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-50 lg:p-0 lg:hover:bg-transparent lg:hover:text-indigo-600"
								>
									Create CV
								</Link>
							</li>
							<li>
								<Link
									href="/my-cvs"
									className="block py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-50 lg:p-0 lg:hover:bg-transparent lg:hover:text-indigo-600"
								>
									My CVs
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</header>
	);
}
