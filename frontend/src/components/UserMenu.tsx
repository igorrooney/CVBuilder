"use client";

import { useLogout } from "@/hooks/useAuth";
import { UserType } from "@/types/UserType";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const UserMenu = ({ user }: { user: UserType }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const logoutMutation = useLogout();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  async function handleLogout() {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        window.location.href = "/login";
      },
      onError: () => {
        console.error("Logout failed");
      },
    });
  }

  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="inline-flex items-center p-2 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-none !bg-white"
      >
        {user.profilePictureUrl ? (
          <Image
            src={user.profilePictureUrl}
            className="w-10 h-10 rounded-full"
            alt="User avatar"
            width={40}
            height={40}
          />
        ) : (
          <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
            <span className="font-medium text-gray-600">{initials}</span>
          </div>
        )}
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-xl z-10">
          <div className="px-4 py-3 border-b">
            <span className="block text-sm font-semibold text-gray-900">
              {user.firstName} {user.lastName}
            </span>
            <span className="block text-sm text-gray-500 truncate">
              {user.email}
            </span>
          </div>
          <ul className="py-2 text-gray-700">
            <li>
              <Link
                href="/profile"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                My profile
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:!bg-gray-100 !bg-white !text-gray-700"
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
