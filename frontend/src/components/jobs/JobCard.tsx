import React from "react";
import { Badge } from "../ui/Badge";

interface JobCardProps {
  logo: string;
  type: string;
  title: string;
  company: string;
  location: string;
  description: string;
  tags: { name: string; variant: any }[];
}

export const JobCard = ({ logo, type, title, company, location, description, tags }: JobCardProps) => {
  return (
    <div className="border border-border bg-white p-6 rounded-xl hover:shadow-xl hover:border-primary transition-all duration-300 flex flex-col gap-4 cursor-pointer group">
      <div className="flex justify-between items-start">
        <img 
          src={logo} 
          alt={`${company} logo`} 
          className="w-12 h-12 object-contain"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <span className="text-primary bg-primary/10 px-3 py-1 rounded-sm text-sm font-bold border border-primary/20">
          {type}
        </span>
      </div>

      <div>
        <h3 className="text-xl font-bold font-clash text-heading group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted text-sm mt-1">
          {company} • {location}
        </p>
      </div>

      <p className="text-body flex-1 text-sm line-clamp-3">
        {description}
      </p>

      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag) => (
          <Badge key={tag.name} variant={tag.variant}>
            {tag.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};
