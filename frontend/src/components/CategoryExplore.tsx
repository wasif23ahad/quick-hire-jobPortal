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
  { name: "Human Resource", jobs: "346 jobs available", Icon: FiUsers },
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
        paddingTop: '80px',
        paddingBottom: '80px'
      }}
    >
      <div 
        style={{ 
          width: '1440px', 
          height: '680px', 
          position: 'relative'
        }}
      >
        {/* Title Content */}
        <div 
          style={{ 
            position: 'absolute',
            left: '125px',
            top: '0px',
            width: '1190px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <h2 
            style={{ 
              fontFamily: 'var(--font-clash-display)',
              fontWeight: 600,
              fontSize: '48px',
              lineHeight: '120%',
              color: '#202430',
              margin: 0
            }}
          >
            Explore by <span style={{ color: '#26A4FF' }}>category</span>
          </h2>
          
          <Link 
            href="/jobs"
            style={{ 
              display: 'flex',
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

        {/* Grid Container — 4 cols, 2 rows */}
        <div 
          style={{ 
            position: 'absolute',
            left: '125px',
            top: '96px',
            width: '1190px',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '32px'
          }}
        >
          {categories.map((cat, index) => {
            const isActive = hoveredIndex === index;
            return (
              <Link
                key={cat.name}
                href={`/jobs?search=${encodeURIComponent(cat.name)}`}
                style={{ textDecoration: 'none' }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div 
                  style={{ 
                    height: '240px',
                    padding: '32px',
                    border: isActive ? 'none' : '1px solid #D6DDEB',
                    background: isActive ? '#4640DE' : '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transform: isActive ? 'translateY(-6px)' : 'translateY(0)',
                    boxShadow: isActive ? '0 12px 24px rgba(70, 64, 222, 0.3)' : 'none',
                  }}
                >
                  <div 
                    style={{ 
                      width: '48px',
                      height: '48px',
                      color: isActive ? '#FFFFFF' : '#4640DE',
                      fontSize: '32px',
                      transition: 'color 0.3s ease, transform 0.3s ease',
                      transform: isActive ? 'scale(1.1)' : 'scale(1)',
                    }}
                  >
                    <cat.Icon size={40} />
                  </div>
                  
                  <div>
                    <h3 
                      style={{ 
                        fontFamily: 'var(--font-clash-display)',
                        fontWeight: 600,
                        fontSize: '24px',
                        color: isActive ? '#FFFFFF' : '#202430',
                        margin: '0 0 12px 0',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {cat.name}
                    </h3>
                    <p 
                      style={{ 
                        fontFamily: 'var(--font-epilogue)',
                        fontWeight: 400,
                        fontSize: '18px',
                        color: isActive ? '#FFFFFF' : '#7C8493',
                        opacity: isActive ? 0.8 : 1,
                        margin: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'color 0.3s ease, opacity 0.3s ease',
                      }}
                    >
                      {cat.jobs} 
                      <FiChevronRight 
                        style={{ 
                          color: isActive ? '#FFFFFF' : '#202430',
                          transition: 'color 0.3s ease, transform 0.3s ease',
                          transform: isActive ? 'translateX(4px)' : 'translateX(0)',
                        }} 
                      />
                    </p>
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
