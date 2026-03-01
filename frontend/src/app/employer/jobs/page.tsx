"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiBriefcase, FiMapPin, FiCalendar } from "react-icons/fi";

interface Job {
  id: string;
  title: string;
  location: string;
  type: string;
  status: string;
  createdAt: string;
  _count: { applications: number };
}

export default function EmployerJobsPage() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/employer/login");
      return;
    }

    const fetchJobs = async () => {
      try {
        const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const API_URL = rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl.replace(/\/$/, '')}/api`;

        const res = await fetch(`${API_URL}/jobs/employer/me`, {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store"
        });

        if (!res.ok) throw new Error("Failed to fetch jobs");
        const data = await res.json();
        setJobs(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [router]);

  return (
    <main style={{ flex: 1, overflowY: "auto", padding: "32px", background: "#FFFFFF" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <button 
              onClick={() => router.back()}
              style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "8px", 
                background: "none", 
                border: "none", 
                color: "#4640DE", 
                fontWeight: 600, 
                cursor: "pointer",
                marginBottom: "24px",
                fontFamily: "var(--font-epilogue)"
              }}
            >
              <FiArrowLeft /> Back to Dashboard
            </button>

            <h1 style={{ 
              fontFamily: "var(--font-clash-display)", 
              fontSize: "32px", 
              fontWeight: 600, 
              color: "#25324B",
              marginBottom: "40px"
            }}>
              Your Job Listings ({jobs.length})
            </h1>

            {isLoading ? (
              <p>Loading jobs...</p>
            ) : jobs.length === 0 ? (
              <p>No jobs posted yet.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {jobs.map((job) => (
                  <div 
                    key={job.id} 
                    style={{ 
                      background: "#FFFFFF", 
                      border: "1px solid #D6DDEB", 
                      padding: "24px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontFamily: "var(--font-epilogue)"
                    }}
                  >
                    <div>
                      <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 600, color: "#25324B" }}>{job.title}</h3>
                      <div style={{ display: "flex", gap: "12px", color: "#7C8493", fontSize: "14px", marginTop: "4px" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><FiMapPin size={14} /> {job.location}</span>
                        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><FiBriefcase size={14} /> {job.type}</span>
                        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}><FiCalendar size={14} /> {new Date(job.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <div style={{ 
                        fontSize: "12px", 
                        padding: "4px 12px", 
                        borderRadius: "100px",
                        fontWeight: 600,
                        background: job.status === "APPROVED" ? "rgba(86,205,173,0.1)" : "rgba(255,184,54,0.1)",
                        color: job.status === "APPROVED" ? "#56CDAD" : "#FFB836",
                        marginBottom: "8px",
                        display: "inline-block"
                      }}>
                        {job.status}
                      </div>
                      <div style={{ fontSize: "14px", color: "#7C8493" }}>
                        <strong>{job._count.applications}</strong> Applications
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
  );
}
