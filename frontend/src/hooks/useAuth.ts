import apiClient from '@/lib/apiClient';
import { createSessionClient } from '@/lib/server/appwrite';
import { ILoginPayload } from '@/types/LoginTypes';
import { UserType } from '@/types/UserType';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export function useLogin() {
	return useMutation({
		mutationFn: (data: ILoginPayload) => {
			return apiClient.post('/auth/login', data);
		},

		onSuccess: () => {
			console.log('Login successful!');
		},

		onError: (error) => {
			console.error('Login failed:', error);
		},
	});
}

export function useLoggedInUser({ initialData }: { initialData?: any }) {
	return useQuery({
		queryKey: ['loggedUser'],
		queryFn: async () => {
			const { account } = await createSessionClient();
			return await account.get(); // Fetch user from Appwrite
		},
		initialData,
		staleTime: 1000 * 60 * 5, // Cache for 5 minutes
	});
}

export function useLogout() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async () => {
			await axios.post('/api/auth/logout', {}, { withCredentials: true });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['loggedUser'] }); // Invalidate cache so UI updates
		},
	});
}
