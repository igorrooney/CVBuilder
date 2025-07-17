export interface User {
	id: string;
	email: string;
	name: string;
	role: 'user' | 'admin';
	emailVerification: boolean;
	phoneVerification: boolean;
	prefs: Record<string, any>;
	createdAt: string;
	updatedAt: string;
}

export interface AuthState {
	user: User | null;
	session: any | null;
	isLoggedIn: boolean;
	isLoading: boolean;
	isInitialized: boolean;
}

export interface LoginCredentials {
	email: string;
	password: string;
}

export interface RegisterCredentials {
	email: string;
	password: string;
	name: string;
}

export interface AuthContextType extends AuthState {
	login: (credentials: LoginCredentials) => Promise<void>;
	register: (credentials: RegisterCredentials) => Promise<void>;
	logout: () => Promise<void>;
	refreshUser: () => Promise<void>;
	updateUser: (userData: Partial<User>) => Promise<void>;
}
