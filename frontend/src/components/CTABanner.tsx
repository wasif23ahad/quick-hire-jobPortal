import React from "react";
import Link from "next/link";

/* ─── Mini Dashboard Mockup ─── */
const DashboardMockup = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      background: '#FFFFFF',
      borderRadius: '8px 0 0 0',
      boxShadow: '-20px 20px 60px rgba(0,0,0,0.15)',
      display: 'flex',
      overflow: 'hidden',
      fontSize: '10px',
      fontFamily: 'var(--font-epilogue), sans-serif',
    }}
  >
    {/* ── Sidebar ── */}
    <div
      style={{
        width: '160px',
        background: '#FFFFFF',
        borderRight: '1px solid #D6DDEB',
        padding: '16px 0',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div style={{ padding: '0 16px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div style={{ width: '20px', height: '20px', background: '#4640DE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#FFF', fontSize: '8px', fontWeight: 700 }}>Q</span>
        </div>
        <span style={{ fontWeight: 700, fontSize: '11px', color: '#202430' }}>QuickHire</span>
      </div>

      {/* Nav Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '0 8px' }}>
        <SidebarItem icon="⌂" label="Dashboard" active />
        <SidebarItem icon="✉" label="Messages" />
        <SidebarItem icon="🏢" label="Company Profile" />
        <SidebarItem icon="👥" label="All Applicants" />
        <SidebarItem icon="📋" label="Job Listing" />
        <SidebarItem icon="📅" label="My Schedule" />
      </div>

      <div style={{ margin: '12px 16px', borderTop: '1px solid #D6DDEB' }} />
      <div style={{ padding: '0 16px', fontSize: '8px', color: '#7C8493', fontWeight: 600, marginBottom: '6px', letterSpacing: '0.5px' }}>SETTINGS</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '0 8px' }}>
        <SidebarItem icon="⚙" label="Settings" />
        <SidebarItem icon="❓" label="Help Center" />
      </div>
    </div>

    {/* ── Main Content ── */}
    <div style={{ flex: 1, background: '#F8F8FD', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Top Bar */}
      <div style={{ height: '36px', background: '#FFFFFF', borderBottom: '1px solid #D6DDEB', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '16px', height: '16px', background: '#4640DE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#FFF', fontSize: '6px', fontWeight: 700 }}>Q</span>
          </div>
          <div>
            <div style={{ fontSize: '7px', color: '#7C8493' }}>Company</div>
            <div style={{ fontSize: '9px', fontWeight: 600, color: '#202430' }}>Nomad ▾</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '14px', height: '14px', color: '#7C8493', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>🔔</div>
          <div style={{ background: '#4640DE', color: '#FFF', fontSize: '7px', fontWeight: 700, padding: '4px 10px', borderRadius: '3px' }}>+ Post a job</div>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ padding: '14px 16px', flex: 1, overflow: 'hidden' }}>
        {/* Greeting */}
        <div style={{ marginBottom: '10px' }}>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#202430', fontFamily: 'var(--font-clash-display)' }}>Good morning, Maria</div>
          <div style={{ fontSize: '8px', color: '#7C8493', marginTop: '2px' }}>Here is your job listings statistic report from July 19 - July 25.</div>
        </div>

        {/* Stat Cards */}
        <div style={{ display: 'flex', gap: '9.4px', marginBottom: '12px' }}>
          <StatCard value="76" label="New candidates to review" color="#4640DE" arrow="›" />
          <StatCard value="3" label="Schedule for today" color="#56CDAD" arrow="›" />
          <StatCard value="24" label="Messages received" color="#26A4FF" arrow="›" />
        </div>

        {/* Bottom Section */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {/* Job Statistics */}
          <div style={{ flex: 2, background: '#FFFFFF', borderRadius: '6px', border: '1px solid #E4E5E7', padding: '10px 12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ fontWeight: 600, fontSize: '10px', color: '#202430' }}>Job statistics</div>
              <div style={{ display: 'flex', gap: '4px' }}>
                {['Week', 'Month', 'Year'].map((t, i) => (
                  <span key={t} style={{ fontSize: '7px', padding: '2px 6px', borderRadius: '3px', background: i === 0 ? '#4640DE' : '#F8F8FD', color: i === 0 ? '#FFF' : '#7C8493', fontWeight: 600 }}>{t}</span>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '3px' }}>
              <div style={{ fontSize: '8px', color: '#4640DE', fontWeight: 600 }}>Overview</div>
              <div style={{ fontSize: '8px', color: '#7C8493' }}>Jobs View</div>
              <div style={{ fontSize: '8px', color: '#7C8493' }}>Jobs Applied</div>
            </div>
            {/* Chart Bars */}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '60px', marginTop: '8px' }}>
              {[
                { d1: 30, d2: 20 }, { d1: 45, d2: 30 }, { d1: 55, d2: 25 },
                { d1: 35, d2: 40 }, { d1: 60, d2: 35 }, { d1: 40, d2: 20 }, { d1: 50, d2: 30 }
              ].map((bar, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px' }}>
                  <div style={{ width: '100%', display: 'flex', gap: '1px', alignItems: 'flex-end', justifyContent: 'center', height: '48px' }}>
                    <div style={{ width: '40%', height: `${bar.d1}px`, background: '#4640DE', borderRadius: '1px' }} />
                    <div style={{ width: '40%', height: `${bar.d2}px`, background: '#FFB836', borderRadius: '1px' }} />
                  </div>
                  <span style={{ fontSize: '6px', color: '#7C8493' }}>{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <div style={{ width: '6px', height: '6px', background: '#4640DE', borderRadius: '1px' }} />
                <span style={{ fontSize: '6px', color: '#7C8493' }}>Job View</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <div style={{ width: '6px', height: '6px', background: '#FFB836', borderRadius: '1px' }} />
                <span style={{ fontSize: '6px', color: '#7C8493' }}>Job Applied</span>
              </div>
            </div>
          </div>

          {/* Right Stats */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Job Views */}
            <div style={{ background: '#FFFFFF', borderRadius: '6px', border: '1px solid #E4E5E7', padding: '8px 10px' }}>
              <div style={{ fontSize: '8px', color: '#7C8493', marginBottom: '2px' }}>Job Views</div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#202430' }}>2,342</div>
              <div style={{ fontSize: '7px', color: '#7C8493' }}>This Week <span style={{ color: '#56CDAD' }}>6.4%↑</span></div>
            </div>
            {/* Job Applied */}
            <div style={{ background: '#FFFFFF', borderRadius: '6px', border: '1px solid #E4E5E7', padding: '8px 10px' }}>
              <div style={{ fontSize: '8px', color: '#7C8493', marginBottom: '2px' }}>Job Applied</div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#202430' }}>654</div>
              <div style={{ fontSize: '7px', color: '#7C8493' }}>This Week <span style={{ color: '#56CDAD' }}>0.6%↑</span></div>
            </div>
          </div>

          {/* Far Right Stats */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Jobs Open */}
            <div style={{ background: '#FFFFFF', borderRadius: '6px', border: '1px solid #E4E5E7', padding: '8px 10px' }}>
              <div style={{ fontSize: '8px', color: '#7C8493', marginBottom: '2px' }}>Jobs Open</div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#202430' }}>12</div>
              <div style={{ fontSize: '7px', color: '#7C8493' }}>Jobs Opened</div>
            </div>
            {/* Applicants Summary */}
            <div style={{ background: '#FFFFFF', borderRadius: '6px', border: '1px solid #E4E5E7', padding: '8px 10px' }}>
              <div style={{ fontSize: '8px', color: '#7C8493', marginBottom: '2px' }}>Applicants Summary</div>
              <div style={{ fontSize: '16px', fontWeight: 700, color: '#202430' }}>67</div>
              <div style={{ fontSize: '7px', color: '#7C8493' }}>Applicants</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginTop: '4px' }}>
                {[
                  { l: 'Full Time', c: '#4640DE', n: 45 },
                  { l: 'Internship', c: '#56CDAD', n: 12 },
                  { l: 'Part-Time', c: '#FFB836', n: 24 },
                  { l: 'Contract', c: '#FF6550', n: 10 },
                  { l: 'Remote', c: '#26A4FF', n: 22 },
                ].map(t => (
                  <div key={t.l} style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <div style={{ width: '4px', height: '4px', background: t.c, borderRadius: '1px' }} />
                    <span style={{ fontSize: '5px', color: '#7C8493' }}>{t.l}: {t.n}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ─── Sidebar Item ─── */
const SidebarItem = ({ icon, label, active, badge }: { icon: string; label: string; active?: boolean; badge?: number }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '5px 8px',
      borderRadius: '4px',
      background: active ? 'rgba(70,64,222,0.1)' : 'transparent',
      cursor: 'pointer',
      position: 'relative',
    }}
  >
    <span style={{ fontSize: '10px', opacity: active ? 1 : 0.5 }}>{icon}</span>
    <span style={{ fontSize: '9px', fontWeight: active ? 600 : 400, color: active ? '#4640DE' : '#7C8493' }}>{label}</span>
    {badge && (
      <span style={{ marginLeft: 'auto', background: '#4640DE', color: '#FFF', fontSize: '6px', fontWeight: 700, width: '12px', height: '12px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{badge}</span>
    )}
  </div>
);

/* ─── Stat Card ─── */
const StatCard = ({ value, label, color, arrow }: { value: string; label: string; color: string; arrow: string }) => (
  <div
    style={{
      flex: 1,
      background: color,
      borderRadius: '6px',
      padding: '8px 12px',
      color: '#FFFFFF',
      display: 'flex',
      alignItems: 'center',
      gap: '9.79px',
      overflow: 'hidden',
    }}
  >
    <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'var(--font-clash-display)' }}>{value}</div>
    <div style={{ fontSize: '8px', opacity: 0.9, lineHeight: '120%', flex: 1 }}>{label}</div>
    <span style={{ fontSize: '12px', opacity: 0.9 }}>{arrow}</span>
  </div>
);

/* ─── Main CTA Banner ─── */
export const CTABanner = () => {
  return (
    <section
      className="w-full bg-white flex justify-center py-10 sm:py-20 px-0 sm:px-6"
    >
      <div
        className="w-full max-w-[1190px] mx-auto bg-[#4640DE] relative flex flex-col sm:flex-row items-center sm:h-[474px] overflow-hidden rounded-none sm:rounded-lg"
      >
        {/* Left Content */}
        <div className="w-full sm:w-[400px] px-6 py-12 sm:p-0 sm:pl-[80px] z-[2] flex-shrink-0 flex flex-col items-center sm:items-start text-center sm:text-left">
          <h2
            style={{
              fontFamily: 'var(--font-clash-display)',
              fontWeight: 600,
              fontSize: 'clamp(32px, 5vw, 48px)',
              lineHeight: '110%',
              letterSpacing: '0%',
              color: '#FFFFFF',
              margin: '0 0 16px 0',
            }}
          >
            Start posting jobs <br className="block sm:hidden" /> today
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-epilogue)',
              fontWeight: 400,
              fontSize: '18px',
              lineHeight: '160%',
              color: '#FFFFFF',
              opacity: 0.8,
              margin: '0 0 32px 0',
            }}
          >
            Start posting jobs for only $10.
          </p>
          <Link
            href="/employer/register"
            className="inline-flex items-center justify-center w-full sm:w-[202px] h-[57px] bg-white text-[#4640DE] rounded-sm shadow-md hover:shadow-xl hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
            style={{
              fontFamily: 'var(--font-epilogue)',
              fontWeight: 700,
              fontSize: '18px',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            Sign Up For Free
          </Link>
        </div>

        {/* Right Dashboard Mockup — perspective tilt for 3D effect */}
        <div
          className="w-[620px] h-[420px] sm:absolute sm:right-[-20px] sm:top-[24px] z-[1] transform mb-[-20px] sm:mb-0 ml-[40px] sm:ml-0"
          style={{
            transform: 'perspective(1200px) rotateY(-8deg) rotateX(2deg)',
            transformOrigin: 'center center',
          }}
        >
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
};
