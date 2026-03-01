"use client";

import React from "react";
import { FiChevronRight, FiEye, FiCheckCircle, FiMoreHorizontal, FiCalendar, FiMail, FiClipboard } from "react-icons/fi";

/* ─── Stat Summary Card ─── */
interface StatSummaryCardProps {
  value: string | number;
  label: string;
  color: string;
  href?: string;
  icon?: React.ReactNode;
}

export const StatSummaryCard = ({ value, label, color, href = "#", icon }: StatSummaryCardProps) => (
  <div
    style={{
      flex: 1,
      background: color,
      padding: "24px",
      color: "#FFFFFF",
      position: "relative",
      display: "flex",
      alignItems: "center",
      gap: "16px",
      minHeight: "120px",
      fontFamily: "var(--font-epilogue)",
    }}
  >
    <div style={{ fontSize: "52px", fontWeight: 700, fontFamily: "var(--font-clash-display)" }}>{value}</div>
    <div style={{ fontSize: "18px", opacity: 0.9, fontWeight: 500, flex: 1, lineHeight: "130%" }}>{label}</div>
    <FiChevronRight size={28} />
  </div>
);

/* ─── Custom Bar Chart Component ─── */
interface JobStatsChartProps {
  onFilterChange?: (filter: string) => void;
  activeFilter?: string;
  applications?: any[];
}

