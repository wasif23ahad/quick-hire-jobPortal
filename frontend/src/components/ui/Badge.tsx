import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'design' | 'sales' | 'marketing' | 'finance' | 'technology' | 'engineering' | 'business' | 'hr' | 'default';
  className?: string;
}

// Filled background badges matching Figma exactly
const variantStyles = {
  design: "bg-tag-design/20 text-tag-design",
  sales: "bg-accent-red/20 text-accent-red",
  marketing: "bg-tag-marketing/20 text-tag-marketing",
  finance: "bg-accent-blue/20 text-accent-blue",
  technology: "bg-tag-technology/20 text-tag-technology",
  engineering: "bg-accent-purple/20 text-accent-purple",
  business: "bg-tag-business/20 text-tag-business",
  hr: "bg-accent-yellow/20 text-accent-yellow",
  default: "bg-primary/10 text-primary"
};

export const Badge = ({ children, variant = 'default', className = '' }: BadgeProps) => {
  return (
    <span className={`inline-block px-2.5 py-1 rounded text-xs font-bold tracking-wide ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
};
