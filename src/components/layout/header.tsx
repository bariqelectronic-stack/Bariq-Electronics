"use client";

import React, { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search, ShoppingCart, Heart, User, Menu, X, ChevronDown,
  Microscope, Wrench, Zap, Package, Layers, FlaskConical
} from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

const categories = [
  { name: "Microscopes", slug: "microscopes", icon: Microscope },
  { name: "Microscope Cameras", slug: "microscope-cameras", icon: Layers },
  { name: "Soldering Tools", slug: "soldering-tools", icon: Zap },
  { name: "Precision Screwdrivers", slug: "screwdrivers", icon: Wrench },
  { name: "PCB Repair Tools", slug: "pcb-repair", icon: Layers },
  { name: "Cleaning Tools", slug: "cleaning-tools", icon: Package },
  { name: "Repair Cables", slug: "repair-cables", icon: Package },
  { name: "Lab Tools", slug: "lab-tools", icon: FlaskConical },
  { name: "Accessories", slug: "accessories", icon: Package },
];

const solutions = [
  { name: "Mobile Phone Repair", slug: "mobile-phone-repair" },
  { name: "Microsoldering", slug: "microsoldering" },
  { name: "PCB Repair", slug: "pcb-repair" },
  { name: "Electronics Laboratory", slug: "electronics-laboratory" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);

  const [, startTransition] = useTransition();
  const cartCount = useCartStore((s) => s.getItemCount());
  const wishlistCount = useWishlistStore((s) => s.productIds.length);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    startTransition(() => setMobileOpen(false));
  }, [pathname, startTransition]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Top bar */}
      <div className="bg-[#0A0A0A] text-white text-xs py-2 hidden md:block">
        <div className="container-site flex items-center justify-between">
          <span className="text-[#9E9E9E]">Professional Electronics & Mobile Repair Tools</span>
          <div className="flex items-center gap-6 text-[#9E9E9E]">
            <a href={`tel:${siteConfig.phone}`} className="hover:text-white transition-colors">
              {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">
              {siteConfig.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={cn(
          "sticky top-0 z-40 bg-white transition-shadow duration-200",
          scrolled ? "shadow-[0_1px_0_#E5E5E5,0_4px_16px_0_rgba(0,0,0,0.06)]" : "border-b border-[#E5E5E5]"
        )}
      >
        <div className="container-site">
          <div className="flex items-center h-16 gap-6">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-2.5 group">
              <div className="w-8 h-8 bg-[#E65C00] rounded-[6px] flex items-center justify-center flex-shrink-0">
                <span className="text-white font-black text-sm tracking-tight">BE</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-black text-[#0A0A0A] text-sm leading-tight tracking-tight">
                  BARIQ
                </div>
                <div className="font-light text-[#6B6B6B] text-[10px] uppercase tracking-[0.15em] leading-tight">
                  Electronics
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1 flex-1">
              {/* Shop dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShopOpen(true)}
                onMouseLeave={() => setShopOpen(false)}
              >
                <button
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-[6px] transition-colors",
                    isActive("/shop") || isActive("/categories")
                      ? "text-[#E65C00]"
                      : "text-[#3D3D3D] hover:text-[#0A0A0A] hover:bg-[#F7F7F7]"
                  )}
                >
                  Shop <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {shopOpen && (
                  <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-[#E5E5E5] rounded-[10px] shadow-xl py-2 z-50">
                    <Link
                      href="/shop"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[#0A0A0A] hover:bg-[#F7F7F7] transition-colors"
                    >
                      All Products
                    </Link>
                    <div className="h-px bg-[#F0F0F0] my-1" />
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/categories/${cat.slug}`}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#3D3D3D] hover:bg-[#F7F7F7] hover:text-[#0A0A0A] transition-colors"
                      >
                        <cat.icon className="w-4 h-4 text-[#E65C00] flex-shrink-0" />
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Solutions dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setSolutionsOpen(true)}
                onMouseLeave={() => setSolutionsOpen(false)}
              >
                <button
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-[6px] transition-colors",
                    isActive("/solutions")
                      ? "text-[#E65C00]"
                      : "text-[#3D3D3D] hover:text-[#0A0A0A] hover:bg-[#F7F7F7]"
                  )}
                >
                  Solutions <ChevronDown className="w-3.5 h-3.5" />
                </button>
                {solutionsOpen && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-[#E5E5E5] rounded-[10px] shadow-xl py-2 z-50">
                    {solutions.map((sol) => (
                      <Link
                        key={sol.slug}
                        href={`/solutions/${sol.slug}`}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#3D3D3D] hover:bg-[#F7F7F7] hover:text-[#0A0A0A] transition-colors"
                      >
                        {sol.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {[
                { label: "Learn", href: "/learn" },
                { label: "Wholesale", href: "/wholesale" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-[6px] transition-colors",
                    isActive(item.href)
                      ? "text-[#E65C00]"
                      : "text-[#3D3D3D] hover:text-[#0A0A0A] hover:bg-[#F7F7F7]"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1 ml-auto lg:ml-0">
              {/* Search toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-[6px] text-[#3D3D3D] hover:bg-[#F7F7F7] hover:text-[#0A0A0A] transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link
                href="/account/wishlist"
                className="relative p-2 rounded-[6px] text-[#3D3D3D] hover:bg-[#F7F7F7] hover:text-[#0A0A0A] transition-colors hidden sm:flex"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#E65C00] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Account */}
              <Link
                href="/account"
                className="p-2 rounded-[6px] text-[#3D3D3D] hover:bg-[#F7F7F7] hover:text-[#0A0A0A] transition-colors hidden sm:flex"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative flex items-center gap-2 px-3 py-2 bg-[#0A0A0A] text-white rounded-[6px] text-sm font-medium hover:bg-[#3D3D3D] transition-colors ml-1"
                aria-label="Cart"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Cart</span>
                {cartCount > 0 && (
                  <span className="w-5 h-5 bg-[#E65C00] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-[6px] text-[#3D3D3D] hover:bg-[#F7F7F7] lg:hidden"
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="pb-3 pt-1">
              <form
                action="/shop"
                className="flex items-center gap-2 border border-[#E5E5E5] rounded-[8px] px-4 py-2.5 bg-[#F7F7F7]"
              >
                <Search className="w-4 h-4 text-[#9E9E9E] flex-shrink-0" />
                <input
                  autoFocus
                  type="search"
                  name="q"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products, categories, guides..."
                  className="flex-1 bg-transparent text-sm outline-none text-[#0A0A0A] placeholder:text-[#9E9E9E]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-[#9E9E9E] hover:text-[#0A0A0A]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </form>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-[#E5E5E5] bg-white">
            <div className="container-site py-4 space-y-1">
              <Link href="/shop" className="flex items-center justify-between px-3 py-2.5 rounded-[6px] font-medium text-[#0A0A0A] hover:bg-[#F7F7F7]">
                All Products
              </Link>
              <div className="px-3 pt-2 pb-1">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#9E9E9E] mb-2">Categories</div>
                <div className="grid grid-cols-2 gap-1">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/categories/${cat.slug}`}
                      className="flex items-center gap-2 px-2 py-2 rounded-[6px] text-sm text-[#3D3D3D] hover:bg-[#F7F7F7]"
                    >
                      <cat.icon className="w-3.5 h-3.5 text-[#E65C00]" />
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="h-px bg-[#F0F0F0] my-2" />
              {[
                { label: "Solutions", href: "/solutions" },
                { label: "Learn", href: "/learn" },
                { label: "Wholesale", href: "/wholesale" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "My Account", href: "/account" },
                { label: "Wishlist", href: "/account/wishlist" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center px-3 py-2.5 rounded-[6px] text-sm font-medium text-[#3D3D3D] hover:bg-[#F7F7F7] hover:text-[#0A0A0A]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E5E5E5] lg:hidden">
        <div className="grid grid-cols-5 h-14">
          {[
            { icon: "🏠", label: "Home", href: "/" },
            { icon: "🔧", label: "Shop", href: "/shop" },
            { icon: "🔍", label: "Search", href: "/shop", search: true },
            { icon: "🛒", label: "Cart", href: "/cart", badge: cartCount },
            { icon: "👤", label: "Account", href: "/account" },
          ].map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              onClick={item.search ? (e) => { e.preventDefault(); setSearchOpen(true); } : undefined}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium relative",
                isActive(item.href) && !item.search
                  ? "text-[#E65C00]"
                  : "text-[#9E9E9E]"
              )}
            >
              <span className="text-base leading-none">{item.icon}</span>
              {item.label}
              {item.badge && item.badge > 0 && (
                <span className="absolute top-1.5 right-5 w-4 h-4 bg-[#E65C00] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      </nav>

      {/* Bottom nav spacer on mobile */}
      <div className="h-14 lg:hidden" />
    </>
  );
}
