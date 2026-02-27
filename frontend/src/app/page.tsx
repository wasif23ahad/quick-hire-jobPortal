import { Hero } from "@/components/Hero";
import { CompanyLogos } from "@/components/CompanyLogos";
import { CategoryExplore } from "@/components/CategoryExplore";
import { CTABanner } from "@/components/CTABanner";
import { FeaturedJobs } from "@/components/jobs/FeaturedJobs";
import { LatestJobs } from "@/components/jobs/LatestJobs";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <CompanyLogos />
      <CategoryExplore />
      <CTABanner />
      <FeaturedJobs />
      <LatestJobs />
    </main>
  );
}
