"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store auth data
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));

      // Dispatch storage event for Navbar to pick up
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
            Welcome Back
          </h1>
          <p
            style={{
              fontFamily: "var(--font-epilogue)",
              fontSize: "16px",
              color: "#7C8493",
              marginTop: "8px",
            }}
          >
            Log in to your QuickHire account
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
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="••••••••"
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
              {isLoading ? "Logging in..." : "Login"}
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
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              style={{
                color: "#4640DE",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
