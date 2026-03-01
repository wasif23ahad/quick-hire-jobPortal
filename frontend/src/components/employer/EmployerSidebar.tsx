"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  FiHome, 
  FiMail, 
  FiGlobe, 
  FiUsers, 
  FiBriefcase, 
  FiCalendar, 
  FiSettings, 
  FiHelpCircle 
} from "react-icons/fi";

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", href: "/employer/dashboard", icon: FiHome },
  { id: "messages", label: "Messages", href: "/employer/messages", icon: FiMail, badge: 1 },
  { id: "profile", label: "Company Profile", href: "/employer/profile", icon: FiGlobe },
  { id: "applicants", label: "All Applicants", href: "/employer/applicants", icon: FiUsers },
  { id: "jobs", label: "Job Listing", href: "/employer/jobs", icon: FiBriefcase },
  { id: "schedule", label: "My Schedule", href: "/employer/schedule", icon: FiCalendar },
];

const settingsItems = [
  { id: "settings", label: "Settings", href: "/employer/settings", icon: FiSettings },
  { id: "help", label: "Help Center", href: "/employer/help", icon: FiHelpCircle },
];

export const EmployerSidebar = () => {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: "240px",
        height: "100vh",
        background: "#F8F8FD",
        borderRight: "1px solid #D6DDEB",
        display: "flex",
        flexDirection: "column",
        padding: "24px 0",
        flexShrink: 0,
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Brand */}
      <div style={{ padding: "0 24px", marginBottom: "32px", display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ width: "32px", height: "32px", background: "#4640DE", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#FFF", fontWeight: 700, fontSize: "16px" }}>Q</span>
        </div>
        <span style={{ 
          fontFamily: "var(--font-clash-display)", 
          fontSize: "20px", 
          fontWeight: 700, 
          color: "#25324B" 
        }}>
          QuickHire
        </span>
      </div>

      {/* Main Nav */}
      <nav style={{ flex: 1, padding: "0 12px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  background: isActive ? "rgba(70,64,222,0.1)" : "transparent",
                  color: isActive ? "#4640DE" : "#7C8493",
                  transition: "all 0.2s ease",
                  position: "relative",
                  fontFamily: "var(--font-epilogue)",
                  fontWeight: isActive ? 600 : 500,
                  fontSize: "14px",
                }}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
                {item.badge && (
                  <span style={{
                    marginLeft: "auto",
                    background: "#4640DE",
                    color: "#FFF",
                    fontSize: "10px",
                    fontWeight: 700,
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <div style={{ 
                    position: "absolute", 
                    right: "-12px", 
                    top: "50%", 
                    transform: "translateY(-50%)",
                    width: "4px",
                    height: "24px",
                    background: "#4640DE",
                    borderRadius: "4px 0 0 4px"
                  }} />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Settings Footer */}
      <div style={{ padding: "0 12px", borderTop: "1px solid #D6DDEB", paddingTop: "24px" }}>
        <p style={{ 
          padding: "0 16px", 
          fontSize: "12px", 
          fontWeight: 600, 
          color: "#7C8493", 
          marginBottom: "12px",
          letterSpacing: "0.5px"
        }}>
          SETTINGS
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {settingsItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  background: isActive ? "rgba(70,64,222,0.1)" : "transparent",
                  color: isActive ? "#4640DE" : "#7C8493",
                  transition: "all 0.2s ease",
                  fontFamily: "var(--font-epilogue)",
                  fontWeight: isActive ? 600 : 500,
                  fontSize: "14px",
                }}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
