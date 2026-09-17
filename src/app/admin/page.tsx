import React from "react";

export const dynamic = "force-dynamic";

import { Metadata } from "next";
import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import {
  Package,
  ShoppingCart,
  Users,
  AlertTriangle,
  Briefcase,
  MessageSquare,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Dashboard | Bariq Electronics",
};

const quickActions = [
  {
    label: "Add New Product",
    href: "/admin/products/new",
    icon: Package,
  },
  {
    label: "View Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    label: "Wholesale Leads",
    href: "/admin/wholesale",
    icon: Briefcase,
  },
  {
    label: "Contact Messages",
    href: "/admin/messages",
    icon: MessageSquare,
  },
  {
    label: "Site Settings",
    href: "/admin/settings",
    icon: TrendingUp,
  },
];

export default async function AdminDashboard() {
  const supabase = await createServerSupabaseClient();

  const [
    productsResult,
    ordersResult,
    customersResult,
    lowStockResult,
    wholesaleResult,
    messagesResult,
  ] = await Promise.all([
    supabase
      .from("products")
      .select("id", { count: "exact", head: true }),

    supabase
      .from("orders")
      .select("id", { count: "exact", head: true }),

    supabase
      .from("users")
      .select("id", { count: "exact", head: true })
      .eq("role", "CUSTOMER"),

    supabase
      .from("inventory")
      .select("id", { count: "exact", head: true })
      .filter("quantity", "lte", 5),

    supabase
      .from("wholesale_leads")
      .select("id", { count: "exact", head: true }),

    supabase
      .from("contact_messages")
      .select("id", { count: "exact", head: true }),
  ]);

  const stats = [
    {
      label: "Total Orders",
      value: String(ordersResult.count ?? 0),
      icon: ShoppingCart,
      href: "/admin/orders",
      note: "Live customer orders",
    },
    {
      label: "Products",
      value: String(productsResult.count ?? 0),
      icon: Package,
      href: "/admin/products",
      note: "Live products in catalog",
    },
    {
      label: "Customers",
      value: String(customersResult.count ?? 0),
      icon: Users,
      href: "/admin/customers",
      note: "Registered customers",
    },
    {
      label: "Low Stock",
      value: String(lowStockResult.count ?? 0),
      icon: AlertTriangle,
      href: "/admin/inventory",
      note: "Products at or below 5 units",
    },
    {
      label: "Wholesale Leads",
      value: String(wholesaleResult.count ?? 0),
      icon: Briefcase,
      href: "/admin/wholesale",
      note: "Live wholesale enquiries",
    },
    {
      label: "Messages",
      value: String(messagesResult.count ?? 0),
      icon: MessageSquare,
      href: "/admin/messages",
      note: "Live contact messages",
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-xl font-black text-[#0A0A0A]">
          Dashboard
        </h1>
        <p className="text-sm text-[#9E9E9E] mt-1">
          Welcome to Bariq Electronics admin panel.
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

            <div className="text-2xl font-black text-[#0A0A0A] mb-1">
              {stat.value}
            </div>

            <div className="text-sm font-medium text-[#6B6B6B]">
              {stat.label}
            </div>

            <div className="text-xs text-[#BDBDBD] mt-0.5">
              {stat.note}
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-[#E5E5E5] rounded-[10px] p-5">
        <h2 className="font-bold text-[#0A0A0A] text-sm mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="flex flex-col items-center gap-2 p-3 border border-[#E5E5E5] rounded-[8px] hover:border-[#E65C00] hover:bg-[#F7F3EE] transition-all group text-center"
            >
              <action.icon className="w-5 h-5 text-[#E65C00]" />

              <span className="text-xs font-medium text-[#3D3D3D] group-hover:text-[#E65C00] leading-tight">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}