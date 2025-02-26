import { NextRequest, NextResponse } from "next/server";

// Example interface for the login payload
interface LoginPayload {
  email: string;
  password: string;
}

export async function POST(req: NextRequest) {
  const isDevelopment = process.env.NODE_ENV === "development";

  // Parse the JSON body from the client request
  const body: LoginPayload = await req.json();

  // Forward the credentials to your Azure backend
  const azureResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      // Note: No "credentials: include" here, because this is server-to-server
    }
  );

  // 3. Handle potential errors from the Azure backend
  if (!azureResponse.ok) {
    const errorData = await azureResponse.json();
    return NextResponse.json(errorData, { status: azureResponse.status });
  }

  // Extract the token from Azure's response
  const azureData = await azureResponse.json();

  const token = azureData.token;

  // Create a response to send back to the client
  const response = NextResponse.json({ message: "Login successful" });

  // Set a JWT cookie on the Next.js domain
  response.cookies.set("jwt", token, {
    httpOnly: true,
    secure: !isDevelopment, // In dev: false, in prod: true
    sameSite: isDevelopment ? "lax" : "none", // "none" requires HTTPS
    path: "/",
    maxAge: 60 * 60, // 1 hour in seconds
  });

  return response;
}
