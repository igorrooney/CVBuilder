import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/app/lib/session";

const protectedRoutes = ["/dashboard", "/my-cvs", "/create-cv"];

export default async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // Remove sensitive query params for security
  if (searchParams.has("email") || searchParams.has("password")) {
    const url = req.nextUrl.clone();
    url.searchParams.delete("email");
    url.searchParams.delete("password");
    return NextResponse.redirect(url);
  }

  const tokenCookie = req.cookies.get("accessToken")?.value;

  let session = null;
  if (tokenCookie) {
    session = await decrypt(tokenCookie);
  }

  // Redirect unauthenticated users away from protected pages
  if (protectedRoutes.includes(pathname) && !session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Redirect authenticated users away from login and register
  if (["/login", "/register"].includes(pathname) && session) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/my-cvs", "/create-cv", "/login", "/register"],
};
