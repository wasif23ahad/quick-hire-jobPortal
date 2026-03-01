import React from "react";
import { SearchBar } from "@/components/jobs/SearchBar";
import { JobFilter } from "@/components/jobs/JobFilter";
import { JobCard } from "@/components/jobs/JobCard";
import { fetchJobs } from "@/lib/api";
import Link from "next/link";

// This is a Server Component, so we can fetch data directly here
export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string; location?: string; page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = parseInt(params?.page || "1") || 1;
  
  const { jobs, pagination } = await fetchJobs({
    search: params?.search,
    category: params?.category,
    location: params?.location,
    page: currentPage,
    limit: 12,
  });

  // Build pagination links
  const buildPageUrl = (page: number) => {
    const urlParams = new URLSearchParams();
    if (params?.search) urlParams.set("search", params.search);
    if (params?.category) urlParams.set("category", params.category);
    if (params?.location) urlParams.set("location", params.location);
    urlParams.set("page", String(page));
    return `/jobs?${urlParams.toString()}`;
  };

  // Calculate visible page numbers
  const getVisiblePages = () => {
    const pages: number[] = [];
    const total = pagination.totalPages;
    const current = pagination.page;
    
    let start = Math.max(1, current - 2);
    let end = Math.min(total, current + 2);
    
    // Ensure we always show 5 pages if available
    if (end - start < 4) {
      if (start === 1) end = Math.min(total, start + 4);
      else start = Math.max(1, end - 4);
    }
    
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <main className="min-h-screen bg-bg-light pb-20">
      {/* Header Area */}
      <section className="bg-white py-12 border-b border-border">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h1 className="text-4xl md:text-5xl border-b-2 border-primary inline-block pb-2 font-bold font-clash text-heading">
              Find your <span className="text-accent-blue">dream job</span>
            </h1>
            <p className="text-muted mt-6 text-lg">
              Find your next career at companies like Google, Microsoft, Meta, and more.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto relative -mb-20 z-10">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container mx-auto px-6 max-w-7xl pt-20">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className="lg:w-1/4 shrink-0">
            <JobFilter />
          </aside>

          {/* Job Results */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-heading font-clash">
                All Jobs
              </h2>
              <div className="text-sm text-muted">
                Showing <span className="font-bold text-heading">{pagination.total}</span> results
                {pagination.totalPages > 1 && (
                  <span> · Page <span className="font-bold text-heading">{pagination.page}</span> of {pagination.totalPages}</span>
                )}
              </div>
            </div>

            {jobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                  <JobCard
                    key={job.id}
                    id={job.id}
                    companyLogo={job.companyLogo}
                    title={job.title}
                    company={job.company}
                    location={job.location}
                    type={job.type}
                    description={job.description}
                    tags={job.tags.map(tag => {
                      let color = "#515B6F";
                      let bgColor = "rgba(81, 91, 111, 0.1)";
                      let borderColor = "#D6DDEB";
                      
                      const t = tag.toLowerCase();
                      if (t.includes('design')) { color = "#4640DE"; bgColor = "rgba(70, 64, 222, 0.1)"; borderColor = "#4640DE"; }
                      else if (t.includes('market')) { color = "#56CDAD"; bgColor = "rgba(86, 205, 173, 0.1)"; borderColor = "#56CDAD"; }
                      else if (t.includes('sale')) { color = "#FFB836"; bgColor = "rgba(255, 184, 54, 0.1)"; borderColor = "#FFB836"; }
                      else if (t.includes('finance')) { color = "#FF6550"; bgColor = "rgba(255, 101, 80, 0.1)"; borderColor = "#FF6550"; }
                      else if (t.includes('tech') || t.includes('engineer')) { color = "#26A4FF"; bgColor = "rgba(38, 164, 255, 0.1)"; borderColor = "#26A4FF"; }
                      
                      return { name: tag, color, bgColor, borderColor };
                    })}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-border rounded-xl p-12 text-center flex flex-col items-center justify-center">
                <div className="w-24 h-24 bg-bg-light rounded-full flex items-center justify-center mb-6">
                  <span className="text-4xl">🔍</span>
                </div>
                <h3 className="text-2xl font-bold font-clash text-heading mb-2">No jobs found</h3>
                <p className="text-muted max-w-md">
                  Try adjusting your search or filters to find what you&apos;re looking for.
                </p>
                <a href="/jobs" className="text-primary font-bold mt-6 hover:underline">
                  Clear all filters
                </a>
              </div>
            )}
            
            {/* Pagination Controls */}
            {pagination.totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-2">
                {/* Previous button */}
                {pagination.page > 1 ? (
                  <Link
                    href={buildPageUrl(pagination.page - 1)}
                    className="w-10 h-10 rounded-lg flex items-center justify-center border border-border text-muted hover:border-primary hover:text-primary transition-colors no-underline"
                  >
                    &lt;
                  </Link>
                ) : (
                  <span className="w-10 h-10 rounded-lg flex items-center justify-center border border-border text-gray-300 cursor-not-allowed">
                    &lt;
                  </span>
                )}

                {/* First page + ellipsis */}
                {getVisiblePages()[0] > 1 && (
                  <>
                    <Link
                      href={buildPageUrl(1)}
                      className="w-10 h-10 rounded-lg flex items-center justify-center border border-border text-heading hover:border-primary hover:text-primary transition-colors font-medium no-underline"
                    >
                      1
                    </Link>
                    {getVisiblePages()[0] > 2 && (
                      <span className="w-8 text-center text-muted">...</span>
                    )}
                  </>
                )}

                {/* Page numbers */}
                {getVisiblePages().map((page) => (
                  <Link
                    key={page}
                    href={buildPageUrl(page)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium no-underline transition-colors ${
                      page === pagination.page
                        ? "bg-primary text-white shadow-md"
                        : "border border-border text-heading hover:border-primary hover:text-primary"
                    }`}
                  >
                    {page}
                  </Link>
                ))}

                {/* Last page + ellipsis */}
                {getVisiblePages()[getVisiblePages().length - 1] < pagination.totalPages && (
                  <>
                    {getVisiblePages()[getVisiblePages().length - 1] < pagination.totalPages - 1 && (
                      <span className="w-8 text-center text-muted">...</span>
                    )}
                    <Link
                      href={buildPageUrl(pagination.totalPages)}
                      className="w-10 h-10 rounded-lg flex items-center justify-center border border-border text-heading hover:border-primary hover:text-primary transition-colors font-medium no-underline"
                    >
                      {pagination.totalPages}
                    </Link>
                  </>
                )}

                {/* Next button */}
                {pagination.page < pagination.totalPages ? (
                  <Link
                    href={buildPageUrl(pagination.page + 1)}
                    className="w-10 h-10 rounded-lg flex items-center justify-center border border-border text-muted hover:border-primary hover:text-primary transition-colors no-underline"
                  >
                    &gt;
                  </Link>
                ) : (
                  <span className="w-10 h-10 rounded-lg flex items-center justify-center border border-border text-gray-300 cursor-not-allowed">
                    &gt;
                  </span>
                )}
              </div>
            )}
            
          </div>
        </div>
      </section>
    </main>
  );
}
