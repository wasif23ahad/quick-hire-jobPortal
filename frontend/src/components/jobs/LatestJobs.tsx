import React from "react";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi";
import { LatestJobItem } from "./LatestJobItem";

const latestJobs = [
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris, France",
    type: "Full-Time",
    tags: [
      { name: "Marketing", variant: "marketing" },
      { name: "Design", variant: "design" }
    ]
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Netlify_logo.svg",
    title: "Social Media Assistant",
    company: "Netlify",
    location: "Paris, France",
    type: "Full-Time",
    tags: [
      { name: "Marketing", variant: "marketing" },
      { name: "Design", variant: "design" }
    ]
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Dropbox_logo_2017.svg",
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Francisco, USA",
    type: "Full-Time",
    tags: [
      { name: "Design", variant: "design" },
      { name: "Business", variant: "business" }
    ]
  },
  {
    logo: "https://maze.co/favicon.ico",
    title: "Brand Designer",
    company: "Maze",
    location: "San Francisco, USA",
    type: "Full-Time",
    tags: [
      { name: "Marketing", variant: "marketing" },
      { name: "Design", variant: "design" }
    ]
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/HashiCorp_Terraform_Logo.svg",
    title: "Interactive Developer",
    company: "Terraform",
    location: "Hamburg, Germany",
    type: "Full-Time",
    tags: [
      { name: "Marketing", variant: "marketing" },
      { name: "Design", variant: "design" }
    ]
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Udacity_logo.png",
    title: "Interactive Developer",
    company: "Udacity",
    location: "Hamburg, Germany",
    type: "Full-Time",
    tags: [
      { name: "Marketing", variant: "marketing" },
      { name: "Design", variant: "design" }
    ]
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/02/Packer_Logo.png",
    title: "HR Manager",
    company: "Packer",
    location: "Lucern, Switzerland",
    type: "Full-Time",
    tags: [
      { name: "Marketing", variant: "marketing" },
      { name: "Design", variant: "design" }
    ]
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Webflow_logo.svg",
    title: "HR Manager",
    company: "Webflow",
    location: "Lucern, Switzerland",
    type: "Full-Time",
    tags: [
      { name: "Marketing", variant: "marketing" },
      { name: "Design", variant: "design" }
    ]
  },
];

export const LatestJobs = () => {
  return (
    <section className="py-20 bg-bg-light">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold font-clash text-heading">
            Latest <span className="text-accent-blue">jobs open</span>
          </h2>
          <Link 
            href="/jobs" 
            className="text-primary font-bold flex items-center gap-2 hover:text-primary-dark transition-colors"
          >
            Show all jobs <HiOutlineArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {latestJobs.map((job, index) => (
            <LatestJobItem 
              key={index}
              logo={job.logo}
              title={job.title}
              company={job.company}
              location={job.location}
              type={job.type}
              tags={job.tags}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
