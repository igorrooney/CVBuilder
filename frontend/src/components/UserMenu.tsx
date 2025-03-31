// components/UserMenu.tsx
'use client';

import { useLogout } from '@/hooks/useLogout';
import { Models } from 'appwrite';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface UserMenuProps {
	user: Models.User<Models.Preferences>;
}

const UserMenu = ({ user }: UserMenuProps) => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const { logout } = useLogout();

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setDropdownOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const handleLogout = async () => {
		await logout();
	};

	const firstName = user?.name.split(' ')[0] || '';
	const lastName = user?.name.split(' ')[1] || '';
	const profilePictureUrl = user?.prefs?.profilePictureUrl;
	const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;

	return (
		<div className="relative inline-block text-left" ref={dropdownRef}>
			<button
				onClick={() => setDropdownOpen((prev) => !prev)}
				className="inline-flex items-center rounded-lg bg-white p-2 text-sm text-gray-800 hover:bg-gray-100 focus:outline-none"
			>
				{profilePictureUrl ? (
					<Image
						src={profilePictureUrl}
						alt="User avatar"
						className="h-10 w-10 rounded-full"
						width={40}
						height={40}
					/>
				) : (
					<div className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-100">
						<span className="font-medium text-gray-600">{initials}</span>
					</div>
				)}
			</button>
			{dropdownOpen && (
				<div className="absolute right-0 z-10 mt-2 w-56 rounded-lg border bg-white shadow-xl">
					<div className="border-b px-4 py-3">
						<span className="block text-sm font-semibold text-gray-900">{user?.name}</span>
						<span className="block truncate text-sm text-gray-500">{user?.email}</span>
					</div>
					<ul className="py-2 text-gray-700">
						<li>
							<Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
								My profile
							</Link>
						</li>
						<li>
							<button
								onClick={handleLogout}
								className="w-full bg-white px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
							>
								Sign out
							</button>
						</li>
					</ul>
				</div>
			)}
		</div>
	);
};

export default UserMenu;
