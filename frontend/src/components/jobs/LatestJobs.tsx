import React from "react";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";
import { fetchJobs } from "@/lib/api";
import { LatestJobCard } from "./LatestJobCard";

export const LatestJobs = async () => {
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
              textDecoration: 'none',
            }}
          >
            Show all jobs <FiChevronRight />
          </Link>
        </div>

        {/* Responsive Grid — 1 col mobile, 2 cols desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {displayJobs.map((job) => (
            <LatestJobCard
              key={job.id}
              id={job.id}
              title={job.title}
              company={job.company}
              location={job.location}
              companyLogo={job.companyLogo}
              tags={[
                {
                  name: job.type,
                  color: "#56CDAD",
                  bgColor: "rgba(86,205,173,0.1)",
                  borderColor: "#56CDAD",
                },
                {
                  name: job.category,
                  color: "#FFB836",
                  bgColor: "rgba(255,184,54,0.1)",
                  borderColor: "#FFB836",
                },
                ...(job.tags || []).slice(0, 1).map((t) => ({
                  name: t,
                  color: "#4640DE",
                  bgColor: "rgba(70,64,222,0.1)",
                  borderColor: "#4640DE",
                })),
              ]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
