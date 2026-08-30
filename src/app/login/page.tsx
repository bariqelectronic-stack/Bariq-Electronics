"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/account";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email: email.toLowerCase().trim(),
      password,
      redirect: false,
    });

    setLoading(false);

    if (!result || result.error) {
      setError("Invalid email or password. Please try again.");
      return;
    }

    // Redirect to callbackUrl (works for both /admin and /account)
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6">
      {error && (
        <div className="bg-[#FEE2E2] border border-[#FCA5A5] rounded-[6px] p-3 mb-4 text-xs text-[#DC2626]">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          autoComplete="email"
        />
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-[#0A0A0A]">Password</label>
            <Link href="/forgot-password" className="text-xs text-[#E65C00] hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              required
              autoComplete="current-password"
              className="w-full border border-[#E5E5E5] rounded-[6px] px-3 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#E65C0040] focus:border-[#E65C00] hover:border-[#D0D0D0]"
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9E9E9E] hover:text-[#6B6B6B]"
            >
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <Button type="submit" loading={loading} className="w-full font-bold text-sm">
          Sign In
        </Button>
      </form>

      <div className="mt-5 pt-5 border-t border-[#E5E5E5] text-center">
        <p className="text-sm text-[#9E9E9E]">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-[#E65C00] font-medium hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-2.5 mb-6">
            <Image
              src="/bariq-logo.jpg"
              alt="Bariq Electronics"
              width={36}
              height={36}
              className="rounded-[7px] flex-shrink-0"
            />
            <div>
              <div className="font-black text-[#0A0A0A] text-sm leading-tight tracking-tight">BARIQ</div>
              <div className="font-light text-[#6B6B6B] text-[10px] uppercase tracking-[0.15em] leading-tight">Electronics</div>
            </div>
          </Link>
          <h1 className="text-xl font-black text-[#0A0A0A] tracking-tight">Sign in</h1>
          <p className="text-sm text-[#9E9E9E] mt-1">Access your account and orders</p>
        </div>

        <Suspense>
          <LoginForm />
        </Suspense>

        {/* Guest option */}
        <div className="mt-4 text-center">
          <Link href="/shop" className="text-sm text-[#9E9E9E] hover:text-[#6B6B6B] transition-colors">
            Continue as guest →
          </Link>
        </div>
      </div>
    </div>
  );
}
