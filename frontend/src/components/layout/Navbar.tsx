"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiUser, FiChevronDown } from "react-icons/fi";

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
    window.location.href = "/";
  };

  return (
    <div className="flex w-full justify-center bg-lightsgray border-b border-neutrals-20 h-[78px]">
      <header className="flex w-[1440px] items-center justify-between px-[124px] py-0 relative">
        <nav
          className="inline-flex items-center justify-center gap-12 relative self-stretch flex-[0_0_auto]"
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

          <ul className="inline-flex items-end justify-center gap-4 relative self-stretch flex-[0_0_auto]">
            {navigationLinks.map((link) => (
              <li
                key={link.id}
                className="inline-flex flex-col items-start gap-6 px-0 py-6 relative flex-[0_0_auto]"
              >
                <Link
                  href={link.href}
                  className="no-underline relative w-fit mt-[-1.00px] font-body-normal-medium font-[number:var(--body-normal-medium-font-weight)] text-neutrals-80 text-[length:var(--body-normal-medium-font-size)] tracking-[var(--body-normal-medium-letter-spacing)] leading-[var(--body-normal-medium-line-height)] whitespace-nowrap [font-style:var(--body-normal-medium-font-style)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="inline-flex h-[78px] items-center justify-center gap-4 relative flex-[0_0_auto]">
          {user ? (
            /* Logged-in state */
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                style={{ border: "none", background: "transparent" }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "#4640DE",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                    fontFamily: "var(--font-clash-display)",
                    fontWeight: 700,
                    fontSize: "14px",
                  }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-epilogue)",
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#25324B",
                  }}
                >
                  {user.name}
                </span>
                <FiChevronDown
                  style={{
                    color: "#7C8493",
                    transition: "transform 0.2s",
                    transform: showDropdown ? "rotate(180deg)" : "rotate(0)",
                  }}
                />
              </button>

              {showDropdown && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    marginTop: "4px",
                    width: "200px",
                    background: "#FFFFFF",
                    border: "1px solid #D6DDEB",
                    borderRadius: "8px",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                    zIndex: 100,
                    overflow: "hidden",
                  }}
                >
                  <Link
                    href="/dashboard"
                    onClick={() => setShowDropdown(false)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "12px 16px",
                      fontFamily: "var(--font-epilogue)",
                      fontSize: "14px",
                      color: "#25324B",
                      textDecoration: "none",
                      borderBottom: "1px solid #D6DDEB",
                    }}
                  >
                    <FiUser size={16} /> Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "12px 16px",
                      fontFamily: "var(--font-epilogue)",
                      fontSize: "14px",
                      color: "#DC2626",
                      border: "none",
                      background: "transparent",
                      width: "100%",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
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
                href="/login"
                className="no-underline all-[unset] box-border rounded inline-flex items-center justify-center gap-2.5 px-6 py-3 relative flex-[0_0_auto] cursor-pointer"
                aria-label="Login to your account"
              >
                <span className="text-brandsprimary text-[length:var(--button-normal-font-size)] leading-[var(--button-normal-line-height)] relative w-fit mt-[-1.00px] font-button-normal font-[number:var(--button-normal-font-weight)] text-center tracking-[var(--button-normal-letter-spacing)] whitespace-nowrap [font-style:var(--button-normal-font-style)]">
                  Login
                </span>
              </Link>

              <div className="relative w-px h-12 bg-neutrals-20" aria-hidden="true" />

              <Link
                href="/signup"
                className="no-underline all-[unset] box-border bg-brandsprimary inline-flex items-center justify-center gap-2.5 px-6 py-3 relative flex-[0_0_auto] cursor-pointer"
                aria-label="Sign up for an account"
              >
                <span className="text-neutrals-0 text-[length:var(--button-normal-font-size)] leading-[var(--button-normal-line-height)] relative w-fit mt-[-1.00px] font-button-normal font-[number:var(--button-normal-font-weight)] text-center tracking-[var(--button-normal-letter-spacing)] whitespace-nowrap [font-style:var(--button-normal-font-style)]">
                  Sign Up
                </span>
              </Link>
            </>
          )}
        </div>
      </header>
    </div>
  );
};