export const JobStatsChart = ({ onFilterChange, activeFilter = "Week", applications = [] }: JobStatsChartProps) => {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay() + 1);
  const shortDateOpts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  const dateStr = `${startOfWeek.toLocaleDateString('en-US', shortDateOpts)} - ${today.toLocaleDateString('en-US', shortDateOpts)}`;

  // Dynamically compute applications for the current week (Monday-Sunday)
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const dynamicData = weekDays.map((day, index) => {
    const dayDate = new Date(startOfWeek);
    dayDate.setDate(startOfWeek.getDate() + index);
    
    // Count applications for this specific day
    const appliedCount = applications.filter(app => {
      if (!app.createdAt) return false;
      const appDate = new Date(app.createdAt);
      return appDate.toDateString() === dayDate.toDateString();
    }).length;

    return { day, view: 0, applied: appliedCount };
  });

  const totalAppliedThisWeek = dynamicData.reduce((sum, item) => sum + item.applied, 0);

  return (
    <div style={{ flex: 2, display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ background: "#FFFFFF", border: "1px solid #D6DDEB", padding: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <div>
            <h3 style={{ margin: 0, fontFamily: "var(--font-clash-display)", fontSize: "20px", fontWeight: 600, color: "#25324B" }}>Job statistics</h3>
            <p style={{ fontSize: "14px", color: "#7C8493", margin: "4px 0 0 0" }}>Showing Jobstatistic {dateStr}</p>
          </div>
          <div style={{ display: "flex", gap: "2px", background: "#F8F8FD", padding: "4px", borderRadius: "8px" }}>
            {["Week", "Month", "Year"].map((t) => (
               <button 
                 key={t} 
                 onClick={() => onFilterChange?.(t)}
                 style={{ 
                   padding: "8px 16px", 
                   border: "none", 
                   background: activeFilter === t ? "#FFFFFF" : "transparent",
                   color: activeFilter === t ? "#4640DE" : "#7C8493",
                   fontSize: "13px",
                   fontWeight: 600,
                   borderRadius: "6px",
                   cursor: "pointer",
                   boxShadow: activeFilter === t ? "0 2px 8px rgba(0,0,0,0.06)" : "none"
                 }}
               >
                 {t}
               </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: "24px", marginBottom: "32px", borderBottom: "1px solid #D6DDEB" }}>
          {["Overview", "Jobs View", "Jobs Applied"].map((tab, idx) => (
            <div key={tab} style={{ 
              fontSize: "14px", 
              color: idx === 0 ? "#4640DE" : "#7C8493", 
              fontWeight: 600, 
              paddingBottom: "12px",
              borderBottom: idx === 0 ? "2px solid #4640DE" : "2px solid transparent",
              cursor: "pointer"
            }}>
              {tab}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "32px" }}>
          {/* Chart Area */}
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "16px", height: "240px", paddingBottom: "32px", width: "100%" }}>
              {dynamicData.map((item) => {
                const total = item.view + item.applied;
                // Avoid division by zero, scale to a max relative height or absolute max
                const maxVal = Math.max(...dynamicData.map(d => d.view + d.applied)) || 10;
                const viewH = (item.view / maxVal) * 100;
                const appliedH = (item.applied / maxVal) * 100;
                return (
                  <div key={item.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "100%", position: "relative", height: "180px", display: "flex", flexDirection: "column-reverse" }}>
                      <div style={{ width: "100%", height: `${appliedH}%`, background: "#4640DE", transition: "height 0.3s ease", minHeight: item.applied > 0 ? "4px" : "0" }} />
                      <div style={{ width: "100%", height: `${viewH}%`, background: "#FFB836", transition: "height 0.3s ease", minHeight: item.view > 0 ? "4px" : "0" }} />
                    </div>
                    <span style={{ fontSize: "12px", color: "#7C8493", fontFamily: "var(--font-epilogue)" }}>{item.day}</span>
                  </div>
                );
              })}
            </div>
            {/* Legend */}
            <div style={{ display: "flex", gap: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "12px", height: "12px", background: "#FFB836" }} />
                <span style={{ fontSize: "14px", color: "#7C8493" }}>Job View</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "12px", height: "12px", background: "#4640DE" }} />
                <span style={{ fontSize: "14px", color: "#7C8493" }}>Job Applied</span>
              </div>
            </div>
          </div>

          {/* Side Metrics */}
          <div style={{ width: "220px", display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ background: "#FFFFFF", border: "1px solid #D6DDEB", padding: "20px", display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: "14px", color: "#7C8493", marginBottom: "8px" }}>Job Views</div>
                <div style={{ fontSize: "24px", fontWeight: 700, color: "#25324B", fontFamily: "var(--font-clash-display)" }}>0</div>
                <div style={{ fontSize: "12px", color: "#4640DE", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                  This Week <span style={{ fontWeight: 700 }}>0%</span>
                </div>
              </div>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255,184,54,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFB836" }}>
                <FiEye size={18} />
              </div>
            </div>
            
            <div style={{ background: "#FFFFFF", border: "1px solid #D6DDEB", padding: "20px", display: "flex", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: "14px", color: "#7C8493", marginBottom: "8px" }}>Job Applied</div>
                <div style={{ fontSize: "24px", fontWeight: 700, color: "#25324B", fontFamily: "var(--font-clash-display)" }}>{totalAppliedThisWeek}</div>
                <div style={{ fontSize: "12px", color: "#56CDAD", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                   Recent Week
                </div>
              </div>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(70,64,222,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#4640DE" }}>
                <FiClipboard size={18} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Jobs Open Widget ─── */
export const JobOpenWidget = ({ count }: { count: number }) => (
  <div style={{ background: "#FFFFFF", border: "1px solid #D6DDEB", padding: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
    <h3 style={{ margin: 0, fontFamily: "var(--font-clash-display)", fontSize: "18px", fontWeight: 600, color: "#25324B" }}>Job Open</h3>
    <div style={{ display: "flex", alignItems: "flex-end", gap: "12px" }}>
      <span style={{ fontSize: "56px", fontWeight: 700, color: "#25324B", lineHeight: 1, fontFamily: "var(--font-clash-display)" }}>{count}</span>
      <span style={{ fontSize: "18px", color: "#7C8493", marginBottom: "10px", fontWeight: 500 }}>Jobs Opened</span>
    </div>
  </div>
);

/* ─── Applicants Summary Widget ─── */
interface ApplicantsSummaryWidgetProps {
  total: number;
  recentApplicants?: any[];
  applications?: any[];
}

export const ApplicantsSummaryWidget = ({ total, recentApplicants = [], applications = [] }: ApplicantsSummaryWidgetProps) => {
  // Compute dynamic segments
  const typeCounts: Record<string, number> = {
    'Full-Time': 0,
    'Internship': 0,
    'Part-Time': 0,
    'Contract': 0,
    'Remote': 0
  };

  applications.forEach(app => {
    const type = app.job?.type || 'Full-Time'; // Default to Full-Time if not found
    if (typeCounts[type] !== undefined) {
      typeCounts[type]++;
    } else {
      typeCounts['Full-Time']++; // Fallback tally
    }
  });

  const segments = [
    { label: "Full Time", count: typeCounts['Full-Time'], color: "#4640DE" },
    { label: "Internship", count: typeCounts['Internship'], color: "#56CDAD" },
    { label: "Part-Time", count: typeCounts['Part-Time'], color: "#26A4FF" },
    { label: "Contract", count: typeCounts['Contract'], color: "#FFB836" },
    { label: "Remote", count: typeCounts['Remote'], color: "#FF6550" },
  ];

  const totalCalculated = segments.reduce((sum, seg) => sum + seg.count, 0);

  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #D6DDEB", padding: "24px" }}>
      <h3 style={{ margin: 0, fontFamily: "var(--font-clash-display)", fontSize: "18px", fontWeight: 600, color: "#25324B", marginBottom: "24px" }}>Applicants Summary</h3>
      
      <div style={{ display: "flex", alignItems: "flex-end", gap: "12px", marginBottom: "24px" }}>
        <span style={{ fontSize: "56px", fontWeight: 700, color: "#25324B", lineHeight: 1, fontFamily: "var(--font-clash-display)" }}>{totalCalculated}</span>
        <span style={{ fontSize: "18px", color: "#7C8493", marginBottom: "10px", fontWeight: 500 }}>Applicants</span>
      </div>

      <div style={{ height: "10px", width: "100%", display: "flex", borderRadius: "100px", overflow: "hidden", marginBottom: "32px" }}>
        {segments.map((seg) => (
          <div key={seg.label} style={{ height: "100%", width: `${(seg.count / totalCalculated) * 100}%`, background: seg.color }} />
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          {segments.map((seg) => (
            <div key={seg.label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "2px", background: seg.color }} />
              <span style={{ fontSize: "14px", color: "#25324B", fontWeight: 500 }}>{seg.label} : <span style={{ color: "#7C8493" }}>{seg.count}</span></span>
            </div>
          ))}
        </div>
      </div>

      {recentApplicants.length > 0 && (
        <div style={{ marginTop: "32px", borderTop: "1px solid #D6DDEB", paddingTop: "24px" }}>
          <h4 style={{ margin: "0 0 16px 0", fontFamily: "var(--font-clash-display)", fontSize: "16px", fontWeight: 600, color: "#25324B" }}>Recent Applications</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {recentApplicants.slice(0, 3).map((app: any) => (
              <div key={app.id} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ 
                  width: "40px", height: "40px", borderRadius: "50%", background: "rgba(70,64,222,0.1)", 
                  color: "#4640DE", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 
                }}>
                  {app.name.charAt(0).toUpperCase()}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#25324B" }}>{app.name}</div>
                  <div style={{ fontSize: "12px", color: "#7C8493", marginTop: "2px" }}>Applied for {app.job?.title || "Role"}</div>
                </div>
                <a href={app.resumeLink} target="_blank" rel="noreferrer" style={{ background: "none", border: "none", color: "#4640DE", cursor: "pointer", display: "flex", alignItems: "center", padding: "8px" }}>
                  <FiClipboard size={16} />
                </a>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "16px" }}>
            <a href="/employer/applicants" style={{ fontSize: "14px", color: "#4640DE", textDecoration: "none", fontWeight: 600 }}>View All {recentApplicants.length} Applicants</a>
          </div>
        </div>
      )}
    </div>
  );
};
