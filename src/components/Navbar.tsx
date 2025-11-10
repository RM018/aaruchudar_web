"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
      <div className="container-custom flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo2.png" alt="Logo" className="h-12 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            href="/hi-labs" 
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            HI Labs
          </Link>
          <Link 
            href="/hi-courses" 
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            HI Courses
          </Link>
          <Link 
            href="/hi-workshops" 
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            HI Workshops
          </Link>
          <Link 
            href="/hi-events" 
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            HI Events
          </Link>
          <Link 
            href="/quiz" 
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Quiz
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 md:hidden">
            <div className="container-custom py-4 flex flex-col gap-4">
              <Link 
                href="/hi-labs" 
                className="text-gray-600 hover:text-gray-900 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                HI Labs
              </Link>
              <Link 
                href="/hi-courses" 
                className="text-gray-600 hover:text-gray-900 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                HI Courses
              </Link>
              <Link 
                href="/hi-workshops" 
                className="text-gray-600 hover:text-gray-900 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                HI Workshops
              </Link>
              <Link 
                href="/hi-events" 
                className="text-gray-600 hover:text-gray-900 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                HI Events
              </Link>
              <Link 
                href="/quiz" 
                className="text-gray-600 hover:text-gray-900 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Quiz
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
