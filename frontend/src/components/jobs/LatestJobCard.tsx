"use client";

import React, { useState } from "react";
import Link from "next/link";

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

interface LatestJobCardProps {
  id?: string;
  title: string;
  company: string;
  location: string;
  tags: { name: string; color: string; bgColor: string; borderColor: string }[];
  companyLogo?: string | null;
}

export function LatestJobCard({ id, title, company, location, tags, companyLogo }: LatestJobCardProps) {
  const [hovered, setHovered] = useState(false);
  const logoUrl = companyLogo || getCompanyLogoUrl(company);

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
      <Link href={`/jobs/${id || '#'}`} style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
        <span className="sr-only">View Job</span>
      </Link>
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
          position: 'relative',
          zIndex: 11,
        }}
      >
        <img
          src={logoUrl}
          alt={`${company} logo`}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      <div style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 11 }}>
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
          {tags.map((tag: any, index: number) => (
            <span
              key={`${tag.name}-${index}`}
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
          position: 'relative',
          zIndex: 11,
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
