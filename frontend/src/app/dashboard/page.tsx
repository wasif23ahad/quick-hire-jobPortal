"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiBriefcase, FiMapPin, FiCalendar, FiLogOut, FiUser } from "react-icons/fi";

interface Application {
  id: string;
  name: string;
  email: string;
  resumeLink: string;
  coverNote: string;
  createdAt: string;
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    companyLogo: string | null;
  };
}

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  applications: Application[];
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const API_URL = rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl.replace(/\/$/, '')}/api`;
        const res = await fetch(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.dispatchEvent(new Event("storage"));
          router.push("/login");
          return;
        }

        const data = await res.json();
        
        // Role check
        if (data.data.role === "EMPLOYER") {
          router.push("/employer/dashboard");
          return;
        } else if (data.data.role === "ADMIN") {
          router.push("/admin/dashboard");
          return;
        }

        setUser(data.data);
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.dispatchEvent(new Event("storage"));
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("storage"));
    router.push("/");
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#F8F8FD] flex items-center justify-center">
        <div style={{ fontFamily: "var(--font-epilogue)", color: "#7C8493", fontSize: "18px" }}>
          Loading dashboard...
        </div>
      </main>
    );
  }

  if (!user) return null;

  const getInitial = (company: string) => company.charAt(0).toUpperCase();

  const companyColors: Record<string, string> = {
    "Revolut": "#0075EB",
    "Dropbox": "#0062FF",
    "Pitch": "#6C5CE7",
    "Blinkist": "#2ECC71",
    "ClassPass": "#FF6347",
    "Canva": "#00C4CC",
    "GoDaddy": "#1BDBDB",
    "Twitter": "#1DA1F2",
    "Netflix": "#E50914",
    "Nike": "#111111",
    "Stripe": "#635BFF",
    "Figma": "#A259FF",
    "Notion": "#000000",
    "Slack": "#4A154B",
    "Spotify": "#1DB954",
  };

  return (
    <main className="min-h-screen bg-[#F8F8FD]">
      {/* Dashboard Header */}
      <section
        style={{
          background: "#4640DE",
          padding: "48px 0",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <h1
                style={{
                  fontFamily: "var(--font-clash-display)",
                  fontWeight: 600,
                  fontSize: "36px",
                  color: "#FFFFFF",
                  margin: "0 0 8px 0",
                }}
              >
                Welcome, {user.name}!
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-epilogue)",
                  fontSize: "16px",
                  color: "rgba(255,255,255,0.8)",
                  margin: 0,
                }}
              >
                <FiUser style={{ display: "inline", marginRight: "8px", verticalAlign: "middle" }} />
                {user.email}
              </p>
            </div>

            <button
              onClick={handleLogout}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "8px",
                color: "#FFFFFF",
                fontFamily: "var(--font-epilogue)",
                fontWeight: 600,
                fontSize: "14px",
                cursor: "pointer",
                transition: "background 0.2s ease",
              }}
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section style={{ maxWidth: "1200px", margin: "-30px auto 0", padding: "0 24px", position: "relative", zIndex: 2 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "12px",
              padding: "24px",
              border: "1px solid #D6DDEB",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ fontSize: "32px", fontWeight: 700, color: "#4640DE", fontFamily: "var(--font-clash-display)" }}>
              {user.applications.length}
            </div>
            <div style={{ color: "#7C8493", fontFamily: "var(--font-epilogue)", marginTop: "4px" }}>
              Jobs Applied
            </div>
          </div>

          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "12px",
              padding: "24px",
              border: "1px solid #D6DDEB",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ fontSize: "32px", fontWeight: 700, color: "#56CDAD", fontFamily: "var(--font-clash-display)" }}>
              {user.role}
            </div>
            <div style={{ color: "#7C8493", fontFamily: "var(--font-epilogue)", marginTop: "4px" }}>
              Account Type
            </div>
          </div>

          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "12px",
              padding: "24px",
              border: "1px solid #D6DDEB",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ fontSize: "32px", fontWeight: 700, color: "#FFB836", fontFamily: "var(--font-clash-display)" }}>
              {new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
            </div>
            <div style={{ color: "#7C8493", fontFamily: "var(--font-epilogue)", marginTop: "4px" }}>
              Member Since
            </div>
          </div>
        </div>
      </section>

      {/* Applied Jobs */}
      <section style={{ maxWidth: "1200px", margin: "40px auto 60px", padding: "0 24px" }}>
        <h2
          style={{
            fontFamily: "var(--font-clash-display)",
            fontWeight: 600,
            fontSize: "28px",
            color: "#25324B",
            margin: "0 0 24px 0",
          }}
        >
          Your Applied Jobs
        </h2>

        {user.applications.length === 0 ? (
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "12px",
              padding: "60px",
              border: "1px solid #D6DDEB",
              textAlign: "center",
            }}
          >
            <FiBriefcase style={{ fontSize: "48px", color: "#D6DDEB", margin: "0 auto 16px" }} />
            <p style={{ fontFamily: "var(--font-epilogue)", color: "#7C8493", fontSize: "18px", margin: "0 0 16px" }}>
              You haven&apos;t applied to any jobs yet
            </p>
            <Link
              href="/jobs"
              style={{
                display: "inline-block",
                padding: "12px 32px",
                background: "#4640DE",
                color: "#FFFFFF",
                borderRadius: "8px",
                fontFamily: "var(--font-epilogue)",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {user.applications.map((app) => (
              <Link
                key={app.id}
                href={`/jobs/${app.job.id}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "#FFFFFF",
                  borderRadius: "12px",
                  padding: "20px 24px",
                  border: "1px solid #D6DDEB",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "8px",
                      background: companyColors[app.job.company] || "#4640DE",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#FFFFFF",
                      fontFamily: "var(--font-clash-display)",
                      fontWeight: 700,
                      fontSize: "20px",
                    }}
                  >
                    {getInitial(app.job.company)}
                  </div>

                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-clash-display)",
                        fontWeight: 600,
                        fontSize: "18px",
                        color: "#25324B",
                        margin: "0 0 4px",
                      }}
                    >
                      {app.job.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-epilogue)",
                        fontSize: "14px",
                        color: "#7C8493",
                        margin: 0,
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <span>{app.job.company}</span>
                      <span>•</span>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <FiMapPin size={12} /> {app.job.location}
                      </span>
                      <span>•</span>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <FiBriefcase size={12} /> {app.job.type}
                      </span>
                    </p>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "4px 12px",
                      background: "rgba(86,205,173,0.1)",
                      color: "#56CDAD",
                      borderRadius: "4px",
                      fontFamily: "var(--font-epilogue)",
                      fontWeight: 600,
                      fontSize: "12px",
                      marginBottom: "4px",
                    }}
                  >
                    Applied
                  </span>
                  <p
                    style={{
                      fontFamily: "var(--font-epilogue)",
                      fontSize: "12px",
                      color: "#7C8493",
                      margin: 0,
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      justifyContent: "flex-end",
                    }}
                  >
                    <FiCalendar size={11} />
                    {new Date(app.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
