"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiInfo } from "react-icons/fi";
import { EmployerSidebar } from "@/components/employer/EmployerSidebar";
import { EmployerTopBar } from "@/components/employer/EmployerTopBar";

export default function PlaceholderPage() {
  const router = useRouter();

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#FFFFFF" }}>
      <EmployerSidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
        <EmployerTopBar />
        <main style={{ flex: 1, overflowY: "auto", padding: "32px" }}>
          <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center", padding: "80px 0" }}>
            <FiInfo size={64} color="#D6DDEB" style={{ marginBottom: "24px" }} />
            <h1 style={{ fontFamily: "var(--font-clash-display)", fontSize: "32px", color: "#25324B" }}>Feature Coming Soon</h1>
            <p style={{ fontFamily: "var(--font-epilogue)", color: "#7C8493", marginBottom: "32px" }}>
              We are working hard to bring this feature to you. Stay tuned!
            </p>
            <button 
              onClick={() => router.push("/employer/dashboard")}
              style={{ 
                padding: "12px 24px", 
                background: "#4640DE", 
                color: "#FFF", 
                border: "none", 
                fontWeight: 600, 
                cursor: "pointer",
                fontFamily: "var(--font-epilogue)"
              }}
            >
              Back to Dashboard
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
