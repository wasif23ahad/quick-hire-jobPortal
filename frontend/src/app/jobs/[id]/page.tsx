import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FiMapPin, FiBriefcase, FiCalendar, FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import { fetchJobById } from "@/lib/api";
import { ApplicationForm } from "@/components/jobs/ApplicationForm";
import { Badge } from "@/components/ui/Badge";

// Helper to determine badge variant based on tag name
const getVariant = (tag: string) => {
  const t = tag.toLowerCase();
  if (t.includes('design')) return "design";
  if (t.includes('market')) return "marketing";
  if (t.includes('sale')) return "sales";
  if (t.includes('finance')) return "finance";
  if (t.includes('tech')) return "technology";
  if (t.includes('engineer')) return "engineering";
  if (t.includes('business')) return "business";
  if (t.includes('hr')) return "hr";
  return "default";
};

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  // Await params in next 15 pattern:
  const resolvedParams = await params;
  
  const job = await fetchJobById(resolvedParams.id);

  if (!job) {
    notFound();
  }

  // Format date
  const postedDate = new Date(job.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  return (
    <main className="min-h-screen bg-bg-light pb-20">
      {/* Header Section */}
      <section className="bg-white border-b border-border pt-8 pb-12">
        <div className="container mx-auto px-6 max-w-5xl">
          <Link href="/jobs" className="inline-flex items-center gap-2 text-muted hover:text-primary transition-colors font-medium mb-8">
            <FiArrowLeft /> Back to Jobs
          </Link>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-white border border-border rounded-xl p-3 shrink-0 flex items-center justify-center">
                <img 
                  src={job.companyLogo || "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"} 
                  alt={`${job.company} logo`} 
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-clash text-heading mb-3">
                  {job.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-muted font-medium mb-4">
                  <span className="text-heading font-bold">{job.company}</span>
                  <div className="w-1 h-1 bg-muted rounded-full"></div>
                  <span className="flex items-center gap-1.5"><FiMapPin className="text-lg" /> {job.location}</span>
                  <div className="w-1 h-1 bg-muted rounded-full"></div>
                  <span className="flex items-center gap-1.5"><FiBriefcase className="text-lg" /> {job.type}</span>
                  {job.salary && (
                    <>
                      <div className="w-1 h-1 bg-muted rounded-full"></div>
                      <span>{job.salary}</span>
                    </>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="text-primary bg-primary/10 px-3 py-1 rounded-sm text-sm font-bold border border-primary/20">
                    {job.type}
                  </span>
                  {job.tags.map((tag) => (
                    <Badge key={tag} variant={getVariant(tag) as any}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 min-w-[200px]">
              <a 
                href="#apply-form" 
                className="bg-primary hover:bg-primary-dark transition-colors text-white text-center px-8 py-3 rounded-lg font-bold"
              >
                Apply Now
              </a>
              <p className="text-sm text-muted text-center flex items-center justify-center gap-2">
                <FiCalendar /> Posted {postedDate}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container mx-auto px-6 max-w-5xl pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column (Job Description) */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h3 className="text-2xl font-bold font-clash text-heading mb-4">Description</h3>
              <div className="text-body leading-relaxed space-y-4 whitespace-pre-wrap">
                {job.description}
              </div>
            </div>

            {/* Application Form Component */}
            <ApplicationForm jobId={job.id} />
          </div>

          {/* Right Column (Company & Job Overview) */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-border p-6">
              <h3 className="font-bold text-lg font-clash text-heading mb-6">About this role</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-border/50">
                  <span className="text-muted">Apply Before</span>
                  <span className="font-medium text-heading">Rolling</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border/50">
                  <span className="text-muted">Job Posted On</span>
                  <span className="font-medium text-heading">{postedDate}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border/50">
                  <span className="text-muted">Job Type</span>
                  <span className="font-medium text-heading">{job.type}</span>
                </div>
                {job.salary && (
                  <div className="flex justify-between items-center py-3 border-b border-border/50">
                    <span className="text-muted">Salary</span>
                    <span className="font-medium text-heading">{job.salary}</span>
                  </div>
                )}
                <div className="flex justify-between items-center py-3">
                  <span className="text-muted">Category</span>
                  <span className="font-medium text-heading">{job.category}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-border p-6">
              <h3 className="font-bold text-lg font-clash text-heading mb-4">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {job.tags.map(tag => (
                   <Badge key={tag} variant="default" className="text-xs">
                     {tag}
                   </Badge>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
