import { useMutation, useQuery } from "@tanstack/react-query";
import { ILoginPayload } from "@/types/LoginTypes";
import apiClient from "@/lib/apiClient";
import { UserType } from "@/types/UserType";

export function useLogin() {
  return useMutation({
    mutationFn: (data: ILoginPayload) => {
      return apiClient.post("/auth/login", data);
    },

    onSuccess: () => {
      console.log("Login successful!");
    },

    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: () => {
      return apiClient.post("/auth/logout");
    },

    onSuccess: () => {
      console.log("Logged out successfully!");
    },

    onError: (error) => {
      console.error("Logged out failed:", error);
    },
  });
}

// Hook to fetch the current user's profile
export function useCurrentUser() {
  return useQuery<UserType, Error>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const { data } = await apiClient.get("/auth/me");
      return data;
    },
    retry: false,
  });
}
