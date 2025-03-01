import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`, {
    method: "GET",
  });

  if (!res.ok) {
    return NextResponse.json(
      { message: "Unable to fetch user" },
      { status: res.status }
    );
  }

  const userData = await res.json();
  return NextResponse.json(userData);
}
