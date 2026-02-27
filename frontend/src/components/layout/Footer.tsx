import React from "react";
import Link from "next/link";
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiArrowRight } from "react-icons/fi";

const footerLinks = {
  about: [
    { name: "Companies", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Advice", href: "#" },
    { name: "Privacy Policy", href: "#" },
  ],
  resources: [
    { name: "Help Docs", href: "#" },
    { name: "Guide", href: "#" },
    { name: "Updates", href: "#" },
    { name: "Contact Us", href: "#" },
  ]
};

export const Footer = () => {
  return (
    <footer className="bg-dark-navy text-white pt-20 pb-10">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-primary relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white" />
                </div>
              </div>
              <span className="font-bold text-2xl tracking-tight font-clash">Quick<span className="text-white/70 font-normal">Hire</span></span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Great platform for the job seeker that passionate about startups. Find your dream job easier.
            </p>
          </div>

          {/* About Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 font-clash">About</h4>
            <ul className="space-y-4 text-white/70 text-sm">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 font-clash">Resources</h4>
            <ul className="space-y-4 text-white/70 text-sm">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subscribe Col */}
          <div>
            <h4 className="font-bold text-lg mb-6 font-clash">Get job notifications</h4>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              The latest job news, articles, sent to your inbox weekly.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-white/10 border border-white/20 text-white placeholder:text-white/50 px-4 py-2.5 rounded-lg w-full focus:outline-none focus:border-white transition-colors"
              />
              <button className="bg-primary hover:bg-primary-dark transition-colors px-4 py-2.5 rounded-lg text-white font-bold flex items-center justify-center">
                <FiArrowRight />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            2026 @ QuickHire. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4 text-white/50">
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
              <FiFacebook size={18} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
              <FiInstagram size={18} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
              <FiTwitter size={18} />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
              <FiLinkedin size={18} />
            </a>
          </div>
        </div>
        
      </div>
    </footer>
  );
};
