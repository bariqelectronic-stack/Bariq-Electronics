"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSent(true);
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
          <h1 className="text-xl font-black text-[#0A0A0A] tracking-tight">Reset Password</h1>
          <p className="text-sm text-[#9E9E9E] mt-1">We&apos;ll send you a reset link</p>
        </div>

        <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6">
          {sent ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 bg-[#DBEAFE] rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-[#2563EB]" />
              </div>
              <h3 className="font-bold text-[#0A0A0A] mb-2">Check your email</h3>
              <p className="text-sm text-[#6B6B6B] mb-5">
                If an account with <strong>{email}</strong> exists, a password reset link will be sent.
              </p>
              <Link href="/login" className="text-sm text-[#E65C00] hover:underline">
                Back to sign in
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
              <Button type="submit" loading={loading} className="w-full font-bold">
                Send Reset Link
              </Button>
              <div className="text-center">
                <Link href="/login" className="text-sm text-[#9E9E9E] hover:text-[#6B6B6B]">
                  Back to sign in
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
