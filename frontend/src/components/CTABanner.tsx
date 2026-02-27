import React from "react";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi";

export const CTABanner = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="bg-primary rounded-3xl overflow-hidden relative flex flex-col lg:flex-row items-center justify-between p-10 lg:p-16">
          
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent-blue opacity-20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          {/* Content */}
          <div className="lg:w-1/2 relative z-10 text-white space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold font-clash leading-tight max-w-lg">
              Start posting<br />jobs today
            </h2>
            <p className="text-white/80 text-lg">
              Start posting jobs for only $10.
            </p>
            <Link 
              href="/admin/create" 
              className="inline-block bg-white text-primary hover:bg-bg-light px-8 py-3 rounded-lg font-bold transition-colors mt-4"
            >
              Sign Up For Free
            </Link>
          </div>

          {/* Image mockup representation */}
          <div className="lg:w-1/2 relative z-10 mt-12 lg:mt-0 flex justify-center lg:justify-end w-full">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-6 rotate-3 border-4 border-white/20">
              <div className="flex items-center gap-3 border-b border-border pb-4 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold">Q</span>
                </div>
                <div>
                  <h4 className="font-bold text-heading">QuickHire Dashboard</h4>
                  <p className="text-xs text-muted">Job Management</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-border rounded-full w-3/4" />
                <div className="h-4 bg-border rounded-full w-1/2" />
                <div className="h-4 bg-border rounded-full w-5/6" />
                <div className="flex justify-between mt-6 pt-4 border-t border-border">
                  <div className="h-8 bg-primary/20 rounded-md w-24" />
                  <div className="h-8 bg-primary rounded-md w-24" />
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
