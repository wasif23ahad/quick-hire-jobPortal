"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiBriefcase, FiMapPin, FiCalendar, FiLogOut, FiUser, FiPlusCircle, FiClock, FiCheckCircle, FiXCircle } from "react-icons/fi";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function EmployerDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/employer/login");
      return;
    }

    const fetchData = async () => {
      try {
        const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const API_URL = rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl.replace(/\/$/, '')}/api`;
        
        // Fetch profile
        const profileRes = await fetch(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!profileRes.ok) throw new Error("Unauthorized");
        const profileData = await profileRes.json();
        if (profileData.data.role !== "EMPLOYER") {
            throw new Error("Invalid role");
        }
        setUser(profileData.data);

        // Fetch employer jobs
        const jobsRes = await fetch(`${API_URL}/jobs/employer/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (jobsRes.ok) {
          const jobsData = await jobsRes.json();
          setJobs(jobsData.data);
        }
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/employer/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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
          Loading your dashboard...
        </div>
      </main>
    );
  }

  if (!user) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return (
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "4px 12px", background: "rgba(86,205,173,0.1)", color: "#56CDAD", borderRadius: "100px", fontSize: "12px", fontWeight: 600 }}>
            <FiCheckCircle size={14} /> Approved
          </span>
        );
      case "PENDING":
        return (
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "4px 12px", background: "rgba(255,184,54,0.1)", color: "#FFB836", borderRadius: "100px", fontSize: "12px", fontWeight: 600 }}>
            <FiClock size={14} /> Pending
          </span>
        );
      case "REJECTED":
        return (
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "4px 12px", background: "rgba(220,38,38,0.1)", color: "#DC2626", borderRadius: "100px", fontSize: "12px", fontWeight: 600 }}>
            <FiXCircle size={14} /> Rejected
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F8FD]">
      {/* Dashboard Header */}
      <section
        style={{
          background: "#25324B",
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
                Employer Portal
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
                Logged in as {user.name} ({user.email})
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
           <div style={{ background: "#FFFFFF", borderRadius: "12px", padding: "24px", border: "1px solid #D6DDEB", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: "32px", fontWeight: 700, color: "#4640DE", fontFamily: "var(--font-clash-display)" }}>
              {jobs.length}
            </div>
            <div style={{ color: "#7C8493", fontFamily: "var(--font-epilogue)", marginTop: "4px", fontSize: "14px" }}>Total Jobs Posted</div>
          </div>
          <div style={{ background: "#FFFFFF", borderRadius: "12px", padding: "24px", border: "1px solid #D6DDEB", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: "32px", fontWeight: 700, color: "#56CDAD", fontFamily: "var(--font-clash-display)" }}>
              {jobs.filter(j => j.status === 'APPROVED').length}
            </div>
            <div style={{ color: "#7C8493", fontFamily: "var(--font-epilogue)", marginTop: "4px", fontSize: "14px" }}>Active/Approved</div>
          </div>
          <div style={{ background: "#FFFFFF", borderRadius: "12px", padding: "24px", border: "1px solid #D6DDEB", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: "32px", fontWeight: 700, color: "#FFB836", fontFamily: "var(--font-clash-display)" }}>
              {jobs.filter(j => j.status === 'PENDING').length}
            </div>
            <div style={{ color: "#7C8493", fontFamily: "var(--font-epilogue)", marginTop: "4px", fontSize: "14px" }}>Pending Review</div>
          </div>
          <div style={{ background: "#FFFFFF", borderRadius: "12px", padding: "24px", border: "1px solid #D6DDEB", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
             <Link
              href="/employer/create-job"
              style={{
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                color: "#4640DE",
                textDecoration: "none",
                fontWeight: 600,
                fontFamily: "var(--font-epilogue)",
              }}
            >
              <FiPlusCircle size={32} />
              <span>Post New Job</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Job Listings */}
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
          Your Job Postings
        </h2>

        {jobs.length === 0 ? (
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
              You haven&apos;t posted any jobs yet.
            </p>
            <Link
              href="/employer/create-job"
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
              Create Job Post
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {jobs.map((job) => (
              <div
                key={job.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "#FFFFFF",
                  borderRadius: "12px",
                  padding: "20px 24px",
                  border: "1px solid #D6DDEB",
                  textDecoration: "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
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
                      {job.title}
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
                      <span>{job.company}</span>
                      <span>•</span>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <FiMapPin size={12} /> {job.location}
                      </span>
                      <span>•</span>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <FiBriefcase size={12} /> {job.type}
                      </span>
                      <span>•</span>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <FiCalendar size={12} /> {new Date(job.createdAt).toLocaleDateString()}
                      </span>
                    </p>
                  </div>
                </div>

                <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end" }}>
                  {getStatusBadge(job.status)}
                  {job.status === "APPROVED" && (
                    <Link
                      href={`/jobs/${job.id}`}
                      style={{
                        fontSize: "12px",
                        color: "#4640DE",
                        textDecoration: "underline",
                        fontFamily: "var(--font-epilogue)",
                        fontWeight: 600
                      }}
                    >
                      View Live Posting
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
