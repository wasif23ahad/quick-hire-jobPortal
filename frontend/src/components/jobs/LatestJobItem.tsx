import React from "react";
import { Badge } from "../ui/Badge";

interface LatestJobItemProps {
  logo: string;
  title: string;
  company: string;
  location: string;
  type: string;
  tags: { name: string; variant: any }[];
}

export const LatestJobItem = ({ logo, title, company, location, type, tags }: LatestJobItemProps) => {
  return (
    <div className="bg-white border border-border p-5 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-primary hover:shadow-md transition-all cursor-pointer group">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 shrink-0 flex items-center justify-center p-2 rounded-lg bg-bg-light border border-border group-hover:bg-primary/5 transition-colors">
          <img 
            src={logo} 
            alt={`${company} logo`} 
            className="w-full h-full object-contain"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
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
    </div>
  );
};
