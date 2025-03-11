"use client";
import { Button } from "@/components/UI/button";
import { useLogout } from "@/hooks/useAuth";

export default function Dashboard() {
  const logoutMutation = useLogout();

  return (
    <>
      <h1 className="text-2xl font-bold">Welcome to your Dashboard</h1>
      <Button
        className="mt-4 bg-red-600 text-white p-2 rounded-md"
        onClick={() =>
          logoutMutation.mutate(undefined, {
            onSuccess: () => {
              window.location.href = "/login";
            },
          })
        }
      >
        Log out
      </Button>
    </>
  );
}
