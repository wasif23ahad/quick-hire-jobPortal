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
        className="w-full max-w-[1440px] px-6 sm:px-12 lg:px-[125px] flex flex-col gap-12 sm:gap-[64px] text-white"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-8 cursor-default">
          {/* Brand Section */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                margin: 0,
                maxWidth: '376px'
              }}
            >
              Great platform for the job seeker that passionate about startups. Find your dream job easier.
            </p>
          </div>

          {/* Links: About */}
          <div className="lg:col-span-2 lg:col-start-6 flex flex-col gap-6">
            <h3 style={{ fontFamily: 'var(--font-clash-display)', fontWeight: 600, fontSize: '18px', margin: 0, color: '#FFFFFF' }}>About</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {['Companies', 'Pricing', 'Terms', 'Advice', 'Privacy Policy'].map(item => (
                <Link key={item} href="#" className="hover:text-white transition-colors" style={{ color: '#D6DDEB', textDecoration: 'none', fontFamily: 'var(--font-epilogue)', fontSize: '16px' }}>{item}</Link>
              ))}
            </div>
          </div>

          {/* Links: Resources */}
          <div className="lg:col-span-2 lg:col-start-8 flex flex-col gap-6">
            <h3 style={{ fontFamily: 'var(--font-clash-display)', fontWeight: 600, fontSize: '18px', margin: 0, color: '#FFFFFF' }}>Resources</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {['Help Docs', 'Guide', 'Updates', 'Contact Us'].map(item => (
                <Link key={item} href="#" className="hover:text-white transition-colors" style={{ color: '#D6DDEB', textDecoration: 'none', fontFamily: 'var(--font-epilogue)', fontSize: '16px' }}>{item}</Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4 lg:col-start-10 flex flex-col gap-6">
            <h3 style={{ fontFamily: 'var(--font-clash-display)', fontWeight: 600, fontSize: '18px', margin: 0, color: '#FFFFFF' }}>Get job notifications</h3>
            <p 
              style={{ 
                fontFamily: 'var(--font-epilogue)',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '160%',
                color: '#D6DDEB',
                opacity: 0.8,
                margin: 0
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
                className="hover:bg-opacity-90 transition-all"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-10 border-t border-white/10"
          style={{ 
            fontFamily: 'var(--font-epilogue)',
            fontSize: '14px',
            color: '#D6DDEB',
            opacity: 0.5
          }}
        >
          <p className="m-0 text-center sm:text-left">2021 @ QuickHire. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <FiFacebook className="text-[20px] cursor-pointer hover:text-white transition-colors" />
            <FiInstagram className="text-[20px] cursor-pointer hover:text-white transition-colors" />
            <FiDribbble className="text-[20px] cursor-pointer hover:text-white transition-colors" />
            <FiLinkedin className="text-[20px] cursor-pointer hover:text-white transition-colors" />
            <FiTwitter className="text-[20px] cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  );
};
