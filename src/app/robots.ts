import { MetadataRoute } from "next";

const BASE_URL = "https://www.bariqelectronics.com";

// Private and low-value paths only. "/admin" and "/account" are prefixes, so they also
// cover "/admin-login" and the bare "/account" page. "/compare" lists demo placeholders.
const DISALLOWED_PATHS = [
  "/admin",
  "/api/",
  "/account",
  "/cart",
  "/checkout",
  "/compare",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOWED_PATHS,
      },
      // A crawler follows only its most specific group, so named groups repeat the same paths.
      {
        userAgent: ["Googlebot", "Bingbot", "OAI-SearchBot", "PerplexityBot"],
        allow: "/",
        disallow: DISALLOWED_PATHS,
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
