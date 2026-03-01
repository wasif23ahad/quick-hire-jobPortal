import React from "react";
import Link from "next/link";
import { Badge } from "../ui/Badge";

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
};

interface LatestJobItemProps {
  id?: string;
  logo?: string;
  companyLogo?: string | null;
  title: string;
  company: string;
  location: string;
  type: string;
  tags: { name: string; variant: any }[];
}

export const LatestJobItem = ({ id, logo, companyLogo, title, company, location, type, tags }: LatestJobItemProps) => {
  const hasImage = logo || companyLogo;
  
  return (
    <Link href={`/jobs/${id || '#'}`} className="bg-white border border-border p-5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-primary hover:shadow-md transition-all cursor-pointer group">
      <div className="flex items-center gap-4">
        <div 
          className="w-14 h-14 shrink-0 flex items-center justify-center rounded-lg transition-colors"
          style={{
            background: hasImage ? '#F8F8FD' : (companyBrandColors[company] || '#4640DE'),
            border: hasImage ? '1px solid #D6DDEB' : 'none',
            padding: hasImage ? '8px' : '0',
          }}
        >
          {logo ? (
            <img 
              src={logo} 
              alt={`${company} logo`} 
              className="w-full h-full object-contain"
            />
          ) : companyLogo ? (
            <img 
              src={companyLogo} 
              alt={`${company} logo`} 
              className="w-full h-full object-contain"
            />
          ) : (
            <span style={{ fontFamily: 'var(--font-clash-display)', fontWeight: 700, fontSize: '22px', color: '#FFFFFF' }}>
              {company.charAt(0)}
            </span>
          )}
        </div>
        
        <div>
          <h3 className="text-lg font-bold font-clash text-heading group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted text-sm mt-1">
            {company} • {location}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-primary bg-primary/10 px-3 py-1.5 rounded-sm text-sm font-bold">
          {type}
        </span>
        <div className="w-px h-6 bg-border hidden md:block" />
        {tags.map((tag) => (
          <Badge key={tag.name} variant={tag.variant}>
            {tag.name}
          </Badge>
        ))}
      </div>
    </Link>
  );
};
