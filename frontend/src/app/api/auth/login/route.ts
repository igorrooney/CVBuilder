import { NextRequest, NextResponse } from "next/server";

interface LoginPayload {
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  const isDevelopment = process.env.NODE_ENV === "development";

  // Parse the JSON body from the client request
  const body: LoginPayload = await req.json();

  // Forward the credentials to the Azure backend
  const azureResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  // Handle potential errors from the Azure backend
  if (!azureResponse.ok) {
    const errorData = await azureResponse.json();
    return NextResponse.json(errorData, { status: azureResponse.status });
  }

  // Extract tokens (access + refresh) from Azure's response
  const azureData = await azureResponse.json();
  const { accessToken, refreshToken } = azureData;

  // Create a NextResponse to send back to the client
  const response = NextResponse.json({ message: "Login successful" });

  // Set an HTTP-only cookie for the ACCESS TOKEN (short-lived)
  response.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    secure: !isDevelopment,            // Secure in prod
    sameSite: isDevelopment ? "lax" : "none", // "none" requires HTTPS
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day in seconds
  });

  // Set an HTTP-only cookie for the REFRESH TOKEN (longer-lived)
  response.cookies.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: !isDevelopment,
    sameSite: isDevelopment ? "lax" : "none",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
  });

  return response;
}
