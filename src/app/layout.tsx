import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toast";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://bariqelectronics.com";

const BUSINESS_NAME = "Bariq Electronics";

const BUSINESS_DESCRIPTION =
  "Bariq Electronics is a Lahore, Pakistan electronics business specializing in LCD and LED display repair parts, TV repair components, panel repair equipment and related electronics products.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Bariq Electronics Lahore | LCD & LED Repair Products",
    template: "%s | Bariq Electronics",
  },

  description: BUSINESS_DESCRIPTION,

  keywords: [
    "Bariq Electronics",
    "Bariq Electronics Lahore",
    "LCD repair parts Lahore",
    "LED repair parts Lahore",
    "TV repair parts Lahore",
    "LED panel repair Lahore",
    "LCD panel repair Lahore",
    "display repair Lahore",
    "Hall Road electronics",
  ],

  authors: [{ name: BUSINESS_NAME }],
  creator: BUSINESS_NAME,
  publisher: BUSINESS_NAME,

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: BUSINESS_NAME,
    locale: "en_PK",
    title: "Bariq Electronics Lahore | LCD & LED Repair Products",
    description: BUSINESS_DESCRIPTION,
  },

  twitter: {
    card: "summary_large_image",
    title: "Bariq Electronics Lahore | LCD & LED Repair Products",
    description: BUSINESS_DESCRIPTION,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: BUSINESS_NAME,
  url: SITE_URL,
  description: BUSINESS_DESCRIPTION,
  telephone: "03009445230",
  email: "bariqelectronic@gmail.com",

  areaServed: {
    "@type": "City",
    name: "Lahore",
    addressCountry: "PK",
  },

  contactPoint: {
    "@type": "ContactPoint",
    telephone: "03009445230",
    contactType: "customer service",
    areaServed: "PK",
    availableLanguage: ["en", "ur"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>

      <body className="min-h-screen flex flex-col bg-white antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}