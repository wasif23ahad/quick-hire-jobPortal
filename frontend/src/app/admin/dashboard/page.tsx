"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiBriefcase, FiMapPin, FiCalendar, FiLogOut, FiShield, FiClock, FiCheck, FiX } from "react-icons/fi";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  postedBy: {
    name: string;
    email: string;
  };
}

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchJobs = async (token: string) => {
    try {
      const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const API_URL = rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl.replace(/\/$/, '')}/api`;
      const res = await fetch(`${API_URL}/jobs/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setJobs(data.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin");
      return;
    }

    const fetchProfile = async () => {
      try {
        const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const API_URL = rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl.replace(/\/$/, '')}/api`;
        
        const res = await fetch(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();
        if (data.data.role !== "ADMIN") {
            throw new Error("Invalid role");
        }
        setUser(data.data);
        await fetchJobs(token);
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/admin");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleUpdateStatus = async (jobId: string, newStatus: "APPROVED" | "REJECTED") => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const API_URL = rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl.replace(/\/$/, '')}/api`;
      
      const res = await fetch(`${API_URL}/jobs/${jobId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        await fetchJobs(token);
      } else {
        alert("Failed to update status");
      }
    } catch (e) {
      console.error(e);
      alert("Error updating status");
    }
  };

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
          Loading admin portal...
        </div>
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-[#F8F8FD]">
      {/* Dashboard Header */}
      <section
        style={{
          background: "#B91C1C", // Red tone for Admin context
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
                  display: "flex",
                  alignItems: "center",
                  gap: "12px"
                }}
              >
                <FiShield /> Job Moderation Portal
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-epilogue)",
                  fontSize: "16px",
                  color: "rgba(255,255,255,0.8)",
                  margin: 0,
                }}
              >
                Super Admin Access - {user.name} ({user.email})
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
           <div style={{ background: "#FFFFFF", borderRadius: "12px", padding: "24px", border: "1px solid #D6DDEB", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: "32px", fontWeight: 700, color: "#FFB836", fontFamily: "var(--font-clash-display)" }}>
              {jobs.filter(j => j.status === 'PENDING').length}
            </div>
            <div style={{ color: "#7C8493", fontFamily: "var(--font-epilogue)", marginTop: "4px", fontSize: "14px" }}>Pending Review</div>
          </div>
          <div style={{ background: "#FFFFFF", borderRadius: "12px", padding: "24px", border: "1px solid #D6DDEB", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: "32px", fontWeight: 700, color: "#56CDAD", fontFamily: "var(--font-clash-display)" }}>
              {jobs.filter(j => j.status === 'APPROVED').length}
            </div>
            <div style={{ color: "#7C8493", fontFamily: "var(--font-epilogue)", marginTop: "4px", fontSize: "14px" }}>Approved Jobs</div>
          </div>
          <div style={{ background: "#FFFFFF", borderRadius: "12px", padding: "24px", border: "1px solid #D6DDEB", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: "32px", fontWeight: 700, color: "#B91C1C", fontFamily: "var(--font-clash-display)" }}>
              {jobs.filter(j => j.status === 'REJECTED').length}
            </div>
            <div style={{ color: "#7C8493", fontFamily: "var(--font-epilogue)", marginTop: "4px", fontSize: "14px" }}>Rejected Jobs</div>
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
          All System Jobs
        </h2>

        {jobs.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px", background: "#FFF", borderRadius: "12px", border: "1px solid #D6DDEB" }}>
             <FiBriefcase style={{ fontSize: "48px", color: "#D6DDEB", margin: "0 auto 16px" }} />
             <p style={{ fontFamily: "var(--font-epilogue)", color: "#7C8493" }}>No jobs found in the system.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {jobs.sort((a,b) => a.status === 'PENDING' ? -1 : 1).map((job) => (
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
                  borderLeft: `4px solid ${job.status === 'PENDING' ? '#FFB836' : job.status === 'APPROVED' ? '#56CDAD' : '#DC2626'}`
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
                      <span><strong style={{color:"#25324B"}}>{job.company}</strong></span>
                      <span>•</span>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <FiUser size={12} /> Posted by: {job.postedBy?.name} ({job.postedBy?.email})
                      </span>
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-epilogue)",
                        fontSize: "13px",
                        color: "#A8ADB7",
                        margin: "8px 0 0 0",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
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

                <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-end" }}>
                  {job.status === "PENDING" ? (
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => handleUpdateStatus(job.id, "APPROVED")}
                        style={{
                           display: "flex", alignItems: "center", gap: "6px",
                           padding: "8px 16px", background: "#56CDAD", color: "#FFF",
                           border: "none", borderRadius: "6px", fontWeight: 600,
                           fontFamily: "var(--font-epilogue)", cursor: "pointer", fontSize: "14px"
                        }}
                      >
                         <FiCheck /> Approve
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(job.id, "REJECTED")}
                        style={{
                           display: "flex", alignItems: "center", gap: "6px",
                           padding: "8px 16px", background: "white", color: "#DC2626",
                           border: "1px solid #DC2626", borderRadius: "6px", fontWeight: 600,
                           fontFamily: "var(--font-epilogue)", cursor: "pointer", fontSize: "14px"
                        }}
                      >
                         <FiX /> Reject
                      </button>
                    </div>
                  ) : (
                      <span style={{ 
                        display: "inline-flex", alignItems: "center", gap: "6px", 
                        padding: "6px 16px", 
                        background: job.status === "APPROVED" ? "rgba(86,205,173,0.1)" : "rgba(220,38,38,0.1)", 
                        color: job.status === "APPROVED" ? "#56CDAD" : "#DC2626", 
                        borderRadius: "100px", fontSize: "13px", fontWeight: 700 
                      }}>
                        {job.status === "APPROVED" ? <><FiCheck /> APPROVED</> : <><FiX /> REJECTED</>}
                      </span>
                  )}
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
                      View Details
                    </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
