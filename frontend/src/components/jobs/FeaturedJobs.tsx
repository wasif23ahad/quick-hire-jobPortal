import React from "react";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import { JobCard } from "./JobCard";
import { fetchJobs } from "@/lib/api";

export const FeaturedJobs = async () => {
  const { jobs } = await fetchJobs({ limit: 8 });
  const displayJobs = jobs || [];

  return (
    <section className="w-full bg-white flex justify-center py-16 md:py-20 px-4 sm:px-6">
      <div className="w-full max-w-[1190px]">
        {/* Title Content */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 md:mb-12">
          <h2
            style={{
              fontFamily: 'var(--font-clash-display)',
              fontWeight: 600,
              fontSize: 'clamp(28px, 4vw, 48px)',
              lineHeight: '120%',
              color: '#202430',
              margin: 0,
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
              textDecoration: 'none',
            }}
          >
            Show all jobs <FiChevronRight />
          </Link>
        </div>

        {/* Responsive Grid — Horizontal scroll mobile, 2 cols tablet, 4 cols desktop */}
        <div className="flex sm:grid overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 pb-4 sm:pb-0 px-2 sm:px-0 scrollbar-hide">
          {displayJobs.map((job) => (
            <div key={job.id} className="min-w-[85vw] sm:min-w-0 snap-start shrink-0">
              <JobCard
                id={job.id}
                title={job.title}
                company={job.company}
                location={job.location}
                type={job.type}
                companyLogo={job.companyLogo}
                tags={[
                  {
                    name: job.category,
                    color: "#FFB836",
                    bgColor: "rgba(255,184,54,0.1)",
                    borderColor: "#FFB836",
                  },
                  ...(job.tags || [])
                    .filter(t => t.toLowerCase() !== job.category.toLowerCase())
                    .slice(0, 1)
                    .map((t) => ({
                      name: t,
                      color: "#4640DE",
                      bgColor: "rgba(70,64,222,0.1)",
                      borderColor: "#4640DE",
                    })),
                ]}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
