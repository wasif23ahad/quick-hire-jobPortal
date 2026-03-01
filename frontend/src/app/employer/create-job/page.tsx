"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiPlus, FiBriefcase, FiMapPin, FiDollarSign, FiTag } from "react-icons/fi";
import { EmployerSidebar } from "@/components/employer/EmployerSidebar";
import { EmployerTopBar } from "@/components/employer/EmployerTopBar";

export default function CreateJobPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "Nomad", // Should ideally come from user profile
    location: "",
    category: "Design",
    type: "Full-Time",
    salary: "",
    description: "",
    tags: "",
  });

  const categories = ["Design", "Engineering", "Marketing", "Sales", "Customer Support", "Product"];
  const jobTypes = ["Full-Time", "Part-Time", "Remote", "Internship"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const API_URL = rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl.replace(/\/$/, '')}/api`;

      const res = await fetch(`${API_URL}/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(",").map(t => t.trim()).filter(t => t),
        }),
      });

      if (!res.ok) throw new Error("Failed to create job");

      alert("Job posted successfully! It will be live after admin approval.");
      router.push("/employer/dashboard");
    } catch (err) {
      alert("Error: " + (err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#FFFFFF" }}>
      <EmployerSidebar />
      
      <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
        <EmployerTopBar />
        
        <main style={{ flex: 1, overflowY: "auto", padding: "32px" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
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
              <FiArrowLeft /> Back
            </button>

            <h1 style={{ 
              fontFamily: "var(--font-clash-display)", 
              fontSize: "32px", 
              fontWeight: 600, 
              color: "#25324B",
              marginBottom: "8px"
            }}>
              Post a New Job
            </h1>
            <p style={{ 
              fontFamily: "var(--font-epilogue)", 
              fontSize: "16px", 
              color: "#7C8493",
              marginBottom: "40px"
            }}>
              Fill in the details below to reach potential candidates.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "14px", fontWeight: 600, color: "#25324B", fontFamily: "var(--font-epilogue)" }}>
                    Job Title
                  </label>
                  <input
                    required
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Senior UI/UX Designer"
                    style={{ 
                      padding: "12px 16px", 
                      border: "1px solid #D6DDEB", 
                      borderRadius: "0", 
                      fontSize: "14px",
                      fontFamily: "var(--font-epilogue)"
                    }}
                  />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "14px", fontWeight: 600, color: "#25324B", fontFamily: "var(--font-epilogue)" }}>
                    Location
                  </label>
                  <input
                    required
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Remote, Worldwide"
                    style={{ 
                      padding: "12px 16px", 
                      border: "1px solid #D6DDEB", 
                      borderRadius: "0", 
                      fontSize: "14px",
                      fontFamily: "var(--font-epilogue)"
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "14px", fontWeight: 600, color: "#25324B", fontFamily: "var(--font-epilogue)" }}>
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    style={{ 
                      padding: "12px 16px", 
                      border: "1px solid #D6DDEB", 
                      borderRadius: "0", 
                      fontSize: "14px",
                      fontFamily: "var(--font-epilogue)",
                      background: "#FFFFFF"
                    }}
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "14px", fontWeight: 600, color: "#25324B", fontFamily: "var(--font-epilogue)" }}>
                    Job Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    style={{ 
                      padding: "12px 16px", 
                      border: "1px solid #D6DDEB", 
                      borderRadius: "0", 
                      fontSize: "14px",
                      fontFamily: "var(--font-epilogue)",
                      background: "#FFFFFF"
                    }}
                  >
                    {jobTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontSize: "14px", fontWeight: 600, color: "#25324B", fontFamily: "var(--font-epilogue)" }}>
                  Salary Range (Optional)
                </label>
                <input
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="e.g. $80,000 - $120,000"
                  style={{ 
                    padding: "12px 16px", 
                    border: "1px solid #D6DDEB", 
                    borderRadius: "0", 
                    fontSize: "14px",
                    fontFamily: "var(--font-epilogue)"
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontSize: "14px", fontWeight: 600, color: "#25324B", fontFamily: "var(--font-epilogue)" }}>
                  Job Description
                </label>
                <textarea
                  required
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell us about the role..."
                  rows={6}
                  style={{ 
                    padding: "12px 16px", 
                    border: "1px solid #D6DDEB", 
                    borderRadius: "0", 
                    fontSize: "14px",
                    fontFamily: "var(--font-epilogue)",
                    resize: "vertical"
                  }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ fontSize: "14px", fontWeight: 600, color: "#25324B", fontFamily: "var(--font-epilogue)" }}>
                  Tags (Comma separated)
                </label>
                <input
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="e.g. React, UX, Tailwind"
                  style={{ 
                    padding: "12px 16px", 
                    border: "1px solid #D6DDEB", 
                    borderRadius: "0", 
                    fontSize: "14px",
                    fontFamily: "var(--font-epilogue)"
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  background: "#4640DE",
                  color: "#FFFFFF",
                  padding: "16px",
                  borderRadius: "0",
                  border: "none",
                  fontWeight: 700,
                  fontSize: "16px",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  marginTop: "16px",
                  fontFamily: "var(--font-epilogue)",
                  opacity: isSubmitting ? 0.7 : 1
                }}
              >
                {isSubmitting ? "Posting..." : "Post Job"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
