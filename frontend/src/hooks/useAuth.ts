import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`,
        {
          method: "GET",
          credentials: "include", // Send HTTP-only cookies
        }
      );

      if (!response.ok) throw new Error("Unauthorized");
      return response.json();
    },
    retry: false, // Avoid retrying if user is not authenticated
  });
};
