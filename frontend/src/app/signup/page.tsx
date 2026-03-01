"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const API_URL = rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl.replace(/\/$/, '')}/api`;
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          throw new Error(data.errors.map((e: any) => e.message).join(", "));
        }
        throw new Error(data.message || "Registration failed");
      }

      // Auto-login: store auth data
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));

      window.dispatchEvent(new Event("storage"));

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F8FD] flex items-center justify-center px-4">
      <div className="w-full max-w-[480px]">
        <div className="text-center mb-8">
          <h1
            style={{
              fontFamily: "var(--font-clash-display)",
              fontWeight: 600,
              fontSize: "36px",
              color: "#25324B",
            }}
          >
            Create Account
          </h1>
          <p
            style={{
              fontFamily: "var(--font-epilogue)",
              fontSize: "16px",
              color: "#7C8493",
              marginTop: "8px",
            }}
          >
            Join QuickHire and find your dream job
          </p>
        </div>

        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #D6DDEB",
            borderRadius: "8px",
            padding: "40px",
          }}
        >
          {error && (
            <div
              style={{
                background: "#FEF2F2",
                border: "1px solid #FECACA",
                borderRadius: "8px",
                padding: "12px 16px",
                marginBottom: "24px",
                color: "#DC2626",
                fontFamily: "var(--font-epilogue)",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontFamily: "var(--font-clash-display)",
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#25324B",
                  marginBottom: "8px",
                }}
              >
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="John Doe"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #D6DDEB",
                  borderRadius: "8px",
                  fontFamily: "var(--font-epilogue)",
                  fontSize: "16px",
                  color: "#25324B",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  fontFamily: "var(--font-clash-display)",
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#25324B",
                  marginBottom: "8px",
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="john@example.com"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  border: "1px solid #D6DDEB",
                  borderRadius: "8px",
                  fontFamily: "var(--font-epilogue)",
                  fontSize: "16px",
                  color: "#25324B",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "block",
                  fontFamily: "var(--font-clash-display)",
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#25324B",
                  marginBottom: "8px",
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Min. 6 characters"
                  style={{
                    width: "100%",
                    padding: "12px 40px 12px 16px",
                    border: "1px solid #D6DDEB",
                    borderRadius: "8px",
                    fontFamily: "var(--font-epilogue)",
                    fontSize: "16px",
                    color: "#25324B",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#A8ADB7",
                  }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "14px",
                background: isLoading ? "#A8A4F0" : "#4640DE",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "8px",
                fontFamily: "var(--font-epilogue)",
                fontWeight: 700,
                fontSize: "16px",
                cursor: isLoading ? "not-allowed" : "pointer",
                transition: "background 0.2s ease",
              }}
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: "24px",
              fontFamily: "var(--font-epilogue)",
              fontSize: "14px",
              color: "#7C8493",
            }}
          >
            Already have an account?{" "}
            <Link
              href="/login"
              style={{
                color: "#4640DE",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
