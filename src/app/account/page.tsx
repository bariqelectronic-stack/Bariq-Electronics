import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { User, Package, MapPin, Heart, ShieldCheck, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "My Account",
};

const accountLinks = [
  { href: "/account/orders", icon: Package, label: "Orders", desc: "View your order history and track shipments" },
  { href: "/account/profile", icon: User, label: "Profile", desc: "Update your personal information" },
  { href: "/account/addresses", icon: MapPin, label: "Addresses", desc: "Manage your saved addresses" },
  { href: "/account/wishlist", icon: Heart, label: "Wishlist", desc: "View your saved products" },
  { href: "/account/security", icon: ShieldCheck, label: "Security", desc: "Update your password and security settings" },
];

export default function AccountPage() {
  return (
    <div className="bg-[#F7F7F7] min-h-screen">
      <div className="bg-white border-b border-[#E5E5E5]">
        <div className="container-site py-8">
          <h1 className="text-2xl font-black text-[#0A0A0A] tracking-tight">My Account</h1>
          <p className="text-sm text-[#9E9E9E] mt-1">
            Manage your account, orders and settings.
          </p>
        </div>
      </div>

      <div className="container-site py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl">
          {accountLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group bg-white border border-[#E5E5E5] rounded-[10px] p-5 hover:border-[#E65C00] transition-all duration-200"
            >
              <div className="w-9 h-9 bg-[#F7F7F7] rounded-[8px] flex items-center justify-center mb-3">
                <item.icon className="w-4.5 h-4.5 text-[#E65C00]" />
              </div>
              <h3 className="font-semibold text-[#0A0A0A] text-sm group-hover:text-[#E65C00] transition-colors">
                {item.label}
              </h3>
              <p className="text-xs text-[#9E9E9E] mt-1 leading-relaxed">{item.desc}</p>
              <div className="flex items-center gap-1 mt-3 text-xs font-medium text-[#E65C00]">
                View <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 bg-white border border-[#E5E5E5] rounded-[10px] p-5 max-w-3xl">
          <p className="text-sm text-[#6B6B6B]">
            <strong className="text-[#0A0A0A]">Authentication:</strong>{" "}
            Full login/registration with Auth.js is set up. Configure your{" "}
            <code className="bg-[#F7F7F7] px-1 rounded text-xs">NEXTAUTH_SECRET</code> and{" "}
            <code className="bg-[#F7F7F7] px-1 rounded text-xs">DATABASE_URL</code> to enable.
          </p>
        </div>
      </div>
    </div>
  );
}
