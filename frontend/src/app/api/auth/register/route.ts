import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, password, confirmPassword } = body;

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match" },
        { status: 400 }
      );
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
      { firstName, lastName, email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    console.log("error :>> ", error);
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { message: error.response?.data?.message || "Registration failed" },
        { status: error.response?.status || 500 }
      );
    } else {
      return NextResponse.json(
        { message: "Registration failed" },
        { status: 500 }
      );
    }
  }
}
