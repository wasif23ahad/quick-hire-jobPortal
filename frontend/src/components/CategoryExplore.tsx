import React from "react";
import Link from "next/link";
import { 
  FiPenTool, 
  FiBarChart2, 
  FiVolume2, 
  FiDollarSign, 
  FiMonitor, 
  FiCpu, 
  FiBriefcase, 
  FiUsers 
} from "react-icons/fi";
import { HiOutlineArrowRight } from "react-icons/hi";

const categories = [
  { name: "Design", icon: FiPenTool, count: 235 },
  { name: "Sales", icon: FiBarChart2, count: 756 },
  { name: "Marketing", icon: FiVolume2, count: 140, active: true },
  { name: "Finance", icon: FiDollarSign, count: 325 },
  { name: "Technology", icon: FiMonitor, count: 436 },
  { name: "Engineering", icon: FiCpu, count: 542 },
  { name: "Business", icon: FiBriefcase, count: 211 },
  { name: "Human Resources", icon: FiUsers, count: 346 },
];

export const CategoryExplore = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold font-clash text-heading">
            Explore by <span className="text-accent-blue">category</span>
          </h2>
          <Link 
            href="/jobs" 
            className="text-primary font-bold flex items-center gap-2 mt-4 md:mt-0 hover:text-primary-dark transition-colors"
          >
            Show all jobs <HiOutlineArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link 
                href={`/jobs?category=${encodeURIComponent(cat.name)}`}
                key={cat.name}
              >
                <div 
                  className={`border transition-all duration-300 p-8 rounded-xl flex flex-col gap-6 group cursor-pointer h-full
                    ${cat.active 
                      ? 'bg-primary text-white border-primary shadow-xl shadow-primary/20' 
                      : 'bg-white border-border hover:border-primary hover:shadow-lg text-heading'
                    }`}
                >
                  <div className={`text-4xl ${cat.active ? 'text-white' : 'text-primary'}`}>
                    <Icon />
                  </div>
                  
                  <div>
                    <h3 className={`text-2xl font-bold font-clash mb-2 ${cat.active ? 'text-white' : 'text-heading group-hover:text-primary transition-colors'}`}>
                      {cat.name}
                    </h3>
                    <p className={`flex items-center gap-2 ${cat.active ? 'text-white/80' : 'text-muted'}`}>
                      {cat.count} jobs available <HiOutlineArrowRight className={cat.active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 transition-opacity'}/>
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
