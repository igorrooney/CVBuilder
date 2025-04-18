'use client';

import { useState, useEffect, useRef } from 'react';
import { Client, Account, Models } from 'appwrite';
import { appwriteConfig } from '@/lib/appwrite/config';

export const useLoggedInUser = () => {
	const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [unauthorized, setUnauthorized] = useState(false);
	const hasErrored = useRef(false);

	useEffect(() => {
		if (unauthorized) {
			setIsLoading(false);
			return;
		}

		const fetchUser = async () => {
			try {
				const client = new Client()
					.setEndpoint(appwriteConfig.endpointUrl)
					.setProject(appwriteConfig.projectId);
				const account = new Account(client);
				const userData = await account.get();
				setUser(userData);
			} catch (error: any) {
				if (!hasErrored.current && error.code === 401) {
					hasErrored.current = true;
					setUnauthorized(true);
				}
			} finally {
				setIsLoading(false);
			}
		};

		fetchUser();
	}, [unauthorized]);

	return { user, isLoading, unauthorized };
};
