"use client";

export default function Dashboard() {
  async function handleLogout() {
    const response = await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });
    if (response.ok) {
      window.location.href = "/login";
    } else {
      console.error("Failed to log out");
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold">Welcome to your Dashboard</h1>
      <button
        className="mt-4 bg-red-600 text-white p-2 rounded-md"
        onClick={handleLogout}
      >
        Log out
      </button>
    </>
  );
}
