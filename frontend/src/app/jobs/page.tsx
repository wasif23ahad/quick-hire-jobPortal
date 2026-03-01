import React from "react";
import { SearchBar } from "@/components/jobs/SearchBar";
import { JobFilter } from "@/components/jobs/JobFilter";
import { JobCard } from "@/components/jobs/JobCard";
import { fetchJobs } from "@/lib/api";

// This is a Server Component, so we can fetch data directly here
export default async function JobsPage({
  searchParams,
}: {
  // searchParams is provided by Next.js automatically
  searchParams: Promise<{ search?: string; category?: string; location?: string }> | { search?: string; category?: string; location?: string };
}) {
  // Await search params in next 15 pattern:
  const params = await searchParams;
  
  const jobs = await fetchJobs({
    search: params?.search,
    category: params?.category,
    location: params?.location,
  });

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
              Find your next career at companies like Nike, GoDaddy, Square, and more.
            </p>
          </div>
          
          {/* Search Bar Component */}
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
                Showing <span className="font-bold text-heading">{jobs.length}</span> results
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
                      // Map the string tags to variant props matching our Figma colors
                      let variant = "default";
                      const t = tag.toLowerCase();
                      if (t.includes('design')) variant = "design";
                      else if (t.includes('market')) variant = "marketing";
                      else if (t.includes('sale')) variant = "sales";
                      else if (t.includes('finance')) variant = "finance";
                      else if (t.includes('tech')) variant = "technology";
                      else if (t.includes('engineer')) variant = "engineering";
                      else if (t.includes('business')) variant = "business";
                      else if (t.includes('hr')) variant = "hr";
                      
                      return { name: tag, variant };
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
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <a href="/jobs" className="text-primary font-bold mt-6 hover:underline">
                  Clear all filters
                </a>
              </div>
            )}
            
            {/* Pagination Placeholder (Mock for UI) */}
            {jobs.length > 0 && (
              <div className="mt-12 flex justify-center gap-2">
                <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-border text-muted hover:border-primary hover:text-primary transition-colors">
                  &lt;
                </button>
                <button className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary text-white font-bold shadow-md">
                  1
                </button>
                <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-border text-heading hover:border-primary hover:text-primary transition-colors font-medium">
                  2
                </button>
                <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-border text-heading hover:border-primary hover:text-primary transition-colors font-medium">
                  3
                </button>
                <button className="w-10 h-10 rounded-lg flex items-center justify-center border border-border text-muted hover:border-primary hover:text-primary transition-colors">
                  &gt;
                </button>
              </div>
            )}
            
          </div>
        </div>
      </section>
    </main>
  );
}
