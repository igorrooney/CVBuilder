import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const isDevelopment = process.env.NODE_ENV === "development";

  // Extract refresh token from cookies
  const refreshToken = request.headers
    .get("cookie")
    ?.split("; ")
    .find((cookie) => cookie.startsWith("refreshToken="))
    ?.split("=")[1];

  if (refreshToken) {
    try {
      const backendUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`;

      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        console.error("Backend logout failed:", await response.json());
      }
    } catch (error) {
      console.error("Logout API error:", error);
    }
  }

  const response = NextResponse.json({ message: "Logged out successfully" });

  response.cookies.set("accessToken", "", {
    httpOnly: true,
    secure: !isDevelopment,
    sameSite: isDevelopment ? "lax" : "none",
    path: "/",
    expires: new Date(0),
  });

  response.cookies.set("refreshToken", "", {
    httpOnly: true,
    secure: !isDevelopment,
    sameSite: isDevelopment ? "lax" : "none",
    path: "/",
    expires: new Date(0),
  });

  return response;
}
