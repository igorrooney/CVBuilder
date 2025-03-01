import { NextResponse } from "next/server";

export async function POST() {
  const isDevelopment = process.env.NODE_ENV === "development";

  const response = NextResponse.json({ message: "Logged out successfully" });

  // Overwrite cookies with expired date
  response.cookies.set("accessToken", "", {
    httpOnly: true,
    secure: !isDevelopment,
    sameSite: isDevelopment ? "lax" : "none",
    path: "/",
    expires: new Date(0), // Expire immediately
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
