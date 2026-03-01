"use client";

import React, { useState } from "react";

import { 
  FiChevronRight, 
  FiPenTool, 
  FiTrendingUp, 
  FiVolume2,
  FiBriefcase, 
  FiCode, 
  FiCpu, 
  FiUsers,
  FiCrosshair
} from "react-icons/fi";
import Link from "next/link";

const categories = [
  { name: "Design", jobs: "235 jobs available", Icon: FiPenTool },
  { name: "Sales", jobs: "756 jobs available", Icon: FiTrendingUp },
  { name: "Marketing", jobs: "140 jobs available", Icon: FiVolume2 },
  { name: "Finance", jobs: "325 jobs available", Icon: FiCrosshair },
  { name: "Technology", jobs: "436 jobs available", Icon: FiCpu },
  { name: "Engineering", jobs: "542 jobs available", Icon: FiCode },
  { name: "Business", jobs: "211 jobs available", Icon: FiBriefcase },
  { name: "Human Resources", jobs: "346 jobs available", Icon: FiUsers },
];

export const CategoryExplore = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section 
      style={{ 
        width: '100%', 
        backgroundColor: '#FFFFFF', 
        display: 'flex', 
        justifyContent: 'center',
        paddingTop: '48px',
        paddingBottom: '48px'
      }}
    >
      <div 
        className="w-full max-w-[1440px] px-6 sm:px-12 lg:px-[125px]"
      >
        {/* Title Content */}
        <div 
          style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px'
          }}
        >
          <h2 
            style={{ 
              fontFamily: 'var(--font-clash-display)',
              fontWeight: 600,
              fontSize: 'clamp(28px, 5vw, 48px)',
              lineHeight: '120%',
              color: '#202430',
              margin: 0
            }}
          >
            Explore by <span style={{ color: '#26A4FF' }}>category</span>
          </h2>
          
          <Link 
            href="/jobs"
            className="hidden sm:flex transition-all duration-300 hover:-translate-y-0.5 hover:text-[#26A4FF]"
            style={{ 
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-epilogue)',
              fontWeight: 600,
              fontSize: '16px',
              color: '#4640DE',
              textDecoration: 'none'
            }}
          >
            Show all jobs <FiChevronRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Grid Container — 1 col mobile, 2 cols tablet, 4 cols desktop */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          {categories.map((cat, index) => {
            const isActive = hoveredIndex === index;
            return (
              <Link
                key={cat.name}
                href={`/jobs?category=${encodeURIComponent(cat.name)}`}
                style={{ textDecoration: 'none' }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div 
                  className={`
                    relative box-border flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-start
                    w-full sm:w-[274px] h-auto sm:h-[214px] 
                    px-[8px] py-[16px] sm:p-[32px]
                    rounded-[16px] sm:rounded-none
                    transition-all duration-300 ease-in-out
                    ${isActive ? 'bg-[#4640DE] border-[#4640DE] sm:-translate-y-1 sm:shadow-[0_12px_24px_rgba(70,64,222,0.3)]' : 'bg-white border-[#D6DDEB]'}
                    border
                  `}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="flex items-center sm:items-start sm:flex-col gap-4 sm:gap-[32px] flex-1 sm:h-full w-full">
                    {/* Icon Container */}
                    <div 
                      style={{ 
                        color: isActive ? '#FFFFFF' : '#4640DE',
                        transition: 'color 0.3s ease, transform 0.3s ease',
                        transform: isActive ? 'scale(1.1)' : 'scale(1)',
                      }}
                      className="shrink-0 flex items-center justify-center p-2 sm:p-0"
                    >
                      <cat.Icon className="w-8 h-8 sm:w-[48px] sm:h-[48px]" />
                    </div>
                    
                    {/* Text Container */}
                    <div className="flex flex-col flex-1 w-full relative h-full justify-center sm:justify-start">
                      <h3 
                        style={{ 
                          fontFamily: 'var(--font-clash-display)',
                          fontWeight: 600,
                          fontSize: '24px',
                          lineHeight: '120%',
                          color: isActive ? '#FFFFFF' : '#202430',
                          margin: '0 0 4px 0',
                          transition: 'color 0.3s ease',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {cat.name}
                      </h3>
                      <p 
                        style={{ 
                          fontFamily: 'var(--font-epilogue)',
                          fontWeight: 400,
                          fontSize: '18px',
                          lineHeight: '160%',
                          color: isActive ? '#FFFFFF' : '#7C8493',
                          opacity: isActive ? 0.8 : 1,
                          margin: 0,
                          transition: 'color 0.3s ease, opacity 0.3s ease',
                        }}
                        className="flex items-center justify-between sm:justify-start gap-2 w-full mt-auto"
                      >
                        <span className="whitespace-nowrap">{cat.jobs}</span>
                        {/* Mobile arrow */}
                        <FiChevronRight 
                          className="sm:hidden shrink-0"
                          style={{ 
                            color: isActive ? '#FFFFFF' : '#202430',
                            transition: 'color 0.3s ease, transform 0.3s ease',
                            transform: isActive ? 'translateX(4px)' : 'translateX(0)',
                          }} 
                        />
                      </p>
                      
                      {/* Desktop arrow */}
                      <FiChevronRight 
                        className="hidden sm:block absolute right-0 bottom-0"
                        style={{ 
                          color: isActive ? '#FFFFFF' : '#202430',
                          transition: 'color 0.3s ease, transform 0.3s ease',
                          transform: isActive ? 'translateX(4px)' : 'translateX(0)',
                          width: '24px',
                          height: '24px'
                        }} 
                      />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
