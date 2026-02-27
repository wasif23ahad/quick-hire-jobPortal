import React from "react";

const companies = [
  { name: "Vodafone", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Vodafone_icon.svg" },
  { name: "Intel", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Intel-logo.svg" },
  { name: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png" },
  { name: "AMD", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7c/AMD_Logo.svg" },
  { name: "Talkit", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" }, // Proxy logo since Talkit is fictional
];

export const CompanyLogos = () => {
  return (
    <section className="py-12 bg-white border-y border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <p className="text-muted text-base font-medium mb-8">
          Companies we helped grow
        </p>
        
        <div className="flex flex-wrap justify-between items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {companies.map((company) => (
            <div key={company.name} className="flex items-center justify-center h-12 w-32 relative">
              <img 
                src={company.logo} 
                alt={`${company.name} logo`} 
                className="max-h-8 max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
