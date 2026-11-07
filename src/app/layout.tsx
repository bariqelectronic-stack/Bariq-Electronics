import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toast";
import { WhatsAppFloating } from "@/components/layout/whatsapp-floating";
import { siteConfig } from "@/lib/config";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});


// Official public profiles only; a WhatsApp link is a contact channel, not a profile.
const sameAsLinks = [
  siteConfig.social.facebook,
  siteConfig.social.instagram,
  siteConfig.social.youtube,
].filter(Boolean);

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.bariqelectronics.com/#organization",
  name: siteConfig.name,
  url: "https://www.bariqelectronics.com",
  logo: "https://www.bariqelectronics.com/bariq-logo.jpg",
  description:
    "Supplier of professional LCD and LED display repair parts, including COFS, LVDS cables, T-CON boards, ACF tape, ACF remover and COF cutters, for technicians and workshops.",
  email: siteConfig.email,
  telephone: `+${siteConfig.whatsappNumber}`,
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: `+${siteConfig.whatsappNumber}`,
      email: siteConfig.email,
      contactType: "customer service",
      url: "https://www.bariqelectronics.com/contact",
      availableLanguage: ["English"],
    },
  ],
  ...(sameAsLinks.length > 0 ? { sameAs: sameAsLinks } : {}),
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.bariqelectronics.com/#website",
  url: "https://www.bariqelectronics.com",
  name: siteConfig.name,
  publisher: {
    "@id": "https://www.bariqelectronics.com/#organization",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.bariqelectronics.com/shop?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export const metadata: Metadata = {
  title: {
    default: "Bariq Electronics — Professional LCD & LED Display Repair Parts",
    template: "%s | Bariq Electronics",
  },
  description:
    "Professional LCD and LED display repair parts — COFS, LVDS cables, LED & LCD boards, T-CON boards, ACF tape, ACF remover, COF cutters, T-CON programmers and bonding head assemblies for display repair technicians.",
  keywords: [
    "LCD repair parts",
    "LED repair parts",
    "T-CON board",
    "LVDS cable",
    "COF repair",
    "ACF tape",
    "ACF remover",
    "ACF remover solution",
    "COF cutter",
    "LED LCD boards",
    "T-CON programmer",
    "display repair parts",
    "display repair technician",
  ],
  authors: [{ name: "Bariq Electronics" }],
  openGraph: {
    type: "website",
    siteName: "Bariq Electronics",
    title: "Bariq Electronics — Professional LCD & LED Display Repair Parts",
    description:
      "Professional LCD and LED display repair parts for technicians — COFS, LVDS cables, T-CON boards, ACF tape, ACF remover, COF cutters and more.",
  },
  metadataBase: new URL("https://www.bariqelectronics.com"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-white antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <Header />
        <main className="flex-1 page-enter">{children}</main>
        <Footer />
        <Toaster /> <WhatsAppFloating />
      </body>
    </html>
  );
}




