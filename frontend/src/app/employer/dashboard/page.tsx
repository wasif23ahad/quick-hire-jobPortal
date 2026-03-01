"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiBriefcase, FiMapPin, FiCalendar, FiLogOut, FiUser, FiPlusCircle, FiClock, FiCheckCircle, FiXCircle, FiEye, FiDownload, FiMoreHorizontal } from "react-icons/fi";
import { EmployerSidebar } from "@/components/employer/EmployerSidebar";
import { EmployerTopBar } from "@/components/employer/EmployerTopBar";
import { StatSummaryCard, JobStatsChart, JobOpenWidget, ApplicantsSummaryWidget } from "@/components/employer/DashboardWidgets";


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
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [chartFilter, setChartFilter] = useState("Week");

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
        
        // Role check
        if (profileData.data.role === "USER") {
           router.push("/dashboard");
           return;
        } else if (profileData.data.role !== "EMPLOYER") {
            throw new Error("Invalid role");
        }
        
        setUser(profileData.data);

        // Fetch employer jobs and applications in parallel
        const [jobsRes, appsRes] = await Promise.all([
          fetch(`${API_URL}/jobs/employer/me`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_URL}/applications/employer/me`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);

        if (jobsRes.ok) {
          const jobsData = await jobsRes.json();
          setJobs(jobsData.data);
        }

        if (appsRes.ok) {
          const appsData = await appsRes.json();
          setApplications(appsData.data);
        }

      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.dispatchEvent(new Event("storage"));
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
    <div style={{ display: "flex", minHeight: "100vh", background: "#FFFFFF" }}>
      <EmployerSidebar />
      
      <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
        <EmployerTopBar companyName={user.name} />
        
        <main style={{ flex: 1, overflowY: "auto", padding: "32px" }}>
          <div style={{ width: "100%", maxWidth: "1600px", margin: "0 auto" }}>
            {/* Greeting */}
            <div style={{ marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h1 style={{ 
                  margin: 0, 
                  fontFamily: "var(--font-clash-display)", 
                  fontSize: "24px", 
                  fontWeight: 600, 
                  color: "#25324B" 
                }}>
                  Good morning, {user.name.split(' ')[0]}
                </h1>
                <p style={{ 
                  margin: "8px 0 0 0", 
                  fontFamily: "var(--font-epilogue)", 
                  fontSize: "16px", 
                  color: "#7C8493" 
                }}>
                  Here is your job listings statistic report from July 19 - July 25.
                </p>
              </div>
              
              <div style={{ 
                border: "1px solid #D6DDEB", 
                padding: "8px 16px", 
                display: "flex", 
                alignItems: "center", 
                gap: "12px",
                fontFamily: "var(--font-epilogue)",
                fontSize: "14px",
                color: "#25324B"
              }}>
                <span>Jul 19 - Jul 25</span>
                <FiCalendar color="#4640DE" />
              </div>
            </div>

            {/* Top Summaries: 3 Cards */}
            <div style={{ display: "flex", gap: "24px", marginBottom: "32px" }}>
              <StatSummaryCard 
                value={applications.length} 
                label="New candidates to review" 
                color="#4640DE" 
              />
              <StatSummaryCard 
                value="3" 
                label="Schedule for today" 
                color="#56CDAD" 
              />
              <StatSummaryCard 
                value="24" 
                label="Messages received" 
                color="#26A4FF" 
              />
            </div>

            {/* main Grid: Statistics Chart + Side Widgets */}
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 340px", gap: "24px", marginBottom: "40px" }}>
              {/* Left Column: Job Statistics (Large) */}
              <JobStatsChart activeFilter={chartFilter} onFilterChange={setChartFilter} />
              
              {/* Right Column: Mini Widgets */}
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <JobOpenWidget count={jobs.filter(j => j.status === 'APPROVED').length} />
                <ApplicantsSummaryWidget total={applications.length} />
              </div>
            </div>

            {/* Bottom: Recent Job Postings */}
            <div style={{ background: "#FFFFFF", border: "1px solid #D6DDEB", padding: "32px", marginBottom: "40px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                  <h3 style={{ margin: 0, fontFamily: "var(--font-clash-display)", fontSize: "20px", fontWeight: 600, color: "#25324B" }}>Recent Job Postings</h3>
                  <Link href="/employer/jobs" style={{ fontSize: "14px", color: "#4640DE", textDecoration: "none", fontWeight: 600 }}>View All</Link>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {jobs.length === 0 ? (
                    <p style={{ textAlign: "center", color: "#7C8493", padding: "20px", fontFamily: "var(--font-epilogue)" }}>No jobs posted yet.</p>
                  ) : (
                    jobs.slice(0, 5).map(job => (
                      <div key={job.id} style={{ 
                        padding: "20px 24px", 
                        border: "1px solid #F8F8FD", 
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "center",
                        fontFamily: "var(--font-epilogue)"
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                          <div style={{ 
                            width: "48px", 
                            height: "48px", 
                            background: "#F8F8FD", 
                            border: "1px solid #D6DDEB",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "8px"
                          }}>
                             <FiBriefcase size={20} color="#4640DE" />
                          </div>
                          <div>
                            <div style={{ fontSize: "16px", fontWeight: 600, color: "#25324B" }}>{job.title}</div>
                            <div style={{ fontSize: "14px", color: "#7C8493", marginTop: "4px" }}>{job.type} • {job.location}</div>
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
                           <div style={{ 
                             fontSize: "12px", 
                             padding: "6px 16px", 
                             borderRadius: "100px", 
                             fontWeight: 600,
                             background: job.status === "APPROVED" ? "rgba(86,205,173,0.1)" : "rgba(255,184,54,0.1)",
                             color: job.status === "APPROVED" ? "#56CDAD" : "#FFB836"
                           }}>
                              {job.status}
                           </div>
                           <FiMoreHorizontal size={24} color="#7C8493" style={{ cursor: "pointer" }} />
                        </div>
                      </div>
                    ))
                  )}
                </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
