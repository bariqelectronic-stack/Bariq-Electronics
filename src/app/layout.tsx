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

export const metadata: Metadata = {
  title: {
    default: "Bariq Electronics — Professional Repair & Microsoldering Tools",
    template: "%s | Bariq Electronics",
  },
  description:
    "Professional equipment for mobile phone repair, microsoldering, PCB inspection and electronics workshops. Shop microscopes, soldering tools, precision screwdrivers and more.",
  keywords: [
    "mobile phone repair tools",
    "microsoldering equipment",
    "PCB repair tools",
    "microscopes for repair",
    "soldering tools",
    "precision screwdrivers",
    "electronics workshop tools",
    "repair accessories",
  ],
  authors: [{ name: "Bariq Electronics" }],
  openGraph: {
    type: "website",
    siteName: "Bariq Electronics",
    title: "Bariq Electronics — Professional Repair & Microsoldering Tools",
    description:
      "Professional equipment for mobile phone repair, microsoldering, PCB inspection and electronics workshops.",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://bariqelectronics.com"),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col bg-white antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
