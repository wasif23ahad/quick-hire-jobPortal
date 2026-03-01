import React from "react";
import { CreateJobForm } from "@/components/admin/CreateJobForm";

export default function CreateJobPage() {
  return (
    <main className="min-h-screen bg-[#F8F8FD] py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-[#25324B] mb-2">Create New Job</h1>
          <p className="text-slate-500">Fill in the details below to post a new job opportunity.</p>
        </div>

        <CreateJobForm />
      </div>
    </main>
  );
}
