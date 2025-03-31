import { Client, Account, Models } from 'appwrite';
import { appwriteConfig } from './config';

export const getLoggedInUser = async (
	cookie?: string,
): Promise<Models.User<Models.Preferences>> => {
	const client = new Client()
		.setEndpoint(appwriteConfig.endpointUrl)
		.setProject(appwriteConfig.projectId);

	// If a cookie is provided (in SSR), attach it to the client's headers.
	if (cookie) {
		// Type assertion to bypass TS limitations because the Client type doesn't expose 'headers'
		(client as any).headers = { ...((client as any).headers || {}), cookie };
	}

	const account = new Account(client);
	try {
		return await account.get();
	} catch (error: any) {
		// Check if the error corresponds to a 401 (unauthorized) response.
		// Depending on Appwrite's error structure, this could be error.code or error.response?.code.
		if (error.code === 401 || error.response?.code === 401) {
			// Throw a specific error message that can be used to stop further retries.
			throw new Error('Not authenticated');
		}
		throw error;
	}
};
