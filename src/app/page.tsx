import { Hero } from "@/components/home/hero";
import { TrustBar } from "@/components/home/trust-bar";
import { CategoryGrid } from "@/components/home/category-grid";
import { FeaturedProducts } from "@/components/home/featured-products";
import { SolutionsSection } from "@/components/home/solutions-section";
import { WhyBariq } from "@/components/home/why-bariq";
import { WholesaleCta } from "@/components/home/wholesale-cta";
import { LearnSection } from "@/components/home/learn-section";
import { Newsletter } from "@/components/home/newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <CategoryGrid />
            <FeaturedProducts />
      <SolutionsSection />
      <WhyBariq />
      <WholesaleCta />
      <LearnSection />
      <Newsletter />
    </>
  );
}
