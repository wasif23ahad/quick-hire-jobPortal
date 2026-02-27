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

export interface JobsResponse {
  success: boolean;
  data: Job[];
  message: string;
}

export const fetchJobs = async (params?: {
  search?: string;
  category?: string;
  location?: string;
}): Promise<Job[]> => {
  try {
    const url = new URL(`${API_URL}/jobs`);
    
    if (params) {
      if (params.search) url.searchParams.append("search", params.search);
      if (params.category) url.searchParams.append("category", params.category);
      if (params.location) url.searchParams.append("location", params.location);
    }

    const res = await fetch(url.toString(), {
      // Revalidate every 60 seconds (ISR) or force dynamic based on requirements
      next: { revalidate: 60 } 
    });
    
    if (!res.ok) throw new Error("Failed to fetch jobs");
    
    const data: JobsResponse = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
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
