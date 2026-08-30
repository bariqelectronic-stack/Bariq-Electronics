import React from "react";

export const dynamic = "force-dynamic";
import { Metadata } from "next";
import Link from "next/link";
import {
  Package, ShoppingCart, Users, AlertTriangle,
  Briefcase, MessageSquare, ArrowRight, TrendingUp
} from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Dashboard | Bariq Electronics",
};

const stats = [
  { label: "Total Orders", value: "—", icon: ShoppingCart, href: "/admin/orders", note: "Connect database to view" },
  { label: "Products", value: "8", icon: Package, href: "/admin/products", note: "Demo products loaded" },
  { label: "Customers", value: "—", icon: Users, href: "/admin/customers", note: "Connect database to view" },
  { label: "Low Stock", value: "—", icon: AlertTriangle, href: "/admin/inventory", note: "Connect database to view" },
  { label: "Wholesale Leads", value: "—", icon: Briefcase, href: "/admin/wholesale", note: "Connect database to view" },
  { label: "Messages", value: "—", icon: MessageSquare, href: "/admin/messages", note: "Connect database to view" },
];

const quickActions = [
  { label: "Add New Product", href: "/admin/products/new", icon: Package },
  { label: "View Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Wholesale Leads", href: "/admin/wholesale", icon: Briefcase },
  { label: "Contact Messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Site Settings", href: "/admin/settings", icon: TrendingUp },
];

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-xl font-black text-[#0A0A0A]">Dashboard</h1>
        <p className="text-sm text-[#9E9E9E] mt-1">
          Welcome to Bariq Electronics admin panel.
        </p>
      </div>

      {/* Setup notice */}
      <div className="bg-[#FEF9C3] border border-[#CA8A04] rounded-[10px] p-4 mb-6">
        <p className="text-sm font-semibold text-[#92400E] mb-1">Setup Required</p>
        <p className="text-xs text-[#78350F]">
          Configure your database and environment variables to enable full functionality.
          See <code className="bg-[#FEF08A] px-1 rounded">.env.local</code> for required configuration.
          Demo products are loaded — replace with your actual inventory in Products.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white border border-[#E5E5E5] rounded-[10px] p-5 hover:border-[#D0D0D0] hover:shadow-sm transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-8 h-8 bg-[#F7F7F7] rounded-[6px] flex items-center justify-center">
                <stat.icon className="w-4 h-4 text-[#E65C00]" />
              </div>
              <ArrowRight className="w-4 h-4 text-[#BDBDBD] group-hover:text-[#E65C00] transition-colors" />
            </div>
            <div className="text-2xl font-black text-[#0A0A0A] mb-1">{stat.value}</div>
            <div className="text-sm font-medium text-[#6B6B6B]">{stat.label}</div>
            <div className="text-xs text-[#BDBDBD] mt-0.5">{stat.note}</div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-5 mb-6">
        <h2 className="font-bold text-[#0A0A0A] text-sm mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="flex flex-col items-center gap-2 p-3 border border-[#E5E5E5] rounded-[8px] hover:border-[#E65C00] hover:bg-[#F7F3EE] transition-all group text-center"
            >
              <action.icon className="w-5 h-5 text-[#E65C00]" />
              <span className="text-xs font-medium text-[#3D3D3D] group-hover:text-[#E65C00] leading-tight">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Setup checklist */}
      <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-5">
        <h2 className="font-bold text-[#0A0A0A] text-sm mb-4">Setup Checklist</h2>
        <ul className="space-y-2.5">
          {[
            { label: "Configure DATABASE_URL in .env.local", required: true },
            { label: "Configure NEXTAUTH_SECRET in .env.local", required: true },
            { label: "Run database migrations (drizzle-kit push)", required: true },
            { label: "Add your actual products (replace demo data)", required: true },
            { label: "Update Site Settings with business information", required: true },
            { label: "Configure email provider for transactional emails", required: false },
            { label: "Set up payment provider (Stripe, PayPal, etc.)", required: false },
            { label: "Configure analytics (Google Analytics 4)", required: false },
          ].map((item) => (
            <li key={item.label} className="flex items-center gap-2.5 text-sm">
              <div className={`w-4 h-4 rounded-[3px] flex items-center justify-center flex-shrink-0 ${item.required ? "bg-[#FEE2E2] border border-[#FCA5A5]" : "bg-[#F7F7F7] border border-[#E5E5E5]"}`}>
                <div className="w-1.5 h-1.5 rounded-full bg-[#9E9E9E]" />
              </div>
              <span className={item.required ? "text-[#0A0A0A]" : "text-[#6B6B6B]"}>
                {item.label}
                {item.required && <span className="text-[#E65C00] ml-1 text-xs">*</span>}
              </span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-[#9E9E9E] mt-3">* Required to run the full application</p>
      </div>
    </div>
  );
}
