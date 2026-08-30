"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Building, Globe, Package, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { toast } from "@/components/ui/toast";

const BUSINESS_TYPES = [
  { value: "repair_shop", label: "Repair Shop" },
  { value: "distributor", label: "Distributor" },
  { value: "reseller", label: "Reseller" },
  { value: "training_center", label: "Training Center" },
  { value: "electronics_retail", label: "Electronics Retail" },
  { value: "other", label: "Other" },
];

const ORDER_VOLUMES = [
  { value: "1-5", label: "1–5 units/month" },
  { value: "5-20", label: "5–20 units/month" },
  { value: "20-50", label: "20–50 units/month" },
  { value: "50-100", label: "50–100 units/month" },
  { value: "100+", label: "100+ units/month" },
];

const COUNTRIES = [
  { value: "PK", label: "Pakistan" },
  { value: "AE", label: "United Arab Emirates" },
  { value: "SA", label: "Saudi Arabia" },
  { value: "GB", label: "United Kingdom" },
  { value: "US", label: "United States" },
  { value: "DE", label: "Germany" },
  { value: "IN", label: "India" },
  { value: "CN", label: "China" },
  { value: "AU", label: "Australia" },
  { value: "other", label: "Other" },
];

const benefits = [
  { icon: TrendingUp, title: "Competitive Bulk Pricing", desc: "Volume-based pricing tailored to your order size and product mix." },
  { icon: Package, title: "Wide Product Range", desc: "Microscopes, soldering tools, screwdrivers, cables and all repair accessories." },
  { icon: Globe, title: "International Shipping", desc: "We ship to repair distributors and businesses worldwide." },
  { icon: Building, title: "Business Partnership", desc: "Long-term partnership arrangements for established distributors and resellers." },
];

export default function WholesalePage() {
  const [form, setForm] = useState({ companyName: "", country: "", website: "", businessType: "", productsInterested: "", expectedVolume: "", email: "", whatsapp: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
    toast.success("Wholesale inquiry submitted!");
  }

  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      {/* Hero */}
      <div className="bg-[#0A0A0A]">
        <div className="container-site py-14">
          <nav className="text-xs text-[#6B6B6B] mb-4 flex items-center gap-1.5">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-[#9E9E9E]">Wholesale</span>
          </nav>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#E65C00]" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E65C00]">Business & Trade</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight mb-4">
              Grow Your Repair Business With Bariq Electronics
            </h1>
            <p className="text-[#9E9E9E] text-base leading-relaxed">
              Professional bulk pricing for repair shops, distributors, resellers, and training centers.
              Contact us to discuss partnership opportunities and wholesale arrangements.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="container-site py-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="flex gap-3">
                <div className="w-9 h-9 bg-[#F7F3EE] rounded-[8px] flex items-center justify-center flex-shrink-0">
                  <b.icon className="w-4 h-4 text-[#E65C00]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#0A0A0A] text-sm">{b.title}</h3>
                  <p className="text-xs text-[#9E9E9E] mt-1 leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-site py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Info */}
          <div className="space-y-5">
            <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-5">
              <h3 className="font-bold text-[#0A0A0A] mb-3 text-sm">What We Offer</h3>
              <ul className="space-y-2">
                {[
                  "Wholesale pricing on all product lines",
                  "Bulk order arrangements",
                  "Reseller & distributor programs",
                  "Priority stock allocation",
                  "Flexible payment terms (negotiable)",
                  "Technical product support",
                  "International shipping",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#6B6B6B]">
                    <Check className="w-3.5 h-3.5 text-[#E65C00] mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-5">
              <h3 className="font-bold text-[#0A0A0A] mb-2 text-sm">Suitable For</h3>
              <ul className="space-y-1.5">
                {[
                  "Mobile phone repair shops",
                  "Electronics distributors",
                  "Tool resellers",
                  "Repair training centers",
                  "Electronics retailers",
                ].map((item) => (
                  <li key={item} className="text-xs text-[#6B6B6B] flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-[#E65C00] rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 sm:p-8">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 bg-[#DCFCE7] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-7 h-7 text-[#16A34A]" />
                  </div>
                  <h3 className="text-lg font-black text-[#0A0A0A] mb-2">Inquiry Submitted</h3>
                  <p className="text-sm text-[#6B6B6B] max-w-sm mx-auto">
                    We&apos;ve received your wholesale inquiry. Our team will review it and contact you at <strong>{form.email}</strong> within 1–2 business days.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="font-bold text-[#0A0A0A] mb-5">Wholesale Inquiry Form</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input label="Company Name *" value={form.companyName} onChange={(e) => setForm((p) => ({ ...p, companyName: e.target.value }))} required />
                      <Select label="Country *" value={form.country} onChange={(e) => setForm((p) => ({ ...p, country: e.target.value }))} options={COUNTRIES} placeholder="Select country" required />
                    </div>
                    <Input label="Website (optional)" value={form.website} onChange={(e) => setForm((p) => ({ ...p, website: e.target.value }))} placeholder="https://" type="url" />
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Select label="Business Type" value={form.businessType} onChange={(e) => setForm((p) => ({ ...p, businessType: e.target.value }))} options={BUSINESS_TYPES} placeholder="Select type" />
                      <Select label="Expected Monthly Volume" value={form.expectedVolume} onChange={(e) => setForm((p) => ({ ...p, expectedVolume: e.target.value }))} options={ORDER_VOLUMES} placeholder="Select range" />
                    </div>
                    <Textarea label="Products Interested In" value={form.productsInterested} onChange={(e) => setForm((p) => ({ ...p, productsInterested: e.target.value }))} placeholder="e.g. Microscopes, soldering stations, screwdriver sets..." className="min-h-[80px]" />
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input label="Email *" type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} required />
                      <Input label="WhatsApp" value={form.whatsapp} onChange={(e) => setForm((p) => ({ ...p, whatsapp: e.target.value }))} placeholder="+92..." />
                    </div>
                    <Textarea label="Message" value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))} placeholder="Any additional information about your business or requirements..." className="min-h-[100px]" />
                    <Button type="submit" loading={loading} className="w-full font-bold tracking-wide text-sm">
                      Submit Wholesale Inquiry <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
