import { MetadataRoute } from "next";
import { demoProducts } from "@/lib/demo-products";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://bariqelectronics.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const categoryPages = [
    "microscopes", "microscope-cameras", "soldering-tools", "screwdrivers",
    "pcb-repair", "cleaning-tools", "repair-cables", "lab-tools", "accessories",
  ].map((slug) => ({
    url: `${BASE_URL}/categories/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const productPages = demoProducts.map((p) => ({
    url: `${BASE_URL}/products/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const learnPages = [
    "how-to-choose-a-microscope-for-microsoldering",
    "professional-mobile-repair-bench-setup",
    "essential-tools-for-pcb-repair",
    "microsoldering-equipment-checklist",
    "understanding-microscope-magnification",
    "soldering-tips-guide",
  ].map((slug) => ({
    url: `${BASE_URL}/learn/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const solutionPages = [
    "mobile-phone-repair", "microsoldering", "pcb-repair", "electronics-laboratory",
  ].map((slug) => ({
    url: `${BASE_URL}/solutions/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/shop`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/categories`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/solutions`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/learn`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/wholesale`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/shipping`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/returns`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    ...categoryPages,
    ...productPages,
    ...learnPages,
    ...solutionPages,
  ];
}
