import React from "react";
import { 
  FiChevronRight, 
  FiPenTool, 
  FiTrendingUp, 
  FiVolume2,   // changed from FiMegaphone
  FiBriefcase, 
  FiCode, 
  FiCpu, 
  FiUsers,
  FiCrosshair  // optional: better replacement for FiTarget
} from "react-icons/fi";
import Link from "next/link";

const categories = [
  { name: "Design", jobs: "235 jobs available", Icon: FiPenTool, active: false },
  { name: "Sales", jobs: "756 jobs available", Icon: FiTrendingUp, active: false },
  { name: "Marketing", jobs: "140 jobs available", Icon: FiVolume2, active: true }, // changed
  { name: "Finance", jobs: "325 jobs available", Icon: FiCrosshair, active: false }, // changed
  { name: "Technology", jobs: "436 jobs available", Icon: FiCpu, active: false },
  { name: "Engineering", jobs: "542 jobs available", Icon: FiCode, active: false },
  { name: "Business", jobs: "211 jobs available", Icon: FiBriefcase, active: false },
  { name: "Human Resource", jobs: "346 jobs available", Icon: FiUsers, active: false },
];

function FiTarget(props: any) {
  return <FiTrendingUp {...props} />; // Placeholder as react-icons FiTarget might need different import
}

export const CategoryExplore = () => {
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
          {categories.map((cat, index) => (
            <div 
              key={cat.name}
              style={{ 
                height: '240px',
                padding: '32px',
                border: cat.active ? 'none' : '1px solid #D6DDEB',
                background: cat.active ? '#4640DE' : '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div 
                style={{ 
                  width: '48px',
                  height: '48px',
                  color: cat.active ? '#FFFFFF' : '#4640DE',
                  fontSize: '32px'
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
                    color: cat.active ? '#FFFFFF' : '#202430',
                    margin: '0 0 12px 0'
                  }}
                >
                  {cat.name}
                </h3>
                <p 
                  style={{ 
                    fontFamily: 'var(--font-epilogue)',
                    fontWeight: 400,
                    fontSize: '18px',
                    color: cat.active ? '#FFFFFF' : '#7C8493',
                    opacity: cat.active ? 0.8 : 1,
                    margin: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  {cat.jobs} 
                  <FiChevronRight style={{ color: cat.active ? '#FFFFFF' : '#202430' }} />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
