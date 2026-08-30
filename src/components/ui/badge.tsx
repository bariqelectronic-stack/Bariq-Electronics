import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "info" | "outline" | "demo";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-[#F0F0F0] text-[#3D3D3D]",
    success: "bg-[#DCFCE7] text-[#16A34A]",
    warning: "bg-[#FEF9C3] text-[#CA8A04]",
    error: "bg-[#FEE2E2] text-[#DC2626]",
    info: "bg-[#DBEAFE] text-[#2563EB]",
    outline: "border border-[#E5E5E5] bg-transparent text-[#6B6B6B]",
    demo: "bg-[#E65C0015] text-[#E65C00] border border-[#E65C0030]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-[4px]",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
