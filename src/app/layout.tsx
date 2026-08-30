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
    default: "Bariq Electronics — Professional LCD & LED Display Repair Parts",
    template: "%s | Bariq Electronics",
  },
  description:
    "Professional LCD and LED display repair parts — COFS, LVDS, LED & LCD boards, T-CON, ACF tape, ACF remover, COF cutters, T-CON programmers and more. Built for display repair technicians.",
  keywords: [
    "LCD repair parts",
    "LED repair parts",
    "T-CON board",
    "LVDS cable",
    "COF repair",
    "ACF tape",
    "ACF remover",
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
      "Professional LCD and LED display repair parts for technicians — COFS, LVDS, T-CON, ACF tape, COF cutters and more.",
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
