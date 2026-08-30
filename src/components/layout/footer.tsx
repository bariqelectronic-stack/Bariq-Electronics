import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig, getWhatsAppLink } from "@/lib/config";
import { MessageCircle, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white mt-auto">
      <div className="container-site py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <Image
                src="/bariq-logo.jpg"
                alt="Bariq Electronics"
                width={32}
                height={32}
                className="rounded-[6px] flex-shrink-0"
              />
              <div>
                <div className="font-black text-white text-sm leading-tight tracking-tight">BARIQ</div>
                <div className="font-light text-[#6B6B6B] text-[10px] uppercase tracking-[0.15em] leading-tight">Electronics</div>
              </div>
            </div>
            <p className="text-[#9E9E9E] text-sm leading-relaxed max-w-xs mb-6">
              Professional LCD and LED display repair parts for technicians and repair workshops worldwide. COFS, LVDS, T-CON, ACF tape, COF cutters and more.
            </p>
            <div className="space-y-2.5">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2.5 text-sm text-[#9E9E9E] hover:text-white transition-colors group"
              >
                <Mail className="w-4 h-4 text-[#E65C00]" />
                {siteConfig.email}
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-2.5 text-sm text-[#9E9E9E] hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[#E65C00]" />
                {siteConfig.phone}
              </a>
              <a
                href={getWhatsAppLink("Hello, I'm interested in your products.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-[#9E9E9E] hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#E65C00]" />
                WhatsApp: {siteConfig.whatsapp}
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2.5">
              {[
                { label: "All Products",      href: "/shop" },
                { label: "COFS",              href: "/categories/cofs" },
                { label: "LVDS",              href: "/categories/lvds" },
                { label: "LED & LCD BOARDS",  href: "/categories/led-lcd-boards" },
                { label: "T-CON",             href: "/categories/t-con" },
                { label: "ACF TAPE",          href: "/categories/acf-tape" },
                { label: "COF CUTTER",        href: "/categories/cof-cutter" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-[#9E9E9E] hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Support</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Contact Us", href: "/contact" },
                { label: "FAQ", href: "/faq" },
                { label: "Shipping Info", href: "/shipping" },
                { label: "Returns", href: "/returns" },
                { label: "Track Order", href: "/track-order" },
                { label: "Wholesale", href: "/wholesale" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-[#9E9E9E] hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", href: "/about" },
                { label: "Learn", href: "/learn" },
                { label: "Solutions", href: "/solutions" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-[#9E9E9E] hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#1E1E1E] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#6B6B6B]">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-[#6B6B6B]">
            <Link href="/privacy" className="hover:text-[#9E9E9E] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#9E9E9E] transition-colors">Terms</Link>
            <Link href="/sitemap.xml" className="hover:text-[#9E9E9E] transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
