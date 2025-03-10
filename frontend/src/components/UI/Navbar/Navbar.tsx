import Link from "next/link";
import { UserType } from "@/types/UserType";
import { cookies } from "next/headers";
import MobileNav from "@/components/MobileNav"; // Adjust path as needed
import Image from "next/image";
import { Suspense } from "react";
import UserMenu from "@/components/UserMenu";

async function fetchUser(): Promise<UserType | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (!res.ok) return null;

    return (await res.json()) as UserType;
  } catch (error) {
    console.error("Fetch user error:", error);
    return null;
  }
}

export default async function Navbar() {
  const user = await fetchUser();

  return (
    <header className="shadow-md bg-white dark:bg-gray-800 relative">
      <nav className="border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          {/* Logo & Title */}
          <Link href="/" className="flex items-center">
            <Image
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="CV Builder Logo"
              width={36}
              height={36}
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              CV Builder
            </span>
          </Link>

          {/* Right-hand side (Log in / User menu / Mobile toggler) */}
          <div className="flex items-center lg:order-2">
            {user ? (
              <Suspense fallback={<div>Loading...</div>}>
                <UserMenu user={user} />
              </Suspense>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
                >
                  Get started
                </Link>
              </>
            )}

            {/* Mobile Nav Toggler (client component) */}
            <Suspense fallback={<div>Loading...</div>}>
              <MobileNav />
            </Suspense>
          </div>

          {/* Desktop Nav (visible on large screens) */}
          <div className="hidden lg:flex lg:w-auto lg:order-1">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link
                  href="/"
                  className="block py-2 pr-4 pl-3 text-white rounded bg-indigo-600 lg:bg-transparent lg:text-indigo-600 lg:p-0"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/create-cv"
                  className="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:hover:text-indigo-600 lg:p-0"
                >
                  Create CV
                </Link>
              </li>
              <li>
                <Link
                  href="/my-cvs"
                  className="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 lg:hover:bg-transparent lg:hover:text-indigo-600 lg:p-0"
                >
                  My CVs
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
