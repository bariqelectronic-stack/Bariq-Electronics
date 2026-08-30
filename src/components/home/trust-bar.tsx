import React from "react";
import { Globe, Package, ShieldCheck, Users, Wrench } from "lucide-react";

const items = [
  {
    icon: Wrench,
    title: "Professional Equipment",
    desc: "Tools built for repair professionals",
  },
  {
    icon: Users,
    title: "Technician Focused",
    desc: "Designed around real workshop needs",
  },
  {
    icon: Globe,
    title: "Worldwide Shipping",
    desc: "Delivered to your workshop",
  },
  {
    icon: Package,
    title: "Wholesale Available",
    desc: "Bulk pricing for businesses",
  },
  {
    icon: ShieldCheck,
    title: "Secure Ordering",
    desc: "Safe and simple checkout",
  },
];

export function TrustBar() {
  return (
    <section className="border-b border-[#E5E5E5] bg-white">
      <div className="container-site py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-0 lg:divide-x lg:divide-[#E5E5E5]">
          {items.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-start gap-2 lg:px-6 first:pl-0 last:pr-0"
            >
              <div className="w-8 h-8 bg-[#E65C0010] rounded-[6px] flex items-center justify-center">
                <item.icon className="w-4 h-4 text-[#E65C00]" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[#0A0A0A]">{item.title}</div>
                <div className="text-xs text-[#9E9E9E] mt-0.5">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
