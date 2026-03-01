"use client";

import React from "react";
import { FiChevronRight, FiEye, FiDownload } from "react-icons/fi";

/* ─── Stat Summary Card ─── */
interface StatSummaryCardProps {
  value: string | number;
  label: string;
  color: string;
  href?: string;
}

export const StatSummaryCard = ({ value, label, color, href = "#" }: StatSummaryCardProps) => (
  <div
    style={{
      flex: 1,
      background: color,
      padding: "24px",
      color: "#FFFFFF",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      minHeight: "130px",
      fontFamily: "var(--font-epilogue)",
    }}
  >
    <div style={{ fontSize: "32px", fontWeight: 700 }}>{value}</div>
    <div style={{ fontSize: "16px", opacity: 0.8, fontWeight: 500 }}>{label}</div>
    <div style={{ position: "absolute", right: "24px", top: "50%", transform: "translateY(-50%)", opacity: 0.6 }}>
      <FiChevronRight size={24} />
    </div>
  </div>
);

/* ─── Custom Bar Chart Component ─── */
interface JobStatsChartProps {
  onFilterChange?: (filter: string) => void;
  activeFilter?: string;
}

export const JobStatsChart = ({ onFilterChange, activeFilter = "Week" }: JobStatsChartProps) => {
  const data = [
    { day: "Mon", view: 80, applied: 40 },
    { day: "Tue", view: 50, applied: 30 },
    { day: "Wed", view: 70, applied: 55 },
    { day: "Thu", view: 100, applied: 75 },
    { day: "Fri", view: 85, applied: 45 },
    { day: "Sat", view: 40, applied: 20 },
    { day: "Sun", view: 55, applied: 35 },
  ];

  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #D6DDEB", padding: "24px", flex: 2 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h3 style={{ margin: 0, fontFamily: "var(--font-clash-display)", fontSize: "18px", color: "#25324B" }}>Job statistics</h3>
        <div style={{ display: "flex", gap: "8px", background: "#F8F8FD", padding: "4px", borderRadius: "6px" }}>
          {["Week", "Month", "Year"].map((t) => (
             <button 
               key={t} 
               onClick={() => onFilterChange?.(t)}
               style={{ 
                 padding: "6px 12px", 
                 border: "none", 
                 background: activeFilter === t ? "#FFFFFF" : "transparent",
                 color: activeFilter === t ? "#4640DE" : "#7C8493",
                 fontSize: "12px",
                 fontWeight: 600,
                 borderRadius: "4px",
                 cursor: "pointer",
                 boxShadow: activeFilter === t ? "0 2px 4px rgba(0,0,0,0.05)" : "none"
               }}
             >
               {t}
             </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
        <div style={{ fontSize: "14px", color: "#4640DE", fontWeight: 600, borderBottom: "2px solid #4640DE", paddingBottom: "4px" }}>Overview</div>
        <div style={{ fontSize: "14px", color: "#7C8493", paddingBottom: "4px" }}>Jobs View</div>
        <div style={{ fontSize: "14px", color: "#7C8493", paddingBottom: "4px" }}>Jobs Applied</div>
      </div>

      {/* Bar Visualization */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: "12px", height: "200px", marginTop: "40px" }}>
        {data.map((item) => {
          // Simulate some variations for filter change demonstration
          const factor = activeFilter === "Month" ? 1.2 : activeFilter === "Year" ? 0.8 : 1;
          const vHeight = Math.min(100, item.view * factor);
          const aHeight = Math.min(100, item.applied * factor);
          
          return (
            <div key={item.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "100%", display: "flex", gap: "4px", alignItems: "flex-end", justifyContent: "center", height: "160px" }}>
                <div style={{ width: "12px", height: `${vHeight}%`, background: "#FFB836", borderRadius: "2px", transition: "height 0.3s ease" }} title={`View: ${item.view}`} />
                <div style={{ width: "12px", height: `${aHeight}%`, background: "#4640DE", borderRadius: "2px", transition: "height 0.3s ease" }} title={`Applied: ${item.applied}`} />
              </div>
              <span style={{ fontSize: "12px", color: "#7C8493", fontFamily: "var(--font-epilogue)" }}>{item.day}</span>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: "24px", marginTop: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "12px", height: "12px", background: "#FFB836", borderRadius: "2px" }} />
          <span style={{ fontSize: "12px", color: "#7C8493" }}>Job View</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "12px", height: "12px", background: "#4640DE", borderRadius: "2px" }} />
          <span style={{ fontSize: "12px", color: "#7C8493" }}>Job Applied</span>
        </div>
      </div>
    </div>
  );
};

