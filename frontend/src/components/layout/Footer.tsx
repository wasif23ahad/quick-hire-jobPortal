import React from "react";
import Link from "next/link";
import { 
  FiFacebook, 
  FiInstagram, 
  FiLinkedin, 
  FiTwitter,
  FiDribbble
} from "react-icons/fi";

export const Footer = () => {
  return (
    <footer 
      style={{ 
        width: '100%', 
        backgroundColor: '#202430', 
        display: 'flex', 
        justifyContent: 'center',
        paddingTop: '80px',
        paddingBottom: '40px'
      }}
    >
      <div 
        style={{ 
          width: '1440px', 
          height: '450px', 
          position: 'relative',
          color: '#FFFFFF'
        }}
      >
        {/* Brand Section */}
        <div 
          style={{ 
            position: 'absolute',
            left: '125px',
            top: '0px',
            width: '376px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}>
            <img src="/logo.svg" alt="QuickHire Logo" style={{ width: '32px', height: '32px' }} />
            <span style={{ fontFamily: 'var(--font-clash-display)', fontWeight: 700, fontSize: '24px', letterSpacing: '-0.02em' }}>QuickHire</span>
          </div>
          <p 
            style={{ 
              fontFamily: 'var(--font-epilogue)',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '160%',
              color: '#D6DDEB',
              opacity: 0.7,
              margin: 0
            }}
          >
            Great platform for the job seeker that passionate about startups. Find your dream job easier.
          </p>
        </div>

        {/* Links: About */}
        <div 
          style={{ 
            position: 'absolute',
            left: '581px',
            top: '0px'
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-clash-display)', fontWeight: 600, fontSize: '18px', margin: '0 0 24px 0', color: '#FFFFFF' }}>About</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {['Companies', 'Pricing', 'Terms', 'Advice', 'Privacy Policy'].map(item => (
              <Link key={item} href="#" style={{ color: '#D6DDEB', textDecoration: 'none', fontFamily: 'var(--font-epilogue)', fontSize: '16px' }}>{item}</Link>
            ))}
          </div>
        </div>

        {/* Links: Resources */}
        <div 
          style={{ 
            position: 'absolute',
            left: '739px',
            top: '0px'
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-clash-display)', fontWeight: 600, fontSize: '18px', margin: '0 0 24px 0', color: '#FFFFFF' }}>Resources</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {['Help Docs', 'Guide', 'Updates', 'Contact Us'].map(item => (
              <Link key={item} href="#" style={{ color: '#D6DDEB', textDecoration: 'none', fontFamily: 'var(--font-epilogue)', fontSize: '16px' }}>{item}</Link>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div 
          style={{ 
            position: 'absolute',
            left: '921px',
            top: '0px',
            width: '394px'
          }}
        >
          <h3 style={{ fontFamily: 'var(--font-clash-display)', fontWeight: 600, fontSize: '18px', margin: '0 0 24px 0', color: '#FFFFFF' }}>Get job notifications</h3>
          <p 
            style={{ 
              fontFamily: 'var(--font-epilogue)',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '160%',
              color: '#D6DDEB',
              opacity: 0.8,
              margin: '0 0 24px 0'
            }}
          >
            The latest job news, articles, sent to your inbox weekly.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <input 
              type="text" 
              placeholder="Email Address" 
              style={{ 
                width: '100%',
                height: '50px',
                padding: '12px 16px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #D6DDEB',
                fontFamily: 'var(--font-epilogue)',
                fontSize: '16px',
                color: '#25324B',
                outline: 'none'
              }}
            />
            <button 
              style={{ 
                width: '100%',
                height: '50px',
                background: '#4640DE',
                color: '#FFFFFF',
                border: 'none',
                fontFamily: 'var(--font-clash-display)',
                fontWeight: 700,
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          style={{ 
            position: 'absolute',
            left: '125px',
            bottom: '0px',
            width: '1190px',
            paddingTop: '40px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontFamily: 'var(--font-epilogue)',
            fontSize: '14px',
            color: '#D6DDEB',
            opacity: 0.5
          }}
        >
          <p>2021 @ QuickHire. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <FiFacebook style={{ fontSize: '20px', cursor: 'pointer' }} />
            <FiInstagram style={{ fontSize: '20px', cursor: 'pointer' }} />
            <FiDribbble style={{ fontSize: '20px', cursor: 'pointer' }} />
            <FiLinkedin style={{ fontSize: '20px', cursor: 'pointer' }} />
            <FiTwitter style={{ fontSize: '20px', cursor: 'pointer' }} />
          </div>
        </div>
      </div>
    </footer>
  );
};
