import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Determine environment
  const isDevelopment = process.env.NODE_ENV === "development";

  // Read the refresh token from the cookies
  const refreshCookie = req.cookies.get("refreshToken")?.value;
  if (!refreshCookie) {
    return NextResponse.json(
      { message: "No refresh token found." },
      { status: 401 }
    );
  }

  // Forward the refresh token to your Azure backend
  const azureResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: refreshCookie }),
    }
  );

  // Handle error responses from Azure
  if (!azureResponse.ok) {
    return NextResponse.json(
      { message: "Refresh token is invalid or expired." },
      { status: 401 }
    );
  }

  // Parse the new tokens from Azure's response
  const azureData = await azureResponse.json();
  const { accessToken, refreshToken } = azureData;

  // Create a NextResponse and set the new tokens in HTTP-only cookies
  const response = NextResponse.json({ message: "Refresh successful" });

  // Access token (short-lived)
  response.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    secure: !isDevelopment,
    sameSite: isDevelopment ? "lax" : "none",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  // Refresh token (longer-lived)
  response.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: !isDevelopment,
    sameSite: isDevelopment ? "lax" : "none",
    path: "/",
    maxAge: 60 * 60 * 24 * 14, // 14 days
  });

  return response;
}
