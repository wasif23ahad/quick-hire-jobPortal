"use client";

import React, { useState } from "react";
import { FiSearch, FiMapPin } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";

export const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams(searchParams.toString());
    
    if (search) params.set("search", search);
    else params.delete("search");
    
    if (location) params.set("location", location);
    else params.delete("location");
    
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <form 
      onSubmit={handleSearch}
      className="bg-white p-3 md:p-4 rounded-xl shadow-sm border border-border flex flex-col md:flex-row gap-3 w-full"
    >
      <div className="flex-1 flex items-center px-4 md:border-r border-border gap-3">
        <FiSearch className="text-muted text-xl shrink-0" />
        <input 
          type="text" 
          placeholder="Job title, keyword, company" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent focus:outline-none text-heading placeholder:text-muted"
        />
      </div>
      
      <div className="flex-1 flex items-center px-4 gap-3">
        <FiMapPin className="text-muted text-xl shrink-0" />
        <input 
          type="text" 
          placeholder="Location" 
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full bg-transparent focus:outline-none text-heading placeholder:text-muted"
        />
      </div>
      
      <button 
        type="submit"
        className="bg-primary hover:bg-primary-dark transition-colors text-white px-8 py-3 rounded-lg font-bold"
      >
        Search jobs
      </button>
    </form>
  );
};
