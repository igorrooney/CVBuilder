"use client";
import { useLogout } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const logoutMutation = useLogout();

  return (
    <>
      <h1 className="text-2xl font-bold">Welcome to your Dashboard</h1>
      <button
        className="mt-4 bg-red-600 text-white p-2 rounded-md"
        onClick={() =>
          logoutMutation.mutate(undefined, {
            onSuccess: () => {
              router.push("/login");
            },
          })
        }
      >
        Log out
      </button>
    </>
  );
}
