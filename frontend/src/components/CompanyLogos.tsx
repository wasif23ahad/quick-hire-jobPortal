import React from "react";

const companies = [
  { name: "vodafone", width: '147px', height: '36px' },
  { name: "intel", width: '85px', height: '36px' },
  { name: "TESLA", width: '133px', height: '17px' },
  { name: "AMD", width: '109px', height: '34px' },
  { name: "Talkit", width: '133px', height: '40px' }
];

export const CompanyLogos = () => {
  return (
    <section 
      style={{ 
        width: '100%', 
        backgroundColor: '#F8F8FD', 
        display: 'flex', 
        justifyContent: 'center',
        paddingTop: '40px',
        paddingBottom: '80px'
      }}
    >
      <div 
        style={{ 
          width: '1440px', 
          height: '150px', 
          position: 'relative'
        }}
      >
        {/* "Companies we helped grow" text */}
        <p 
          style={{ 
            position: 'absolute',
            left: '125px',
            top: '0px',
            fontFamily: 'var(--font-epilogue)',
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: '160%',
            color: '#202430',
            opacity: 0.5,
            margin: 0
          }}
        >
          Companies we helped grow
        </p>

        {/* Logo Container — 1190px wide, centered roughly */}
        <div 
          style={{ 
            position: 'absolute',
            width: '1190px',
            height: '40px',
            left: '125px',
            top: '64px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          {companies.map((company) => (
            <div 
              key={company.name}
              style={{ 
                fontFamily: 'var(--font-clash-display)',
                fontWeight: 600,
                fontSize: '32px',
                color: '#202430',
                opacity: 0.3,
                textTransform: company.name === 'TESLA' || company.name === 'AMD' ? 'uppercase' : 'none',
                letterSpacing: company.name === 'TESLA' ? '0.2em' : 'normal'
              }}
            >
              {company.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
