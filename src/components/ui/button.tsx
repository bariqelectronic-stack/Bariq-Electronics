"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "link";
  size?: "sm" | "md" | "lg" | "icon";
  loading?: boolean;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-semibold transition-all duration-150 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 whitespace-nowrap select-none";

    const variants = {
      primary:
        "bg-[#E65C00] text-white hover:bg-[#CC5000] focus-visible:outline-[#E65C00]",
      secondary:
        "bg-[#0A0A0A] text-white hover:bg-[#3D3D3D] focus-visible:outline-[#0A0A0A]",
      outline:
        "border border-[#E5E5E5] bg-white text-[#0A0A0A] hover:border-[#0A0A0A] hover:bg-[#F7F7F7] focus-visible:outline-[#0A0A0A]",
      ghost:
        "bg-transparent text-[#3D3D3D] hover:bg-[#F7F7F7] hover:text-[#0A0A0A] focus-visible:outline-[#0A0A0A]",
      danger:
        "bg-[#DC2626] text-white hover:bg-[#B91C1C] focus-visible:outline-[#DC2626]",
      link:
        "bg-transparent text-[#E65C00] underline-offset-4 hover:underline p-0 h-auto focus-visible:outline-[#E65C00]",
    };

    const sizes = {
      sm: "text-xs px-3 py-1.5 gap-1.5 rounded-[4px]",
      md: "text-sm px-4 py-2.5 gap-2 rounded-[6px]",
      lg: "text-base px-6 py-3 gap-2 rounded-[8px]",
      icon: "w-9 h-9 rounded-[6px]",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin w-4 h-4 flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
