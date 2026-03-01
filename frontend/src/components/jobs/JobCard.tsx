import React from "react";
import Link from "next/link";

const companyBrandColors: Record<string, string> = {
  Nomad: "#0075EB",
  Netlify: "#00C7B7",
  Dropbox: "#0062FF",
  Maze: "#6C5CE7",
  Terraform: "#7B42BC",
  Udacity: "#02B3E4",
  Packer: "#02A8EF",
  Webflow: "#4353FF",
  Revolut: "#0075EB",
  Pitch: "#6C5CE7",
  Blinkist: "#2ECC71",
  ClassPass: "#FF6347",
  Canva: "#00C4CC",
  GoDaddy: "#1BDBDB",
  Twitter: "#1DA1F2",
  Netflix: "#E50914",
  Nike: "#111111",
};

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
  return (
    <Link
      href={`/jobs/${id || '#'}`}
      style={{ 
        display: 'block',
        width: '273.5px', // Exact width for 4-col in 1190px with 32px gaps
        height: '350px',
        padding: '24px',
        border: '1px solid #D6DDEB',
        background: '#FFFFFF',
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        position: 'relative',
        overflow: 'hidden'
      }}
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
          fontSize: '14px'
        }}
      >
        Full Time
      </div>

      {/* Logo — Square container with company logo or branded initial */}
      <div 
        style={{ 
          width: '48px',
          height: '48px',
          background: logo ? '#FFFFFF' : (companyBrandColors[company] || '#4640DE'),
          border: logo ? '1px solid #D6DDEB' : 'none',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          marginBottom: '24px'
        }}
      >
        {logo ? (
          <img src={logo} alt={company} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        ) : (
          <span style={{ fontFamily: 'var(--font-clash-display)', fontWeight: 700, fontSize: '20px', color: '#FFFFFF' }}>
            {company[0]}
          </span>
        )}
      </div>

      {/* Title & Company */}
      <h3 
        style={{ 
          fontFamily: 'var(--font-clash-display)',
          fontWeight: 600,
          fontSize: '20px',
          lineHeight: '120%',
          color: '#202430',
          margin: '0 0 8px 0'
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
          margin: '0 0 16px 0'
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
          overflow: 'hidden'
        }}
      >
        {description || "Help us create the next generation of visual experiences for our users."}
      </p>

      {/* Tags */}
      <div 
        style={{ 
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px'
        }}
      >
        {tags?.map((tag) => (
          <span 
            key={tag.name}
            style={{ 
              padding: '4px 12px',
              borderRadius: '80px',
              background: tag.bgColor,
              border: `1px solid ${tag.borderColor}`,
              color: tag.color,
              fontFamily: 'var(--font-epilogue)',
              fontWeight: 600,
              fontSize: '12px'
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
    </Link>
  );
};
