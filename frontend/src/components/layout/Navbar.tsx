import React from "react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav 
      style={{ 
        width: '100%', 
        backgroundColor: '#F8F8FD', 
        display: 'flex', 
        justifyContent: 'center',
        height: '78px',
        borderBottom: '1px solid #D6DDEB'
      }}
    >
      <div 
        style={{ 
          width: '1440px', 
          height: '78px', 
          position: 'relative',
          padding: '0 124px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Logo Section */}
        <Link 
          href="/" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            textDecoration: 'none',
            color: '#202430'
          }}
        >
          <div style={{ width: '32px', height: '32px', background: '#4640DE', borderRadius: '50%' }} />
          <span style={{ fontFamily: 'var(--font-clash-display)', fontWeight: 700, fontSize: '24px' }}>QuickHire</span>
        </Link>

        {/* Menu Section — Centered roughly with margin: 0 auto logic */}
        <div 
          style={{ 
            display: 'flex', 
            gap: '48px',
            fontFamily: 'var(--font-epilogue)',
            fontWeight: 500,
            fontSize: '16px'
          }}
        >
          <Link href="/jobs" style={{ color: '#4640DE', textDecoration: 'none', borderBottom: '2px solid #4640DE', paddingBottom: '27px' }}>Find Jobs</Link>
          <Link href="#" style={{ color: '#515B6F', textDecoration: 'none', opacity: 0.8 }}>Browse Companies</Link>
        </div>

        {/* Auth Section */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px'
          }}
        >
          <Link 
            href="#" 
            style={{ 
              fontFamily: 'var(--font-epilogue)',
              fontWeight: 700,
              fontSize: '16px',
              color: '#4640DE',
              textDecoration: 'none',
              padding: '12px 24px'
            }}
          >
            Login
          </Link>
          <div style={{ width: '1px', height: '24px', background: '#D6DDEB' }} />
          <Link 
            href="/admin/create" 
            style={{ 
              fontFamily: 'var(--font-epilogue)',
              fontWeight: 700,
              fontSize: '16px',
              color: '#FFFFFF',
              background: '#4640DE',
              textDecoration: 'none',
              padding: '12px 24px',
              borderRadius: '0px' // Figma buttons are often sharp or specific radius
            }}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};
