import { NextRequest, NextResponse } from "next/server";

interface LoginPayload {
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  const body: LoginPayload = await req.json();

  const backendResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  if (!backendResponse.ok) {
    const errorData = await backendResponse.json();
    return NextResponse.json(errorData, { status: backendResponse.status });
  }

  const { accessToken, refreshToken } = await backendResponse.json();

  const response = NextResponse.json({ message: "Login successful" });

  // Correctly handle development mode
  const isDevelopment = process.env.NODE_ENV === "development";

  response.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    secure: !isDevelopment, // false in dev, true in prod
    sameSite: isDevelopment ? "lax" : "none", // lax in dev, none in prod
    path: "/",
    maxAge: 60 * 60, // 1 hour
  });

  response.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: !isDevelopment,
    sameSite: isDevelopment ? "lax" : "none",
    path: "/",
    maxAge: 60 * 60 * 24 * 14, // 14 days
  });

  return response;
}
