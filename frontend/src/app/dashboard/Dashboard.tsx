"use client";

export default function Dashboard() {
  return (
    <>
      <h1 className="text-2xl font-bold">Welcome to your Dashboard</h1>
      <button
        className="mt-4 bg-red-600 text-white p-2 rounded-md"
        onClick={async () => {
          await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
            method: "POST",
            credentials: "include",
          });
          window.location.href = "/login";
        }}
      >
        Log out
      </button>
    </>
  );
}
