import { decrypt } from "@/app/lib/session";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(req: Request) {
  
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken");
  
    if (!token) {
      return NextResponse.json({ message: "User is not authenticated" }, { status: 401 });
    }
  
    try {
        const requestBody = await req.json();
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

    const response = await axios.post(`${API_BASE_URL}/api/cv`, requestBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || "An error occurred" },
        { status: error.response?.status || 500 }
      );
    } else {
      return NextResponse.json(
        { message: "An unexpected error occurred" },
        { status: 500 }
      );
    }
  }
}
