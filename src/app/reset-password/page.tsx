"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ResetPasswordPage() {
  const [token, setToken] = useState("");
const [email, setEmail] = useState("");

React.useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  setToken(params.get("token") || "");
  setEmail(params.get("email") || "");
}, []);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!token || !email) {
      setError("Invalid or missing reset link.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/password-reset/confirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to reset password.");
        return;
      }

      setMessage("Password reset successfully. You can now sign in.");
      setPassword("");
      setConfirmPassword("");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-2.5 mb-6">
            <Image
              src="/bariq-logo.jpg"
              alt="Bariq Electronics"
              width={36}
              height={36}
              className="rounded-[7px]"
            />
            <div>
              <div className="font-black text-[#0A0A0A] text-sm">
                BARIQ
              </div>
              <div className="font-light text-[#6B6B6B] text-[10px] uppercase tracking-[0.15em]">
                Electronics
              </div>
            </div>
          </Link>

          <h1 className="text-xl font-black text-[#0A0A0A]">
            Create New Password
          </h1>

          <p className="text-sm text-[#9E9E9E] mt-1">
            Enter your new password below
          </p>
        </div>

        <div className="bg-white border border-[#E5E5E5] rounded-[12px] p-6">
          {error && (
            <div className="bg-[#FEE2E2] border border-[#FCA5A5] rounded-[6px] p-3 mb-4 text-xs text-[#DC2626]">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-[#DCFCE7] border border-[#86EFAC] rounded-[6px] p-3 mb-4 text-xs text-[#166534]">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[#0A0A0A] block mb-1.5">
                New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                required
                minLength={8}
                className="w-full border border-[#E5E5E5] rounded-[6px] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E65C0040] focus:border-[#E65C00]"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[#0A0A0A] block mb-1.5">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
                minLength={8}
                className="w-full border border-[#E5E5E5] rounded-[6px] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E65C0040] focus:border-[#E65C00]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E65C00] text-white rounded-[6px] py-2.5 text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          {message && (
            <div className="text-center mt-5">
              <Link
                href="/login"
                className="text-sm text-[#E65C00] hover:underline"
              >
                Go to Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}