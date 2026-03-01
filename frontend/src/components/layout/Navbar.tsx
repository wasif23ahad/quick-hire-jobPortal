"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiUser, FiChevronDown, FiMenu, FiX } from "react-icons/fi";

const navigationLinks = [
  { id: 1, label: "Find Jobs", href: "/jobs" },
  { id: 2, label: "Browse Companies", href: "/jobs" },
];

interface UserInfo {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const Navbar = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const stored = localStorage.getItem("user");
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setShowDropdown(false);
    setMobileMenuOpen(false);
    window.location.href = "/";
  };

  return (
    <div className="flex w-full justify-center bg-lightsgray border-b border-neutrals-20 h-[78px] relative z-50">
      <header className="flex w-full max-w-7xl items-center justify-between px-4 sm:px-8 md:px-16 lg:px-[124px] py-0 relative h-full">
        {/* Logo and Desktop Nav */}
        <nav
          className="inline-flex items-center justify-start gap-12 relative h-full"
          aria-label="Main navigation"
        >
          <div className="relative w-[152px] h-9">
            <Link href="/" className="w-[154px] absolute top-0 left-0 h-9 flex gap-2 no-underline">
              <img className="mt-0.5 w-8 h-8 relative" alt="QuickHire Logo" src="/logo.svg" />
              <div className="w-28 h-9 [font-family:'Red_Hat_Display-Bold',Helvetica] font-bold text-neutrals-100 text-2xl tracking-[-0.24px] leading-9 whitespace-nowrap flex items-center">
                QuickHire
              </div>
            </Link>
          </div>

          <ul className="hidden md:inline-flex items-center justify-center gap-6 m-0 p-0 h-full list-none">
            {navigationLinks.map((link) => (
              <li
                key={link.id}
                className="inline-flex items-center justify-center h-full"
              >
                <Link
                  href={link.href}
                  className="no-underline text-neutrals-80 font-body-normal-medium text-[16px] leading-[160%] hover:text-[#4640DE] transition-all duration-300 hover:-translate-y-0.5"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Auth / User Menu */}
        <div className="hidden md:inline-flex h-[78px] items-center justify-end gap-4 relative">
          {user ? (
            /* Logged-in state */
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer border-none bg-transparent"
              >
                <div
                  className="w-9 h-9 rounded-full bg-[#4640DE] flex items-center justify-center text-white font-clash-display font-bold text-sm"
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-epilogue font-semibold text-sm text-[#25324B]">
                  {user.name}
                </span>
                <FiChevronDown
                  className="text-[#7C8493]"
                  style={{
                    transition: "transform 0.2s",
                    transform: showDropdown ? "rotate(180deg)" : "rotate(0)",
                  }}
                />
              </button>

              {showDropdown && (
                <div
                  className="absolute top-full right-0 mt-1 w-[200px] bg-white border border-[#D6DDEB] rounded-lg shadow-lg z-50 overflow-hidden"
                >
                  <Link
                    href={user.role === 'EMPLOYER' ? '/employer/dashboard' : user.role === 'ADMIN' ? '/admin/dashboard' : '/dashboard'}
                    onClick={() => setShowDropdown(false)}
                    className="flex items-center gap-2 px-4 py-3 font-epilogue text-sm text-[#25324B] no-underline border-b border-[#D6DDEB] hover:bg-gray-50 transition-colors"
                  >
                    <FiUser size={16} /> Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-3 font-epilogue text-sm text-[#DC2626] border-none bg-transparent w-full text-left cursor-pointer hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Not logged-in state */
            <>
              <Link
                href="/employer/register"
                className="hidden lg:inline-flex no-underline text-brandsprimary font-button-normal text-[16px] font-bold hover:text-[#4640DE] mr-4 transition-all duration-300 hover:-translate-y-0.5"
              >
                Post a Job
              </Link>

              <Link
                href="/login"
                className="no-underline px-6 py-3 text-brandsprimary font-button-normal text-[16px] font-bold hover:bg-gray-50 rounded transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                Login
              </Link>

              <div className="w-px h-12 bg-neutrals-20" aria-hidden="true" />

              <Link
                href="/signup"
                className="no-underline bg-brandsprimary px-6 py-3 text-white font-button-normal text-[16px] font-bold rounded shadow-sm hover:shadow-lg hover:bg-opacity-90 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 transform-gpu"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <button 
          className="md:hidden flex items-center justify-center border-none bg-transparent text-[#202430] p-2 cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>

        {/* Mobile Header Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-[78px] left-0 w-full bg-white shadow-lg border-t border-neutrals-20 flex flex-col items-stretch md:hidden z-50">
            <nav className="flex flex-col border-b border-neutrals-20 p-4 gap-4">
              {navigationLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className="no-underline text-neutrals-80 font-body-normal-medium text-[16px] hover:text-[#4640DE]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col p-4 gap-4 bg-gray-50">
              {user ? (
                <>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#4640DE] flex items-center justify-center text-white font-clash-display font-bold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-epilogue font-semibold text-sm text-[#25324B]">
                        {user.name}
                      </span>
                      <span className="font-epilogue text-xs text-[#7C8493]">
                        {user.email}
                      </span>
                    </div>
                  </div>
                  <div className="h-px w-full bg-neutrals-20 my-2" />
                  <Link
                    href={user.role === 'EMPLOYER' ? '/employer/dashboard' : user.role === 'ADMIN' ? '/admin/dashboard' : '/dashboard'}
                    className="no-underline text-neutrals-80 font-body-normal-medium text-[16px] hover:text-[#4640DE] flex items-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FiUser size={18} /> Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-[#DC2626] text-left border-none bg-transparent p-0 font-body-normal-medium text-[16px] hover:text-red-700 cursor-pointer flex items-center"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-4 max-w-[300px] w-full mx-auto">
                  <Link
                    href="/employer/register"
                    className="no-underline px-6 text-center py-3 border border-brandsprimary text-brandsprimary font-button-normal text-[16px] font-bold rounded transition-all duration-300 hover:bg-gray-50 active:scale-95"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Post a Job
                  </Link>
                  <Link
                    href="/login"
                    className="no-underline px-6 text-center py-3 border border-brandsprimary text-brandsprimary font-button-normal text-[16px] font-bold rounded transition-all duration-300 hover:bg-gray-50 active:scale-95"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="no-underline bg-brandsprimary text-center px-6 py-3 text-white font-button-normal text-[16px] font-bold rounded shadow-sm hover:shadow-lg hover:bg-opacity-90 transition-all duration-300 active:scale-95"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </div>
  );
};
