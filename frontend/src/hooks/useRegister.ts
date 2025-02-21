import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios from '@/utils/api';
import { IRegisterPayload } from '@/types/RegisterTypes';

interface RegisterResponse {
  message: string;
}

export const useRegister = (): {
  registerUser: UseMutationResult<RegisterResponse, Error, IRegisterPayload>['mutate'];
  isLoading: boolean;
} => {
  const mutation = useMutation<RegisterResponse, Error, IRegisterPayload>({
    mutationFn: async (data: IRegisterPayload) => {
      const response = await axios.post<RegisterResponse>('/auth/register', data);
      return response.data;
    }
  });

  return {
    registerUser: mutation.mutate,
    isLoading: mutation.status === 'pending',
  };
};
