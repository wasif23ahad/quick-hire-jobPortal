import React from "react";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi";
import { JobCard } from "./JobCard";

// Mock data based on the seed data we created
const featuredJobs = [
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    type: "Full-Time",
    title: "Email Marketing",
    company: "Revolut",
    location: "Madrid, Spain",
    description: "Revolut is looking for an Email Marketing specialist to help drive customer engagement and retention...",
    tags: [
      { name: "Marketing", variant: "marketing" },
      { name: "Design", variant: "design" }
    ]
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Dropbox_logo_2017.svg",
    type: "Full-Time",
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Francisco, US",
    description: "Dropbox is looking for a Brand Designer to help the team maintain and evolve our visual identity...",
    tags: [
      { name: "Design", variant: "design" },
      { name: "Business", variant: "business" }
    ]
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
    type: "Full-Time",
    title: "Email Marketing",
    company: "Pitch",
    location: "Berlin, Germany",
    description: "Pitch is looking for a Customer Email Marketing specialist who can create engaging email campaigns...",
    tags: [
      { name: "Marketing", variant: "marketing" }
    ]
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c2/Blinkist_Logo.png",
    type: "Full-Time",
    title: "Visual Designer",
    company: "Blinkist",
    location: "Granada, Spain",
    description: "Blinkist is seeking a Visual Designer to join our creative team. You'll create stunning visual content...",
    tags: [
      { name: "Design", variant: "design" }
    ]
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2a/ClassPass_logo.svg",
    type: "Full-Time",
    title: "Product Designer",
    company: "ClassPass",
    location: "Manchester, UK",
    description: "ClassPass is looking for a Product Designer to help us create delightful fitness booking experiences...",
    tags: [
      { name: "Marketing", variant: "marketing" },
      { name: "Design", variant: "design" }
    ]
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg",
    type: "Full-Time",
    title: "Lead Designer",
    company: "Canva",
    location: "Ontario, Canada",
    description: "Canva is looking for a Lead Designer to help develop next-generation design features. You'll lead a team...",
    tags: [
      { name: "Design", variant: "design" },
      { name: "Business", variant: "business" }
    ]
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/f6/GoDaddy_logo.svg",
    type: "Full-Time",
    title: "Brand Strategist",
    company: "GoDaddy",
    location: "Marseille, France",
    description: "GoDaddy is seeking a Brand Strategist to help define and execute our brand positioning...",
    tags: [
      { name: "Marketing", variant: "marketing" }
    ]
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg",
    type: "Full-Time",
    title: "Data Analyst",
    company: "Twitter",
    location: "San Diego, US",
    description: "Twitter is looking for a Data Analyst to help teams make data-driven decisions. You'll analyze metrics...",
    tags: [
      { name: "Technology", variant: "technology" }
    ]
  },
];

export const FeaturedJobs = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold font-clash text-heading">
            Featured <span className="text-accent-blue">jobs</span>
          </h2>
          <Link 
            href="/jobs" 
            className="text-primary font-bold flex items-center gap-2 hover:text-primary-dark transition-colors"
          >
            Show all jobs <HiOutlineArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredJobs.map((job, index) => (
            <JobCard 
              key={index}
              logo={job.logo}
              type={job.type}
              title={job.title}
              company={job.company}
              location={job.location}
              description={job.description}
              tags={job.tags}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
