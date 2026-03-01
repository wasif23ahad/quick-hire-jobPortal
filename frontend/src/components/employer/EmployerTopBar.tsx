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
        height: "80px",
        background: "#FFFFFF",
        borderBottom: "1px solid #D6DDEB",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        position: "sticky",
        top: 0,
        zIndex: 90,
      }}
    >
      {/* Left: Company Selector */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ 
          width: "48px", 
          height: "48px", 
          borderRadius: "8px", 
          overflow: "hidden", 
          background: "#F8F8FD",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #D6DDEB"
        }}>
           <div style={{ 
             width: "32px", 
             height: "32px", 
             background: "#56CDAD", 
             borderRadius: "4px",
             display: "flex",
             alignItems: "center",
             justifyContent: "center",
             color: "#FFF",
             fontWeight: 700,
             fontSize: "16px"
           }}>
             {companyName.charAt(0).toUpperCase()}
           </div>
        </div>
        <div>
          <div style={{ fontSize: "12px", color: "#7C8493", fontFamily: "var(--font-epilogue)", fontWeight: 500 }}>Company</div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
            <span style={{ 
              fontFamily: "var(--font-clash-display)", 
              fontSize: "18px", 
              fontWeight: 600, 
              color: "#25324B" 
            }}>
              {companyName}
            </span>
            <FiChevronDown size={20} color="#25324B" />
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
          <FiBell size={24} />
          <div style={{ 
            position: "absolute", 
            top: "8px", 
            right: "8px", 
            width: "8px", 
            height: "8px", 
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
            padding: "16px 32px",
            borderRadius: "0",
            textDecoration: "none",
            fontFamily: "var(--font-epilogue)",
            fontWeight: 700,
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            transition: "all 0.2s ease",
            boxShadow: "0px 4px 6px rgba(70, 64, 222, 0.2)"
          }}
        >
          <FiPlus size={20} />
          <span>Post a job</span>
        </Link>
      </div>
    </header>
  );
};
