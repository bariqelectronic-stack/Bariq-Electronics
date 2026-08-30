import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Terms of Service | Bariq Electronics",
  description: "Terms and conditions for purchasing from Bariq Electronics.",
};

const LAST_UPDATED = "August 1, 2025";

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="border-b border-[#E5E5E5]">
        <div className="container-site py-6">
          <nav className="text-xs text-[#9E9E9E] mb-2 flex items-center gap-1.5">
            <Link href="/" className="hover:text-[#0A0A0A]">Home</Link>
            <span>/</span>
            <span>Terms of Service</span>
          </nav>
          <h1 className="text-2xl font-black text-[#0A0A0A]">Terms of Service</h1>
          <p className="text-sm text-[#9E9E9E] mt-1">Last updated: {LAST_UPDATED}</p>
        </div>
      </div>

      <div className="container-site py-10 max-w-3xl">
        <div className="prose">
          <p>
            Please read these Terms of Service (&ldquo;Terms&rdquo;) carefully before using the {siteConfig.name}{" "}
            website. By accessing or using our website, you agree to be bound by these Terms. If you disagree with any
            part, please do not use our services.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By placing an order or creating an account on {siteConfig.name}, you confirm that you are at least 18
            years of age and have the legal capacity to enter into a binding agreement. If you are placing an order on
            behalf of a business, you represent that you have authority to bind that business.
          </p>

          <h2>2. Products and Pricing</h2>
          <ul>
            <li>
              All product descriptions, specifications, and images are provided for informational purposes. We make
              every effort to ensure accuracy, but we do not warrant that descriptions are complete or error-free.
            </li>
            <li>
              Prices are quoted in Pakistani Rupees (PKR) unless otherwise specified. Prices are subject to change
              without notice. The price at the time of order confirmation is the price you pay.
            </li>
            <li>
              We reserve the right to limit quantities, refuse orders, or discontinue products at any time.
            </li>
            <li>
              Product availability is not guaranteed. If a product becomes unavailable after your order, we will
              notify you and offer a full refund or alternative.
            </li>
          </ul>

          <h2>3. Orders and Payment</h2>
          <ul>
            <li>
              An order confirmation email constitutes acknowledgement of your order, not acceptance. We reserve the
              right to cancel any order at our discretion.
            </li>
            <li>
              Payment is required before dispatch. We accept Bank Transfer, EasyPaisa, JazzCash, and Cash on Delivery
              (COD) for eligible orders and areas.
            </li>
            <li>
              For wholesale and large orders, a deposit may be required. Terms will be agreed in writing before
              processing.
            </li>
            <li>
              If a payment is declined or disputed, we reserve the right to cancel your order and may restrict future
              purchases.
            </li>
          </ul>

          <h2>4. Shipping</h2>
          <p>
            Shipping terms, estimated delivery times, and charges are detailed in our{" "}
            <Link href="/shipping">Shipping Policy</Link>. We are not responsible for delays caused by couriers, customs,
            or circumstances beyond our control. Risk of loss passes to you upon delivery to the courier.
          </p>

          <h2>5. Returns and Refunds</h2>
          <p>
            Our return and refund conditions are detailed in our{" "}
            <Link href="/returns">Returns Policy</Link>. By placing an order, you agree to those terms.
          </p>

          <h2>6. Warranty</h2>
          <p>
            Warranty terms vary by product and manufacturer. Where applicable, warranty details are stated on the
            product page. Warranty does not cover damage from misuse, accidental damage, or unauthorized repair.
            Claims must be submitted within the stated warranty period with proof of purchase.
          </p>

          <h2>7. Intellectual Property</h2>
          <p>
            All content on this website — including text, images, logos, and design — is the property of{" "}
            {siteConfig.name} or its content suppliers and is protected under applicable intellectual property laws.
            You may not reproduce, distribute, or create derivative works without our express written permission.
          </p>

          <h2>8. User Accounts</h2>
          <ul>
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li>
              You are responsible for all activities that occur under your account. Notify us immediately of any
              unauthorized use.
            </li>
            <li>
              We reserve the right to suspend or terminate accounts that violate these Terms or engage in fraudulent
              activity.
            </li>
          </ul>

          <h2>9. Prohibited Uses</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the website for any unlawful purpose or in violation of any regulations.</li>
            <li>Attempt to gain unauthorized access to any part of the website or its systems.</li>
            <li>Submit false, misleading, or fraudulent orders or information.</li>
            <li>Use automated tools to scrape, crawl, or harvest data from the website without permission.</li>
            <li>Interfere with the proper functioning of the website.</li>
          </ul>

          <h2>10. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by applicable law, {siteConfig.name} shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages, including loss of profits, data, or business
            opportunities, arising out of or in connection with your use of our services, even if we have been advised
            of the possibility of such damages.
          </p>
          <p>
            Our total liability to you for any claim arising out of or in connection with these Terms or your use of
            our services shall not exceed the amount paid by you for the specific order giving rise to the claim.
          </p>

          <h2>11. Disclaimer of Warranties</h2>
          <p>
            Our website and services are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis
            without warranties of any kind, either express or implied, including merchantability, fitness for a
            particular purpose, or non-infringement. We do not warrant that the website will be uninterrupted,
            error-free, or free of viruses.
          </p>

          <h2>12. Governing Law</h2>
          <p>
            These Terms are governed by and construed in accordance with the laws of Pakistan. Any disputes arising
            under these Terms shall be subject to the exclusive jurisdiction of the courts of Karachi, Sindh, Pakistan.
          </p>

          <h2>13. Changes to Terms</h2>
          <p>
            We reserve the right to update these Terms at any time. Changes are effective immediately upon posting.
            Continued use of our services after any changes constitutes your acceptance of the new Terms.
          </p>

          <h2>14. Contact Us</h2>
          <p>For questions about these Terms, please contact us:</p>
          <ul>
            <li>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </li>
            <li>
              <strong>Phone/WhatsApp:</strong> {siteConfig.phone}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
