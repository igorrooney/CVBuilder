'use client';

import { useState } from 'react';
import { Client, Account } from 'appwrite';
import { appwriteConfig } from '@/lib/appwrite/config';

export const useDeleteAccount = () => {
	const [isDeleting, setIsDeleting] = useState(false);

	const deleteAccount = async () => {
		setIsDeleting(true);
		try {
			const client = new Client()
				.setEndpoint(appwriteConfig.endpointUrl)
				.setProject(appwriteConfig.projectId);
			const account = new Account(client);

			// Delete all sessions first
			await account.deleteSessions();

			// Note: Account deletion typically requires server-side implementation
			// For now, we'll just delete sessions and redirect to logout
			// In a production app, you'd need a server endpoint to handle account deletion
			return true;
		} catch (error: unknown) {
			const errorMessage = error instanceof Error ? error.message : 'Failed to delete account';
			throw new Error(errorMessage);
		} finally {
			setIsDeleting(false);
		}
	};

	return { deleteAccount, isDeleting };
};
