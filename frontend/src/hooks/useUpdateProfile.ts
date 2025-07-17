'use client';

import { useState } from 'react';
import { Client, Account } from 'appwrite';
import { appwriteConfig } from '@/lib/appwrite/config';

interface UpdateProfileData {
	name?: string;
	prefs?: Record<string, unknown>;
}

export const useUpdateProfile = () => {
	const [isUpdating, setIsUpdating] = useState(false);

	const updateProfile = async (data: UpdateProfileData) => {
		setIsUpdating(true);
		try {
			const client = new Client()
				.setEndpoint(appwriteConfig.endpointUrl)
				.setProject(appwriteConfig.projectId);
			const account = new Account(client);

			const updateData: Record<string, unknown> = {};
			if (data.name) updateData.name = data.name;
			if (data.prefs) updateData.prefs = data.prefs;

			await account.updateName(data.name || '');

			if (data.prefs) {
				await account.updatePrefs(data.prefs);
			}

			return true;
		} catch (error: unknown) {
			const errorMessage = error instanceof Error ? error.message : 'Failed to update profile';
			throw new Error(errorMessage);
		} finally {
			setIsUpdating(false);
		}
	};

	return { updateProfile, isUpdating };
};
