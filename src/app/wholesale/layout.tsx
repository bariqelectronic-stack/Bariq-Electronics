import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wholesale LCD & LED Display Repair Parts",
  description:
    "Wholesale enquiries for LCD and LED display repair parts from Bariq Electronics — COFS, LVDS cables, LED & LCD boards, T-CON boards, ACF tape, ACF remover, COF cutters, and T-CON programmers for workshops and distributors.",
  alternates: {
    canonical: "https://www.bariqelectronics.com/wholesale",
  },
};

export default function WholesaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
