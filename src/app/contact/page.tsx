"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { siteConfig, getWhatsAppLink } from "@/lib/config";
import { toast } from "@/components/ui/toast";

const SUBJECTS = [
  { value: "product_inquiry", label: "Product Inquiry" },
  { value: "order_support", label: "Order Support" },
  { value: "wholesale", label: "Wholesale / Business" },
  { value: "shipping", label: "Shipping Information" },
  { value: "returns", label: "Returns & Refunds" },
  { value: "technical", label: "Technical Support" },
  { value: "other", label: "Other" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
    toast.success("Message sent! We'll be in touch soon.");
  }

  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="container-site py-10">
          <nav className="text-xs text-[#9E9E9E] mb-3 flex items-center gap-1.5">
            <Link href="/" className="hover:text-[#0A0A0A]">Home</Link>
            <span>/</span>
            <span>Contact</span>
          </nav>
          <h1 className="text-2xl font-black text-[#0A0A0A] tracking-tight">Contact Us</h1>
          <p className="text-sm text-[#6B6B6B] mt-1">Get in touch — we&apos;re here to help.</p>
        </div>
      </div>

      <div className="container-site py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact info */}
          <div className="space-y-4">
            <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-5">
              <h2 className="font-bold text-[#0A0A0A] mb-4">Bariq Electronics</h2>
              <div className="space-y-3">
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 group">
                  <div className="w-9 h-9 bg-[#F7F7F7] rounded-[8px] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-[#E65C00]" />
                  </div>
                  <div>
                    <div className="text-xs text-[#9E9E9E]">Email</div>
                    <div className="text-sm font-medium text-[#0A0A0A] group-hover:text-[#E65C00] transition-colors">{siteConfig.email}</div>
                  </div>
                </a>
                <a href={`tel:${siteConfig.phone}`} className="flex items-center gap-3 group">
                  <div className="w-9 h-9 bg-[#F7F7F7] rounded-[8px] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-[#E65C00]" />
                  </div>
                  <div>
                    <div className="text-xs text-[#9E9E9E]">Phone</div>
                    <div className="text-sm font-medium text-[#0A0A0A] group-hover:text-[#E65C00] transition-colors">{siteConfig.phone}</div>
                  </div>
                </a>
                <a href={getWhatsAppLink("Hello! I have a question.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                  <div className="w-9 h-9 bg-[#DCFCE7] rounded-[8px] flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4 text-[#16A34A]" />
                  </div>
                  <div>
                    <div className="text-xs text-[#9E9E9E]">WhatsApp</div>
                    <div className="text-sm font-medium text-[#0A0A0A] group-hover:text-[#16A34A] transition-colors">{siteConfig.whatsapp}</div>
                  </div>
                </a>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={getWhatsAppLink("Hello! I have a question about your products.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-[#16A34A] hover:bg-[#15803D] text-white rounded-[10px] p-5 transition-colors"
            >
              <MessageCircle className="w-6 h-6 flex-shrink-0" />
              <div>
                <div className="font-bold text-sm">Chat on WhatsApp</div>
                <div className="text-xs text-green-100 mt-0.5">Fastest way to reach us</div>
              </div>
            </a>

            {/* Useful links */}
            <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-5">
              <h3 className="font-semibold text-[#0A0A0A] text-sm mb-3">Quick Links</h3>
              <ul className="space-y-2">
                {[
                  { label: "FAQ", href: "/faq" },
                  { label: "Shipping Information", href: "/shipping" },
                  { label: "Returns Policy", href: "/returns" },
                  { label: "Track Your Order", href: "/track-order" },
                  { label: "Wholesale Inquiries", href: "/wholesale" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-[#6B6B6B] hover:text-[#E65C00] transition-colors">
                      {link.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6 sm:p-8">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 bg-[#DCFCE7] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-6 h-6 text-[#16A34A]" />
                  </div>
                  <h3 className="text-lg font-black text-[#0A0A0A] mb-2">Message Sent</h3>
                  <p className="text-sm text-[#6B6B6B] max-w-sm mx-auto">
                    Thank you for reaching out. We&apos;ll get back to you at <strong>{form.email}</strong> as soon as possible.
                  </p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }} className="mt-5 text-sm text-[#E65C00] hover:underline">
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-bold text-[#0A0A0A] mb-5">Send us a message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input
                        label="Name *"
                        value={form.name}
                        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                        placeholder="Your full name"
                        required
                      />
                      <Input
                        label="Email *"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <Input
                      label="Phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                      placeholder="+92 300 9445230"
                    />
                    <Select
                      label="Subject"
                      value={form.subject}
                      onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                      options={SUBJECTS}
                      placeholder="Select a subject"
                    />
                    <Textarea
                      label="Message *"
                      value={form.message}
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                      placeholder="How can we help you?"
                      required
                      className="min-h-[140px]"
                    />
                    <Button type="submit" loading={loading} className="w-full font-bold tracking-wide">
                      Send Message
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
