// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/app/lib/session";

// List of protected paths
const protectedRoutes = ["/dashboard"]; // Add others if needed

export default async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // 1) Remove any 'email' or 'password' query params for security
  if (searchParams.has("email") || searchParams.has("password")) {
    const cleanUrl = req.nextUrl.clone();
    cleanUrl.searchParams.delete("email");
    cleanUrl.searchParams.delete("password");
    return NextResponse.redirect(cleanUrl);
  }

  // 2) Attempt to decrypt the 'accessToken' cookie
  let session = null;
  try {
    const tokenCookie = req.cookies.get("accessToken")?.value;
    if (tokenCookie) {
      session = await decrypt(tokenCookie);
    }
  } catch (err) {
    console.error("Error decrypting token in middleware:", err);
  }

  // 3) If user tries to access a protected route but is NOT authenticated:
  if (protectedRoutes.includes(pathname) && !session?.jti) {
    // Redirect straight to /login
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 4) If user is heading to /login while ALREADY authenticated, send them to "/"
  if (pathname === "/login" && session?.jti) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 5) Otherwise, continue
  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  // Exclude /api, static, images, etc.
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],

  /*
  // If your decrypt() uses Node-only APIs not available in the Edge runtime,
  // uncomment the line below:
  // runtime: 'nodejs',
  */
};
