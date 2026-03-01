"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

const companyBrandColors: Record<string, string> = {
  Nomad: "#0075EB", Netlify: "#00C7B7", Dropbox: "#0062FF", Maze: "#6C5CE7",
  Terraform: "#7B42BC", Udacity: "#02B3E4", Packer: "#02A8EF", Webflow: "#4353FF",
  Revolut: "#0075EB", Pitch: "#6C5CE7", Blinkist: "#2ECC71", ClassPass: "#FF6347",
  Canva: "#00C4CC", GoDaddy: "#1BDBDB", Twitter: "#1DA1F2",
};

function getCompanyLogoUrl(company: string): string {
  const bgColor = (companyBrandColors[company] || "#4640DE").replace("#", "");
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(company)}&background=${bgColor}&color=fff&size=128&font-size=0.4&bold=true&format=svg`;
}

const latestJobs = [
  { id: '1', company: "Nomad", title: "Social Media Assistant", location: "Paris, France", tags: [{ name: "Full-Time", color: "#56CDAD", bgColor: "rgba(86,205,173,0.1)", borderColor: "#56CDAD" }, { name: "Marketing", color: "#FFB836", bgColor: "rgba(255,184,54,0.1)", borderColor: "#FFB836" }, { name: "Design", color: "#4640DE", bgColor: "rgba(70,64,222,0.1)", borderColor: "#4640DE" }] },
  { id: '2', company: "Netlify", title: "Social Media Assistant", location: "Paris, France", tags: [{ name: "Full-Time", color: "#56CDAD", bgColor: "rgba(86,205,173,0.1)", borderColor: "#56CDAD" }, { name: "Marketing", color: "#FFB836", bgColor: "rgba(255,184,54,0.1)", borderColor: "#FFB836" }, { name: "Design", color: "#4640DE", bgColor: "rgba(70,64,222,0.1)", borderColor: "#4640DE" }] },
  { id: '3', company: "Dropbox", title: "Brand Designer", location: "San Francisco, USA", tags: [{ name: "Full-Time", color: "#56CDAD", bgColor: "rgba(86,205,173,0.1)", borderColor: "#56CDAD" }, { name: "Marketing", color: "#FFB836", bgColor: "rgba(255,184,54,0.1)", borderColor: "#FFB836" }, { name: "Design", color: "#4640DE", bgColor: "rgba(70,64,222,0.1)", borderColor: "#4640DE" }] },
  { id: '4', company: "Maze", title: "Brand Designer", location: "San Francisco, USA", tags: [{ name: "Full-Time", color: "#56CDAD", bgColor: "rgba(86,205,173,0.1)", borderColor: "#56CDAD" }, { name: "Marketing", color: "#FFB836", bgColor: "rgba(255,184,54,0.1)", borderColor: "#FFB836" }, { name: "Design", color: "#4640DE", bgColor: "rgba(70,64,222,0.1)", borderColor: "#4640DE" }] },
  { id: '5', company: "Terraform", title: "Interactive Developer", location: "Hamburg, Germany", tags: [{ name: "Full-Time", color: "#56CDAD", bgColor: "rgba(86,205,173,0.1)", borderColor: "#56CDAD" }, { name: "Marketing", color: "#FFB836", bgColor: "rgba(255,184,54,0.1)", borderColor: "#FFB836" }, { name: "Design", color: "#4640DE", bgColor: "rgba(70,64,222,0.1)", borderColor: "#4640DE" }] },
  { id: '6', company: "Udacity", title: "Interactive Developer", location: "Hamburg, Germany", tags: [{ name: "Full-Time", color: "#56CDAD", bgColor: "rgba(86,205,173,0.1)", borderColor: "#56CDAD" }, { name: "Marketing", color: "#FFB836", bgColor: "rgba(255,184,54,0.1)", borderColor: "#FFB836" }, { name: "Design", color: "#4640DE", bgColor: "rgba(70,64,222,0.1)", borderColor: "#4640DE" }] },
  { id: '7', company: "Packer", title: "HR Manager", location: "Lucern, Switzerland", tags: [{ name: "Full-Time", color: "#56CDAD", bgColor: "rgba(86,205,173,0.1)", borderColor: "#56CDAD" }, { name: "Marketing", color: "#FFB836", bgColor: "rgba(255,184,54,0.1)", borderColor: "#FFB836" }, { name: "Design", color: "#4640DE", bgColor: "rgba(70,64,222,0.1)", borderColor: "#4640DE" }] },
  { id: '8', company: "Webflow", title: "HR Manager", location: "Lucern, Switzerland", tags: [{ name: "Full-Time", color: "#56CDAD", bgColor: "rgba(86,205,173,0.1)", borderColor: "#56CDAD" }, { name: "Marketing", color: "#FFB836", bgColor: "rgba(255,184,54,0.1)", borderColor: "#FFB836" }, { name: "Design", color: "#4640DE", bgColor: "rgba(70,64,222,0.1)", borderColor: "#4640DE" }] },
];

function LatestJobItem({ title, company, location, tags }: any) {
  const [hovered, setHovered] = useState(false);
  const logoUrl = getCompanyLogoUrl(company);

  return (
    <div
      style={{
        padding: '24px',
        border: hovered ? '1px solid #4640DE' : '1px solid #D6DDEB',
        background: hovered ? '#FAFAFF' : '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        cursor: 'pointer',
        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: hovered ? 'translateX(8px)' : 'translateX(0)',
        boxShadow: hovered
          ? '0 8px 24px rgba(70, 64, 222, 0.12), 0 2px 8px rgba(0,0,0,0.06)'
          : '0 1px 3px rgba(0,0,0,0.02)',
        borderRadius: hovered ? '8px' : '0px',
        position: 'relative' as const,
        overflow: 'hidden',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Company Logo */}
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '12px',
          overflow: 'hidden',
          flexShrink: 0,
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.35s ease',
          transform: hovered ? 'scale(1.1) rotate(2deg)' : 'scale(1) rotate(0deg)',
          boxShadow: hovered ? '0 6px 16px rgba(0,0,0,0.15)' : 'none',
        }}
      >
        <img
          src={logoUrl}
          alt={`${company} logo`}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <h3
          style={{
            fontFamily: 'var(--font-clash-display)',
            fontWeight: 600,
            fontSize: 'clamp(16px, 2vw, 20px)',
            lineHeight: '120%',
            color: hovered ? '#4640DE' : '#202430',
            margin: '0 0 4px 0',
            transition: 'color 0.3s ease',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-epilogue)',
            fontWeight: 400,
            fontSize: '14px',
            color: '#515B6F',
            margin: '0 0 12px 0',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {company} • {location}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {tags.map((tag: any) => (
            <span
              key={tag.name}
              style={{
                padding: '3px 10px',
                borderRadius: '80px',
                background: tag.bgColor,
                border: tag.borderColor === 'transparent' ? 'none' : `1px solid ${tag.borderColor}`,
                color: tag.color,
                fontFamily: 'var(--font-epilogue)',
                fontWeight: 600,
                fontSize: '11px',
              }}
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>

      {/* Hover arrow indicator */}
      <div
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateX(0)' : 'translateX(-10px)',
          transition: 'all 0.3s ease',
          color: '#4640DE',
          fontSize: '20px',
          flexShrink: 0,
        }}
      >
        →
      </div>

      {/* Left accent bar on hover */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '3px',
          height: '100%',
          background: 'linear-gradient(180deg, #4640DE, #26A4FF)',
          transform: hovered ? 'scaleY(1)' : 'scaleY(0)',
          transformOrigin: 'top',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
    </div>
  );
}

export const LatestJobs = () => {
  return (
    <section className="w-full bg-white flex justify-center py-16 md:py-20 px-4 sm:px-6">
      <div className="w-full max-w-[1190px]">
        {/* Title Content */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 md:mb-12">
          <h2
            style={{
              fontFamily: 'var(--font-clash-display)',
              fontWeight: 600,
              fontSize: 'clamp(28px, 4vw, 48px)',
              lineHeight: '120%',
              color: '#202430',
              margin: 0,
            }}
          >
            Latest <span style={{ color: '#26A4FF' }}>jobs open</span>
          </h2>

          <Link
            href="/jobs"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-epilogue)',
              fontWeight: 600,
              fontSize: '16px',
              color: '#4640DE',
              textDecoration: 'none',
            }}
          >
            Show all jobs <FiChevronRight />
          </Link>
        </div>

        {/* Responsive Grid — 1 col mobile, 2 cols desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {latestJobs.map((job) => (
            <LatestJobItem key={job.id} {...job} />
          ))}
        </div>
      </div>
    </section>
  );
};
