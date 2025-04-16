/// <reference types="node" />

export const APPWRITE_CONFIG = {
	ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || '',
	PROJECT_ID: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '',
	DATABASE_ID: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
	COLLECTIONS: {
		USERS: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID || '',
		CVS: process.env.NEXT_PUBLIC_APPWRITE_CVS_COLLECTION_ID || '',
	},
} as const;

export const ROUTES = {
	HOME: '/',
	LOGIN: '/login',
	REGISTER: '/register',
	CREATE_CV: '/create-cv',
	EDIT_CV: '/edit-cv',
	PROFILE: '/profile',
} as const;

export const COOKIE_NAMES = {
	TOKEN: 'token',
	THEME: 'theme',
} as const;

export const QUERY_KEYS = {
	AUTH: {
		ME: 'auth-me',
	},
	CV: {
		LIST: 'cv-list',
		DETAIL: 'cv-detail',
	},
} as const;

export const ERROR_MESSAGES = {
	AUTH: {
		INVALID_CREDENTIALS: 'Invalid email or password',
		UNAUTHORIZED: 'You are not authorized to access this resource',
		SESSION_EXPIRED: 'Your session has expired. Please log in again.',
	},
	CV: {
		NOT_FOUND: 'CV not found',
		CREATE_FAILED: 'Failed to create CV',
		UPDATE_FAILED: 'Failed to update CV',
		DELETE_FAILED: 'Failed to delete CV',
	},
	GENERAL: {
		SOMETHING_WENT_WRONG: 'Something went wrong. Please try again later.',
		NETWORK_ERROR: 'Network error. Please check your connection.',
	},
} as const;
