import { Client, Account, Databases } from 'appwrite';
import { appwriteConfig } from './config';

const client = new Client()
	.setEndpoint(appwriteConfig.endpointUrl)
	.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
