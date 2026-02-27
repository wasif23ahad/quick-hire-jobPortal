import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'design' | 'sales' | 'marketing' | 'finance' | 'technology' | 'engineering' | 'business' | 'hr' | 'default';
  className?: string;
}

const variantStyles = {
  design: "text-tag-design border-tag-design hover:bg-tag-design hover:text-white",
  sales: "text-accent-red border-accent-red hover:bg-accent-red hover:text-white",
  marketing: "text-tag-marketing border-tag-marketing hover:bg-tag-marketing hover:text-white",
  finance: "text-accent-blue border-accent-blue hover:bg-accent-blue hover:text-white",
  technology: "text-tag-technology border-tag-technology hover:bg-tag-technology hover:text-white",
  engineering: "text-accent-purple border-accent-purple hover:bg-accent-purple hover:text-white",
  business: "text-tag-business border-tag-business hover:bg-tag-business hover:text-white",
  hr: "text-accent-yellow border-accent-yellow hover:bg-accent-yellow hover:text-white",
  default: "text-primary border-primary hover:bg-primary hover:text-white"
};

export const Badge = ({ children, variant = 'default', className = '' }: BadgeProps) => {
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold font-clash tracking-wide border transition-colors cursor-default ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};
