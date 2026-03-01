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
  { id: "messages", label: "Messages", href: "/employer/messages", icon: FiMail },
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
  // Dynamic state for unread messages (can be hooked up to an API later)
  const [unreadMessages, setUnreadMessages] = React.useState(0);

  return (
    <aside
      style={{
        width: "260px",
        height: "100vh",
        background: "#F8F8FD",
        borderRight: "1px solid #D6DDEB",
        display: "flex",
        flexDirection: "column",
        padding: "32px 0",
        flexShrink: 0,
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Brand */}
      <div style={{ padding: "0 32px", marginBottom: "40px", display: "flex", alignItems: "center" }}>
        <img src="/logo.svg" alt="QuickHire" style={{ height: "36px", width: "auto", objectFit: "contain" }} />
      </div>

      {/* Main Nav */}
      <nav style={{ flex: 1, padding: "0" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            const badgeCount = item.id === 'messages' ? unreadMessages : (item as any).badge;
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className="group hover:bg-[rgba(70,64,222,0.05)] transition-colors duration-300"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "16px 32px",
                  textDecoration: "none",
                  background: isActive ? "rgba(70,64,222,0.1)" : "transparent",
                  color: isActive ? "#4640DE" : "#7C8493",
                  position: "relative",
                  fontFamily: "var(--font-epilogue)",
                  fontWeight: isActive ? 600 : 500,
                  fontSize: "16px",
                  borderLeft: isActive ? "4px solid #4640DE" : "4px solid transparent",
                }}
              >
                <item.icon 
                  size={24} 
                  color={isActive ? "#4640DE" : "#7C8493"} 
                  className={!isActive ? "group-hover:text-[#4640DE] transition-colors duration-300" : ""}
                />
                <span className={!isActive ? "group-hover:text-[#4640DE] transition-colors duration-300" : ""}>
                  {item.label}
                </span>
                
                {badgeCount ? (
                  <span 
                    className="group-hover:scale-110 group-hover:shadow-[0_0_12px_rgba(70,64,222,0.6)] group-hover:bg-[#342BBF] transition-all duration-300 transform-gpu"
                    style={{
                      marginLeft: "auto",
                      background: "#4640DE",
                      color: "#FFF",
                      fontSize: "12px",
                      fontWeight: 700,
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    {badgeCount}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Settings Footer */}
      <div style={{ borderTop: "1px solid #D6DDEB", paddingTop: "32px", paddingBottom: "32px" }}>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {settingsItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "16px 32px",
                  textDecoration: "none",
                  background: isActive ? "rgba(70,64,222,0.1)" : "transparent",
                  color: isActive ? "#4640DE" : "#7C8493",
                  transition: "all 0.2s ease",
                  fontFamily: "var(--font-epilogue)",
                  fontWeight: isActive ? 600 : 500,
                  fontSize: "16px",
                  borderLeft: isActive ? "4px solid #4640DE" : "4px solid transparent",
                }}
              >
                <item.icon size={24} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
