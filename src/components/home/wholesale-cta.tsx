import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WholesaleCta() {
  return (
    <section className="py-16 bg-[#F7F7F7] border-y border-[#E5E5E5]">
      <div className="container-site">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-12 h-12 bg-[#E65C0010] border border-[#E65C0020] rounded-[10px] flex items-center justify-center mx-auto mb-5">
            <span className="text-2xl">📦</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0A0A0A] tracking-tight mb-3">
            Need Tools in Bulk?
          </h2>
          <p className="text-[#6B6B6B] text-base leading-relaxed mb-8 max-w-xl mx-auto">
            We work with repair shops, distributors, training centers and resellers.
            Contact us to discuss wholesale pricing, bulk orders and partnership opportunities.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/wholesale">
              <Button size="lg" className="font-bold tracking-wide uppercase text-sm">
                Request Wholesale Pricing <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="font-semibold text-sm">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
