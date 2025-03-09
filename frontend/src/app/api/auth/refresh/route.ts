import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const isDevelopment = process.env.NODE_ENV === "development";

  // Extract refreshToken from cookies
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { message: "Refresh token not found." },
      { status: 401 }
    );
  }

  try {
    // Forward the refresh token to your backend
    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      }
    );

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json();
      return NextResponse.json(
        { message: errorData.message || "Refresh token invalid or expired." },
        { status: backendResponse.status }
      );
    }

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      await backendResponse.json();

    const response = NextResponse.json({ message: "Refresh successful" });

    // Set new Access Token cookie
    response.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: !isDevelopment,
      sameSite: isDevelopment ? "lax" : "none",
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });

    // Set new Refresh Token cookie
    response.cookies.set("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: !isDevelopment,
      sameSite: isDevelopment ? "lax" : "none",
      path: "/",
      maxAge: 60 * 60 * 24 * 14, // 14 days
    });

    return response;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
