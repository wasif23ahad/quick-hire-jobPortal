"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiBell, FiChevronDown, FiPlus, FiLogOut } from "react-icons/fi";

interface EmployerTopBarProps {
  companyName?: string;
  companyLogo?: string;
}

export const EmployerTopBar = ({ 
  companyName = "Nomad", 
  companyLogo = "/nomad-logo.png" 
}: EmployerTopBarProps) => {
  const [showDropdown, setShowDropdown] = useState(false);

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
      <div style={{ position: "relative" }}>
        <button 
          onClick={() => setShowDropdown(!showDropdown)}
          style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "12px",
            padding: "8px 16px",
            border: "2px solid #25324B",
            borderRadius: "8px",
            background: "#FFFFFF",
            cursor: "pointer",
            fontFamily: "var(--font-epilogue)"
          }}
        >
          <div style={{ 
            width: "32px", 
            height: "32px", 
            background: "#4640DE", 
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFF",
            fontWeight: 700,
            fontSize: "14px"
          }}>
             {companyName.charAt(0).toUpperCase()}
          </div>
          <span style={{ 
            fontFamily: "var(--font-epilogue)", 
            fontSize: "16px", 
            fontWeight: 600, 
            color: "#25324B" 
          }}>
            {companyName}
          </span>
          <FiChevronDown 
            size={18} 
            color="#25324B" 
            style={{ 
              transform: showDropdown ? "rotate(180deg)" : "rotate(0deg)", 
              transition: "transform 0.2s",
              marginLeft: "4px"
            }} 
          />
        </button>

        {showDropdown && (
          <div style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            minWidth: "100%",
            background: "#FFFFFF",
            border: "1px solid #D6DDEB",
            borderRadius: "8px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            overflow: "hidden"
          }}>
            <button
               onClick={() => {
                 localStorage.removeItem("token");
                 localStorage.removeItem("user");
                 window.location.href = "/employer/login";
               }}
               style={{
                 width: "100%",
                 padding: "12px 16px",
                 background: "none",
                 border: "none",
                 textAlign: "left",
                 cursor: "pointer",
                 fontFamily: "var(--font-epilogue)",
                 fontSize: "14px",
                 color: "#DC2626",
                 fontWeight: 500,
                 display: "flex",
                 alignItems: "center",
                 gap: "8px"
               }}
            >
              <FiLogOut size={16} />
              Log out
            </button>
          </div>
        )}
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
