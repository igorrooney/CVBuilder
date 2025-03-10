"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg 
                   hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 
                   dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 bg-transparent"
        aria-expanded={isOpen}
      >
        <span className="sr-only">Open main menu</span>
        {/* Hamburger icon */}
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z 
               M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z 
               M3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Mobile Menu (collapsible) */}
      {isOpen && (
        <div
          className="absolute top-full left-0 w-full mt-1 bg-white rounded shadow-lg 
                     dark:bg-gray-800 z-50"
        >
          <ul className="flex flex-col font-medium">
            <li>
              <Link
                href="/"
                className="block py-2 px-4 text-gray-700 hover:bg-gray-50 
                           dark:text-gray-200 dark:hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/create-cv"
                className="block py-2 px-4 text-gray-700 hover:bg-gray-50 
                           dark:text-gray-200 dark:hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                Create CV
              </Link>
            </li>
            <li>
              <Link
                href="/my-cvs"
                className="block py-2 px-4 text-gray-700 hover:bg-gray-50 
                           dark:text-gray-200 dark:hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                My CVs
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
