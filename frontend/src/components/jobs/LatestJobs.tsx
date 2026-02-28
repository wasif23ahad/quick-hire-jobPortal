import React from "react";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

const latestJobs = [
  { id: '1', company: "Nomad", title: "Social Media Assistant", location: "Paris, France", tags: [{ name: "Full-Time", color: "#56CDAD", bgColor: "rgba(86,205,173,0.1)", borderColor: "#56CDAD" }, { name: "Marketing", color: "#FFB836", bgColor: "rgba(255,184,54,0.1)", borderColor: "#FFB836" }, { name: "Design", color: "#4640DE", bgColor: "rgba(70,64,222,0.1)", borderColor: "#4640DE" }] },
  { id: '2', company: "Netlify", title: "Social Media Assistant", location: "Paris, France", tags: [{ name: "Full-Time", color: "#56CDAD", bgColor: "rgba(86,205,173,0.1)", borderColor: "#56CDAD" }, { name: "Marketing", color: "#FFB836", bgColor: "rgba(255,184,54,0.1)", borderColor: "#FFB836" }, { name: "Design", color: "#4640DE", bgColor: "rgba(70,64,222,0.1)", borderColor: "#4640DE" }] },
  { id: '3', company: "Dropbox", title: "Brand Designer", location: "San Francisco, USA", tags: [{ name: "Full-Time", color: "#56CDAD", bgColor: "rgba(86,205,173,0.1)", borderColor: "#56CDAD" }, { name: "Marketing", color: "#FFB836", bgColor: "rgba(255,184,54,0.1)", borderColor: "#FFB836" }, { name: "Design", color: "#4640DE", bgColor: "rgba(70,64,222,0.1)", borderColor: "#4640DE" }] },
  { id: '4', company: "Maze", title: "Brand Designer", location: "San Francisco, USA", tags: [{ name: "Full-Time", color: "#56CDAD", bgColor: "rgba(86,205,173,0.1)", borderColor: "#56CDAD" }, { name: "Marketing", color: "#FFB836", bgColor: "rgba(255,184,54,0.1)", borderColor: "#FFB836" }, { name: "Design", color: "#4640DE", bgColor: "rgba(70,64,222,0.1)", borderColor: "#4640DE" }] },
  { id: '5', company: "Terraform", title: "Interactive Developer", location: "Hamburg, Germany", tags: [{ name: "Full-Time", color: "#56CDAD", bgColor: "rgba(86,205,173,0.1)", borderColor: "#56CDAD" }, { name: "Marketing", color: "#FFB836", bgColor: "rgba(255,184,54,0.1)", borderColor: "#FFB836" }, { name: "Design", color: "#4640DE", bgColor: "rgba(70,64,222,0.1)", borderColor: "#4640DE" }] },
  { id: '6', company: "Udacity", title: "Interactive Developer", location: "Hamburg, Germany", tags: [{ name: "Full-Time", color: "#56CDAD", bgColor: "rgba(86,205,173,0.1)", borderColor: "#56CDAD" }, { name: "Marketing", color: "#FFB836", bgColor: "rgba(255,184,54,0.1)", borderColor: "#FFB836" }, { name: "Design", color: "#4640DE", bgColor: "rgba(70,64,222,0.1)", borderColor: "#4640DE" }] },
  { id: '7', company: "Packer", title: "HR Manager", location: "Lucern, Switzerland", tags: [{ name: "Full-Time", color: "#56CDAD", bgColor: "rgba(86,205,173,0.1)", borderColor: "#56CDAD" }, { name: "Marketing", color: "#FFB836", bgColor: "rgba(255,184,54,0.1)", borderColor: "#FFB836" }, { name: "Design", color: "#4640DE", bgColor: "rgba(70,64,222,0.1)", borderColor: "#4640DE" }] },
  { id: '8', company: "Webflow", title: "HR Manager", location: "Lucern, Switzerland", tags: [{ name: "Full-Time", color: "#56CDAD", bgColor: "rgba(86,205,173,0.1)", borderColor: "#56CDAD" }, { name: "Marketing", color: "#FFB836", bgColor: "rgba(255,184,54,0.1)", borderColor: "#FFB836" }, { name: "Design", color: "#4640DE", bgColor: "rgba(70,64,222,0.1)", borderColor: "#4640DE" }] },
];

function LatestJobItem({ title, company, location, tags }: any) {
  return (
    <div 
      style={{ 
        padding: '24px',
        border: '1px solid #D6DDEB',
        background: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        cursor: 'pointer'
      }}
    >
      <div 
        style={{ 
          width: '64px',
          height: '64px',
          background: '#F8F8FD',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-clash-display)',
          fontWeight: 700,
          fontSize: '24px',
          color: '#202430',
          flexShrink: 0
        }}
      >
        {company[0]}
      </div>
      <div style={{ flex: 1 }}>
        <h3 
          style={{ 
            fontFamily: 'var(--font-clash-display)',
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '120%',
            color: '#202430',
            margin: '0 0 4px 0'
          }}
        >
          {title}
        </h3>
        <p 
          style={{ 
            fontFamily: 'var(--font-epilogue)',
            fontWeight: 400,
            fontSize: '16px',
            color: '#515B6F',
            margin: '0 0 16px 0'
          }}
        >
          {company} • {location}
        </p>
        <div style={{ display: 'flex', gap: '8px' }}>
          {tags.map((tag: any) => (
            <span 
              key={tag.name}
              style={{ 
                padding: '4px 12px',
                borderRadius: '80px',
                background: tag.bgColor,
                border: tag.borderColor === 'transparent' ? 'none' : `1px solid ${tag.borderColor}`,
                color: tag.color,
                fontFamily: 'var(--font-epilogue)',
                fontWeight: 600,
                fontSize: '12px'
              }}
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export const LatestJobs = () => {
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
          height: '750px', 
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
            Latest <span style={{ color: '#26A4FF' }}>jobs open</span>
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

        {/* List Grid — 2 columns */}
        <div 
          style={{ 
            position: 'absolute',
            left: '125px',
            top: '96px',
            width: '1190px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '32px'
          }}
        >
          {latestJobs.map((job) => (
            <LatestJobItem key={job.id} {...job} />
          ))}
        </div>
      </div>
    </section>
  );
};
