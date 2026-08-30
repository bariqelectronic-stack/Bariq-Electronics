import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { siteConfig, getWhatsAppLink } from "@/lib/config";

export const metadata: Metadata = {
  title: "Privacy Policy | Bariq Electronics",
  description: "How Bariq Electronics collects, uses, and protects your personal information.",
};

const LAST_UPDATED = "August 1, 2025";

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="border-b border-[#E5E5E5]">
        <div className="container-site py-6">
          <nav className="text-xs text-[#9E9E9E] mb-2 flex items-center gap-1.5">
            <Link href="/" className="hover:text-[#0A0A0A]">Home</Link>
            <span>/</span>
            <span>Privacy Policy</span>
          </nav>
          <h1 className="text-2xl font-black text-[#0A0A0A]">Privacy Policy</h1>
          <p className="text-sm text-[#9E9E9E] mt-1">Last updated: {LAST_UPDATED}</p>
        </div>
      </div>

      <div className="container-site py-10 max-w-3xl">
        <div className="prose">
          <p>
            At <strong>{siteConfig.name}</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;), we are
            committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you visit our website or make a purchase.
          </p>

          <h2>1. Information We Collect</h2>
          <h3>Information You Provide</h3>
          <ul>
            <li>
              <strong>Account information:</strong> Name, email address, phone number, and password when you create an
              account.
            </li>
            <li>
              <strong>Order information:</strong> Billing and shipping address, payment details, and purchase history.
            </li>
            <li>
              <strong>Communication:</strong> Messages you send via our contact form, WhatsApp, or email.
            </li>
            <li>
              <strong>Wholesale enquiries:</strong> Business name, contact details, and purchase intentions for B2B
              leads.
            </li>
          </ul>

          <h3>Information Collected Automatically</h3>
          <ul>
            <li>
              <strong>Usage data:</strong> Pages visited, time spent, referring URLs, and browser/device information.
            </li>
            <li>
              <strong>Cookies:</strong> Session cookies for cart functionality, and optional analytics cookies (see
              section 5).
            </li>
            <li>
              <strong>IP address:</strong> For fraud prevention and security purposes.
            </li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Process and fulfil your orders and send order confirmations and shipping updates.</li>
            <li>Respond to your enquiries and provide customer support.</li>
            <li>Send transactional emails (order receipts, shipping notifications, password resets).</li>
            <li>Improve our website and product offerings based on usage patterns.</li>
            <li>Prevent fraud and ensure the security of our platform.</li>
            <li>
              Send marketing communications, <em>only with your explicit consent</em>.
            </li>
            <li>Comply with legal obligations under Pakistani law.</li>
          </ul>

          <h2>3. Sharing Your Information</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share your information
            with:
          </p>
          <ul>
            <li>
              <strong>Shipping/courier partners</strong> (e.g., TCS, Leopards) to fulfil your delivery — only the
              information required for delivery is shared.
            </li>
            <li>
              <strong>Payment processors</strong> to handle transactions securely. We do not store full card details on
              our servers.
            </li>
            <li>
              <strong>Service providers</strong> who assist in operating our website (e.g., hosting, email delivery),
              bound by confidentiality agreements.
            </li>
            <li>
              <strong>Law enforcement or regulators</strong> when required by applicable law or to protect our rights.
            </li>
          </ul>

          <h2>4. Data Retention</h2>
          <p>
            We retain your personal information for as long as your account is active or as needed to provide services.
            Order records are retained for a minimum of 5 years for accounting and legal purposes. You may request
            deletion of your account at any time (see section 7).
          </p>

          <h2>5. Cookies</h2>
          <p>We use the following types of cookies:</p>
          <ul>
            <li>
              <strong>Essential cookies:</strong> Required for shopping cart, authentication sessions, and security.
              These cannot be disabled.
            </li>
            <li>
              <strong>Analytics cookies:</strong> Help us understand how visitors use the site (e.g., Google Analytics).
              These are optional and can be declined.
            </li>
          </ul>
          <p>You can control cookies through your browser settings. Disabling essential cookies may affect site functionality.</p>

          <h2>6. Security</h2>
          <p>
            We implement industry-standard security measures including SSL/TLS encryption, secure password hashing, and
            access controls. However, no method of transmission over the internet is 100% secure, and we cannot
            guarantee absolute security.
          </p>

          <h2>7. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>
              <strong>Access:</strong> Request a copy of the personal information we hold about you.
            </li>
            <li>
              <strong>Correction:</strong> Ask us to correct inaccurate or incomplete information.
            </li>
            <li>
              <strong>Deletion:</strong> Request deletion of your account and associated personal data, subject to legal
              retention obligations.
            </li>
            <li>
              <strong>Opt-out:</strong> Unsubscribe from marketing emails at any time via the unsubscribe link.
            </li>
          </ul>
          <p>
            To exercise these rights, contact us at{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
          </p>

          <h2>8. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites (e.g., courier tracking, payment gateways). We are
            not responsible for the privacy practices of those sites. We encourage you to review their privacy policies
            before providing any personal information.
          </p>

          <h2>9. Children&rsquo;s Privacy</h2>
          <p>
            Our services are not directed to individuals under the age of 18. We do not knowingly collect personal
            information from children. If you believe a child has provided us with their information, please contact us
            immediately.
          </p>

          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated
            &ldquo;Last updated&rdquo; date. Continued use of our website after changes constitutes acceptance of the
            revised policy.
          </p>

          <h2>11. Contact Us</h2>
          <p>If you have questions or concerns about this Privacy Policy, please contact us:</p>
          <ul>
            <li>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </li>
            <li>
              <strong>Phone:</strong> {siteConfig.phone}
            </li>
            <li>
              <strong>WhatsApp:</strong>{" "}
              <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">
                {siteConfig.whatsapp}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
