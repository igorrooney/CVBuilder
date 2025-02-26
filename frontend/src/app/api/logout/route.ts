import { NextResponse } from "next/server";

export async function POST() {
  // Remove the JWT cookie from the Next.js domain
  const response = NextResponse.json({ message: "Logged out successfully" });
  response.cookies.delete("jwt");
  return response;
}
