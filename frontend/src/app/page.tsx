import { Hero } from "@/components/Hero";
import { CompanyLogos } from "@/components/CompanyLogos";
import { CategoryExplore } from "@/components/CategoryExplore";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <CompanyLogos />
      <CategoryExplore />
    </main>
  );
}
