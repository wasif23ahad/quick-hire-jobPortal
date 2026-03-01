"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const CATEGORIES = [
  "Marketing", 
  "Design", 
  "Sales", 
  "Finance", 
  "Technology", 
  "Engineering", 
  "Business", 
  "Human Resources"
];

const JOB_TYPES = [
  "Full-Time",
  "Part-Time",
  "Remote",
  "Internship",
  "Contract"
];

export const JobFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentCategory = searchParams.get("category");
  const currentType = searchParams.get("type");

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Toggle logic
    if (currentCategory === category) {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    
    // Reset to page 1 on filter change
    params.set("page", "1");
    router.push(`/jobs?${params.toString()}`, { scroll: false });
  };

  const handleTypeChange = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Toggle logic
    if (currentType === type) {
      params.delete("type");
    } else {
      params.set("type", type);
    }
    
    // Reset to page 1 on filter change
    params.set("page", "1");
    router.push(`/jobs?${params.toString()}`, { scroll: false });
  };

  const handleClearFilters = () => {
    // Keep search and location if they exist, but clear side filters
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    params.delete("type");
    params.set("page", "1");
    router.push(`/jobs?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="bg-white rounded-xl border border-border p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg text-heading font-clash">Filter</h3>
        <button 
          onClick={handleClearFilters}
          className="text-primary text-sm font-medium hover:underline"
        >
          Clear all
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="font-bold mb-4 flex items-center justify-between">
          Category
        </h4>
        <div className="space-y-3">
          {CATEGORIES.map((category) => (
            <div 
              key={category} 
              className="flex items-center gap-3 cursor-pointer group select-none"
              onClick={(e) => {
                e.preventDefault();
                handleCategoryChange(category);
              }}
            >
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors
                ${currentCategory === category 
                  ? 'bg-primary border-primary' 
                  : 'border-border bg-white group-hover:border-primary'
                }`}
              >
                {currentCategory === category && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <input 
                type="checkbox" 
                id={`category-${category}`}
                className="hidden"
                checked={currentCategory === category}
                readOnly
              />
              <span className={`text-sm ${currentCategory === category ? 'text-heading font-medium' : 'text-body group-hover:text-heading'}`}>
                {category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Job Type Filter */}
      <div>
        <h4 className="font-bold mb-4 flex items-center justify-between">
          Job Type
        </h4>
        <div className="space-y-3">
          {JOB_TYPES.map((type) => (
            <div 
              key={type} 
              className="flex items-center gap-3 cursor-pointer group select-none"
              onClick={(e) => {
                e.preventDefault();
                handleTypeChange(type);
              }}
            >
              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors
                ${currentType === type 
                  ? 'bg-primary border-primary' 
                  : 'border-border bg-white group-hover:border-primary'
                }`}
              >
                {currentType === type && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <input 
                type="checkbox" 
                id={`type-${type}`}
                className="hidden"
                checked={currentType === type}
                readOnly
              />
              <span className={`text-sm ${currentType === type ? 'text-heading font-medium' : 'text-body group-hover:text-heading'}`}>
                {type}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
