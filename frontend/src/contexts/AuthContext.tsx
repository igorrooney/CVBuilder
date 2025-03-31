'use client';

import { Models } from 'appwrite';
import { createContext, ReactNode, useContext, useState } from 'react';

interface AuthContextType {
	session: Models.Session | null;
	setSession: (session: Models.Session | null) => void;
	isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [session, setSession] = useState<Models.Session | null>(null);
	const isLoggedIn = Boolean(session);

	return (
		<AuthContext.Provider value={{ session, setSession, isLoggedIn }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
