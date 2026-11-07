import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Contact Bariq Electronics — LCD & LED Repair Parts Enquiries" },
  description:
    "Contact Bariq Electronics by WhatsApp (03009445230), phone (0300 9445230), email (bariqelectronic@gmail.com), or online enquiry form for LCD and LED display repair parts, LVDS cables, ACF remover, COF cutters, and T-CON boards.",
  alternates: {
    canonical: "https://www.bariqelectronics.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
