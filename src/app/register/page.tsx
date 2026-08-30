"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const passwordStrength = (pw: string) => {
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };

  const strength = passwordStrength(form.password);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "#DC2626", "#CA8A04", "#2563EB", "#16A34A"][strength];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSuccess(true);
  }

  function set(field: string, value: string) {
    setForm((p) => ({ ...p, [field]: value }));
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm bg-white border border-[#E5E5E5] rounded-[12px] p-8 text-center">
          <div className="w-14 h-14 bg-[#DCFCE7] rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-7 h-7 text-[#16A34A]" />
          </div>
          <h2 className="text-lg font-black text-[#0A0A0A] mb-2">Account Created</h2>
          <p className="text-sm text-[#6B6B6B] mb-6">
            Welcome! Your account has been created. Once the database is configured, you&apos;ll be able to sign in and access your orders.
          </p>
          <Link href="/login">
            <Button className="w-full font-bold">Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 bg-[#E65C00] rounded-[7px] flex items-center justify-center">
              <span className="text-white font-black text-sm tracking-tight">BE</span>
            </div>
            <div>
              <div className="font-black text-[#0A0A0A] text-sm leading-tight tracking-tight">BARIQ</div>
              <div className="font-light text-[#6B6B6B] text-[10px] uppercase tracking-[0.15em] leading-tight">Electronics</div>
            </div>
          </Link>
          <h1 className="text-xl font-black text-[#0A0A0A] tracking-tight">Create account</h1>
          <p className="text-sm text-[#9E9E9E] mt-1">Join Bariq Electronics</p>
        </div>

        <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6">
          {error && (
            <div className="bg-[#FEE2E2] border border-[#FCA5A5] rounded-[6px] p-3 mb-4 text-xs text-[#DC2626]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input label="First Name" value={form.firstName} onChange={(e) => set("firstName", e.target.value)} required />
              <Input label="Last Name" value={form.lastName} onChange={(e) => set("lastName", e.target.value)} required />
            </div>
            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="your@email.com"
              required
              autoComplete="email"
            />

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#0A0A0A] mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => set("password", e.target.value)}
                  placeholder="Min. 8 characters"
                  required
                  autoComplete="new-password"
                  className="w-full border border-[#E5E5E5] rounded-[6px] px-3 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#E65C0040] focus:border-[#E65C00] hover:border-[#D0D0D0]"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9E9E9E]">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1 bg-[#F0F0F0] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{ width: `${strength * 25}%`, backgroundColor: strengthColor }}
                    />
                  </div>
                  <span className="text-xs font-medium" style={{ color: strengthColor }}>{strengthLabel}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0A0A0A] mb-1.5">Confirm Password</label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(e) => set("confirmPassword", e.target.value)}
                placeholder="Repeat password"
                required
                autoComplete="new-password"
                className="w-full border border-[#E5E5E5] rounded-[6px] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E65C0040] focus:border-[#E65C00] hover:border-[#D0D0D0]"
              />
            </div>

            <p className="text-xs text-[#9E9E9E]">
              By creating an account you agree to our{" "}
              <Link href="/terms" className="text-[#E65C00] hover:underline">Terms of Service</Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-[#E65C00] hover:underline">Privacy Policy</Link>.
            </p>

            <Button type="submit" loading={loading} className="w-full font-bold text-sm">
              Create Account
            </Button>
          </form>

          <div className="mt-5 pt-5 border-t border-[#E5E5E5] text-center">
            <p className="text-sm text-[#9E9E9E]">
              Already have an account?{" "}
              <Link href="/login" className="text-[#E65C00] font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
