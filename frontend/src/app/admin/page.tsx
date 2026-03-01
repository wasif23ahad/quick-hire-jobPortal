import React from "react";
import { JobTable } from "@/components/admin/JobTable";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#F8F8FD] py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-[#25324B] mb-2">Admin Dashboard</h1>
          <p className="text-slate-500">Manage your job listings and view candidate applications.</p>
        </div>

        <JobTable />
      </div>
    </main>
  );
}
