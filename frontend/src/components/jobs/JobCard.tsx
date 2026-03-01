"use client";

import React, { useState } from "react";
import Link from "next/link";

const companyBrandColors: Record<string, string> = {
  Nomad: "#0075EB", Netlify: "#00C7B7", Dropbox: "#0062FF", Maze: "#6C5CE7",
  Terraform: "#7B42BC", Udacity: "#02B3E4", Packer: "#02A8EF", Webflow: "#4353FF",
  Revolut: "#0075EB", Pitch: "#6C5CE7", Blinkist: "#2ECC71", ClassPass: "#FF6347",
  Canva: "#00C4CC", GoDaddy: "#1BDBDB", Twitter: "#1DA1F2", Netflix: "#E50914",
  Nike: "#111111", Google: "#4285F4", Microsoft: "#00A4EF", Apple: "#000000",
  Amazon: "#FF9900", Meta: "#0668E1", Spotify: "#1DB954", Stripe: "#635BFF",
  Airbnb: "#FF385C", Uber: "#000000", Slack: "#4A154B", Shopify: "#96BF48",
  Adobe: "#FF0000", Salesforce: "#00A1E0", Zoom: "#2D8CFF", LinkedIn: "#0077B5",
  GitHub: "#181717", Figma: "#F24E1E", Notion: "#000000", Vercel: "#000000",
};

function getCompanyLogoUrl(company: string): string {
  const bgColor = (companyBrandColors[company] || "#4640DE").replace("#", "");
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(company)}&background=${bgColor}&color=fff&size=128&font-size=0.4&bold=true&format=svg`;
}

interface JobCardProps {
  id?: string;
  logo?: string;
  companyLogo?: string | null;
  type?: string;
  title: string;
  company: string;
  location: string;
  description?: string;
  tags?: { name: string; color: string; bgColor: string; borderColor: string }[];
}

export const JobCard = ({ id, logo, companyLogo, title, company, location, description, tags }: JobCardProps) => {
  const [hovered, setHovered] = useState(false);
  const logoSrc = logo || companyLogo || getCompanyLogoUrl(company);

  return (
    <Link
      href={`/jobs/${id || '#'}`}
      style={{
        display: 'block',
        width: '100%',
        minHeight: '350px',
        padding: '24px',
        border: hovered ? '1px solid #4640DE' : '1px solid #D6DDEB',
        background: '#FFFFFF',
        textDecoration: 'none',
        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        transform: hovered ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: hovered
          ? '0 16px 40px rgba(70, 64, 222, 0.15), 0 4px 12px rgba(0,0,0,0.08)'
          : '0 1px 3px rgba(0,0,0,0.04)',
        borderRadius: hovered ? '8px' : '0px',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Type Badge — Top right absolute */}
      <div
        style={{
          position: 'absolute',
          right: '24px',
          top: '24px',
          padding: '4px 12px',
          border: '1px solid #4640DE',
          color: '#4640DE',
          fontFamily: 'var(--font-epilogue)',
          fontWeight: 600,
          fontSize: '14px',
          transition: 'all 0.3s ease',
          background: hovered ? 'rgba(70,64,222,0.08)' : 'transparent',
        }}
      >
        Full Time
      </div>

      {/* Company Logo */}
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '24px',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
          boxShadow: hovered ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
        }}
      >
        <img
          src={logoSrc}
          alt={company}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>

      {/* Title & Company */}
      <h3
        style={{
          fontFamily: 'var(--font-clash-display)',
          fontWeight: 600,
          fontSize: '20px',
          lineHeight: '120%',
          color: hovered ? '#4640DE' : '#202430',
          margin: '0 0 8px 0',
          transition: 'color 0.3s ease',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: 'var(--font-epilogue)',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '160%',
          color: '#515B6F',
          margin: '0 0 16px 0',
        }}
      >
        {company} • {location}
      </p>

      {/* Description */}
      <p
        style={{
          fontFamily: 'var(--font-epilogue)',
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '160%',
          color: '#7C8493',
          margin: '0 0 24px 0',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {description || "Help us create the next generation of visual experiences for our users."}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {tags?.map((tag, index) => (
          <span
            key={`${tag.name}-${index}`}
            style={{
              padding: '4px 12px',
              borderRadius: '80px',
              background: tag.bgColor,
              border: `1px solid ${tag.borderColor}`,
              color: tag.color,
              fontFamily: 'var(--font-epilogue)',
              fontWeight: 600,
              fontSize: '12px',
            }}
          >
            {tag.name}
          </span>
        )) || (
          <>
            <span style={{ padding: '4px 12px', borderRadius: '80px', background: 'rgba(86, 205, 173, 0.1)', border: '1px solid #56CDAD', color: '#56CDAD', fontFamily: 'var(--font-epilogue)', fontWeight: 600, fontSize: '12px' }}>Marketing</span>
            <span style={{ padding: '4px 12px', borderRadius: '80px', background: 'rgba(70, 64, 222, 0.1)', border: '1px solid #4640DE', color: '#4640DE', fontFamily: 'var(--font-epilogue)', fontWeight: 600, fontSize: '12px' }}>Design</span>
          </>
        )}
      </div>

      {/* Hover accent bar at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '3px',
          background: 'linear-gradient(90deg, #4640DE, #26A4FF)',
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
    </Link>
  );
};
