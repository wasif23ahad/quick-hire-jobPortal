import React from "react";
import { FiSearch, FiMapPin, FiChevronDown } from "react-icons/fi";

export const Hero = () => {
  return (
    <section 
      style={{ 
        width: '100%', 
        backgroundColor: '#F8F8FD', 
        display: 'flex', 
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* 1440px Fixed Width Container */}
      <div 
        style={{ 
          width: '1440px', 
          height: '787px', // Approximated height based on design
          position: 'relative',
          backgroundColor: '#F8F8FD'
        }}
      >
        {/* Title Content — 629px wide, left 125px, top 160px */}
        <div 
          style={{ 
            position: 'absolute',
            width: '629px',
            height: '530.58px',
            left: '125px',
            top: '160px',
            display: 'flex',
            flexDirection: 'column',
            gap: '23px'
          }}
        >
          {/* Main Title Heading — Clash Display 600, 72px */}
          <div style={{ position: 'relative', width: '533px', height: '289.58px' }}>
            <h1 
              style={{ 
                fontFamily: 'var(--font-clash-display)',
                fontWeight: 600,
                fontSize: '72px',
                lineHeight: '110%',
                color: '#25324B',
                margin: 0
              }}
            >
              Discover<br />
              more than<br />
              <span style={{ color: '#26A4FF' }}>5000+ Jobs</span>
            </h1>

            {/* Underline Vector 1 */}
            <div 
              style={{ 
                position: 'absolute',
                left: '0%',
                right: '27.66%',
                top: '88%',
                height: '6px',
                background: '#26A4FF',
                borderRadius: '3px'
              }}
            />
            {/* Underline Vector 2 */}
            <div 
              style={{ 
                position: 'absolute',
                left: '5.45%',
                right: '60%',
                top: '94%',
                height: '4px',
                background: '#26A4FF',
                borderRadius: '2px'
              }}
            />
          </div>

          {/* Description — Epilogue 400, 20px, #515B6F */}
          <p 
            style={{ 
              width: '521px',
              fontFamily: 'var(--font-epilogue)',
              fontWeight: 400,
              fontSize: '20px',
              lineHeight: '160%',
              color: '#515B6F',
              opacity: 0.7,
              margin: 0
            }}
          >
            Great platform for the job seeker that searching for new career heights and passionate about startups.
          </p>

          {/* Search Bar — 852x89px, white, complex shadow */}
          <div 
            style={{ 
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              padding: '16px',
              width: '852px',
              height: '89px',
              background: '#FFFFFF',
              boxShadow: '0px 79px 128px rgba(192, 192, 192, 0.09), 0px 28.8363px 46.7221px rgba(192, 192, 192, 0.0598508), 0px 13.9995px 22.6827px rgba(192, 192, 192, 0.0475723), 0px 6.86281px 11.1195px rgba(192, 192, 192, 0.0380675), 0px 2.71357px 4.39666px rgba(192, 192, 192, 0.0270615)',
              zIndex: 10
            }}
          >
            {/* Job Title Field */}
            <div 
              style={{ 
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '0 16px',
                gap: '16px',
                flex: 1,
                alignSelf: 'stretch',
                borderBottom: '1px solid #D6DDEB'
              }}
            >
              <FiSearch style={{ width: '24px', height: '24px', color: '#25324B', flexShrink: 0 }} />
              <input 
                type="text" 
                placeholder="Job title or keyword" 
                style={{ 
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'var(--font-epilogue)',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '160%',
                  color: '#25324B'
                }}
              />
            </div>

            {/* Location Field */}
            <div 
              style={{ 
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '0 24px 0 8px',
                gap: '16px',
                flex: 1,
                alignSelf: 'stretch',
                borderBottom: '1px solid #D6DDEB'
              }}
            >
              <FiMapPin style={{ width: '24px', height: '24px', color: '#25324B', flexShrink: 0 }} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 1 }}>
                <span 
                  style={{ 
                    fontFamily: 'var(--font-epilogue)',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '160%',
                    color: '#25324B',
                    opacity: 0.9,
                    whiteSpace: 'nowrap'
                  }}
                >
                  Florence, Italy
                </span>
                <FiChevronDown style={{ width: '16px', height: '16px', color: '#7C8493' }} />
              </div>
            </div>

            {/* Search Button — 209x57px */}
            <button 
              style={{ 
                width: '209px',
                height: '57px',
                background: '#4640DE',
                fontFamily: 'var(--font-epilogue)',
                fontWeight: 700,
                fontSize: '18px',
                lineHeight: '160%',
                color: '#FFFFFF',
                border: 'none',
                cursor: 'pointer',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              Search my job
            </button>
          </div>

          {/* Popular Tag Line */}
          <div 
            style={{ 
              display: 'flex',
              alignItems: 'center',
              width: '412px',
              fontFamily: 'var(--font-epilogue)',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '160%',
              color: '#202430',
              opacity: 0.7
            }}
          >
            Popular : UI Designer, UX Researcher, Android, Admin
          </div>
        </div>

        {/* Hero Image Section — absolute right:0, top:87px */}
        <div 
          style={{ 
            position: 'absolute',
            width: '837.99px',
            height: '1036.69px',
            left: '812px', // In Figma 812px from left
            top: '87px',
            zIndex: 1
          }}
        >
          {/* Person Image Container */}
          <div 
            style={{ 
              position: 'absolute',
              width: '501px',
              height: '707px',
              left: '0',
              top: '0',
              overflow: 'hidden'
            }}
          >
            <img 
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop"
              alt="Person"
              style={{ 
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top'
              }}
            />
          </div>

          {/* White cutout rectangle — rotated 64deg */}
          <div 
            style={{ 
              position: 'absolute',
              width: '283.38px',
              height: '716.25px',
              left: '70px', // Relative to container left 812px
              top: '468px',
              background: '#FFFFFF',
              transform: 'rotate(64deg)',
              zIndex: 2
            }}
          />
        </div>
      </div>
    </section>
  );
};
