import React from "react";

export const dynamic = "force-dynamic";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import {
  LayoutDashboard, Package, ShoppingCart, Users, Archive,
  Briefcase, MessageSquare, Star, FileText, Settings, BookOpen, LogOut, Tag
} from "lucide-react";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard", exact: true },
  { href: "/admin/products", icon: Package, label: "Products" },
  { href: "/admin/categories", icon: Tag, label: "Categories" },
  { href: "/admin/orders", icon: ShoppingCart, label: "Orders" },
  { href: "/admin/customers", icon: Users, label: "Customers" },
  { href: "/admin/inventory", icon: Archive, label: "Inventory" },
  { href: "/admin/wholesale", icon: Briefcase, label: "Wholesale" },
  { href: "/admin/messages", icon: MessageSquare, label: "Messages" },
  { href: "/admin/reviews", icon: Star, label: "Reviews" },
  { href: "/admin/blog", icon: BookOpen, label: "Blog" },
  { href: "/admin/pages", icon: FileText, label: "Pages" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Server-side guard — second layer after middleware
  const session = await auth();
  if (!session) redirect("/login");
  if (session.user?.role !== "ADMIN") redirect("/");

  return (
    <div className="min-h-screen bg-[#F7F7F7] flex">
      {/* Sidebar */}
      <aside className="w-56 bg-[#0A0A0A] flex-shrink-0 flex flex-col hidden lg:flex">
        <div className="p-5 border-b border-[#1E1E1E]">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/bariq-logo.jpg"
              alt="Bariq Electronics"
              width={28}
              height={28}
              className="rounded-[5px] flex-shrink-0"
            />
            <div>
              <div className="text-white font-bold text-xs leading-tight">BARIQ</div>
              <div className="text-[#9E9E9E] text-[9px] uppercase tracking-widest">Admin</div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 px-3 py-2 rounded-[6px] text-[#9E9E9E] hover:text-white hover:bg-[#1A1A1A] transition-colors text-sm group"
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-[#1E1E1E] space-y-0.5">
          <Link
            href="/"
            className="flex items-center gap-2.5 px-3 py-2 rounded-[6px] text-[#6B6B6B] hover:text-white hover:bg-[#1A1A1A] transition-colors text-sm"
          >
            View Store
          </Link>
          <form action="/api/auth/signout" method="POST">
            <input type="hidden" name="callbackUrl" value="/login" />
            <button
              type="submit"
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[6px] text-[#6B6B6B] hover:text-white hover:bg-[#1A1A1A] transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <div className="lg:hidden bg-[#0A0A0A] text-white px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/bariq-logo.jpg"
              alt="Bariq Electronics"
              width={24}
              height={24}
              className="rounded-[4px] flex-shrink-0"
            />
            <span className="text-white font-bold text-sm">Admin</span>
          </Link>
          <Link href="/" className="text-xs text-[#9E9E9E] hover:text-white">View Store →</Link>
        </div>

        {/* Mobile nav */}
        <div className="lg:hidden overflow-x-auto bg-white border-b border-[#E5E5E5]">
          <div className="flex gap-0 min-w-max px-3 py-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-[5px] text-[#6B6B6B] hover:text-[#0A0A0A] hover:bg-[#F7F7F7] text-xs whitespace-nowrap"
              >
                <item.icon className="w-3.5 h-3.5" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
