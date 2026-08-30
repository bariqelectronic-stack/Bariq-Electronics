"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { Shield } from "lucide-react";

export default function ProfilePage() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    toast.success("Profile updated. (Requires database to persist.)");
  }

  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="container-site py-6">
          <nav className="text-xs text-[#9E9E9E] mb-2 flex items-center gap-1.5">
            <Link href="/account" className="hover:text-[#0A0A0A]">Account</Link>
            <span>/</span>
            <span>Profile</span>
          </nav>
          <h1 className="text-xl font-black text-[#0A0A0A]">Profile</h1>
        </div>
      </div>

      <div className="container-site py-8 max-w-xl">
        <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#E5E5E5]">
            <div className="w-14 h-14 bg-[#F7F7F7] border border-[#E5E5E5] rounded-full flex items-center justify-center text-2xl font-black text-[#BDBDBD]">
              {form.firstName ? form.firstName[0]?.toUpperCase() : "?"}
            </div>
            <div>
              <div className="font-semibold text-[#0A0A0A]">
                {form.firstName || form.lastName ? `${form.firstName} ${form.lastName}`.trim() : "Your Name"}
              </div>
              <div className="text-sm text-[#9E9E9E]">{form.email || "your@email.com"}</div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="First Name" value={form.firstName} onChange={(e) => setForm(p => ({ ...p, firstName: e.target.value }))} placeholder="First" />
              <Input label="Last Name" value={form.lastName} onChange={(e) => setForm(p => ({ ...p, lastName: e.target.value }))} placeholder="Last" />
            </div>
            <Input label="Email" type="email" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} placeholder="your@email.com" />
            <Input label="Phone" type="tel" value={form.phone} onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="+92 300 000 0000" />
            <Button type="submit" loading={loading} className="w-full font-bold">Save Changes</Button>
          </form>
        </div>

        <div className="mt-4 bg-white border border-[#E5E5E5] rounded-[12px] p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-[#E65C00]" />
            <h3 className="font-bold text-[#0A0A0A]">Security</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#6B6B6B]">Password</span>
              <Link href="/forgot-password" className="text-[#E65C00] font-medium hover:underline text-xs">Change password →</Link>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#6B6B6B]">Account</span>
              <button className="text-[#DC2626] text-xs font-medium hover:underline">Delete account</button>
            </div>
          </div>
        </div>

        <p className="text-xs text-[#9E9E9E] text-center mt-4">
          Profile changes require database and authentication configuration.
        </p>
      </div>
    </div>
  );
}
