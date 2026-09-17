"use client";

import React, { useState } from "react";
import Image from "next/image";
import { signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

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

    if (!result || result.error) {
      setLoading(false);
      setError("Invalid admin email or password.");
      return;
    }

    const session = await getSession();

    if (session?.user?.role !== "ADMIN") {
      await signOut({ redirect: false });
      setLoading(false);
      setError("Access denied. Only an admin can sign in here.");
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2.5 mb-6">
            <Image
              src="/bariq-logo.jpg"
              alt="Bariq Electronics"
              width={40}
              height={40}
              className="rounded-[8px]"
            />
            <div>
              <div className="font-black text-[#0A0A0A] text-sm">
                BARIQ
              </div>
              <div className="font-light text-[#6B6B6B] text-[10px] uppercase tracking-[0.15em]">
                Electronics
              </div>
            </div>
          </div>

          <h1 className="text-xl font-black text-[#0A0A0A]">
            Admin Login
          </h1>

          <p className="text-sm text-[#9E9E9E] mt-1">
            Authorized administrators only
          </p>
        </div>

        <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6">
          {error && (
            <div className="bg-[#FEE2E2] border border-[#FCA5A5] rounded-[6px] p-3 mb-4 text-xs text-[#DC2626]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[#0A0A0A] block mb-1.5">
                Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
                autoComplete="username"
                className="w-full border border-[#E5E5E5] rounded-[6px] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E65C0040] focus:border-[#E65C00]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
  <label className="text-sm font-medium text-[#0A0A0A]">
    Password
  </label>

  <a
    href="/forgot-password"
    className="text-xs text-[#E65C00] hover:underline"
  >
    Forgot Password?
  </a>
</div>

              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Admin password"
                  required
                  autoComplete="current-password"
                  className="w-full border border-[#E5E5E5] rounded-[6px] px-3 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#E65C0040] focus:border-[#E65C00]"
                />

                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9E9E9E]"
                >
                  {showPw ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0A0A0A] text-white rounded-[6px] py-2.5 text-sm font-bold hover:bg-[#1A1A1A] transition-colors disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In as Admin"}
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-[#E5E5E5] text-center">
            <a
              href="/login"
              className="text-sm text-[#E65C00] hover:underline"
            >
              Customer Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}