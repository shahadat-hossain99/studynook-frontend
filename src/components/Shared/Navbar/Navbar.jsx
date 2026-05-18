"use client";

import { useState } from "react";
import Link from "next/link";
import { HiBars3, HiXMark } from "react-icons/hi2";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/rooms", label: "Rooms" },
    { href: "/resources", label: "Resources" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/navbar.png"
              alt="StudyNook"
              // className="h-10 w-auto"
              width={180}
              height={180}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="text-gray-700 hover:text-gray-900 font-medium px-4 py-2 transition"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl transition"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-700"
          >
            {isOpen ? (
              <HiXMark className="w-7 h-7" />
            ) : (
              <HiBars3 className="w-7 h-7" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t py-6 bg-white">
            <div className="flex flex-col space-y-5 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg text-gray-700 hover:text-blue-600 font-medium py-1"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-6 border-t flex flex-col gap-4">
                <Link
                  href="/login"
                  className="text-center text-gray-700 font-medium py-3"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-2xl"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started Free
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
