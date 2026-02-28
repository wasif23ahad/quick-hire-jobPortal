import React from "react";
import Link from "next/link";

export const CTABanner = () => {
  return (
    <section 
      style={{ 
        width: '100%', 
        backgroundColor: '#FFFFFF', 
        display: 'flex', 
        justifyContent: 'center',
        paddingTop: '40px',
        paddingBottom: '80px'
      }}
    >
      <div 
        style={{ 
          width: '1440px', 
          height: '474px', 
          position: 'relative'
        }}
      >
        {/* Banner Box — 1190px wide, absolute centered */}
        <div 
          style={{ 
            position: 'absolute',
            left: '125px',
            top: '0px',
            width: '1190px',
            height: '474px',
            background: '#4640DE',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '0 80px'
          }}
        >
          {/* Left Content */}
          <div style={{ width: '450px', zIndex: 2 }}>
            <h2 
              style={{ 
                fontFamily: 'var(--font-clash-display)',
                fontWeight: 600,
                fontSize: '48px',
                lineHeight: '120%',
                color: '#FFFFFF',
                margin: '0 0 16px 0'
              }}
            >
              Start posting<br />
              jobs today
            </h2>
            <p 
              style={{ 
                fontFamily: 'var(--font-epilogue)',
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '160%',
                color: '#FFFFFF',
                opacity: 0.8,
                margin: '0 0 32px 0'
              }}
            >
              Start posting jobs for only $10.
            </p>
            <Link 
              href="/admin/create"
              style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '202px',
                height: '57px',
                background: '#FFFFFF',
                fontFamily: 'var(--font-epilogue)',
                fontWeight: 700,
                fontSize: '18px',
                color: '#4640DE',
                textDecoration: 'none',
                cursor: 'pointer'
              }}
            >
              Sign Up For Free
            </Link>
          </div>

          {/* Right Mockup — Absolute positioned within the banner box */}
          <div 
            style={{ 
              position: 'absolute',
              right: '0',
              top: '50px',
              width: '600px',
              height: '400px',
              background: '#FFFFFF',
              borderRadius: '8px 0 0 0',
              boxShadow: '-20px 20px 50px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              zIndex: 1
            }}
          >
            {/* Dashboard Mockup Header */}
            <div 
              style={{ 
                height: '48px',
                background: '#F8F8FD',
                borderBottom: '1px solid #D6DDEB',
                display: 'flex',
                alignItems: 'center',
                padding: '0 24px',
                gap: '12px'
              }}
            >
              <div style={{ width: '24px', height: '24px', background: '#4640DE', borderRadius: '4px' }} />
              <div style={{ width: '100px', height: '8px', background: '#D6DDEB', borderRadius: '4px' }} />
            </div>
            
            {/* Dashboard Content Mockup */}
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                <div style={{ flex: 1, height: '100px', background: '#4640DE', borderRadius: '8px', padding: '16px', color: '#FFF' }}>
                  <div style={{ fontSize: '24px', fontWeight: 700 }}>76</div>
                  <div style={{ fontSize: '12px', opacity: 0.8 }}>New candidates</div>
                </div>
                <div style={{ flex: 1, height: '100px', background: '#56CDAD', borderRadius: '8px', padding: '16px', color: '#FFF' }}>
                  <div style={{ fontSize: '24px', fontWeight: 700 }}>3</div>
                  <div style={{ fontSize: '12px', opacity: 0.8 }}>Schedule for today</div>
                </div>
              </div>
              
              <div style={{ height: '150px', background: '#F8F8FD', borderRadius: '8px', padding: '24px' }}>
                <div style={{ width: '150px', height: '12px', background: '#D6DDEB', borderRadius: '6px', marginBottom: '16px' }} />
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '80px' }}>
                  {[40, 70, 45, 90, 60, 80, 50, 85].map((h, i) => (
                    <div key={i} style={{ flex: 1, height: `${h}%`, background: '#4640DE', borderRadius: '2px' }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
