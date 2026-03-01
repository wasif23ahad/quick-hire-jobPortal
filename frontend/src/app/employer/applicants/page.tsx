"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiUser, FiMail, FiFileText, FiCalendar, FiExternalLink } from "react-icons/fi";


interface Application {
  id: string;
  name: string;
  email: string;
  resumeLink: string;
  coverNote: string;
  createdAt: string;
  job: {
    title: string;
  };
}

export default function ApplicantsPage() {
  const router = useRouter();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/employer/login");
      return;
    }

    const fetchApplications = async () => {
      try {
        const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const API_URL = rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl.replace(/\/$/, '')}/api`;

        const res = await fetch(`${API_URL}/applications/employer/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch applications");
        const data = await res.json();
        setApplications(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, [router]);

  return (
    <main style={{ flex: 1, overflowY: "auto", padding: "32px" }}>
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
              All Applicants ({applications.length})
            </h1>

            {isLoading ? (
              <p>Loading applicants...</p>
            ) : applications.length === 0 ? (
              <div style={{ 
                background: "#F8F8FD", 
                padding: "48px", 
                textAlign: "center", 
                border: "1px dashed #D6DDEB",
                borderRadius: "8px"
              }}>
                <FiUser size={48} color="#D6DDEB" style={{ marginBottom: "16px" }} />
                <p style={{ fontFamily: "var(--font-epilogue)", color: "#7C8493" }}>No applications received yet.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {applications.map((app) => (
                  <div 
                    key={app.id} 
                    style={{ 
                      background: "#FFFFFF", 
                      border: "1px solid #D6DDEB", 
                      padding: "24px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      fontFamily: "var(--font-epilogue)"
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                        <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 600, color: "#25324B" }}>{app.name}</h3>
                        <span style={{ 
                          fontSize: "12px", 
                          padding: "4px 8px", 
                          background: "rgba(70,64,222,0.1)", 
                          color: "#4640DE", 
                          fontWeight: 600 
                        }}>
                          {app.job.title}
                        </span>
                      </div>
                      
                      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#7C8493", fontSize: "14px" }}>
                          <FiMail size={14} /> {app.email}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#7C8493", fontSize: "14px" }}>
                          <FiCalendar size={14} /> Applied on {new Date(app.createdAt).toLocaleDateString()}
                        </div>
                      </div>

                      <div style={{ marginTop: "16px", padding: "12px", background: "#F8F8FD", fontSize: "14px", color: "#25324B", borderLeft: "4px solid #4640DE" }}>
                        <strong>Cover Note:</strong> {app.coverNote || "No cover note provided."}
                      </div>
                    </div>

                    <a 
                      href={app.resumeLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "8px", 
                        padding: "10px 20px", 
                        background: "#FFFFFF", 
                        border: "1px solid #D6DDEB", 
                        color: "#25324B", 
                        fontWeight: 600, 
                        textDecoration: "none",
                        fontSize: "14px"
                      }}
                    >
                      <FiFileText /> View Resume <FiExternalLink size={12} />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
  );
}
