import React from "react";
import { FiSearch, FiMapPin } from "react-icons/fi";

export const Hero = () => {
  return (
    <section className="bg-bg-light relative overflow-hidden py-20 lg:py-32">
      <div className="container mx-auto px-6 max-w-7xl flex flex-col lg:flex-row items-center justify-between">
        
        {/* Left Content */}
        <div className="lg:w-1/2 z-10 flex flex-col gap-6">
          <h1 className="text-5xl lg:text-7xl font-bold font-clash text-heading leading-tight">
            Discover <br/>
            more than <br/>
            <span className="text-primary">5000+ Jobs</span>
          </h1>
          
          <img 
            src="/hero-underline.svg" 
            alt="underline" 
            className="w-48 xl:w-64 -mt-8 ml-2 xl:ml-8 hidden md:block opacity-50 text-accent-blue" 
          />

          <p className="text-body text-lg lg:text-xl font-medium max-w-lg mt-2">
            Great platform for the job seeker that searching for new career heights and passionate about startups.
          </p>

          {/* Search Bar */}
          <div className="bg-white p-3 md:p-4 rounded-xl shadow-lg border border-border flex flex-col md:flex-row gap-3 w-full max-w-2xl mt-4">
            <div className="flex-1 flex items-center px-4 md:border-r border-border gap-3">
              <FiSearch className="text-muted text-xl shrink-0" />
              <input 
                type="text" 
                placeholder="Job title or keyword" 
                className="w-full bg-transparent focus:outline-none text-heading placeholder:text-muted"
              />
            </div>
            
            <div className="flex-1 flex items-center px-4 gap-3">
              <FiMapPin className="text-muted text-xl shrink-0" />
              <input 
                type="text" 
                placeholder="Florence, Italy" 
                className="w-full bg-transparent focus:outline-none text-heading placeholder:text-muted"
              />
            </div>
            
            <button className="bg-primary hover:bg-primary-dark transition-colors text-white px-8 py-3 rounded-lg font-bold">
              Search my job
            </button>
          </div>

          {/* Popular Searches */}
          <div className="text-sm font-medium mt-2">
            <span className="text-body mr-2">Popular :</span>
            <span className="text-heading hover:text-primary cursor-pointer transition-colors">UI Designer</span>,{" "}
            <span className="text-heading hover:text-primary cursor-pointer transition-colors">UX Researcher</span>,{" "}
            <span className="text-heading hover:text-primary cursor-pointer transition-colors">Android</span>,{" "}
            <span className="text-heading hover:text-primary cursor-pointer transition-colors">Admin</span>
          </div>
        </div>

        {/* Right Content - Abstract Image */}
        <div className="lg:w-1/2 mt-16 lg:mt-0 right-0 lg:absolute lg:right-0 lg:top-0 h-full flex justify-end">
          <div className="relative w-full max-w-lg lg:max-w-none lg:w-[800px] aspect-square lg:aspect-auto h-full">
            {/* Using a placeholder gradient pattern since we don't have the explicit Figma assets */}
            <div className="absolute inset-0 bg-linear-to-tr from-primary/10 to-accent-blue/10 rounded-full lg:rounded-none blur-3xl lg:blur-none opacity-50 lg:opacity-100 mix-blend-multiply" />
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
                alt="Happy diverse team working" 
                className="object-cover rounded-2xl shadow-2xl w-full h-[400px] lg:h-[600px] border-8 border-white object-center"
              />
               {/* Decorative dots / abstract shapes */}
               <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent-yellow rounded-full opacity-20 blur-xl" />
               <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary rounded-full opacity-20 blur-xl" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
