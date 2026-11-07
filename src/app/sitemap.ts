import { MetadataRoute } from "next";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { getCategories } from "@/app/actions/admin";

const BASE_URL = "https://www.bariqelectronics.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dbCategories = await getCategories();
  const categoryPages = dbCategories.map((c) => ({
    url: `${BASE_URL}/categories/${c.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const supabase = createServerSupabaseClient();
  const { data: dbProducts } = await supabase
    .from("products")
    .select("slug, updated_at")
    .eq("status", "published");

  const productPages = (dbProducts ?? []).map((p) => ({
    url: `${BASE_URL}/products/${p.slug}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const learnPages = [
    "how-to-choose-t-con-board",
    "lcd-led-display-repair-bench-setup",
    "essential-parts-cof-acf-repair",
    "understanding-lvds-cables",
    "t-con-programming-guide",
    "acf-tape-application-guide",
  ].map((slug) => ({
    url: `${BASE_URL}/learn/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const solutionPages = [
    "lcd-panel-repair", "led-display-repair", "cof-acf-repair", "display-board-repair",
  ].map((slug) => ({
    url: `${BASE_URL}/solutions/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    { url: BASE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/shop`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/categories`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/solutions`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/learn`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/wholesale`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/faq`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/shipping`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/returns`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/terms`, changeFrequency: "yearly", priority: 0.2 },
    ...categoryPages,
    ...productPages,
    ...learnPages,
    ...solutionPages,
  ];
}