/* ─── Tiny Metric Widget ─── */
interface MetricWidgetProps {
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  icon: React.ReactNode;
  iconBg: string;
}

export const MetricWidget = ({ label, value, trend, trendUp, icon, iconBg }: MetricWidgetProps) => (
  <div style={{ background: "#FFFFFF", border: "1px solid #D6DDEB", padding: "16px", flex: 1, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
    <div>
      <div style={{ fontSize: "12px", color: "#7C8493", marginBottom: "4px" }}>{label}</div>
      <div style={{ fontSize: "24px", fontWeight: 700, color: "#25324B", fontFamily: "var(--font-clash-display)" }}>{value}</div>
      {trend && (
        <div style={{ fontSize: "12px", color: trendUp ? "#56CDAD" : "#FF6550", marginTop: "4px" }}>
           This Week <span style={{ fontWeight: 600 }}>{trend}</span>
        </div>
      )}
    </div>
    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", color: "#FFF" }}>
      {icon}
    </div>
  </div>
);

/* ─── Jobs Open Widget ─── */
export const JobOpenWidget = ({ count }: { count: number }) => (
  <div style={{ background: "#FFFFFF", border: "1px solid #D6DDEB", padding: "24px", display: "flex", flexDirection: "column", gap: "12px" }}>
    <h3 style={{ margin: 0, fontFamily: "var(--font-clash-display)", fontSize: "18px", color: "#25324B" }}>Job Open</h3>
    <div style={{ display: "flex", alignItems: "flex-end", gap: "12px" }}>
      <span style={{ fontSize: "48px", fontWeight: 700, color: "#25324B", lineHeight: 1 }}>{count}</span>
      <span style={{ fontSize: "16px", color: "#7C8493", marginBottom: "8px" }}>Jobs Opened</span>
    </div>
  </div>
);

/* ─── Applicants Summary Widget ─── */
interface ApplicantsSummaryWidgetProps {
  total: number;
}

export const ApplicantsSummaryWidget = ({ total }: ApplicantsSummaryWidgetProps) => {
  const segments = [
    { label: "Full Time", count: Math.round(total * 0.4), color: "#4640DE" },
    { label: "Internship", count: Math.round(total * 0.2), color: "#56CDAD" },
    { label: "Part-Time", count: Math.round(total * 0.15), color: "#FFB836" },
    { label: "Remote", count: Math.round(total * 0.15), color: "#26A4FF" },
    { label: "Contract", count: total - (Math.round(total * 0.4) + Math.round(total * 0.2) + Math.round(total * 0.15) + Math.round(total * 0.15)), color: "#FF6550" },
  ];

  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #D6DDEB", padding: "24px" }}>
      <h3 style={{ margin: 0, fontFamily: "var(--font-clash-display)", fontSize: "18px", color: "#25324B", marginBottom: "20px" }}>Applicants Summary</h3>
      
      <div style={{ display: "flex", alignItems: "flex-end", gap: "12px", marginBottom: "24px" }}>
        <span style={{ fontSize: "48px", fontWeight: 700, color: "#25324B", lineHeight: 1 }}>{total}</span>
        <span style={{ fontSize: "16px", color: "#7C8493", marginBottom: "8px" }}>Applicants</span>
      </div>

      {/* Progress Bar Header */}
      <div style={{ height: "8px", width: "100%", display: "flex", borderRadius: "4px", overflow: "hidden", marginBottom: "24px" }}>
        {segments.map((seg) => (
          seg.count > 0 && <div key={seg.label} style={{ height: "100%", width: `${(seg.count / (total || 1)) * 100}%`, background: seg.color }} />
        ))}
      </div>

      {/* Legend List */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        {segments.map((seg) => (
          <div key={seg.label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "1px", background: seg.color }} />
            <span style={{ fontSize: "12px", color: "#7C8493" }}>{seg.label} : <span style={{ fontWeight: 600, color: "#25324B" }}>{seg.count}</span></span>
          </div>
        ))}
      </div>
    </div>
  );
};
