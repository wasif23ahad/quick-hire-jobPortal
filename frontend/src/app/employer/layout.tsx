"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { EmployerSidebar } from "@/components/employer/EmployerSidebar";
import { EmployerTopBar } from "@/components/employer/EmployerTopBar";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Exclude public pages like login/register from needing token
    if (pathname === "/employer" || pathname === "/employer/login" || pathname === "/employer/register") {
      setIsLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/employer/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const API_URL = rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl.replace(/\/$/, '')}/api`;
        
        const res = await fetch(`${API_URL}/auth/me`, {
           headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) throw new Error("Unauthorized");
        
        const data = await res.json();
        if (data.data.role !== "EMPLOYER") {
          throw new Error("Invalid Role");
        }
        setUser(data.data);
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/employer/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [router, pathname]);

  if (pathname === "/employer" || pathname === "/employer/login" || pathname === "/employer/register") {
    return <>{children}</>;
  }

  if (isLoading || !user) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", background: "#F8F8FD", fontFamily: "var(--font-epilogue)", color: "#7C8493" }}>
        Loading employer portal...
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#FFFFFF" }}>
      <EmployerSidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
        <EmployerTopBar companyName={user.name} />
        {/* The child page provides its own <main> scrolling area or fills the flex child */}
        {children}
      </div>
    </div>
  );
}
