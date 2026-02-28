import React from "react";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import { JobCard } from "./JobCard";

const featuredJobs = [
  { id: '1', title: "Email Marketing", company: "Revolut", location: "Madrid, Spain", tags: [{ name: "Marketing", color: "#FFB836", bgColor: "rgba(255,184,54,0.1)", borderColor: "#FFB836" }, { name: "Design", color: "#4640DE", bgColor: "rgba(70,64,222,0.1)", borderColor: "#4640DE" }] },
  { id: '2', title: "Brand Designer", company: "Dropbox", location: "San Francisco, USA", tags: [{ name: "Design", color: "#4640DE", bgColor: "rgba(70,64,222,0.1)", borderColor: "#4640DE" }, { name: "Business", color: "#FFB836", bgColor: "rgba(255,184,54,0.1)", borderColor: "#FFB836" }] },
  { id: '3', title: "Email Marketing", company: "Pitch", location: "Berlin, Germany", tags: [{ name: "Marketing", color: "#FFB836", bgColor: "rgba(255,184,54,0.1)", borderColor: "#FFB836" }, { name: "Design", color: "#4640DE", bgColor: "rgba(70,64,222,0.1)", borderColor: "#4640DE" }] },
  { id: '4', title: "Visual Designer", company: "Blinkist", location: "Remote", tags: [{ name: "Design", color: "#4640DE", bgColor: "rgba(70,64,222,0.1)", borderColor: "#4640DE" }] },
  { id: '5', title: "Product Designer", company: "ClassPass", location: "Remote", tags: [{ name: "Marketing", color: "#FFB836", bgColor: "rgba(255,184,54,0.1)", borderColor: "#FFB836" }, { name: "Design", color: "#4640DE", bgColor: "rgba(70,64,222,0.1)", borderColor: "#4640DE" }] },
  { id: '6', title: "Lead Designer", company: "Canva", location: "Sydney, Australia", tags: [{ name: "Design", color: "#4640DE", bgColor: "rgba(70,64,222,0.1)", borderColor: "#4640DE" }] },
  { id: '7', title: "Brand Strategist", company: "GoDaddy", location: "USA", tags: [{ name: "Marketing", color: "#FFB836", bgColor: "rgba(255,184,54,0.1)", borderColor: "#FFB836" }] },
  { id: '8', title: "Customer Care", company: "Twitter", location: "San Francisco, USA", tags: [{ name: "Marketing", color: "#FFB836", bgColor: "rgba(255,184,54,0.1)", borderColor: "#FFB836" }] },
];

export const FeaturedJobs = () => {
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
          height: '850px', 
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
            Featured <span style={{ color: '#26A4FF' }}>jobs</span>
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
            gap: '31.5px' // Calculated to fit 4 cards of 273.5px in 1190px
          }}
        >
          {featuredJobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>
      </div>
    </section>
  );
};
