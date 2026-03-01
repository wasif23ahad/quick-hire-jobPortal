"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FiTrash2, FiEye, FiPlus } from "react-icons/fi";
import { getJobs, deleteJob } from "@/lib/api";

export const JobTable = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const result = await getJobs({ limit: 100 });
      setJobs(result.jobs);
    } catch (err) {
      setError("Failed to fetch jobs");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job?")) return;

    try {
      await deleteJob(id);
      setJobs(jobs.filter((job) => job.id !== id));
      alert("Job deleted successfully");
    } catch (err) {
      alert("Failed to delete job");
      console.error(err);
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading jobs...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="p-6 border-b border-slate-200 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Manage Job Listings</h2>
        <Link 
          href="/admin/create"
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <FiPlus /> Add New Job
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 uppercase text-xs font-bold tracking-wider">
              <th className="px-6 py-4">Job Title</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4 text-center">Applications</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {jobs.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-slate-400">No jobs found.</td>
              </tr>
            ) : (
              jobs.map((job) => (
                <tr key={job.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-800">{job.title}</div>
                    <div className="text-xs text-slate-400">{job.company}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    <span className="px-2 py-1 bg-slate-100 rounded text-xs font-semibold uppercase">{job.category}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{job.location}</td>
                  <td className="px-6 py-4 text-center text-sm font-bold text-indigo-600">
                    {job._count?.applications || 0}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link 
                        href={`/jobs/${job.id}`}
                        className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                        title="View Job"
                      >
                        <FiEye size={18} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(job.id)}
                        className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                        title="Delete Job"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
