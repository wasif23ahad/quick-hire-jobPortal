// Base API URL from environment variables, fallback to localhost for development
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  type: string;
  salary: string | null;
  companyLogo: string | null;
  tags: string[];
  createdAt: string;
  _count?: {
    applications: number;
  };
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface JobsResponse {
  success: boolean;
  data: Job[];
  pagination: PaginationInfo;
  message: string;
}

export const fetchJobs = async (params?: {
  search?: string;
  category?: string;
  location?: string;
  page?: number;
  limit?: number;
}): Promise<{ jobs: Job[]; pagination: PaginationInfo }> => {
  try {
    const url = new URL(`${API_URL}/jobs`);
    
    if (params) {
      if (params.search) url.searchParams.append("search", params.search);
      if (params.category) url.searchParams.append("category", params.category);
      if (params.location) url.searchParams.append("location", params.location);
      if (params.page) url.searchParams.append("page", String(params.page));
      if (params.limit) url.searchParams.append("limit", String(params.limit));
    }

    const res = await fetch(url.toString(), {
      next: { revalidate: 60 } 
    });
    
    if (!res.ok) throw new Error("Failed to fetch jobs");
    
    const data: JobsResponse = await res.json();
    return { jobs: data.data, pagination: data.pagination };
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return { jobs: [], pagination: { page: 1, limit: 12, total: 0, totalPages: 0 } };
  }
};

export const fetchJobById = async (id: string): Promise<Job | null> => {
  try {
    const res = await fetch(`${API_URL}/jobs/${id}`, {
      next: { revalidate: 60 }
    });
    
    if (!res.ok) throw new Error("Failed to fetch job");
    
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    return null;
  }
};

export const getJobs = fetchJobs;
export const getJobById = fetchJobById;

export const createJob = async (jobData: any): Promise<Job> => {
  const res = await fetch(`${API_URL}/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(jobData),
  });
  if (!res.ok) throw new Error("Failed to create job");
  const data = await res.json();
  return data.data;
};

export const deleteJob = async (id: string): Promise<void> => {
  const res = await fetch(`${API_URL}/jobs/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete job");
};

export const submitApplication = async (applicationData: any): Promise<any> => {
  const res = await fetch(`${API_URL}/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(applicationData),
  });
  if (!res.ok) throw new Error("Failed to submit application");
  const data = await res.json();
  return data.data;
};
