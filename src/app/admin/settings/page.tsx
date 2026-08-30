import React from "react";
import { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Settings | Admin",
};

export default function AdminSettingsPage() {
  const settings = [
    { group: "Business", items: [
      { key: "company_name", label: "Company Name", value: siteConfig.name, type: "text" },
      { key: "email", label: "Email", value: siteConfig.email, type: "email" },
      { key: "phone", label: "Phone", value: siteConfig.phone, type: "text" },
      { key: "whatsapp", label: "WhatsApp", value: siteConfig.whatsapp, type: "text" },
      { key: "currency", label: "Currency", value: siteConfig.currency, type: "text" },
    ]},
    { group: "Database", items: [
      { key: "database_url", label: "DATABASE_URL", value: "Set in .env.local", type: "text" },
      { key: "nextauth_secret", label: "NEXTAUTH_SECRET", value: "Set in .env.local", type: "text" },
    ]},
    { group: "Email", items: [
      { key: "email_from", label: "From Email", value: siteConfig.email, type: "email" },
      { key: "email_provider", label: "Email Provider", value: "Configure in .env.local", type: "text" },
    ]},
    { group: "Payment", items: [
      { key: "bank_transfer", label: "Bank Transfer", value: "Always enabled — configure bank details in .env.local", type: "text" },
      { key: "cod", label: "Cash on Delivery", value: "Configure NEXT_PUBLIC_COD_ENABLED in .env.local", type: "text" },
      { key: "jazzcash", label: "JazzCash", value: "Configure JAZZCASH_MERCHANT_ID + JAZZCASH_PASSWORD + JAZZCASH_INTEGRITY_SALT", type: "text" },
      { key: "easypaisa", label: "EasyPaisa", value: "Configure EASYPAISA_STORE_ID + EASYPAISA_HASH_KEY", type: "text" },
      { key: "stripe_key", label: "Stripe (International Cards)", value: "Configure STRIPE_SECRET_KEY + STRIPE_PUBLISHABLE_KEY", type: "text" },
    ]},
    { group: "Analytics", items: [
      { key: "ga4", label: "GA4 Measurement ID", value: "Configure NEXT_PUBLIC_GA_MEASUREMENT_ID", type: "text" },
      { key: "meta_pixel", label: "Meta Pixel ID", value: "Configure NEXT_PUBLIC_META_PIXEL_ID", type: "text" },
    ]},
  ];

  return (
    <div className="p-6 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-xl font-black text-[#0A0A0A]">Site Settings</h1>
        <p className="text-sm text-[#9E9E9E] mt-0.5">
          Manage your business configuration.
        </p>
      </div>

      <div className="space-y-6">
        {settings.map((group) => (
          <div key={group.group} className="bg-white border border-[#E5E5E5] rounded-[10px] overflow-hidden">
            <div className="px-5 py-3 border-b border-[#E5E5E5] bg-[#F7F7F7]">
              <h3 className="font-semibold text-sm text-[#0A0A0A]">{group.group}</h3>
            </div>
            <div className="p-5 space-y-4">
              {group.items.map((item) => (
                <div key={item.key}>
                  <label className="block text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider mb-1.5">
                    {item.label}
                  </label>
                  <input
                    type={item.type}
                    defaultValue={item.value}
                    className="w-full border border-[#E5E5E5] rounded-[6px] px-3 py-2 text-sm text-[#0A0A0A] focus:outline-none focus:border-[#E65C00] bg-white"
                    readOnly={item.value.startsWith("Set in") || item.value.startsWith("Configure")}
                  />
                  {(item.value.startsWith("Set in") || item.value.startsWith("Configure")) && (
                    <p className="text-xs text-[#9E9E9E] mt-1">Configure this value in your environment files.</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-[#F7F3EE] border border-[#E65C0020] rounded-[10px] p-4 text-sm text-[#6B6B6B]">
        <strong className="text-[#0A0A0A]">Note:</strong> Sensitive configuration (API keys, database URLs, secrets)
        must be set in your <code className="bg-[#F0E8E0] px-1 rounded text-xs">.env.local</code> file.
        Never store credentials in the database or commit them to version control.
      </div>
    </div>
  );
}
