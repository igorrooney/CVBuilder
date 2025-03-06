import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/session";
import axios from "axios";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken");

  if (!token) {
    return NextResponse.json({ message: "User is not authenticated" }, { status: 401 });
  }

  try {
    // Decode JWT
    const decoded = await decrypt(token.value);

    if (!decoded || typeof decoded !== "object") {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    // Extract userId and email from claims
    const userId =
      decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    const email =
      decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];

    if (!userId || !email) {
      return NextResponse.json({ message: "Invalid token claims" }, { status: 401 });
    }

    console.log("Extracted userId:", userId);

    // Call backend to get full user details
    const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const response = await axios.get(`${backendUrl}/auth/me`, {
      headers: { Authorization: `Bearer ${token.value}` },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ message: "Error fetching user data" }, { status: 500 });
  }
}
