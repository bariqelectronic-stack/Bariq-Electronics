export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { TrustBar } from "@/components/home/trust-bar";
import { CategoryGrid } from "@/components/home/category-grid";
import { FeaturedProducts } from "@/components/home/featured-products";
import { SolutionsSection } from "@/components/home/solutions-section";
import { WhyBariq } from "@/components/home/why-bariq";
import { WholesaleCta } from "@/components/home/wholesale-cta";
import { LearnSection } from "@/components/home/learn-section";
import { Newsletter } from "@/components/home/newsletter";

export const metadata: Metadata = {
  title: {
    absolute: "Bariq Electronics — Professional LCD & LED Display Repair Parts & Equipment",
  },
  description:
    "Supplier of professional LCD and LED display repair parts for technicians and workshops — COFS, LVDS cables, T-CON boards, T-CON programmers, ACF tape, ACF remover, COF cutters, LED/LCD boards and bonding equipment.",
  alternates: {
    canonical: "https://www.bariqelectronics.com",
  },
  openGraph: {
    type: "website",
    url: "https://www.bariqelectronics.com",
    siteName: "Bariq Electronics",
    title: "Bariq Electronics — Professional LCD & LED Display Repair Parts",
    description:
      "Professional LCD and LED display repair parts for technicians — COFS, LVDS cables, T-CON boards, ACF tape, ACF remover, COF cutters and more.",
  },
};

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


