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
            className="hidden sm:flex"
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
            Show all jobs <FiChevronRight />
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
                    flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-between
                    p-4 sm:p-[clamp(20px,3vw,32px)] sm:min-h-[180px]
                    transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
                    ${isActive ? 'bg-[#4640DE] border-[#4640DE] sm:translate-y-[-6px] sm:shadow-[0_12px_24px_rgba(70,64,222,0.3)]' : 'bg-white border-[#D6DDEB]'}
                    border
                  `}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="flex items-center sm:items-start sm:flex-col gap-4 sm:gap-0 flex-1 sm:h-full w-full">
                    <div 
                      style={{ 
                        width: '48px',
                        height: '48px',
                        color: isActive ? '#FFFFFF' : '#4640DE',
                        fontSize: '32px',
                        transition: 'color 0.3s ease, transform 0.3s ease',
                        transform: isActive ? 'scale(1.1)' : 'scale(1)',
                      }}
                      className="flex-shrink-0 flex items-center justify-center sm:block"
                    >
                      <cat.Icon size={40} className="w-8 h-8 sm:w-10 sm:h-10" />
                    </div>
                    
                    <div className="flex flex-col sm:mt-auto flex-1">
                      <h3 
                        style={{ 
                          fontFamily: 'var(--font-clash-display)',
                          fontWeight: 600,
                          fontSize: 'clamp(18px, 2vw, 24px)',
                          color: isActive ? '#FFFFFF' : '#202430',
                          margin: '0 0 4px 0',
                          transition: 'color 0.3s ease',
                        }}
                        className="sm:mb-3"
                      >
                        {cat.name}
                      </h3>
                      <p 
                        style={{ 
                          fontFamily: 'var(--font-epilogue)',
                          fontWeight: 400,
                          fontSize: 'clamp(14px, 1.5vw, 18px)',
                          color: isActive ? '#FFFFFF' : '#7C8493',
                          opacity: isActive ? 0.8 : 1,
                          margin: 0,
                          transition: 'color 0.3s ease, opacity 0.3s ease',
                        }}
                        className="flex items-center justify-between sm:justify-start gap-2 w-full"
                      >
                        <span>{cat.jobs}</span>
                        <FiChevronRight 
                          className="sm:hidden"
                          style={{ 
                            color: isActive ? '#FFFFFF' : '#202430',
                            transition: 'color 0.3s ease, transform 0.3s ease',
                            transform: isActive ? 'translateX(4px)' : 'translateX(0)',
                          }} 
                        />
                      </p>
                    </div>
                  </div>
                  
                  {/* Desktop arrow (hidden on mobile, shown on right on desktop) */}
                  <FiChevronRight 
                    className="hidden sm:block absolute bottom-8 right-8"
                    style={{ 
                      color: isActive ? '#FFFFFF' : '#202430',
                      transition: 'color 0.3s ease, transform 0.3s ease',
                      transform: isActive ? 'translateX(4px)' : 'translateX(0)',
                    }} 
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
