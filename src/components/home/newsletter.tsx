"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section className="py-14 bg-[#0A0A0A]">
      <div className="container-site">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
            Stay Updated
          </h2>
          <p className="text-[#9E9E9E] text-sm mb-6">
            New products, restocks and repair guides. No spam.
          </p>

          {submitted ? (
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-[10px] px-6 py-5">
              <div className="text-xl mb-2">✓</div>
              <p className="text-sm text-[#9E9E9E]">
                Thanks for subscribing. We&apos;ll be in touch.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 bg-[#1A1A1A] border border-[#2A2A2A] text-white placeholder:text-[#6B6B6B] text-sm rounded-[6px] px-4 py-2.5 focus:outline-none focus:border-[#E65C00]"
              />
              <Button type="submit" className="sm:flex-shrink-0 font-bold tracking-wide text-sm">
                Subscribe
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
