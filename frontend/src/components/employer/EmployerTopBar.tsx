"use client";

import React from "react";
import Link from "next/link";
import { FiBell, FiChevronDown, FiPlus } from "react-icons/fi";

interface EmployerTopBarProps {
  companyName?: string;
  companyLogo?: string;
}

export const EmployerTopBar = ({ 
  companyName = "Nomad", 
  companyLogo = "/nomad-logo.png" 
}: EmployerTopBarProps) => {
  return (
    <header
      style={{
        height: "72px",
        background: "#FFFFFF",
        borderBottom: "1px solid #D6DDEB",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        position: "sticky",
        top: 0,
        zIndex: 90,
      }}
    >
      {/* Left: Company Selector */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ 
          width: "40px", 
          height: "40px", 
          borderRadius: "8px", 
          overflow: "hidden", 
          background: "#F8F8FD",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #D6DDEB"
        }}>
           {/* Mock logo using Initial or image if available */}
           <div style={{ 
             width: "24px", 
             height: "24px", 
             background: "#56CDAD", 
             borderRadius: "4px",
             display: "flex",
             alignItems: "center",
             justifyContent: "center",
             color: "#FFF",
             fontWeight: 700,
             fontSize: "12px"
           }}>
             N
           </div>
        </div>
        <div>
          <div style={{ fontSize: "12px", color: "#7C8493", fontFamily: "var(--font-epilogue)" }}>Company</div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>
            <span style={{ 
              fontFamily: "var(--font-clash-display)", 
              fontSize: "16px", 
              fontWeight: 600, 
              color: "#25324B" 
            }}>
              {companyName}
            </span>
            <FiChevronDown size={16} color="#25324B" />
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            color: "#7C8493",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <FiBell size={20} />
          <div style={{ 
            position: "absolute", 
            top: "8px", 
            right: "8px", 
            width: "6px", 
            height: "6px", 
            background: "#FF6550", 
            borderRadius: "50%",
            border: "2px solid #FFF"
          }} />
        </button>

        <Link
          href="/employer/create-job"
          style={{
            background: "#4640DE",
            color: "#FFFFFF",
            padding: "12px 24px",
            borderRadius: "0", // Matching the boxy design in image
            textDecoration: "none",
            fontFamily: "var(--font-epilogue)",
            fontWeight: 700,
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "background 0.2s ease"
          }}
        >
          <FiPlus size={18} />
          <span>Post a job</span>
        </Link>
      </div>
    </header>
  );
};
