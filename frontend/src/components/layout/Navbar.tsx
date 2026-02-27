import React from "react";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";

export const Navbar = () => {
  return (
    <nav className="bg-bg-light py-4 xl:py-6 border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-white relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary" />
            </div>
          </div>
          <span className="font-bold text-2xl tracking-tight text-heading font-clash">Quick<span className="text-primary font-normal">Hire</span></span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8 font-medium text-body">
          <Link href="/jobs" className="hover:text-primary transition-colors">Find Jobs</Link>
          <Link href="#" className="hover:text-primary transition-colors">Browse Companies</Link>
        </div>

        {/* Auth Buttons Desktop */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="#" className="font-bold text-primary hover:text-primary-dark transition-colors px-4 py-2">
            Login
          </Link>
          <div className="h-6 w-px bg-border" />
          <Link href="/admin/create" className="font-bold text-white bg-primary hover:bg-primary-dark transition-colors px-6 py-3 rounded-lg">
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-heading text-2xl p-2">
          <FiMenu />
        </button>
      </div>
    </nav>
  );
};
