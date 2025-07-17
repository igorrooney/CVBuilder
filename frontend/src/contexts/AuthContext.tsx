'use client';

import { Models, ID } from 'appwrite';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { account } from '@/lib/appwrite/client';
import { setCookie, clearCookie } from '@/utils/cookies';
import {
	AuthContextType,
	AuthState,
	LoginCredentials,
	RegisterCredentials,
	User,
} from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [authState, setAuthState] = useState<AuthState>({
		user: null,
		session: null,
		isLoggedIn: false,
		isLoading: true,
		isInitialized: false,
	});

	// Initialize auth state on mount
	useEffect(() => {
		initializeAuth();
	}, []);

	const initializeAuth = async () => {
		try {
			// Check for existing session
			const session = await account.getSession('current');
			if (session) {
				const user = await account.get();

				// Set the session cookie for middleware detection
				setCookie('appwrite_session', session.$id);

				setAuthState({
					user: transformUser(user),
					session,
					isLoggedIn: true,
					isLoading: false,
					isInitialized: true,
				});
			} else {
				setAuthState((prev) => ({
					...prev,
					isLoading: false,
					isInitialized: true,
				}));
			}
		} catch (error) {
			console.error('Auth initialization error:', error);
			setAuthState((prev) => ({
				...prev,
				isLoading: false,
				isInitialized: true,
			}));
		}
	};

	const transformUser = (appwriteUser: Models.User<Models.Preferences>): User => ({
		id: appwriteUser.$id,
		email: appwriteUser.email,
		name: appwriteUser.name,
		role: appwriteUser.prefs?.role || 'user',
		emailVerification: appwriteUser.emailVerification,
		phoneVerification: appwriteUser.phoneVerification,
		prefs: appwriteUser.prefs || {},
		createdAt: appwriteUser.$createdAt,
		updatedAt: appwriteUser.$updatedAt,
	});

	const login = async (credentials: LoginCredentials): Promise<void> => {
		try {
			setAuthState((prev) => ({ ...prev, isLoading: true }));

			const session = await account.createEmailSession(credentials.email, credentials.password);
			const user = await account.get();

			// Manually set the session cookie for middleware detection
			if (session) {
				setCookie('appwrite_session', session.$id);
			}

			setAuthState({
				user: transformUser(user),
				session,
				isLoggedIn: true,
				isLoading: false,
				isInitialized: true,
			});
		} catch (error) {
			setAuthState((prev) => ({ ...prev, isLoading: false }));
			throw error;
		}
	};

	const register = async (credentials: RegisterCredentials): Promise<void> => {
		try {
			setAuthState((prev) => ({ ...prev, isLoading: true }));

			await account.create(ID.unique(), credentials.email, credentials.password, credentials.name);

			// Auto-login after registration
			await login({ email: credentials.email, password: credentials.password });
		} catch (error) {
			setAuthState((prev) => ({ ...prev, isLoading: false }));
			throw error;
		}
	};

	const logout = async (): Promise<void> => {
		try {
			await account.deleteSession('current');

			// Clear the session cookie
			clearCookie('appwrite_session');

			setAuthState({
				user: null,
				session: null,
				isLoggedIn: false,
				isLoading: false,
				isInitialized: true,
			});
		} catch (error) {
			console.error('Logout error:', error);
			// Force logout even if API call fails
			setAuthState({
				user: null,
				session: null,
				isLoggedIn: false,
				isLoading: false,
				isInitialized: true,
			});
		}
	};

	const refreshUser = async (): Promise<void> => {
		try {
			const user = await account.get();
			setAuthState((prev) => ({
				...prev,
				user: transformUser(user),
			}));
		} catch (error) {
			console.error('Error refreshing user:', error);
			throw error;
		}
	};

	const updateUser = async (userData: Partial<User>): Promise<void> => {
		try {
			// Update user preferences in Appwrite
			await account.updatePrefs(userData.prefs || {});

			// Refresh user data
			await refreshUser();
		} catch (error) {
			console.error('Error updating user:', error);
			throw error;
		}
	};

	const contextValue: AuthContextType = {
		...authState,
		login,
		register,
		logout,
		refreshUser,
		updateUser,
	};

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
